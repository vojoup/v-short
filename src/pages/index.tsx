import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import { Form } from "../components/Form";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>v-short</title>
        <meta name="description" content="An experiment with the t3 stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex flex-col items-center justify-center min-h-screen p-10 px-0 mx-auto md:py-20 md:p-10 md:px-0">
        <h1 className="font-extrabold text-center text-7xl">
          <span className="text-blue-500">v-short</span>
        </h1>
        <h3 className="items-center m-5 text-3xl">Create a new short link</h3>
        <Form />
      </div>
    </>
  );
};

export default Home;
