<template>
  <div justify-center>
    <v-dialog v-model="dialog" width="450px">
      <v-card>
        <v-card-title class="headline" style="background-color: #CA0E67; color: white">{{message.title}}
          <v-spacer></v-spacer>
          <v-icon color="white" size="35px">error_outline</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>{{message.text}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat="flat" @click="accept">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import EventBus from '@/components/EventBus'
export default {
  name: 'errorMessage',
  props: [ 'message' ],
  data: () => ({
    dialog: true
  }),
  methods: {
    accept () {
      this.message.boolean = false
      EventBus.$emit('errorMessage', this.message)
    }
  },
  components: { EventBus }
}
</script>

<style lang="css">
</style>
