import React, { useState } from 'react'
import "./view.scss"
import { List } from 'antd';
import { PageHeader, Button, Descriptions } from 'antd';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    title: <div className="flex_row width_100">
      <span>{`完成时间为${i}`}</span>
      <div className="flex_1" />
      <a><div><span>批改</span></div></a>
    </div>,
    content: '选择题得分：',
  });
}

const ProblemBoxList = props => {
  const {test_box_list, go2test_box_detail} = props
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        position: "top",
        onChange: page => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={test_box_list}
      renderItem={item => (
        <List.Item
          key={item.title}
          className="gray_b"
        >
          <List.Item.Meta
            title={<div className="flex_row width_100" onClick={()=>props.go2test_box_detail(item.id)}>
            <span>{`完成时间为${item.create_time}`}</span>
            <div className="flex_1" />
            <a><div><span>批改</span></div></a>
          </div>}
          />
          {'选择题得分：'+item.selectionScore}
        </List.Item>
      )}
    />
  );
}

export default function renderView(page) {
  const {testsDetail} = page.state
  return <div className="width_100 flex_column">
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={testsDetail.basic.name}
      subTitle={testsDetail.jobDescribe}
      extra={[
        <Button key="1" type="primary" danger>
          删除
        </Button>,
      ]}
    >
      <Descriptions size="small" column={2}>
        <Descriptions.Item label="创建日期">{testsDetail.basic.create_time}</Descriptions.Item>
        <Descriptions.Item label="状态">{testsDetail.basic.active ? '开放面试中...' : '已关闭'}</Descriptions.Item>
        <Descriptions.Item label="描述">{testsDetail.basic.desc}</Descriptions.Item>
        <Descriptions.Item label="奖励信息">{testsDetail.basic.jobDescribe}</Descriptions.Item>
      </Descriptions>
    </PageHeader>
    <div className="scroll_y flex_1">
      <ProblemBoxList test_box_list={testsDetail.test_box_list} go2test_box_detail={id=>page.go2test_box_detail(id)} />
    </div>
  </div>
}
