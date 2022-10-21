module.exports = (data) => {
    return [
        {
            name: 'title',
            value: data.title,
            excludeFromIndexes: true
        }, {
            name: 'veiculoId',
            value: data.veiculoId
        }, {
            name: 'url',
            value: data.url,
            excludeFromIndexes: true
        }, {
            name: 'content',
            value: data.content,
            excludeFromIndexes: true
        }, {
            name: 'tags',
            value: data.tags,
            excludeFromIndexes: true
        }, {
            name: 'image',
            value: data.image,
            excludeFromIndexes: true
        }, {
            name: 'publishdate',
            value: data.publishdate
        }, {
            name: 'lastmodified',
            value: data.lastmodified
        }, {
            name: 'syncedSQL',
            value: data.syncedSQL
        }
    ]
}