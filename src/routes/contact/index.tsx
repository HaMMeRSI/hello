import { Link, createFileRoute } from '@tanstack/react-router';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '../../content/profile';
import './index.css';

export const Route = createFileRoute('/contact')({
  component: ContactRoute,
});

type Channel = {
  id: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  copy?: string;
};

const channels: Channel[] = [
  { id: 'email', label: 'email', value: profile.email, href: `mailto:${profile.email}`, copy: profile.email },
  { id: 'github', label: 'github', value: '@HaMMeRSI', href: profile.github, external: true },
  { id: 'linkedin', label: 'linkedin', value: 'Sagi Hammer', href: profile.linkedin, external: true },
  { id: 'cv', label: 'cv', value: 'The traditional document', href: profile.resumePath },
];

function formatLocalTime() {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jerusalem',
  }).format(new Date());
}

function ContactRoute() {
  const [time, setTime] = useState(formatLocalTime);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatLocalTime()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable; the mailto link still works */
    }
  };

  return (
    <main className="story-page">
      <div className="story">
        <header className="story-intro">
          <p className="story-kicker">say hello</p>
          <h1 className="story-title">
            Let&apos;s build <span className="ink">the hard part.</span>
          </h1>
          <p className="story-lede">
            If you’re building something ambitious and need someone who can move between product, code, and messy unknowns, reach out. I’m easy to start with: send the problem,
            the context, and where you want to get.
          </p>
          <div className="story-meta" aria-label="Contact details">
            <span className="story-meta-item contact-clock">
              <span className="contact-dot" aria-hidden="true" />
              <span className="story-meta-label">send a message</span>
              <span className="story-meta-value contact-time">{time} Israel</span>
            </span>
            <span className="story-meta-item">
              <span className="story-meta-label">speaks</span>
              <span className="story-meta-value">Hebrew · English · Russian</span>
            </span>
          </div>
        </header>

        <header className="story-break">
          <h2>Reach out</h2>
        </header>

        <div className="contact-lines">
          {channels.map((channel, i) => {
            const index = String(i + 1).padStart(2, '0');

            if (channel.copy) {
              return (
                <div key={channel.id} className="contact-line reveal" data-copied={copied}>
                  <span className="contact-index" aria-hidden="true">
                    {index}
                  </span>
                  <a className="contact-body" href={channel.href}>
                    <span className="contact-label">{channel.label}</span>
                    <span className="contact-value">{channel.value}</span>
                  </a>
                  <button
                    type="button"
                    className="contact-action"
                    onClick={() => handleCopy(channel.copy as string)}
                    aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}>
                    {copied ? 'copied' : 'copy'}
                  </button>
                </div>
              );
            }

            const linkProps = channel.external ? { target: '_blank', rel: 'noopener' } : {};

            return (
              <a key={channel.id} className="contact-line reveal" href={channel.href} {...linkProps}>
                <span className="contact-index" aria-hidden="true">
                  {index}
                </span>
                <span className="contact-body">
                  <span className="contact-label">{channel.label}</span>
                  <span className="contact-value">{channel.value}</span>
                </span>
                <span className="contact-arrow" aria-hidden="true">
                  <ExternalLink size={22} />
                </span>
              </a>
            );
          })}
        </div>

        <footer className="story-next">
          <Link to="/" className="next-link">
            <small>start over</small>
            <strong>
              Back home
              <ArrowRight size={24} aria-hidden="true" />
            </strong>
          </Link>
          <Link to="/projects" className="story-aside-link">
            Review the work again
          </Link>
        </footer>
      </div>
    </main>
  );
}
