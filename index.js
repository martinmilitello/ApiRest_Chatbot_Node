const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const port = 3001;

// Configura tu clave de API de OpenAI
const configuration = new Configuration({
  apiKey: 'AIzaSyCKJ7piJpwg3ynFtnWaViswBZCryjPJ9NY',
});
const openai = new OpenAIApi(configuration);

app.use(express.json());

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 1024,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    res.json({ message: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Algo salió mal' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});