import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['login'], () => import('../routes/login/login.js')),
    layout: 'login',
    name: '登录', // for breadcrumb
    path: 'login'
  },
  {
    component: dynamicWrapper(app, [], () => import('../routes/box/index.js')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: '最新动态',
        path: 'newest',
        icon: 'warning',
        component: dynamicWrapper(app, [], () => import('../routes/newest/newest.js'))
      },
      {
        name: '最热动态',
        path: 'hotest',
        icon: 'warning',
        component: dynamicWrapper(app, [], () => import('../routes/hotest/hotest.js'))
      }
    ]
  }
];
