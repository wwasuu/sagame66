import { Breadcrumb, message, Table } from "antd";
import react, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Layout from "../../components/admin/Layout";
import httpClientWithAuth from "../../util/httpClientWithAuth";

function Main() {
  const [users, setUser] = useState([]);
  const [isLoding, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      setLoading(true);
      const {
        data: {
          success,
          data: { users }
        }
      } = await httpClientWithAuth.get("/api/user");
      if (!success) {
        setLoading(false);
        message.error(error.message);
        return;
      }

      setLoading(false);
      setUser(users);
    } catch (error) {
      if (error.response.status === 401) {
        await Cookies.remove("token");
        router.push("/login", `/login`);
      } else {
        message.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
      setLoading(false);
    }
  }

  const columns = [
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "เบอร์โทรศัพท์",
      dataIndex: "mobile_number",
      key: "mobile_number"
    },
    {
      title: "บัญชีธนาคาร",
      dataIndex: "bank_account",
      key: "bank_account"
    },
    {
      title: "เลขที่บัญชี",
      dataIndex: "bank_account_number",
      key: "bank_account_number"
    },
    {
      title: "Line Id",
      dataIndex: "line_id",
      key: "line_id"
    }
  ];

  return (
    <Layout>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>สมาชิก</Breadcrumb.Item>
        <Breadcrumb.Item>ทั้งหมด</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ minHeight: 360 }}>
        <Table columns={columns} dataSource={users} loading={isLoding} />
      </div>
    </Layout>
  );
}

export default Main;
