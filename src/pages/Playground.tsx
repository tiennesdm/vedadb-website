import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Shuffle, Brain, Rss, Terminal, Zap } from 'lucide-react';
import { SectionReveal } from '@/components/SectionReveal';

/* ───────── easing ───────── */
const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ───────── query data ───────── */

type Model = 'sql' | 'cypher' | 'document' | 'vector';

interface QueryData {
  label: string;
  code: string;
  language: string;
  resultType: 'table' | 'graph' | 'json' | 'scores';
  resultData: {
    headers?: string[];
    rows?: (string | number)[][];
    json?: Record<string, unknown>;
    items?: { label: string; score: number }[];
  };
  execTime: string;
}

const queries: Record<Model, QueryData> = {
  sql: {
    label: 'SQL',
    code: `SELECT u.name, COUNT(o.id) as orders
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.created_at > '2026-01-01'
GROUP BY u.id, u.name
ORDER BY orders DESC
LIMIT 5;`,
    language: 'sql',
    resultType: 'table',
    resultData: {
      headers: ['name', 'orders'],
      rows: [
        ['Alice', 42],
        ['Bob', 38],
        ['Charlie', 31],
        ['Diana', 27],
        ['Eve', 24],
      ],
    },
    execTime: '0.4ms',
  },
  cypher: {
    label: 'Cypher',
    code: `MATCH (a:Person)-[:KNOWS]->(b:Person)
WHERE a.city = 'Mumbai'
RETURN a.name, b.name, a.city
LIMIT 5;`,
    language: 'cypher',
    resultType: 'graph',
    resultData: {
      headers: ['a.name', 'b.name', 'a.city'],
      rows: [
        ['Ravi', 'Priya', 'Mumbai'],
        ['Ravi', 'Amit', 'Mumbai'],
        ['Priya', 'Sneha', 'Mumbai'],
        ['Amit', 'Ravi', 'Mumbai'],
        ['Sneha', 'Priya', 'Mumbai'],
      ],
    },
    execTime: '0.7ms',
  },
  document: {
    label: 'Document',
    code: `FIND products 
WHERE category = 'electronics' 
  AND price < 50000
SORT rating DESC
LIMIT 5;`,
    language: 'javascript',
    resultType: 'json',
    resultData: {
      json: {
        results: [
          { _id: 'prod_101', name: 'Wireless Headphones Pro', category: 'electronics', price: 24999, rating: 4.8 },
          { _id: 'prod_102', name: 'Smart Watch Ultra', category: 'electronics', price: 44999, rating: 4.7 },
          { _id: 'prod_103', name: 'Portable Speaker Max', category: 'electronics', price: 18999, rating: 4.6 },
          { _id: 'prod_104', name: 'Noise Cancelling Buds', category: 'electronics', price: 15999, rating: 4.5 },
          { _id: 'prod_105', name: '4K Action Camera', category: 'electronics', price: 32999, rating: 4.4 },
        ],
        count: 5,
        executionTime: '0.3ms',
      },
    },
    execTime: '0.3ms',
  },
  vector: {
    label: 'Vector',
    code: `SELECT name, 
       1 - (embedding <=> '[0.1,0.2,0.3]') AS similarity
FROM products
ORDER BY similarity DESC
LIMIT 5;`,
    language: 'sql',
    resultType: 'scores',
    resultData: {
      items: [
        { label: 'Wireless Headphones Pro', score: 0.97 },
        { label: 'Noise Cancelling Earbuds', score: 0.94 },
        { label: 'Bluetooth Speaker Max', score: 0.91 },
        { label: 'Smart Soundbar', score: 0.88 },
        { label: 'USB-C Microphone', score: 0.85 },
      ],
    },
    execTime: '1.2ms',
  },
};

const sampleButtons = [
  { label: 'SELECT all users', model: 'sql' as Model },
  { label: 'Graph: who knows who', model: 'cypher' as Model },
  { label: 'Vector: similar products', model: 'vector' as Model },
  { label: 'Document: find products', model: 'document' as Model },
];

const tips = [
  {
    icon: Shuffle,
    title: 'Cross-Model Queries',
    description: 'Join SQL tables with graph nodes and vector embeddings in a single query.',
    code: 'SELECT * FROM users u JOIN (SELECT * FROM embeddings ...) e ON u.id = e.id',
  },
  {
    icon: Brain,
    title: 'AI from SQL',
    description: 'Call LLM functions directly inside your SELECT statements.',
    code: "SELECT ai_generate('Summarize:', text) FROM docs",
  },
  {
    icon: Rss,
    title: 'Subscribe to Data',
    description: 'Use SUBSCRIBE for real-time query results that update live.',
    code: 'SUBSCRIBE SELECT COUNT(*) FROM orders',
  },
];

/* ───────── typewriter hook ───────── */

function useTypewriter(text: string, speed = 25) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current >= text.length) {
        setDisplayed(text);
        setDone(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        setDisplayed(text.slice(0, indexRef.current));
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed]);

  return { displayed, done };
}

/* ───────── ResultPanel ───────── */

function ResultPanel({
  query,
  isRunning,
}: {
  query: QueryData;
  isRunning: boolean;
}) {
  const [activeTab, setActiveTab] = useState<'Table' | 'JSON' | 'Raw'>('Table');

  return (
    <div className="flex-1 flex flex-col h-full border-l border-veda-border-subtle">
      {/* Tab bar */}
      <div className="flex items-center gap-4 px-4 py-2 border-b border-veda-border-subtle">
        {(['Table', 'JSON', 'Raw'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="text-xs font-medium pb-1 transition-colors"
            style={{
              color: activeTab === tab ? '#FFFFFF' : '#5A6A7F',
              borderBottom: activeTab === tab ? '2px solid #E8A838' : '2px solid transparent',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Result content */}
      <div className="flex-1 p-4 overflow-auto">
        <AnimatePresence mode="wait">
          {isRunning ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-full"
            >
              <div className="flex items-center gap-2" style={{ color: '#8B95A5' }}>
                <Zap size={16} className="animate-pulse text-veda-amber" />
                <span className="text-sm">Executing query...</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
            >
              {query.resultType === 'table' || query.resultType === 'graph' ? (
                <table className="w-full text-[13px]">
                  <thead>
                    <tr style={{ background: '#161B22' }}>
                      {query.resultData.headers?.map((h) => (
                        <th
                          key={h}
                          className="text-left px-3 py-2 text-xs font-semibold"
                          style={{ color: '#8B95A5' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {query.resultData.rows?.map((row, ri) => (
                      <tr
                        key={ri}
                        style={{
                          borderBottom: '1px solid #1A2433',
                          background: ri % 2 === 1 ? 'rgba(255,255,255,0.01)' : undefined,
                        }}
                      >
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-3 py-2" style={{ color: '#C9D1D9' }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : query.resultType === 'json' ? (
                <pre
                  className="font-mono text-xs leading-relaxed overflow-x-auto p-3 rounded-lg"
                  style={{ color: '#00D4AA', background: '#0D1117' }}
                >
                  {JSON.stringify(query.resultData.json, null, 2)}
                </pre>
              ) : (
                <div className="space-y-2">
                  {query.resultData.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2 rounded"
                      style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.01)' : undefined }}
                    >
                      <span className="text-sm" style={{ color: '#C9D1D9' }}>
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: Math.max(20, item.score * 100),
                            background: '#E8A838',
                          }}
                        />
                        <span className="text-xs font-mono" style={{ color: '#E8A838' }}>
                          {item.score.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Timing badge */}
              <p className="text-xs font-medium mt-3" style={{ color: '#22C55E' }}>
                Executed in {query.execTime}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────── main component ───────── */

export default function Playground() {
  const [activeModel, setActiveModel] = useState<Model>('sql');
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const query = queries[activeModel];
  const { displayed: typewriterCode } = useTypewriter(query.code, 15);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setHasRun(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 600);
  }, []);

  const handleModelSwitch = useCallback((model: Model) => {
    setActiveModel(model);
    setHasRun(false);
    setIsRunning(false);
  }, []);

  const handleSampleClick = useCallback(
    (model: Model) => {
      handleModelSwitch(model);
      setTimeout(() => {
        setIsRunning(true);
        setHasRun(true);
        setTimeout(() => setIsRunning(false), 600);
      }, 300);
    },
    [handleModelSwitch]
  );

  /* Keyboard shortcut: Ctrl+Enter to run */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleRun]);

  return (
    <div>
      {/* ════════════ HERO ════════════ */}
      <section className="pt-12 pb-8 px-6" style={{ background: '#0A0E1A' }}>
        <div className="max-w-[720px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-xs font-semibold tracking-[0.1em] uppercase mb-4"
            style={{ color: '#E8A838' }}
          >
            PLAYGROUND
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white leading-[1.1]"
          >
            Try VedaDB right now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
            className="text-lg mt-3"
            style={{ color: '#8B95A5' }}
          >
            Run real queries against a live database. No signup required.
          </motion.p>
        </div>
      </section>

      {/* ════════════ INTERACTIVE TERMINAL ════════════ */}
      <section className="px-6 pb-24" style={{ background: '#0A0E1A' }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.3 }}
            className="rounded-xl overflow-hidden"
            style={{
              background: '#0D1117',
              border: '1px solid #2A3A50',
              boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
            }}
          >
            {/* Window Title Bar */}
            <div
              className="flex items-center justify-between px-4 h-10"
              style={{ background: '#161B22' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F56' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }} />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium" style={{ color: '#8B95A5' }}>
                VedaDB Playground
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#22C55E' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-veda-green inline-block" />
                Connected
              </span>
            </div>

            {/* Query Input Bar */}
            <div
              className="flex items-center justify-between px-4 h-12 border-b border-veda-border-subtle"
              style={{ background: '#0D1117' }}
            >
              <div className="flex items-center gap-1">
                {(Object.keys(queries) as Model[]).map((model) => (
                  <button
                    key={model}
                    onClick={() => handleModelSwitch(model)}
                    className="px-3.5 py-1 rounded text-xs font-bold transition-all duration-200"
                    style={
                      activeModel === model
                        ? { background: '#E8A838', color: '#0A0E1A' }
                        : { background: '#1A2433', color: '#8B95A5' }
                    }
                  >
                    {queries[model].label}
                  </button>
                ))}
              </div>
              <button
                onClick={handleRun}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded text-xs font-bold transition-all duration-200 hover:brightness-110"
                style={{ background: '#22C55E', color: '#0A0E1A' }}
              >
                <Play size={14} />
                Run
              </button>
            </div>

            {/* Editor + Result split */}
            <div className="flex flex-col md:flex-row" style={{ minHeight: 420 }}>
              {/* Editor Area */}
              <div className="flex-1 p-4 relative" style={{ minWidth: 0 }}>
                <div className="flex">
                  {/* Line numbers */}
                  <div
                    className="text-right pr-3 select-none flex-shrink-0 font-mono text-xs leading-7"
                    style={{ color: '#5A6A7F', width: 36 }}
                  >
                    {typewriterCode.split('\n').map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  {/* Code */}
                  <pre className="font-mono text-sm leading-7 text-veda-off-white flex-1 overflow-x-auto">
                    <code>{typewriterCode}</code>
                    <span className="inline-block w-2 h-4 bg-veda-amber ml-0.5 animate-pulse" />
                  </pre>
                </div>
              </div>

              {/* Result Panel */}
              <div className="flex-1" style={{ minHeight: 200 }}>
                {hasRun ? (
                  <ResultPanel query={query} isRunning={isRunning} />
                ) : (
                  <div
                    className="h-full flex flex-col items-center justify-center border-l border-veda-border-subtle p-8 text-center"
                    style={{ minHeight: 200 }}
                  >
                    <Terminal size={32} style={{ color: '#2A3A50' }} className="mb-3" />
                    <p className="text-sm" style={{ color: '#5A6A7F' }}>
                      Click <span className="font-semibold" style={{ color: '#22C55E' }}>Run</span> or press{' '}
                      <kbd
                        className="px-1.5 py-0.5 rounded text-xs font-mono"
                        style={{ background: '#1A2433', color: '#8B95A5' }}
                      >
                        Ctrl+Enter
                      </kbd>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sample Query Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-2 mt-4"
          >
            {sampleButtons.map((sample) => (
              <button
                key={sample.label}
                onClick={() => handleSampleClick(sample.model)}
                className="px-3.5 py-2 rounded-md text-[13px] font-medium border transition-all duration-200 hover:border-veda-amber hover:text-veda-amber"
                style={{
                  background: '#1A2433',
                  borderColor: '#2A3A50',
                  color: '#8B95A5',
                }}
              >
                {sample.label}
              </button>
            ))}
          </motion.div>

          {/* Keyboard hint */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs" style={{ color: '#5A6A7F' }}>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded font-mono text-[11px]" style={{ background: '#1A2433' }}>
                Ctrl+Enter
              </kbd>
              Run
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded font-mono text-[11px]" style={{ background: '#1A2433' }}>
                Tab
              </kbd>
              Indent
            </span>
          </div>
        </div>
      </section>

      {/* ════════════ TIPS SECTION ════════════ */}
      <section className="py-16 px-6" style={{ background: '#0F1923' }}>
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-8">
            What you can do in the playground
          </h2>
          <SectionReveal stagger={0.1} duration={0.5} y={20}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tips.map((tip) => (
                <motion.div
                  key={tip.title}
                  whileHover={{ y: -4, borderColor: '#3A4F6B' }}
                  className="rounded-xl p-7 border transition-all duration-300"
                  style={{ background: '#1A2433', borderColor: '#2A3A50' }}
                >
                  <tip.icon size={28} className="text-veda-cyan mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#8B95A5' }}>
                    {tip.description}
                  </p>
                  <code
                    className="block font-mono text-xs p-3 rounded-md mt-3 overflow-x-auto"
                    style={{ background: '#0D1117', color: '#00D4AA' }}
                  >
                    {tip.code}
                  </code>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
