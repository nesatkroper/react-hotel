import FormInput from "@/components/app/form/form-input";
import Layout from "@/components/app/layout";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
console.log("API Key:", import.meta.env.VITE_API_KEY);

const Test = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    socket.emit("sendMessage", { sender: "Sale", content: input });
    setInput("");
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

// import { useState } from "react";
// import axios from "axios";
// import QRCode from "react-qr-code"; // Use react-qr-code instead

// function QRGenerator() {
//   const [amount, setAmount] = useState(0);
//   const [qrData, setQrData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const generateQR = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.post("http://localhost:3000/api/khqr", {
//         account: "suon_phanun@aclb",
//         name: "Suon Phanun",
//         city: "PHNOM PENH",
//         amount: parseFloat(amount),
//       });
//       setQrData(response.data.qr);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to generate QR code. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4">
//       <h1 className="text-2xl font-bold mb-4">Bakong KHQR Generator</h1>
//       <input
//         type="number"
//         placeholder="Enter Amount"
//         className="border p-2 mb-4 rounded w-64"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <button
//         onClick={generateQR}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         disabled={loading}
//       >
//         {loading ? "Generating..." : "Generate QR Code"}
//       </button>
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       {qrData && (
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">Your QR Code:</h2>

//           <div className="relative">
//             <QRCode value={qrData} size={300} />
//             {/* <div className="absolute inset-0 flex items-center justify-center">
//               <img
//                 src={defimg} // Replace with your logo path
//                 alt="Logo"
//                 className="w-16 h-16 rounded-full bg-white p-1"
//               />
//             </div> */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default QRGenerator;
