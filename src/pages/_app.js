import LayoutComponent from "@/components/Layout";
import "@/styles/globals.css";
import { publicUrl } from "@/utils/public-url";
import { useRouter } from "next/router";


export default function App({ Component, pageProps }) {
  const router = useRouter();
  // console.log(router.pathname, 'router.pathName');
  return publicUrl.includes(router.pathname) ? (
    <Component {...pageProps} />
  ) : (
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}
