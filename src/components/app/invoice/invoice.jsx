import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import InvoiceHeader from "./components/inv-header";
import InvoiceContent from "./components/inv-content";
import InvoiceTable from "./components/inv-table";
import InvoiceFooter from "./components/inv-footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import FormSelect from "../form/form-select";
import { logo } from "@/utils/resize-crop-image";
import axiosInstance from "@/providers/axios-instance";

const METHOD = [
  {
    value: "cash",
    data: "Cash",
  },
  {
    value: "leave",
    data: "On Leave",
  },
];
const TYPE = [
  {
    value: "sale",
    data: "Sale",
  },
  {
    value: "room",
    data: "Room",
  },
];

const Invoice = () => {
  const cardRef = useRef();
  const [method, setMethod] = useState("cash");
  const [type, setType] = useState("sale");

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

  const handleMethodChange = (event) => {
    setMethod(event);
    console.log(event);
  };
  const handleTypeChange = (event) => {
    console.log(event);
    setType(event);
  };

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <Label>Download Invoice</Label>
          <Button onClick={handleDownloadPDF} className="w-[150px] ">
            Download PDF
          </Button>
          <Button onClick={handleSaveAsJPG} className="w-[150px] ">
            Download JPG
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <FormSelect
            onCallbackSelect={handleTypeChange}
            item={TYPE}
            label="Type"
            placeholder="Sale"
            size={150}
          />
          <FormSelect
            onCallbackSelect={handleMethodChange}
            item={METHOD}
            label="Method"
            placeholder="Cash"
            size={150}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Card
          ref={cardRef}
          className="w-[10cm] text-center rounded-none  max-h-[13cm] overflow-y-auto "
        >
          <InvoiceHeader brand="Hotel Jee Heang" logo={logo} />
          <CardContent className="px-3">
            <Separator className="mb-1" />
            <InvoiceContent payment={method} />
            <Separator />
            <InvoiceTable type={type} />
            <Separator />
            <InvoiceFooter method={method} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Invoice;
