#!/usr/bin/env python3
"""
VedaDB Configuration Parser & Validator
======================================
Parses and validates vedadb.conf (YAML format).
Supports hot-reloading of sighup-reloadable settings.

Usage:
    from config_parser import VedaDBConfig
    
    # Load config
    config = VedaDBConfig("/etc/vedadb/vedadb.conf")
    
    # Check if SQL is enabled
    if config.is_model_enabled("sql"):
        print(f"SQL max connections: {config.get('data_models.sql.max_connections')}")
    
    # Check clustering
    if config.is_cluster_enabled():
        print(f"Cluster name: {config.get('cluster.cluster_name')}")
    
    # Hot reload
    config.reload()
"""

import yaml
import os
import re
import time
import hashlib
from pathlib import Path
from typing import Any, Optional, List, Dict
from dataclasses import dataclass, field
from enum import Enum


class ReloadPolicy(Enum):
    """How settings can be reloaded."""
    RESTART = "restart"      # Requires full restart
    SIGHUP = "sighup"        # Can hot-reload via SIGHUP
    DYNAMIC = "dynamic"      # Can change at runtime


@dataclass
class ConfigValidationError:
    """A single validation error."""
    path: str
    message: str
    severity: str = "error"  # error | warning


class VedaDBConfig:
    """
    VedaDB Configuration Manager.
    
    Loads, validates, and provides access to vedadb.conf settings.
    Supports hot-reloading for sighup-reloadable sections.
    """
    
    # Which sections require restart vs can hot-reload
    RELOAD_POLICIES = {
        "data_models": ReloadPolicy.RESTART,
        "net": ReloadPolicy.RESTART,
        "security.tls": ReloadPolicy.RESTART,
        "security.authentication.jwt_secret": ReloadPolicy.RESTART,
        "cluster": ReloadPolicy.RESTART,
        "sharding": ReloadPolicy.RESTART,
        "storage.data_dir": ReloadPolicy.RESTART,
        "storage.engine": ReloadPolicy.RESTART,
        "storage.journaling": ReloadPolicy.RESTART,
        "logging": ReloadPolicy.SIGHUP,
        "performance": ReloadPolicy.DYNAMIC,
        "backup": ReloadPolicy.DYNAMIC,
        "monitoring": ReloadPolicy.DYNAMIC,
        "ai": ReloadPolicy.DYNAMIC,
        "developer": ReloadPolicy.DYNAMIC,
        "security.authentication": ReloadPolicy.SIGHUP,
        "security.authorization": ReloadPolicy.DYNAMIC,
        "security.rate_limiting": ReloadPolicy.DYNAMIC,
        "security.ip_filter": ReloadPolicy.DYNAMIC,
    }
    
    # Valid data models
    VALID_MODELS = ["sql", "vector", "graph", "document", "cache", "search", "time_series"]
    
    # Valid eviction policies
    VALID_EVICTION_POLICIES = ["lru", "lfu", "ttl", "random", "noeviction"]
    
    # Valid storage engines
    VALID_STORAGE_ENGINES = ["btree", "lsm", "memory"]
    
    # Valid compression algorithms
    VALID_COMPRESSION_ALGORITHMS = ["snappy", "lz4", "zstd", "none"]
    
    # Valid vector metrics
    VALID_VECTOR_METRICS = ["cosine", "euclidean", "dot", "manhattan", "hamming"]
    
    # Valid vector index types
    VALID_VECTOR_INDEX_TYPES = ["hnsw", "ivf", "flat", "pq"]
    
    def __init__(self, config_path: str = "/etc/vedadb/vedadb.conf"):
        self.config_path = Path(config_path)
        self._config: Dict[str, Any] = {}
        self._last_load_time = 0
        self._file_hash = ""
        self._errors: List[ConfigValidationError] = []
        
        if self.config_path.exists():
            self.load()
        else:
            print(f"WARNING: Config file not found at {config_path}")
            print("Using default configuration...")
            self._config = self._default_config()
    
    def _default_config(self) -> Dict[str, Any]:
        """Return default configuration."""
        return {
            "data_models": {
                "sql": {"enabled": True, "max_connections": 1000},
                "vector": {"enabled": True, "dimension_limit": 1536},
                "graph": {"enabled": True},
                "document": {"enabled": True},
                "cache": {"enabled": True, "max_memory_mb": 512, "eviction_policy": "lru"},
                "search": {"enabled": True},
                "time_series": {"enabled": True},
            },
            "net": {
                "http_port": 8080,
                "tcp_port": 6380,
                "bind_ip": "127.0.0.1",
                "max_connections": 5000,
            },
            "security": {
                "authentication": {"enabled": True, "primary_method": "jwt"},
                "authorization": {"enabled": True},
                "tls": {"enabled": False},
                "sql_injection_protection": True,
            },
            "logging": {
                "destination": "file",
                "level": "info",
                "log_file": "/var/log/vedadb/vedadb.log",
            },
            "storage": {
                "data_dir": "/var/lib/vedadb/data",
                "engine": "btree",
                "cache_size_mb": 0,
            },
        }
    
    def load(self) -> None:
        """Load configuration from file."""
        with open(self.config_path, 'r') as f:
            content = f.read()
        
        self._file_hash = hashlib.md5(content.encode()).hexdigest()
        self._config = yaml.safe_load(content) or {}
        self._last_load_time = time.time()
        
        # Validate after loading
        self.validate()
    
    def reload(self) -> bool:
        """
        Hot-reload configuration if file has changed.
        Returns True if reloaded, False if unchanged.
        """
        if not self.config_path.exists():
            return False
        
        with open(self.config_path, 'r') as f:
            content = f.read()
        
        current_hash = hashlib.md5(content.encode()).hexdigest()
        if current_hash == self._file_hash:
            return False
        
        print("[CONFIG] Configuration file changed, reloading...")
        self.load()
        return True
    
    def get(self, path: str, default: Any = None) -> Any:
        """
        Get a configuration value by dot-notation path.
        
        Examples:
            config.get("data_models.sql.enabled") -> True
            config.get("net.http_port") -> 8080
            config.get("cluster.enabled", False) -> False
        """
        keys = path.split(".")
        value = self._config
        
        for key in keys:
            if isinstance(value, dict) and key in value:
                value = value[key]
            else:
                return default
        
        return value
    
    def set(self, path: str, value: Any) -> None:
        """Set a configuration value at runtime (for dynamic settings)."""
        keys = path.split(".")
        config = self._config
        
        for key in keys[:-1]:
            if key not in config:
                config[key] = {}
            config = config[key]
        
        config[keys[-1]] = value
    
    def is_model_enabled(self, model: str) -> bool:
        """Check if a specific data model is enabled."""
        return self.get(f"data_models.{model}.enabled", False)
    
    def get_enabled_models(self) -> List[str]:
        """Get list of all enabled data models."""
        enabled = []
        for model in self.VALID_MODELS:
            if self.is_model_enabled(model):
                enabled.append(model)
        return enabled
    
    def is_cluster_enabled(self) -> bool:
        """Check if clustering is enabled."""
        return self.get("cluster.enabled", False)
    
    def is_sharding_enabled(self) -> bool:
        """Check if sharding is enabled."""
        return self.get("sharding.enabled", False)
    
    def is_auth_enabled(self) -> bool:
        """Check if authentication is enabled."""
        return self.get("security.authentication.enabled", False)
    
    def is_tls_enabled(self) -> bool:
        """Check if TLS is enabled."""
        return self.get("security.tls.enabled", False)
    
    def get_model_config(self, model: str) -> Dict[str, Any]:
        """Get full configuration for a specific data model."""
        return self.get(f"data_models.{model}", {})
    
    def validate(self) -> List[ConfigValidationError]:
        """
        Validate the entire configuration.
        Returns list of validation errors/warnings.
        """
        self._errors = []
        
        self._validate_data_models()
        self._validate_network()
        self._validate_security()
        self._validate_storage()
        self._validate_logging()
        self._validate_cluster()
        self._validate_sharding()
        self._validate_performance()
        self._validate_backup()
        self._validate_ai()
        
        return self._errors
    
    def _validate_data_models(self) -> None:
        """Validate data model settings."""
        for model in self.VALID_MODELS:
            model_cfg = self.get(f"data_models.{model}", {})
            
            if not isinstance(model_cfg, dict):
                self._errors.append(ConfigValidationError(
                    f"data_models.{model}",
                    f"Model '{model}' config must be a dictionary"
                ))
                continue
            
            # Validate model-specific settings
            if model == "vector" and model_cfg.get("enabled"):
                metric = model_cfg.get("default_metric", "cosine")
                if metric not in self.VALID_VECTOR_METRICS:
                    self._errors.append(ConfigValidationError(
                        f"data_models.vector.default_metric",
                        f"Invalid vector metric '{metric}'. Valid: {self.VALID_VECTOR_METRICS}"
                    ))
                
                idx_type = model_cfg.get("index_type", "hnsw")
                if idx_type not in self.VALID_VECTOR_INDEX_TYPES:
                    self._errors.append(ConfigValidationError(
                        f"data_models.vector.index_type",
                        f"Invalid index type '{idx_type}'. Valid: {self.VALID_VECTOR_INDEX_TYPES}"
                    ))
            
            if model == "cache" and model_cfg.get("enabled"):
                policy = model_cfg.get("eviction_policy", "lru")
                if policy not in self.VALID_EVICTION_POLICIES:
                    self._errors.append(ConfigValidationError(
                        f"data_models.cache.eviction_policy",
                        f"Invalid eviction policy '{policy}'. Valid: {self.VALID_EVICTION_POLICIES}"
                    ))
            
            if model == "time_series" and model_cfg.get("enabled"):
                retention = model_cfg.get("retention_days", 365)
                if retention < 1:
                    self._errors.append(ConfigValidationError(
                        f"data_models.time_series.retention_days",
                        f"Retention must be at least 1 day, got {retention}",
                        "warning"
                    ))
    
    def _validate_network(self) -> None:
        """Validate network settings."""
        http_port = self.get("net.http_port", 8080)
        tcp_port = self.get("net.tcp_port", 6380)
        ws_port = self.get("net.websocket_port", 8081)
        
        ports = [http_port, tcp_port, ws_port]
        for port in ports:
            if not (1 <= port <= 65535):
                self._errors.append(ConfigValidationError(
                    "net",
                    f"Port {port} is out of valid range (1-65535)"
                ))
        
        if len(ports) != len(set(ports)):
            self._errors.append(ConfigValidationError(
                "net",
                "Duplicate ports detected! Each service needs a unique port."
            ))
    
    def _validate_security(self) -> None:
        """Validate security settings."""
        auth = self.get("security.authentication", {})
        
        if auth.get("enabled"):
            jwt_secret = auth.get("jwt_secret", "")
            if jwt_secret == "CHANGE_THIS_SECRET_IN_PRODUCTION":
                self._errors.append(ConfigValidationError(
                    "security.authentication.jwt_secret",
                    "JWT secret is using default value! Change it in production!",
                    "warning"
                ))
            
            if auth.get("max_login_attempts", 5) < 1:
                self._errors.append(ConfigValidationError(
                    "security.authentication.max_login_attempts",
                    "max_login_attempts must be at least 1"
                ))
        
        # Warn if auth disabled in production-like settings
        if not auth.get("enabled") and self.get("net.bind_ip") == "0.0.0.0":
            self._errors.append(ConfigValidationError(
                "security",
                "Authentication is disabled AND bind_ip is 0.0.0.0. "
                "This is DANGEROUS in production!",
                "warning"
            ))
    
    def _validate_storage(self) -> None:
        """Validate storage settings."""
        engine = self.get("storage.engine", "btree")
        if engine not in self.VALID_STORAGE_ENGINES:
            self._errors.append(ConfigValidationError(
                "storage.engine",
                f"Invalid storage engine '{engine}'. Valid: {self.VALID_STORAGE_ENGINES}"
            ))
        
        data_dir = self.get("storage.data_dir", "/var/lib/vedadb/data")
        if not os.path.isabs(data_dir):
            self._errors.append(ConfigValidationError(
                "storage.data_dir",
                f"data_dir must be an absolute path: {data_dir}"
            ))
    
    def _validate_logging(self) -> None:
        """Validate logging settings."""
        level = self.get("logging.level", "info")
        valid_levels = ["debug", "info", "warn", "error", "fatal"]
        if level not in valid_levels:
            self._errors.append(ConfigValidationError(
                "logging.level",
                f"Invalid log level '{level}'. Valid: {valid_levels}"
            ))
    
    def _validate_cluster(self) -> None:
        """Validate cluster settings."""
        if not self.is_cluster_enabled():
            return
        
        rf = self.get("cluster.replication_factor", 3)
        if rf < 1:
            self._errors.append(ConfigValidationError(
                "cluster.replication_factor",
                "Replication factor must be at least 1"
            ))
        
        min_nodes = self.get("cluster.minimum_nodes", 3)
        if min_nodes < 1:
            self._errors.append(ConfigValidationError(
                "cluster.minimum_nodes",
                "minimum_nodes must be at least 1"
            ))
        
        discovery = self.get("cluster.discovery.method", "static")
        if discovery not in ["static", "gossip", "dns"]:
            self._errors.append(ConfigValidationError(
                "cluster.discovery.method",
                "Discovery method must be: static, gossip, or dns"
            ))
    
    def _validate_sharding(self) -> None:
        """Validate sharding settings."""
        if not self.is_sharding_enabled():
            return
        
        if not self.is_cluster_enabled():
            self._errors.append(ConfigValidationError(
                "sharding",
                "Sharding requires clustering to be enabled!"
            ))
        
        strategy = self.get("sharding.default_strategy", "hash")
        if strategy not in ["hash", "range", "tag"]:
            self._errors.append(ConfigValidationError(
                "sharding.default_strategy",
                "Shard strategy must be: hash, range, or tag"
            ))
    
    def _validate_performance(self) -> None:
        """Validate performance settings."""
        max_time = self.get("performance.max_query_time_ms", 30000)
        if max_time < 1000:
            self._errors.append(ConfigValidationError(
                "performance.max_query_time_ms",
                f"max_query_time_ms ({max_time}) is very low. "
                "Queries may be killed too aggressively.",
                "warning"
            ))
    
    def _validate_backup(self) -> None:
        """Validate backup settings."""
        if not self.get("backup.enabled", False):
            return
        
        schedule = self.get("backup.schedule", "")
        if schedule:
            # Basic cron validation
            parts = schedule.split()
            if len(parts) != 5:
                self._errors.append(ConfigValidationError(
                    "backup.schedule",
                    f"Invalid cron expression: '{schedule}'. Must have 5 fields."
                ))
    
    def _validate_ai(self) -> None:
        """Validate AI/ML settings."""
        if not self.get("ai.enabled", False):
            return
        
        providers = ["openai", "anthropic", "gemini", "kimi"]
        any_enabled = False
        for provider in providers:
            if self.get(f"ai.llm_providers.{provider}.enabled", False):
                any_enabled = True
                api_key = self.get(f"ai.llm_providers.{provider}.api_key", "")
                if not api_key:
                    self._errors.append(ConfigValidationError(
                        f"ai.llm_providers.{provider}.api_key",
                        f"{provider} is enabled but API key is empty!",
                        "warning"
                    ))
        
        if not any_enabled:
            self._errors.append(ConfigValidationError(
                "ai",
                "AI is enabled but no LLM provider is configured!",
                "warning"
            ))
    
    def print_validation_report(self) -> None:
        """Print a formatted validation report."""
        errors = [e for e in self._errors if e.severity == "error"]
        warnings = [e for e in self._errors if e.severity == "warning"]
        
        print("=" * 60)
        print("  VedaDB Configuration Validation Report")
        print("=" * 60)
        
        if not errors and not warnings:
            print("  Status: ALL CLEAR")
            print("  No errors or warnings found!")
        else:
            if errors:
                print(f"  ERRORS: {len(errors)}")
                for e in errors:
                    print(f"    [ERROR] {e.path}: {e.message}")
            if warnings:
                print(f"  WARNINGS: {len(warnings)}")
                for w in warnings:
                    print(f"    [WARN]  {w.path}: {w.message}")
        
        # Summary of enabled features
        print()
        print("  Enabled Data Models:")
        for model in self.get_enabled_models():
            print(f"    - {model.upper()}")
        
        print(f"  Clustering: {'YES' if self.is_cluster_enabled() else 'NO'}")
        print(f"  Sharding:   {'YES' if self.is_sharding_enabled() else 'NO'}")
        print(f"  Auth:       {'YES' if self.is_auth_enabled() else 'NO'}")
        print(f"  TLS:        {'YES' if self.is_tls_enabled() else 'NO'}")
        print("=" * 60)
    
    def to_dict(self) -> Dict[str, Any]:
        """Export configuration as dictionary."""
        return self._config.copy()
    
    def save(self, path: Optional[str] = None) -> None:
        """Save current configuration to file."""
        save_path = Path(path) if path else self.config_path
        with open(save_path, 'w') as f:
            yaml.dump(self._config, f, default_flow_style=False, sort_keys=False)


# =============================================================================
# CLI Interface
# =============================================================================

if __name__ == "__main__":
    import sys
    import argparse
    
    parser = argparse.ArgumentParser(
        description="VedaDB Configuration Parser & Validator"
    )
    parser.add_argument(
        "config_file",
        nargs="?",
        default="/etc/vedadb/vedadb.conf",
        help="Path to vedadb.conf (default: /etc/vedadb/vedadb.conf)"
    )
    parser.add_argument(
        "--get",
        dest="get_path",
        help="Get a config value by dot path (e.g., 'data_models.sql.enabled')"
    )
    parser.add_argument(
        "--validate",
        action="store_true",
        help="Validate the configuration file"
    )
    parser.add_argument(
        "--models",
        action="store_true",
        help="List enabled data models"
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Check if file has changed and reload if needed"
    )
    
    args = parser.parse_args()
    
    config = VedaDBConfig(args.config_file)
    
    if args.validate:
        config.print_validation_report()
    elif args.get_path:
        value = config.get(args.get_path)
        if value is not None:
            print(value)
        else:
            print(f"(not set)", file=sys.stderr)
            sys.exit(1)
    elif args.models:
        models = config.get_enabled_models()
        for m in models:
            print(f"  {m}: enabled")
        disabled = set(config.VALID_MODELS) - set(models)
        for m in sorted(disabled):
            print(f"  {m}: disabled")
    elif args.check:
        if config.reload():
            print("Configuration reloaded!")
        else:
            print("No changes detected.")
    else:
        # Default: show validation report
        config.print_validation_report()
