import { useState } from "react";
import { createGallery } from "@/api/cms.api";
import { toast } from "react-toastify";
import ImageUpload from "./ImageUpload";

const GalleryCreate = () => {
  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createGallery({ title, coverUrl });
      toast.success("Gallery item created");
      setTitle("");
      setCoverUrl("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-xl space-y-4">
      <h2 className="text-xl font-bold">Create Gallery Item</h2>

      <input
        className="input"
        placeholder="Gallery Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <ImageUpload value={coverUrl} onChange={setCoverUrl} />

      <button className="btn-primary">Save</button>
    </form>
  );
};

export default GalleryCreate;
