import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Checkout = () => {
    const [searchParams] = useSearchParams();
    const allParams = Object.fromEntries([...searchParams]);
    console.log("🚀 ~ Checkout ~ allParams:", allParams)

    if(allParams.resultCode === '0') return alert("đặt hàng thành công")
    if(allParams.resultCode !== '0') return alert("Hủy đơn hàng")
  return (
    <div>
      
    </div>
  );
}

export default Checkout;
