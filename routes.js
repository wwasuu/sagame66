const UrlPrettifier = require('next-url-prettifier').default

const routes = [
  {
    page: 'home',
    prettyUrl: '/'
  },
  {
    page: 'login',
    prettyUrl: '/login'
  },
  {
    page: 'user/affiliate',
    prettyUrl: '/user/affiliate'
  },
  {
    page: 'admin/login',
    prettyUrl: '/admin/login'
  },
  {
    page: 'admin/index',
    prettyUrl: '/admin'
  }
]

const urlPrettifier = new UrlPrettifier(routes)
exports.default = routes
exports.Router = urlPrettifier