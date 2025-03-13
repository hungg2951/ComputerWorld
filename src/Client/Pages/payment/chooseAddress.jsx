import { useState, useEffect } from "react";
import Select from "react-select";
const ChooseAddress = ({setAddress}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  // truyền địa chỉ lên component cha
  useEffect(() => {
    if (selectedWard && selectedDistrict && selectedProvince) {
        setAddress(
        selectedWard.label +
          "," +
          selectedDistrict.label +
          "," +
          selectedProvince.label
      );
    }
  }, [selectedProvince, selectedDistrict, selectedWard]);
  // Load danh sách tỉnh/thành
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then((data) =>
        setProvinces(
          data.map((item) => ({ value: item.code, label: item.name }))
        )
      );
  }, []);

  // Load danh sách huyện/quận khi chọn tỉnh/thành
  useEffect(() => {
    if (selectedProvince) {
      fetch(
        `https://provinces.open-api.vn/api/p/${selectedProvince.value}?depth=2`
      )
        .then((res) => res.json())
        .then((data) =>
          setDistricts(
            data.districts.map((item) => ({
              value: item.code,
              label: item.name,
            }))
          )
        );
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince]);

  // Load danh sách xã/phường khi chọn huyện/quận
  useEffect(() => {
    if (selectedDistrict) {
      fetch(
        `https://provinces.open-api.vn/api/d/${selectedDistrict.value}?depth=2`
      )
        .then((res) => res.json())
        .then((data) =>
          setWards(
            data.wards.map((item) => ({ value: item.code, label: item.name }))
          )
        );
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);
  return (
    <div>
      <div className="w-full space-y-4">
        <Select
          options={provinces}
          value={selectedProvince}
          onChange={(option) => {
            setSelectedProvince(option);
            setSelectedDistrict(null);
            setSelectedWard(null);
          }}
          placeholder="Chọn tỉnh/thành"
        />
        <Select
          options={districts}
          value={selectedDistrict}
          onChange={(option) => {
            setSelectedDistrict(option);
            setSelectedWard(null);
          }}
          placeholder="Chọn huyện/quận"
          isDisabled={!selectedProvince}
        />
        <Select
          options={wards}
          value={selectedWard}
          onChange={setSelectedWard}
          placeholder="Chọn xã/phường"
          isDisabled={!selectedDistrict}
        />
      </div>
    </div>
  );
};

export default ChooseAddress;
