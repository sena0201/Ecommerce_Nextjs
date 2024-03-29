"use client";

import { ChangeEvent, useState } from "react";
import axios from "../../Api/axiosConfig";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";

function ContactPage() {
  const { register, handleSubmit } = useForm();
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  // const onSubmit = async (data: any) => {
  //   console.log(data.photo[0]);
  //   let formData = new FormData();
  //   formData.append("file", data.photo[0]);
  //   const res = await axios.post("/Upload", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  //   setImgUrl(res.data);
  //   console.log(res.data);
  // };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgUrl(imageUrl);
    }
  };

  return (
    <div>
      Contactpage{" "}
      <form>
        <input type="file" onChange={handleChange} />
        <div>
          {imgUrl && (
            <Image
              src={imgUrl}
              alt=""
              width={100}
              height={100}
            />
          )}
        </div>
        <button>upload</button>
      </form>
    </div>
  );
}

export default ContactPage;
