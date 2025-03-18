import React from "react";
// import AppPaginationTable from "@/components/app/table/app-pagination-table";
// import FileUploadZone from "@/components/easy/file-upload-zone";
import Createnew from "@/components/easy/create-new";
import {FlickeringGrid} from "@/components/magicui/flickering-grid";
// import {
//   BellRing,
//   ClipboardList,
//   Flag,
//   Folder,
//   StickyNote,
//   Trophy,
// } from "lucide-react";

// const actionItems = [
//   {
//     link: "https://easyui.pro",
//     icon: <Folder />,
//     name: "Project",
//   },
//   {
//     link: "/task",
//     icon: <ClipboardList />,
//     name: "Task",
//   },
//   {
//     link: "/note",
//     icon: <StickyNote />,
//     name: "Note",
//   },
//   {
//     link: "/goal",
//     icon: <Trophy />,
//     name: "Goal",
//   },
//   {
//     link: "/milestone",
//     icon: <Flag />,
//     name: "Milestone",
//   },
//   {
//     link: "/reminder",
//     icon: <BellRing />,
//     name: "Reminder",
//   },
// ];

const Test = () => {
  // return <AppPaginationTable />;
  // return <FileUploadZone />;
  // return <Createnew actions={actionItems} />;
  return (
    <FlickeringGrid
      className="absolute inset-0 z-0 size-full [mask-image:radial-gradient(850px_circle_at_center,white,transparent)]"
      squareSize={4}
      gridGap={6}
      color="#60A5FA"
      maxOpacity={0.3}
      flickerChance={0.1}
    />
    // <FlickeringGrid
    //   className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
    //   squareSize={4}
    //   gridGap={6}
    //   color="#60A5FA"
    //   maxOpacity={0.5}
    //   flickerChance={0.1}
    // />
  );
};

export default Test;
