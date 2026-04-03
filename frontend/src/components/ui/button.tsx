import type { ReactElement } from "react";

 interface ButtonProps{
   variant : "primary" | "secondary";
  
   text : string;
  
 }
 const variantClasses = {
    "primary":"bg-purple-600 text-white",
    "secondary" : "bg-purple-200 text-purple-400"
 }
 export function Button({variant , text }:ButtonProps){
      return <button className={variantClasses[variant]}>
         {text}
      </button>
 }