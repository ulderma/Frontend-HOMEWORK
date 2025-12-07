import { defineStore } from 'pinia';
import { MLTopic } from '@/types';

const initialTopics: MLTopic[] = [
  { id: 1, name: 'Градиентный спуск', slug: 'gradient-descent' },
  { id: 2, name: 'Обучение без учителя', slug: 'unsupervised-learning' },
  { id: 3, name: 'Классификация', slug: 'classification' },
];

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
    results: [] as MLTopic[],
  }),
  getters: {
    filteredTopics(state): MLTopic[] {
      if (!state.query.trim()) return initialTopics;
      const lowerQuery = state.query.toLowerCase();
      return initialTopics.filter((topic) =>
        topic.name.toLowerCase().includes(lowerQuery)
      );
    },
  },
  actions: {
    setQuery(newQuery: string) {
      this.query = newQuery;
    },
    search() {
      this.results = this.filteredTopics;
    },
  },
});