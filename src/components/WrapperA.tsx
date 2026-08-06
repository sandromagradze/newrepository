import type { ReactNode } from "react";

interface WrapperAProps {
  children: ReactNode;
}

export default function WrapperA({ children }: WrapperAProps) {
  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 leading-[21px] text-[#333333] text-[14px] font-normal font-[400px]">
      {children}
    </div>
  );
}
