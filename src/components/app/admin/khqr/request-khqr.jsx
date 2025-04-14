import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { cDollar } from "@/utils/dec-format";
import { io } from "socket.io-client";
import { apiUrl } from "@/constants/api";
import QRCode from "react-qr-code";
import axiosAuth from "@/lib/axios-auth";
import PropTypes from "prop-types";
import dollar from "@/assets/images/dollar.png";
import paymentSuccessSound from "@/assets/mp3/success.mp3";
import axios from "axios";
import jsCookie from "js-cookie";
import React from "react";

const SOCKET = io(apiUrl);

const RequestKHQR = () => {
  const audioRef = useRef(null);
  const [amount, setAmount] = useState(
    parseFloat(jsCookie.get("finalAmount")) || 0
  );
  const [qrData, setQrData] = useState(null);
  const [msg, setMsg] = useState("");
  const [form] = useState({
    account: "suon_phanun@aclb",
    name: "PHANUN SUON",
    city: "Siem Reap",
    amount: amount,
    currency: "usd",
  });

  const handleSendMessage = (data) => {
    if (!msg.trim()) return;
    SOCKET.emit("sendGroup", {
      data,
    });
    setMsg("");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newAmount = parseFloat(jsCookie.get("finalAmount")) || 0;
      setAmount(newAmount);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const validAmount = amount ?? 0;
    if (validAmount) handleGenerateQR();
  }, [amount]);

  const playAlertSound = () => {
    audioRef.current.play();
  };

  const handleGenerateQR = async () => {
    const validAmount = amount ?? 0;
    const formData = { ...form, amount: validAmount };
    try {
      const response = await axiosAuth.post("/khqr", formData);
      setQrData(response.data.qr);
      console.log("MD5:", response.data.md5);

      pollPaymentStatus(response.data.md5);
    } catch (error) {
      console.error("Failed to generate QR:", error);
      alert("Failed to generate QR code.");
    }
  };

  const pollPaymentStatus = (md5) => {
    const interval = setInterval(async () => {
      try {
        const status = await checkPaymentStatus(md5);
        if (status === "success") {
          playAlertSound();
          setQrData(null);
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error polling payment status:", error);
        clearInterval(interval);
      }
    }, 3000);

    setTimeout(() => {
      clearInterval(interval);
      setQrData(null);
      alert("KHQR Code Time out");
      console.log("Polling stopped after 3 minutes.");
    }, 70000);
  };

  const checkPaymentStatus = async (md5) => {
    try {
      const url = "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNDdjMGY2MzY4ZTFmNGFjYSJ9LCJpYXQiOjE3MzkzNDM1MTQsImV4cCI6MTc0NzExOTUxNH0.M0WDv6-p8iM-R3noFb0VkGz4f5X1131mDWOUudX_N5Q";

      const response = await axios.post(
        url,
        { md5 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data.responseCode === 0 &&
        response.data.responseMessage === "Success"
      ) {
        handleSendMessage(response.data.data);

        setQrData(null);
        return "success";
      }
    } catch (err) {
      console.log("Failed to check payment status:", err);
      return "pending";
    }
  };

  return (
    <Card className='w-full p-0'>
      <CardContent className='p-0'>
        <div className='bg-white shadow-lg rounded-lg'>
          <div className='bg-red-600 text-white text-center py-2 rounded-t-lg'>
            <h2 className='text-xl font-semibold'>KHQR</h2>
          </div>
          <div className='p-4 text-center'>
            <p className='text-gray-700 font-medium'>{form.name}</p>
            <p className='text-2xl font-bold text-gray-800'>
              {cDollar(amount)}
            </p>
            {qrData ? (
              <div className='mt-4 flex flex-col items-center relative'>
                <QRCode value={qrData} size={256} className='rounded-xl' />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <img src={dollar} alt='Logo' className='w-12 h-12' />
                </div>
                <p className='mt-2 text-sm text-gray-500'>
                  Scan the QR code above
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <audio ref={audioRef} src={paymentSuccessSound} />
      </CardContent>
    </Card>
  );
};

RequestKHQR.propTypes = {
  amount: PropTypes.number,
  currency: PropTypes.string,
};

RequestKHQR.defaultProps = {
  amount: 0,
};

export default RequestKHQR;
