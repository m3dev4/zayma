import { Input } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';

const NavItem = () => {
  return (
    <div className="flex items-center justify-between w-full px-24 py-4">
      <ul className="flex gap-6 space-x-4 items-center">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="size-6 absolute mt-2 ml-2"
          >
            <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z"
              clipRule="evenodd"
            />
          </svg>

          <Input
            className="bg-zinc-800 text-title py-3 px-11 rounded-full text-balance outline-none border-none font-poppins text-white"
            type="text"
            placeholder="Recherche par Boutique"
          />
        </li>
        <li>
          <Link href="" className="font-poppins text-white font-semibold">
            Découvrir
          </Link>
        </li>
        <li>
          <Link href="" className="font-poppins text-white font-semibold">
            Parcourir
          </Link>
        </li>
      </ul>
      <ul className="flex items-center gap-6 space-x-4">
        <li>
          <Link href="" className="font-poppins text-white font-semibold">
            Liste de souhaits
          </Link>
        </li>
        <li>
          <Link href="" className="font-poppins text-white font-semibold">
            Panier
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavItem;
