import React, {useState} from 'react'
import "./view.scss"
import {
  Form,
  Input,
  Button,
  DatePicker
} from 'antd';

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 11 },
    sm: { span: 8, offset: 11, },
  },
};

const JobFairForm = props => {

  const onFinish = fieldsValue => {
    console.log('JobFairForm Result: ', fieldsValue);
    let values = {
      ...fieldsValue,
      'start_date': fieldsValue['start_date'].format('YYYY-MM-DD'),
      'end_date': fieldsValue['end_date'].format('YYYY-MM-DD HH:mm:ss'),
    };
    props.onConfrim(values)
    return
  };

  return (
    <Form
      name="JobFairForm"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="招聘会名称"
        rules={[
          {
            required: true,
            message: '请填写招聘会名称',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="desc"
        label="招聘会描述"
        rules={[
          {
            required: true,
            message: '请填写招聘会的描述',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="start_date"
        label="招聘会的开始日期"
        rules={[
          {
            required: true,
            message: '请填写招聘会的开始日期',
            type: 'object',
          },
        ]}
        hasFeedback
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="end_date"
        label="招聘会的结束日期"
        rules={[
          {
            required: true,
            message: '请填写招聘会的结束日期',
            type: 'object',
          },
        ]}
        hasFeedback
      >
        <DatePicker />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          发布
        </Button>
      </Form.Item>
    </Form>
  );
};

export default function renderView(page) {
  return <div className="scroll_y flex_column width_100">
    <div className="flex_row align_center form_title"><span>发布一场校园招聘会</span></div>
    <div className="flex_column descriptions">
      <span className="bold">注意事项</span>
      <span>1.发布招聘会后企业可报名参加，学校可以看见报名参加企业的联系方式</span>
    </div>
    <div/>
    <div className="width_100 test_post_form_container"><JobFairForm onConfrim={values=>page.onConfrim(values)} /></div>
  </div>
}
