import React from "react";
import Header from "@/components/home/header/Header";
import InfoAbout from "@/components/home/info/InfoAbout";
import JoinInfo from "@/components/home/info/JoinInfo";
import Nav from "@/components/home/nav/Nav";

const Home = () => {
  return (
    <>
      <Nav />
      <Header />
      <InfoAbout />
      <JoinInfo />
    </>
  );
};

export default Home;
