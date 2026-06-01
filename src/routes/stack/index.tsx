import { Link, createFileRoute } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { skillGroups } from '../../content/profile';
import './index.css';

export const Route = createFileRoute('/stack')({
  component: StackRoute,
});

function StackRoute() {
  return (
    <main className="story-page">
      <div className="story">
        <header className="story-intro">
          <p className="story-kicker">what I reach for</p>
          <h1 className="story-title">
            Broad range, <span className="ink">practical taste.</span>
          </h1>
          <p className="story-lede">
            Not keyword soup: range with judgment. Frontend platforms, backend systems, cloud delivery, AI workflows, game and XR logic, on-chain data. Here is how those skills
            actually show up in the work.
          </p>
          <div className="story-meta" aria-label="Technical focus">
            <span className="story-meta-item">
              <span className="story-meta-label">core</span> TypeScript · React · APIs · architecture
            </span>
            <span className="story-meta-item">
              <span className="story-meta-label">edges</span> AI agents · OpenXR · Unity · Solana
            </span>
          </div>
        </header>

        <header className="story-break">
          <h2>Technical range</h2>
        </header>

        <dl className="capabilities">
          {skillGroups.map(group => (
            <div className="capability reveal" key={group.title}>
              <dt>{group.title}</dt>
              <dd>
                <p>{group.summary}</p>
                <p className="capability-skills">{group.skills.join('  ·  ')}</p>
              </dd>
            </div>
          ))}
        </dl>

        <footer className="story-next">
          <Link to="/contact" className="next-link">
            <small>last chapter</small>
            <strong>
              Let&apos;s talk
              <ArrowRight size={24} aria-hidden="true" />
            </strong>
          </Link>
          <Link to="/experience" className="story-aside-link">
            Back to experience
          </Link>
        </footer>
      </div>
    </main>
  );
}
