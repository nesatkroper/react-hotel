import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axiosInstance from "@/lib/axios-instance";
import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { logo } from "@/utils/resize-crop-image";
import {
  InvoiceContent,
  InvoiceFooter,
  InvoiceHeader,
  InvoiceTable,
} from "./components";

const Invoice = (props) => {
  const { method = "cash", type = "sale", currency = "usd" } = props;

  const cardRef = useRef();

  const handleDownloadPDF = async () => {
    const originalCard = cardRef.current;

    const clonedCard = originalCard.cloneNode(true);
    clonedCard.style.maxHeight = "none";
    clonedCard.style.overflow = "visible";
    clonedCard.style.position = "absolute";
    clonedCard.style.top = "-9999px";
    document.body.appendChild(clonedCard);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const canvas = await html2canvas(clonedCard, {
      scale: 3,
      useCORS: true,
    });

    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("invoice.pdf");

    document.body.removeChild(clonedCard);
  };

  const handleSaveAsJPG = async () => {
    const originalCard = cardRef.current;

    const clonedCard = originalCard.cloneNode(true);
    clonedCard.style.maxHeight = "none";
    clonedCard.style.overflow = "visible";
    clonedCard.style.position = "absolute";
    clonedCard.style.top = "-9999px";
    document.body.appendChild(clonedCard);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const canvas = await html2canvas(clonedCard, {
      scale: 3,
      useCORS: true,
    });

    const imageData = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.href = imageData;
    link.download = "invoice.jpg";
    link.click();

    document.body.removeChild(clonedCard);

    const file = dataURLtoFile(imageData, "invoice.jpg");
    const filePath = await uploadToServer(file);

    return filePath;
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const uploadToServer = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/upload", formData);

    return response.data.filePath;
  };

  return (
    <div className='flex justify-center relative'>
      <Card
        ref={cardRef}
        className='w-[8cm] text-center rounded-none  max-h-[20cm] overflow-y-auto '>
        <InvoiceHeader brand='Hotel Jee Heang' logo={logo} />
        <CardContent className='px-3'>
          <Separator className='mb-1' />
          <InvoiceContent payment={method} />
          <Separator />
          <InvoiceTable type={type} currency={currency} />
          <Separator />
          <InvoiceFooter method={method} />
        </CardContent>
      </Card>
      <div className='flex gap-3 absolute bottom-[-47px] left-0'>
        <Button variant='outline' onClick={handleDownloadPDF} className=' '>
          PDF
        </Button>
        <Button variant='outline' onClick={handleSaveAsJPG} className=' '>
          JPG
        </Button>
      </div>
    </div>
  );
};

Invoice.propTypes = {
  method: PropTypes.string,
  type: PropTypes.string,
  currency: PropTypes.string,
};

export default Invoice;
