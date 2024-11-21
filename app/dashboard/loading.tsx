import LoadingIndicator from "../ui/shared/loading-indicator";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
      <LoadingIndicator />
    </div>
  );
}