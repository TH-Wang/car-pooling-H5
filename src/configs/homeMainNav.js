export default [
  {
    icon: require('../assets/images/home/main-1.png'),
    title: '短途拼车',
    path: { path: '/common/carpool/list', query: { type: 1 } }
  },
  {
    icon: require('../assets/images/home/main-2.png'),
    title: '城际拼车',
    path: { path: '/common/carpool/list', query: { type: 2 } }
  },
  {
    icon: require('../assets/images/home/main-3.png'),
    title: '跨省拼车',
    path: { path: '/common/carpool/list', query: { type: 3 } }
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
    path: '/common/carry/list'
  },
  {
    icon: require('../assets/images/home/main-7.png'),
    title: '旅游包车',
    path: '/common/tourcar'
  },
  {
    icon: require('../assets/images/home/main-8.png'),
    title: '拼车群',
    path: '/common/group/nearby'
  }
]
