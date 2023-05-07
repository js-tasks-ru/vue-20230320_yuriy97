import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {

  const addDefaultContainer = () => document.body.appendChild(document.createElement('div'));
  const topProgressBarInstance = createApp(TheTopProgressBar).mount(container ?? addDefaultContainer());

  const topProgressBar = {

    start: topProgressBarInstance.start,
    finish: topProgressBarInstance.finish,
    fail: topProgressBarInstance.fail,

    install(app) {
      app.provide(PROGRESS_KEY, topProgressBar);
    },
  };

  if (router) {

    router.beforeEach(topProgressBar.start);

    router.afterEach(topProgressBar.finish);

    router.onError(topProgressBar.fail)
  }

  return topProgressBar;
}
