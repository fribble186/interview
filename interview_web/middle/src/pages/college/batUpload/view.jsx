import React, {useState} from 'react'
import "./view.scss"
import { Upload, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

const dragger_props = {
  listType: 'picture',
};

const UploadC = props => {
  return (
    <Dragger {...dragger_props}
      fileList={props.fileList}
      beforeUpload={function () {
        return false;
      }} onChange={props.uploadFilesChange.bind(this)}>
      <div className="upload_container flex_column center">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="text_32 gray">点击或将文件拖拽到这里上传</p>
        <p className="text_28 light_gray margin_top_10">支持.xlsx .xls .csv格式，最多同时导入100只基金</p>
      </div>
    </Dragger>
  )
}

export default function renderView(page) {
  return <div className="scroll_y flex_column padding_20">
      <div className="flex_row align_center form_title">
        <span>批量注册学生用户</span>
        <div className="flex_1" />
        <Button type="primary" onClick={() => page.onSubmit()}>上传</Button>
        <Button className="margin_left_30 empty_button margin_top_20 margin_bottom_60" onClick={() => page.downloadExample()}>
          <span className="text_28 gold">下载批量导入模板.xlsx</span>
        </Button>
      </div>
      <div className="flex_column descriptions">
        <span className="bold">注意事项</span>
        <span>1.可以点击上方下载批量导入模板，导入学生账户信息</span>
        <span>2.把excel文档拖到下方框里，或点击上传</span>
        <span>3.点击上传会进行自动去重，并自动将学生的学号做为账号，手机号做为密码，上传成功后，学生可以根据账号密码登录客户端</span>
      </div>
      <UploadC uploadFilesChange={page.uploadFilesChange} fileList={page.state.fileList} />
    </div>
}
