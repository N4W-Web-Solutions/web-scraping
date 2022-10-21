const router = require('express').Router({ mergeParams: true })
const DS = require('../../dao/datastore')
const modelVeiculos = require('../../models/veiculos')
const config = require('../../config')

router.post('/', async (req, res) => {
    try {
        const { veiculo, url, htmlElementContent, htmlElementTitle, htmlElementTags, type, status } = req.body

        if (!veiculo || !url || !htmlElementContent || !htmlElementTitle || !htmlElementTags || !type || !status) {
            return res.status(500).json({ status: 'ERROR', msg: 'Parameters are missing: veiculo | url | htmlElementContent | htmlElementTitle | htmlElementTags | type | status' })
        }

        const dataDB = modelVeiculos({
                veiculo,
                url,
                htmlElementContent,
                htmlElementTitle,
                htmlElementTags,
                type,
                status
            }
        )

        if (config.logToConsole) console.log(dataDB)
        if ( !config.saveInDB ) return

        const ds = new DS()
        await ds.insert(config.kindVeiculos, undefined, dataDB)

        res.status(200).json({ status: 'OK' })
    } catch (e) {
        res.status(500).json({ status: 'ERROR', msg: e.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const ds = new DS()
        const records = await ds.get(config.kindVeiculos, [], undefined, undefined, 100)

        res.status(200).json({ veiculos: records })
    } catch (e) {
        res.status(500).json({ status: 'ERROR', msg: e.message})
    }
})

module.exports = router