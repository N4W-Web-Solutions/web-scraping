module.exports = (data) => {
    return [
        {
            name: 'veiculo',
            value: data.veiculo,
            excludeFromIndexes: true
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
            name: 'type',
            value: data.type
        }, {
            name: 'status',
            value: data.status
        }
    ]
}