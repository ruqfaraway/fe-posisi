import ContentWrapper from "@/components/customUI/ContentWrapper";
import AddVolunteerForm from "@/components/forms/volunteer/AddVolunteerForm";
import routeGuard from "@/utils/route-guard";
import { createClientServer } from "@/utils/supabase/server-props";

const AddVolunteerManagementPages = ({
  unitList,
  kabupatenList,
  kecamatanList,
  kelurahanList,
  educationList,
  occupationList,
  religionList,
  volunteerTypeList,
}) => {
  return (
    <ContentWrapper>
      <h1 className="font-bold text-3xl">Tambah Data Relawan</h1>
      <p className="text-sm text-gray-500">
        Silahkan isi form berikut untuk menambahkan data relawan
      </p>
      <div>
        <AddVolunteerForm
          unitList={unitList}
          kabupatenList={kabupatenList}
          kecamatanList={kecamatanList}
          kelurahanList={kelurahanList}
          educationList={educationList}
          occupationList={occupationList}
          religionList={religionList}
          volunteerTypeList={volunteerTypeList}
        />
      </div>
    </ContentWrapper>
  );
};

export default AddVolunteerManagementPages;

export const getServerSideProps = async (context) => {
  const supabase = createClientServer(context);
  const { data, error } = await supabase.auth.getUser();
  const isLoggedin = !!data && !error;
  let unitList = [];
  let kabupatenList = [];
  let kecamatanList = [];
  let kelurahanList = [];
  let educationList = [];
  let occupationList = [];
  let religionList = [];
  let volunteerTypeList = [];
  try {
    const { data: resUnitData, error: error } = await supabase
      .from("tbl_unit")
      .select("*")
      .order("name", { ascending: true });
    if (error) {
      console.log(error, "error");
    } else {
      unitList = resUnitData;
    }
  } catch (error) {
    return error;
  }
  try {
    const { data: resKabupatenData, error: error } = await supabase
      .from("tbl_kabupaten")
      .select("*")
      .order("name", { ascending: true });
    if (error) {
      console.log(error, "error");
    } else {
      kabupatenList = resKabupatenData;
    }
  } catch (error) {
    return error;
  }
  try {
    const { data: resKecamatanData, error: error } = await supabase
      .from("tbl_kecamatan")
      .select("*")
      .order("name", { ascending: true });
    if (error) {
      console.log(error, "error");
    } else {
      kecamatanList = resKecamatanData;
    }
  } catch (error) {
    return error;
  }
  try {
    const { data: resKelurahanData, error: error } = await supabase
      .from("tbl_kelurahan")
      .select("*")
      .order("name", { ascending: true });
    if (error) {
      console.log(error, "error");
    } else {
      kelurahanList = resKelurahanData;
    }
  } catch (error) {
    return error;
  }
  try {
    const { data: resEducationData, error: error } = await supabase
      .from("tbl_education")
      .select("*")
      .order("name", { ascending: true });
    if (error) {
      console.log(error, "error");
    } else {
      educationList = resEducationData;
    }
  } catch (error) {
    return error;
  }
  try {
    const { data: resOccupationData, error: error } = await supabase
      .from("tbl_occupation")
      .select("*")
      .order("name", { ascending: true });
    if (error) {
      console.log(error, "error");
    } else {
      occupationList = resOccupationData;
    }
  } catch (error) {
    return error;
  }
  try {
    const { data: resReligionData, error: error } = await supabase
      .from("tbl_religion")
      .select("*")
      .order("name", { ascending: true });
    if (error) {
      console.log(error, "error");
    } else {
      religionList = resReligionData;
    }
  } catch (error) {
    return error;
  }
  try {
    const { data: resVolunteerTypeData, error: error } = await supabase
      .from("tbl_volunteer_type")
      .select("*")
      .order("name", { ascending: true });
    if (error) {
      console.log(error, "error");
    } else {
      volunteerTypeList = resVolunteerTypeData;
    }
  } catch (error) {
    return error;
  }

  return routeGuard([isLoggedin], "/", {
    props: {
      unitList,
      kabupatenList,
      kecamatanList,
      kelurahanList,
      educationList,
      occupationList,
      religionList,
      volunteerTypeList,
    },
  });
};
