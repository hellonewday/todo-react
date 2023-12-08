import AtomicSpinner from "atomic-spinner";

export const Loading = (prop) => {
  return (
    <div className="opacity-25 fixed inset-0 z-40 bg-black">
      <div className="overlay">
        <AtomicSpinner {...prop} />
      </div>
    </div>
  );
};
