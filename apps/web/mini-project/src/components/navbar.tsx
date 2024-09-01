import Link from "next/link"

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>
          </div>
          <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><Link href={'/log-in'}>Log In</Link></li>
        <li><Link href={'/register'}>Register</Link></li>
        <li>
          <a>Categories</a>
          <ul className="p-2">
            <li><a>Concert</a></li>
            <li><a>Musical</a></li>
            <li><a>Play</a></li>
            <li><a>Classic</a></li>
          </ul>
        </li>
      </ul>
        </div>
        <p className="btn btn-ghost text-xl"><Link href={'/'}>Festiva</Link></p>
      </div>
      <div className="navbar-center lg:flex flex-1 justify-center">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-full md:w-auto lg:max-w-md" />
    </div>
    </div>

    

      <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li><Link href={'/log-in'}>Log In</Link></li>
    <li><Link href={'/register'}>Register</Link></li>
      <li>
        <details>
          <summary>Categories</summary>
          <ul className="p-2">
            <li><a>Concert</a></li>
            <li><a>Musical</a></li>
            <li><a>Play</a></li>
            <li><a>Classic</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
    </div>
  )
}

