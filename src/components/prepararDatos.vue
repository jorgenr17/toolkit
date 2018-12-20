<template>
  <v-container>
    <h1 class="pb-2" style="font-size: 35px">Prepara tus datos de la siguiente manera</h1>
    <v-divider class="pb-3"></v-divider>
    <!-- <div>
      <v-alert v-model="alert" color="black" class="secondary--text" dismissible><strong>Recuerda...</strong><br>Tus datos deben estar organizados de la siguiente forma</v-alert>
    </div> -->
    <div>
      <v-alert :value="true" icon="info" color="primary" outline dismissible class="mt-5">
        Recuerda...</strong><br>Tus datos deben estar organizados de la siguiente forma.
      </v-alert>
    </div>
    <!-- <v-img :src="previewData" contain aspect-ratio="3"></v-img> -->
    <table class="text-xs-center" v-if="this.$store.state.app.model.registros.length !== 0">
      <tr><td class="title pa-2">Fecha</td><td class="title pa-2">Hora</td><td class="title pa-2">Solicitud</td><td class="title pa-2">Dependencia</td><td class="title pa-2">Respuesta</td><td class="title pa-2">Observaciones</td></tr>
      <tr v-for="(value, index) in table" :key="index"><td class="corpus pa-2" v-for="(val, i, k) in value" :key="k">{{val}}</td></tr>
    </table>
    <div v-if="this.$store.state.app.application.mode === 'DEMO'">
      <v-alert :value="true" color="primary" icon="info" outline>
        Los datos que corresponden a la imagen ya se encuentran cargados en la versión <strong>DEMO</strong>.
      </v-alert>
    </div>
    <div v-else>
      <h1 class="pt-4 pb-4" style="font-weight: bold">Carga tu formato aquí</h1>
      <v-layout row wrap>
        <v-flex xs12 sm3 md3>
          <div class="text-xs-center pt-5">
            <v-btn :loading="loading3" :disabled="loading3" color="accent" class="white--text" @click="$refs.loadCsv.click ()">Subir formato<v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input type="file" ref="loadCsv" accept=".csv" @change="loadCsv" style="display: none">
          </div>
        </v-flex>
        <v-flex xs9 sm9 md9 hidden-xs-only>
          <div class="text-xs-center">
            <dragDropFiles/>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <div class="text-xs-right pt-5">
      <v-btn color="black" outline @click="next('/UsingIA/DefinirModelo')">Siguiente</v-btn>
    </div>
  </v-container>
</template>

<script>
import previewData from '../assets/previewData.png'
import dragDropFiles from '@/components/dragDropFiles'
import EventBus from '@/components/EventBus'

export default {
  name: 'PrepararDatos',
  data: () => ({
    previewData,
    alert: true,
    loading3: false,
    loader: null
  }),
  methods: {
    next (to) {
      let el = this.$store.state.app.application.usingCM.steps['C'].data.find(el => el.to === to)
      this.$store.commit('app/changeElements', {to: to, el: el, i: 'C'})
    },
    loadCsv (event) {
      let file = event.target.files[0]
      let extension = file.name.split('.')[1]
      if (extension !== 'csv') {
        EventBus.$emit('errorMessage', {title: 'Formato Inválido', text: 'Por favor ingrese un archivo válido (".csv").', boolean: true})
      } else {
        this.loader = 'loading3'
        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = this.loadHandler
      }
      this.$refs.loadCsv.type = 'text'
      this.$refs.loadCsv.type = 'file'
    },
    loadHandler (event) {
      let file2 = event.target.result
      let array = []
      let allTextLines = file2.split(/\r\n|\n/)
      // let lines = {}
      let obj = {}
      let titles = allTextLines[0].split(';')
      for (let i = 1; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(';')
        for (let j = 0; j < titles.length; j++) {
          if (data[j] !== '' && data[j] !== undefined) {
            obj[titles[j]] = data[j]
          }
        }
        if (Object.keys(obj).length !== 0) {
          array.push(obj)
          obj = {}
        }
      }
      // console.log(array)
      let keysObj = ['fecha', 'hora', 'solicitud', 'dependencia', 'respuesta', 'observaciones']
      let keys = Object.keys(array[0])
      let count = 0
      keysObj.map(a => {
        keys.map(b => {
          if (a === b) {
            count++
          }
        })
      })
      // console.log(count)
      if (count === 6) {
        this.$store.commit('app/csv', array)
      } else {
        EventBus.$emit('errorMessage', {title: 'Formato Inválido', text: 'Por favor verifique que el formato contenga todos los campos.', boolean: true})
      }
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
    }
  },
  computed: {
    csv () {
      return JSON.stringify(this.$store.state.app.application.csv, null, 2)
    },
    table () {
      var array = []
      this.$store.state.app.model.registros.map(el => {
        let {fecha, hora, solicitud, dependencia, respuesta, observaciones} = el
        array.push({fecha, hora, solicitud, dependencia, respuesta, observaciones})
      })
      return array
    }
  },
  components: { dragDropFiles, EventBus }
}
</script>

<style lang="css">
.title {border: 2px solid grey; font-size: 18px; font-weight: bold; background-color: grey  }
.corpus {border: 2px solid grey;}
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
