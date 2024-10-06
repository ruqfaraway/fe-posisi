import LoginForm from "@/components/forms/LoginForm";
import routeGuard from "@/utils/route-guard";
import { createClientServer } from "@/utils/supabase/server-props";
import Image from "next/image";
const Logo = require("../../../public/logo.svg");
const LoginPages = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen container mx-auto">
        <div className="rounded-xl shadow-lg lg:w-2/6 sm:w-3/4 max-sm:w-3/4">
          <div className="p-3 flex flex-col space-y-4">
            <Image
              src={Logo}
              width={120}
              height={50}
              alt="logo-pmi"
              className="m-auto"
            />
            <p className="text-center text-xl uppercase font-bold">
              Welcome to PMI Volunteer
            </p>

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
