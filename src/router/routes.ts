export default [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../pages/Home/index.vue'),
        meta: {},
        children: [
            {
                path: 'api',
                name: 'api',
                component: () => import('../pages/Home/ManaAPI.vue')
            },
            {
                path: 'user',
                name: 'user',
                component: () => import('../pages/Home/ManaUser.vue')
            },
            {
                path: 'sequare',
                name: 'sequare',
                component: () => import('../pages/Home/ManaSequare.vue')
            },
        ],
        redirect: '/home/user'
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
    },
]