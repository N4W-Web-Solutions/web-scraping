const { Datastore } = require('@google-cloud/datastore')
const { projectId } = require('../config')

class DS {
    constructor () {
        this.ds = new Datastore({ projectId })
    }

    key () {
        return this.ds.KEY
    }

    newKey (kind) {
        return this.ds.key(kind)        
    }

    async get (kind = '', filters = [], orderby = '', sort = '', limit = 10) {
        const query = this.ds.createQuery(kind)
        for ( let i = 0; i < filters.length; i++ ) {
            query.filter( filters[i].field, filters[i].value )
        }
        if (orderby != '' && sort != '') query.order(orderby, {descending: (sort == 'desc') ? true : false})
        
        query.limit(limit)
        const [results] = await this.ds.runQuery(query)

        return results
    }

    async insert (kind, key = null, values = []) {
        const recordKey = key || this.ds.key(kind)
        const entity = {
            key: recordKey,
            data: values.map(item => {
                const returnObj = {
                    name: item.name,
                    value: item.value,
                    excludeFromIndexes: item.excludeFromIndexes ? true : false
                }
                return returnObj
            })
        }
        return await this.ds.save(entity)
    }

    async upsert (kind, key, values = []) {
        const entity = {
            key: this.ds.key([kind, key]),
            data: values.map(item => {
                const returnObj = {
                    name: item.name,
                    value: item.value,
                    excludeFromIndexes: item.excludeFromIndexes ? true : false
                }
                return returnObj
            })
        }
        return await this.ds.upsert(entity)
    }

    async delete (kind, key) {
        const recordKey = datastore.key([kind, key]);
        return await datastore.delete(recordKey);
    }
}
module.exports = DS