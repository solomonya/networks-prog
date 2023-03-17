

export type TButtonVariants = 'primary' | 'outline' | 'link';


export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  onClick?: () => void;
  label: string;
  variant?: TButtonVariants;
  loading?: boolean;
}