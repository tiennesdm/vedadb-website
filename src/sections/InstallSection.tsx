import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Copy, Check, FileText, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type TabKey = 'linux' | 'macos' | 'docker';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'linux', label: 'Linux' },
  { key: 'macos', label: 'macOS' },
  { key: 'docker', label: 'Docker' },
];

const codeContent: Record<TabKey, string> = {
  linux: 'curl -fsSL https://get.vedadb.dev | bash\nvedadb --version',
  macos: 'brew install vedadb\nvedadb --version',
  docker: 'docker pull vedadb/vedadb:latest\ndocker run -p 5432:5432 vedadb/vedadb',
};

function InstallSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('linux');
  const [copied, setCopied] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const ease = 'power3.out';

    gsap.fromTo(
      '.install-heading',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7,
        ease,
        scrollTrigger: { trigger: '.install-heading', start: 'top 80%' },
      }
    );

    gsap.fromTo(
      '.install-sub',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, delay: 0.1,
        ease,
        scrollTrigger: { trigger: '.install-sub', start: 'top 80%' },
      }
    );

    gsap.fromTo(
      '.install-tab',
      { y: 15, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5,
        stagger: 0.05,
        delay: 0.2,
        ease,
        scrollTrigger: { trigger: '.install-tabs', start: 'top 80%' },
      }
    );

    gsap.fromTo(
      '.install-code',
      { y: 20, opacity: 0, scale: 0.98 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.6,
        delay: 0.3,
        ease,
        scrollTrigger: { trigger: '.install-code', start: 'top 80%' },
      }
    );
  }, { scope: sectionRef });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeContent[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleTabSwitch = (tab: TabKey) => {
    if (tab === activeTab) return;
    // Cross-fade code block
    const codeEl = document.querySelector('.install-code-inner');
    if (codeEl) {
      gsap.to(codeEl, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          setActiveTab(tab);
          gsap.to(codeEl, { opacity: 1, duration: 0.2 });
        },
      });
    } else {
      setActiveTab(tab);
    }
  };

  // Parse code for syntax highlighting
  const renderCode = (code: string) => {
    return code.split('\n').map((line, i) => {
      // Simple syntax highlighting
      let highlighted = line;
      if (activeTab === 'linux') {
        // curl -fsSL URL | bash
        highlighted = highlighted
          .replace(/(curl)/, '<span style="color:var(--accent-green)">$1</span>')
          .replace(/(bash)/, '<span style="color:var(--accent-green)">$1</span>');
      } else if (activeTab === 'macos') {
        highlighted = highlighted
          .replace(/(brew)/, '<span style="color:var(--accent-green)">$1</span>')
          .replace(/(install)/, '<span style="color:var(--accent-green)">$1</span>');
      } else if (activeTab === 'docker') {
        highlighted = highlighted
          .replace(/(docker)/g, '<span style="color:var(--accent-green)">$1</span>')
          .replace(/(pull|run)/, '<span style="color:var(--accent-green)">$1</span>');
      }
      // vedadb highlight
      highlighted = highlighted
        .replace(/(vedadb)/g, '<span style="color:var(--accent-green)">$1</span>')
        .replace(/(--version)/, '<span style="color:var(--text-secondary)">$1</span>');

      return (
        <div key={i} className="leading-relaxed">
          <span
            className="select-none mr-4 inline-block w-4 text-right"
            style={{ color: 'var(--text-muted)' }}
          >
            {i + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      id="install"
      className="veda-section"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="veda-container">
        <div className="max-w-[800px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="install-heading veda-section-h2 text-[var(--text-primary)] mb-4">
              Install in Seconds
            </h2>
            <p
              className="install-sub veda-subheadline"
              style={{ color: 'var(--text-secondary)' }}
            >
              One binary. No dependencies. No configuration.
            </p>
          </div>

          {/* Tabs */}
          <div className="install-tabs flex items-center justify-center gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabSwitch(tab.key)}
                className="install-tab px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor:
                    activeTab === tab.key
                      ? 'var(--accent-green)'
                      : 'var(--bg-tertiary)',
                  color:
                    activeTab === tab.key
                      ? '#000000'
                      : 'var(--text-secondary)',
                  border:
                    activeTab === tab.key
                      ? '1px solid var(--accent-green)'
                      : '1px solid var(--border-subtle)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div
            className="install-code relative rounded-lg overflow-hidden"
            style={{
              backgroundColor: '#0D0D0D',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all duration-200"
              style={{
                backgroundColor: copied
                  ? 'var(--accent-green-dim)'
                  : 'var(--bg-tertiary)',
                color: copied
                  ? 'var(--accent-green)'
                  : 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>

            {/* Code content */}
            <div
              className="install-code-inner p-6 pt-14 font-mono text-sm overflow-x-auto"
              style={{ color: 'var(--text-primary)' }}
            >
              {renderCode(codeContent[activeTab])}
            </div>
          </div>

          {/* Quick start hint */}
          <p
            className="text-center mt-4 text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Then open{' '}
            <span style={{ color: 'var(--accent-green)' }}>
              http://localhost:5432/workbench
            </span>{' '}
            for the built-in query UI.
          </p>

          {/* Secondary CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="#docs"
              className="veda-btn-secondary inline-flex items-center gap-2"
            >
              <FileText size={16} />
              View Documentation
            </a>
            <a
              href="#"
              className="veda-btn-secondary inline-flex items-center gap-2"
            >
              <MessageCircle size={16} />
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export { InstallSection };
