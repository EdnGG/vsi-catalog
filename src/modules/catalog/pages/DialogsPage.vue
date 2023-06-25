<template>
  <q-page class="q-pa-md">

    <span class="text-h3">Dialogs</span>
    <q-separator spaced />

    <template v-if="name">
      <span  class="text-h6">{{name }} </span>
      <q-separator spaced />
    </template>

    <div class="q-pa-md q-gutter-sm">
      <q-btn unelevated label="Alert" color="primary" @click="alert"></q-btn>
      <q-btn unelevated label="Confirm" color="primary" @click="confirm"></q-btn>
      <q-btn unelevated label="Prompt" color="primary" @click="prompt"></q-btn>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
export default {
  name: 'DialogsPage',
    setup() {
        const $q = useQuasar();

        const name = ref()

        function alert() {
            $q.dialog({
                title: 'Alert',
                message: 'This is an alert dialog',
                ok: 'OK',

            }).onOk(() => {
                console.log('OK');
            })
            .onCancel(() => {
                console.log('Cancel');
            })
            .onDismiss(() => {
                console.log('Dismiss');
            });
        }
        function confirm() {
            $q.dialog({
                title: 'Confirm',
                message: 'This is a confirm dialog',
                cancel: 'Cancel',
                ok: 'OK',
            }).onOk(() => {
                console.log('OK');
            })
            .onCancel(() => {
                console.log('Cancel');
            })
            .onDismiss(() => {
                console.log('Dismiss');
            });
        }
        function prompt() {
            $q.dialog({
                title: 'Prompt',
                message: 'Whats your name',
                cancel: 'Cancel',
                ok: 'OK',
                position: 'bottom',
                prompt: {
                    model: '',
                    type: 'textarea',
                },
            }).onOk((data) => {
                console.log('OK');
                name.value = data
            })
            .onCancel(() => {
                console.log('Cancel');
            })
            .onDismiss(() => {
                console.log('Dismiss');
            });
        }
        
        
        
        
        return {
          alert,
          confirm,
          prompt,
          name
        }
    }

}
</script>


<style>

</style>