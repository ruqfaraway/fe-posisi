import ContentWrapper from "@/components/customUI/ContentWrapper";
import EducationFormUpdate from "@/components/forms/EducationFormUpdate";
import UpdateUnitVolunteerPage from "@/components/forms/unit-volunteer/UpdateUnitVolunteerForm";
import routeGuard from "@/utils/route-guard";
import { createClientServer } from "@/utils/supabase/server-props";
import React from "react";

const DetailEducation = ({ unitVolunteerDetail }) => {
  return (
    <>
      <ContentWrapper>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Detail Education</h1>
        </div>
        <UpdateUnitVolunteerPage initialValues={unitVolunteerDetail} />
      </ContentWrapper>
    </>
  );
};

export default DetailEducation;

export const getServerSideProps = async (context) => {
  const supabase = createClientServer(context);
  const { data, error } = await supabase.auth.getUser();
  const { id } = context.query;
  let unitVolunteerDetail = {};
  try {
    const { data: dataDetail, error: errorDetail } = await supabase
      .from("tbl_unit")
      .select()
      .eq("id", id);
    if (errorDetail) {
      console.log(errorDetail, "error");
    }
    unitVolunteerDetail = dataDetail;
  } catch (error) {
    return error;
  }
  const isLoggedin = !!data && !error;
  return routeGuard([isLoggedin], "/", {
    props: {
      unitVolunteerDetail: unitVolunteerDetail[0],
    },
  });
};
