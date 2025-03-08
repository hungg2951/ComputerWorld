import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductAdminPage = () => {
    const navigation = useNavigate()
  return (
    <div>
      <Button onClick={()=>navigation('/admin/products/create')} className=''>Thêm mới</Button>
    </div>
  );
}

export default  ProductAdminPage;
