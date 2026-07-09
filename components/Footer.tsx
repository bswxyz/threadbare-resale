import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" aria-label="Footer">
      <div className="wrap">
        <p className="foot-mark" aria-hidden="true">
          THREADBARE
        </p>
        <div className="foot-cols">
          <div>
            <h3>Shop</h3>
            <a href="#rack">The rack</a>
            <a href="#stories">Story tags</a>
            <a href="#impact">Carbon counter</a>
          </div>
          <div>
            <h3>Sell</h3>
            <a href="#sell">How it works</a>
            <a href="#sell">Fees (spoiler: 10%)</a>
            <a href="#rack">Grading guide</a>
          </div>
          <div>
            <h3>Threadbare</h3>
            <a href="#top">Manifesto</a>
            <a href="#impact">Impact math</a>
            <Link href="/guide/">How this site was built</Link>
          </div>
        </div>
        <div className="foot-base">
          <p>
            Loved once. Wanted twice. · A fictional product — every garment, seller and statistic
            is invented.
          </p>
          <p>
            Designed &amp; built by Fable · <Link href="/guide/">How this was built →</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
