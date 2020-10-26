import React from 'react'
import wx from '@/common/wx'
import { Layout, Menu } from 'antd';
import {setUser} from "./pages/user/login/actions";
import {connect} from 'react-redux'
import config from '@/common/config'
import {SET_USER} from "./pages/user/login/actionTypes";

const { Header, Footer, Sider, Content } = Layout;

function EnterpriseMenu(props) {
  let keys = props.pathname.split('/')
  let key = keys[keys.length-1]

  return <>
    <div className="flex_row app_menu_header align_center">
      <span>欢迎您，企业管理者</span>
    </div>
    <Menu
      theme="dark"
      defaultSelectedKeys={[key]}
      mode="inline"
      onClick={e => wx.navigateTo({ page: props.page, url: "/enterprise/management/" + e.key })}
    >
      <Menu.Item key="testPost">发布试题</Menu.Item>
      <Menu.Item key="testList">试题列表</Menu.Item>
      <Menu.Item key="jobFairAttend">参加校园招聘会</Menu.Item>
    </Menu>
  </>
}

function CollegeMenu(props) {
  let keys = props.pathname.split('/')
  let key = keys[keys.length-1]

  return <>
    <div className="flex_row app_menu_header align_center">
      <span>欢迎您，高校管理者</span>
    </div>
    <Menu
      theme="dark"
      defaultSelectedKeys={[key]}
      mode="inline"
      onClick={e => wx.navigateTo({ page: props.page, url: "/college/management/" + e.key })}
    >
      <Menu.Item key="jobFairList">校园招聘会列表</Menu.Item>
      <Menu.Item key="jobFairPost">发布校园招聘会</Menu.Item>
      <Menu.Item key="batUpload">批量学生注册</Menu.Item>
    </Menu>
  </>
}


class App extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  state = {}

  constructor(props, context) {
    super(props)
  }

  componentDidMount() {
  }

  logout() {
    this.props.setUser({type: SET_USER})
    wx.setStorage({
      key: config.env + '_MuserInfo',
      data: {}
    })
    wx.navigateTo({
      page: this,
      url: "/home"
    })
  }

  render() {
    const { location } = this.props;
    var pathname = location.pathname
    console.log("pathname", pathname)

    return (
      pathname.indexOf("/management") === -1 ? (
        <div className="height_100 width_100">
          {this.props.children}
        </div>
      ) : (
          <Layout className="width_100 height_100" >
            <Sider>{pathname.indexOf("/enterprise") > -1 ?
              <EnterpriseMenu page={this} pathname={pathname} />
              :
              <CollegeMenu page={this} pathname={pathname} />
            }</Sider>
            <Layout>
              <Header className="border_bottom">
                <div className="flex_row align_center width_100">
                  <div className="flex_1" />
                  <a><div onClick={()=>this.logout()}><span>登出</span></div></a> 
                </div>
              </Header>
              <Content>
                <div className="page">
                  {this.props.children}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>模拟面试后台管理系统 Created by Fribble</Footer>
            </Layout>
          </Layout>
        )

    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, {setUser})(App)
