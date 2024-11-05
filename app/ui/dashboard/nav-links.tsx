'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserCircleIcon,
  ClipboardIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  // { name: 'Home', href: '/dashboard', icon: HomeIcon },
  // { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon,},
  { name: 'Participants', href: '/dashboard/participants', icon: UserGroupIcon },
  { name: 'Interviews', href: '/dashboard/interviews', icon: ClipboardIcon },
  { name: 'Account', href: '/dashboard/account', icon: UserCircleIcon },

];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-gray-300 transition-colors hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'text-white': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}