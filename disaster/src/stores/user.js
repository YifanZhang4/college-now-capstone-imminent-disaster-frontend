import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'store',
  state: () => ({
    currentUser: null,
    token: null,
    isAuthenticated: false
  }),
  actions: {
    async register(username, password) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
      }

      try {
        const res = await fetch('http://localhost:8000/register', requestOptions)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        console.log('success!!')
      } catch (error) {
        console.error('problem', error)
      }
    },
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
        const data = await res.json()
        this.currentUser = data.user
        this.token = data.token
        console.log(this.token)
        console.log('success!!')
      } catch (error) {
        console.error('problem', error)
      }
    },
    async auth() {
      if (this.token === null) {
        console.log('null token')
      } else {
        console.log('auth', this.token)
        const requestOptions = {
          method: 'GET',
          headers: { Authorization: `Bearer ${this.token}` }
        }
        try {
          const res = await fetch('http://localhost:8000/protected', requestOptions)
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          this.isAuthenticated = true
        } catch (error) {
          console.error('problem', error)
          this.isAuthenticated = false
        }
      }
    },
    logout() {
      this.currentUser = null
      this.token = null
      this.isAuthenticated = false
    }
  }
})
