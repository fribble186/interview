import React, { useState } from 'react'
import "./view.scss"
import {
  Form,
  Input,
  Button,
  Checkbox,
} from 'antd';

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 11 },
    sm: { span: 8, offset: 11, },
  },
};

const TestsBoxForm = props => {
  const { pb_data, tb_data } = props.testBoxDetail
  let answerList = pb_data.filter(item=>item.problem_box_problem.problemType==="answer")
  const onFinish = values => {
    console.log('JobFairForm Result: ', values);
    props.onConfirm(values)
  };

  return (
    <Form
      name="JobFairForm"
      onFinish={onFinish}
    >
      <div className="flex_column width_100 padding_20">
        <div className="margin_bottom_30"><span>{`选择题得分：${tb_data.selectionScore}`}</span></div>
        {answerList.map((item, index) => (
          <div className="flex_column">
            <span>{`题干：${item.problem_box_problem.contents}`}</span>
            <span>{`解答：${item.answer}`}</span>
            <Form.Item
              name={item.id}
              label="得分"
              rules={[
                {
                  required: true,
                  message: '请填写得分',
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          </div>
        ))}
      </div>

      <Form.Item
        name="bonus"
        valuePropName="checked"
      >
        <Checkbox>
          是否显示奖励信息
        </Checkbox>
      </Form.Item>

      <Form.Item
        name="desc"
        label="评语"
        rules={[
          {
            required: true,
            message: '请填写评语',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default function renderView(page) {
  const {testBoxDetail} = page.state
  return <div className="scroll_y flex_column width_100">
    <div className="flex_row align_center form_title"><span>批改一套面试题</span></div>
    <div className="flex_column descriptions">
      <span className="bold">注意事项</span>
      <span>1.选择题分数已自动算出</span>
      <span>2.简答题需要企业给出得分</span>
      <span>3.最后需写出评语并选择是否显示奖励信息</span>
    </div>
    <div/>
    <div className="width_100 test_post_form_container"><TestsBoxForm testBoxDetail={testBoxDetail} onConfirm={values=>page.onConfirm(values)} /></div>
  </div>
}
