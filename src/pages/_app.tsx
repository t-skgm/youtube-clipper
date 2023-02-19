import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { trpc } from "../infrastructure/trpc/trpc";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(App);
