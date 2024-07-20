import ContentWrapper from "@/components/customUI/ContentWrapper";
import MainButton from "@/components/customUI/MainButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import React from "react";
const labelStyle = "text-sm font-semibold";
const inputStyle = "border rounded-sm w-full p-2 text-sm";
const AddVolunteerManagementPages = () => {
  const router = useRouter();
  return (
    <ContentWrapper>
      <h1 className="font-bold text-3xl">Tambah Data Relawan</h1>
      <p className="text-sm text-gray-500">
        Silahkan isi form berikut untuk menambahkan data relawan
      </p>
      <form className="flex flex-col gap-4 border-2 p-4 rounded-md w-full">
        <label htmlFor="name" className={labelStyle}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={inputStyle}
          required
        />
        <label htmlFor="nra" className={labelStyle}>
          NRA:
        </label>
        <input
          type="text"
          id="nra"
          name="nra"
          className={inputStyle}
          required
        />
        <label htmlFor="id_unit" className={labelStyle}>
          Unit ID:
        </label>
        <input
          type="number"
          id="id_unit"
          name="id_unit"
          className={inputStyle}
        />
        <label htmlFor="id_education" className={labelStyle}>
          Pendidikan:
        </label>
        <input
          type="number"
          id="id_education"
          name="id_education"
          className={inputStyle}
        />
        <label htmlFor="id_occupation" className={labelStyle}>
          Pekerjaan:
        </label>
        <input
          type="number"
          id="id_occupation"
          name="id_occupation"
          className={inputStyle}
        />
        <label htmlFor="phone" className={labelStyle}>
          Phone:
        </label>
        <input type="text" id="phone" name="phone" className={inputStyle} />
        <label htmlFor="email" className={labelStyle}>
          Email:
        </label>
        <input type="email" id="email" name="email" className={inputStyle} />
        <label htmlFor="birthdate" className={labelStyle}>
          Birthdate:
        </label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          className={inputStyle}
        />
        <label htmlFor="gender" className={labelStyle}>
          Gender:
        </label>
        <select id="gender" name="gender" className={inputStyle}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <p className="text-sm text-slate-500">
          Alamat (Jalan, RT, RW, Kecamatan, Kabupaten, Kelurahan)
        </p>
        <label htmlFor="id_kabupaten" className={labelStyle}>
          Kabupaten:
        </label>
        <input
          type="number"
          id="id_kabupaten"
          name="id_kabupaten"
          className={inputStyle}
        />
        <label htmlFor="id_kelurahan" className={labelStyle}>
          Kelurahan:
        </label>
        <input
          type="number"
          id="id_kelurahan"
          name="id_kelurahan"
          className={inputStyle}
        />
        <label htmlFor="join_date" className={labelStyle}>
          Join Date:
        </label>
        <input
          type="date"
          id="join_date"
          name="join_date"
          className={inputStyle}
        />
        <label htmlFor="photo" className={labelStyle}>
          Photo URL:
        </label>
        <input type="text" id="photo" name="photo" className={inputStyle} />
        <label htmlFor="id_volunteer_type" className={labelStyle}>
          Jenis Relawan:
        </label>
        <input
          type="number"
          id="id_volunteer_type"
          name="id_volunteer_type"
          className={inputStyle}
        />
        <label htmlFor="goldar" className={labelStyle}>
          Golongan Darah:
        </label>
        <select id="goldar" name="goldar" className={inputStyle}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="AB">AB</option>
          <option value="O">O</option>
        </select>
        <label htmlFor="volunteer_status" className={labelStyle}>
          Status:
        </label>
        <select
          id="volunteer_status"
          name="volunteer_status"
          className={inputStyle}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
        <label htmlFor="is_officer" className={labelStyle}>
          Is Officer:
        </label>
        <input
          type="checkbox"
          id="is_officer"
          name="is_officer"
          className="border rounded-sm"
        />
        <div className="flex gap-4 justify-end w-full">
          <MainButton type="secondary" onClick={() => router.back()}>
            Back
          </MainButton>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </ContentWrapper>
  );
};

export default AddVolunteerManagementPages;
