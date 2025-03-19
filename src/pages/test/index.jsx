import LanguageToggle from "@/components/app/lang/lang-toggle";
import React from "react";
import { useTranslation } from "react-i18next";

const Test = () => {
  const [lang] = useTranslation("global");
  return (
    <>
      <LanguageToggle />
      <p>{lang("home.body")}</p>;
    </>
  );
};

export default Test;
