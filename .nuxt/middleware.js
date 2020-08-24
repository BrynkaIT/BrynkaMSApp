const middleware = {}

middleware['authenticated'] = require('../middleware/authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['is-manager'] = require('../middleware/is-manager.js')
middleware['is-manager'] = middleware['is-manager'].default || middleware['is-manager']

middleware['notAuthenticated'] = require('../middleware/notAuthenticated.js')
middleware['notAuthenticated'] = middleware['notAuthenticated'].default || middleware['notAuthenticated']

export default middleware
