import React from "react";
import axiosAuth from "@/lib/axios-auth";
import PropTypes from "prop-types";
import { SOCKET } from "@/providers/socket-io";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";
import { Send, ArrowDown, X, EllipsisVertical, Pen, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/contexts/reducer/user-slice";
import { motion, AnimatePresence } from "framer-motion";
import { groupMessagesByDate } from "./group";
import { messageVariants, sheetVariants } from "@/constants/variants";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import LazyLoading from "../../loading";

/**
 * @Functional component for a group chat interface.
 * @param {{Function}} onClose - Function to close the group chat.
 * @returns JSX element for the group chat interface.
 */

const GroupChat = ({ onClose }) => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const { usrData, usrLoading } = useSelector((state) => state.user);
  const { data: grmData } = useSelector((state) => state.groupmessage);
  const [t] = useTranslation("admin");
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  console.log(grmData);

  const fetchOldMessages = async () => {
    try {
      const response = await axiosAuth.get(
        `/groupmessage?select={"groupmessageId":true,"content":true,"time":true,"auth":{"select":{"authId":true,"employee":{"select":{"firstName":true,"lastName":true}}}}}&page=1&limit=15`
      );
      setMessages(response?.data?.data);
    } catch (error) {
      console.error("Error fetching old messages:", error);
    }
  };

  const handleSendMessage = () => {
    if (!msg.trim() || !usrData) return;
    SOCKET.emit("sendGroup", {
      sender: usrData.employee
        ? `${usrData.employee?.firstName} ${usrData.employee?.lastName}`
        : "Admin",
      authId: usrData.authId,
      content: msg,
      time: new Date(),
    });
    setMsg("");
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setIsAtBottom(true);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
    setIsAtBottom(atBottom);
  };

  const handleEditMessage = async (msg) => {
    setMsg(msg.content);
  };
  const groupedMessages = groupMessagesByDate(messages);

  useEffect(() => {
    dispatch(getUser());
    fetchOldMessages();

    SOCKET.on("receiveGroup", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => SOCKET.off("receiveGroup");
  }, [dispatch]);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  // console.log(usrData);

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={sheetVariants}
      className='fixed inset-y-0 right-0 w-full max-w-[450px] bg-background shadow-lg border-l z-50 flex flex-col'>
      <div className='p-2 flex-shrink-0'>
        <div className='flex justify-between items-center ps-10'>
          <h3 className='text-md font-semibold'>{t("chat.header")}</h3>
          <Button
            onClick={onClose}
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            aria-label='Close chat'>
            <X className='h-4 w-4' />
          </Button>
        </div>
        <Separator className='mt-2' />
      </div>

      {usrLoading ? (
        <LazyLoading />
      ) : (
        <div
          className='flex-1 overflow-y-auto px-2 pb-1'
          onScroll={handleScroll}
          ref={scrollRef}>
          <AnimatePresence initial={false}>
            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date} className='mb-4'>
                <div className='sticky top-0 z-10 flex justify-center my-2'>
                  <div className='bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground'>
                    {formatDisplayDate(date)}
                  </div>
                </div>

                {dateMessages.map((msg, index) => (
                  <motion.div
                    key={`${msg.time}-${index}`}
                    variants={messageVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    transition={{ duration: 0.2 }}
                    layout
                    className='mb-2'>
                    <Card
                      className={`rounded-md ${
                        usrData.authId == msg?.auth?.authId ? "ms-12" : "me-12"
                      }`}>
                      <CardHeader className='p-2 pb-1'>
                        <CardTitle
                          className={`flex justify-between items-center text-sm ${
                            usrData.authId == msg?.auth?.authId
                              ? "flex-row-reverse"
                              : ""
                          }`}>
                          <span className='font-bold'>
                            From{" "}
                            {msg?.auth?.employee
                              ? `${msg?.auth?.employee.firstName} ${msg?.auth?.employee.lastName}`
                              : msg.sender || "Admin"}
                          </span>
                          <div
                            className={`flex items-center gap-2 ${
                              usrData.authId == msg?.auth?.authId
                                ? "flex-row-reverse"
                                : ""
                            }`}>
                            <span className='text-muted-foreground text-xs underline'>
                              {msg.time}
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <EllipsisVertical size={16} />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className='me-2 min-w-7'>
                                <DropdownMenuItem
                                  onClick={() => handleEditMessage(msg)}
                                  className='text-yellow-600 h-6'>
                                  <Pen size={14} />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='text-red-600 h-6'>
                                  <Trash size={14} />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className='p-3 pt-0'>
                        <p
                          className={`text-sm mx-4 text-justify ${
                            usrData.authId == msg?.auth?.authId
                              ? "text-justify"
                              : ""
                          }`}>
                          {msg.content}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!isAtBottom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='absolute right-6 bottom-40'>
          <Button
            onClick={scrollToBottom}
            className='p-2'
            variant='outline'
            size='icon'>
            <ArrowDown size={16} />
          </Button>
        </motion.div>
      )}

      <div className='p-3 border-t'>
        <div className='flex gap-2 items-end'>
          <Textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder={t("chat.typ")}
            className='min-h-[80px] resize-none'
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!msg.trim()}
            size='icon'
            className='h-10 w-10 rounded-md'>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

GroupChat.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default GroupChat;
