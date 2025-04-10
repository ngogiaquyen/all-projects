import React from "react";
import classNames from "classnames/bind";
import styles from "./ToolList.module.scss";
import { useNavigate } from "react-router-dom";
import routes from "~/configs";

const cx = classNames.bind(styles);

const tools = [
  {
    name: "Máy tính",
    description: "Tính toán nhanh gọn.",
    icon: "🧮",
    link: "/tools/calculator",
  },
  {
    name: "Chuyển đổi đơn vị",
    description: "Đổi kg ↔ gram, cm ↔ inch...",
    icon: "⚖️",
    link: "/tools/unit-converter",
  },
  {
    name: "Tạo mật khẩu",
    description: "Sinh mật khẩu ngẫu nhiên.",
    icon: "🔐",
    link: "/tools/password-generator",
  },
  {
    name: "Nén ảnh",
    description: "Tối ưu kích thước hình ảnh.",
    icon: "🖼️",
    link: "/tools/image-compressor",
  },
  {
    name: "Học tiếng anh",
    description: "Trang học tiếng anh.",
    icon: "✏️",
    link: routes.englishPage,
  },
  {
    name: "tiktok shop",
    description: "a phi li ết tiktok.",
    icon: "🏪",
    link: routes.shop,
  },
  {
    name: "Tạo sản phẩm",
    description: "tạo sản phẩm.",
    icon: "🏪",
    link: routes.createProduct,
  },
  {
    name: "Chỉnh sửa sản phẩm",
    description: "Chỉnh sửa sản phẩm.",
    icon: "🏪",
    link: routes.editProduct,
  },
  {
    name: "chi tiết sản phẩm",
    description: "chi tiết sản phẩm.",
    icon: "🏪",
    link: routes.productDetail,
  },
];

const ToolList = () => {
  const navigate = useNavigate();

  const handleClick = (link) => {
    navigate(link);
  };

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Danh sách công cụ</h1>
      <div className={cx("grid")}>
        {tools.map((tool, index) => (
          <div
            key={index}
            className={cx("card")}
            onClick={() => handleClick(tool.link)}
          >
            <div className={cx("icon")}>{tool.icon}</div>
            <div className={cx("name")}>{tool.name}</div>
            <div className={cx("description")}>{tool.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolList;
