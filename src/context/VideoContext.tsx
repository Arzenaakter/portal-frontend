"use client";

import { createContext, useContext, useEffect, useState } from "react";
// import { api } from "@/services/api";

type Video = unknown;

type VideoContextType = {
  videos: Video[];
  // fetchVideos: () => Promise<void>;
};

const VideoContext = createContext<VideoContextType | null>(null);

export const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  // const fetchVideos = async () => {
  //   const res = await api.get("/api/videos?populate=*");
  //   setVideos(res.data.data);
  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     void fetchVideos();
  //   }, 0);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <VideoContext.Provider value={{ videos }}>{children}</VideoContext.Provider>
  );
};

export const useVideos = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideos must be used within a VideoProvider");
  }
  return context;
};
