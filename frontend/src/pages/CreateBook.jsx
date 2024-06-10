import React, { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate("");
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl text-white my-4 mx-auto">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-white rounded-xl w-[600px] p-4 mx-auto bg-white">
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-black px-4 py-2 w-full rounded-xl"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-black px-4 py-2 w-full rounded-xl"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Publish Year</label>
          <input
            type="text"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="border-2 border-black px-4 py-2 w-full rounded-xl"
          />
        </div>
        <button
          className="p-2 bg-sky-300 m-8 rounded-xl w-[200px] mx-auto"
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
