import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Container;
