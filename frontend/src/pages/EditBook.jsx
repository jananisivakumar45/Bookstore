import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate("");
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setPublishedYear(res.data.publishedYear);
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("An error occured. Please check console");
        console.log(err);
      });
  }, []);
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
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
      <h1 className="text-3xl my-4 text-white mx-auto">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-white bg-white rounded-xl w-[600px] p-4 mx-auto ">
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-black rounded-xl px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 rounded-xl text-black">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 rounded-xl border-black px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 rounded-xl text-black">Publish Year</label>
          <input
            type="text"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="border-2 rounded-xl border-black px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 w-[200px] mx-auto rounded-xl bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
