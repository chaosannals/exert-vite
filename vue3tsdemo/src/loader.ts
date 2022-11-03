import { kebabCase } from 'lodash';
import { App, defineAsyncComponent, AsyncComponentLoader } from 'vue';

export default {
    // 自动加载组件
    // setup 模式下，不要命名变量的名字和组件名类似，比如 tip-group 组件，那么不要出现 tipGroup TipGroup 这样的变量名。
    // 不然在编译阶段会直接被变量给替代了，而且没有任何编译错误提示，直接运行时错误。
    install(app: App<Element>) {
        const components = import.meta.glob('./components/**/*.vue');
        for (const p of Object.keys(components)) {
            const m = p.match(/.\/components\/(.+)\.vue/);
            const kn = kebabCase(m!.at(1));
            const c = defineAsyncComponent(components[p] as AsyncComponentLoader);
            app.component(kn, c);
        }
    }
}