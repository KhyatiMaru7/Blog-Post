import React, { useState, useEffect, useContext } from "react";
import "../component/CreatePostForm.css";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Lottie from "react-lottie-player";
import loader from "../assets/Loading.json";
import ModeContext from "../context/ModeContext";

export default function CreatePostForm() {
  const ctx = useContext(ModeContext); // ✅ FIX

  const [createPostFormData, setCreatePostFormData] = useState({
    title: "",
    body: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const editPostId = location.state?.id || null;

  const handleChange = (field, value) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setCreatePostFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!editPostId) return;

    const posts = JSON.parse(localStorage.getItem("postData")) || [];
    const postToEdit = posts.find((p) => p.id === editPostId);

    if (postToEdit) {
      setCreatePostFormData({
        title: postToEdit.title,
        body: postToEdit.body,
        image: postToEdit.image,
      });
    }
  }, [editPostId]);

  /* ---------- IMAGE HANDLER ---------- */
  const processImageFile = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Only JPG, JPEG, PNG images are allowed",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCreatePostFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
      setErrors((prev) => ({ ...prev, image: "" }));
    };
    reader.readAsDataURL(file);
  };

  /* ---------- DRAG & DROP ---------- */
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processImageFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!createPostFormData.title.trim())
      newErrors.title = "Title is required";
    if (!createPostFormData.body.trim())
      newErrors.body = "Body is required";
    if (!createPostFormData.image)
      newErrors.image = "Image is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);

    const existingPosts =
      JSON.parse(localStorage.getItem("postData")) || [];

    setTimeout(() => {
      if (editPostId) {
        const updatedPosts = existingPosts.map((post) =>
          post.id === editPostId
            ? { ...post, ...createPostFormData }
            : post
        );
        localStorage.setItem("postData", JSON.stringify(updatedPosts));
        toast.success("Post updated successfully");
      } else {
        const updatedPosts = [
          ...existingPosts,
          { id: uuidv4(), ...createPostFormData },
        ];
        localStorage.setItem("postData", JSON.stringify(updatedPosts));
        toast.success("Post added successfully");
      }

      setLoading(false);
      setTimeout(() => navigate("/"), 1000);
    }, 1500);
  };

  return (
    <>
      {loading && (
        <div className="loader-container">
          <Lottie loop animationData={loader} play style={{ width: 150 }} />
        </div>
      )}

      <div className={`container-home ${ctx.mode}`}>
        <h1>{editPostId ? "Let's Edit Post" : "Let's Create New Post"}</h1>

        <div className="main-post">
          <form className="sub" onSubmit={handleSubmit}>
            <div className="sub-post">
              <input
                type="text"
                placeholder="Enter Title"
                value={createPostFormData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              {errors.title && (
                <span className="error">{errors.title}</span>
              )}

              <textarea
                placeholder="Enter Body"
                rows={5}
                value={createPostFormData.body}
                onChange={(e) => handleChange("body", e.target.value)}
              />
              {errors.body && (
                <span className="error">{errors.body}</span>
              )}

              <div
                className={`drop-zone ${isDragging ? "dragging" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={(e) =>
                    processImageFile(e.target.files[0])
                  }
                />
              </div>

              {errors.image && (
                <span className="error">{errors.image}</span>
              )}

              {createPostFormData.image && (
                <center>
                  <img
                    src={createPostFormData.image}
                    alt="preview"
                    style={{
                      maxWidth: "200px",
                      marginTop: "10px",
                      borderRadius: "10px",
                    }}
                  />
                </center>
              )}

              <div className="post-btn">
                {editPostId && (
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                )}
                <button type="submit" className="submit">
                  {editPostId ? "Update Post" : "Add Post"}
                </button>
              </div>

              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
