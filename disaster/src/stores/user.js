import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'store',
  state: () => ({
    currentUser: null,
    token: null
  }),
  actions: {
    async login(username, password) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }
      try {
        const res = await fetch('http://localhost:8000/login', requestOptions)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = res.json()
        this.currentUser = data.username
        this.token = data.token
        console.log('success!!')
      } catch (error) {
        console.error('problem', error)
      }
    },
    async auth() {
      const requestOptions = {
        method: 'GET',
        headers: { Authorization: `Bearer ${this.token}` }
      }
      try {
        const res = await fetch('http://localhost:8000/protected', requestOptions)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
      } catch (error) {
        console.error('problem', error)
      }
    },
    logout() {
      this.currentUser = null
    }
  }
})
