import { CallRecording } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { calculateRecordingDuration } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { CalendarIcon, ClockIcon, CopyIcon, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";

function RecordingCard({ recording }: { recording: CallRecording }) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(recording.url);
      toast.success("Recording link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy link to clipboard");
    }
  };

  const formattedStartTime = recording.start_time
    ? format(new Date(recording.start_time), "MMM d, yyyy, hh:mm a")
    : "Unknown";

  const duration =
    recording.start_time && recording.end_time
      ? calculateRecordingDuration(recording.start_time, recording.end_time)
      : "Unknown duration";

  return (
    <Card className="group hover:shadow-lg transition-all rounded-xl border border-gray-200 p-4">
      <CardHeader className="space-y-3">
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{formattedStartTime}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <ClockIcon className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer group relative overflow-hidden"
          onClick={() => window.open(recording.url, "_blank")}
        >
          <div className="size-14 rounded-full bg-white/80 flex items-center justify-center group-hover:bg-primary transition-colors shadow-md">
            <PlayIcon className="size-6 text-gray-600 group-hover:text-white transition-colors" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-3 mt-4">
        <Button className="flex-1 bg-primary text-white hover:bg-primary-dark transition-all" onClick={() => window.open(recording.url, "_blank")}>
          <PlayIcon className="size-5 mr-2" />
          Play Recording
        </Button>
        <Button variant="outline" className="border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-all" onClick={handleCopyLink}>
          <CopyIcon className="size-5" />
        </Button>
      </CardFooter>
    </Card>

  );
}
export default RecordingCard;
