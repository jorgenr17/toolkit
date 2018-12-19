<template>
	<div>
    <toolbar/>
    <v-container grid-list-md>
			<h1 class="pt-3 pb-2" style="font-size: 35px"><v-icon size="45px" color="black">error_outline</v-icon> Antes de empezar, recuerda...</h1>
			<v-divider></v-divider>
			<v-layout row wrap fill-height class="mt-5 pt-5">
				<v-flex column xs12 sm12 md4 class="text-xs-justify">
					<v-card height="100%" width="80%">
						<div class="pa-2" style="text-align: center">
							<v-progress-circular :size="180" :width="20" value="Cargar Datos" color="accent"><v-icon size="80px">fa-file-text-o</v-icon></v-progress-circular>
						</div>
						<v-card-text>
							<h3 style="font-size: 22px">Cargar Datos</h3>
							<p class="font-weight-light grey--text">Si estas en modo <strong style="font-weight: bold">DEMO</strong>, alimenta a <strong style="font-weight: bold">CARINA</strong> con los datos del formato de ejemplo que ya hemos precargado por ti. Si estas en modo <strong style="font-weight: bold">DIY</strong> (Do It Yourself), alimenta a <strong style="font-weight: bold">CARINA</strong> con tus propios datos, cargando un archivo en formato .csv de Excel.<br><strong style="font-weight: bold">Ten en cuenta:</strong> En la sección de preparar datos encontraras el formato listo para diligenciar y el espacio para cargarlo.</p>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex column xs12 sm12 md4 class="text-xs-justify">
					<v-card height="100%" width="80%">
						<div class="pa-2" style="text-align: center">
							<v-progress-circular :size="180" :width="20" value="Cargar Datos" color="accent"><v-icon size="85px">fa-cogs</v-icon></v-progress-circular>
						</div>
						<v-card-text>
							<h3 style="font-size: 22px">Entrena Modelo</h3>
							<p class="font-weight-light grey--text">Una vez cargados los registros en formato .csv y definido el modelo, el cual consta de datos básicos necesarios del contexto de los datos cargados, debes entrenar a <strong style="font-weight: bold">CARINA</strong> con las palabras que para ti son claves en dicho contexto y finalmente asocia esas palabras claves a una o más categorías en particular para que luego <strong style="font-weight: bold">CARINA</strong> pueda saber cómo responder a tus preguntas.</p>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-flex column xs12 sm12 md4 class="text-xs-justify">
					<v-card height="100%" width="80%">
						<div class="pa-2" style="text-align: center">
							<v-progress-circular :size="180" :width="20" value="Cargar Datos" color="accent"><v-icon size="85px">fa-spinner</v-icon></v-progress-circular>
						</div>
						<v-card-text>
							<h3 style="font-size: 22px">Probar Modelo</h3>
							<p class="font-weight-light grey--text">Para probar el modelo debes tener en cuenta las preguntas que <strong style="font-weight: bold">CARINA</strong> generará con base a las palabras claves y las relaciones entre ellas, las cuales establecerás en el momento de palabras clave y temas de interés. Una vez hagas una pregunta <strong style="font-weight: bold">CARINA</strong> estará en la capacidad de responder mientras te mantengas dentro del contexto que le enseñaste al cargar los datos y definir el modelo.</p>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
			<div class="text-xs-right pt-4">
				<v-btn color="black" right outline to="/UsingIA/PrepararDatos">Siguiente</v-btn>
			</div>
		</v-container>
  </div>
</template>

<script>
import toolbar from '@/components/toolBar'
import icon from '../assets/logoToolkit.png'

export default {
  name: 'steps',
  mounted () {
    if (this.$store.state.app.application.mode === 'DIY' && this.$store.state.app.application.authenticated === false) {
      this.$router.push('/login')
    }
  },
  data: () => ({
    icon
  }),
  methods: {
    router (rute) {
      this.$router.push(rute)
    }
  },
  components: { toolbar }
}
</script>

<style>
/* .v-progress-circular
  margin: 1rem */
</style>
