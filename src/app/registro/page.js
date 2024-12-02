"use client";

import React, { useState } from "react";

const Form = () => {
  const [step, setStep] = useState(1);
  const [showUrlInput, setShowUrlInput] = useState(false); // Estado para controlar la visibilidad del input de URL

  
  const handleCheckboxChange = (e) => {
    setShowUrlInput(e.target.checked); // Cambia el estado según si está marcado o no
  };


  // Estados para cada paso del formulario
  const [step1Data, setStep1Data] = useState({
    Nombres: "",
    Apellidos: "",
    Correo: "",
    Fecha_nacimiento: "",
    Nacionalidad: "",
    Cedula: "",
    Direccion: "",
    Contraseña: "",
    Confirmar_contraseña: "",
  });

  const [step2Data, setStep2Data] = useState({
    Url: "",
    Instagram: "",
    X: "",
    TikTok: "",
    Facebook: "",
    Comentarios: "",
  });


  // Función genérica para manejar cambios
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (step === 1) {
      setStep1Data((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (step === 2) {
      setStep2Data((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };



  const handleNext = () => {
       setStep(step + 1);
    };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    // Aquí puedes añadir validaciones para el paso 2 si lo necesitas
    try {
      // Combina los datos de ambos pasos
      const formData = { ...step1Data, ...step2Data };

      const res = await fetch("api/registro", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
       alert("Registro exitoso");
        setStep(2); // Muestra un mensaje de éxito
      } else {
        alert("Error al enviar datos");
      }
    } catch (error) {
      alert("Error al enviar datos: " + error.message);
    }
  };

  return (
    <div className="relative ">
    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-blue-300 via-blue-400 to blue-500"></div>
    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-r from-blue-300 via-blue-400 to blue-500"></div>
    <div className="relative flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-center mb-6">
          ¡Regístrate en ServiExpress!
        </h1>
          <form className="space-y-6">
            {step === 1 && (
              <>
                {/* Campos del paso 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="Nombres"
                  id="Nombres"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={step1Data.Nombres}
                  onChange={handleChange}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Nombre
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="Apellidos"
                  id="Apellidos"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={step1Data.Apellidos}
                  onChange={handleChange}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Apellido
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative z-0 w-full group">
                <input
                  type="email"
                  name="Correo"
                  id="Correo"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={step1Data.Correo}
                  onChange={handleChange}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Correo Electronico
                </label>
              </div>

              {/* Campo de Fecha de Nacimiento */}
              <div className="relative z-0 w-full group">
                <input
                  type="date"
                  name="Fecha_nacimiento"
                  id="Fecha_nacimiento"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                  value={step1Data.Fecha_nacimiento}
                  onChange={handleChange}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Fecha de Nacimiento
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
            <div className="relative z-0 w-full group">
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Nacionalidad
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    id="Nacionalidad"
                    name="Nacionalidad"
                    className=" py-2.5  w-full text-sm text-zinc-600 border-b-2  bg-transparent border-gray-300    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={step1Data.Nacionalidad}
                    onChange={handleChange}
                  >
                    <option value="" >Seleccionar</option>
                    <option value="v">Venezolano</option>
                    <option value="e">Extranjero</option>
                  </select>
                  </div>
                  </div>
                  <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    id="Cedula"
                    name="Cedula"
                    placeholder=""
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                    value={step1Data.Cedula}
                    onChange={handleChange}
                  />
                   <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Cedula
                </label>
                
                </div>
            </div>

            {/* Nueva sección para la dirección */}
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="Direccion"
                id="Direccion"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={step1Data.Direccion}
                onChange={handleChange}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Dirección
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative z-0 w-full group">
                <input
                  type="password"
                  name="Contraseña"
                  id="Contraseña"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={step1Data.Contraseña}
                  onChange={handleChange}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Contraseña
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="password"
                  name="Confirmar_contraseña"
                  id="Confirmar_contraseña"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={step1Data.Confirmar_contraseña}
                  onChange={handleChange}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Confirmar contraseña
                </label>
              </div>
            </div>
                <button type="button" className="w-full p-3 bg-blue-500  text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200" onClick={handleNext}>
                  Siguiente
                </button>
                </>
            
            )}

            {step === 2 && (
              <>
                {/* Campos del paso 2 */}
                <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="showUrlInput"
              name="showUrlInput"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              checked={showUrlInput}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="showUrlInput"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              ¿Deseas agregar la URL de tu sitio web?
            </label>
          </div>

          {/* Input de URL (visible solo si el checkbox está seleccionado) */}
          {showUrlInput && (
            <div className="relative">
              <input
                type="text"
                name="Url"
                id="Url"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={step2Data.Url}
                onChange={handleChange}
              />
              <label
                htmlFor="Url"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                URL
              </label>
            </div>
          )}

            <div className="grid grid-cols-2 gap-4">
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="Instagram"
                  id="Instagram"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={step2Data.Instagram}
                  onChange={handleChange}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Instagram
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="X"
                  id="X"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={step2Data.X}
                  onChange={handleChange}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Twitter
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="TikTok"
                  id="TikTok"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={step2Data.TikTok}
                  onChange={handleChange}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  TikTok
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="Facebook"
                  id="Facebook"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={step2Data.Facebook}
                  onChange={handleChange}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Facebook
                </label>
              </div>
            </div>
                <button  type="button" className="p-3 bg-blue-500  text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200" onClick={handleBack}>
                  Atrás
                </button>
                
                <button type="button" className="p-3 bg-blue-500  text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200" onClick={handleSubmit}>
                  Enviar
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
