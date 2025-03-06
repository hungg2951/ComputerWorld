import React from "react";
import styles from "./styles.module.css";
import { Slide } from "react-slideshow-image";
import { Form, NavLink } from "react-router-dom";
import { FormatPriceVND } from "../../../../../ultis/format";
const HotSaleComponent = () => {
  const products = [
    {
      name: "[New 100%] Laptop Lenovo V14 Gen 4 83A000BGVN - Intel Core i5-13420H | 16GB | 14 Inch Full HD IPS",
      price: 16000000,
      percent: 20,
      img: "https://laptop88.vn/media/product/250_9046_lenovo_v14_anb_moi_nhat.jpg",
      desc: "Lenovo V14 chip H cấu hình cực cao, làm việc khỏe, giá siêu tốt",
    },
    {
      name: "Samsung Chromebook siêu mỏng siêu sang, thiết kế đẹp, bền, khỏe",
      price: 10000000,
      percent: 20,
      img: "https://laptop88.vn/media/product/250_9046_lenovo_v14_anb_moi_nhat.jpg",
      desc: "mô tả",
    },
    {
      name: "sản phẩm 3",
      price: 16000000,
      percent: 20,
      img: "https://laptop88.vn/media/product/250_9046_lenovo_v14_anb_moi_nhat.jpg",
      desc: "mô tả",
    },
    {
      name: "[New 100%] Laptop Lenovo V14 Gen 4 83A000BGVN - Intel Core i5-13420H | 16GB | 14 Inch Full HD IPS",
      price: 16000000,
      percent: 20,
      img: "https://laptop88.vn/media/product/250_9046_lenovo_v14_anb_moi_nhat.jpg",
      desc: "mô tả",
    },
    {
      name: "sản phẩm 5",
      price: 16000000,
      percent: 20,
      img: "https://laptop88.vn/media/product/250_9046_lenovo_v14_anb_moi_nhat.jpg",
      desc: "mô tả",
    },
  ];
  const responsiveSettings = [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
  ];

  return (
    <>
      <div className={styles.container__hotsale}>
        <div className={styles.title}>
          <h2>
            <i className="fa fa-flash" />
            flash sale{" "}
            <span>
              <span>5 ngày</span>:<span>10 giờ</span>:<span>16 phút</span>
            </span>
          </h2>
        </div>

        <div className={styles.products__sale}>
          <Slide
            slidesToShow={2}
            slidesToScroll={1}
            responsive={responsiveSettings}
          >
            {products.map((item, index) => (
              <div className={styles.product__item}>
                <NavLink to="#">
                  <div className={styles.product__sale}>
                    <img src={item.img} alt="" />
                    <div className={styles.product__info}>
                      <div className={styles.product__name}>{item.name}</div>
                      <div className={styles.product__desc}>{item.desc}</div>
                      <div className={styles.product__price}>
                        <div className={styles.product__price_percent}>
                          <del className={styles.old_price}>
                            {FormatPriceVND(item.price)}
                          </del>
                          <div className={styles.percent}>-{item.percent}%</div>
                        </div>
                        <div className={styles.item__price}>
                          {FormatPriceVND(
                            item.price - (item.price * item.percent) / 100
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </>
  );
};

export default HotSaleComponent;
