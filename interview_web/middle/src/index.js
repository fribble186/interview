import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.less'
import './index.scss';

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './Store'
import config from '@/common/config'
import wx from '@/common/wx'

import App from './App'
import Home from '@/pages/home/c'
import Register from '@/pages/register/c'
import TestPost from '@/pages/enterprise/testPost/c'
import TestList from '@/pages/enterprise/testList/c'
import TestDetail from '@/pages/enterprise/testDetail/c'
import JobFairAttend from '@/pages/enterprise/jobFairAttend/c'
import TestBoxDetail from '@/pages/enterprise/testsBoxDetail/c'

import JobFairPost from '@/pages/college/jobFairPost/c'
import JobFairList from '@/pages/college/jobFairList/c'
import JobFairDetail from '@/pages/college/jobFairDetail/c'
import BatUpload from '@/pages/college/batUpload/c'


import Login from '@/pages/user/login/view'
import {SET_USER} from "./pages/user/login/actionTypes";
// import userAPI from '@/commAction/user'

var param = {};
window.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => param[k] = v);

function checkToken(props) {
  if (props.location.pathname==='/home' || props.location.pathname==='/register') return true
  const state = store.getState()
  if (state.user.user_type === "enterprise" && props.location.pathname.indexOf('enterprise') === -1){
    store.dispatch({type: SET_USER})
    return false
  } 
  if (state.user.user_type === "college" && props.location.pathname.indexOf('college') === -1){
    store.dispatch({type: SET_USER})
    return false
  }
  if (state.user.token) {
    return true
  } else {
    return false
  }
}

let localUserInfo = wx.getStorage(config.env + '_MuserInfo')
console.log('localUserInfo', localUserInfo)
if (localUserInfo && localUserInfo.token) {
  console.log('get local userInfo')
  store.dispatch({type: SET_USER, user_type: localUserInfo.user_type, email: localUserInfo.email, token: localUserInfo.token})
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename='interview'>
      <Switch>
        <Route exact path="/login" component={Login}/>

        <Route path='/' render={props =>
          !checkToken(props) ?
            <Redirect to={{
              pathname: '/login',
              state: {from: props.location}
            }}/>
            :
            <App {...props}>
              <Switch className="flex_column flex_1">
                <Route exact path="/home" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/enterprise/management/testPost" component={TestPost} />
                <Route exact path="/enterprise/management/testList" component={TestList} />
                <Route exact path="/enterprise/management/testDetail" component={TestDetail} />
                <Route exact path="/enterprise/management/jobFairAttend" component={JobFairAttend} />
                <Route exact path="/enterprise/management/testBoxDetail" component={TestBoxDetail} />
                
                <Route exact path="/college/management/jobFairPost" component={JobFairPost} />
                <Route exact path="/college/management/jobFairList" component={JobFairList} />
                <Route exact path="/college/management/jobFairDetail" component={JobFairDetail} />
                <Route exact path="/college/management/batUpload" component={BatUpload} />
              </Switch>
            </App>}/>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
