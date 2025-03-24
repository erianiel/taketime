function ErrorMessage({ message = "An error has occurred!" }) {
  return <p className="font-medium text-pink-700">{message}</p>;
}

export default ErrorMessage;
