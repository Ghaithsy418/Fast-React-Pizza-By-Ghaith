import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const className =
    "text-sm transition-color cursor-pointer rounded-full bg-yellow-400 font-semibold tracking-wider text-stone-800 uppercase duration-300 hover:bg-yellow-300 focus:ring-3 focus:ring-yellow-300 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed";

  const style = {
    primary: className + " px-4 py-3 md:px-6 md:py-4",
    small: className + " px-4 py-2 md:px-6 md:py-2 text-xs md:text-sm",
    round: className + " px-2 py-0.5 text-sm md:px-3 md:py-1.5",
    secondary:
      "px-3.5 py-2.5 md:px-5.5 md:py-3.5 text-sm transition-color cursor-pointer rounded-full bg-transpernt border-3 border-stone-300 font-semibold tracking-wider text-stone-500 uppercase duration-300 hover:bg-stone-300 hover:text-stone-800 focus:ring-3 focus:ring-stone-200 focus:text-stone-800 focus:bg-stone-300 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed",
  };

  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} className={style[type]} disabled={disabled}>
        {children}
      </button>
    );

  return (
    <button className={style[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
