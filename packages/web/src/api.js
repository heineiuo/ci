import Fetch from '@shared/fetch'

const apimap = {
  sites: {
    getMySites: '/cms/sites/getMySites'
  },
  posts: {
    create: '/cms/posts/create',
    edit: '/cms/posts/edit',
    editStatus: '/cms/posts/editStatus',
    editTags: '/cms/posts/editTags',
    list: '/cms/posts/list',
    get: '/cms/posts/get'
  },
  tags: {
    getDriveTags: "/cms/tags/getDriveTags"
  },
}

const buildApi = (map) => {
  return Object.keys(map).reduce((all, key) => {
    const val = map[key]
    if (typeof val === 'string') {
      all[key] = (query = {}) => {
        query.token = localStorage.__SMILE_TOKEN
        return new Fetch(`${global.__API_PREFIX}${val}`, query).post()
      }
    } else {
      all[key] = buildApi(val)
    }
    return all
  }, {})
}

const api = buildApi(apimap)

module.exports = module.exports.default = api
