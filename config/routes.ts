export default [
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/config',
    icon: 'setting',
    name: 'config',
    access: 'config',
    routes: [
      {
        path: '/config/base',
        name: 'base',
        component: './config/Base',
        access: 'config:base:show',
      },
      {
        path: '/config/sign-up',
        name: 'signUp',
        component: './config/SignUp',
        access: 'config:signUp:show',
      },
      {
        path: '/config/email',
        name: 'email',
        component: './config/Email',
        access: 'config:email:show',
      },
      {
        path: '/config/upload',
        name: 'upload',
        component: './config/Upload',
        access: 'config:upload:show',
      },
      {
        path: '/config/watermark',
        name: 'watermark',
        component: './config/Watermark',
        access: 'config:watermark:show',
      },
      {
        path: '/config/restrict',
        name: 'restrict',
        component: './config/Restrict',
        access: 'config:restrict:show',
      },
      {
        path: '/config/sensitive-words',
        name: 'sensitiveWords',
        component: './config/SensitiveWords',
        access: 'config:sensitive_words:show',
      },
    ],
  },
  {
    path: '/user',
    icon: 'user',
    name: 'user',
    access: 'user',
    routes: [
      { path: '/user/roles', name: 'role', component: './user/RoleList', access: 'role:list' },
      { path: '/user/groups', name: 'group', component: './user/GroupList', access: 'group:list' },
      { path: '/user/users', name: 'user', component: './user/UserList', access: 'user:list' },
    ],
  },
  {
    path: '/content',
    icon: 'database',
    name: 'content',
    access: 'system',
    routes: [
      {
        path: '/content/questions',
        name: 'question',
        component: './content/QuestionList',
        access: 'question:list',
      },
      {
        path: '/content/answers',
        name: 'answer',
        component: './content/AnswerList',
        access: 'answer:list',
      },
      {
        path: '/content/comments',
        name: 'comment',
        component: './content/CommentList',
        access: 'comment:list',
      },
    ],
  },
  {
    path: '/system',
    icon: 'control',
    name: 'system',
    access: 'system',
    routes: [
      { path: '/system/sms', name: 'sms', component: './system/SmsList', access: 'sms:list' },
      {
        path: '/system/access',
        name: 'access',
        component: './system/AccessList',
        access: 'access:list',
      },
    ],
  },
  {
    path: '/login',
    layout: false,
    component: './login',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
