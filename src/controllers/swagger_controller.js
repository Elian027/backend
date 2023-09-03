import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import Paciente from '../models/Paciente.js';
import Veterinario from '../models/Veterinario.js';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Swagger Veterinary',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://backend-veterinary.onrender.com',
      },
    ],
  },
  apis: ['src/routers/*.js'],
  components:{
    schemas:{
      Paciente,
      Veterinario
    }
  }
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocsIN = (app)=>{
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

const swaggerDocs = (req, res) => {
  res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
};

export { swaggerDocs, 
         swaggerDocsIN 
};