import { Link, Outlet, createRootRoute, useRouterState } from '@tanstack/react-router';
import { navItems, profile } from '../content/profile';
import './__root.css';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const pathname = useRouterState({ select: state => state.location.pathname });
  const isHome = pathname === '/';

  return (
    <div className="site-shell">
      {!isHome && (
        <header className="route-header">
          <Link to="/" className="route-logo" aria-label={`${profile.name} home`}>
            {profile.initials}
          </Link>

          <nav className="route-links" aria-label="Primary navigation">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="route-link"
                activeOptions={{ exact: item.to === '/' }}
                activeProps={{ className: 'route-link is-active' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
      )}

      <Outlet />
    </div>
  );
}
