const defaultFormatMessage = (params: { id: string }) => params.id;

export function getPermsTreeData(fm?: any): any[] {
  let formatMessage;
  if (fm) formatMessage = fm;
  else formatMessage = defaultFormatMessage;
  return [
    {
      title: formatMessage({ id: 'menu.config' }),
      key: 'config',
      children: [
        {
          title: formatMessage({ id: 'menu.config.base' }),
          key: 'config:base:show',
          perms: ['config:base:show', 'config:base:update'],
        },
        {
          title: formatMessage({ id: 'menu.config.signUp' }),
          key: 'config:signUp:show',
          perms: ['config:signUp:show', 'config:signUp:update'],
        },
        {
          title: formatMessage({ id: 'menu.config.email' }),
          key: 'config:email:show',
          perms: ['config:email:show', 'config:email:update'],
        },
        {
          title: formatMessage({ id: 'menu.config.upload' }),
          key: 'config:upload:show',
          perms: ['config:upload:show', 'config:upload:update'],
        },
        {
          title: formatMessage({ id: 'menu.config.watermark' }),
          key: 'config:watermark:show',
          perms: ['config:watermark:show', 'config:watermark:update'],
        },
        {
          title: formatMessage({ id: 'menu.config.restrict' }),
          key: 'config:restrict:show',
          perms: ['config:restrict:show', 'config:restrict:update'],
        },
        {
          title: formatMessage({ id: 'menu.config.sensitiveWords' }),
          key: 'config:sensitive_words:show',
          perms: ['config:sensitive_words:show', 'config:sensitive_words:update'],
        },
      ],
    },
    {
      title: formatMessage({ id: 'menu.user' }),
      key: 'users',
      children: [
        {
          title: formatMessage({ id: 'menu.user.role' }),
          key: 'role',
          children: [
            { title: formatMessage({ id: 'list' }), key: 'role:list', perms: ['role:list'] },
            { title: formatMessage({ id: 'add' }), key: 'role:add', perms: ['role:add'] },
            {
              title: formatMessage({ id: 'edit' }),
              key: 'role:edit',
              perms: ['role:edit', 'role:show'],
            },
            { title: formatMessage({ id: 'create' }), key: 'role:create', perms: ['role:create'] },
            { title: formatMessage({ id: 'update' }), key: 'role:update', perms: ['role:update'] },
            { title: formatMessage({ id: 'delete' }), key: 'role:delete', perms: ['role:delete'] },
          ],
        },
        {
          title: formatMessage({ id: 'menu.user.group' }),
          key: 'group',
          children: [
            { title: formatMessage({ id: 'list' }), key: 'group:list', perms: ['group:list'] },
            { title: formatMessage({ id: 'add' }), key: 'group:add', perms: ['group:add'] },
            {
              title: formatMessage({ id: 'edit' }),
              key: 'group:edit',
              perms: ['group:edit', 'group:show'],
            },
            {
              title: formatMessage({ id: 'create' }),
              key: 'group:create',
              perms: ['group:create'],
            },
            {
              title: formatMessage({ id: 'update' }),
              key: 'group:update',
              perms: ['group:update'],
            },
            {
              title: formatMessage({ id: 'delete' }),
              key: 'group:delete',
              perms: ['group:delete'],
            },
          ],
        },
        {
          title: formatMessage({ id: 'menu.user.user' }),
          key: 'user',
          children: [
            { title: formatMessage({ id: 'list' }), key: 'user:list', perms: ['user:list'] },
            { title: formatMessage({ id: 'add' }), key: 'user:add', perms: ['user:add'] },
            {
              title: formatMessage({ id: 'edit' }),
              key: 'user:edit',
              perms: ['user:edit', 'user:show'],
            },
            { title: formatMessage({ id: 'create' }), key: 'user:create', perms: ['user:create'] },
            { title: formatMessage({ id: 'update' }), key: 'user:update', perms: ['user:update'] },
            { title: formatMessage({ id: 'delete' }), key: 'user:delete', perms: ['user:delete'] },
          ],
        },
      ],
    },
    {
      title: formatMessage({ id: 'menu.content' }),
      key: 'content',
      children: [
        {
          title: formatMessage({ id: 'menu.content.question' }),
          key: 'question',
          children: [
            {
              title: formatMessage({ id: 'list' }),
              key: 'question:list',
              perms: ['question:list'],
            },
            {
              title: formatMessage({ id: 'edit' }),
              key: 'question:edit',
              perms: ['question:edit', 'question:show'],
            },
            {
              title: formatMessage({ id: 'update' }),
              key: 'question:update',
              perms: ['question:update'],
            },
            {
              title: formatMessage({ id: 'delete' }),
              key: 'question:delete',
              perms: ['question:delete'],
            },
          ],
        },
        {
          title: formatMessage({ id: 'menu.content.answer' }),
          key: 'answer',
          children: [
            { title: formatMessage({ id: 'list' }), key: 'answer:list', perms: ['answer:list'] },
            {
              title: formatMessage({ id: 'edit' }),
              key: 'answer:edit',
              perms: ['answer:edit', 'answer:show'],
            },
            {
              title: formatMessage({ id: 'update' }),
              key: 'answer:update',
              perms: ['answer:update'],
            },
            {
              title: formatMessage({ id: 'delete' }),
              key: 'answer:delete',
              perms: ['answer:delete'],
            },
          ],
        },
        {
          title: formatMessage({ id: 'menu.content.comment' }),
          key: 'comment',
          children: [
            { title: formatMessage({ id: 'list' }), key: 'comment:list', perms: ['comment:list'] },
            {
              title: formatMessage({ id: 'edit' }),
              key: 'comment:edit',
              perms: ['comment:edit', 'comment:show'],
            },
            {
              title: formatMessage({ id: 'update' }),
              key: 'comment:update',
              perms: ['comment:update'],
            },
            {
              title: formatMessage({ id: 'delete' }),
              key: 'comment:delete',
              perms: ['comment:delete'],
            },
          ],
        },
      ],
    },
    {
      title: formatMessage({ id: 'menu.system' }),
      key: 'system',
      children: [
        {
          title: formatMessage({ id: 'menu.system.sms' }),
          key: 'sms',
          children: [
            {
              title: formatMessage({ id: 'list' }),
              key: 'sms:list',
              perms: ['sms:list', 'sms:show'],
            },
            { title: formatMessage({ id: 'delete' }), key: 'sms:delete', perms: ['sms:delete'] },
          ],
        },
        {
          title: formatMessage({ id: 'menu.system.access' }),
          key: 'access',
          children: [
            {
              title: formatMessage({ id: 'list' }),
              key: 'access:list',
              perms: ['access:list', 'access:show'],
            },
            {
              title: formatMessage({ id: 'delete' }),
              key: 'access:delete',
              perms: ['access:delete'],
            },
          ],
        },
      ],
    },
  ];
}

export function getPerms(data: any[], keys: string[]): string[] {
  const perms = new Set<string>();
  data.forEach((item) => {
    if (keys.includes(item.key)) {
      if (Array.isArray(item.perms)) item.perms.forEach((perm: string) => perms.add(perm));
      if (item.children) getPerms(item.children, keys).forEach((perm) => perms.add(perm));
    }
  });
  return Array.from(perms);
}

export function getAllPerms(data: any[]): string[] {
  const perms = new Set<string>();
  data.forEach((item) => {
    if (Array.isArray(item.perms)) item.perms.forEach((perm: string) => perms.add(perm));
    if (item.children) getAllPerms(item.children).forEach((perm) => perms.add(perm));
  });
  return Array.from(perms);
}

export function getNodeKeys(children?: any[]): string[] {
  const keys: string[] = [];
  children?.forEach((item) => {
    keys.push(item.key);
    if (item.children) keys.push(...getNodeKeys(item.children));
  });
  return keys;
}
