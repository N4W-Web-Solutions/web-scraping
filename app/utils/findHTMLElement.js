const { parse } = require('node-html-parser')

module.exports = (htmlContent, querySelector, property = 'innerHTML', global = false, attribute = false) => {
    const root = parse(htmlContent)
    if ( global === true ) {
        return root.querySelectorAll(querySelector) || []
    } else {
        if (!attribute) {
            return root.querySelector(querySelector)[property] || ''
        } else {
            return root.querySelector(querySelector).getAttribute(property) || ''
        }
    }
}