"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonIcon } from "../customUI/ButtonIcon";
import MainButton from "../customUI/MainButton";
import { createClientComponent } from "@/utils/supabase/components";
const formSchema = z.object({
  name: z.string().min(2).max(50),
});
const EducationFormUpdate = ({ initialValues = {} }) => {
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
    const { name } = values;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("tbl_education")
        .update({ name: name })
        .eq("id", initialValues?.id);
      if (error) {
        throw error;
      } else {
        setLoading(false);
        router.push("/master-data/education");
      }
    } catch (error) {
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

export default EducationFormUpdate;
