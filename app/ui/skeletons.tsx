// app/ui/skeletons.tsx
export function TableSkeleton() {
  return (
    <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded-md w-full mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-700 rounded-md w-full mb-4" />
        ))}
      </div>
    </div>
  );
}