import mongoose from "mongoose";
import Paciente from "../../src/models/Paciente";
import { mockRequest, mockResponse } from "express";
jest.setTimeout(30000);

describe("Controlador de Pacientes", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb+srv://em84830:1332@nuevo.kp5t4tn.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Debe obtener el detalle de un paciente", async () => {
    // aqui
    const pacienteFicticio = new Paciente({
      nombre: "PacienteFicticio",
      edad: 3,
      especie: "Gato",
    });
    await pacienteFicticio.save();

    const req = mockRequest({
      params: { id: pacienteFicticio._id },
    });
    const res = mockResponse();

    // Llama a la funcion
    await obtenerDetallePaciente(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      _id: pacienteFicticio._id,
      nombre: pacienteFicticio.nombre,
      edad: pacienteFicticio.edad,
      especie: pacienteFicticio.especie,
    });
  });

});