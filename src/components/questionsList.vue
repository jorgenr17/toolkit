<template>
	<v-container>
		<!-- <dialogo :addWord="addWord"/> -->
    <h1 class="pb-2" style="font-size: 35px">Preguntale a CARINA</h1>
		<v-divider/>
				<v-layout row wrap class="mt-5">
		      <v-flex column xs12 sm12 md12>
						<v-card class="pa-3" height="100%" width="100%">
							<v-card-text>
								<v-layout row wrap>
									<v-flex column xs12 sm5 md5>
										<v-card-title style="text-align: center">
											<h3 class="mb-0" style="font-size: 22px">Preguntas Frecuentes</h3>
										</v-card-title>
										<v-list two-line subheader>
											<v-list-tile v-for="(val, index) in this.$store.state.app.model.registros" :key="index" @click="">
											  <v-list-tile-content style="cursor: pointer">
										    	<p>{{val.pregunta}}</p>
							          </v-list-tile-content>
											</v-list-tile>
										</v-list>
									</v-flex>
									<v-divider vertical/>
									<v-flex column xs12 sm5 md5>
										<v-card-title style="text-align: center">
											<h3 class="mb-0" style="font-size: 22px">Escribe tu Pregunta</h3>
										</v-card-title>
										<v-list two-line subheader>
											<v-list-tile>
												<v-textarea rows="2" label="Haz una pregunta" v-model="question" required ></v-textarea>
											</v-list-tile>
											<v-list-tile v-for="(value, index) in filterQuestions" :key="index" v-if="question !== ''" @click="question = value.pregunta">
												<v-list-tile-content>
													<p>{{value.pregunta}}</p>
												</v-list-tile-content>
											</v-list-tile>
										</v-list>
									</v-flex>
								</v-layout>
							</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
    <div class="text-xs-center">
      <v-btn color="black" outline to="/UsingIA/questionsList">Siguiente</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'questionsList',
  data: () => ({
    question: ''
  }),
  computed: {
    filterQuestions () {
      return this.$store.state.app.model.registros.filter(el => el.pregunta.includes(this.question))
    }
  }
}
</script>

<style lang="css">
</style>
