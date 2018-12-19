<template>
  <v-container>
  	<h1 class="pb-2" style="font-size: 35px">Temas de Interés</h1>
    <v-divider></v-divider>
		<relationWords class="mt-5"/>
  </v-container>
</template>

<script>
import relationWords from '@/components/relationWords'

export default {
  name: 'temasDeInteres',
  components: { relationWords }
}
</script>

<style lang="css">
</style>
