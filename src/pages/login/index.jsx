import LoginForm from "@/components/forms/LoginForm";
import routeGuard from "@/utils/route-guard";
import { createClientServer } from "@/utils/supabase/server-props";

const LoginPages = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen container mx-auto">
        <div className="rounded-xl shadow-lg w-2/6">
          <div className="p-3 flex flex-col">
            <h1 className="text-xl font-semibold p-2">Hi There..</h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPages;

export const getServerSideProps = async (context) => {
  const supabase = createClientServer(context);
  const { data, error } = await supabase.auth.getUser();
  const validator = error && data;
  return routeGuard([!!validator], "/", {
    props: {},
  });
};
