import React from "react";
import Cookies from "js-cookie";
import axiosAuth from "@/lib/axios-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";
import { Send, ArrowDown } from "lucide-react";
import { io } from "socket.io-client";
import { dateFormat } from "@/utils/dec-format";
import { useDispatch } from "react-redux";
import { getUser } from "@/contexts/reducer/user-slice";
import { apiUrl } from "@/constants/api";

const SOCKET = io(apiUrl, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

const GroupChat = () => {
  const dispatch = useDispatch();
  const user = Cookies.get("user-info")
    ? JSON.parse(Cookies.get("user-info"))
    : null;
  const scrollRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);

  const fetchOldMessages = async () => {
    try {
      const response = await axiosAuth.get("/groupmessage/group?employee=true");
      setMessages(response?.data?.data);
    } catch (error) {
      console.error("Error fetching old messages:", error);
    }
  };

  useEffect(() => {
    dispatch(getUser());
    fetchOldMessages();

    SOCKET.on("receiveGroup", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => SOCKET.off("receiveGroup");
  }, []);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!msg.trim() || !user) return;
    SOCKET.emit("sendGroup", {
      sender: user.employee?.employee_name || "Admin",
      content: msg,
      time: new Date(),
    });
    setMsg("");
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
    setIsAtBottom(atBottom);
  };

  return (
    <SheetContent className='flex flex-col justify-between p-3 gap-0'>
      <div className='relative'>
        <SheetHeader>
          <SheetTitle className='text-center text-md'>
            System Group Chat
          </SheetTitle>
        </SheetHeader>
        <Separator className='my-3' />
        <div
          className='h-[83vh] w-[360px] overflow-y-auto rounded-xl'
          onScroll={handleScroll}
          ref={scrollRef}>
          {messages?.map((msg, index) => (
            <Card key={index} className='mb-1 w-[350px] shadow-none'>
              <CardHeader className='p-2 px-3 pb-0'>
                <CardTitle className='flex justify-between'>
                  <p className='text-sm ps-2'>
                    {msg.sender
                      ? msg.sender
                      : `${msg.employee?.first_name ?? "Admin"} ${
                          msg.employee?.last_name ?? " "
                        }`}
                  </p>
                  <p className='font-normal text-sm'>{dateFormat(msg.time)}</p>
                </CardTitle>
              </CardHeader>
              <CardContent className='p-3 pt-0'>
                <p className='text-wrap text-sm'>{msg.content}</p>
              </CardContent>
            </Card>
          ))}
          {!isAtBottom && (
            <Button
              onClick={scrollToBottom}
              className='absolute bottom-2 right-6 p-2 '>
              <ArrowDown size={20} />
            </Button>
          )}
        </div>
      </div>
      <div>
        <div className='flex gap-1 mb-2'>
          <Textarea
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            placeholder='Say something...'
          />
          <Button onClick={handleSendMessage} disabled={!msg} className='p-3'>
            <Send />
          </Button>
        </div>
      </div>
    </SheetContent>
  );
};

export default GroupChat;
