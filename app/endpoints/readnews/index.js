const router = require('express').Router({ mergeParams: true })
const getContentFromURL = require('../../utils/getContentFromURL')
const findHTMLElement = require('../../utils/findHTMLElement')
const DS = require('../../dao/datastore')
const modelURLs = require('../../models/urls')
const modelNews = require('../../models/news')
const config = require('../../config')

router.post('/', async (req, res) => {
    try {
        const ds = new DS()
        const records = await ds.get(config.kindURLs, [{field: 'pushed', value: false}], undefined, undefined, 100)
        records.forEach(async (item, i) => {
            getContentFromURL(item.url)
                .then(res => res.text())
                .then(async (res) => {
                    const key = (item[ds.key()]).name
                    const content = findHTMLElement(res, item.htmlElementContent)
                    const tmp_title = findHTMLElement(res, item.htmlElementTitle, 'textContent')

                    const og_title = findHTMLElement(res, 'meta[property="og:title"]', 'content', false, true)
                    const og_image = findHTMLElement(res, 'meta[property="og:image"]', 'content', false, true)
                    
                    const title = (!item.title || item.title == null || item.title === '') ? ((!og_title || og_title == '') ? tmp_title : og_title) : item.title
                    const arrTags = findHTMLElement(res, item.htmlElementTags, null, true).map(tag => {
                        return findHTMLElement(tag, 'span', 'textContent')
                    })                    
                    arrTags.shift()
                    const tags = arrTags.join(',')


                    const dataNews = modelNews({
                        title,
                        content,
                        tags,
                        image: og_image,
                        url: item.url,
                        veiculoId: item.veiculoId,
                        publishdate: item.publishdate,
                        lastmodified: item.lastmodified,
                        syncedSQL: false
                    })
                    if ( config.logToConsole ) console.log( dataNews )

                    item.pushed = true
                    const dataURLs = modelURLs(item)

                    if ( !config.saveInDB || !key ) return
                    
                    await ds.upsert( config.kindNews, key, dataNews )

                    // update url entity
                    await ds.upsert(config.kindURLs, key, dataURLs)
                })
                .catch(e => {
                    console.log({ status: 'ERROR', msg: e.message })
                })
        })

        res.status(200).json({ status: 'OK' })
    } catch (e) {
        res.status(500).json({ status: 'ERROR', msg: e.message })
    }

})

module.exports = router