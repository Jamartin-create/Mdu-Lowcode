export default [
    {
        path: '/',
        name: 'home',
        component: () => import('../pages/Home/index.vue'),
        meta: {},
    },
    {
        path: '/editor',
        name: 'editor',
        component: () => import('../pages/Editor/index.vue'),
        meta: {}
    }, {
        path: '/login',
        name: 'login',
        component: () => import('../pages/Login/index.vue'),
        meta: {}
    }, {
        path: '/register',
        name: 'register',
        component: () => import('../pages/Login/register.vue'),
        meta: {}
    }, {
        path: '/dataSource',
        name: 'dataSource',
        component: () => import('../pages/DataSource/index.vue'),
        meta: {},
    }
]