"use client";

import React, { useState } from "react";
const FormularioRegistro = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
    birthDate: "",
    address: "",
    documentType: "V",
    cedula: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl text-black text-center mb-4">
          Registro ServisExpress
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="firstName"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={formData.firstName}
                onChange={handleChange}
              />
              <label
                htmlFor="floating_first_name"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombre
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="lastName"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={formData.lastName}
                onChange={handleChange}
              />
              <label
                htmlFor="floating_last_name"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Apellido
              </label>
            </div>
          </div>
          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioRegistro;
