import { useState } from "react";
import Create from "./create";
import List from "./list";

const BrandPage = () => {
  const [change, setChange] = useState(false);
  const onSubmit = () => {
    setChange(!change);
  };
  return (
    <div>
      <Create onSubmit={onSubmit} />
      <List change={change} />
    </div>
  );
};

export default BrandPage;
