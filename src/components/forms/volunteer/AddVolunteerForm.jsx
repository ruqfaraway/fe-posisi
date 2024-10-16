"use client";
import { IoClose } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { ButtonIcon } from "@/components/customUI/ButtonIcon";
import MainButton from "@/components/customUI/MainButton";
import SelectComponent from "@/components/customUI/SelectComps";
import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createClientComponent } from "@/utils/supabase/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { MainDatePicker } from "@/components/customUI/DatePicker";

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
  photo: z.string().min(2).max(250),
  phone: z.string().min(2).max(12),
  address: z.string().min(2).max(120),
  email: z.string().min(2).max(50),
  id_volunteer_type: z.number(),
  id_religion: z.number(),
  goldar: z.string(),
  join_date: z.string().min(2).max(50),
  volunteer_status: z.boolean(),
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
  const { toast } = useToast();
  const supabase = createClientComponent();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const randomString = (length) => {
    const chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let randomstring = "";
    for (let i = 0; i < length; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
  };

  const handleUpload = async (file, onChange) => {
    const id = randomString(5);
    if (file) {
      const { data, error } = await supabase.storage
        .from("photo")
        .upload(`${id} - ${file.name}`, file);
      if (error) {
        setError(error.message);
      } else {
        const { data: file } = await supabase.storage
          .from("photo")
          .getPublicUrl(data?.path);
        onChange(file?.publicUrl);
        setImageUrl(file?.publicUrl);
      }
    }
  };

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

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    const toBeSubmitted = {
      ...values,
      volunteer_status: values.volunteer_status ? "active" : "inactive",
    };
    // console.log(toBeSubmitted, 'toBeSubmitted');
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("tbl_volunteer")
        .insert([toBeSubmitted])
        .select();
      if (error) {
        setError(error.message);
        throw error;
      } else {
        toast({
          title: "Success",
          message: "Data berhasil ditambahkan",
          type: "success",
        });
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
          <p className="text-red-500 text-sm font-normal">{error}</p>
          <ButtonIcon onClick={() => setError(null)} />
        </div>
      )}
      <Form {...form} autocomplete="off">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="font-bold text-lg">Data Diri Relawan</h1>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-1/2">
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
                <FormItem className="w-1/2">
                  <FormLabel>NRA</FormLabel>
                  <FormControl>
                    <Input placeholder="nra" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-1/2">
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
                <FormItem className="w-1/2">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="id_education"
              render={({ field }) => (
                <FormItem className="w-1/2">
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
                <FormItem className="w-1/2">
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
          </div>
          <div className="flex gap-6 justify-between">
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[15rem]">
                  <FormLabel>Birthdate</FormLabel>
                  <FormControl>
                    <MainDatePicker
                      captionLayout="dropdown"
                      mode="single"
                      selectedValue={field.value}
                      onChange={(date) => {
                        const formattedDate = dayjs(date).format("YYYY-MM-DD");
                        field.onChange(formattedDate);
                      }}
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
                <FormItem className="w-1/2 pl-3">
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
          </div>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="id_religion"
              render={({ field }) => (
                <FormItem className="w-1/2">
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
              name="gender"
              render={({ field }) => (
                <FormItem className="w-1/2">
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
          </div>
          <p className="font-bold text-lg">Alamat & Domisili</p>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="id_kabupaten"
              render={({ field }) => (
                <FormItem className="w-1/2">
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
                <FormItem className="w-1/2">
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
          </div>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="id_kelurahan"
              render={({ field }) => (
                <FormItem className="w-1/2">
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
              name="address"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Textarea type="textarea" placeholder="Alamat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {imageUrl && (
            <div className="flex flex-col justify-center gap-2">
              <p className="text-sm font-medium">Photo :</p>
              <Image
                src={imageUrl}
                alt="uploaded image"
                width={150}
                height={200}
              />
              <ButtonIcon
                className="w-[9.5rem] h-6 flex items-center justify-center"
                icon={<IoClose className="h-4 w-4" />}
                onClick={() => setImageUrl(null)}
                text={"Hapus"}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="photo"
            render={({ field: { onChange, value, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e.target.files[0], onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="font-bold text-lg">
            Informasi Relawan & Status Relawan
          </p>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="id_volunteer_type"
              render={({ field }) => (
                <FormItem className="w-1/2">
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
                <FormItem className="w-1/2">
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
          </div>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="join_date"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[15rem]">
                  <FormLabel>Tanggal Bergabung</FormLabel>
                  <FormControl>
                    <MainDatePicker
                      captionLayout="dropdown"
                      mode="single"
                      selectedValue={field.value}
                      onChange={(date) => {
                        const formattedDate = dayjs(date).format("YYYY-MM-DD");
                        field.onChange(formattedDate);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-1/2"></div>
          </div>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="volunteer_status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 w-1/2">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Volunteer Status
                    </FormLabel>
                    <FormDescription>
                      Apakah relawan aktif atau tidak aktif ?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_officer"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 w-1/2">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Petugas Posko</FormLabel>
                    <FormDescription>
                      Apakah relawan adalah petugas posko ?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
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
