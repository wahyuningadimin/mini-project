// components/Dropdown.tsx
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left px-0 z-50">
      {/* Dropdown Button */}
      <svg
        onClick={toggleDropdown}
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {user && user.role == "CUSTOMER" ? (
            <div className="py-1" role="none">
              <Link
                href='/customer'
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                role="menuitem"
                id="menu-item-2"
              >
                Your Events
              </Link>
            </div>
          ) : null}

          <div className="py-1" role="none">
            <a
              onClick={logout}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              role="menuitem"
              id="menu-item-2"
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
