import { Input } from "@/components/ui/input";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import React from "react";

const UploadImageSquare = ({ field, imageUrl }) => {

  const onSubmitFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      field.onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {field.value ? (
        <div className="w-32 h-32 flex">
          <Image src={imageUrl ? imageUrl : field.value} alt="preview" width={100} height={100} />
          <X
            className="w-24 "
            onClick={() => field.onChange("")}
          />
        </div>
      ) : (
        <Input type="file" onChange={onSubmitFile} />
      )}
    </>
  );
};

export default UploadImageSquare;
