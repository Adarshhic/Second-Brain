import type { ReactElement } from "react";

 interface ButtonProps{
   variant : "primary" | "secondary";
   text : string;
   startIcon : ReactElement;
    onClick?: () => void;
    fullWidth?: boolean; 
    loading?: boolean; 
 }
 const variantClasses = {
    "primary":"bg-purple-600 text-white",
    "secondary" : "bg-purple-200 text-purple-400"
 }
 const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};
  function Button({variant, text, startIcon, onClick, fullWidth, loading}:ButtonProps){
      return   <button onClick={onClick} className={variantClasses[variant] + " " + sizeStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45" : ""}` } disabled={loading} >
            {/* Container for optional start icon */}
            <div className="pr-2">
                {startIcon}
            </div>
            {/* Button text */}
            {text}
        </button>
 }

 export default Button;