import React, { PureComponent } from 'react'
import { Card, Input, Select, Button, Avatar } from 'antd'
import TableForm from '../../../components/TableForm'
import doctorsApi from '../../../services/doctors'
import style from './index.less'

const { Option } = Select

class view extends PureComponent {

  state = {
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
      }, {
        title: '医生ID',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '头像',
        dataIndex: 'img',
        key: 'img',
        render(img) {
          return <Avatar src={ img } />
        }
      }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      }, {
        title: '角色',
        dataIndex: 'character',
        key: 'character',
      },
    ],
    dataSource: [],
    total: 0
  }

  handleRequestDoctorPaginate = async (parm) => {
    /**
     * 表格请求
     */
    const { code, data } = await doctorsApi.doctorPaginate(parm)
    if (code === 200) {
      const { array, total } = data
      this.setState({ dataSource: [...array], total })
    }
  }

  render() {
    const { columns, dataSource, total } = this.state
    const TableFormProps = {
      total,
      columns,
      dataSource,
      request: this.handleRequestDoctorPaginate,
      otherOptions: [<Button key="createDoctor" type="primary">新增医生</Button>],
      searchOptions: [
        <Input name="name" label="姓名" placeholder="请输入姓名" />,
        <Input name="phone" label="手机号" placeholder="请输入手机号" />,
        <Select name="select" label="角色" placeholder="请选择角色" className={ style.select }>
          <Option value="-1">不限</Option>
          <Option value="0">主任医师</Option>
          <Option value="1">副主任医师</Option>
          <Option value="2">主治医师</Option>
          <Option value="3">住院医师</Option>
          <Option value="4">博士研究生</Option>
          <Option value="5">硕士研究生</Option>
          <Option value="6">本科生</Option>
        </Select>
      ]
    }

    return (
      <Card bordered={ false }>
        <TableForm { ...TableFormProps } />
      </Card>
    )
  }
}

export default view