'use client'

import { useState } from "react";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ correo, contraseña }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setMensaje(data.message || data.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-blue-400 to blue-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full p-3 bg-blue-500  text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿Olvidaste tu contraseña? 
            <a href="/recuperar-contraseña" className="text-blue-600 hover:text-blue-800"> Recuperar contraseña</a>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta? 
            <a href="/registro" className="text-blue-600 hover:text-blue-800"> ¡Regístrate Aquí!</a>
          </p>
        </div>
        <p className="mt-4 text-center text-red-600">{mensaje}</p>
      </div>
    </div>
  );
}
