export default {
  'POST /api/login': (_, res) => {
    res.send({
      status: {
        errCode: 200,
        message: ''
      },
      data: {
        name: 'Build',
        avatar: 'https://gss0.baidu.com/7Ls0a8Sm2Q5IlBGlnYG/sys/portraith/item/b1bc7696?t=1571040241'
      }
    })
  }
}
