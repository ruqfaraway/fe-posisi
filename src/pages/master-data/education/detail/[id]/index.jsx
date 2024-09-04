import ContentWrapper from "@/components/customUI/ContentWrapper";
import EducationFormUpdate from "@/components/forms/EducationFormUpdate";
import routeGuard from "@/utils/route-guard";
import { createClientServer } from "@/utils/supabase/server-props";
import React from "react";

const DetailEducation = ({ educationDetail }) => {
  return (
    <>
      <ContentWrapper>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Detail Education</h1>
        </div>
        <EducationFormUpdate initialValues={educationDetail} />
      </ContentWrapper>
    </>
  );
};

export default DetailEducation;

export const getServerSideProps = async (context) => {
  const supabase = createClientServer(context);
  const { data, error } = await supabase.auth.getUser();
  const { id } = context.query;
  let educationDetail = {};
  try {
    const { data: dataDetail, error: errorDetail } = await supabase
      .from("tbl_education")
      .select()
      .eq("id", id);
    if (errorDetail) {
      console.log(errorDetail, "error");
    }
    educationDetail = dataDetail;
  } catch (error) {
    return error;
  }
  const isLoggedin = !!data && !error;
  return routeGuard([isLoggedin], "/", {
    props: {
      educationDetail: educationDetail[0],
    },
  });
};
