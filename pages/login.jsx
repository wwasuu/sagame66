import React, { useState, useEffect } from "react";
import { LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Particles from "react-particles-js";
import Link from 'next/link'
import httpClient from '../util/httpClient'
import "../styles/main.scss";

function Login() {
  const [form] = Form.useForm();
  const router = useRouter()
  const [isSubmitting, toggleSubmitting] = useState(false);

  useEffect(() => {
    validate()
  }, [])

  async function validate() {
    try {
      const token = await Cookies.get('token')
      if (token) {
        router.push('/user/affiliate', `/user/affiliate`)
        return
      }
    } catch (error) {
      
    }
  }

  async function login(data) {
    try {
      toggleSubmitting(true)
      const { data: { success, error, data: { token } }} = await httpClient.post('/api/auth', data)
      if (!success) {
        message.error(error.message)
        return
      }
      await Cookies.set('token', token)      
      toggleSubmitting(false)
      router.push('/user/affiliate', `/user/affiliate`)
    } catch (error) {
      message.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
      toggleSubmitting(false)
      console.log(error)
    }
  }

  async function onFinish(values) {
    try {
      login(values)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login__page">
      <div className="login__background">
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
      <div className="login__container">
        <img className="login__logo" src="/images/logo-light.png" />
        <div>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <div className="login__title">
              เข้าสู่ระบบ
            </div>
            <Form.Item
              name="username"
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
            <Form.Item>
              <Button className="button button--block" htmlType="submit" disabled={isSubmitting}>
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Link href="/home" as="/"><a className="login__button--back">กลับหน้าแรก</a></Link>
      </div>
    </div>
  );
}

export default Login;
