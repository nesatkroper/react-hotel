import React from "react";
import axiosAuth from "@/lib/axios-auth";
import PropTypes from "prop-types";
import { SOCKET } from "@/providers/socket-io";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { getUser } from "@/contexts/reducer/user-slice";
import { motion, AnimatePresence } from "framer-motion";
import { groupMessagesByDate } from "../admin/group-chat/group";
import { messageVariants, sheetVariants } from "@/constants/variants";

/**
 * @Functional component for displaying notifications.
 * @param {{function}} onClose - Function to close the notification.
 * @returns JSX element for the Notification component.
 */
const Notification = ({ onClose }) => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [messages, setMessages] = useState([]);
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

  const fetchOldMessages = async () => {
    try {
      const response = await axiosAuth.get("/notification?limit=15&page=1");
      setMessages(response?.data?.data);
    } catch (error) {
      console.error("Error fetching old messages:", error);
    }
  };

  useEffect(() => {
    dispatch(getUser());
    fetchOldMessages();

    SOCKET.on("receiveNotification", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => SOCKET.off("receiveNotification");
  }, [dispatch]);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

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

  const groupedMessages = groupMessagesByDate(messages);
  console.log(groupedMessages);

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={sheetVariants}
      className='fixed inset-y-0 right-0 w-full max-w-[450px] bg-background shadow-lg border-l z-50 flex flex-col'>
      <div className='p-2 flex-shrink-0'>
        <div className='flex justify-between items-center ps-10'>
          <h3 className='text-md font-semibold'>System Notification.</h3>
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
                  <Card className='rounded-md'>
                    <CardHeader className='p-2 pb-1'>
                      <CardTitle className='flex justify-between items-center text-sm'>
                        <span className='font-bold'>
                          From {msg.sender || "Admin"}
                        </span>
                        <div className='flex items-center gap-2'>
                          <span className='text-muted-foreground text-xs underline'>
                            {msg.createdAt}
                          </span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='p-3 pt-0 flex flex-col'>
                      <p className='text-sm font-bold ms-4'>{msg.title}</p>
                      <p className='text-sm mx-4 text-justify'>{msg.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ))}
        </AnimatePresence>
      </div>

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
    </motion.div>
  );
};

Notification.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Notification;
