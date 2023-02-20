import "./index.css";

const Bookslist = (props) => {
  const { userDetails, deleteUser } = props;
  const { name, author, uniqueNo } = userDetails;
  const onDelete = () => {
    deleteUser(uniqueNo);
  };
  return (
    <li className="user-card-container">
      <div className="user-details-container">
        <h1 className="user-name"> Book:{name} </h1>
        <p className="user-designation">Author name: {author} </p>
      </div>
      <button className="delete-button" onClick={onDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cross-img.png"
          alt="cross"
          className="delete-img"
        />
      </button>
    </li>
  );
};

export default Bookslist;
