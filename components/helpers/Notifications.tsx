"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "../ui/use-toast";

const notifications = [
  {
    id: 1,
    content: "Hi Edunova team!",
    time: "2 hours ago",
  },
  {
    id: 2,
    content: "The app has been pushed to vercel.",
    time: "4 hours ago",
  },
  {
    id: 3,
    content: "The app is ready!",
    time: "1 day ago",
  },
];

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);

  function openNotification() {
    toast({
      title: "👋 Hi EduNova Team.",
      description: `You can find the source code for this website at https://github.com/0xSalik/edunova-assessment. Hope you like this project. Thank You!!`,
    });
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline">
          <Bell className="h-4 w-4" />
          {notifications.length > 0 && (
            <span className="top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h3 className="font-bold mb-3">Notifications</h3>
        <ScrollArea className="h-[300px] pr-4">
          {notifications.map((notification) => (
            <div
              onClick={openNotification}
              key={notification.id}
              className="flex hover:bg-muted rounded-lg items-start space-x-4"
            >
              <div className="p-2 rounded-lg">
                <p className="text-sm font-semibold">{notification.content}</p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
