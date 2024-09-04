import routeGuard from "@/utils/route-guard";
import { createClientServer } from "@/utils/supabase/server-props";

const RedirectEmpty = () => {
  return <></>;
};
export default RedirectEmpty;
export const getServerSideProps = async (context) => {
  const supabase = createClientServer(context);
  const { data, error } = await supabase.auth.getUser();
  const isLoggedin = !error && !!data;

  return routeGuard([isLoggedin], "/login", {
    redirect: {
      destination: "/dashboard",
      permanent: false,
    },
  });
};
