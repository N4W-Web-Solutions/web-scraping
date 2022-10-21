const router = require('express').Router({ mergeParams: true })
const xmlParser = require('../../utils/xmlParser')
const getContentFromURL = require('../../utils/getContentFromURL')
const DS = require('../../dao/datastore')
const modelURLs = require('../../models/urls')
const config = require('../../config')

router.post('/', async (_, res) => {
    try {
        const ds = new DS()
        const records = await ds.get(config.kindVeiculos, [{field: 'type', value: 'sitemap'}], undefined, undefined, 200)

        records.forEach( async(veiculo) => {
            getContentFromURL(veiculo.url)
                .then(response => response.text())
                .then(async (response) => {
                    const veiculoId = (veiculo[ds.key()]).id
                    const htmlElementContent = veiculo.htmlElementContent
                    const htmlElementTitle = veiculo.htmlElementTitle
                    const htmlElementTags = veiculo.htmlElementTags

                    const xmlObj = xmlParser(response)
                    if ( !xmlObj || !xmlObj["urlset"] || !xmlObj["urlset"]["url"] ) {
                        return res.status(500).json({ status: 'ERROR', msg: 'URLs are missing to import' })
                    }

                    await xmlObj["urlset"]["url"].forEach( async (item, i) => {
                        if ( i > config.urlsToSaveByVeiculo ) return
                        let url, title = '', lastmodified = '', publishdate = ''
                        url = item["loc"] || ''
                        lastmodified = item["lastmod"] || ''

                        if ( url && url != '' ){
                            if ( item["news:news"]["news:publication_date"] )
                                publishdate = new Date(item["news:news"]["news:publication_date"])

                            if ( item["news:news"]["news:title"] )
                                title = item["news:news"]["news:title"]

                            // save data
                            const dataDB = modelURLs({
                                title,
                                veiculoId,
                                htmlElementContent,
                                htmlElementTitle,
                                htmlElementTags,
                                url,
                                publishdate,
                                lastmodified,
                                pushed: false
                            })
                            if (config.logToConsole) console.log(dataDB)

                            if ( !config.saveInDB ) return
                            await ds.upsert(config.kindURLs, `${veiculoId}-${url}`, dataDB)
                        }
                    })

                    res.status(200).json({ status: 'OK' })
                })
        })
    } catch (e) {
        res.status(500).json({ status: 'ERROR', msg: e.message })
    }
})

module.exports = router