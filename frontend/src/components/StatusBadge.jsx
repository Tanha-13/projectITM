import { useState, forwardRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const StatusBadge = forwardRef(({ status, onStatusChange }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusStyles = {
    "Not started": "bg-gray-100 hover:bg-gray-200 text-gray-800",
    "In progress": "bg-blue-100 hover:bg-blue-200 text-blue-800",
    Completed: "bg-green-100 hover:bg-green-200 text-green-800",
  };

  const statusOptions = ["Not started", "In progress", "Completed"];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div>
          <Badge
            ref={ref}
            variant="outline"
            className={`cursor-pointer ${statusStyles[status]}`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  status === "Not started"
                    ? "bg-gray-500"
                    : status === "In progress"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              />
              {status}
            </div>
          </Badge>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0">
        <div className="flex flex-col">
          {statusOptions.map((option) => (
            <Button
              key={option}
              variant="ghost"
              className="justify-start"
              onClick={() => {
                onStatusChange(option);
                setIsOpen(false);
              }}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  option === "Not started"
                    ? "bg-gray-500"
                    : option === "In progress"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              />
              {option}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
});

StatusBadge.displayName = "StatusBadge";

export default StatusBadge;
