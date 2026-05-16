# VedaDB Configuration Reference
## Complete Guide to vedadb.conf

---

## Overview

`vedadb.conf` is the single configuration file that controls every aspect of VedaDB — from which data models to enable, to clustering, sharding, security, performance tuning, and AI integration.

**Location:** `/etc/vedadb/vedadb.conf`

**Format:** YAML (like MongoDB's `mongod.conf`)

**Reload:** `sudo systemctl reload vedadb` (hot-reloadable sections only)

**Restart:** `sudo systemctl restart vedadb` (all settings take effect)

---

## Quick Start

```bash
# 1. Copy default config
sudo mkdir -p /etc/vedadb
sudo cp vedadb.conf.default /etc/vedadb/vedadb.conf

# 2. Edit to enable/disable features
sudo nano /etc/vedadb/vedadb.conf

# 3. Validate before starting
python3 config_parser.py /etc/vedadb/vedadb.conf --validate

# 4. Start VedaDB
sudo systemctl start vedadb
```

---

## Configuration Sections

### 1. `data_models` — Enable/Disable Data Engines

Control which of the 7 data models are active. Each model can be independently enabled or disabled.

| Model | Key | Default | Description |
|-------|-----|---------|-------------|
| SQL | `sql.enabled` | `true` | Relational queries, JOINs, GROUP BY |
| Vector | `vector.enabled` | `true` | Similarity search (cosine, euclidean) |
| Graph | `graph.enabled` | `true` | Traversal, BFS, PageRank |
| Document | `document.enabled` | `true` | JSON storage with indexing |
| Cache | `cache.enabled` | `true` | In-memory KV with TTL |
| Search | `search.enabled` | `true` | Full-text search |
| Time Series | `time_series.enabled` | `true` | Timestamped data with rollups |

**Example — Disable Graph and Time Series:**
```yaml
data_models:
  graph:
    enabled: false
  time_series:
    enabled: false
```

**Vector-specific settings:**
| Setting | Default | Options | Description |
|---------|---------|---------|-------------|
| `default_metric` | `cosine` | cosine, euclidean, dot, manhattan, hamming | Default similarity metric |
| `dimension_limit` | `1536` | 1-10000 | Maximum vector dimensions |
| `index_type` | `hnsw` | hnsw, ivf, flat, pq | Vector index algorithm |
| `ef_construction` | `200` | 50-500 | HNSW build quality |
| `ef_search` | `64` | 10-500 | HNSW search quality |

**Cache-specific settings:**
| Setting | Default | Options | Description |
|---------|---------|---------|-------------|
| `max_memory_mb` | `512` | 1-65535 | Max cache memory |
| `eviction_policy` | `lru` | lru, lfu, ttl, random, noeviction | Eviction strategy |
| `default_ttl_seconds` | `3600` | 0+ | Default key expiry |

**Restart required** for any data model changes.

---

### 2. `net` — Network Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `http_port` | `8080` | REST API port |
| `tcp_port` | `6380` | Binary wire protocol port |
| `websocket_port` | `8081` | Real-time subscriptions |
| `studio_port` | `9090` | Admin UI/workbench |
| `bind_ip` | `127.0.0.1` | Bind address (0.0.0.0 = all) |
| `max_connections` | `5000` | Max concurrent connections |

**CORS Settings:**
```yaml
net:
  cors_allow_all: false
  cors_origins:
    - "http://localhost:3000"
  cors_methods:
    - "GET"
    - "POST"
```

**Restart required** for network changes.

---

### 3. `security` — Authentication & Authorization

#### Authentication
| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Require login |
| `primary_method` | `jwt` | jwt, apikey, basic, oauth2 |
| `jwt_secret` | *(change me)* | JWT signing secret |
| `jwt_expiry_hours` | `24` | Token lifetime |
| `password_hash` | `argon2id` | argon2id, bcrypt, scrypt |
| `max_login_attempts` | `5` | Lock after N failures |
| `lockout_duration_minutes` | `30` | Lock duration |

#### TLS/SSL
| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `false` | Enable TLS |
| `mode` | `require` | disabled, allow, prefer, require |
| `certificate_key_file` | - | PEM certificate path |
| `minimum_tls_version` | `1.2` | Minimum TLS version |

#### Rate Limiting
| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable rate limiting |
| `requests_per_minute` | `1000` | Per-IP limit |
| `burst` | `50` | Burst allowance |

---

### 4. `cluster` — High Availability Clustering

Enable for production deployments requiring fault tolerance.

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `false` | Enable clustering |
| `cluster_name` | `vedadb-cluster-1` | Cluster identifier |
| `node_id` | *(auto)* | Unique node ID |
| `node_name` | `node-1` | Human-readable name |
| `cluster_port` | `16380` | Inter-node communication |
| `replication_factor` | `3` | Data copies |
| `minimum_nodes` | `3` | Min nodes for quorum |
| `auto_failover` | `true` | Automatic failover |
| `read_preference` | `primaryPreferred` | Read routing |
| `write_concern` | `2` | Write acknowledgments |

**Discovery Methods:**
- `static` — Manually specify seed nodes
- `gossip` — Automatic discovery
- `dns` — DNS-based discovery

**Restart required** to enable/disable clustering.

---

### 5. `sharding` — Horizontal Scaling

Requires clustering to be enabled.

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `false` | Enable sharding |
| `shard_count` | `0` | 0 = auto from cluster |
| `default_strategy` | `hash` | hash, range, tag |
| `chunk_size_mb` | `64` | Chunk split threshold |
| `auto_sharding` | `true` | Auto-shard large collections |

**Balancer:**
```yaml
sharding:
  balancer:
    enabled: true
    run_interval_minutes: 60
    threshold_percent: 10
```

**Restart required** to enable/disable sharding.

---

### 6. `storage` — Disk Storage

| Setting | Default | Options | Description |
|---------|---------|---------|-------------|
| `data_dir` | `/var/lib/vedadb/data` | - | Data directory |
| `engine` | `btree` | btree, lsm, memory | Storage engine |
| `cache_size_mb` | `0` | 0 = auto (50% RAM) | RAM cache |
| `compression.enabled` | `true` | true/false | Compress on disk |
| `compression.algorithm` | `snappy` | snappy, lz4, zstd | Compression algo |

**Journaling:**
| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | WAL for durability |
| `sync_interval_ms` | `100` | Disk sync frequency |

---

### 7. `logging` — Log Configuration

**Hot-reloadable via `systemctl reload vedadb`.**

| Setting | Default | Options | Description |
|---------|---------|---------|-------------|
| `destination` | `file` | file, syslog, console, none | Log output |
| `level` | `info` | debug, info, warn, error, fatal | Log level |
| `format` | `text` | text, json | Output format |

**Rotation:**
| Setting | Default | Description |
|---------|---------|-------------|
| `max_size_mb` | `100` | Rotate at this size |
| `max_files` | `10` | Keep N rotated files |
| `max_age_days` | `30` | Delete after N days |

**Per-component log levels:**
```yaml
logging:
  components:
    query: info
    storage: info
    network: warn
    security: info
    cluster: info
    vector: info
```

---

### 8. `performance` — Query Optimization

**Hot-reloadable.**

| Setting | Default | Description |
|---------|---------|-------------|
| `worker_threads` | `0` | 0 = auto (CPU cores x 2) |
| `max_query_time_ms` | `30000` | Kill slow queries |
| `max_query_memory_mb` | `1024` | Kill memory-heavy queries |
| `connection_pool.max` | `100` | Max pooled connections |

**Background Tasks:**
| Setting | Default | Description |
|---------|---------|-------------|
| `vacuum_interval_hours` | `24` | Cleanup frequency |
| `index_maintenance_interval_hours` | `168` | Index rebuild |

---

### 9. `backup` — Data Protection

**Hot-reloadable.**

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `false` | Auto-backup |
| `schedule` | `0 2 * * *` | Cron expression |
| `destination` | `/var/backups/vedadb` | Backup location |
| `retention_count` | `7` | Keep N backups |
| `compression` | `true` | Compress backups |

**Remote Backup:**
```yaml
backup:
  remote:
    enabled: false
    provider: s3  # s3, gcs, azure, sftp
    bucket: "vedadb-backups"
    region: "us-east-1"
```

---

### 10. `monitoring` — Metrics & Health

**Hot-reloadable.**

| Setting | Default | Description |
|---------|---------|-------------|
| `metrics.enabled` | `true` | Prometheus endpoint |
| `metrics.port` | `9090` | Metrics port |
| `health_check.enabled` | `true` | Health endpoint |
| `telemetry.enabled` | `false` | Anonymous stats |

---

### 11. `ai` — AI/ML Integration

**Hot-reloadable.**

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `false` | Enable AI features |
| `rag.enabled` | `false` | Retrieval-Augmented Generation |
| `query_assistant.enabled` | `false` | NL to query translation |

**LLM Providers:**
```yaml
ai:
  llm_providers:
    openai:
      enabled: false
      api_key: ""
      default_model: "gpt-4o"
    anthropic:
      enabled: false
      api_key: ""
      default_model: "claude-sonnet-4-20250514"
    kimi:
      enabled: false
      api_key: ""
      default_model: "kimi-k2"
```

---

### 12. `developer` — Debug Settings

**WARNING: Disable in production!**

| Setting | Default | Description |
|---------|---------|-------------|
| `debug_mode` | `false` | Verbose debug output |
| `allow_drop_database` | `false` | Allow DROP DATABASE |
| `profiling.enabled` | `false` | Query profiling |
| `test_endpoints` | `false` | Debug HTTP endpoints |

---

## Reload Policies

| Section | Reload Type | Signal Required |
|---------|------------|-----------------|
| `data_models` | **Restart** | `systemctl restart vedadb` |
| `net` | **Restart** | `systemctl restart vedadb` |
| `security.tls` | **Restart** | `systemctl restart vedadb` |
| `cluster` | **Restart** | `systemctl restart vedadb` |
| `sharding` | **Restart** | `systemctl restart vedadb` |
| `storage` | **Restart** | `systemctl restart vedadb` |
| `logging` | **SIGHUP** | `systemctl reload vedadb` |
| `security.authentication` | **SIGHUP** | `systemctl reload vedadb` |
| `performance` | **Dynamic** | Auto at runtime |
| `backup` | **Dynamic** | Auto at runtime |
| `monitoring` | **Dynamic** | Auto at runtime |
| `ai` | **Dynamic** | Auto at runtime |

---

## Validation

Use the built-in validator to check your configuration:

```bash
# Validate config file
python3 config_parser.py /etc/vedadb/vedadb.conf --validate

# Get a specific value
python3 config_parser.py /etc/vedadb/vedadb.conf --get data_models.sql.enabled
# Output: True

# List enabled models
python3 config_parser.py /etc/vedadb/vedadb.conf --models

# Check for changes and reload
python3 config_parser.py /etc/vedadb/vedadb.conf --check
```

---

## Common Configurations

### Development (Single Node)
```yaml
data_models:
  sql: { enabled: true }
  vector: { enabled: true }
  cache: { enabled: true }
  # Disable others for faster startup
  graph: { enabled: false }
  time_series: { enabled: false }

security:
  authentication:
    enabled: false  # No auth needed locally

logging:
  level: debug
  destination: console
```

### Production Cluster
```yaml
cluster:
  enabled: true
  replication_factor: 3
  minimum_nodes: 3
  auto_failover: true

sharding:
  enabled: true
  default_strategy: hash

security:
  tls:
    enabled: true
    mode: require
    certificate_key_file: "/etc/vedadb/ssl/vedadb.pem"
  authentication:
    enabled: true
    jwt_secret: "YOUR_SECRET_HERE"
  rate_limiting:
    enabled: true
    requests_per_minute: 1000

logging:
  level: warn
  format: json
  rotation:
    enabled: true
    max_size_mb: 100
```

### AI-Enabled Setup
```yaml
ai:
  enabled: true
  llm_providers:
    openai:
      enabled: true
      api_key: "sk-..."
    anthropic:
      enabled: true
      api_key: "sk-ant-..."
  rag:
    enabled: true
  query_assistant:
    enabled: true
```
