// src/types.ts

/**
 * Интерфейс для категории ML-темы
 */
export interface MLTopic {
  id: number; // Уникальный идентификатор
  name: string; // Название темы (например, "Градиентный спуск")
  slug: string; // Человекочитаемый URL (например, "gradient-descent")
}

/**
 * Интерфейс для состояния поиска
 */
export interface SearchState {
  query: string; // Текущий поисковый запрос
  results: MLTopic[]; // Результаты поиска (можно расширить позже)
  isSearching: boolean; // Флаг, показывающий, идет ли поиск
}