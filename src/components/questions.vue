<template>
	<v-container>
		<!-- <dialogo :addWord="addWord"/> -->
    <h1 class="pb-2" style="font-size: 35px">Preguntas</h1>
		<v-divider></v-divider>
		<v-layout row wrap class="mt-5">
      <v-flex column xs12 sm6 md12>
					<div>
			      <v-alert :value="true" icon="info" color="primary" outline dismissible><strong>
			        Recuerda...</strong><br>Puedes descartar las preguntas haciendo click en el checkbox o puedes editarlas haciendo click en el botón editar del cuadro de la derecha.
			      </v-alert>
			    </div>
					<v-layout row wrap>
						<v-flex column xs12 sm4 md4>
							<v-card class="elevation-7" height="300px" width="100%">
								<v-card-text class="list">
									<v-list two-line subheader>
										<v-list-tile v-for="(val, index) in this.$store.state.app.model.registros" :key="index">
											<v-list-tile-action>
					              <v-checkbox v-model="val.check"></v-checkbox>
					            </v-list-tile-action>

											<v-list-tile-content @click="obj = {data:val, index: index}" style="cursor: pointer">
						              <v-list-tile-title>{{val.solicitud}}</v-list-tile-title>
						            </v-list-tile-content>
						          </v-list-tile>
										</v-list-tile>
									</v-list>
								</v-card-text>
							</v-card>
						</v-flex>
						<v-flex column xs12 sm8 md8>
							<v-card class="pa-3" height="100%" width="100%">
								<div v-if="obj === null" style="font-size: 16px; color: grey; text-align: center" class="pa-5 ma-5">
									Por favor, seleccione una solicitud para mostrar la pregunta y respuesta asociada a esta.
								</div>
								<div v-else>
									<v-card-title class="text-xs-center">
										<h3 class="mb-0" style="font-size: 18px">{{obj.data.solicitud}}</h3>
									</v-card-title>
									<v-divider/>
									<v-card-text>
										<v-layout row wrap>
											<v-flex column xs9 sm6 md11>
												<strong class="mb-0" style="font-size: 18px">Pregunta: </strong>{{obj.data.pregunta}}
											</v-flex>
											<v-flex column xs3 sm6 md1>
												<v-btn @click="" icon flat small><v-icon size="22">edit</v-icon></v-btn>
											</v-flex>
										</v-layout>
										<v-layout row wrap>
											<v-flex column xs12 sm12 md12>
												<strong class="mb-0" style="font-size: 18px">Respuesta: </strong>{{obj.data.respuesta}}
											</v-flex>
										</v-layout>
									</v-card-text>
								</div>
							</v-card>
						</v-flex>
					</v-layout>
				<!-- </v-card> -->
			</v-flex>
		</v-layout>
    <div class="text-xs-center">
      <v-btn color="black" outline to="/UsingIA/questionsList">Siguiente</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'questions',
  data: () => ({
    checkbox: false,
    obj: null
  })
}
</script>

<style lang="css">
.list{min-height:78.5%; max-height:78.5%; width:100%; list-style:none;}
.list{overflow:hidden; overflow-y:scroll;}
</style>
