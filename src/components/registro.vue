<template>
	<div>
		<toolbar/>
		<v-container grid-list-md text-xs-center>
			<v-layout justify-center>
				<v-flex xs12 sm6 md6>
					<v-card-title class="gray">
						<span class="headline black--text">Registrarme</span>
					</v-card-title>
					<v-form ref="form" lazy-validation>
						<v-flex xs12 sm10 md10>
							<v-text-field label="Correo Electrónico" v-model="email" :rules="emailRules" required></v-text-field>
						</v-flex>
						<v-flex xs12 sm10 md10>
							<v-text-field :type="show ? 'text' : 'password'" v-model="password" :append-icon="show ? 'visibility_off' : 'visibility'" :rules="passwordRules" label="Contraseña" @click:append="show = !show" required ></v-text-field>
						</v-flex>
						<v-flex xs12 sm10 md10>
							<v-text-field label="Entidad" v-model="entity" :rules="usuarioRules" required></v-text-field>
						</v-flex>
						<v-flex xs12 sm10 md10>
							<v-text-field label="Localización" v-model="location" :rules="usuarioRules" required></v-text-field>
						</v-flex>
						<v-btn :disabled="!valid" @click="registerme">Registrarme</v-btn>
						<v-btn @click="clear">Limpiar Datos</v-btn>
					</v-form>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import toolbar from '@/components/toolBar'
import { db } from '../main'
import EventBus from '@/components/EventBus'

export default {
  name: 'Registro',
  data () {
    return {
      email: '',
      password: '',
      show: false,
      location: '',
      entity: '',
      usuarioRules: [v => !!v || 'Usuario requerido'],
      passwordRules: [v => !!v || 'Contraseña requerida'],
      emailRules: [
        v => !!v || 'Se requiere una cuenta de correo electrónico.',
        v => /.+@.+/.test(v) || 'Correo electrónico invalido.'
      ],
      roles: ['desarrollador', 'usuario', 'administrador']
    }
  },
  methods: {
    clear () {
      this.$refs.form.reset()
    },
    registerme () {
      this.$store.commit('app/registerData', { email: this.email, password: this.password, location: this.location, entity: this.entity })
      EventBus.$emit('loading', true)
      db.collection('users').where('email', '==', this.$store.state.app.application.user.email).get().then(doc => {
        if (doc.docs[0]) {
          EventBus.$emit('loading', false)
          EventBus.$emit('errorMessage', { text: 'La cuenta de correo electrónico ya se encuentra asociada a Carina.', title: 'Error de registro', boolean: true })
        } else {
          db.collection('users').add(this.$store.state.app.application.user).then(docRef => {
            try {
              this.$store.dispatch('app/auth', docRef.id)
            } catch (error) {
              console.log(error)
            } finally {
              this.clear()
              EventBus.$emit('loading', false)
              this.$router.push('/')
            }
          }).catch(error => EventBus.$emit('errorMessage', { text: `Error al registrar el usuario: ${error}`, title: 'Error de registro', boolean: true }))
        }
      }).catch(error => EventBus.$emit('errorMessage', { text: `Error al verificar el usuario: ${error}`, title: 'Error de registro', boolean: true }))
    }
  },
  computed: {
    valid () {
      if (this.email !== '' && /.+@.+/.test(this.email) === true && this.password !== '') {
        return true
      } else {
        return false
      }
    }
  },
  components: { toolbar }
}
</script>

<style lang="css">
</style>
