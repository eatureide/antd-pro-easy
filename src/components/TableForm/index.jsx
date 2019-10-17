import React, { Component } from 'react'
import { Form, Button, Table, Pagination } from 'antd'
import './index.less'

class view extends Component {

  state = {
    pageSearch: {
      page: 1,
      count: 10
    },
    searchParm: {}
  }

  handleGetFormValues = () => {
    /**
     * 返回一个promise，扁平一些
     */
    return new Promise((resolve) => (
      this.props.form.validateFields((_, values) => resolve(values))
    ))
  }

  handleSubmit = async (e) => {
    /**
     * 按传入的元素搜索
     */
    e.preventDefault()
    this.handleRequest()
  }

  handleReset = async () => {
    /**
     * 重置表单，重新请求数据
     */
    this.props.form.resetFields()
    this.handleRequest()
  }

  handleRequest = async () => {
    /**
     * 请求表格数据，如果有缓存则优先使用缓存页
     */
    const { pageSearch } = this.state
    const { pathname } = window.location
    const page = JSON.parse(window.localStorage.getItem(pathname)) || pageSearch
    // console.log(page)
    const parm = await this.handleGetFormValues()
    this.setState({ pageSearch: { ...page } }, () => {
      this.props.request({ ...page, ...parm })
    })
  }

  handleTableOnChange = (page, count) => {
    /**
     * 表格onChange
     */
    this.setState({ pageSearch: { page, count } }, () => {
      const { pageSearch } = this.state
      const { pathname } = window.location
      window.localStorage.setItem(pathname, JSON.stringify(pageSearch))
      this.handleRequest()
    })
  }

  static getDerivedStateFromProps({ total = 0, dataSource = [] }) {
    /**
     * 当页数不是1，但表格数据又是空或者不足10个（不满1页）的情况下，证明数据变化要重置，重置后刷新
     */
    const { pathname } = window.location
    const storagePage = JSON.parse(window.localStorage.getItem(pathname))
    const reset = {
      page: 1,
      count: 10
    }
    if (total !== 0) {
      if (storagePage.page !== 1 && dataSource.length < 10) {
        window.localStorage.setItem(pathname, JSON.stringify(reset))
        window.location.reload()
      }
    }
    return null
  }

  componentDidMount() {
    this.handleRequest()
  }

  render() {

    const { searchOptions = [], otherOptions = [], columns = [], dataSource = [], total = 0 } = this.props
    const { getFieldDecorator } = this.props.form
    const { pageSearch } = this.state

    dataSource.forEach((item, index) => {
      item.key = index
      item.index = index
    })

    return (
      <div className="tableForm">
        <Form layout="inline" className="f-options" onSubmit={ this.handleSubmit }>
          <Form.Item>
            {
              searchOptions.map((item, index) => {
                const { props } = item
                const { name } = props
                const child = getFieldDecorator(name, { initialValue: props.initialValue || undefined })(item)
                return <Form.Item { ...props } key={ index }>{ child }</Form.Item>
              })
            }
          </Form.Item>
          <Form.Item>
            <Button className="f-search" type="primary" htmlType="submit">查询</Button>
            <Button onClick={ this.handleReset }>重置</Button>
          </Form.Item>
        </Form>

        <div className="f-header">
          {
            otherOptions.map((item) => (item))
          }
        </div>

        <Table pagination={ false } columns={ columns } dataSource={ dataSource } />
        <div className="m-footer">
          <p>共 { total } 条记录</p>
          <Pagination
            current={ pageSearch.page }
            pageSize={ pageSearch.count }
            total={ total }
            showQuickJumper
            showSizeChanger
            onChange={ this.handleTableOnChange }
            onShowSizeChange={ this.handleTableOnChange }
          />
        </div>
      </div>
    )
  }
}

export default Form.create({ name: 'tableForm' })(view)