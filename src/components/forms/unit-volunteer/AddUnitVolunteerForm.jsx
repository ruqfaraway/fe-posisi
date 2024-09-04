"use client";
import { ButtonIcon } from "@/components/customUI/ButtonIcon";
import { MainDatePicker } from "@/components/customUI/DatePicker";
import MainButton from "@/components/customUI/MainButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClientComponent } from "@/utils/supabase/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { set } from "date-fns";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  name: z.string().min(2).max(50),
  date_founded: z.date(),
});
const AddUnitVolunteerForm = ({ initialValues = {} }) => {
  const supabase = createClientComponent();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
      ? initialValues
      : {
          name: "",
        },
  });
  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    const { name, date_founded } = values;
    const date = new Date(date_founded);
    const initialDate = dayjs(date).format("YYYY-MM-DD");
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("tbl_unit")
        .insert([{ name: name, date_founded: initialDate }])
        .select();
      if (error) {
        setLoading(false);
        throw error;
      } else {
        setLoading(false);
        router.push("/master-data/unit-volunteer");
      }
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-200 p-2 rounded-md flex justify-between items-center">
          <p className="text-red-500">{error}</p>
          <ButtonIcon onClick={() => setError(null)} />
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_founded"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date Founded</FormLabel>
                <MainDatePicker form={form} field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 justify-end">
            <MainButton
              type="secondary"
              className="w-24 m-2"
              onClick={() => router.push("/master-data/education")}
              loading={loading}
            >
              Cancel
            </MainButton>
            <MainButton
              type="primary"
              htmlType="submit"
              className="w-24 m-2"
              loading={loading}
            >
              Submit
            </MainButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddUnitVolunteerForm;
