import Layout from "@/components/app/layout";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/app/form/form-input";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
console.log("API Key:", import.meta.env.VITE_API_KEY);

const Test = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]); // Add new message to UI
    });

    return () => socket.off("receiveMessage");
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    socket.emit("sendMessage", { sender: "User", content: input }); // Send message
    setInput("");
  };

  const handleInputChange = (event) => {
    setMessages(event.target.value);
  };

  return (
    <Layout>
      <div className="flex gap-4">
        <FormInput
          value={input}
          onCallbackInput={(e) => setInput(e.target.value)}
          name="messages"
          label=""
        />
        {messages?.map((msg, index) => (
          <div key={index} className="p-2 my-2 bg-white rounded-lg shadow">
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </Layout>
  );
};

export default Test;
