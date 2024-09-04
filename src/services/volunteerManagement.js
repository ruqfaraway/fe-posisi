import { createClientComponent } from "@/utils/supabase/components";
import { createClientServer } from "@/utils/supabase/server-props";

const supabaseClient = createClientComponent();
const supabaseServer = createClientServer();

export const getDataVolunteer = async ({ req, res }) => {
  const response = await supabaseClient.from("tbl_volunteer").select("*");
  if (response.error) {
    return error;
  } else {
    return response.data;
  }
};
export const addData = async () => {};
export const editData = async () => {};
export const deleteData = async () => {};
export const getDetail = async () => {};
