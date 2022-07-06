import Link from "next/link";
import React from "react";
import { ChangeEventHandler } from "react";
import { trpc } from "../utils/trpc";

const Form = () => {
  const [url, setUrl] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const utils = trpc.useContext();

  const createSlugMutation = trpc.useMutation(["shortLink.add"]);
  const { data: existingSlug } = trpc.useQuery(
    ["shortLink.getBySlug", { slug }],
    {
      retry: false,
    }
  );

  const onUrlChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUrl(e.target.value);
  };

  const onSlugChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setSlug(value);
    utils.invalidateQueries("shortLink.getBySlug");
  };

  const onGenerate = () => {
    createSlugMutation.mutate({ url, slug });
  };

  return (
    <main className="flex gap-2 flex-col">
      {createSlugMutation.isError ? (
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
        className={`${
          !!existingSlug ? "border-red-700" : "border-blue-500"
        } border-solid border-2 rounded-md py-2 px-3 leading-tight w-full`}
        id="slug"
        type="slug"
        value={slug}
        name="slug-input"
        onChange={onSlugChange}
        placeholder="Slug"
      />
      {!!existingSlug && (
        <label htmlFor="slug-input" className="text-red-700">
          This slug is taken!
        </label>
      )}
      <button
        id="generate"
        className="text-white bg-blue-500 rounded-md py-2 px-3 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-red-700"
        onClick={onGenerate}
        disabled={!!existingSlug}
      >
        {createSlugMutation.isLoading ? "Generating..." : "Generate"}
      </button>
      {createSlugMutation.isSuccess ? (
        <div className="text-lg">
          Shortened:{" "}
          <Link
            href={createSlugMutation.data?.fullUrl}
            target="_blank"
            rel="noreferrer"
          >
            {createSlugMutation.data?.fullUrl}
          </Link>
        </div>
      ) : null}
    </main>
  );
};

export { Form };
