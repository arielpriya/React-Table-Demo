export type ButtonProps = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
    color?: 'primary' | 'secondary';
    disabled?: boolean;
    type?: string;
    className?:string;
    content?:string;
  };
  