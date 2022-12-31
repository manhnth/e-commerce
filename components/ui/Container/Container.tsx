import { FC, ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children?: ReactNode;
  el?: HTMLElement;
  clean?: boolean;
}

const Container: FC<ContainerProps> = ({
  children,
  className,
  el = "div",
  clean = false, // Full Width Screen
}) => {
  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any;

  return <div className="mx-auto max-w-7xl px-6">{children}</div>;
};

export default Container;
