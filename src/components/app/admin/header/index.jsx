import React from "react";
import Notification from "../../notification";
import GroupChat from "../../admin/group-chat";
import AppSearchBar from "./app-search-bar";
import chatSound from "@/assets/mp3/chat.wav";
import useSound from "../../sound/use-sound";
import LanguageToggle from "../../lang/lang-toggle";
import UserNav from "./user-nav";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { BellRing, Mail, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { ModeToggle } from "../../theme/mode-toggle";
import { io } from "socket.io-client";
import { apiUrl } from "@/constants/api";
import { useTranslation } from "react-i18next";
import { showToast } from "../../toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { DialogTitle } from "@radix-ui/react-dialog";

const SOCKET = io(apiUrl);

/**
 * @Functional component for the header of the App.
 * @It includes various states such as notification count, chat count, unread messages, chat open status, date, etc.
 * @It also uses hooks like useSound, useTranslation, useState, and useEffect.
 * @Additionally, it renders components like Sheet, SheetTrigger, ModeToggle, and LanguageToggle.
 * @returns JSX element representing the header of the App.
 */

const AppHeader = () => {
  const play = useSound(chatSound);
  const isMobile = useIsMobile();
  const [t, i18n] = useTranslation("admin");
  const [chatcount, setChatcount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notiCount, setNoticount] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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
      console.table(message);
      if (!isChatOpen) {
        play();
        showToast(
          <div className='font-bold'>New message from @{message.sender}</div>,
          "msg",
          false,
          {
            description: message.content,
            duration: 5000,
          }
        );
        setChatcount((prev) => prev + 1);
        setUnreadMessages((prev) => [...prev, message]);
      }
    });

    SOCKET.on("receiveNotification", (notification) => {
      console.table(notification);
      if (!isNotificationOpen) {
        play();
        showToast(
          <div className='font-bold'>New notification</div>,
          "msg",
          false,
          {
            description: notification.content,
            duration: 5000,
          }
        );
        setNoticount((prev) => prev + 1);
        setUnreadNotifications((prev) => [...prev, notification]);
      }
    });

    return () => {
      clearInterval(interval);
      SOCKET.off("receiveGroup");
      SOCKET.off("receiveNotification");
    };
  }, [isChatOpen, isNotificationOpen, i18n.language]);

  const handleChatOpen = () => {
    setIsChatOpen(true);
    setChatcount(0);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  const handleNotificationOpen = () => {
    setIsNotificationOpen(true);
    setNoticount(0);
  };

  const handleNotificationClose = () => {
    setIsNotificationOpen(false);
  };

  return (
    <header className='sticky top-0 z-10 bg-background flex h-12 items-center justify-between gap-2 px-4 border-b'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        {isMobile ? "" : <Label>{date}</Label>}
      </div>
      <div className='flex gap-3'>
        <Dialog>
          <DialogTitle></DialogTitle>
          <DialogTrigger asChild>
            {isMobile ? (
              <Button size='icon' variant='icon' className='w-4'>
                <Search />
              </Button>
            ) : (
              <Button
                variant='outline'
                className='ps-8 text-muted-foreground h-[32px] min-w-52 relative text-start'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                {t("sidebar.search")}
              </Button>
            )}
          </DialogTrigger>
          <AppSearchBar />
        </Dialog>

        <Sheet
          onOpenChange={(open) =>
            open ? handleChatOpen() : handleChatClose()
          }>
          {isChatOpen && <GroupChat onClose={() => setIsChatOpen(false)} />}

          <SheetTrigger>
            <div className='relative'>
              <Mail size={16} />
              {chatcount > 0 && (
                <span className='absolute top-2 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white -translate-y-2 translate-x-2'>
                  {chatcount}
                </span>
              )}
            </div>
          </SheetTrigger>
        </Sheet>

        <Sheet
          onOpenChange={(open) =>
            open ? handleNotificationOpen() : handleNotificationClose()
          }>
          {isNotificationOpen && (
            <Notification onClose={() => setIsNotificationOpen(false)} />
          )}
          <SheetTrigger>
            <div className='relative'>
              <BellRing size={16} />
              {notiCount > 0 && (
                <span className='absolute top-2 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white -translate-y-2 translate-x-2'>
                  {notiCount}
                </span>
              )}
            </div>
          </SheetTrigger>
        </Sheet>

        {isMobile ? (
          <UserNav />
        ) : (
          <div className='flex gap-3'>
            <ModeToggle />
            <LanguageToggle />
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
