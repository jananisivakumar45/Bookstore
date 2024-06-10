import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        console.log("Response data:", res.data); // Debugging line
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching book:", err); // Debugging line
        setLoading(false);
      });
  }, [id]); // Include 'id' as a dependency to ensure it triggers the effect correctly

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-white mx-auto">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col mx-auto border-2 border-white rounded-xl w-fit p-4 bg-white">
          <div className="my-4">
            <span className="text-xl mr-4 text-black"> Id:</span>
            <span> {book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-black"> Title:</span>
            <span> {book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-black"> Author:</span>
            <span> {book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-black"> Published Year:</span>
            <span> {book.publishedYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-black"> Created:</span>
            <span> {new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-black"> Updated:</span>
            <span> {new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBooks;
