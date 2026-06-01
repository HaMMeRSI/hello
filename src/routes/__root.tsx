import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { navItems, profile } from '../content/profile';
import './__root.css';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="site-shell">
      <header className="route-header">
        <Link to="/" className="route-logo" aria-label={`${profile.name} home`}>
          {profile.initials}
        </Link>

        <nav className="route-links" aria-label="Primary navigation">
          {navItems
            .filter(item => item.to !== '/')
            .map(item => (
              <Link key={item.to} to={item.to} className="route-link" activeProps={{ className: 'route-link is-active' }}>
                {item.label}
              </Link>
            ))}
        </nav>
      </header>

      <Outlet />
    </div>
  );
}
