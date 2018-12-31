import user from '../../assets/noun_User.svg'
import manager from '../../assets/noun_manager.svg'
import { db } from '../../main'
import { router } from '../../router'
import axios from 'axios'
import EventBus from '@/components/EventBus'

const state = {
  application: {
    response: null,
    createModel: true,
    currentCognitiveModel: '',
    user: {
      photo: 'https://firebasestorage.googleapis.com/v0/b/toolkit-1556a.appspot.com/o/sin_perfil.png?alt=media&token=58e7bbb1-2233-48c9-a301-0f0a1d2b422a',
      email: 'superusuario@gmail.com',
      password: 'superusuario',
      entity: 'Admin',
      location: 'Montería',
      carinaToken: '',
      token: '',
      cms: []
    },
    currentsCms: [],
    socketId: '',
    authenticated: false,
    toolBarItems: [
      { icon: 'exit_to_app', title: 'Ingresar', link: '/login' },
      { icon: 'how_to_reg', title: 'Registro', link: '/registro' },
      { icon: 'account_circle', title: 'Perfil', link: '/profile' }
      // { icon: 'close', title: 'Cerrar Sesión', link: '/' }
    ],
    usingCM: {
      response: null,
      steps: {
        C: {
          active: 'accent',
          icon: 'fa-file-text-o',
          data: [
            { icon: 'table_chart', text: 'Preparar Datos', active: 'accent', color: 'accent', shadow: '#35CCCC', to: '/UsingIA/PrepararDatos' },
            { icon: 'code', text: 'Definir Modelo', active: 'disable', color: 'accent', shadow: '#35CCCC', to: '/UsingIA/DefinirModelo' }
            // { icon: 'account_circle', text: 'Enviale tus datos a Carina', active: 'disable', color: 'accent', shadow: '#35CCCC', to: '/UsingIA/DefinirModelo' }
          ]
        },
        E: {
          active: 'disable',
          icon: 'fa-cogs',
          data: [
            { icon: 'list_alt', text: 'Palabras Relevantes', active: 'disable', color: 'primary', shadow: '#CA0E69', to: '/UsingIA/palabraClave' },
            { icon: 'timeline', text: 'Temas de Interés', active: 'accent', color: 'accent', shadow: '#35CCCC', to: '/UsingIA/temasDeInteres' },
            { icon: 'fa-question-circle', text: 'Preguntas', active: 'disable', color: 'primary', shadow: '#CA0E69', to: '/UsingIA/questions' }
          ]
        },
        P: {
          active: 'disable',
          icon: 'fa-spinner',
          data: [
            { icon: 'question_answer', text: 'Probar Modelo', active: 'accent', color: 'accent', shadow: '#35CCCC', to: '/UsingIA/questionsList' }
          ]
        }
      }
    },
    mode: 'DEMO',
    modes: [
      { text: 'No tienes información y tienes poco tiempo?', textButton: 'DEMO', img: user },
      { text: 'Quieres volver a ingresar y seguir probando?', textButton: 'DIY', img: manager }
    ]
  },
  model: {
    contexto: {
      nombre: '',
      descripcion: '',
      palabrasClave: [],
      dependencias: [],
      palabrasCompuestas: [],
      palabrasRelevantes: [],
      palabrasCandidatas: [],
      palabrasDescartadas: [],
      categorias: []
    },
    entidades: {
      lugares: [],
      fechas: [],
      organizaciones: [],
      personas: [],
      miscelaneas: [],
      preguntas: [],
      verbosDelDominio: []
    },
    registros: [],
    relaciones: []
  },
  registro: {
    fecha: '',
    hora: '',
    tipo: '',
    solicitud: '',
    dependencia: '',
    respuesta: '',
    observaciones: '',
    palabrasClave: [],
    palabrasCandidatas: [],
    palabrasRelevantes: [],
    palabrsCompuestas: [],
    palabrasDescartadas: [],
    verbosSolcitudes: [],
    categorias: [],
    entidadesSolicitud: {
      fechas: [],
      lugares: [],
      miscelaneas: []
    },
    entidadesRespuesta: {
      fecha: [],
      miscelaneas: []
    }
  }
}

const getters = {}

const mutations = {
  changeStep: (state, key) => {
    // console.log(key)
    for (var k in state.application.usingCM.steps) {
      if (k === key) {
        state.application.usingCM.steps[k].active = 'accent'
      } else {
        state.application.usingCM.steps[k].active = 'disable'
      }
    }
  },
  changeElements: (state, data) => {
    let index = state.application.usingCM.steps[data.i].data.indexOf(data.el)
    state.application.usingCM.steps[data.i].data[index].active = 'accent'
    state.application.usingCM.steps[data.i].data.map(e => {
      if (e.text !== data.el.text) {
        e.active = 'disable'
      }
    })
    router.push(data.to)
  },
  addPalabraClave: (state, word) => {
    state.model.contexto.palabrasClave.push(word)
  },
  changePhoto: (state, photo) => {
    state.application.user.photo = photo
  },
  asignSocketId: (state, socketId) => {
    state.application.socketId = socketId
  },
  carinaToken: (state, token) => {
    state.application.user.carinaToken = token
  },
  returnDataWithKeyWords: (state, data) => {
    state.model = data
    // state.model.contexto.palabrasRelevantes = data.contexto.palabrasCandidatas
  },
  addCognitiveModel: (state, CognitiveModel) => {
    let cognitiveModel = { name: CognitiveModel.data.nombre, id: CognitiveModel.id }
    state.application.user.cms.push(cognitiveModel)
    // state.application.currentsCms.push(cognitiveModel)
  },
  discardWord: (state, obj) => {
    state.model.contexto[obj.key2].push(obj.value)
    let index = state.model.contexto[obj.key1].indexOf(obj.value)
    state.model.contexto[obj.key1].splice(index, 1)
  },
  addWord: (state, word) => {
    state.model.contexto.palabrasRelevantes.push(word)
    // EventBus.$emit('addWord', false)
  },
  addCategory: (state, obj) => {
    state.model.relaciones[obj.child].temasDeInteres.push({ temaDeInteres: obj.word, palabrasRelevantes: [] })
  },
  asignWord: (state, obj) => {
    let index = state.model.relaciones[obj.child].temasDeInteres[obj.category].palabrasRelevantes.indexOf(obj.word)
    if (index === -1) {
      state.model.relaciones[obj.child].temasDeInteres[obj.category].palabrasRelevantes.push(obj.word)
    } else {
      state.model.relaciones[obj.child].temasDeInteres[obj.category].palabrasRelevantes.splice(index, 1)
    }
  },
  mode: (state, mode) => {
    state.application.mode = mode
    EventBus.$emit('loading', false)
    router.push('/steps')
  },
  loginData: (state, data) => {
    state.application.user.email = data.email
    state.application.user.password = data.password
  },
  registerData: (state, data) => {
    state.application.user.email = data.email
    state.application.user.password = data.password
    state.application.user.entity = data.entity
    state.application.user.location = data.location
  },
  deleteCM: (state, index) => {
    state.application.user.cms.splice(index, 1)
  },
  loginGoogle: (state, data) => {
    state.application.user = data
  },
  file: (state, mode) => {
    if (mode === 'DEMO') {
      let registros = [
        {
          check: true,
          fecha: '10/02/2018',
          hora: '10:30 am',
          tipo: '',
          solicitud: 'por favor me pueden informar cuando es la fecha de cierre convocatoria de los proyectos de investigación',
          dependencia: 'Investigación',
          respuesta: 'La fecha de cierre es el 5 de diciembre de 2018',
          observaciones: '',
          palabrasClave: [],
          palabrasCandidatas: [],
          palabrasRelevantes: [],
          palabrsCompuestas: [],
          palabrasDescartadas: [],
          verbosSolcitudes: [],
          pregunta: 'cuando es la fecha de cierre convocatoria de los proyectos de investigación?',
          categorias: [],
          entidadesSolicitud: {
            fechas: [],
            lugares: [],
            miscelaneas: []
          },
          entidadesRespuesta: {
            fechas: [],
            miscelaneas: []
          }
        },
        {
          check: true,
          fecha: '11/02/2018',
          hora: '10:30 am',
          tipo: '',
          solicitud: 'Necesito saber que papeles debo de tener en cuenta para presentar un proyecto de investigación',
          dependencia: 'Investigación, Extensión',
          respuesta: 'Se deben presentar los siguientes formatos diligenciados: a. Formato de proyecto de investigació        extensión: F2080 y b. Formato F2081',
          observaciones: '',
          pregunta: 'que papeles debo de tener en cuenta para presentar un proyecto de investigación?',
          palabrasClave: [],
          palabrasCandidatas: [],
          palabrasRelevantes: [],
          palabrsCompuestas: [],
          palabrasDescartadas: [],
          verbosSolcitudes: [],
          categorias: [],
          entidadesSolicitud: {
            fechas: [],
            lugares: [],
            miscelaneas: []
          },
          entidadesRespuesta: {
            fechas: [],
            miscelaneas: []
          }
        },
        {
          check: true,
          fecha: '10/03/2018',
          hora: '10:30 am',
          tipo: '',
          solicitud: 'Cuál es la fecha de inicio del proyecto FE-002',
          dependencia: 'Investigación, Extención',
          respuesta: 'La fecha de inicio del proyecto es 3 de junio de 2018',
          observaciones: '',
          pregunta: 'Cuál es la fecha de inicio del proyecto FE-002?',
          palabrasClave: [],
          palabrasCandidatas: [],
          palabrasRelevantes: [],
          palabrsCompuestas: [],
          palabrasDescartadas: [],
          verbosSolcitudes: [],
          categorias: [],
          entidadesSolicitud: {
            fechas: [],
            lugares: [],
            miscelaneas: []
          },
          entidadesRespuesta: {
            fechas: [],
            miscelaneas: []
          }
        },
        {
          check: true,
          fecha: '10/03/2018',
          hora: '10:30 am',
          tipo: '',
          solicitud: 'Quien es el encargado de recepcionar los proyectos de extensión',
          dependencia: 'Extensión',
          respuesta: 'Maria Perez es la persona encargada de recepcionar los proyectos de extensión',
          observaciones: '',
          pregunta: 'Quien es el encargado de recepcionar los proyectos de extensión?',
          palabrasClave: [],
          palabrasCandidatas: [],
          palabrasRelevantes: [],
          palabrsCompuestas: [],
          palabrasDescartadas: [],
          verbosSolcitudes: [],
          categorias: [],
          entidadesSolicitud: {
            fechas: [],
            lugares: [],
            miscelaneas: []
          },
          entidadesRespuesta: {
            fechas: [],
            miscelaneas: []
          }
        }
      ]
      state.model.registros = registros
    } else {
      state.model.registros = []
    }
  },
  csv: (state, array) => {
    // console.log(array)
    state.model.registros = array
  },
  addWordToRegister: (state, data) => {
    let index = state.model.registros[data.index].preguntasGeneradas.palabrasRelevantes.indexOf(data.val)
    if (index === -1) {
      state.model.registros[data.index].preguntasGeneradas.palabrasRelevantes.push(data.val)
    } else {
      state.model.registros[data.index].preguntasGeneradas.palabrasRelevantes.splice(index, 1)
    }
  }
}

const actions = {
  auth (context, token) {
    context.state.application.authenticated = true
    context.state.application.user.token = token
  },
  login (context, user) {
    state.application.user = user.data
    context.dispatch('auth', user.id)
  },
  updatePhoto (context, upload) {
    upload.getDownloadURL().then(url => {
      context.commit('changePhoto', url)
      db.collection('users').doc(context.state.application.user.token).update({
        photo: url
      })
    })
  },
  addingCognitiveModel (context, link) {
    db.collection('cognitiveModels').add(context.state.model.contexto).then(cognitiveModel => {
      try {
        db.collection('cognitiveModels').doc(cognitiveModel.id).get().then(CognitiveModel => {
          context.commit('addCognitiveModel', {id: CognitiveModel.id, data: CognitiveModel.data()})
          context.state.application.currentCognitiveModel = CognitiveModel.id
        }).then(e => context.dispatch('updateUser'))
      } catch (error) {
        console.error(error)
      } finally {
        context.dispatch('procesingCognitiveModel', link)
      }
    }).catch(error => EventBus.$emit('errorMessage', { text: `Error al registrar el Modelo cognitivo: ${error}`, title: 'Error de registro deL Modelo', boolean: true }))
  },
  procesingCognitiveModel (context, link) {
    let data = context.state.model
    axios.defaults.headers.common['Authorization'] = context.state.application.user.carinaToken
    axios.post(`${link}/c/postCognitiveModel/`, data).then(response => console.log(response.data)).catch(err => EventBus.$emit('errorMessage', { text: `Error al comunicarse con el servidor: ${err}`, title: 'Error de servidor', boolean: true }))
    context.state.application.createModel = false
    context.commit('changeStep', 'E')
    EventBus.$emit('init', 'E')
    let el = context.state.application.usingCM.steps['E'].data.find(el => el.to === '/UsingIA/palabraClave')
    context.commit('changeElements', {to: '/UsingIA/palabraClave', el: el, i: 'E'})
    // router.push('/UsingIA/palabraClave')
  },
  updateUser (context) {
    db.collection('users').doc(context.state.application.user.token).update(context.state.application.user)
  },
  updatingCognitiveModel (context) {
    db.collection('cognitiveModels').doc(context.state.application.currentCognitiveModel).update(context.state.model.contexto).then(updt => EventBus.$emit('loading', false))
    router.push('/UsingIA/palabraClave')
  },
  relationedWords (context, link) {
    axios.defaults.headers.common['Authorization'] = context.state.application.user.carinaToken
    axios.post(`${link}/c/relationedWords`, context.state.model).then(response => console.log(response.data)).catch(err => EventBus.$emit('errorMessage', { text: `Error al comunicarse con el servidor: ${err}`, title: 'Error de servidor', boolean: true }))
    router.push('/UsingIA/questions')
    EventBus.$emit('loading', false)
  },
  createRelations (context) {
    if (context.state.model.relaciones.length === 0) {
      try {
        context.state.model.contexto.palabrasClave.map(word => {
          let a = {
            palabraClave: word,
            temasDeInteres: []
          }
          context.state.model.relaciones.push(a)
        })
      } finally {
        EventBus.$emit('loading', false)
        let el = context.state.application.usingCM.steps['E'].data.find(el => el.to === '/UsingIA/temasDeInteres')
        context.commit('changeElements', {to: '/UsingIA/temasDeInteres', el: el, i: 'E'})
        // router.push('/UsingIA/temasDeInteres')
      }
    }
  },
  mode (context, mode) {
    if (mode === 'DEMO' && context.state.application.authenticated !== true) {
      EventBus.$emit('loading', true)
      try {
        db.collection('users').where('email', '==', 'superusuario@gmail.com').where('password', '==', 'superusuario').get().then((doc) => {
          if (doc.docs[0]) {
            let user = doc.docs[0]
            context.state.application.user = user.data()
            context.state.application.user.token = user.id
          } else {
            alert('no existe superusuario')
          }
        }).catch(error => alert('Error al verificar el usuario:', error))
      } catch (error) {
        console.error(error)
      } finally {
        context.commit('file', mode)
        context.commit('mode', mode)
      }
    } else {
      context.commit('file', mode)
      context.commit('mode', mode)
    }
  },
  loadCognitiveModel (context, id) {
    if (context.state.application.authenticated === true) {
      db.collection('cognitiveModels').doc(id).get().then(CognitiveModel => {
        console.log(CognitiveModel.id, CognitiveModel.data())
      }).catch(error => EventBus.$emit('errorMessage', { text: `Error al registrar el Modelo cognitivo: ${error}`, title: 'Error de registro deL Modelo', boolean: true }))
    }
    EventBus.$emit('loading', false)
  },
  deleteCM (context, id) {
    db.collection('cognitiveModels').doc(id).delete().then(() => {
      console.log('Document successfully deleted!')
      try {
        let cm = context.state.application.user.cms.find(cm => cm.id === id)
        let index = context.state.application.user.cms.indexOf(cm)
        context.commit('deleteCM', index)
      } catch (e) {
        console.log(e)
      }
      EventBus.$emit('loading', false)
    }).then(() => context.dispatch('updateUser')).catch((error) => {
      console.error('Error removing document: ', error)
    })
  },
  saveChanges (context) {
    context.dispatch('updateUser')
    EventBus.$emit('loading', false)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
