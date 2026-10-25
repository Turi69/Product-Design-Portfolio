import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Intro } from './components/Intro';
import { NavPill } from './components/NavPill';
import { TopBar } from './components/TopBar';
import { About } from './pages/About';
import { Index } from './pages/Index';
import { Project } from './pages/Project';
import { Works } from './pages/Works';

/** On route change: back to the top (unless jumping to an anchor) and focus the new view. */
function useRouteFocus() {
  const { pathname, hash } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
    if (first.current) {
      first.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash]);
  return mainRef;
}

export default function App() {
  const location = useLocation();
  const mainRef = useRouteFocus();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <TopBar />
      <main id="main" ref={mainRef} tabIndex={-1} className="view" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/work" element={<Works />} />
          <Route path="/work/:slug" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Project />} />
        </Routes>
      </main>
      <NavPill />
      <Intro />
    </>
  );
}
