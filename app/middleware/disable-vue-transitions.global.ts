export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server || !document.startViewTransition) {
    return
  }

  // Disable built-in Vue transitions when native View Transitions API is supported and active
  to.meta.pageTransition = false
  to.meta.layoutTransition = false
})
