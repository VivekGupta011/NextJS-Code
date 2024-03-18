"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "../addevent/image/Event";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import BackSvg from "../../../utils/BackSvg";

export default function AllEents() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  const EventUpdate = () => toast.success("Event updated successfully!.");
  const EventDelete = () => toast.error("Event deleted successfully!.");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      // If user is not logged in, redirect to login
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/event`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const onDelete = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted event from the events array
      setEvents(events.filter((event) => event._id !== eventId));
      EventDelete();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/event/${formData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the edited event in the events array
      setEvents(
        events.map((event) =>
          event._id === formData._id ? response.data : event
        )
      );
      EventUpdate();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div>
      <div className="bg-gray-200  relative   flex  justify-center">
        <div className="bg-slate-950  w-full  h-[250px]"></div>
        <div className="shadow-2xl  w-7/12  bg-white top-7  mx-auto   absolute  w-full sm:w-[85%]">
          <h1 className="text-xl font-semibold mb-4 p-4">All Events</h1>
          <div
            className="flex justify-start items-center cursor-pointer"
            onClick={() => {
              router.push("/addevent");
            }}
          >
            <BackSvg />
            <div>
              <button className="text-blue-500 px-3">Add New Events!</button>
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {events &&
              events.map((item, index) => (
                <Event
                  key={index}
                  data={item}
                  onDelete={onDelete}
                  onSubmit={onSubmit}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

