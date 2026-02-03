import Card from "../component/Card";
import { useState, useContext } from "react";
import ConfiramationModal from "../component/ConfiramationModel";
import { useNavigate } from "react-router-dom";
import Snowfall from "react-snowfall";
import ModeContext from "../context/ModeContext";

export function Home() {
  const navigate = useNavigate();
  const ctx = useContext(ModeContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const allPostData =
    JSON.parse(localStorage.getItem("postData")) || [];

  const openDeleteModal = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const clickHandler = (id) => {
    navigate(`/posts/${id}`);
  };

  const confirmDelete = () => {
    const updatedPostData = allPostData.filter(
      (_, i) => i !== selectedIndex
    );
    localStorage.setItem(
      "postData",
      JSON.stringify(updatedPostData)
    );
    setShowModal(false);
  };

  const handleEdit = (id) => {
    navigate("/new-post", { state: { id } });
  };

  return (
    <div className={`container-home ${ctx.mode}`}>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Snowfall snowflakeCount={200} />

        <h1>Home Page</h1>

        <div className="container">
          {allPostData.length === 0 ? (
            <p>No Data Found</p>
          ) : (
            allPostData.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                desc={item.body}
                image={item.image}
                onRedirect={() => clickHandler(item.id)}
                onEdit={() => handleEdit(item.id)}
                onDelete={() => openDeleteModal(index)}
              />
            ))
          )}
        </div>

        {showModal && (
          <ConfiramationModal
            title="Delete?"
            desc="You Are Sure You Want to delete this post? This action cannot be undone."
            confirmBtnText="Delete"
            onConfirm={confirmDelete}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}
