import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import './main.css';

import { routeTree } from './routeTree.gen';

const HOME = '/';

function normalizePath(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

const router = createRouter({
  routeTree,
  // The new page always slides in. When leaving home, the home page also
  // slides off to the left ("home-leave"); for every other navigation the
  // outgoing page disappears instantly while the new one slides in.
  defaultViewTransition: {
    types: ({ fromLocation, toLocation }) => {
      if (!fromLocation) return false;

      const from = normalizePath(fromLocation.pathname);
      const to = normalizePath(toLocation.pathname);
      if (from === to) return false;

      if (from === HOME) return ['home-leave'];
      if (to === HOME) return ['home-enter'];

      return ['push'];
    },
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
