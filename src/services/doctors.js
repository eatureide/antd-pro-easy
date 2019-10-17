import request from '@/utils/request'

export default {
  doctorPaginate(parm) {
    return request.get('/api/doctors/paginate', parm)
  }
}
