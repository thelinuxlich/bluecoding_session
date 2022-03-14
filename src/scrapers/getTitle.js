// @ts-check

import fetch from 'node-fetch'

/**
 * 
 *
 * @param {string} body 
 * @return {string}
 */
const parseTitle = (body) => {
    let match = body.match(/<title>([^<]*)<\/title>/)
    if (!match || typeof match[1] !== 'string')
        return ""
    return match[1]
}

/**
 * @param {string} url 
 * @returns {Promise<string> | string} title
 */
const fetchUrl = (url) => {
    if (!url)
        return ""
    return fetch(url)
        .then(res => res.text())
        .then(body => parseTitle(body))
        .then(title => title)
}

export default fetchUrl

// in-source test suites
if (import.meta.vitest) {
    it('fetches the correct title from the URL', async () => {
        const title = await fetchUrl("http://www.google.com")
        expect(title).toBe("Google")
    })
}