
const Button = ({children, onClick }) => {
  return (
    <button onClick={onClick} className="py-1">
      {children}
    </button>
  );
};

export default Button;