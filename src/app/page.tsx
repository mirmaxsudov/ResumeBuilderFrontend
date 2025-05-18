import React from "react";
import Header from "@/components/home/header/Header";
import JoinInfo from "@/components/home/info/JoinInfo";
import Nav from "@/components/home/nav/Nav";
import { getCountOfUsers } from "@/api/requests/home/home.api";
import dynamic from "next/dynamic";

const InfoAbout = dynamic(() => import("@/components/home/info/InfoAbout"));

const Home = async () => {
  const countOfUsers = (await getCountOfUsers()).data;

  return (
    <>
      <Nav />
      <Header countOfUsers={countOfUsers} />
      <InfoAbout />
      <JoinInfo countOfUsers={countOfUsers} />
    </>
  );
};

export default Home;
