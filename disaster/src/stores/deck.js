import { defineStore } from 'pinia'

export const useCardStore = defineStore('card', {
  state: () => {
    return {
      card: {
        name: '',
        description: '',
        image: ''
      }
    }
  },
  actions: {
    addName(name) {
      this.card.name = name
    },
    addDescription(description) {
      this.card.description = description
    }
  },
  getters: {}
})
