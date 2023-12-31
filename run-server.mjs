import Fastify from 'fastify';
import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'node:url';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = Fastify({ logger: false });

await app
    .register(fastifyStatic, {
        root: fileURLToPath(new URL('./dist/client', import.meta.url)),
    })
    .register(fastifyMiddie);
app.use(ssrHandler);
// Set custom 404 handler
app.setNotFoundHandler(async (request, reply) => {
    // Send the custom 404 HTML file
    reply.code(404).sendFile('404.html');
    return reply;
});
app.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    console.log("server started on 3000")
})