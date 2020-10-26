import React from 'react'
import './view.scss'
import renderView from './view'
import {connect} from 'react-redux'
import wx from '@/common/wx'
import * as XLSX from 'xlsx'
import cAPI from '@/api/college'

class BatUpload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      file_name: "",
      uploaded: false
    };
    this.studentList = []
  }

  async componentDidMount() {
  }

  uploadFilesChange = (file) => {
    console.log(file.fileList[0].name)
    this.setState({
      file_name: file.fileList[0].name,
      uploaded: true,
      fileList: file.fileList
    })
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        const {result} = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, {type: 'binary'});
        // 存储获取到的数据
        let data = {};
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {

          let tempData = [];
          // esline-disable-next-line
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            console.log(sheet);
            data[sheet] = tempData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          }
        }
        const excelData = data.Sheet1;
        for (let item of excelData) {
          if (!this.studentList.find(student=>item.学号===student.study_code))
            this.studentList.push({
              study_code: item.学号,
              name: item.姓名,
              gender: item.性别,
              phone: item.联系电话,
              major: item.专业,
              average_point: item.平均绩点,
            })
        }
        console.log(this.studentList)
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        console.log(e);
      }

    }
    // 以二进制方式打开文件
    try {
      fileReader.readAsBinaryString(file.file);
    } catch (e) {
      console.log(e)
    }

    //删除不存在的
    for (let key in this.fundList) {
      let _file = file.fileList.findIndex(item => {
        return item.uid === key
      })
      if (_file === -1) {
        delete this.fundList[key]
      }
    }
  }

  downloadExample() {
      console.log('do download Example')
      var link = document.createElement('a');
      link.setAttribute("download", "");
      link.href = 'https://fribble-oss.oss-cn-shanghai.aliyuncs.com/%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E5%AD%A6%E7%94%9F%E6%A8%A1%E6%9D%BF.xlsx';
      link.click();
  }

  async onSubmit() {
    this.setState({fileList: []})
    if (this.studentList.length === 0) {
      wx.showToast({
        title: '没有获取到有效学生列表'
      })
      return
    }
    await cAPI.bat_upload_student({student_list:this.studentList})
    wx.showToast({
      title: '添加成功！'
    })
  }

  render() {
    return renderView(this)
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {})(BatUpload)
