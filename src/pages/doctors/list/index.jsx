import React, { PureComponent } from 'react'
import { Card, Input } from 'antd'
import TableForm from '../../../components/TableForm'

class view extends PureComponent {

  handleGetFormValues = (value) => {
    console.log(value)
  }

  render() {

    const TableFormProps = {
      handleGetFormValues: this.handleGetFormValues,
      searchOptions: [
        <Input name="name" label="姓名" placeholder="请输入姓名" />,
        <Input name="phone" label="手机号" placeholder="请输入手机号" />
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