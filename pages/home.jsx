import Particles from "react-particles-js";
import Typist from "react-typist";
import "../styles/main.scss";

const Home = () => (
  <>
    <div className="header__container">
      <div className="container">
        <navbar className="navbar__container">
          <a className="navbar__logo">
            <img src="/images/logo-light.png" />
          </a>
          <div className="navbar-menu__list">
            <div className="navbar-menu__item">หน้าหลัก</div>
            <div className="navbar-menu__item">เกี่ยวกับเรา</div>
            <div className="navbar-menu__item">บริการของเรา</div>
            <div className="navbar-menu__item">กิจกรรมของเรา</div>
            <div className="navbar-menu__item">สมัครสมาชิก</div>
          </div>
        </navbar>
      </div>
    </div>
    <div className="main__container">
      {/* <Particles
      params={{
        particles: {
          number: {
            value: 50
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
    /> */}
      <div className="main__content">
        <div className="main__title">
          <span className="main__title--red">SAGAME66</span> บริการ และ กิจกรรม
          เราคือตัวจริง
        </div>
        <Typist className="">
          <span className="main__subtitle">SAGAME66 แจกจริง</span>
          {/* <Typist.Backspace count={8} delay={200} />
          <span className="main__subtitle">แจกจริง</span> */}
        </Typist>
      </div>
      <button className="button">สมัครสมาชิก</button>
    </div>
    <div className="container">
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
          <button className="button">สมัครสมาชิก</button>
        </div>
        <img className="about__image" src="/images/about.png" />
      </div>
    </div>
    <div className="service__background">
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
                  เราได้ออกแบบระบบเว็บไซต์ให้ง่ายต่อการใช้งาน ทั้งบน มือถือ และ
                  คอมพิวเตอร์
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
    <div className="container">
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
  </>
);

export default Home;
