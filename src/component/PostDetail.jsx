import React, { useEffect, useState } from 'react';
import "./PostDetail.css";
import ConfiramationModal from "./ConfiramationModel";
import { useNavigate, useParams } from 'react-router-dom';

const PostDetail = () => {
    const navigate = useNavigate();
    const { postId } = useParams();

    const loggedInData = JSON.parse(localStorage.getItem("logInData")) || {};
    const [currentPost, setCurrentPost] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const postData = JSON.parse(localStorage.getItem("postData")) || [];
        const foundPost = postData.find(
            item => String(item.id) === String(postId)
        );

        if (foundPost) {
            setCurrentPost(foundPost);
        }
    }, [postId]);

    // EDIT
    const handleEdit = () => {
        navigate("/new-post", { state: { id: postId } });
    };

    // DELETE
    const handleDelete = () => {
        const postData = JSON.parse(localStorage.getItem("postData")) || [];
        const updatedPosts = postData.filter(
            item => String(item.id) !== String(postId)
        );

        localStorage.setItem("postData", JSON.stringify(updatedPosts));
        setShowModal(false);
        navigate("/");
    };

    if (!currentPost) {
        return <p>Post not found</p>;
    }

    return (
        <div className="post-container">
            <div className="post-card">
                <div className="post-content">
                    <div className="post-card_image">
                        <img
                            src={currentPost.image || "/react-logo.png"}
                            alt="preview"
                        />
                    </div>

                    <div className="post-info">
                        <h1>{currentPost.title}</h1>
                        <p>{currentPost.body}</p>
                    </div>
                </div>

                {loggedInData?.role === "Admin" && (
                    <div className="post-btn">
                        <button className="btn-edit" onClick={handleEdit}>
                            Edit
                        </button>
                        <button
                            className="btn-delete"
                            onClick={() => setShowModal(true)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {showModal && (
                <ConfiramationModal
                    title="Delete?"
                    desc="You are sure you want to delete this post?"
                    confirmBtnText="Delete"
                    onConfirm={handleDelete}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default PostDetail;
