const iconFile = name => require(`@/assets/icons/index/${name}.png`)

export default [
  {
    title: '首页',
    icon: iconFile('home'),
    activeIcon: iconFile('home-active'),
    path: '/home'
  },
  {
    title: '拼车群',
    icon: iconFile('group'),
    activeIcon: iconFile('group-active'),
    path: '/group'
  },
  {
    middle: true,
    path: '/release'
  },
  {
    title: '消息',
    icon: iconFile('notify'),
    activeIcon: iconFile('notify-active'),
    path: '/notify'
  },
  {
    title: '我的',
    icon: iconFile('mine'),
    activeIcon: iconFile('mine-active'),
    path: '/mine'
  }
]
