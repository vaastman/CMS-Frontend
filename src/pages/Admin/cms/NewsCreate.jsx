import { useState } from "react";
import { createNews } from "@/api/cms.api";
import { toast } from "react-toastify";

const NewsCreate = () => {
  const [form, setForm] = useState({
    title: "",
    body: "",
    isPublished: false,
    url: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createNews(form);
      toast.success("News created");
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-2xl">
      <input
        className="input"
        placeholder="Title"
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        className="input h-40"
        placeholder="News Content"
        onChange={(e) =>
          setForm({ ...form, body: e.target.value })
        }
      />

      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          onChange={(e) =>
            setForm({ ...form, isPublished: e.target.checked })
          }
        />
        Publish
      </label>

      <button className="btn-primary">Save</button>
    </form>
  );
};

export default NewsCreate;
