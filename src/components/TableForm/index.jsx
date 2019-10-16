import React, { PureComponent } from 'react'
import { Form, Button } from 'antd'
import styles from './index.less'

class view extends PureComponent {

  handleGetFormValues = () => {
    /**
     * 返回一个promise，扁平一些
     */
    return new Promise((resolve) => (
      this.props.form.validateFields((_, values) => resolve(values))
    ))
  }

  handleCallBackFormValues = async () => {
    /**
     * 把表单的值返回给父组件（使用该组件的那个组件）
     */
    const { handleGetFormValues } = this.props
    const values = await this.handleGetFormValues()
    handleGetFormValues(values)
  }

  handleSubmit = async (e) => {
    /**
     * 按传入的元素搜索
     */
    e.preventDefault()
    const values = await this.handleGetFormValues()
    console.log(values)
  }

  handleReset = async () => {
    /**
     * 重置表单，重新请求数据
     */
    this.props.form.resetFields()
    const values = await this.handleGetFormValues()
    console.log(values)
  }

  handleRequest = () => {
    /**
     * 请求表格数据
     */
  }

  render() {

    const { searchOptions } = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <div className={ styles.tableForm }>
        <Form layout="inline" onSubmit={ this.handleSubmit }>
          {
            searchOptions.map((item, index) => {
              const { props } = item
              const { name } = props
              const child = getFieldDecorator(name)(item)
              return <Form.Item { ...props } key={ index }>{ child }</Form.Item>
            })
          }
          <Form.Item><Button type="primary" htmlType="submit">查询</Button></Form.Item>
          <Form.Item><Button onClick={ this.handleReset }>重置</Button></Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'tableForm' })(view)