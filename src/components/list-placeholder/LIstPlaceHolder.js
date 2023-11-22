function ListPlaceHolder(prop) {
  const { data, onDelete, onComplete, onEdit } = prop;
  return (
    <div>
      {data &&
        data.map((item) => {
          return (
            <div key={item.id} className="uncompleted">
              <span style={{ color: "red" }} className="item">
                {item.title}
              </span>
              <button className="delete" onClick={() => onDelete(item.id)}>
                X
              </button>
              <button className="complete" onClick={() => onComplete(item.id)}>
                V
              </button>
              <button className="edit" onClick={() => onEdit(item.id)}>
                Edit
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default ListPlaceHolder;
