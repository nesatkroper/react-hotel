import React from "react";
import NotificationSheet from "./notification-sheet";
import GroupChat from "./group-chat";
import AppSearchBar from "./app-search-bar";
import chatSound from "@/assets/mp3/chat.wav";
import useSound from "../sound/use-sound";
import LanguageToggle from "../lang/lang-toggle";
import { Dialog, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { BellRing, Mail, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { ModeToggle } from "../theme/mode-toggle";
import { io } from "socket.io-client";
import { apiUrl } from "@/constants/api";
import { useTranslation } from "react-i18next";

const SOCKET = io(apiUrl);

const AppHeader = () => {
  const play = useSound(chatSound);
  const [t, i18n] = useTranslation("admin");
  const [notiCount] = useState(2);
  const [chatcount, setChatcount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const locale = i18n.language == "kh" ? "km-KH" : "en-US";
      const dateTime = new Date().toLocaleString(locale, {
        dateStyle: "long",
        timeStyle: "medium",
      });
      setDate(dateTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

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
  }, [isChatOpen, i18n.language]);

  const handleChatOpen = () => {
    setIsChatOpen(true);
    setChatcount(0);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <header className='sticky top-0 z-10 bg-background flex h-12 items-center justify-between gap-2 px-4 border-b'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Label>{date}</Label>
      </div>
      <div className='flex gap-1'>
        <Dialog>
          <DialogTitle></DialogTitle>
          <DialogTrigger asChild>
            <Button
              variant='outline'
              className='ps-8 text-muted-foreground h-[32px] min-w-52 relative text-start'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              {t("sidebar.search")}
            </Button>
          </DialogTrigger>
          <AppSearchBar />
        </Dialog>
        <Sheet
          onOpenChange={(open) =>
            open ? handleChatOpen() : handleChatClose()
          }>
          <GroupChat messages={unreadMessages} />
          <SheetTrigger asChild>
            <Button variant='ghost' className='p-2'>
              <Mail />
            </Button>
          </SheetTrigger>
        </Sheet>

        <Sheet>
          <NotificationSheet />
          <SheetTrigger asChild>
            <div className='relative'>
              <Button variant='ghost' className='p-2'>
                <BellRing size={28} />
              </Button>
              {notiCount > 0 && (
                <span className='absolute top-2 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white -translate-y-2 translate-x-2'>
                  {notiCount}
                </span>
              )}
            </div>
          </SheetTrigger>
        </Sheet>

        <ModeToggle />
        <LanguageToggle />
      </div>
    </header>
  );
};

export default AppHeader;
