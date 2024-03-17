"use client";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
// import Img1 from "./image1.png";
import Link from "next/link";
import Image from "next/image";
import Img1 from "../../../../public/images/spidy.jpg"; 


function Event({ data, onDelete, onSubmit }) {
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onDeleteClick = async () => {
    if(data._id){
      onDelete(data._id); // Call the onDelete function passed as props
    }
  };

  const handleEditClick = () => {
    setShowModal(true);
    reset(data); // Set initial form values to the event data
  };

  const handleFormSubmit = async (formData) => {
    if(formData){

      await onSubmit(formData); // Call the onSubmit function passed as props
      setShowModal(false); // Close the modal after saving
    }
  };

  const createdAtDate = new Date(data.updatedAt);

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
       
     {/* Conditionally render either the image or the YouTube video */}
     {data.eventVideo ? (
        <div className="relative w-full h-[300px]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={data.eventVideo}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <Image
          // src={Img1}
          // src="/images/spidy.jpg"
          src={`/images/${data.eventImage}`}
          alt={data.eventName}
          width={400}
          height={300}
          className="w-full h-60 object-cover"
        />
      )}
      <div className="p-4">
        <h5 className="text-lg font-medium mb-2">
          Event Name: {data.eventName}
        </h5>
        <p className="text-black">Date: {createdAtDate.toLocaleDateString()}</p>
        <p className="text-gray-700">{data.eventDescription}</p>
        

        <div className="flex mt-4 item-center justify-between">
          <div>
          <button
            onClick={handleEditClick}
            className="text-blue-500 mr-5 focus:outline-none"
          >
            Edit
          </button>
          </div>
        <div>
        <button
            onClick={onDeleteClick}
            className="text-red-500 focus:outline-none"
          >
            Delete
          </button>
        </div>
          <a
            href={data.eventLink}
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
            // onClick={(e) => e.preventDefault()}
          >
            Link
          </a>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Edit Event</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="mb-4">
                <label className="block mb-2">Event Name</label>
                <input
                  {...register("eventName")}
                  type="text"
                  defaultValue={data.eventName}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Event Description</label>
                <textarea
                  {...register("eventDescription")}
                  defaultValue={data.eventDescription}
                  rows={6}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Event Link</label>
                <input
                  {...register("eventLink")}
                  type="text"
                  defaultValue={data.eventLink}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              {/* <div className="mb-4">
                <label className="block mb-2">Event Video</label>
                <input
                  {...register("eventVideo")}
                  type="text"
                  defaultValue={data.eventVideo}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div> */}
              <div className="mb-4">
                <label className="block mb-2">Created Date</label>
                <input
                  type="text"
                  value={new Date(data.createdAt).toLocaleDateString()}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Event;
