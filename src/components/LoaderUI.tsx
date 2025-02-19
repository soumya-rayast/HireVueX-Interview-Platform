import { LoaderIcon } from "lucide-react";

function LoaderUI() {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <LoaderIcon className="h-10 w-10 animate-spin text-blue-500" />
      <p className="text-sm text-gray-500">Loading, please wait...</p>
    </div>
  );
}
export default LoaderUI;
