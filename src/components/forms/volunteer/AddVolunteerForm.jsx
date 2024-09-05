"use client";
import { ButtonIcon } from "@/components/customUI/ButtonIcon";
import { MainDatePicker } from "@/components/customUI/DatePicker";
import MainButton from "@/components/customUI/MainButton";
import SelectComponent from "@/components/customUI/SelectComps";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { createClientComponent } from "@/utils/supabase/components";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  name: z.string().min(2).max(50),
  nra: z.string().min(2).max(50),
  id_unit: z.number(),
  id_education: z.number(),
  id_occupation: z.number(),
  birthdate: z.string().min(2).max(50),
  gender: z.string().min(2).max(50),
  id_kabupaten: z.number(),
  id_kecamatan: z.number(),
  id_kelurahan: z.number(),
  phone: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  id_volunteer_type: z.number(),
  id_religion: z.number(),
  goldar: z.string(),
  join_date: z.string().min(2).max(50),
  volunteer_status: z.string().min(2).max(50),
  is_officer: z.boolean(),
});
const AddVolunteerForm = ({
  unitList,
  kabupatenList,
  kecamatanList,
  kelurahanList,
  educationList,
  occupationList,
  religionList,
  volunteerTypeList,
}) => {
  const supabase = createClientComponent();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const UNIT_DROPDOWN = unitList.map((unit) => ({
    label: unit.name,
    value: unit.id,
  }));
  const KABUPATEN_DROPDOWN = kabupatenList.map((kabupaten) => ({
    label: kabupaten.name,
    value: kabupaten.id,
  }));
  const KECAMATAN_DROPDOWN = kecamatanList.map((kecamatan) => ({
    label: kecamatan.name,
    value: kecamatan.id,
  }));
  const KELURAHAN_DROPDOWN = kelurahanList.map((kelurahan) => ({
    label: kelurahan.name,
    value: kelurahan.id,
  }));
  const EDUCATION_DROPDOWN = educationList.map((education) => ({
    label: education.name,
    value: education.id,
  }));
  const OCCUPATION_DROPDOWN = occupationList.map((occupation) => ({
    label: occupation.name,
    value: occupation.id,
  }));
  const RELIGION_DROPDOWN = religionList.map((religion) => ({
    label: religion.name,
    value: religion.id,
  }));
  const VOLUNTEER_TYPE_DROPDOWN = volunteerTypeList.map((volunteerType) => ({
    label: volunteerType.name,
    value: volunteerType.id,
  }));

  const GENDER_DROPDOWN = [
    { label: "Laki-laki", value: "male" },
    { label: "Perempuan", value: "female" },
  ];

  const GOLDAR_DROPDOWN = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "AB", value: "AB" },
    { label: "O", value: "O" },
  ];

  const VOLUNTEER_STATUS = [
    { label: "Aktif", value: "active" },
    { label: "Tidak Aktif", value: "inactive" },
  ];

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("tbl_volunteer")
        .insert([{ ...values }])
        .select();
      if (error) {
        setError(error.message);
        throw error;
      } else {
        router.push("/volunteer-management");
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
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
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nra"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NRA</FormLabel>
                <FormControl>
                  <Input placeholder="nra" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id_religion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agama</FormLabel>
                <FormControl>
                  <SelectComponent
                    field={field}
                    placeholder="Pilih Agama"
                    options={RELIGION_DROPDOWN}
                    label="Agama"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id_volunteer_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipe Relawan</FormLabel>
                <FormControl>
                  <SelectComponent
                    field={field}
                    placeholder="Pilih Tipe Relawan"
                    options={VOLUNTEER_TYPE_DROPDOWN}
                    label="Tipe Relawan"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id_unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Relawan</FormLabel>
                <FormControl>
                  <SelectComponent
                    field={field}
                    placeholder="Pilih Unit Relawan"
                    options={UNIT_DROPDOWN}
                    label="Unit Relawan"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id_education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pendidikan</FormLabel>
                <FormControl>
                  <SelectComponent
                    field={field}
                    placeholder="Pilih Pendidikan"
                    options={EDUCATION_DROPDOWN}
                    label="Pendidikan"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id_occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pekerjaan</FormLabel>
                <FormControl>
                  <SelectComponent
                    field={field}
                    placeholder="Pilih Pekerjaan"
                    options={OCCUPATION_DROPDOWN}
                    label="Pekerjaan"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-[15rem]">
                <FormLabel>Birthdate</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => {
                      const formattedDate = dayjs(date).format("YYYY-MM-DD");
                      field.onChange(formattedDate);
                    }}
                    dateFormat="yyyy-MM-dd"
                    className="border p-2 rounded-md w-full text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="goldar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Golongan Darah</FormLabel>
                <FormControl>
                  <SelectComponent
                    field={field}
                    type="text"
                    placeholder="Pilih Golongan Darah"
                    options={GOLDAR_DROPDOWN}
                    label="Golongan Darah"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Kelamin</FormLabel>
                <FormControl>
                  <SelectComponent
                    field={field}
                    type="text"
                    placeholder="Pilih Jenis Kelamin"
                    options={GENDER_DROPDOWN}
                    label="Jenis Kelamin"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="font-bold text-lg">Alamat</p>
          <FormField
            control={form.control}
            name="id_kabupaten"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kabupaten</FormLabel>
                <FormControl>
                  <SelectComponent
                    field={field}
                    placeholder="Pilih Kabupaten"
                    options={KABUPATEN_DROPDOWN}
                    label="Kabupaten"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id_kecamatan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kecamatan</FormLabel>
                <FormControl>
                  <SelectComponent
                    field={field}
                    placeholder="Pilih Kecamatan"
                    options={KECAMATAN_DROPDOWN}
                    label="Kecamatan"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id_kelurahan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kelurahan</FormLabel>
                <FormControl>
                  <SelectComponent
                    field={field}
                    placeholder="Pilih Kelurahan"
                    options={KELURAHAN_DROPDOWN}
                    label="Kelurahan"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="join_date"
            render={({ field }) => (
              <FormItem className="flex flex-col w-[15rem]">
                <FormLabel>Tanggal Bergabung</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => {
                      const formattedDate = dayjs(date).format("YYYY-MM-DD");
                      field.onChange(formattedDate);
                    }}
                    dateFormat="yyyy-MM-dd"
                    className="border p-2 rounded-md w-full text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="volunteer_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>STATUS</FormLabel>
                <FormControl>
                  <SelectComponent
                    field={field}
                    type='text'
                    placeholder="Select Status"
                    options={VOLUNTEER_STATUS}
                    label="Status"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_officer"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Apakah Relawan adalah petugas?</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <p className="text-sm">
                      {field.value ? "Petugas" : "Relawan"}
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 justify-end">
            <MainButton
              type="secondary"
              className="w-24 m-2"
              onClick={() => router.push("/volunteer-management")}
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

export default AddVolunteerForm;
