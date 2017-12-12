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
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: '逛圈子',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
          {
            name: '最新动态',
            path: 'analysis',
            component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
          },
          {
            name: '最热动态',
            path: 'hotest',
            component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
          },
          {
            name: '最多评论',
            path: 'mostest',
            component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
          },
        ],
      },
      {
        name: '我的圈子',
        path: 'friend',
        icon: 'form',
        children: [
          {
            name: '我的圈友',
            path: 'friend',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
          },
          {
            name: '我的关注',
            path: 'following',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm'))
          },
          {
            name: '我的粉丝',
            path: 'followers',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
          },
        ],
      },
      {
        name: '个人中心',
        path: 'posting',
        icon: 'table',
        children: [
          {
            name: '写分享',
            path: 'posting',
            component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
          },
          {
            name: '我发表的',
            path: 'posted',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
          },
          {
            name: '我点赞的',
            path: 'likes',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
          },
          {
            name: '我评论的',
            path: 'comments',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/CoverCardList')),
          },
          {
            name: '私人空间',
            path: 'space',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/FilterCardList')),
          },
          {
            name: '我的图库',
            path: 'gallery',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/SearchList')),
          },
        ],
      },
      {
        name: '数据中心',
        path: 'ranking',
        icon: 'profile',
        children: [
          {
            name: '排行榜',
            path: 'ranking',
            component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
          },
          {
            name: '接口统计',
            path: 'api',
            component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
          },,
          {
            name: '数据统计',
            path: 'data',
            component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
          },
        ],
      },
      {
        name: '设置',
        path: 'personal',
        icon: 'check-circle-o',
        children: [
          {
            name: '个人设置',
            path: 'personal',
            component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
          },
          {
            name: '权限设置',
            path: 'permission',
            component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
          },
          {
            name: '管理员权限设置',
            path: 'admin',
            component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
          },
        ],
      },
      {
        name: '说明',
        path: 'about',
        icon: 'warning',
        children: [
          {
            name: '关于本站',
            path: 'about',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
          },
          {
            name: '联系我',
            path: 'contact',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
          },
        ],
      },
    ],
  }
];
