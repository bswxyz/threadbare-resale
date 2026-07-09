import Link from 'next/link';

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-row">
        <a className="wordmark" href="#top" aria-label="Threadbare — home">
          THREAD<span>BARE</span>
        </a>
        <nav aria-label="Primary">
          <a href="#rack">The rack</a>
          <a href="#stories" className="nav-hide-sm">
            Stories
          </a>
          <a href="#impact" className="nav-hide-sm">
            Impact
          </a>
          <a href="#sell">Sell</a>
          <Link href="/guide/" className="nav-guide">
            Guide
          </Link>
        </nav>
      </div>
    </header>
  );
}
