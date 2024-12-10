import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from "next/image";

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >

        <Image
          src={'/logo_icon.png'}
          width={34}
          height={34}
          // className="hidden md:block"
          alt="Convocast icon"
        />


      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <p className="text-[23px] pb-1">convocast</p>
    </div>
  );
}
