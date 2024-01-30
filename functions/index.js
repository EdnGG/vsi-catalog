const functions = require("firebase-functions");
// const cors = require("cors")({ origin: true });
const corsHandler =  require("./utils/corsHandler");  
const fetch = require("node-fetch");
require("dotenv").config();

exports.chatGPT = functions.runWith({secrets:['NAME_GUEST']}).https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== "POST") {
      return response.status(405).send("Método no permitido");
    }

    try {
      const NAME = process.env.NAME_GUEST;
      console.log("NAME_GUEST:", NAME);
      const userMessage = request.body.message;

      const chatGPTResponse = await fetch( 
        "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Authorization': `Bearer ${functions.config().openai.key}`

          },
          body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 150,
          }),
        }
      );

      const data = await chatGPTResponse.json();
      // Estableciendo headers CORS en la respuesta
      response.set('Access-Control-Allow-Origin', '*');
      response.set('Access-Control-Allow-Methods', 'GET, POST');
      response.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.set('Access-Control-Allow-Credentials', 'true');


      response.json({ reply: data.choices[0].text.trim() });
    } catch (error) {
      console.error("Error en Cloud Function:", error);
      response.status(500).send("Error interno del servidor");
    }
  });
});
