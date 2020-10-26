import React, { useState } from 'react'
import "./view.scss"


export default function renderView(page) {
  return <div className="height_100 width_100 home_gray_b">
    <div className="flex_row width_100 header">
      <span className="bold">欢迎访问，模拟面试</span>
      <div className="flex_1" />
      {/* <span className="bold">欢迎您，</span> */}
      {console.log(page.props.user.token)}
      {page.props.user.token ? (
        <a>
          <div onClick={() => page.go2management()}><span className="bold">进入管理后台</span></div>
        </a>
      ) : (
          <>
            <a>
              <div onClick={() => page.go2login()}><span className="bold">请登录</span></div>
            </a>
            <a>
              <div className="margin_left_30" onClick={() => page.go2register()}><span className="bold">注册</span></div>
            </a>
          </>
        )}
    </div>
    <div className="flex_row center">
      <div className="huge_font_logo">
        <span>M</span>
      </div>
      <div className="flex_column slogen">
        <span className="text_150">模拟面试</span>
        <span className="text_100">真实机会</span>
      </div>
    </div>
  </div>
}
