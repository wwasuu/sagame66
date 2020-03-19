// pages/_app.js
import App from "next/app";
import Head from "next/head";
import React from "react";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>
            โปรโมชั่นคาสิโนออนไลน์ สมาชิกใหม่รับโบนัส 50% โปรเด็ดคาสิโนฯ
            SAGAME66
          </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
          <meta
            name="description"
            content="โปรโมชั่นคาสิโนออนไลน์ สมาชิกใหม่รับโบนัส 50% ทันที หรือเลือกฝากเงินครั้งแรกในแต่ละวัน รับเพิ่มอีก 10% ได้ทุกวัน วันเกิดก็รับโปรคาสิโนออนไลน์ได้เช่นกัน"
          />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}
