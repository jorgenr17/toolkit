<template>
  <div>
    <toolbar/>
    <v-container grid-list-md fill-height>
      <v-layout row align-center class="mt-5">
        <v-flex xs6 md6 v-for="(mode, index) in this.$store.state.app.application.modes" :key="index" offset-md0>
          <v-flex row class="text-xs-center">
            <v-avatar slot="activator" size="180px">
              <img :src="mode.img">
            </v-avatar>
          </v-flex>
          <v-flex row>
            <span style="font-size: 24px">{{mode.text}}</span>
          </v-flex>
          <v-flex row>
            <a @click="activeMode(mode.textButton)" class="primary--text" style="font-style: italic; font-size: 20px; text-decoration: underline;">Haz click aqui</a>
          </v-flex>
          <v-flex row>
            <div class="text-xs-center">
              <v-btn @click="activeMode(mode.textButton)" large color="black" class="white--text" style="font-size: 28px">{{mode.textButton}}</v-btn>
            </div>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import logoToolkit from '@/assets/logoToolkit.svg'
import colors from 'vuetify/es5/util/colors'
import toolbar from '@/components/toolBar'

export default {
  data () {
    return {
      logoToolkit,
      colors
    }
  },
  methods: {
    activeMode (mode) {
      this.$store.dispatch('app/mode', mode)
    }
  },
  components: { toolbar }
}
</script>

<style scoped>
.centrado {
  align-self: center
}
</style>
