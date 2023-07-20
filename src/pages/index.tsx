import Image from "next/image";
import React from "react";
import mainPage from "../assets/mainpage.png"

function index() {
  return (
    <main className="md:pl-[15vw]">
      <section className="p-16 w-full h-screen">
        <section className="flex flex-col justify-center items-center w-full h-full">
          <Image src={mainPage} alt="main"/>
          <br />
          <p>Create Tables, Lists and List Items!</p>
        </section>
      </section>
    </main>
  );
}

export default index;
