import React, { useState } from "react";
import { Modal, Button } from "antd";
const DescriptionProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="max-w-full mx-auto flex flex-col lg:flex-row gap-6 mt-10 max-sm:width-full">
        {/* Phần mô tả laptop */}
        <div className="lg:w-2/3 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold border-b pb-2">
            Đặc điểm nổi bật
          </h2>
          <h3 className="text-xl font-bold mt-3">
            Laptop <span className="text-blue-600">Dell</span> Precision 15 5560
            hướng đến đối tượng nào?
          </h3>

          <div className="my-4">
            <img
              src="https://example.com/laptop1.jpg"
              alt="Dell Precision 15 5560"
              className="w-full rounded-lg"
            />
          </div>

          <p className="text-gray-700">
            <span className="text-blue-600 font-semibold">Dell</span> đã gây ấn
            tượng mạnh tới đa số người sử dụng khi cho ra mắt
            <span className="text-blue-600"> Dell Precision 5560</span>. Với
            ngoại hình thanh lịch, sang trọng được khoác lên một chiếc laptop
            workstation thực thụ, đó chính là ấn tượng lớn nhất của mẫu laptop
            siêu hot này. Ngoài ra,
            <span className="text-blue-600 font-semibold"> Dell</span> cũng rất
            chăm chút cải tiến hiệu suất hoạt động của chiếc laptop này. Sau đây
            hãy cùng{" "}
            <span className="text-blue-600 font-semibold">LaptopAZ</span> tìm
            hiểu về chiếc laptop cực kỳ ấn tượng này nhé.
          </p>

          <div className="my-4">
            <img
              src="https://example.com/laptop2.jpg"
              alt="Dell Precision 15 5560 Back"
              className="w-full rounded-lg"
            />
          </div>
        </div>

        {/* Phần thông số kỹ thuật */}
        <div className="lg:w-1/3 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-bold">Thông số kỹ thuật</h2>
          <h3 className="text-blue-600 font-semibold mt-2 border-b pb-2">
            Thông số kỹ thuật Laptop Dell Precision 15 5560
          </h3>

          <table class="w-full border-collapse border border-gray-300 text-sm">
            <tbody>
              <tr class="bg-white">
                <td class="border border-gray-300 p-2 font-medium">CPU</td>
                <td class="border border-gray-300 p-2">
                  Intel Core Processor i7-11800H (8 Core, 24MB Cache, 2.40 GHz
                  to 4.60 GHz, 45W)
                </td>
              </tr>
              <tr class="bg-gray-100">
                <td class="border border-gray-300 p-2 font-medium">RAM</td>
                <td class="border border-gray-300 p-2">
                  16 GB, 2x8 GB, DDR4, 3200 MHz
                </td>
              </tr>
              <tr class="bg-white">
                <td class="border border-gray-300 p-2 font-medium">Ổ cứng</td>
                <td class="border border-gray-300 p-2">
                  1TB, Gen 3 PCIe x4 NVMe, Solid State Drive1TB, Gen 3 PCIe x4
                  NVMe, Solid State Drive
                </td>
              </tr>
              <tr class="bg-gray-100">
                <td class="border border-gray-300 p-2 font-medium">Card VGA</td>
                <td class="border border-gray-300 p-2">
                  NVIDIA® RTX™ A2000 4GB GDDR6
                </td>
              </tr>
              <tr class="bg-white">
                <td class="border border-gray-300 p-2 font-medium">
                  Màn hình{" "}
                </td>
                <td class="border border-gray-300 p-2">
                  15.6-inch, FHD+ 1920 x 1200 InfinityEdge, 60 Hz, anti-glare,
                  low blue light, non-touch, 500 nits, sRGB 100% min,
                  wide-viewing angle
                </td>
              </tr>
              <tr class="bg-gray-100">
                <td class="border border-gray-300 p-2 font-medium">
                  Cổng kết nối
                </td>
                <td class="border border-gray-300 p-2">
                  Type-C 1 Jack 3.5 mm 1 Thunderbolt 1 khe cắm thẻ nhớ SD
                </td>
              </tr>
              <tr class="bg-white">
                <td class="border border-gray-300 p-2 font-medium">
                  Trọng lượng
                </td>
                <td class="border border-gray-300 p-2">1.84 kg</td>
              </tr>
              <tr class="bg-gray-100">
                <td class="border border-gray-300 p-2 font-medium">Pin</td>
                <td class="border border-gray-300 p-2">86 Whr</td>
              </tr>
              <tr class="bg-white">
                <td class="border border-gray-300 p-2 font-medium">
                  Hệ điều hành{" "}
                </td>
                <td class="border border-gray-300 p-2">Windows 11 bản quyền</td>
              </tr>
            </tbody>
          </table>

          {/* Nút xem thêm */}
          <button onClick={showModal} className="w-full mt-4 p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
            Xem cấu hình chi tiết
          </button>
        </div>
      </div>
      {/* popup */}
      <div className="flex justify-center items-center ">
        {/* Modal Popup */}
        <Modal
          title={<h2 className="text-2xl font-bold">Thông số kỹ thuật</h2>}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          width={900} // Set width giống ảnh
          className="custom-modal"
        >
          <h3 className="text-blue-600 font-semibold text-lg mb-3">
            Thông số kỹ thuật Laptop Dell Precision 15 5560
          </h3>

          {/* Bảng thông số kỹ thuật */}
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              {[
                [
                  "CPU",
                  "Intel Core Processor i7-11800H (8 Core, 24MB Cache, 2.40 GHz to 4.60 GHz, 45W)",
                ],
                ["RAM", "16 GB, 2x8 GB, DDR4, 3200 MHz"],
                ["Ổ cứng", "1TB, Gen 3 PCIe x4 NVMe, Solid State Drive"],
                ["Card VGA", "NVIDIA® RTX™ A2000 4GB GDDR6"],
                [
                  "Màn hình",
                  "15.6-inch, FHD+ 1920 x 1200 InfinityEdge, 60 Hz, anti-glare, low blue light, non-touch, 500 nits, sRGB 100% min, wide-viewing angle",
                ],
                [
                  "Cổng kết nối",
                  "Type-C, 1 Jack 3.5 mm, 1 Thunderbolt, 1 khe cắm thẻ nhớ SD",
                ],
                ["Trọng lượng", "1.84 kg"],
                ["Pin", "86 Whr"],
                ["Hệ điều hành", "Windows 11 bản quyền"],
              ].map(([title, value], index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border border-gray-300 px-4 py-2 font-semibold w-1/4">
                    {title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal>
      </div>
    </>
  );
};

export default DescriptionProduct;
