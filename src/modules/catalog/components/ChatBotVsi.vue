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
  import { ref } from 'vue';
  import { QCard, QCardSection, QList, QItem, QChatMessage, QInput } from 'quasar';
  
  const messages = ref([]);
  const userInput = ref('');
  
  const sendMessage = async () => {
    if (!userInput.value.trim()) return;
  
    const userMessage = {
      text: userInput.value,
      sent: true,
      time: new Date().toLocaleTimeString(), 
    };
  
    messages.value.push(userMessage);
  
    // Aquí se envía la solicitud al servidor/ChatGPT
    try {
      //  Endpoint de cloud functions: https://us-central1-vsi-catalog.cloudfunctions.net/chatGPT
      const response = await fetch('https://us-central1-vsi-catalog.cloudfunctions.net/chatGPT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput.value }),
      });
  
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
  
      const data = await response.json();
  
      messages.value.push({
        text: data.reply,
        sent: false,
        time: new Date().toLocaleTimeString(),
      });
    } catch (error) {
      console.error('Error al enviar el mensaje:', error.message);
    }
  
    userInput.value = '';
  };
  
  </script>
  
  <style scoped>
  .chat-window {
    max-height: 400px;
    overflow-y: auto;
  }
  </style>
  