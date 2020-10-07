export default [
  {
    icon: require('../assets/images/home/main-1.png'),
    title: '短途拼车',
    path: { path: '/common/carpool/list', query: { type: 'short' } }
  },
  {
    icon: require('../assets/images/home/main-2.png'),
    title: '城际拼车',
    path: { path: '/common/carpool/list', query: { type: 'cities' } }
  },
  {
    icon: require('../assets/images/home/main-3.png'),
    title: '跨省拼车',
    path: { path: '/common/carpool/list', query: { type: 'province' } }
  },
  {
    icon: require('../assets/images/home/main-4.png'),
    title: '车主找人',
    path: '/common/pending/list'
  },
  {
    icon: require('../assets/images/home/main-5.png'),
    title: '上下班拼车',
    path: '/common/hitchhike/list'
  },
  {
    icon: require('../assets/images/home/main-6.png'),
    title: '顺路带物',
    path: '/'
  },
  {
    icon: require('../assets/images/home/main-7.png'),
    title: '旅游包车',
    path: '/'
  },
  {
    icon: require('../assets/images/home/main-8.png'),
    title: '拼车群',
    path: '/'
  }
]
