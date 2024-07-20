import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ContentWrapper from "@/components/customUI/ContentWrapper";
import MainTable from "@/components/customUI/MainTable";
import { Input } from "@/components/ui/input";
import MainButton from "@/components/customUI/MainButton";
import { useRouter } from "next/router";

const VolunteerManagementPages = () => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <MainButton disabled={disabled} loading={disabled}>
              Edit
            </MainButton>
            <MainButton onClick={() => setDisabled(!disabled)} type="destructive">
              Delete
            </MainButton>
          </div>
        );
      },
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: " [email protected]",
      phone: "+123456789",
      address: "New York",
    },
  ];
  return (
    <ContentWrapper>
      <div className="flex justify-between">
        <MainButton onClick={()=> router.push('/volunteer-management/add')}>Add Volunteer</MainButton>
        <form className="flex gap-2">
          <Input placeholder="Search" />
          <Button>Search</Button>
        </form>
        {/* <h1>Volunteer Management Pages</h1> */}
      </div>
      <MainTable columns={columns} dataSource={data} rowkeys="id" />
    </ContentWrapper>
  );
};

export default VolunteerManagementPages;
