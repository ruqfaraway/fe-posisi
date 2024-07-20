import React from "react";
import { FaUserGroup } from "react-icons/fa6";
// const montserrat =
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
const DashboardPage = () => {
  const cardData = [
    { id: 1, name: "Jumlah Relawan", total: 45 },
    { id: 2, name: "Jumlah Pelayanan", total: 50 },
    { id: 3, name: "Jumlah Pengiriman Bantuan", total: 55 },
  ];
  return (
    <div className={`${montserrat.className} w-full h-full rounded-md py-4`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {cardData.map((data) => (
          <div
            key={data.id}
            className="rounded-md bg-white p-5 flex gap-4 justify-between items-center"
          >
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">{data.name}</p>
              <h1 className="text-2xl font-bold">{data.total}</h1>
            </div>
            <FaUserGroup size={35} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
