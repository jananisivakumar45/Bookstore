import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useAsyncValue, useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        alert("An error occured. Please check console");
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-white">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 bg-white border-white rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are you sure you want to delete this book?{" "}
        </h3>
        <button
          className="p-4 bg-red-600 mx-auto w-[200px] rounded-xl text-xl text-black m-8 "
          onClick={handleDeleteBook}
        >
          Yes, Delete it!
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
