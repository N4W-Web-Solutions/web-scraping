module.exports = (data) => {
    return [
        {
            name: 'title',
            value: data.title,
            excludeFromIndexes: true
        }, {
            name: 'veiculoId',
            value: parseInt(data.veiculoId, 10)
        }, {
            name: 'url',
            value: data.url,
            excludeFromIndexes: true
        }, {
            name: 'htmlElementContent',
            value: data.htmlElementContent,
            excludeFromIndexes: true
        }, {
            name: 'htmlElementTitle',
            value: data.htmlElementTitle,
            excludeFromIndexes: true
        }, {
            name: 'htmlElementTags',
            value: data.htmlElementTags,
            excludeFromIndexes: true
        }, {
            name: 'publishdate',
            value: data.publishdate
        }, {
            name: 'lastmodified',
            value: data.lastmodified
        }, {
            name: 'pushed',
            value: data.pushed
        }
    ]
}