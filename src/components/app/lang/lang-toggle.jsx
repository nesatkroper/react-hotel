import React, { useEffect, useState } from "react";
import en_flag from "@/assets/images/en.png";
import kh_flag from "@/assets/images/kh.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const [t, i18n] = useTranslation("admin");
  const [langKey, setLangKey] = useState();

  useEffect(() => {
    setLangKey(localStorage.getItem("lang-key"));
    i18n.changeLanguage(langKey);
  }, [langKey]);

  const hangleChangeLanguage = (lang) => {
    localStorage.setItem("lang-key", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Languages size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => hangleChangeLanguage("en")}>
          <img
            src={en_flag}
            alt='flag'
            className='h-[20px] rounded-sm shadow-sm'
          />
          {t("lang.en")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => hangleChangeLanguage("kh")}>
          <img
            src={kh_flag}
            alt='flag'
            className='h-[20px] rounded-sm shadow-sm'
          />
          {t("lang.kh")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
