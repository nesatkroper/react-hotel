import React from "react";
import Layout from "@/layout/layout";
import { useSelector } from "react-redux";

const Home = () => {
  const { role } = useSelector((state) => state.role);
  return <Layout>{role}</Layout>;
};

export default Home;
