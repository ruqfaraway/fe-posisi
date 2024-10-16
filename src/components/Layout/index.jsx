import menus from "@/utils/menus";
import { createClientComponent } from "@/utils/supabase/components";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import MainButton from "../customUI/MainButton";
import { useToast } from "@/hooks/use-toast";

const montserrat = Montserrat({ subsets: ["latin"] });
const LayoutComponent = ({ children }) => {
  const { toast } = useToast();
  const supabase = createClientComponent();

  const router = useRouter();
  const [open, setOpen] = useState(true);

  const signOut = async () => {
    await supabase.auth.signOut().then((res) => {
      if (res.error) {
        console.log(res.error.message, "error");
      }
      router.push("/login");
    });
  };

  return (
    <section className={`${montserrat.className} flex gap-6`}>
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 sticky top-2">
          {menus?.map((menu, i) => (
            <Link
              href={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="p-3 text-xl text-gray-900 font-semibold w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="bg-white w-full p-5 rounded-lg shadow-lg h-20">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl">
                  {menus.find((menu) => menu.link === router.pathname)?.name}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <MainButton
                  type="destructive"
                  onClick={() => {
                    signOut();
                    toast({
                      title: "Logout Successful",
                      description: "You have been logged out successfully",
                    });
                  }}
                >
                  {" "}
                  Logout
                </MainButton>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default LayoutComponent;

{
}
