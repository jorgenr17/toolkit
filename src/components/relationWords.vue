<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs12 sm12 md12>
				<v-dialog v-model="addWord" max-width="500px" persistent>
					<v-card>
						<v-card-title class="headline">Agregar Categoria</v-card-title>
						<v-card-text>
							<v-text-field @keyup.enter="addWordInArray()" label="Palabra a agregar" v-model="word"
							placeholder color="accent" :persistent-hint="true"></v-text-field>
						</v-card-text>
						<v-card-actions>
							<v-btn color="primary" flat @click="closeDialog()">Cerrar</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>

				<v-card max-height="500px">
					<v-toolbar card color="grey lighten-3">
						<v-flex xs12 sm4 md3 class="text-xs-center">
							<v-toolbar-title>Temas</v-toolbar-title>
						</v-flex>
						<v-flex xs12 sm4 md4 class="text-xs-center">
							<v-toolbar-title>Categorias</v-toolbar-title>
						</v-flex>
						<v-flex xs12 sm4 md5 class="text-xs-center">
							<v-toolbar-title>Palabras</v-toolbar-title>
						</v-flex>
					</v-toolbar>

					<v-layout>
						<v-flex xs12 sm4 md3>
							<v-card-text class="list">
								<v-list dense>
									<v-list-tile v-for="(value, index) in topics" :key="index" :class="{activo: value.active }" @click="showChild(index), child = index, category = ''">{{value.palabraClave}}
										<v-spacer></v-spacer>
										<v-avatar class="grey" size="25px">{{value.temasDeInteres.length}}</v-avatar>
										<v-icon>keyboard_arrow_right</v-icon>
									</v-list-tile>
								</v-list>
							</v-card-text>
						</v-flex>

						<v-divider vertical></v-divider>

						<v-flex xs12 sm4 md4>
							<div class="pr-1">
								<v-btn small fixed dark fab right bottom color="info" @click="addWord = !addWord"><v-icon>add</v-icon></v-btn>
							</div>

							<v-card-text v-if="child !== '' && this.$store.state.app.model.relaciones[this.child].temasDeInteres.length !== 0">
								<v-chip v-for="(value, index) in this.$store.state.app.model.relaciones[this.child].temasDeInteres" :key="index" color="grey" dark small @click="relation(index)">
									<span class="pr-2" style="font-size: 20px; font-weight: bold">#</span>{{value.temaDeInteres}}
								</v-chip>
							</v-card-text>
							<v-card-text v-else>
								<div key="title" class="title font-weight-light grey--text pa-3 text-xs-center" style="font-size: 12px">No hay categorias para mostrar. Deseas agregar alguna?</div>
							</v-card-text>
						</v-flex>

						<v-divider vertical></v-divider>

						<v-flex xs12 sm4 md5>
							<v-card-text>
								<div key="title" v-if="category === ''" class="title font-weight-light grey--text pa-3 text-xs-center">Selecciona las palabras a relacionar con la categoria</div>
								<div v-else>
									<v-scroll-x-transition group hide-on-leave>
										<v-chip color="grey" dark small v-for="(value, i) in commonElements" :key="i" @click="asignWord(value.word)">{{value.word}}<v-icon v-if="value.val">check_circle</v-icon>
										</v-chip>
									</v-scroll-x-transition>
								</div>
						</v-card-text>
					</v-flex>
				</v-layout>
			</v-card>
			<div class="text-xs-center">
				<v-btn @click="sendWords()">Enviar Relaciones</v-btn>
			</div>
		</v-flex>
	</v-layout>
</v-container>
</template>

<script>
import EventBus from '@/components/EventBus'

export default {
  name: 'relationWords',
  data: () => ({
    child: '',
    child2: '',
    addWord: false,
    word: '',
    activo: false,
    category: '',
    category2: '',
    url: 'https://carinag-225014.appspot.com'
  }),
  methods: {
    showChild (index) {
      this.child = index
    },
    addWordInArray () {
      if (this.child !== '') {
        if (this.word !== '') {
          this.$store.commit('app/addCategory', { word: this.word, child: this.child })
          this.word = ''
        } else {
          alert('Por favor ingresa una palabra.')
        }
      } else {
        alert('Por favor selecciona un tema.')
      }
    },
    closeDialog () {
      this.addWord = false
      this.word = ''
    },
    relation (index) {
      this.category = index
    },
    asignWord (word) {
      if (this.category !== '') {
        this.$store.commit('app/asignWord', { word: word, child: this.child, category: this.category })
      } else {
        alert('Por favor selecciona una categoria.')
      }
    },
    sendWords () {
      EventBus.$emit('loading', true)
      this.$store.dispatch('app/relationedWords', this.url)
    },
    active (index) {
      if (this.child === index) {
        this.activo = true
      } else {
        this.activo = false
      }
    }
  },
  computed: {
    commonElements () {
      let array = []
      this.$store.state.app.model.contexto.palabrasCandidatas.map(word => {
        let index = this.$store.state.app.model.relaciones[this.child].temasDeInteres[this.category].palabrasRelevantes.indexOf(word)
        if (index !== -1) {
          array.push({ word: word, val: true })
        } else {
          array.push({ word: word, val: false })
        }
      })
      return array
    },
    topics () {
      let array = []
      this.$store.state.app.model.relaciones.map(el => {
        if (this.$store.state.app.model.relaciones.indexOf(el) === this.child) {
          el.active = true
        } else {
          el.active = false
        }
        array.push(el)
      })
      return array
    }
  },
  components: { EventBus }
}
</script>

<style lang="css">
.activo {
	background-color: rgb(53, 204, 204, 0.2);
	border-radius: 15px
}
.activo:hover {
	background-color: rgb(53, 204, 204, 0.2);
	border-radius: 15px
}
.list{height:300px; width:100%; list-style:none;}
.list{overflow:hidden; overflow-y:scroll;}
</style>
