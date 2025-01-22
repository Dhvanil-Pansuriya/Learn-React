import React from "react";
import appwriteServices from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`} className="w-full">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out p-4">
        <div className="w-full mb-4 flex justify-center">
          <img
            src={appwriteServices.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full h-48 object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-black">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
