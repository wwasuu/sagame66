import { BankOutlined, CreditCardOutlined, LockOutlined, MenuOutlined, PhoneOutlined, UserOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { BackTop, Button, Drawer, Form, Input, message, Modal, Select } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Particles from "react-particles-js";
import Typist from "react-typist";
import "../styles/main.scss";
import httpClient from '../util/httpClient';


const Home = () => {
  const [isActivatedHeader, toggleActivatedHeader] = useState(false);
  const [isModalRegisterShown, toggleModalRegister] = useState(false);
  const [isMenuShown, toggleMenu] = useState(false);
  const [isSubmitting, toggleSubmitting] = useState(false);
  const [promotion, setPromotion] = useState([])
  const [form] = Form.useForm();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isActivatedHeader]);

  function handleScroll() {
    if (window.scrollY > 84 && !isActivatedHeader) {
      toggleActivatedHeader(true);
      document
        .getElementById("header")
        .classList.add("header__container--active");
      document
        .getElementById("navbar")
        .classList.add("navbar__container--active");
    }
    if (window.scrollY < 84 && isActivatedHeader) {
      toggleActivatedHeader(false);
      document
        .getElementById("header")
        .classList.remove("header__container--active");
      document
        .getElementById("navbar")
        .classList.remove("navbar__container--active");
    }
  }

  async function createUser(data) {
    try {
      toggleSubmitting(true)
      const { data: { success, error } } = await httpClient.post('/api/user', data)
      if (!success) { 
        message.error(error.message)
        return
      }      
      closeModalRegister();
      toggleSubmitting(false)
    } catch (error) {
      message.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
      console.log(error)
    }
    
  }

  async function onFinish(values) {
    try {
      createUser(values)
    } catch (erorr) {
      console.log(error)
    }
  }

  function closeModalRegister() {
    form.resetFields();
    toggleModalRegister(false);
  }

  return (
    <div id="app">
      <Drawer
        placement="top"
        closable={false}
        onClose={() => toggleMenu(false)}
        visible={isMenuShown}
      >
        <div className="navbar-menu-mobile__list">
          <AnchorLink
            href="#main"
            onClick={() => toggleMenu(false)}
            className="navbar-menu-mobile__item"
          >
            หน้าหลัก
          </AnchorLink>
          <AnchorLink
            href="#about"
            onClick={() => toggleMenu(false)}
            className="navbar-menu-mobile__item"
          >
            เกี่ยวกับเรา
          </AnchorLink>
          <AnchorLink
            href="#promotion"
            onClick={() => toggleMenu(false)}
            className="navbar-menu-mobile__item"
          >
            โปรโมชั่น
          </AnchorLink>
          <AnchorLink
            href="#service"
            onClick={() => toggleMenu(false)}
            className="navbar-menu-mobile__item"
          >
            บริการของเรา
          </AnchorLink>
          <AnchorLink
            href="#portfolio"
            onClick={() => toggleMenu(false)}
            className="navbar-menu-mobile__item"
          >
            กิจกรรมของเรา
          </AnchorLink>
          <AnchorLink
            href="#contact"
            onClick={() => toggleMenu(false)}
            className="navbar-menu-mobile__item"
          >
            สมัครสมาชิก
          </AnchorLink>
          <Link href="/login" as="/login">
            <a className="navbar-menu-mobile__item">เข้าสู่ระบบ</a>
          </Link>
        </div>
      </Drawer>
      <BackTop />
      <Modal
        visible={isModalRegisterShown}
        footer={null}
        closable={false}
        onCancel={closeModalRegister}
      >
        <div className="register__form">
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <div className="register__title">
              สมัครสมาชิกเพื่อเข้าเล่น คาสิโน / คาสิโนออนไลน์ กับ SAGAME66
            </div>
            <Form.Item
              name="mobile_number"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกเบอร์โทรศัพท์"
                },
                {
                  len: 10,
                  message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"
                }
              ]}
              hasFeedback
            >
              <Input
                prefix={<PhoneOutlined />}
                size="large"
                placeholder="เบอร์โทรศัพท์"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกรหัสผ่าน"
                }
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                placeholder="รหัสผ่าน"
              />
            </Form.Item>

            <Form.Item
              name="confirm_password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกรหัสผ่านอีกครั้ง"
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "รหัสผ่านไม่ตรงกัน กรุณากรอกให้ถูกต้อง"
                    );
                  }
                })
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                placeholder="ยืนยันรหัสผ่าน"
              />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อ - นามสกุล"
                }
              ]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined />}
                size="large"
                placeholder="ชื่อ - นามสกุล"
              />
            </Form.Item>
            <Form.Item
              name="bank_account"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกบัญชีธนาคาร"
                }
              ]}
              hasFeedback
            >
              <Select
                prefix={<BankOutlined />}
                size="large"
                style={{ width: "100%" }}
              >
                <Select.Option value="">
                  เลือกธนาคาร
                </Select.Option>
                <Select.Option value="KBANK">
                  ธนาคาร กสิกรไทย จำกัด (มหาชน)
                </Select.Option>
                <Select.Option value="BBL">ธนาคาร กรุงเทพ จำกัด (มหาชน)</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="bank_account_number"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกเลขบัญชีธนาคารของท่าน"
                }
              ]}
              hasFeedback
            >
              <Input
                prefix={<CreditCardOutlined />}
                size="large"
                placeholder="เลขบัญชีธนาคารของท่าน"
              />
            </Form.Item>
            <Form.Item
              name="line_id"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอก Line ID (ถ้าไม่มีใส่เบอร์โทรศัพท์)"
                }
              ]}
              hasFeedback
            >
              <Input
                prefix={<WhatsAppOutlined />}
                size="large"
                placeholder="Line ID (ถ้าไม่มีใส่เบอร์โทรศัพท์)"
              />
            </Form.Item>
            <Form.Item>
              <Button className="button button--block" htmlType="submit" disabled={isSubmitting}>
                สมัครสมาชิก
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <div id="header" className="header__container">
        <div className="container">
          <nav id="navbar" className="navbar__container">
            <a className="navbar__logo-light">
              <img src="/images/logo-light.png" />
            </a>
            <a className="navbar__logo-dark">
              <img src="/images/logo-dark.png" />
            </a>
            <div
              className="navbar-menu__button"
              onClick={() => toggleMenu(true)}
            >
              <MenuOutlined />
            </div>
            <div className="navbar-menu__list">
              <AnchorLink href="#main" className="navbar-menu__item">
                หน้าหลัก
              </AnchorLink>
              <AnchorLink href="#about" className="navbar-menu__item">
                เกี่ยวกับเรา
              </AnchorLink>
              <AnchorLink href="#promotion" className="navbar-menu__item">
                โปรโมชั่น
              </AnchorLink>
              <AnchorLink href="#service" className="navbar-menu__item">
                บริการของเรา
              </AnchorLink>
              <AnchorLink href="#portfolio" className="navbar-menu__item">
                กิจกรรมของเรา
              </AnchorLink>
              <AnchorLink href="#contact" className="navbar-menu__item">
                สมัครสมาชิก
              </AnchorLink>
              <Link href="/login" as="/login">
                <a className="navbar-menu__item">เข้าสู่ระบบ</a>
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="main__container">
        <div className="main__animation-background">
          <Particles
            params={{
              particles: {
                number: {
                  value: 75
                },
                size: {
                  value: 3
                }
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: "repulse"
                  }
                }
              }
            }}
          />
        </div>
        <div id="main" className="main__content">
          <div className="main__title">
            <span className="main__title--red">SAGAME66</span> บริการ และ
            กิจกรรม เราคือตัวจริง
          </div>
          <Typist className="">
            <span className="main__subtitle">SAGAME66 แจกจริง</span>
            {/* <Typist.Backspace count={8} delay={200} />
          <span className="main__subtitle">แจกจริง</span> */}
          </Typist>
          <button
            onClick={() => toggleModalRegister(true)}
            className="button main__button"
          >
            สมัครสมาชิก
          </button>
        </div>
      </div>
      <div id="about" className="container">
        <div className="about__container">
          <div className="about__content">
            <h4 className="about__subtitle">เกี่ยวกับเรา SAGAME66</h4>
            <h2 className="about__title">
              เรามีเกมหลากหลาย กิจกรรมแจกรางวัล
              <br />
              <span className="about__title--red">
                พร้อมด้วยใส่ใจบริการ ดูแลตลอดเวลา
              </span>
            </h2>
            <div className="about__description">
              เรา SAGAME66 ให้บริการเกมคาสิโน และบาคาร่าออนไลน์
              เจ้าแรกและเจ้าเดียวที่เอาใจใส่ทุกเรื่องของคุณ
              ไม่ว่าจะเป็นความปลอดภัย ความรวดเร็วในการบริการ และ จัดการเรื่อง
              ฝาก-โอน ที่มีประสิทธิ์ ภาพที่สุดด้วยทีมงานที่คัดสรรค์มาเพื่อคุณ
              พร้อมให้คำแนะนำในการเล่นต่าง ๆ ไม่ว่าจะเป็นหน้าใหม่ หรือ มืออาชีพ
              เราก็ช่วยดูแล
            </div>
            <button
              onClick={() => toggleModalRegister(true)}
              className="button"
            >
              สมัครสมาชิก
            </button>
          </div>
          <img className="about__image" src="/images/about.png" />
        </div>
      </div>
      <div id="promotion" className="container">
        <div className="promotion__container">
          <h2 className="promotion__title">
            โปรโมชั่นคาสิโนออนไลน์ SAGAME66 ที่เดียวเท่านั้นที่ให้ได้
          </h2>
          <div className="promotion__list">
            <div className="promotion__item">
              <img className="promotion__image" src="/images/promotion-1.jpg" />
              <div className="promotion__content">
                <div className="promotion__item-title">
                  สมาชิกใหม่รับโบนัส 50%
                </div>
                <div>
                  รับโบนัสสูงสุดไม่เกิน 1000 บาท ยอดเทิร์นโอเวอร์ 20 เท่า
                </div>
                <div className="promotion__item-remark">
                  *หากพบเห็นการตั้งใจสร้างหลาย USER
                  เพื่อมาแทงสวนทีมงานจะระงับการจ่ายเงิน ทุกกรณี
                </div>
              </div>
            </div>
            <div className="promotion__item">
              <img className="promotion__image" src="/images/promotion-2.jpg" />
              <div className="promotion__content">
                <div className="promotion__item-title">
                  ฝากเงินครั้งแรกของวันรับโบนัส 10%
                </div>
                <div>
                  รับโบนัสสูงสุดไม่เกิน 1000 บาท ยอดเทิร์นโอเวอร์ 20 เท่า
                </div>
                <div className="promotion__item-remark">
                  *หากพบเห็นการตั้งใจสร้างหลาย USER
                  เพื่อมาแทงสวนทีมงานจะระงับการจ่ายเงิน ทุกกรณี
                </div>
              </div>
            </div>
            <div className="promotion__item">
              <img className="promotion__image" src="/images/promotion-3.png" />
              <div className="promotion__content">
                <div className="promotion__item-title">
                  แนะนำเพื่อนรับค่าคอมมิชชั่น 0.6% ทันที
                </div>
                <div>
                  เพียงแค่ท่านชวนเพื่อนครั้งเดียว
                  รับค่าคอมมิชชั่นยอดได้เสียของเพื่อนทันที
                  สร้างรายได้กว่าเดือนละ 100,000 บาท ชวนเยอะได้เยอะ
                </div>
              </div>
            </div>
            <div className="promotion__item">
              <img className="promotion__image" src="/images/promotion-4.png" />
              <div className="promotion__content">
                <div className="promotion__item-title">
                  รับเงินคืน 0.3% ทุกยอดการเดิมพัน
                </div>
                <div>
                  ท่านสามารถกดรับโบนัสเงินคืน 0.3% ได้หลังจากมีรายการเล่น
                  ระบบนับจากยอดได้เสียเท่านั้น..ไม่นับเสมอ..สามารถกดรับได้ 1
                  ชั่วโมง/ครั้ง
                </div>
              </div>
            </div>
            <div className="promotion__item">
              <img className="promotion__image" src="/images/promotion-5.png" />
              <div className="promotion__content">
                <div className="promotion__item-title">
                  โปรวันเกิด! เกิดปุ๊บ..รับปั๊บ 500 บาททันที
                </div>
                <div>
                  เมื่อถึงวันเกิดของท่าน
                  เพียงแค่ท่านโชว์บัตรประชาชนให้ทีมงานรับทันทีเครดิต 500 บาท
                  (สามารถถอนเงินได้ทันที) *ท่านต้องมียอดฝากเงินและรายการเล่น
                  รวมเกิน 1000 บาท ถึงจะรับโปรนี้ได้
                </div>
              </div>
            </div>
            <div className="promotion__item">
              <img className="promotion__image" src="/images/promotion-6.png" />
              <div className="promotion__content">
                <div className="promotion__item-title">
                  แทงถูก หรือ ผิด ติดกัน 10 ตารวด!รับเงินทันที
                </div>
                <div>
                  รับโบนัสทันทีสูงสุดไม่เกิน 5,000 บาท อ่านรายละเอียดเพิ่มเติม
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="service" className="service__background">
        <div className="container">
          <div className="service__container">
            <h2 className="service__title">บริการจากเรา</h2>
            <div className="service__list">
              <div className="service__item">
                <i className="fad fa-book-alt service__icon" />
                <div className="service__content">
                  <div className="service__subtitle">Mobile Design</div>
                  <div className="service__description">
                    ระบบได้รับการพัฒนาให้เล่นบนมือถือได้สะดวกสบาย
                    ใช้งานง่ายบนมือถือทุกรุ่น
                  </div>
                </div>
              </div>
              <div className="service__item">
                <i className="fad fa-lock-alt service__icon" />
                <div className="service__content">
                  <div className="service__subtitle">Web Security</div>
                  <div className="service__description">
                    เว็บไซต์เรามีความปลอดภัยสูงสุด บนระบบ SSL Certificate
                  </div>
                </div>
              </div>
              <div className="service__item">
                <i className="fad fa-user-headset service__icon" />
                <div className="service__content">
                  <div className="service__subtitle">Team Support</div>
                  <div className="service__description">
                    เรามีทีมงานที่จะคอยดูแลคุณตลอดเวลา เพียงแค่ทักหาเท่านั้น
                  </div>
                </div>
              </div>

              <div className="service__item">
                <i className="fad fa-pencil-ruler service__icon" />
                <div className="service__content">
                  <div className="service__subtitle">Graphic Design</div>
                  <div className="service__description">
                    เราได้ออกแบบระบบเว็บไซต์ให้ง่ายต่อการใช้งาน ทั้งบน มือถือ
                    และ คอมพิวเตอร์
                  </div>
                </div>
              </div>

              <div className="service__item">
                <i className="fad fa-money-check-edit service__icon" />
                <div className="service__content">
                  <div className="service__subtitle">Auto Withdraw</div>
                  <div className="service__description">
                    ระบบ ฝาก - โอน อัตโนมัติที่มีความรวดเร็วกว่าที่ใด ๆ
                  </div>
                </div>
              </div>

              <div className="service__item">
                <i className="fad fa-user-shield service__icon" />
                <div className="service__content">
                  <div className="service__subtitle">Protect Personal Data</div>
                  <div className="service__description">
                    ข้อมูลของคุณจะเป็นความลับ
                    เราไม่มีการเปิดเผยข้อมูลผู้ใช้งานไม่ว่ากรณีใด ๆ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="portfolio" className="container">
        <div className="portfolio__container">
          <h2 className="portfolio__title">กิจกรรมของเรา</h2>
          <div className="portfolio__list">
            <img className="portfolio__item" src="/images/banner-1.jpg" />
            <img className="portfolio__item" src="/images/banner-2.jpg" />
            <img className="portfolio__item" src="/images/banner-3.jpg" />
            <img className="portfolio__item" src="/images/banner-4.jpg" />
            <img className="portfolio__item" src="/images/banner-5.jpg" />
            <img className="portfolio__item" src="/images/banner-6.jpg" />
            <img className="portfolio__item" src="/images/banner-7.jpg" />
            <img className="portfolio__item" src="/images/banner-8.jpg" />
            <img className="portfolio__item" src="/images/banner-9.jpg" />
          </div>
        </div>
      </div>
      <div id="contact" className="contact__container">
        <div className="container">
          <div className="contact__title">
            สมัครลงทะเบียนกับเรา
            <br />
            ลุ้นรับโปรโมชั่นพิเศษไปเลย!
          </div>
          <div className="contact__subtitle">
            เพียงแค่ลงทะเบียนกับเราคุณก็มีโอกาสได้รับโปรโมชั่น เน้น ๆ ไปเลย 50%
            ถ้าแนะนำเพื่อนสมัครกับเรารับเพิ่มอีกเพียบ สมัครเลย !
          </div>
          <button onClick={() => toggleModalRegister(true)} className="button">
            สมัครสมาชิก
          </button>
        </div>
      </div>
      <div className="footer__background">
        <div className="container">
          <div className="footer__container">
            <a className="navbar__logo">
              <img src="/images/logo-light.png" />
            </a>
            <div>© 2020 SAGAME66</div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
