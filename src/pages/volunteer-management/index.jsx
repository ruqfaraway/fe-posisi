import { useState } from "react";
import { useRouter } from "next/router";
import { createClientComponent } from "@/utils/supabase/components";
import { createClientServer } from "@/utils/supabase/server-props";
import ContentWrapper from "@/components/customUI/ContentWrapper";
import MainButton from "@/components/customUI/MainButton";
import MainTable from "@/components/customUI/MainTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import routeGuard from "@/utils/route-guard";

const VolunteerManagementPages = ({ dataSource }) => {
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponent();
  const router = useRouter();

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("tbl_volunteer")
        .delete()
        .eq("id", id);
      if (error) {
        throw error;
      } else {
        router.reload();
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

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
            <MainButton
              disabled={loading}
              loading={loading}
              onClick={() =>
                router.push(`/volunteer-management/detail/${record.id}`)
              }
            >
              Detail
            </MainButton>
            <MainButton
              onClick={() => handleDelete(record.id)}
              type="destructive"
              loading={loading}
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
      email: " [email protected]",
      phone: "+123456789",
      address: "New York",
    },
  ];
  return (
    <ContentWrapper>
      <div className="flex justify-between">
        <MainButton onClick={() => router.push("/volunteer-management/add")}>
          Add Volunteer
        </MainButton>
        <form className="flex gap-2">
          <Input placeholder="Search" />
          <Button>Search</Button>
        </form>
        {/* <h1>Volunteer Management Pages</h1> */}
      </div>
      <MainTable columns={columns} dataSource={dataSource} rowkeys="id" />
    </ContentWrapper>
  );
};

export default VolunteerManagementPages;

export const getServerSideProps = async (context) => {
  const supabase = createClientServer(context);
  const { data, error } = await supabase.auth.getUser();
  const isLoggedin = !!data && !error;
  let dataSource = [];
  try {
    const { data: volunteerData, error: volunteerError } = await supabase
      .from("tbl_volunteer")
      .select("*");
    if (volunteerError) {
      console.log(volunteerError, "error");
    } else {
      dataSource = volunteerData;
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
