import Link from "next/link"

export default function Navbar() {
  return (
    <div >
      <nav className="border-gray-200 flex">
        <div className="navbar px-4 max-w-screen-xl mx-auto bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><Link href={'/events/create'}>Create Event</Link></li>
                <li><Link href={'/log-in'}>Log In</Link></li>
                <li><Link href={'/register'}>Register</Link></li>
              </ul>
            </div>
            <p className="btn btn-ghost text-xl pl-0"><Link href={'/'}>Festiva</Link></p>
          </div>
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal">
              <li><Link href={'/events/create'}>Create Event</Link></li>
              <li><Link href={'/log-in'}>Log In</Link></li>
              <li><Link href={'/register'}>Register</Link></li>
            </ul>
          </div>
        </div>


      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link href={'/categories/concert'} className="text-gray-900 dark:text-white hover:underline" aria-current="page">Concert</Link>
              </li>
              <li>
                <Link href={'/categories/musical'} className="text-gray-900 dark:text-white hover:underline">Musical</Link>
              </li>
              <li>
                <Link href={'/categories/play'} className="text-gray-900 dark:text-white hover:underline">Play</Link>
              </li>
              <li>
                <Link href={'/categories/classic'} className="text-gray-900 dark:text-white hover:underline">Classic</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </div>
  )
}

