import ContentWrapper from "@/components/customUI/ContentWrapper";
import AddUnitVolunteerForm from "@/components/forms/unit-volunteer/AddUnitVolunteerForm";
import routeGuard from "@/utils/route-guard";
import { createClientServer } from "@/utils/supabase/server-props";
import React from "react";

const EducationAdd = () => {
  return (
    <>
      <ContentWrapper>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Add Unit Volunteer</h1>
        </div>
        <AddUnitVolunteerForm />
      </ContentWrapper>
    </>
  );
};

export default EducationAdd;

export const getServerSideProps = async (context) => {
  const supabase = createClientServer(context);
  const { data, error } = await supabase.auth.getUser();
  const isLoggedin = !!data && !error;

  return routeGuard([isLoggedin], "/", {
    props: {},
  });
};
