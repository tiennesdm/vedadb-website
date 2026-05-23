import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

function CodeBlock({ code, language = 'sql', filename, className = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightSyntax = (text: string, _lang: string) => {
    // Simple syntax highlighting
    const keywords = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'TABLE', 'INDEX', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AS', 'AND', 'OR', 'NOT', 'NULL', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'DEFAULT', 'VALUES', 'INTO', 'SET', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'UNION', 'ALL', 'EXISTS', 'BETWEEN', 'LIKE', 'IN', 'IS', 'ASC', 'DESC'];

    let highlighted = text;
    
    // Highlight strings
    highlighted = highlighted.replace(/'[^']*'/g, '<span class="text-veda-amber">$&</span>');
    
    // Highlight keywords
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      highlighted = highlighted.replace(regex, `<span class="text-veda-cyan font-medium">${kw}</span>`);
    });
    
    // Highlight comments
    highlighted = highlighted.replace(/--.*$/gm, '<span class="text-veda-green">$&</span>');
    
    // Highlight numbers
    highlighted = highlighted.replace(/\b\d+\b/g, '<span class="text-veda-amber-light">$&</span>');
    
    return highlighted;
  };

  return (
    <div className={`rounded-xl overflow-hidden border border-veda-border-subtle ${className}`}>
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0D1117] border-b border-veda-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          {filename && (
            <span className="ml-3 text-sm text-veda-gray font-mono">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-sm text-veda-gray hover:text-veda-amber transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {/* Code content */}
      <pre className="p-4 bg-[#0D1117] overflow-x-auto">
        <code
          className="font-mono text-sm leading-relaxed text-veda-off-white"
          dangerouslySetInnerHTML={{ __html: highlightSyntax(code, language) }}
        />
      </pre>
    </div>
  );
}

export { CodeBlock };
