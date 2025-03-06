import React from "react";
import { FaFacebookF, FaYoutube, FaTiktok, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" py-8 text-gray-800">
      <div className="container max-w-[1220px]  mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="font-bold text-lg uppercase">
            CÔNG TY TNHH Computer world VIỆT NAM
          </h2>
          <p>Địa chỉ: Số 01, ngõ 111, Thái Hà, Đống Đa, Hà Nội</p>
          <p>Hotline: 0123 456 789</p>
          <p>Email: contact@computerworld.com</p>
          <div className="flex space-x-4 mt-2">
            <FaFacebookF className="text-blue-600 text-xl cursor-pointer" />
            <FaYoutube className="text-red-600 text-xl cursor-pointer" />
            <FaTiktok className="text-black text-xl cursor-pointer" />
          </div>
        </div>
        {/* Company Policies & Info */}
        <div>
          <h2 className="font-bold text-lg">THÔNG TIN CÔNG TY</h2>
          <ul>
            <li>Giới thiệu công ty</li>
            <li>Tuyển dụng</li>
            <li>Gửi góp ý, khiếu nại</li>
          </ul>
          <h2 className="font-bold text-lg mt-4">CHÍNH SÁCH CÔNG TY</h2>
          <ul>
            <li>Chính sách chất lượng</li>
            <li>Chính sách bảo hành - bảo trì</li>
            <li>Chính sách đổi trả</li>
            <li>Chính sách bảo mật thông tin</li>
            <li>Chính sách vận chuyển</li>
            <li>Chính sách vệ sinh Laptop</li>
            <li>Hướng dẫn mua hàng - thanh toán</li>
          </ul>
        </div>
        {/* Store Locations */}
        <div>
          <h2 className="font-bold text-lg uppercase">HỆ THỐNG CỬA HÀNG Computer World</h2>
          <p className="font-semibold">Computer World cơ sở Hà Nội</p>
          <p>Số 01, ngõ 111, Thái Hà, Đống Đa, Hà Nội</p>
          <p>Hotline: 0123 456 789</p>
          <p>Bán hàng: 8h30 - 21h30</p>
          <p>Kỹ thuật: 8h30 - 12h & 13h30 - 17h30</p>

          <p className="font-semibold mt-4">Computer World cơ sở TPHCM</p>
          <p>Quận 1 TPHCM</p>
          <p>Hotline: 0123 456 789</p>
          <p>Bán hàng: 8h30 - 21h30</p>
          <p>Kỹ thuật: 8h30 - 12h & 13h30 - 17h30</p>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="bg-gray-200 text-center py-4 mt-8">
        <p>
          Công ty TNHH Computer World Việt Nam. MST số xxxxxxxxxx cấp ngày
          23/10/2024 @ Computer World. All Rights Reserved
        </p>
      </div>
      {/* Hotline Button */}
      <div className="z-50 fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg cursor-pointer">
        <FaPhoneAlt />
        <span>0123 456 789</span>
      </div>
    </footer>
  );
};

export default Footer;
