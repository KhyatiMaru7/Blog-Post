import { useEffect, useState, useContext } from "react";
import "./ExplorePost.css";
import { FaSearch } from "react-icons/fa";
import Card from "../component/Card";
import Pagegnation from "./Pagegnation";
import ConfiramationModal from "./ConfiramationModel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModeContext from "../context/ModeContext";

const ExplorePost = () => {
  const ctx = useContext(ModeContext); // ✅ FIX HERE

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [postId, setPostId] = useState(null);
  const [error, setError] = useState({});
  const [FormData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handelChange = (key, value) => {
    setFormData({ ...FormData, [key]: value });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1);

    const result = posts.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.body.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPosts(result);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://696b4ae8624d7ddccaa0b9c0.mockapi.io/CreatePost"
      );
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch {
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * postsPerPage;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleCancelEdit = () => {
    setFormData({ title: "", body: "", image: "" });
    setError({});
    setPostId(null);
    setShowForm(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!FormData.title.trim()) newErrors.title = "Title is required";
    if (!FormData.body.trim()) newErrors.body = "Body is required";

    if (Object.keys(newErrors).length) {
      setError(newErrors);
      return;
    }

    try {
      setLoading(true);

      const url = postId
        ? `https://696b4ae8624d7ddccaa0b9c0.mockapi.io/CreatePost/${postId}`
        : "https://696b4ae8624d7ddccaa0b9c0.mockapi.io/CreatePost";

      const method = postId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: FormData.title,
          body: FormData.body,
          image:
            FormData.image ||
            `https://picsum.photos/seed/${Date.now()}/300/200`,
        }),
      });

      const data = await response.json();

      if (postId) {
        setPosts((p) => p.map((i) => (i.id === data.id ? data : i)));
        setFilteredPosts((p) => p.map((i) => (i.id === data.id ? data : i)));
        toast.success("Post updated");
      } else {
        setPosts((p) => [data, ...p]);
        setFilteredPosts((p) => [data, ...p]);
        toast.success("Post created");
      }

      handleCancelEdit();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const postDataGetById = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://696b4ae8624d7ddccaa0b9c0.mockapi.io/CreatePost/${id}`
      );
      const data = await response.json();

      setFormData({
        title: data.title,
        body: data.body,
        image: data.image,
      });
      setPostId(id);
      setShowForm(true);
    } catch {
      toast.error("Failed to fetch post");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await fetch(
        `https://696b4ae8624d7ddccaa0b9c0.mockapi.io/CreatePost/${deleteId}`,
        { method: "DELETE" }
      );

      setPosts((p) => p.filter((i) => i.id !== deleteId));
      setFilteredPosts((p) => p.filter((i) => i.id !== deleteId));

      toast.success("Post deleted");
      setShowModal(false);
      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className={`container-home ${ctx.mode}`}>
        <div className="explore-container">
          <h2>Explore Posts</h2>

          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search item"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        <button className="create-btn" onClick={() => setShowForm(true)}>
          Create Form
        </button>

        {showForm && (
          <form className="explore-form" onSubmit={handleEditSubmit}>
            <input
              placeholder="Enter Title"
              value={FormData.title}
              onChange={(e) => handelChange("title", e.target.value)}
            />
            {error.title && <span className="error">{error.title}</span>}

            <input
              placeholder="Enter Body"
              value={FormData.body}
              onChange={(e) => handelChange("body", e.target.value)}
            />
            {error.body && <span className="error">{error.body}</span>}

            {!postId && FormData.image && (
              <img
                src={FormData.image}
                alt="preview"
                className="preview-img"
              />
            )}

            <div className="explore-btn">
              <button className="sub-btn" type="submit">
                Submit
              </button>
              <button
                className="can-btn"
                type="button"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : (
          <div className="explore-card">
            {filteredPosts
              .slice(startIndex, startIndex + postsPerPage)
              .map((item) => (
                <Card
                  key={item.id}
                  title={item.title}
                  desc={item.body}
                  image={item.image}
                  onEdit={() => postDataGetById(item.id)}
                  onDelete={() => openDeleteModal(item.id)}
                  from="explore"
                />
              ))}
          </div>
        )}

        <Pagegnation
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => p - 1)}
          onNext={() => setCurrentPage((p) => p + 1)}
          onPostsPerPageChange={(value) => {
            setPostsPerPage(value);
            setCurrentPage(1);
          }}
        />

        {showModal && (
          <ConfiramationModal
            title="Delete?"
            desc="You Are Sure You Want to delete this post?"
            confirmBtnText={deleting ? "Deleting..." : "Delete"}
            onConfirm={confirmDelete}
            onClose={() => !deleting && setShowModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default ExplorePost;
