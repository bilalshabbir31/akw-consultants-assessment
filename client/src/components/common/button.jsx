
const Button = ({ onClick, label, className = "", icon, disabled = false, type="button" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
