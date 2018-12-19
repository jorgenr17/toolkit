<template>
  <v-container>
    <h1 class="pb-2" style="font-size: 35px">Prepara tus datos de la siguiente manera</h1>
    <v-divider class="pb-3"></v-divider>
    <!-- <div>
      <v-alert v-model="alert" color="black" class="secondary--text" dismissible><strong>Recuerda...</strong><br>Tus datos deben estar organizados de la siguiente forma</v-alert>
    </div> -->
    <div>
      <v-alert :value="true" color="primary" icon="info" outline dismissible class="mt-5">
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
      <v-btn color="black" outline to="/UsingIA/DefinirModelo">Siguiente</v-btn>
    </div>
  </v-container>
</template>

<script>
import previewData from '../assets/previewData.png'
import dragDropFiles from '@/components/dragDropFiles'

export default {
  name: 'PrepararDatos',
  data: () => ({
    previewData,
    alert: true,
    loading3: false,
    loader: null
  }),
  methods: {
    loadCsv (event) {
      let file = event.target.files[0]
      let extension = file.name.split('.')[1]
      if (extension !== 'csv') {
        alert('Por favor ingrese un archivo valido (".csv").')
      } else {
        this.loader = 'loading3'
        console.log('loadCsv', extension, file)
      }
      this.$refs.loadCsv.type = 'text'
      this.$refs.loadCsv.type = 'file'
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
  components: { dragDropFiles }
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
