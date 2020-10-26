import React, { useState } from 'react'
import "./view.scss"
import { List, Avatar, Pagination } from 'antd';

const JobFairList = props => {
  const {jobFairsList} = props
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={jobFairsList}
      renderItem={item => (
        <List.Item
          key={item.name}
          className="gray_b"
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar || require('@/img/tests.png')} />}
            title={item.name}
            description={`已有${item.enterprise_count}家企业报名参与`}
          />
          <div className="flex_column">
            <span>
              {`开始时间：${item.start_date}`}
            </span>
            <span>
              {`结束时间：${item.end_date}`}
            </span>
          </div>
        </List.Item>
      )}
    />
  );
}

export default function renderView(page) {
  return <div className="height_100 flex_column padding_20">
      <div className="flex_column flex_1 scroll_y">
        <div className="flex_row align_center form_title"><span>招聘会列表</span></div>
        <div className="flex_column descriptions">
          <span className="bold">注意事项</span>
          <span>1.列表项中会显示招聘会名称，多少家企业参加了这个招聘会，还有招聘会的起始日期</span>
          <span>2.点击招聘会名称将会进入该招聘会的详情</span>
        </div>
        <div><JobFairList jobFairsList={page.state.jobFairsList} /></div>
      </div>
      <div className="width_100 flex_row">
        <div className="flex_1"></div>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  
}
