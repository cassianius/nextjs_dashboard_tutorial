import { signOut } from "@/auth";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function Account() {
    return <main>
      <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-transparent p-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-transparent md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6 text-gray-300 hover:text-white" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
    </main>


}