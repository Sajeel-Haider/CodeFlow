const Button = ({ text, onClick }) => {
  return (
    <button
      className="bg-primary_color text-white px-4 py-2 rounded-md hover:bg-secondary_color transition-colors"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
