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
import { createClientComponent } from "@/utils/supabase/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonIcon } from "../customUI/ButtonIcon";
import MainButton from "../customUI/MainButton";
const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(6).max(50),
});
const LoginForm = () => {
  const supabase = createClientComponent()
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    const { email, password } = values;
    setLoading(true);
    await supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then((res) => {
        if (res?.data) {
          router.push("/");
        }
        setError(res?.error.message);
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setLoading(false);
      });
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <MainButton
            type="primary"
            htmlType="submit"
            className="w-full m-"
            loading={loading}
          >
            Login
          </MainButton>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;


