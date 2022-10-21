const router = require('express').Router({ mergeParams: true })

router.use('/health', require('./health'))
router.use('/sitemap', require('./sitemap'))
router.use('/readnews', require('./readnews'))
router.use('/veiculos', require('./veiculos'))

module.exports = router
