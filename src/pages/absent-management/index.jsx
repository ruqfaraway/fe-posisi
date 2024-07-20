import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ContentWrapper from "@/components/customUI/ContentWrapper";
import MainTable from "@/components/customUI/MainTable";
import { Input } from "@/components/ui/input";
import MainButton from "@/components/customUI/MainButton";
import { useRouter } from "next/router";

const AbsentManagementPages = () => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
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
            <MainButton
              onClick={() => setDisabled(!disabled)}
              type="destructive"
            >
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
      shift: " 1",
      date: "2021-10-10",
    },
    {
      id: 2,
      name: "Jane Doe",
      shift: " 2",
      date: "2021-10-11",
    },
  ];
  return (
    <ContentWrapper>
      <div className="flex justify-between">
        <MainButton onClick={() => router.push("/volunteer-management/add")}>
          New Absent
        </MainButton>
        <form className="flex gap-2">
          <Input placeholder="Search" />
          <Button>Search</Button>
        </form>
      </div>
      <MainTable columns={columns} dataSource={data} rowkeys="id" />
    </ContentWrapper>
  );
};

export default AbsentManagementPages;
