import AcmeLogo from "@/app/ui/acme-logo";
import styles from '@/app/ui/home.module.css';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { lusitana } from '@/app/ui/fonts'

import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen bg-black flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-gray-900 p-4 md:h-20">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-black px-6 py-10 md:w-2/5 md:px-20">
          {/* <div className={styles.shape} /> */}
          <div className="text-xl text-white md:text-2xl md:leading-normal">

          <p ><strong>Welcome to Convocast.</strong></p>
          <p>The world's first audio-only AI interview tool for deep insights.</p>
          </div>
         
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-gray-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-900 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12 opacity-50" >
          <Image 
            src={'/hero-desktop.png'}
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop and mobile versions"
          />
          <Image
            src={'/hero-mobile.png'}
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
