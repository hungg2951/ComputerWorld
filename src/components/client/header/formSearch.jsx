import React from 'react';
import { Button, Form, Input } from "antd";
import styles from "./styles.module.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const FormSearch = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = (values) => {
        navigate(`/search?q=${values.query}`)
      };
  return (
    <div>
      <Form
              className={styles.FormSearch}
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item name="query" className={styles.searchInput}>
                <Input placeholder="Tìm kiếm tên sản phẩm..." />
              </Form.Item>
              <Form.Item className={styles.button}>
                <Button htmlType="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </Button>
              </Form.Item>
            </Form>
    </div>
  );
}

export default FormSearch;
