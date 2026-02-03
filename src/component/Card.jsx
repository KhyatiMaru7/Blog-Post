import "./Card.css";

const Card = (props) => {
  const { title, desc, image, onRedirect, onEdit, onDelete } = props;
  const loggedInData =
    JSON.parse(localStorage.getItem("logInData")) || {};

  const safeDesc = desc || "";

  return (
    <div className="card" onClick={onRedirect}>
      <div className="icon-center">
        <img
          src={image ? image : "https://picsum.photos/500/300"}
          alt={title}
        />

        <div className="card-content">
          <h1>{title}</h1>
          <p>
            {safeDesc.length > 100
              ? safeDesc.substring(0, 100) + "..."
              : safeDesc}
          </p>
        </div>

        {loggedInData?.role === "Admin" && (
          <div className="card-btn">
            <button
              className="btn-edt"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              Edit
            </button>

            <button
              className="btn-dlt"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
