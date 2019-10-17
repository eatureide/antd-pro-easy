const array = []
for (let i = 0; i < 10; i++) {
  array.push({
    id: new Date().valueOf() + i + '',
    name: `怪医黑杰克${i}号`,
    img: 'https://gss0.baidu.com/7Ls0a8Sm2Q5IlBGlnYG/sys/portraith/item/b1bc7696?t=1571040241',
    phone: 13000000000 + i + '',
    character: 0
  })
}

export default {
  'GET /api/doctors/paginate': (_, res) => {
    res.send({
      status: {
        errCode: 200,
        message: ''
      },
      data: {
        array: array,
        total: 30,
        count: 10,
        extras: {},
        offset: 0,
        page: 1,
        totalPageNo: 10
      }
    })
  }
}
