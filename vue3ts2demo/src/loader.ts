import { camelCase, upperFirst } from 'lodash';
import { App, defineAsyncComponent, AsyncComponentLoader } from 'vue';

export default {
    install(app: App<Element>) {
        const components = import.meta.glob('./components/**/*.vue');
        for (const p of Object.keys(components)) {
            const m = p.match(/.\/components\/(.+)\.vue/);
            const n = upperFirst(camelCase(m!.at(1)));
            console.log(n, components[p], p);
            app.component(n, defineAsyncComponent(components[p] as AsyncComponentLoader));
        }
    }
}