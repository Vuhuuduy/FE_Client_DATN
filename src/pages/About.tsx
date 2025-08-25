import React, { FC } from "react";

const About: FC = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold text-blue-600">
        Chào mừng đến với Trang Giới thiệu
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        Đây là trang giới thiệu được xây dựng bằng React + React Router DOM.
      </p>
    </div>
  );
};

export default About;
