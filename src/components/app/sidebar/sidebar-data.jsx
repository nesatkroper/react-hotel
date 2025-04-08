import { image } from "./nav-user";
import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ClipboardPen,
  BedDouble,
} from "lucide-react";

export const data = {
  user: {
    name: "Suon Phanun",
    email: "phanunsuon@gmail.com",
    avatar: image,
  },
  teams: [
    {
      name: "Hotel Reservation",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "room",
      url: "#",
      icon: BedDouble,
      isActive: true,
      items: [
        {
          title: "all-room",
          url: "room",
        },
        {
          title: "room-pic",
          url: "room-picture",
        },
      ],
    },
    {
      title: "pro",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "all-pro",
          url: "product",
        },
        {
          title: "pro-cate",
          url: "category",
        },
        {
          title: "pro-brand",
          url: "brand",
        },
      ],
    },
    {
      title: "cate",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "sup",
          url: "supplier",
        },
        {
          title: "cus",
          url: "customer",
        },
      ],
    },
    {
      title: "human",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "emp",
          url: "employee",
        },
        {
          title: "dep",
          url: "department",
        },
        {
          title: "pos",
          url: "position",
        },
        {
          title: "auth",
          url: "authentication",
        },
        {
          title: "cus",
          url: "customer",
        },
        {
          title: "sup",
          url: "supplier",
        },
      ],
    },
    {
      title: "setting",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "gen",
          url: "#",
        },
        {
          title: "team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "home",
      url: "/home",
      icon: Frame,
    },
    {
      name: "po",
      url: "pos",
      icon: ClipboardPen,
    },
    {
      name: "dash",
      url: "/dashboard",
      icon: PieChart,
    },
    {
      name: "reserve",
      url: "/reservation",
      icon: Map,
    },
  ],
};
