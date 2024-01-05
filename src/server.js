require('dotenv').config();
const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // await server.register({
  //   plugin: '',
  //   options: {
  //     service: ,
  //     validator: [],
  //   },
  // });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

  });

  await server.start();
  console.log(`Server berdalan pada ${server.info.uri}`);
};

init();
