import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { ChangeEventHandler } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  const crerateSlugMutation = trpc.useMutation(["shortLink.add"]);

  const [url, setUrl] = React.useState("");
  const [slug, setSlug] = React.useState("");

  const onUrlChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUrl(e.target.value);
  };
  const onSlugChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSlug(e.target.value);
  };

  const onGenerate = () => {
    crerateSlugMutation.mutate({ url, slug });
  };

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

        <main className="flex gap-2 flex-col">
          {crerateSlugMutation.isError ? (
            <span className="text-red-500">Something went wrong!</span>
          ) : null}

          <input
            className="border-blue-500 border-solid border-2 rounded-md py-2 px-3 leading-tight w-full"
            id="url"
            type="url"
            value={url}
            name="url-input"
            onChange={onUrlChange}
            placeholder="URL"
            autoFocus
          />
          <input
            className="border-blue-500 border-solid border-2 rounded-md py-2 px-3 leading-tight w-full"
            id="slug"
            type="slug"
            value={slug}
            name="slug-input"
            onChange={onSlugChange}
            placeholder="Slug"
            autoFocus
          />

          <button
            id="generate"
            className="text-white bg-blue-500 rounded-md py-2 px-3 hover:bg-blue-500 hover:bg-blue-600"
            onClick={onGenerate}
          >
            {crerateSlugMutation.isLoading ? "Generating..." : "Generate"}
          </button>

          {crerateSlugMutation.isSuccess ? (
            <div>Shortened: {crerateSlugMutation.data?.slug}</div>
          ) : null}
        </main>
      </div>
    </>
  );
};

export default Home;
