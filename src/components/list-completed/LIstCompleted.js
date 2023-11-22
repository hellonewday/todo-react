function ListCompleted(prop) {
  const { data } = prop;
  return (
    <div>
      {data &&
        data.map((item) => {
          return (
            <div
              className="completed"
              key={item.id}
              style={{ color: "greenyellow" }}
            >
              <span className="item">{item.title}</span>
            </div>
          );
        })}
    </div>
  );
}

export default ListCompleted;
