import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import "./index.css";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

function Loader() {
  return (
    <div className="loading-screen">
      <Spin indicator={antIcon} />
    </div>
  );
}

export default Loader;
