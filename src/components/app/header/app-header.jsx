import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { BellRing, Mail, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { ModeToggle } from "../theme/mode-toggle";
import { local } from "@/utils/resize-crop-image";
import { io } from "socket.io-client";
import NotificationSheet from "./notification-sheet";
import GroupChat from "./group-chat";
import AppSearchBar from "./app-search-bar";
import chatSound from "@/assets/mp3/chat.wav";
import useSound from "../sound/use-sound";

const SOCKET = io(local);

const AppHeader = () => {
  const play = useSound(chatSound);
  const [notiCount] = useState(2);
  const [chatcount, setChatcount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [date, setDate] = useState(
    new Date().toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "medium",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(
        new Date().toLocaleString("en-US", {
          dateStyle: "long",
          timeStyle: "medium",
        })
      );
    }, 1000);

    SOCKET.on("receiveGroup", (message) => {
      play();
      if (!isChatOpen) {
        setChatcount((prev) => prev + 1);
        setUnreadMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      clearInterval(interval);
      SOCKET.off("receiveGroup");
    };
  }, [isChatOpen]);

  const handleChatOpen = () => {
    setIsChatOpen(true);
    setChatcount(0);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <header className="flex h-12 items-center justify-between gap-2 px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Label>{date}</Label>
      </div>
      <div className="flex gap-1">
        <Dialog>
          <DialogTrigger className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Button
              variant="outline"
              className="ps-8 text-muted-foreground h-[32px]"
            >
              Search something ...
            </Button>
          </DialogTrigger>
          <AppSearchBar />
        </Dialog>
        <Sheet
          onOpenChange={(open) => (open ? handleChatOpen() : handleChatClose())}
        >
          <GroupChat messages={unreadMessages} />
          <SheetTrigger>
            <div className="relative">
              <Button variant="icon" className="p-2">
                <Mail />
              </Button>
              {chatcount > 0 && (
                <span className="absolute top-2 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white -translate-y-2 translate-x-2">
                  {chatcount}
                </span>
              )}
            </div>
          </SheetTrigger>
        </Sheet>

        {/* Notification Sheet */}
        <Sheet>
          <NotificationSheet />
          <SheetTrigger>
            <div className="relative">
              <Button variant="icon" className="p-2">
                <BellRing size={28} />
              </Button>
              {notiCount > 0 && (
                <span className="absolute top-2 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white -translate-y-2 translate-x-2">
                  {notiCount}
                </span>
              )}
            </div>
          </SheetTrigger>
        </Sheet>

        <ModeToggle />
      </div>
    </header>
  );
};

export default AppHeader;
