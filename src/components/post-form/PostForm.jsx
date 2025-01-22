import React, { useCallback, useEffect } from "react";
import { Input, Select, RTE, Button } from "../index";
import { useForm } from "react-hook-form";
import appwriteServices from "../../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const { slug } = useParams(); // Get 'slug' from the URL parameters
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Initialize useForm with default values
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || slug || "", // Use slug from URL as default if available
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  // Callback for transforming slug from title
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  // Watch for changes on title and update slug accordingly
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // Submit form data
  const submit = async (data) => {
    if (post) {
      const file = await data.image[0] ? appwriteServices.uploadFile(data.image[0]) : null;

      if (file) {
        appwriteServices.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteServices.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteServices.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteServices.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-white p-6 rounded-lg shadow-lg">
      <div className="w-full lg:w-2/3 px-4 mb-6">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-full lg:w-1/3 px-4 mb-6">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteServices.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg border-2 border-gray-300"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-black"}
          className="w-full text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
