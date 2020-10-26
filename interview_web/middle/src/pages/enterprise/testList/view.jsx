import React, {useState} from 'react'
import "./view.scss"
import { List, Avatar, Pagination } from 'antd';

const TestList = props => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      // pagination={{
      //   position: "top",
      //   onChange: page => {
      //     console.log(page);
      //   },
      //   pageSize: 5,
      // }}
      dataSource={props.testsList}
      renderItem={item => (
        <List.Item
          key={item.title}
          className="gray_b"
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar || require('@/img/tests.png')} />}
            title={<a><div onClick={()=>props.go2test_detail(item.id)}>{item.name || "未知"}</div></a>}
            description={`已有${item.test_count}学生做了此面试题`}
          />
          {item.desc}
        </List.Item>
      )}
      footer={<div className="flex_1" />}
    />
  );
}

export default function renderView(page) {
  return <div className="height_100 flex_column padding_20">
      <div className="flex_column flex_1 scroll_y">
        <div className="flex_row align_center form_title"><span>面试题列表</span></div>
        <div className="flex_column descriptions">
          <span className="bold">注意事项</span>
          <span>1.列表项中会显示面试题名称，多少学生用户做了这套题目，还有面试题的备注</span>
          <span>2.点击面试题名称将会进入该面试题的详情</span>
        </div>
        <TestList testsList={page.state.testsList} go2test_detail={id => page.go2test_detail(id)} />
      </div>
      <div className="width_100 flex_row">
        <div className="flex_1"></div>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
}
