<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Hi I'm a VSI Chatbot How can I help you?</div>
      </q-card-section>

      <q-card-section class="chat-window">
        <q-list>
          <q-item v-for="(message, index) in messages" :key="index">
            <q-chat-message
              :text="[message.text]"
              :sent="message.sent"

              :name="message.sent ? 'Me' : 'VSI-Chatbot'"
              :stamp="message.time"
            ></q-chat-message>
          </q-item>
          <q-spinner-dots v-if="loading" size="2rem" />
        </q-list>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="userInput"
          filled
          type="textarea"
          hint="Type your question here"
          @keyup.enter="sendMessage"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const messages = ref([]);
const userInput = ref("");
const loading = ref(false)

onMounted(() => {});

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  loading.value = true

   // Agregar mensaje del usuario a messages
  const userMessage = {
    text: userInput.value,
    sent: true,
    time: new Date().toLocaleTimeString(),
  };
  messages.value.push(userMessage);
  try {

    // Cambia la URL por la ruta de tu backend donde se procesarán las solicitudes
    
    //const response = await axios.post(`${process.env.SERVER_VSI}/assistant/vsi-bot`, {
      //message: userInput.value
     //});

     const response = await axios.post('http://localhost:3000/assistant/vsi-bot', {
       message: userInput.value
     });

    const botMessage = {
      text: response.data.response,
      sent: false,
      time: new Date().toLocaleTimeString(),
    };

    messages.value.push(botMessage);
  } catch (error) {
    console.log(error);
  }
  loading.value = false
  userInput.value = "";
};
</script>

<style scoped>
.chat-window {
  max-height: 400px;
  overflow-y: auto;
}
</style>
