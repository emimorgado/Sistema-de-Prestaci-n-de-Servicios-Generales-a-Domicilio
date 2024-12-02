// app/api/recuperar-contraseña/route.js
import { client } from "@/lib/bd";
import { NextRequest, NextResponse } from "next/server";
import { sendPasswordRecoveryEmail } from "@/lib/mail"; 
import crypto from "crypto";

export async function POST(request) {
  const body = await request.json();
  const { Correo } = body;

  // Valida que el correo esté presente
  if (!Correo) {
    return NextResponse.json(
      { error: "El correo es obligatorio" },
      { status: 400 }
    );
  }

  try {
    // Busca el usuario en la base de datos por correo
    const [user] = await client.execute(
      `SELECT * FROM personas WHERE Correo = ?`,
      [Correo]
    );

    if (!user) {
      return NextResponse.json(
        { error: "No se encontró un usuario con ese correo" },
        { status: 404 }
      );
    }

    // Genera un token de recuperación único
    const token = crypto.randomBytes(32).toString("hex");

    // Guarda el token y la fecha de expiración en la base de datos (expiración en 1 hora)
    const expirationDate = new Date(Date.now() + 3600000); // 1 hora en milisegundos
    await client.execute(
      `UPDATE personas SET password_recovery_token = ?, token_expiration = ? WHERE id_Personas = ?`,
      [token, expirationDate, user.id_Personas]
    );

    // Envia el correo con el enlace de recuperación (contiene el token)
    const recoveryUrl = `http://localhost:3000/recuperar-contraseña?token=${token}`;
    await sendPasswordRecoveryEmail(Correo, recoveryUrl);

    return NextResponse.json(
      { message: "Correo de recuperación enviado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Algo salió mal en el servidor" },
      { status: 500 }
    );
  }
}
