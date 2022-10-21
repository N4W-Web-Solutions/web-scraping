const { XMLParser } = require('fast-xml-parser')

module.exports = (XMLdata) => {
    const options = {
        ignoreAttributes : false
    };
    const parser = new XMLParser(options)
    return parser.parse(XMLdata)
}