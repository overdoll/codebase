import JSResource from './utilities/JSResource';

const routes = [
  {
    prepare: function() {},
    component: JSResource('Root', () => import('./Root')),
    routes: [
      {
        path: '/join',
        component: JSResource('JoinRoot', () =>
          import('./components/JoinRoot'),
        ),
        prepare: function() {},
      },
    ],
  },
];

export default routes;
