const router = require('express').Router({ mergeParams: true })

router.get('/', (_, res) => {
    res.status(200).json({ status: 'UP' })
})

module.exports = router