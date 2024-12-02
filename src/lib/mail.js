// lib/mail.js
import nodemailer from "nodemailer";

export const sendPasswordRecoveryEmail = async (correo, recoveryUrl) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2024serviexpress@gmail.com", 
      pass: "oscs fcux uagq xtev",  
    },
  });

  const mailOptions = {
    from: "2024serviexpress@gmail.com", 
    to: correo,
    subject: "Recuperación de contraseña",
    text: `Haz clic en el siguiente enlace para recuperar tu contraseña: ${recoveryUrl}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de recuperación enviado");
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
  }
};
