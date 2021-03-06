export default {
  'config.base.themeNormal': 'PC端模板',
  'config.base.themeMobile': '手机端模板',
  'config.base.siteName': '网站名称',
  'config.base.siteKeywords': '网站关键词',
  'config.base.siteDescription': '网站描述',

  'config.signUp.pictureUrl': '默认头像',
  'config.signUp.pictureUrl.tooltip': '用户未上传头像时，显示的默认头像URL地址。固定值，不可修改。',
  'config.signUp.pictureSizeSmall': '小头像尺寸',
  'config.signUp.pictureSizeMedium': '中头像尺寸',
  'config.signUp.pictureSizeLarge': '大头像尺寸',
  'config.signUp.usernameMinLength': '用户名最小长度',
  'config.signUp.usernameMaxLength': '用户名最大长度',
  'config.signUp.usernameRegex': '用户名正则表达式',
  'config.signUp.verifyMode': '验证模式',
  'config.signUp.verifyMode.0': '不验证',
  'config.signUp.verifyMode.1': '图形验证码',
  'config.signUp.verifyMode.2': '邮件或短信验证码',
  'config.signUp.verifyMode.3': '邮件验证码',
  'config.signUp.verifyMode.4': '短信验证码',
  'config.signUp.verifyMode.5': '邀请码',
  'config.signUp.verifyEmailSubject': '验证码邮件主题',
  'config.signUp.verifyEmailText': '验证码邮件正文',
  'config.signUp.verifyEmailText.tooltip': "验证码内容使用 $'{code} 代替",

  'config.email.host': 'SMTP服务器',
  'config.email.host.tooltip':
    '根据邮件服务提供商的帮助文档填写，并确认SMTP服务已开启。通常格式为 smtp.xxx.com',
  'config.email.port': 'SMTP端口',
  'config.email.port.tooltip': '留空为默认端口。一般留空即可，或根据邮件服务提供商的帮助文档填写。',
  'config.email.auth': 'SMTP身份认证',
  'config.email.auth.tooltip': '必须选是',
  'config.email.ssl': 'SSL加密',
  'config.email.ssl.tooltip':
    '是否使用SSL协议。部分邮件服务提供商会强制要求使用SSL协议，比如QQ邮箱。',
  'config.email.timeout': 'SMTP超时时间',
  'config.email.timeout.tooltip': '留空为默认超时时间。单位：毫秒。一般留空即可。',
  'config.email.from': 'Email地址',
  'config.email.username': '登录用户名',
  'config.email.username.tooltip': '通常与Email地址一致，或者为Email地址@前面的部分',
  'config.email.password': '登录密码',
  'config.email.password.tooltip': '部分邮件服务器要求使用独立密码或授权码，请到邮箱管理平台设置。',
  'config.email.testTo': '收件人',
  'config.email.testSubject': '主题',
  'config.email.testText': '正文',
  'config.email.testEmail': '测试邮件',
  'config.email.sendTestEmail': '发送测试邮件',

  'config.upload.fileTypes': '允许上传的文件类型',
  'config.upload.fileTypes.tooltip':
    '多个类型用英文逗号分隔，留空则不限制。常用格式如：zip,7z,gz,bz2,iso,rar,txt,pdf,doc,docx,xls,xlsx,ppt,pptx',
  'config.upload.imageTypes': '允许上传的图片类型',
  'config.upload.imageTypes.tooltip':
    '多个类型用英文逗号分隔，留空则不限制。常用格式如：jpg,jpeg,png,gif',
  'config.upload.videoTypes': '允许上传的视频类型',
  'config.upload.videoTypes.tooltip': '多个类型用英文逗号分隔，留空则不限制。常用格式如：mp4,m3u8',
  'config.upload.fileLimit': '文件最大长度',
  'config.upload.imageLimit': '图片最大长度',
  'config.upload.videoLimit': '视频最大长度',
  'config.upload.limit.tooltip': '为 0 则不限制。单位 KB',
  'config.upload.imageMaxWidth': '编辑器图片最大宽度',
  'config.upload.imageMaxWidth.tooltip':
    '在编辑器上传的图片，如超过此宽度，会自动压缩。为 0 则不限制。',
  'config.upload.imageMaxHeight': '编辑器图片最大高度',
  'config.upload.imageMaxHeight.tooltip':
    '在编辑器上传的图片，如超过此高度，会自动压缩。为 0 则不限制。',

  'config.watermark.enabled': '开启水印',
  'config.watermark.overlay': '水印图片地址',
  'config.watermark.position': '水印位置',
  'config.watermark.position.1': '左上',
  'config.watermark.position.2': '上边',
  'config.watermark.position.3': '右上',
  'config.watermark.position.4': '左边',
  'config.watermark.position.5': '中央',
  'config.watermark.position.6': '右边',
  'config.watermark.position.7': '左下',
  'config.watermark.position.8': '下边',
  'config.watermark.position.9': '右下',
  'config.watermark.dissolve': '水印透明度',
  'config.watermark.dissolve.tooltip': '范围：0-100。0 不透明，100 完全透明，50 半透明。',
  'config.watermark.minWidth': '图片最小宽度',
  'config.watermark.minWidth.tooltip': '图片小于该宽度则不添加水印',
  'config.watermark.minHeight': '图片最小高度',
  'config.watermark.minHeight.tooltip': '图片小于该高度则不添加水印',

  'config.restrict.passwordRetryMax': '密码错误允许次数',
  'config.restrict.passwordRetryMax.tooltip': '密码错误超过次数，会要求输入验证码',
  'config.restrict.passwordRetryWithin': '密码尝试限制间隔时间',
  'config.restrict.passwordRetryWithin.tooltip': '间隔时间过后，密码错误次数清零，重新计数',
  'config.restrict.smsMax': '短信发送最大条数(每IP)',
  'config.restrict.smsMax.tooltip': '每IP发送的短信超过条数后，将禁止发送短信',
  'config.restrict.smsWithin': '短信发送间隔时间(每IP)',
  'config.restrict.smsWithin.tooltip': '间隔时间过后，短信发送条数清零，重新计数',
  'config.restrict.postInterval': '信息提交最小间隔时间',
  'config.restrict.mobileBlacklist': '手机号段黑名单',
  'config.restrict.mobileBlacklist.tooltip':
    '禁止发送短信验证码的号段，多个号段用英文逗号分开，如162,165,167,170,171,174',
  'config.restrict.forbiddenTime': '非受信用户禁止发帖时段',
  'config.restrict.forbiddenTime.tooltip':
    '为防止黑产在半夜进行注册灌水，可设置夜间不允许发帖，多个时段用逗号分隔。如：20,21,22,23,0,1,2,3,4,5,6,7,8',
  'config.restrict.ipBlacklist': 'IP黑名单',
  'config.restrict.ipBlacklist.tooltip':
    '禁止所有访问，多个IP用英文逗号分开，如192.168.0.1,192.168.0.2',

  'config.sensitiveWords.words': '敏感词',
  'config.sensitiveWords.words.tooltip':
    "一行一个。支持全半角、大小写、停用词、重复词。如设置敏感词'fuck'，对'FuCk','ｆｕｃｋ','fffuuuucccckkk','f.u.c.k'均有效（最后一种需要设置.为停止词）",
  'config.sensitiveStopWords.words': '停用词',
  'config.sensitiveStopWords.words.tooltip':
    '防止无意义字符隔开敏感词，从而绕过敏感词过滤。过滤敏感词时，如碰到停用词则忽略，消除过滤干扰。如：我|是.敏|感.词，可将|和.设置为停用词。多个敏感词可放在同一行，如：|.,、，',
};
