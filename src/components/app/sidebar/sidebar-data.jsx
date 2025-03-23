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
    avatar:
      "https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/469352317_1283607016000100_1286030378446066601_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_aid=0&_nc_eui2=AeG79Rk1zvUWghTCrIv12dogzDtT2mYYYOfMO1PaZhhg55m2Jw2hyLLaQl2d54ScWrnwyYcYK1ZJTNwaDUc489nj&_nc_ohc=MjkikLn8jJEQ7kNvgF5FGim&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=ARjDN7e99KRauDSBwxKBQAP&oh=00_AYCY4rRIR_QocASnwlA9XZYsT9ADiY_DzCvGq91CWY-Qfg&oe=677ECBA7",
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
      url: "/",
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
