import SideNav from '@/app/ui/nav/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-900 h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-48"> {/* Changed from md:w-64 to md:w-48 */}
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}