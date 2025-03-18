import React, { useEffect, useState } from "react";
import { Brain, Share2, Trash2 } from "lucide-react";

interface CardProps {
  link: string;
  title: string;
  type: "twitter" | "youtube" | "images" | "documents" | "instagram";
  onDelete:any
}
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
const Card = ({ title, link, type,onDelete }: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
     
      document.body.appendChild(script);

      script.onload = () => {
        window.twttr?.widgets.load(); // Safe call to avoid TypeScript errors
      };
    } else if (type === "instagram") {
      const script = document.createElement("script")
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script)
      script.onload = () => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm?.Embeds.process()
        }
      }

    }
  }, [type, link, isModalOpen]);

  const getYouTubeEmbedLink = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <>
      {/* Card Container */}
      <div
        className="max-w-full rounded-lg shadow-lg bg-black px-2 ml-2 mt-3 shadow-gray-400 flex justify-center cursor-pointer hover:scale-105 transition-all ease-in"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="bg-black rounded-md p-6 w-[350px] h-[250px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="text-white flex justify-between items-center">
            <div className="flex items-center">
              <Brain size={32} className="text-gray-500 pr-2" />
              <h1 className="font-bold truncate">{title}</h1>
            </div>
            <div className="flex gap-3">
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-500">
                <Share2 size={24} />
              </a>
              <button onClick={onDelete}
              className="hover:cursor-pointer hover:scale-105"><Trash2 size={24} /></button>
            </div>
          </div>

          {/* Content (Fixed Height) */}
          <div className="mt-4 text-white text-center border border-gray-600 rounded-md w-full h-[150px] overflow-hidden">
            {type === "youtube" && (
              <iframe
                className="w-full h-full rounded-md"
                src={getYouTubeEmbedLink(link)}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
            {type === "twitter" && <blockquote className="twitter-tweet w-full">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>}
              {type ==="images" && (
                <img src={link} alt="uploaded content" className="w-full h-full object-cover rounded-md" />
              )}
              {type === "documents" && (
              <iframe src={link} className="w-full h-full rounded-md" title="Document Viewer"></iframe>
            )}
            {type === "instagram" && (
              <blockquote className="instagram-media w-full" data-instgrm-permalink={link} data-instgrm-version="13">
                <a href={link}></a>
              </blockquote>
            )}
          </div>
        </div>
      </div>

      {/* Modal (when clicked) */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60 backdrop-blur-md z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-[80%] max-w-[600px] max-h-[80vh] overflow-y-auto relative">

            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>

            {/* Modal Content */}
            <div className="text-white">
              <h1 className="font-bold mb-4">{title}</h1>

              {type === "youtube" && (
                <iframe
                  className="w-full h-[300px] rounded-md"
                  src={getYouTubeEmbedLink(link)}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}

              {type === "twitter" && <blockquote className="twitter-tweet w-full ">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>}
              {type === "images" && (
                <img src={link} alt="Uploaded content" className="w-full h-auto rounded-md" />
              )}

              {type === "documents" && (
                <iframe src={link} className="w-full h-[500px] rounded-md" title="Document Viewer"></iframe>
              )}

              {type === "instagram" && (
                <blockquote className="instagram-media w-full" data-instgrm-permalink={link} data-instgrm-version="13">
                  <a href={link}></a>
                </blockquote>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card