<template>
	<v-container>

		<v-dialog v-model="editQuestionText" max-width="500px" persistent>
			<v-card>
				<v-card-title class="headline">Agregar Categoria</v-card-title>
				<v-card-text>
					<v-textarea rows="2" label="Palabra a agregar" v-model="question"
					placeholder color="accent" :persistent-hint="true"></v-textarea>
				</v-card-text>
				<v-card-actions>
					<v-btn color="primary" flat @click="editQuestionText = false, obj.data.pregunta = question">Aceptar</v-btn>
					<v-btn color="primary" flat @click="editQuestionText = false">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

    <h1 class="pb-2" style="font-size: 35px">Preguntas</h1>
		<v-divider></v-divider>
		<v-layout row wrap class="mt-5">
      <v-flex column xs12 sm6 md12>
					<div>
			      <v-alert :value="true" icon="info" color="primary" outline dismissible><strong>
			        Recuerda...</strong><br>Puedes descartar las preguntas haciendo click en el checkbox o puedes editarlas haciendo click en el botón editar del cuadro de la derecha.
			      </v-alert>
			    </div>
					<!-- <pre>{{this.$store.state.app.model.registros}}</pre> -->
					<v-layout row wrap>
						<v-flex column xs12 sm4 md4>
							<v-card class="elevation-7" height="300px" width="100%" v-if="this.$store.state.app.model.registros.length !== 0">
								<v-card-text class="list">
									<v-list two-line subheader>
										<v-list-tile-content style="cursor: pointer">
											<v-list-tile-title @click="index = value" v-for="(value, i) in $store.state.app.model.contexto.palabrasRelevantes" :key="i" >{{value}}</v-list-tile-title>
										</v-list-tile-content>

									</v-list>
								</v-card-text>
							</v-card>
						</v-flex>
						<v-flex column xs12 sm8 md8>
							<v-card class="pa-3" height="100%" width="100%">
								<div v-if="index === null" style="font-size: 16px; color: grey; text-align: center" class="pa-5 ma-5">
									Por favor, seleccione una palabra relevante para mostrar la pregunta y respuesta asociada a esta.
								</div>
								<div v-else>
									<v-list-tile v-for="(val, index) in checkQuestions" :key="index">
										<div v-if="val.preguntasGeneradas !== undefined" style="inline: block">
											<!-- <v-list-tile-title> -->
												<v-btn icon v-if="val.preguntasGeneradas.seleccionado !== true" @click="findValue(index)"><v-icon>check_box_outline_blank</v-icon></v-btn>
												<v-btn icon v-else @click="findValue(index)"><v-icon color="accent">check_box</v-icon></v-btn>
												{{val.preguntasGeneradas.pregunta}}
											<!-- </v-list-tile-title> -->
										</div>
									</v-list-tile>
								</div>
							</v-card>
						</v-flex>
					</v-layout>
				<!-- </v-card> -->
			</v-flex>
		</v-layout>
		<div class="text-xs-center pa-5">
			<v-btn @click="sendWords()" color="black" class="accent--text">Enviar Relaciones y Prguentas</v-btn>
		</div>
    <!-- <div class="text-xs-center">
      <v-btn color="black" outline @click="next('/UsingIA/questionsList')">Siguiente</v-btn>
    </div> -->
  </v-container>
</template>

<script>
import EventBus from '@/components/EventBus'
import { url } from '../main'

export default {
  name: 'questions',
  data: () => ({
    checkbox: false,
    index: null,
    question: '',
    editQuestionText: false
  }),
  methods: {
    sendWords () {
      EventBus.$emit('loading', true)
      this.$store.dispatch('app/relationedWords', url)
    },
    findValue (index) {
      this.$store.commit('app/addWordToRegister', { val: this.index, index: index })
    },
    next (to) {
      let el = this.$store.state.app.application.usingCM.steps['P'].data.find(el => el.to === to)
      this.$store.commit('app/changeElements', {to: to, el: el, i: 'P'})
      this.$store.commit('app/changeStep', 'P')
      EventBus.$emit('init', 'P')
    },
    editQuestion () {
      this.question = this.obj.data.pregunta
      this.editQuestionText = true
    }
  },
  computed: {
    checkQuestions () {
      let array = []
      this.$store.state.app.model.registros.map(register => {
        if (register.preguntasGeneradas) {
          if (register.preguntasGeneradas.palabrasRelevantes.indexOf(this.index) !== -1) {
            register.preguntasGeneradas.seleccionado = true
          } else {
            register.preguntasGeneradas.seleccionado = false
          }
          array.push(register)
        }
      })
      return array
    }
  },
  components: { EventBus }
}
</script>

<style lang="css">
.list{min-height:78.5%; max-height:78.5%; width:100%; list-style:none;}
.list{overflow:hidden; overflow-y:scroll;}
</style>
