// フレームワーク
import '../css/style.css';
import '../css/NProgress.css';

import './bootstrap';

// アプリの作成
import { createApp, h } from 'vue';
import { createInertiaApp, Head, Link } from '@inertiajs/vue3';

// エクストラ
import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy-bundle.umd.min.js';
import '@popperjs/core/dist/umd/popper.min.js';


const appName = 'Netisu';
createInertiaApp({
    progress: {includeCSS: true, showSpinner: false,},
    title: (title) => `${title} - ${appName}`,
    resolve: name => require(`./Pages/${name}`),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
	    .use(VueTippy)
            .use(plugin)
            .component('Head', Head)
            .component('Link', Link)
            .mount(el);
    },
});

