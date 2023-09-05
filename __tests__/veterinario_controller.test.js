import request from 'supertest';
import app from '../../src/server'; // Asegúrate de que la ruta sea correcta

describe('Veterinario Controller', () => {
  it('Debería devolver un código de estado 200 al realizar una solicitud GET a /api/veterinarios', async () => {
    const response = await request(app).get('/api/veterinarios');
    expect(response.status).toBe(200);
  });

  it('Debería devolver un veterinario al realizar una solicitud GET a /api/veterinarios/:id', async () => {
    // Simula una ID válida de veterinario
    const id = '5fbd942b312057001f90c5e9';
    const response = await request(app).get(`/api/veterinarios/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.msg).toBeDefined(); // Verifica que la respuesta contenga un mensaje
  });
});
