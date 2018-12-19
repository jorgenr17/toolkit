<template>
	<g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
		<v-layout row wrap>
			<v-flex column>
				<v-img :src="googleIcon" width="22px" height="22px" style="background-color: white; border-radius: 50%;"/>
			</v-flex>
			<v-flex column>
				Iniciar Sesión con Google
			</v-flex>
		</v-layout>
	</g-signin-button>
</template>

<script>
import EventBus from '@/components/EventBus'
import googleIcon from '../assets/google.png'
import {db} from '../main'

export default {
  name: 'googleButton',
  data: () => ({
    googleIcon,
    googleSignInParams: {
      client_id: '146062994371-0b8m93279mjre61gu2hseg6b904lirn3.apps.googleusercontent.com'
    }
  }),
  methods: {
    onSignInSuccess (googleUser) {
      EventBus.$emit('loading', true)
      let user = googleUser.getBasicProfile()
      // console.log(user.getName(), user)
      db.collection('users').where('email', '==', user.getEmail()).get().then(doc => {
        // console.log(doc.docs[0])
        if (doc.docs[0]) {
          try {
            this.$store.dispatch('app/login', {data: doc.docs[0].data(), id: doc.docs[0].id})
          } catch (e) {
            console.log(e)
          } finally {
            this.$router.push('/')
          }
        } else {
          let profile = {
            photo: user.getImageUrl(),
            email: user.getEmail(),
            password: '',
            entity: '',
            location: '',
            carinaToken: '',
            token: '',
            cms: []
          }
          db.collection('users').add(profile).then(docRef => {
            profile.token = docRef.id
            this.$store.commit('app/loginGoogle', profile)
            try {
              this.$store.dispatch('app/auth', profile.token)
            } catch (error) {
              console.log(error)
            } finally {
              EventBus.$emit('loading', false)
              this.$router.push('/')
            }
          }).catch(error => console.log(`Error al registrar el usuario: ${error}`))
        }
      })
    },
    signOut () {
      // localStorage.removeItem('usuarioActual')
      // this.profile = null
      // this.user = null
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  },
  components: { EventBus }
}
</script>
<style>
.g-signin-button {
	/* This is where you control how the button looks. Be creative! */
	display: inline-block;
	padding: 4px 8px;
	border-radius: 3px;
	background-color: #3c82f7;
	color: #fff;
	box-shadow: 0 3px 0 #0f69ff;
	cursor: pointer
}
</style>
