import React from "react";
import { useRef } from "react";
import { storage } from "@/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ImgInput = ({ img, setImg }) => {
  const fileRef = useRef(null);
  const handleImageChange = async (input) => {
    const file = input;
    console.log("input", input);
    if (file) {
      const metadata = {
        contentType: file.type,
      };

      //storage->> img
      const storageRef = ref(storage, `newsImg/` + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(storageRef).then((downloadURL) => {
            console.log("file available at", downloadURL);
            setImg(downloadURL)
          });
        }
      );
    }
  };
  return (
    <div className="w-[50%] flex justify-between gap-[40px]">
      <button className="bg-[#FFF] w-[30%] h-[50px]" onClick={() => fileRef.current.click()}>Picture</button>
      <input
        hidden
        ref={fileRef}
        type="file"
        accept="image/*"
        id="newsImage"
        onChange={(e) => {
          handleImageChange(e.target.files[0]);
        }}
      />
      {img && <img src={img} width={200} height={100}/>}
    </div>
  );
};

export default ImgInput;
