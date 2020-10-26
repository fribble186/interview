import React, { useState } from 'react'
import "./view.scss"
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 8 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 8 },
    sm: { span: 8, offset: 8, },
  },
};

const EnterpriseForm = props => {

  const onFinish = values => {
    console.log('EnterpriseForm Result: ', values);
    props.onConfirm(values)
    return
  };

  return (
    <Form
      {...formItemLayout}
      name="EnterpriseForm"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="企业名称"
        rules={[
          {
            required: true,
            message: '请填写企业名称',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="企业联系电话"
        rules={[
          {
            required: true,
            message: '请填写企业联系电话',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="province"
        label="请填写企业所在省份"
        rules={[
          {
            required: true,
            message: '请填写企业所在省份',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="city"
        label="请填写企业所在城市"
        rules={[
          {
            required: true,
            message: '请填写企业所在城市',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="企业所在地址"
        rules={[
          {
            required: true,
            message: '请填写企业所在地址',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="scale"
        label="企业规模"
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
      >
        <Select
          placeholder="请填写企业规模"
          allowClear
        >
          <Option value="0-10">0-10人</Option>
          <Option value="10-50">10-50人</Option>
          <Option value="50-200">50-200人</Option>
          <Option value="200-500">200-500人</Option>
          <Option value="500-">500-人</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="desc"
        label="企业描述"
        rules={[
          {
            required: true,
            message: '请填写企业的描述',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="登录的邮箱地址"
        rules={[
          {
            type: 'email',
            message: '请填写正确的邮箱地址',
          },
          {
            required: true,
            message: '请填写登录用的邮箱地址!',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="登陆密码"
        rules={[
          {
            required: true,
            message: '请填写登录密码',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请第二次填写登录密码',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('Should accept agreement'),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          我已阅读须知事项 <a href="">须知事项</a>
        </Checkbox>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

const CollegeForm = props => {

  const onFinish = values => {
    console.log('CollegeForm Result: ', values);
    props.onConfirm(values)
    return
  };

  return (
    <Form
      {...formItemLayout}
      name="CollegeForm"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="学校名称"
        rules={[
          {
            required: true,
            message: '请填写学校名称',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="学校联系电话"
        rules={[
          {
            required: true,
            message: '请填写学校联系电话',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="province"
        label="请填写学校所在省份"
        rules={[
          {
            required: true,
            message: '请填写学校所在省份',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="city"
        label="请填写学校所在城市"
        rules={[
          {
            required: true,
            message: '请填写学校所在城市',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="学校所在地址"
        rules={[
          {
            required: true,
            message: '请填写学校所在地址',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="desc"
        label="学校描述"
        rules={[
          {
            required: true,
            message: '请填写学校的描述',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="登录的邮箱地址"
        rules={[
          {
            type: 'email',
            message: '请填写正确的邮箱地址',
          },
          {
            required: true,
            message: '请填写登录用的邮箱地址!',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="登陆密码"
        rules={[
          {
            required: true,
            message: '请填写登录密码',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请第二次填写登录密码',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('Should accept agreement'),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          我已阅读须知事项 <a href="">须知事项</a>
        </Checkbox>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default function renderView(page) {
  const { accountType } = page.state
  return <div className="scroll_y width_100 flex_column">
    <div className="width_100 flex_row center margin_top_30 border_bottom">
      <a className="flex_1 flex_row center"><div onClick={() => page.changeSwitch("enterprise")}>
        <span className={accountType === "enterprise" ? "active" : "inactive"}>企业用户</span>
      </div></a>
      <div className="fg" />
      <a className="flex_1 flex_row center"><div onClick={() => page.changeSwitch("college")}>
        <span className={accountType === "college" ? "active" : "inactive"}>学校用户</span>
      </div></a>
    </div>
    <div className="flex_column formContainer">
      {accountType === "enterprise" ? <EnterpriseForm onConfirm={data=>page.onConfirm('enterprise', data)} /> : <CollegeForm onConfirm={data=>page.onConfirm('college', data)} />}
    </div>
  </div>
}
