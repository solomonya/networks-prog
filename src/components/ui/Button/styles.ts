import { TButtonVariants } from "./buttonTypes";

const baseStyles = 'flex gap-x-2 p-2 active:scale-95';

export const buttonStyles: Record<TButtonVariants, string> = {
  primary: `${baseStyles} bg-indigo-600 text-white rounded-md`,
  outline: `${baseStyles} border`,
  link: `${baseStyles}`
};