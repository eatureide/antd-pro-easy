
import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import router from 'umi/router'
import styles from './style.less'
import { connect } from 'dva'
import userApi from '@/services/user'

/**
 * 表单复杂后代码实在太丑，稍微美化一下
 */

@connect(({ user }) => ({ currentUser: user.currentUser }))

class view extends Component {

  handleSubmit = async (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    this.props.form.validateFields(async (err, { username, password }) => {
      if (!err) {
        const parm = {
          name: username,
          password
        }
        const { code, data } = await userApi.login(parm)
        if (code === 200) {
          dispatch({ type: 'user/fetchCurrent', payload: data })
          router.replace('/')
        }
      }
    })
  }

  render() {

    const handleGetFieldDecorator = (valueName, parameters) => {//生成表单元素
      const { getFieldDecorator } = this.props.form
      return getFieldDecorator(valueName, { ...parameters })
    }

    const userName = () => {
      const formProps = {
        name: 'userName',
        placeholder: '请输入账户',
        formParams: {
          rules: [{
            required: true,
            message: '请输入账户'
          }]
        }
      }
      const children = <Input size="large" prefix={ <Icon type="user" /> } placeholder={ formProps.placeholder } />
      return handleGetFieldDecorator('username', formProps.formParams)(children)
    }

    const password = () => {
      const formProps = {
        name: 'password',
        placeholder: '请输入密码',
        formParams: {
          rules: [{
            required: true,
            message: '请输入密码'
          }]
        }
      }
      const children = <Input size="large" type="password" prefix={ <Icon type="lock" /> } placeholder={ formProps.placeholder } />
      return handleGetFieldDecorator('password', formProps.formParams)(children)
    }

    return (
      <div className={ styles.main }>
        <Form onSubmit={ this.handleSubmit }>
          <Form.Item>
            { userName() }
          </Form.Item>
          <Form.Item>
            { password() }
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>登录</Button>
          </Form.Item>
        </Form>
      </div >
    )
  }
}

export default Form.create({ name: 'login' })(view)
