import { Link, createFileRoute } from '@tanstack/react-router';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Play } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import { type Project, type ProjectMedia, projects } from '../../content/profile';
import './index.css';

export const Route = createFileRoute('/projects')({
  component: ProjectsRoute,
});

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase())
    .join('');
}

function getOrderedMedia(media: ProjectMedia[] = []) {
  return [...media].sort((a, b) => Number(b.type === 'video') - Number(a.type === 'video'));
}

function getYouTubeEmbedUrl(src: string) {
  try {
    const url = new URL(src);
    const isYouTube = url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be');
    if (!isYouTube) return null;

    const id = url.hostname.includes('youtu.be') ? url.pathname.slice(1) : url.searchParams.get('v');
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

function ProjectsRoute() {
  return (
    <main className="story-page">
      <div className="story">
        <header className="story-intro">
          <p className="story-kicker">things I&apos;ve built</p>
          <h1 className="story-title">
            Real products, <span className="ink">not demos.</span>
          </h1>
          <p className="story-lede">
            Practical builds across AI agents, finance/life tracking, local-first media tools, VR, and production AI video — focused on shipped systems with clear user value.
          </p>
          <div className="story-meta" aria-label="Project themes">
            <span className="story-meta-item">
              <span className="story-meta-label">theme</span> shipped systems with clear user value
            </span>
            <span className="story-meta-item">
              <span className="story-meta-label">range</span> AI · SaaS · Web3 · VR · platforms
            </span>
          </div>
        </header>

        <header className="story-break">
          <h2>Selected work</h2>
        </header>

        <div className="project-list">
          {projects.map(project => (
            <ProjectFeature key={project.slug} project={project} />
          ))}
        </div>

        <footer className="story-next">
          <Link to="/experience" className="next-link">
            <small>keep reading</small>
            <strong>
              The experience timeline
              <ArrowRight size={24} aria-hidden="true" />
            </strong>
          </Link>
          <Link to="/stack" className="story-aside-link">
            Jump to skills
          </Link>
        </footer>
      </div>
    </main>
  );
}

function ProjectFeature({ project }: { project: Project }) {
  const media = getOrderedMedia(project.media);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = media[activeIndex] ?? null;
  const canStep = media.length > 1;
  const backdropSrc = activeMedia
    ? activeMedia.type === 'image'
      ? activeMedia.src
      : activeMedia.poster
    : project.coverFit === 'contain'
      ? undefined
      : project.cover;
  const accent = {
    ['--accent' as string]: project.accent,
    ['--preview-bg' as string]: project.coverBackground,
    ['--row-bg' as string]: project.rowBackground,
  } as CSSProperties;

  const step = (dir: 1 | -1) => {
    if (!canStep) return;
    setActiveIndex(current => (current + dir + media.length) % media.length);
  };

  return (
    <article className="project-feature reveal" style={accent}>
      <div className="feature-media">
        <div className={`project-preview${project.coverFit === 'contain' && !activeMedia ? ' project-preview-contain' : ''}`} aria-label={`${project.name} preview`}>
          <span className="project-preview-frame" key={`${project.slug}-${activeIndex}`}>
            {backdropSrc && <span className="project-preview-backdrop" style={{ backgroundImage: `url(${backdropSrc})` }} aria-hidden="true" />}
            {activeMedia ? (
              <ProjectMediaPreview media={activeMedia} />
            ) : project.cover ? (
              <img src={project.cover} alt={`${project.name} preview`} loading="lazy" decoding="async" />
            ) : (
              <span className="project-preview-placeholder" aria-hidden="true">
                <span className="project-preview-mark">{initials(project.name)}</span>
              </span>
            )}
          </span>

          {canStep && (
            <>
              <div className="project-carousel-controls" aria-label={`${project.name} carousel controls`}>
                <button type="button" className="project-carousel-button project-carousel-prev" onClick={() => step(-1)} aria-label={`Previous ${project.name} media`}>
                  <ChevronLeft size={24} aria-hidden="true" />
                </button>
                <button type="button" className="project-carousel-button project-carousel-next" onClick={() => step(1)} aria-label={`Next ${project.name} media`}>
                  <ChevronRight size={24} aria-hidden="true" />
                </button>
              </div>
              <span className="project-carousel-count" aria-live="polite">
                {activeIndex + 1} / {media.length}
              </span>
            </>
          )}
        </div>

        {media.length > 1 && (
          <div className="feature-slider" role="group" aria-label={`${project.name} gallery thumbnails`}>
            {media.map((item, index) => (
              <button
                type="button"
                className={`project-thumb${index === activeIndex ? ' project-thumb-active' : ''}`}
                key={`${project.slug}-${index}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${item.alt}`}
                aria-pressed={index === activeIndex}>
                <span className="project-thumb-frame" aria-hidden="true">
                  {item.type === 'image' ? (
                    <img src={item.src} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <>
                      {item.poster && <img src={item.poster} alt="" loading="lazy" decoding="async" />}
                      <span className="project-thumb-video" aria-hidden="true">
                        <Play size={12} fill="currentColor" />
                      </span>
                    </>
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="feature-content">
        <p className="project-tag">
          {project.type} <span className="project-tag-dot" /> {project.status}
        </p>
        <h3 className="project-name">
          {project.url ? (
            <a className="project-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} website in a new tab`}>
              {project.name}
              <span className="project-link-arrow" aria-hidden="true">
                <ExternalLink size={14} />
              </span>
            </a>
          ) : (
            project.name
          )}
        </h3>
        <p className="project-summary">{project.summary}</p>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="project-highlights">
            {project.highlights.map(highlight => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        <ul className="project-chips">
          {project.details.map(detail => (
            <li className="project-chip" key={detail}>
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ProjectMediaPreview({ media }: { media: ProjectMedia }) {
  const embedUrl = media.type === 'video' ? getYouTubeEmbedUrl(media.src) : null;

  if (media.type === 'image') {
    return <img src={media.src} alt={media.alt} loading="lazy" decoding="async" />;
  }

  if (embedUrl) {
    return <iframe src={embedUrl} title={media.alt} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />;
  }

  return <video src={media.src} poster={media.poster} controls playsInline preload="metadata" aria-label={media.alt} />;
}
