import closeIcon from "../assets/icons/close.svg";

interface Props {
  error: string;
  handleCloseError: () => void;
}

export const ErrorPopUp = ({ error, handleCloseError }: Props) => {
  return (
    <div
      className="mt-3 bg-red-100 border border-red-400 text-red-700 pl-5 pr-9 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{error}</span>
      <span
        className="absolute cursor-pointer top-1 bottom-0 right-1 pr-2 py-3"
        onClick={handleCloseError}
      >
        <img src={closeIcon} alt="Close icon" />
      </span>
    </div>
  );
};
