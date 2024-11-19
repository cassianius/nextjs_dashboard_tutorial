'use client';
import {
  UserGroupIcon,
  UserCircleIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentIcon,
  BriefcaseIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Interviews', href: '/dashboard/interviews', icon: ClipboardDocumentIcon },
  { name: 'Applicants', href: '/dashboard/applicants', icon: UserGroupIcon },
  { name: 'Companies', href: '/dashboard/applicants', icon: BriefcaseIcon },
  { name: 'Account', href: '/dashboard/account', icon: UserCircleIcon },
  { name: 'Help', href: '/dashboard/help', icon: QuestionMarkCircleIcon },
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