"use client";
import { TbPhotoUp } from "react-icons/tb";
import { useState } from "react";
import Image from "next/image";
export default function UploadImg() {
  const [file, setFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      setFile(image);
      setPreviewImg(URL.createObjectURL(image));
    }
  }

  return (
    <label
      htmlFor="file-upload"
      className={`relative group h-100 w-full bg-slate-950 border border-slate-400 rounded-lg
          flex items-center justify-center cursor-pointer ${
            previewImg ? "opacity-100" : "opacity-50"
          }  
          hover:opacity-100 transition duration-300 ease-in-out `}
    >
      <span>
        {" "}
        {!previewImg && (
          <TbPhotoUp
            size={40}
            color="white"
            className="absolute transition ease-in-out duration-500 group-hover:-translate-y-1/8"
          />
        )}
      </span>
      <input
        id="file-upload"
        type="file"
        name="file"
        className="hidden"
        accept="image/png, image/jpeg"
        required
        onChange={handleFile}
      />

      {previewImg && (
        <Image
          src={previewImg}
          alt="preview"
          fill={true}
          quality={100}
          priority={true}
        />
      )}
    </label>
  );
}
