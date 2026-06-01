import { ArrowRight, Download } from 'lucide-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { LightbulbStage } from '../../components/light-bulb';
import './index.css';

export const Route = createFileRoute('/')({
  component: IndexRoute,
});

function IndexRoute() {
  return (
    <div className="page">
      <header className="nav">
        <Link className="nav-logo" to="/" aria-label="Sagi Hammer home">
          SH
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="nav-links">
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/experience">Experience</Link>
            </li>
            <li>
              <Link to="/stack">Skills</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="hero">
        <div className="hero-content">
          <h1 className="hero-name">
            Sagi
            <br />
            Hammer
          </h1>
          <p className="hero-tagline">
            Engineer by <span className="blue-underline">mindset</span>.
            <br />
            Creator at <span className="blue-underline">heart</span>.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="btn-primary">
              View My Work
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href="/CV/" className="btn-ghost">
              Download Resume
              <Download size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero-illustration">
          <LightbulbStage />
        </div>
      </main>
    </div>
  );
}
