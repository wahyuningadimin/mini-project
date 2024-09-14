import Link from "next/link";

export default function Footer() {
    return (
        <>
        <footer className="footer bg-base-300 grid p-10">
  <nav>
    <h6 className="footer-title">Use Festiva</h6>
    <a className="link link-hover">Best Offers</a>
    <a className="link link-hover">Promo</a>
    <a className="link link-hover">Help Center</a>
    <a className="link link-hover">Privacy Policy</a>
    <a className="link link-hover">Terms and Conditions</a>
  </nav>
  <nav>
    <h6 className="footer-title">Information</h6>
    <Link className="link link-hover" href='/events/create'>Create Event</Link>
    <a className="link link-hover">Event Marketing Platform</a>
    <a className="link link-hover">Point of Sales</a>
    <a className="link link-hover">Pricing</a>
  </nav>
  <nav>
    <h6 className="footer-title">Find Events</h6>
    <Link className="link link-hover" href='/categories/concert'>Concert</Link>
    <Link className="link link-hover" href='/categories/musical'>Musical</Link>
    <Link className="link link-hover" href='/categories/play'>Play</Link>
    <Link className="link link-hover" href='/categories/classic'>Classic</Link>
  </nav>
  <nav>
    <h6 className="footer-title">Meet Festiva</h6>
    <a className="link link-hover">About Us</a>
    <a className="link link-hover">Blog</a>
    <a className="link link-hover">Careers</a>
    <a className="link link-hover">Press Kit</a>
  </nav>
</footer>

<footer className="footer footer-center bg-base-300 text-base-content rounded p-4">
    <div className="grid grid-flow-col gap-4">
      <a>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 16 16" 
          className="fill-current">
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
    
</footer>

<footer className="footer footer-center bg-base-300 text-base-content p-2">
  <aside>
    <p>Festiva © 2024 - All Right Reserved.</p>
  </aside>
</footer>
</>
    )
}