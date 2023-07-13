import React from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return <div>{params.slug}</div>;
};

export default Page;
