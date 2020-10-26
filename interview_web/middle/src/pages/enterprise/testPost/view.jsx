import React, { useState } from 'react'
import "./view.scss"
import { Form, Input, Button, Space, Descriptions } from 'antd';
import { MinusCircleOutlined, PlusOutlined  } from '@ant-design/icons';

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 11 },
    sm: { span: 8, offset: 11, },
  },
};

const TestsForm = props => {
  const onFinish = values => {
    console.log('TestsForm values:', values);
    props.onConfirm(values)
  };
  return (
    <Form name="TestsForm" onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="name"
        label="面试题名称"
        rules={[
          {
            required: true,
            message: '请填写面试题名称',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="jobDescribe"
        label="面试题所针对的岗位"
        rules={[
          {
            required: true,
            message: '请填写面试题所针对的岗位',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="desc"
        label="面试题的描述"
        rules={[
          {
            required: true,
            message: '请填写面试题的描述',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="bonus"
        label="面试题通过才显示的信息"
        rules={[
          {
            required: true,
            message: '请填写面试题通过才显示的信息',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.List name="selection">
        {(fields, { add, remove }) => {
          console.log(fields)
          return (
            <div>
              {fields.map(field => (
                <div key={"selection" + field.key} className="flex_column width_100">
                  <div className="flex_row align_start">
                    <Form.Item
                      {...field}
                      name={[field.name, 'question']}
                      fieldKey={[field.fieldKey, 'question']}
                      rules={[{ required: true, message: '请填写题干' }]}
                      className="flex_1"
                    >
                      <Input placeholder="选择题题干" />
                    </Form.Item>

                    <div className="flex_row center delete_icon">
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex_row align_center">
                    <Form.Item
                      {...field}
                      name={[field.name, 'A']}
                      label="A"
                      fieldKey={[field.fieldKey, 'A']}
                      key={[field.fieldKey, 'A']}
                      rules={[{ required: true, message: '请填写A选项' }]}
                    >
                      <Input placeholder="A选项" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, 'B']}
                      label="B"
                      fieldKey={[field.fieldKey, 'B']}
                      key={[field.fieldKey, 'B']}
                      rules={[{ required: true, message: '请填写B选项' }]}
                    >
                      <Input placeholder="B选项" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, 'C']}
                      label="C"
                      fieldKey={[field.fieldKey, 'C']}
                      key={[field.fieldKey, 'C']}
                      rules={[{ required: true, message: '请填写C选项' }]}
                    >
                      <Input placeholder="C选项" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, 'D']}
                      label="D"
                      fieldKey={[field.fieldKey, 'D']}
                      key={[field.fieldKey, 'D']}
                      rules={[{ required: true, message: '请填写D选项' }]}
                    >
                      <Input placeholder="D选项" />
                    </Form.Item>
                  </div>

                  <div className="flex_row align_center">
                    <Form.Item
                      {...field}
                      name={[field.name, 'AS']}
                      label="A分值"
                      fieldKey={[field.fieldKey, 'AS']}
                      key={[field.fieldKey, 'AS']}
                      rules={[{ required: true, message: '请填写A分值' }]}
                    >
                      <Input placeholder="A分值" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, 'BS']}
                      label="B分值"
                      fieldKey={[field.fieldKey, 'BS']}
                      key={[field.fieldKey, 'BS']}
                      rules={[{ required: true, message: '请填写B分值' }]}
                    >
                      <Input placeholder="B分值" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, 'CS']}
                      label="C分值"
                      fieldKey={[field.fieldKey, 'CS']}
                      key={[field.fieldKey, 'CS']}
                      rules={[{ required: true, message: '请填写C分值' }]}
                    >
                      <Input placeholder="C分值" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, 'DS']}
                      label="D分值"
                      fieldKey={[field.fieldKey, 'DS']}
                      key={[field.fieldKey, 'DS']}
                      rules={[{ required: true, message: '请填写D分值' }]}
                    >
                      <Input placeholder="D分值" />
                    </Form.Item>
                  </div>
                </div>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> 添加选择题题目
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.List name="answer">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map(field => (
                <div key={"answer" + field.key} className="flex_row align_start">
                  <Form.Item
                    {...field}
                    name={[field.name, 'question']}
                    fieldKey={[field.fieldKey, 'question']}
                    key={[field.fieldKey, 'question']}
                    rules={[{ required: true, message: '请填写简答题题干' }]}
                    className="flex_1"
                  >
                    <Input placeholder="请填写简答题题干" />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    name={[field.name, 'questionS']}
                    fieldKey={[field.fieldKey, 'questionS']}
                    key={[field.fieldKey, 'questionS']}
                    rules={[{ required: true, message: '请填写简答题分值' }]}
                  >
                    <Input placeholder="请填写简答题分值" />
                  </Form.Item>

                  <div className="flex_row center delete_icon">
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </div>
                </div>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> 添加简答题题目
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

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
  <div className="flex_row align_center form_title"><span>发布一套面试题</span></div>
  <div className="flex_column descriptions">
    <span className="bold">注意事项</span>
    <span>1.面试题通过才显示的信息为企业批改后，觉得该用户符合企业要求才在客户端显示的信息，可填写一些企业联系方式（类似offer）</span>
    <span>2.选择题和简答题必须至少有一道题目</span>
    <span>3.选择题需要填写每一个选项的分值，用户做完面试题后，选择题将自动算分，但简答题需要企业自己判断打分</span>
  </div>
  <div/>
  <div className="width_100 test_post_form_container"><TestsForm onConfirm={values=>page.onConfirm(values)} /></div>
</div>
}
