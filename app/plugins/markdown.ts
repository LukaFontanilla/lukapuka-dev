import TransitionHeader from "~/components/content/TransitionHeader.vue"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('transition-header', TransitionHeader)
})