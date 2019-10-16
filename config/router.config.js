const routerArray = [{
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [{
      name: 'login',
      path: '/user/login',
      component: './user/login'
    }]
  }, {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [{
        path: '/',
        redirect: '/doctors/list'
      },
      {
        name: '医生管理',
        icon: 'team',
        path: '/doctors',
        routes: [{
          name: '医生列表',
          path: '/doctors/list',
          component: './doctors/list',
        }, {
          component: './404'
        }]
      }
    ]
  },
  {
    component: './404'
  }
]
export default routerArray
