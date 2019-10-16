import request from '@/utils/request'

export default {
  login(parm) {
    return request.post('/api/login', parm)
  }
}
