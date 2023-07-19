import React from "react";
import Merchandise from "@/app/_components/Merchandise";

const page = () => {
  return (
    <div>
      <Merchandise type="SWEATSHIRT" quantity={10} />
    </div>
  );
};

export default page;
