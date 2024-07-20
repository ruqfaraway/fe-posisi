import { useRouter } from "next/router";
import React from "react";

const LoginPages = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center items-center min-h-screen container mx-auto">
        <div className="rounded-xl shadow-lg w-2/6">
          <div className="p-3 flex flex-col">
            <h1 className="text-4xl font-bold text-center">Login</h1>
            <form className="flex flex-col gap-4 p-4">
              <input
                type="text"
                placeholder="Username"
                className="border-2 border-gray-300 p-2"
              />
              <input
                type="password"
                placeholder="Password"
                className="border-2 border-gray-300 p-2"
              />
              <input
                className="bg-blue-500 text-white p-1 rounded-md"
                type="submit"
                value="submit"
              />
            </form>
            <button onClick={() => router.push("/dashboard")}>next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPages;
