require('dotenv').config();

const { Text } = require('@google-cloud/text');
const { GoogleAuth } = require('google-auth-library');

// Crear una instancia de autenticación
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

// Configurar las credenciales utilizando la API Key del archivo .env
auth.credentials = {
  type: 'authorized_user',
  client_id: 'tu_client_id',
  client_secret: 'tu_client_secret',
  refresh_token: 'tu_refresh_token',
  api_key: process.env.API_KEY,
};

// Crear un cliente para interactuar con la API de Text
const client = new Text({
  projectId: 'tu_proyecto_id',
  credentials: auth,
});

// Función para hacer una solicitud a la API de Gemini
async function callGemini(prompt) {
  const [response] = await client
    .run({
      model: 'text-bison', // Puedes cambiar el modelo por otros disponibles
      prompt,
    })
    .catch(console.error);

  console.log('Respuesta:', response.content);
}

// Ejemplo de uso
callGemini('Escribe un poema sobre un gato');
