import useMeetingActions from "@/hooks/useMeetingActions";
import { Doc } from "../../convex/_generated/dataModel";
import { getMeetingStatus } from "@/lib/utils";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CalendarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type Interview = Doc<"interviews">;

function MeetingCard({ interview }: { interview: Interview }) {
  const { joinMeeting } = useMeetingActions();
  const status = getMeetingStatus(interview);
  const formattedDate = format(new Date(interview.startTime), "EEEE, MMMM d · h:mm a");

  return (
    <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
      <CardHeader className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 text-gray-400" />
            {formattedDate}
          </div>
          <Badge
            variant={
              status === "live" ? "default" : status === "upcoming" ? "secondary" : "outline"
            }
            className={
              status === "live"
                ? "bg-green-500 text-white"
                : status === "upcoming"
                ? "bg-yellow-500 text-white"
                : "bg-gray-300 text-gray-700"
            }>
            {status === "live" ? "Live Now" : status === "upcoming" ? "Upcoming" : "Completed"}
          </Badge>
        </div>
        <CardTitle className="text-lg font-semibold dark:text-white text-gray-900">{interview.title}</CardTitle>
        {interview.description && (
          <CardDescription className="line-clamp-2 dark:text-white text-gray-600">
            {interview.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-4">
        {status === "live" && (
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 dark:text-white font-medium py-2 px-4 rounded-md"
            onClick={() => joinMeeting(interview.streamCallId)}
          >
            Join Meeting
          </Button>
        )}

        {status === "upcoming" && (
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-md cursor-not-allowed"
            disabled
          >
            Waiting to Start
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
export default MeetingCard;
