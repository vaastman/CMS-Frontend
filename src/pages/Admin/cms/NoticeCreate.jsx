import { useState } from "react";
import { createNotice } from "@/api/cms.api";
import { toast } from "react-toastify";

const NoticeCreate = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createNotice({ title, body });
      toast.success("Notice created");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-xl">
      <input
        className="input"
        placeholder="Notice Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="input h-32"
        placeholder="Notice Content"
        onChange={(e) => setBody(e.target.value)}
      />

      <button className="btn-primary">Save</button>
    </form>
  );
};

export default NoticeCreate;
