import { Link, createFileRoute } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { education, experience, profile } from '../../content/profile';
import './index.css';

export const Route = createFileRoute('/experience')({
  component: ExperienceRoute,
});

function ExperienceRoute() {
  return (
    <main className="story-page">
      <div className="story">
        <header className="story-intro">
          <h1 className="story-title">
            The road,
            <br />
            <span className="ink">so far.</span>
          </h1>
          <p className="story-lede">
            For 10 years, I’ve built end-to-end software across defense, AI video, AI harnesses, agents, automation infrastructure, media, and XR — taking projects from
            unclear requirements through system design, infrastructure, implementation, and launch.
          </p>
          <div className="story-meta" aria-label="Experience highlights">
            <span className="story-meta-item">
              <span className="story-meta-label">now</span> Q.E.D Science + independent AI products
            </span>
            <span className="story-meta-item">
              <span className="story-meta-label">proof</span> Chapeta · Gepeta · FastEdit · D-ID · Terragon
            </span>
          </div>
        </header>

        <header className="story-break">
          <h2>The timeline</h2>
        </header>

        <div className="journey">
          {experience.map(item => (
            <article className="milestone reveal" key={`${item.company}-${item.role}`}>
              <p className="milestone-period">{item.period}</p>
              <h3 className="milestone-company">{item.company}</h3>
              <p className="milestone-role">{item.role}</p>
              <p className="milestone-summary">{item.summary}</p>
              <ul className="milestone-points">
                {item.points.map(point => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="milestone-stack">{item.stack.join('  ·  ')}</p>
            </article>
          ))}
        </div>

        <header className="story-break">
          <h2>Foundations</h2>
        </header>

        <ul className="footnotes reveal">
          {education.map(item => (
            <li className="footnote" key={item.school}>
              <strong>{item.school}</strong>
              <span>{item.credential}</span>
              <em>{item.period}</em>
            </li>
          ))}
        </ul>

        <footer className="story-next">
          <Link to="/stack" className="next-link">
            <small>keep reading</small>
            <strong>
              The technical stack
              <ArrowRight size={24} aria-hidden="true" />
            </strong>
          </Link>
          <a href={profile.resumePath} className="story-aside-link">
            Open the traditional CV
          </a>
        </footer>
      </div>
    </main>
  );
}
