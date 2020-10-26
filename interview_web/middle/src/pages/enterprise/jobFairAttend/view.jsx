import React, {useState} from 'react'
import "./view.scss"
import { List, Avatar, Button, Pagination } from 'antd';

const JobFairList = props => {
  const {jobFairsList} = props
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={jobFairsList}
      renderItem={item => (
        <List.Item
          key={item.title}
          className="gray_b"
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar || require('@/img/tests.png')} />}
            title={<div className="flex_row">
              <span className="bold">{item.name}</span>
              <div className="flex_1"/>
              {item.is_attend?<span className="bold">已参加</span>:<Button onClick={()=>props.attend(item.id)}>参加</Button>}
            </div>}
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
  const {jobFairsList} = page.state
  return <div className="height_100 flex_column padding_20">
      <div className="flex_1 scroll_y">
        <div className="flex_row align_center form_title"><span>校园招聘会列表</span></div>
        <div className="flex_column descriptions">
          <span className="bold">注意事项</span>
          <span>1.列表项中会显示校园招聘会名称，多少系统内企业用户报名了该招聘会，还有招聘会的起始时间</span>
          <span>2.点击报名按钮即可报名参加，具体事宜学校将会联系</span>
        </div>
        <JobFairList jobFairsList={jobFairsList} attend={id=>page.attend(id)} />
      </div>
      <div className="width_100 flex_row">
        <div className="flex_1"></div>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
}
