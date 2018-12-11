<template>
  <v-app>
    <loading v-if="loading"/>
    <errorMessage v-if="errorMessage" :message="message"/>
    <!-- <v-content height="auto"> -->
      <router-view/>
    <!-- </v-content> -->
    <!-- <footerToolkit/> -->
  </v-app>
</template>

<script>
import logoToolkit from '@/assets/logoToolkit.svg'
// import footerToolkit from '@/components/footer'
import loading from '@/components/loading'
import EventBus from '@/components/EventBus'
import errorMessage from '@/components/errorMessage'
// import './stylus/main.styl'

export default {
  mounted () {
    EventBus.$on('loading', value => {
      this.loading = value
    })
    EventBus.$on('errorMessage', data => {
      try {
        this.message = data
      } finally {
        this.errorMessage = data.boolean
      }
    })
  },
  data () {
    return {
      clipped: false,
      sideNav: false,
      drawer: true,
      logo: logoToolkit,
      socket: null,
      errorMessage: false,
      loading: false,
      message: null,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      menuItems: [
        { icon: 'supervisor_account', title: 'Ingresar', link: '/login' },
        { icon: 'room', title: 'Registro', link: '/registro' },
        { icon: 'person', title: 'Perfil', link: '/xample' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'kit IA'
    }
  },
  name: 'App',
  components: { loading, errorMessage }
}
</script>
