<template>
	<div>
		<toolbar/>
		<v-container grid-list-md text-xs-center>
			<v-layout justify-center>
				<v-flex xs12 sm6 md6>
					<v-card-title class="gray">
						<span class="headline black--text">Bienvenido!</span>
					</v-card-title>
					<v-form ref="form" lazy-validation>
						<v-flex xs12 sm10 md10>
							<v-text-field label="Correo Electrónico" v-model="email" :rules="emailRules" required ></v-text-field>
						</v-flex>
						<v-flex xs12 sm10 md10>
							<v-text-field :type="show ? 'text' : 'password'" v-model="password" :append-icon="show ? 'visibility_off' : 'visibility'" :rules="passwordRules" label="Contraseña" @click:append="show = !show" required ></v-text-field>
						</v-flex>
						<v-btn :disabled="!valid" @click="login">Entrar</v-btn>
						<v-btn @click="clear">Limpiar Datos</v-btn>
					</v-form>
					<br>
					<span>No tienes una cuenta?, </span><router-link to="/registro">Registrate Ahora</router-link>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import toolbar from '@/components/toolBar'
import {db} from '../main'
import EventBus from '@/components/EventBus'

export default {
  name: 'login',
  mounted () {},
  data () {
    return {
      show: false,
      email: '',
      password: '',
      url: 'http://localhost:3000',
      passwordRules: [v => !!v || 'Contraseña requerida'],
      emailRules: [
        v => !!v || 'Se requiere una cuenta de correo electrónico.',
        v => /.+@.+/.test(v) || 'Correo electrónico invalido.'
      ]
    }
  },
  methods: {
    clear () {
      this.$refs.form.reset()
    },
    login () {
      this.$store.commit('app/loginData', { email: this.email, password: this.password })
      EventBus.$emit('loading', true)
      db.collection('users').where('email', '==', this.email).where('password', '==', this.password).get().then((doc) => {
        if (doc.docs[0]) {
          let user = doc.docs[0]
          try {
            this.$store.dispatch('app/login', {data: user.data(), id: user.id})
          } finally {
            this.clear()
            EventBus.$emit('loading', false)
            this.$router.push('/')
          }
        } else {
          let confirmar = confirm('Usuario o contraseña invalido.')
          if (confirmar) {
            EventBus.$emit('loading', false)
          }
        }
      }).catch(error => alert('Error al verificar el usuario:', error))
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
  components: { toolbar, EventBus }
}
</script>

<style lang="css">
</style>
