import { client } from "@/lib/bd";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const body = await request.json();
  const { token, nuevaContraseña } = body;

  // Valida que el token y la nueva contraseña estén presentes
  if (!token || !nuevaContraseña) {
    return NextResponse.json(
      { error: "El token y la nueva contraseña son obligatorios" },
      { status: 400 }
    );
  }

  try {
    // Busca el usuario con el token de recuperación
    const [user] = await client.execute(
      `SELECT * FROM personas WHERE password_recovery_token = ?`,
      [token]
    );

    if (!user) {
      return NextResponse.json(
        { error: "Token inválido o expirado" },
        { status: 400 }
      );
    }

    // Verifica si el token ha expirado
    const currentTime = new Date();
    if (new Date(user.token_expiration) < currentTime) {
      return NextResponse.json(
        { error: "El token ha expirado" },
        { status: 400 }
      );
    }

    // Encripta la nueva contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(nuevaContraseña, saltRounds);

    // Actualiza la contraseña en la base de datos
    await client.execute(
      `UPDATE personas SET Contraseña = ?, password_recovery_token = NULL, token_expiration = NULL WHERE id_Personas = ?`,
      [hashedPassword, user.id_Personas]
    );

    return NextResponse.json(
      { message: "Contraseña actualizada exitosamente" },
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
