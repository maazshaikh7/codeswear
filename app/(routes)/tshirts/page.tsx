import React from "react";
import Merchandise from "@/app/_components/Merchandise";

const page = () => {
  return (
    <div>
      <Merchandise type="TSHIRT" quantity={2} />
    </div>
  );
};

export default page;
