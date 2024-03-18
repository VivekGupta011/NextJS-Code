"use client";
import React, { useState, useEffect } from "react";
import Upload from "./image/Upload";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import BackSvg from "../../../utils/BackSvg";

export default function AddEvent() {
  const router = useRouter();
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      // If user is already logged in, redirect to addEvent route
      router.push("/login");
    }
  }, []);

  const EventAdd = () => toast.success("Event added successfully!.");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formData) => {
    // Check if the event type is set to "image" and if an image file is selected
    if (!fileName) {
      toast("Please select an image!.");
      return;
    }



    // Get the uploaded image URL
    const eventImage = fileName;

    if (eventImage) {
      // If image uploaded successfully, add it to the form data
      formData.eventImage = eventImage;

      try {
        // Make a POST request to upload the data
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/event`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Data uploaded successfully:", response.data);
        // Redirect to the "All Events" page
        router.push("/allevents");
        EventAdd();
      } catch (error) {
        console.error("Error uploading data:", error);
      }
    }
  };

  // Define the handleUpload function
  const handleUpload = async (file) => {
    if (file) {
      const data = new FormData();
      data.append("file", file);

      try {
        const response = await fetch("api/upload", {
          method: "POST",
          body: data,
        });

        if (response.ok) {
          // If upload successful, get the uploaded image URL
          setFileName(file.name);
          toast.success("Image uploaded successfully!.");
          return file.name;
        } else {
          console.error("Error uploading file:", response.statusText);
          return null;
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        return null;
      }
    } else {
      console.error("No file selected");
      return null;
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Redirect to login
    window.location.href = "/login";
  };

  // Watch the value of the "fileType" radio input
  const eventType = watch("fileType");

  return (
    <div>
      <div className="bg-gray-200  relative   flex  justify-center">
        <div className="bg-slate-950  w-full  h-[250px]"></div>

        <div className="shadow-2xl  w-7/12  bg-white top-7  mx-auto   absolute  w-full sm:w-1/2">
          <div
            className="flex justify-start items-center cursor-pointer"
            onClick={() => {
              router.push("/allevents");
            }}
          >
            <BackSvg />
            <div>
              <button className="text-blue-500 px-3">Check all Events!</button>
            </div>
          </div>
          <div className="relative left-0 p-4">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
            {showDropdown && (
              <div className="absolute left-0 mt-2 bg-white border rounded shadow-md mx-2">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <div className=" flex flex-col justify-center   px-12  py-4">
            <h1 className="text-xl  font-medium">Add an Event</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <p className="mt-6">Event Name</p>
                <input
                  {...register("eventName", { required: true })}
                  type="text"
                  className="border-b border-gray-500 focus:outline-none focus:border-indigo-500 px-4 py-2 w-full"
                  placeholder="Name of the event"
                />
                {errors.eventName && (
                  <p className="text-red-500">Event Name is required</p>
                )}
              </div>
              <div>
                <p className="mt-6">Event Description</p>
                <input
                  {...register("eventDescription", { required: true })}
                  type="text"
                  className="border-b border-gray-500 focus:outline-none focus:border-indigo-500 px-4 py-2 w-full"
                  placeholder="Name of the Description"
                />
                {errors.eventDescription && (
                  <p className="text-red-500">Event Description is required</p>
                )}
              </div>

              <div>
                <p className="mt-6">Event Date</p>
                <input
                  {...register("eventDate", { required: true })}
                  type="date"
                  className="border-b border-gray-500 focus:outline-none focus:border-indigo-500 px-4 py-2 w-full"
                  placeholder="Select date of event"
                />
                {errors.eventDate && (
                  <p className="text-red-500">Event Date is required</p>
                )}
              </div>

              <div>
                <p className="mt-6">Event Type</p>
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="image"
                    {...register("fileType", { required: true })}
                    value="image"
                    className="mr-2"
                    defaultChecked // Set the default value to "image"
                  />
                  <label htmlFor="image" className="text-gray-700">
                    Image
                  </label>

                  <input
                    type="radio"
                    id="video"
                    {...register("fileType", { required: true })}
                    value="video"
                    className="mr-2  ml-8"
                  />
                  <label htmlFor="video" className="text-gray-700 ">
                    Video
                  </label>
                </div>
                {errors.fileType && (
                  <p className="text-red-500">Event Type is required</p>
                )}
              </div>

              {/* {eventType === "image" && ( */}
              <div>
                <p className="mt-3">Event Image</p>
                <Upload
                  fileName="Event Image Here"
                  handleUpload={handleUpload}
                  setUploadedImageUrl={setUploadedImageUrl}
                />
              </div>
              {/* )} */}

              {/* {eventType === "video" && (
                <div>
                  <p className="mt-3">Event Video</p>
                  <Upload fileName="Event Video Here" />
                </div>
              )} */}

              {/* <p className="mt-6">Upload Attendee List Excel</p> */}
              {/* <Upload fileName="Attendee List Excel" /> */}

              <p className="mt-2">Event Web Link</p>
              <input
                {...register("eventLink", { required: true })}
                type="text"
                className="border-b border-gray-500 focus:outline-none focus:border-indigo-500 px-4 py-2 w-full"
                placeholder="Enter URL"
              />

              {errors.eventLink && (
                <p className="text-red-500">EventLink Name is required</p>
              )}

              <div className="flex flex-col justify-center items-center">
                <button
                  type="submit"
                  className="p-2  bg-slate-900  w-[80px] text-white  mt-3  mb-2"
                >
                  SUBMIT
                </button>

                <Link href="/" className="text-blue-500">
                  See ALL Events
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


