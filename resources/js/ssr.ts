import "./bootstrap"
import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { createInertiaApp } from '@inertiajs/vue3';

export default function render(page) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: name => require(`./Pages/${name}`),
    setup({ app, props, plugin }) {
      return createSSRApp({
        render: () => h(app, props),
      }).use(plugin);
    },
  });
}
