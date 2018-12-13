<template>
	<v-footer height="auto" color="black">
    <v-card class="flex" flat tile>
			<v-layout class="black darken-3" justify-center row wrap >
				<v-btn color="white" flat round>Quienes Somos?</v-btn>
				<v-btn color="white" flat round>Contáctenos</v-btn>
				<v-btn color="white" flat round>Términos y Condiciones</v-btn>
			</v-layout>
      <v-card-title class="black">
				<v-img max-width max-height contain :src="logoCompleto"></v-img>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
import logoPNUD from '../assets/LOGOpnud.png'
import logoGobierno from '../assets/logoMINTIC.png'
import logoCentroInnovacion from '../assets/centroInnovacion.png'
import logoCompleto from '../assets/sinfondo.png'

export default {
  name: 'footerToolkit',
  data () {
    return {
      fixed: false,
      logoPNUD,
      logoGobierno,
      logoCentroInnovacion,
      logoCompleto
    }
  }
}
</script>

<style lang="css">
</style>
