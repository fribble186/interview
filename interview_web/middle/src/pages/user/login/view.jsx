/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import {connect} from 'react-redux'
import "./view.scss"
import {setUser} from './actions'
import UserAPI from '@/api/user'
import wx from '@/common/wx'
import config from '@/common/config'
import { Form, Input, Button, Checkbox, Select } from 'antd';
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const LoginForm = props => {
  const onFinish = values => {
    console.log('Success:', values);
    props.onConfrim(values)
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="LoginForm"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            required: true,
            message: '请填写登录邮箱地址',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: '请填写登录密码',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="manager_type"
        label="用户类型"
        rules={[
          {
            required: true,
          },
        ]}
        hasFeedback
      >
        <Select
          placeholder="请填写用户类型"
          allowClear
        >
          <Option value="enterprise">企业用户</Option>
          <Option value="college">高校用户</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

class Login extends React.Component {
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  onConfrim(values) {
    wx.showLoading({title: '请稍后...', mask: true})

    UserAPI.middle_login(values).then(data => {
      wx.hideLoading()
      if (data.result?.indexOf("wrong") > -1) {
        wx.showToast({
          title: "登陆失败"
        })
        return
      }
      data.user_type = data.type
      delete data.user_type
      this.props.setUser({user_type: data.type, token: data.token, email: data.email})
      this.handleAction(data.token, values.remember, data.email, data.type)
    }).catch(e => {
      console.log(e)
      setTimeout(() => {
        wx.hideLoading()
      }, 1000)
    })
  }

  handleAction(token, remember, email, type) {
    if (token) {
      if (remember) {
        wx.setStorage({
          key: config.env + '_MuserInfo',
          data: {
            token: token,
            email,
            user_type: type
          }
        })
      }

      let RedirectUrl = this.props.location.state ? this.props.location.state.from.pathname : null
      let RedirectUrlSearch = this.props.location.state ? this.props.location.state.from.search : ''
      // console.log('RedirectUrl', RedirectUrl + RedirectUrlSearch)
      if (RedirectUrl) {
        // 登陆成功之后的跳转
        this.props.history.replace(RedirectUrl + RedirectUrlSearch)
      } else {
        wx.navigateTo({
          page: this,
          url: `/home`
        })
      }

    }
  }

  render() {
    const {user} = this.props

    return (<div className="page flex_column flex_1 center " id="rankPage">
      {
        !user.email ?
          <div className="width_60 flex_column login_container align_center">
            <span className="margin_bottom_30 text_28">请登录</span>
            <LoginForm onConfrim={values=>this.onConfrim(values)} />
          </div> :
          <div>
            登陆中...
          </div>
      }
    </div>)
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, {setUser})(Login)

