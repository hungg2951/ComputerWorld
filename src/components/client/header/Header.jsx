import React from "react";
import { Button, Form, Input } from "antd";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import Login from "../login";
const HeaderClient = () => {
  const urlImage = "http://localhost:5173/";
  const onFinish = (values) => {
    console.log("Success:", urlImage);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("urlImage:", urlImage);
  };

  return (
    <>
      <div className={`${styles.fixed_top}`}>
        <header>
          <div className={`${styles.header} `}>
            <div className={styles.logo}>
              <NavLink to={"/"}>
                <img
                  className={styles.logoDesk}
                  src="https://res.cloudinary.com/dnyx3a5yj/image/upload/v1723428544/logo.png"
                  alt=""
                />
                <img
                  className={styles.logoMobile}
                  src="https://res.cloudinary.com/dnyx3a5yj/image/upload/v1723428878/logo2.png"
                  alt=""
                />
              </NavLink>
            </div>
            <nav>
              <ul>
                <li>
                  <NavLink to="#">Laptop</NavLink>
                </li>
                <li>
                  <NavLink to="#">Giới thiệu</NavLink>
                </li>
                <li>
                  <NavLink to="#">Phụ kiện</NavLink>
                </li>
                <li>
                  <NavLink to="#">Build PC</NavLink>
                </li>
                <li>
                  <NavLink to="#">Màn hình</NavLink>
                </li>
              </ul>
            </nav>
            <div className={styles.menu__mobile}>
              <ul>
                <li>
                  <NavLink to="#">
                    <svg
                      class="h-6 w-6"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <line x1="3" y1="19" x2="21" y2="19" />{" "}
                      <rect x="5" y="6" width="14" height="10" rx="1" />
                    </svg>
                    Laptop
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#">
                    <svg
                      class="h-6 w-6"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <rect x="5" y="3" width="14" height="18" rx="2" />{" "}
                      <line x1="9" y1="7" x2="15" y2="7" />{" "}
                      <line x1="9" y1="11" x2="15" y2="11" />{" "}
                      <line x1="9" y1="15" x2="13" y2="15" />
                    </svg>
                    Giới thiệu
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#">
                    <svg
                      class="h-6 w-6"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <rect x="4" y="13" rx="2" width="4" height="6" />{" "}
                      <rect x="16" y="13" rx="2" width="4" height="6" />{" "}
                      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />{" "}
                      <path d="M18 19a6 3 0 0 1 -6 3" />
                    </svg>
                    Phụ kiện
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#">
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
                        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                      />
                    </svg>
                    Build PC
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#">
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
                        d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                      />
                    </svg>
                    Màn hình
                  </NavLink>
                </li>
              </ul>
            </div>
            <Form
              className={styles.FormSearch}
              name="basic"
              // initialValues={{
              //   remember: true,
              // }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item name="username" className={styles.searchInput}>
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
            <div className="flex justify-end">
              <div className={styles.cart}>
                <NavLink to="/cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </NavLink>
              </div>
              <div className={`${styles.account} group`}>
                <Login />
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default HeaderClient;
