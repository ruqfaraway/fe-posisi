import LayoutComponent from "@/components/Layout";
import "@/styles/globals.css";
import { publicUrl } from "@/utils/public-url";
import { useRouter } from "next/router";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // console.log(router.pathname, 'router.pathName');
  return (
    <>
      <main
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {publicUrl.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <LayoutComponent>
            <Component
              {...pageProps}
              className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
              )}
            />
          </LayoutComponent>
        )}
        <Toaster/>
      </main>
    </>
  );
}
