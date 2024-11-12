// app/not-found.tsx
import AcmeLogo from '@/app/ui/acme-logo';
import { lusitana } from '@/app/ui/fonts';
import { Button } from '@/app/ui/button';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-gray-900 p-3 md:h-20">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        
        <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
          <div className="flex flex-col items-center justify-center">
            <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500 mb-4" />
            <h1 className={`${lusitana.className} mb-3 text-white text-2xl text-center`}>
              Interview Not Available
            </h1>
            <div className="text-center space-y-4">
              <p className="text-gray-300 text-sm">
                This interview either doesn't exist or is no longer active.
              </p>
              <p className="text-gray-400 text-sm">
                Please check your link or contact the organizer for assistance.
              </p>
            </div>

            {/* <div className="mt-8 space-y-4">
              <Button 
                href="/"
                className="w-full bg-gray-800 hover:bg-gray-700"
              >
                Return Home
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}