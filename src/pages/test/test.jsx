// import axiosAuth from "@/providers/axios-auth";

// const DownloadExcel = () => {
//   const downloadExcel = async () => {
//     try {
//       const response = await axiosAuth.get("/cart/export", {
//         responseType: "blob",
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "users.xlsx");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error("Error downloading the Excel file", error);
//     }
//   };

//   return (
//     <button
//       onClick={downloadExcel}
//       className="bg-blue-500 text-white px-4 py-2 rounded"
//     >
//       Download Excel
//     </button>
//   );
// };

// export default DownloadExcel;
import useSound from "@/components/app/sound/use-sound";
import axiosAuth from "@/providers/axios-auth";
import chatSound from "@/assets/mp3/chat.wav";
import { useRef } from "react";
import ChatSound from "@/components/app/sound/chat-sound";

const DownloadExcel = () => {
  // const play = useSound(chatSound);
  const play = useRef();
  const handlePlay = () => {
    if (play.current) play.current();
  };
  const downloadExcel = async () => {
    try {
      const response = await axiosAuth.get("/cart/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cart.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the Excel file", error);
    }
  };

  return (
    <div>
      <button
        onClick={downloadExcel}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download Excel
      </button>
      <ChatSound onRef={(p) => (play.current = p)} />
      <button onClick={handlePlay}>Play</button>
    </div>
  );
};

export default DownloadExcel;
