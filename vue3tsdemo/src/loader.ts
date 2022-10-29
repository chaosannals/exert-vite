import { kebabCase } from 'lodash';
import { App } from 'vue';

export default {
    install(app: App<Element>) {
        const components = import.meta.glob('./components/**/*.vue');
        for (const p of Object.keys(components)) {
            const m = p.match(/.\/components\/(.+)\.vue/);
            const n = kebabCase(m!.at(1));
            app.component(n, components[p]);
        }
    }
}