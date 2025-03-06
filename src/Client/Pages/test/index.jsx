import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllData } from '../../../redux/slice/laptopTypeSlice'

const TestRedux = () => {
  const getLaptopType = useSelector((state) => state.laptopType)
  const dispatch = useDispatch()
  console.log(getLaptopType);
  useEffect(() => {
    dispatch(getAllData())
  }, [])
  return (
    <div>
      
    </div>
  )
}

export default TestRedux
