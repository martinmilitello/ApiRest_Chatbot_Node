require('dotenv').config(); // Para usar las variables de entorno
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const port = 3000;

app.use(express.json()); // Permitir solicitudes en formato JSON

// Crear una instancia del cliente GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(process.env.API);

// Endpoint para interactuar con el chatbot
app.post('/chatbot', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'El mensaje es requerido.' });
  }

  try {
    // Obtén el modelo generativo "gemini-1.5-flash"
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generar contenido usando el mensaje del usuario como prompt
    const result = await model.generateContentStream(message);

    let botReply = '';

    // Recibir las respuestas por partes y concatenarlas
    for await (const chunk of result.stream) {
      botReply += chunk.text();
    }

    // Enviar la respuesta completa del chatbot
    res.json({ reply: botReply });
  } catch (error) {
    console.error('Error al generar la respuesta:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
