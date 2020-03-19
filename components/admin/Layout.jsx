import {
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import react, { useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function MainLayout({ children }) {
  const router = useRouter();
  useCallback(() => {
    validate();
  });

  async function logout() {
    try {
      await Cookies.remove("token");
      router.push("/admin/login", "/admin/login");
    } catch (error) {
      console.log(error);
    }
  }

  async function validate() {
    try {
      const token = await Cookies.get("token");
      if (token) {
        router.push("/admin/login", `/admin/login`);
        return;
      }
    } catch (error) {}
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <UserOutlined />
            <span>สมาชิก</span>
          </Menu.Item>
          <Menu.Item key="2">
            <NotificationOutlined />
            <span>โปรโมชั่น</span>
          </Menu.Item>
          <Menu.Item key="3" onClick={logout}>
            <LogoutOutlined />
            <span>ออกจากระบบ</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>Sagame66 ©2018</Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
