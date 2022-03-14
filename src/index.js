// @ts-check

import fetchUrl from './scrapers/getTitle.js'
import validUrl from 'valid-url'
import saveURL from './db/saveURL.js'
import generateID from './utils/generateID.js'
/**
 * @typedef {import('fastify').FastifyRequest} Request
 * @typedef {import('fastify').FastifyReply} Reply
 */

import { fastify } from 'fastify'

const server = fastify()

server.post('/shorten', async (/** @type Request */ request, /** @type Reply */ reply) => {
    /** @type {string} */
    const url = request.body.url
    if (validUrl.isUri(url)) {
        /** @type {string} */
        const title = await fetchUrl(url)
        if (!!title) {
            /** @type {string} */
            const id = generateID()
            await saveURL(id, title)
            reply.code(200).send({
                id,
                title,
                url: `https://bit.ly/${id}`
            })
        } else {
            reply.code(400).send("Bad URL parameter.")
        }
    } else {
        reply.code(400).send("Bad URL parameter.")
    }
})

server.listen(3000, (err, address) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
})