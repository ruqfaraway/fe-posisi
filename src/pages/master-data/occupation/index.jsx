import { ButtonIcon } from "@/components/customUI/ButtonIcon";
import ContentWrapper from "@/components/customUI/ContentWrapper";
import MainButton from "@/components/customUI/MainButton";
import MainTable from "@/components/customUI/MainTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import routeGuard from "@/utils/route-guard";
import { createClientComponent } from "@/utils/supabase/components";
import { createClientServer } from "@/utils/supabase/server-props";
import { useRouter } from "next/router";
import React, { useState } from "react";

const OccupationPages = ({ dataSource }) => {
  const supabase = createClientComponent();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("tbl_occupation")
        .delete()
        .eq("id", id);
      if (error) {
        setError(error.message);
        console.log(error, "error");
        setLoading(false);
      } else {
        router.push("/master-data/education");
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error catch");
      setLoading(false);
      return error;
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <MainButton
              loading={loading}
              onClick={() =>
                router.push(`/master-data/education/detail/${record.id}`)
              }
            >
              Detail
            </MainButton>
            <MainButton
              type="destructive"
              onClick={() => handleDelete(record.id)}
              loading={loading}
            >
              Delete
            </MainButton>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <ContentWrapper>
        {error && (
          <div className="bg-red-200 p-2 rounded-md flex justify-between items-center">
            <p className="text-red-500">{error}</p>
            <ButtonIcon onClick={() => setError(null)} />
          </div>
        )}
        <div className="flex justify-between">
          <MainButton onClick={() => router.push("/master-data/education/add")}>
            Add Occupation
          </MainButton>
          <form className="flex gap-2">
            <Input placeholder="Search" />
            <Button>Search</Button>
          </form>
        </div>
        <MainTable columns={columns} dataSource={dataSource} rowkeys="id" />
      </ContentWrapper>
    </>
  );
};

export default OccupationPages;

export const getServerSideProps = async (context) => {
  const supabase = createClientServer(context);
  const { data, error } = await supabase.auth.getUser();
  const isLoggedin = !!data && !error;
  let dataSource = [];
  try {
    const { data: educationData, error: error } = await supabase
      .from("tbl_occupation")
      .select("*")
      .order("name", { ascending: true });
    if (error) {
      console.log(error, "error");
    } else {
      dataSource = educationData;
    }
  } catch (error) {
    return error;
  }

  return routeGuard([isLoggedin], "/", {
    props: {
      dataSource,
    },
  });
};
