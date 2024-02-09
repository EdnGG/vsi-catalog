<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Chat con ChatGPT</div>
      </q-card-section>

      <q-card-section class="chat-window">
        <q-list>
          <q-item v-for="(message, index) in messages" :key="index">
            <q-chat-message
              :text="[message.text]"
              :sent="message.sent"
              :name="message.sent ? 'Tú' : 'ChatGPT'"
              :stamp="message.time"
            ></q-chat-message>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="userInput"
          filled
          type="textarea"
          hint="Escribe tu mensaje aquí"
          @keyup.enter="sendMessage"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import openAI from "openai";
import { OpenAI } from "openai";

const messages = ref([]);
const userInput = ref("");

onMounted(() => {});

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

   // Agregar mensaje del usuario a messages
  const userMessage = {
    text: userInput.value,
    sent: true,
    time: new Date().toLocaleTimeString(),
  };
  messages.value.push(userMessage);

  const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  };

  const openai = new OpenAI(configuration);

  try {
    const prompt = userInput.value;
    const chatGPTResponse = await openai.chat.completions.create({
        // model: "tu_model_id_personalizado", // Cambia esto por tu ID de modelo personalizado
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log(chatGPTResponse.choices[0].message.content); // Verificar la estructura de la respuesta


    const botMessage = {
      text: chatGPTResponse.choices[0].message.content,
      sent: false,
      time: new Date().toLocaleTimeString(),
    };
    messages.value.push(botMessage);


  } catch (error) {
    console.log(error);
  }

  userInput.value = "";
};
</script>

<style scoped>
.chat-window {
  max-height: 400px;
  overflow-y: auto;
}
</style>
