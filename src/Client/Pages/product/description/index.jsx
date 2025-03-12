import React, { useEffect, useState } from "react";
import ModalProductDetail from "../../../../components/modalProductDetail";
const HtmlRenderer = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};
const DescriptionProduct = ({ data }) => {
  const [onOpenModalProductdetail, setOnOpenModalProductdetail] =
    useState(false);
    const [desc, setDesc] = useState();
    useEffect(() => {
      if(data && data.description){
        setDesc(data.description)
      }
      else{
        setDesc("")
      }
    }, [data]);
  const showModal = () => {
    setOnOpenModalProductdetail(true);
  };
  return (
    <>
      <div className="max-w-full mx-auto flex flex-col lg:flex-row gap-6 mt-10 max-sm:width-full">
        {/* Phần mô tả laptop */}
        <div className="lg:w-2/3 bg-white p-4 shadow-md rounded-lg">
        <HtmlRenderer content={desc}/>
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
          <button
            onClick={showModal}
            className="w-full mt-4 p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Xem cấu hình chi tiết
          </button>
        </div>
      </div>
      {/* popup */}
      <div className="flex justify-center items-center ">
        {/* Modal Popup */}
        <ModalProductDetail
          onClose={() => setOnOpenModalProductdetail(false)}
          visible={onOpenModalProductdetail}
          data={data}
        />
      </div>
    </>
  );
};

export default DescriptionProduct;
