import { MenuOutlined } from "@ant-design/icons";
import { BackTop, Drawer, Form, Input, message } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useCallback, useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../../styles/main.scss";
import httpClientWithAuth from "../../util/httpClientWithAuth";

function affiliate() {
  const [isMenuShown, toggleMenu] = useState(false);
  const [form] = Form.useForm();
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    login()
  }, [])

  async function login() {
    try {
      const { data: { success, error, data: { user } } } = await httpClientWithAuth.get('/api/me')
      if (!success) {
        message.error(error.message)
        return
      }
      setUser(user)
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        await Cookies.remove('token')
        router.push("/login", `/login`);
      }
    }
  }

  async function logout() {
    try {
      await Cookies.remove("token");
      toggleMenu(false);
      router.push("/login", `/login`);
    } catch (error) {
      console.log(error);
    }
  }

  function generateLink() {
    if (!user) return 
    return `${window.location.origin}/register?af=${btoa(user.mobile_number)}`
  }

  return (
    <div>
      <Drawer
        placement="top"
        closable={false}
        onClose={() => toggleMenu(false)}
        visible={isMenuShown}
      >
        {
          user &&
          <div className="navbar-menu-mobile__list">
            <div className="navbar-menu-mobile__item">{user.name}</div>
            <div
              onClick={() => {
                logout();
              }}
              className="navbar-menu-mobile__item"
            >
              ออกจากระบบ
            </div>
          </div>
        }
      </Drawer>
      <BackTop />

      <div
        id="header"
        className="header__container header__container--relative"
      >
        <div className="container">
          <nav id="navbar" className="navbar__container navbar__container">
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
              <div className="navbar-menu__item">วสุ วินิจมนตรี</div>
              <div>
                <a
                  className="navbar-menu__item"
                  onClick={() => {
                    logout();
                  }}
                >
                  ออกจากระบบ
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="affiliate__background">
        <div className="container">
          <div className="affiliate__container">
            <div className="affiliate__title">Affiliate</div>
            <div className="affiliate__content">
              <div className="affiliate__subtitle affiliate__headline">
                ข้อมูลแนะนำเพื่อน
              </div>
              <div>
                โบนัสคงเหลือ : <span className="affiliate__strong">0</span> บาท
              </div>
              <div>
                แนะนำมาแล้ว : <span className="affiliate__strong">0</span> คน
              </div>
              <div>ยอดเงินจะอัพเดทอัติโนมัติ เวลา 12.00น. ของทุกวัน</div>
              <div>
                ลิ้งค์ช่วยแชร์รับ{" "}
                <span className="affiliate__strong">0.6%</span> ฟรี ทุกยอดการแทง
                <br />
                (แค่ก๊อปปี้ลิ้งค์ไปแชร์ก็ได้เงินแล้ว) ยิ่งแชร์มากยิ่งได้มาก
              </div>
              <div>
                ท่านสามารถนำลิ้งค์ด้านล่างนี้หรือนำป้ายแบนเนอร์
                ไปแชร์ในช่องทางต่างๆ ไม่ว่าจะเป็น เว็บไชต์ส่วนตัว, Blog,
                Facebook หรือ Social Network อื่นๆ
                หากมีการสมัครสมาชิกโดยคลิกผ่านลิ้งค์ของท่านเข้ามา
                ลูกค้าที่สมัครเข้ามาก็จะอยู่ภายให้เครือข่ายของท่านทันที
                และหากลูกค้าภายใต้เครือข่ายของท่านมีการเดิมพันเข้ามา
                ทุกยอดการเดิมพัน ท่านจะได้รับส่วนแบ่งในการแนะนำ 0.6%
                ทันทีโดยไม่มีเงื่อนไข
              </div>
              <div className="affiliate__headline">ตัวอย่างเช่น...</div>
              <div>
                <span className="affiliate__headline">เพื่อนลำดับที่ 1</span>{" "}
                ท่านจะได้รับส่วนแบ่ง เริ่มต้นในขั้นแรก 0.6% ตัวอย่างเช่น -
                ลูกค้าท่าน 1 คน แทง 1,000 บาท ท่านจะได้ 6 บาท
                (ท่านจะได้ทุกรายการแทงของลูกค้า)
              </div>
              <div>
                <span className="affiliate__headline">เพื่อนลำดับที่ 2</span>{" "}
                ท่านจะได้รับส่วนแบ่ง เริ่มต้นในขั้นแรก 0.06% ตัวอย่างเช่น -
                ลูกค้าท่าน 1 คน แทง 10,000 บาท ท่านจะได้ 6 บาท
                (ท่านจะได้ทุกรายการแทงของลูกค้า)
              </div>
              <div>
                สามารถทำรายได้เดือน 100,000 บาทง่ายๆเลยทีเดียว
                และรายได้ทุกบาททุกสตางค์ของท่านสามารถตรวจสอบได้ทุกขั้นตอน
                งานนี้แจกจริง จริงจ่าย ที่นี้ที่เดียวที่ให้คุณมากกว่าใคร
                ก๊อปปี้ลิ้งค์และข้อความด้านล่างนี้ นำไปแชร์ได้เลย
              </div>
            </div>
            <div className="affiliate__clipboard">
              <div>Link แนะนำเพื่อนของท่าน</div>
              <CopyToClipboard text={generateLink()}>
                <Input
                  disabled
                  size="large"
                  value={generateLink()}
                  suffix="คัดลอก"
                />
              </CopyToClipboard>
            </div>
            <div className="affiliate__image-container">
              <img className="affiliate__image" src="/images/affiliate.png" />
            </div>
          </div>
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
}

export default affiliate;
