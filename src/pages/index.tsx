import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import { Form } from "../components/Form";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <>
        <h1 className="font-extrabold text-center text-7xl">
          <span className="text-blue-500">v-short</span>
        </h1>
        <h3 className="items-center m-5 text-3xl">Create a new short link</h3>
        <Form />
      </>
    </Layout>
  );
};

export default Home;
