import bcrypt from "bcrypt"; // Asegúrate de importar bcrypt
import { client } from "@/lib/bd";
import { sendConfirmationEmail } from "@/lib/nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const {
    Nombres,
    Apellidos,
    Correo,
    Fecha_nacimiento,
    Nacionalidad,
    Cedula,
    Direccion,
    Contraseña,
    Confirmar_contraseña,
    Url,
    Instagram,
    X,
    TikTok,
    Facebook,
  } = body;

  // Validar que los campos requeridos no sean undefined
  if (
    !Nombres ||
    !Apellidos ||
    !Correo ||
    !Fecha_nacimiento ||
    !Nacionalidad ||
    !Cedula ||
    !Direccion ||
    !Contraseña ||
    !Confirmar_contraseña ||
    !Url ||
    !Instagram ||
    !X ||
    !TikTok ||
    !Facebook 
  ) {
    return NextResponse.json(
      { error: "Faltan campos requeridos" },
      { status: 400 }
    );
  }

  // Validar que las contraseñas coincidan (comentado por si necesitas activarlo)
   if (Contraseña !== Confirmar_contraseña) {
    return NextResponse.json(
      { error: "Las contraseñas no coinciden" },
      { status: 400 }
     );
  }

  // Encriptar la contraseña usando bcrypt
  const saltRounds = 10; // Número de rondas de sal
  const hashedPassword = await bcrypt.hash(Contraseña, saltRounds);

  // Reemplazar undefined con null
  const values = [
    Nombres,
    Apellidos,
    Correo,
    Fecha_nacimiento,
    Nacionalidad,
    Cedula,
    Direccion,
    hashedPassword, // Solo almacenar la contraseña encriptada
    Url,
    Instagram,
    X,
    TikTok,
    Facebook,
  ];

  try {
    // Insertar la nueva persona en la base de datos
    const InsertPersona = await client.execute(
      `INSERT INTO personas (Nombres, Apellidos, Correo, Fecha_nacimiento, Nacionalidad, Cedula, Direccion, Contraseña, Url, Instagram, X, TikTok, Facebook ) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`, // Sin ConfirmPassword
      values
    );

    // Validar si la inserción fue exitosa
    if (InsertPersona.affectedRows === 0) {
      return NextResponse.json(
        { error: "No se pudo crear la persona en la base de datos" },
        { status: 500 }
      );
    }

    // Responder con éxito
    return NextResponse.json(
      { message: "Persona creada exitosamente" },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Algo salió mal en el servidor" },
      { status: 500 }
    ); // Cambiar a status 500 para error interno
  }
}
