import dynamic from "next/dynamic";
import Head from "next/head";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});

type Props = {
  children: JSX.Element;
};

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <>
      <Head>
        <title>v-short</title>
        <meta name="description" content="A link shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeToggle />

      <div className="dark:text-gray-200">
        <div className="container flex flex-col items-center justify-center min-h-screen p-10 px-0 mx-auto md:py-20 md:p-10 md:px-0">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
