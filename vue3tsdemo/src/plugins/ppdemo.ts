// pinia plugins demo
import {
    PiniaPluginContext,
    PiniaCustomProperties,
    PiniaCustomStateProperties,
} from 'pinia';
import { Ref } from 'vue';

declare module 'pinia' {
    export interface PiniaCustomProperties {
      // 通过使用一个 setter，我们可以允许字符串和引用。
      set hello(value: string | Ref<string>)
      get hello(): string

      set xxx(value: string | Ref<string>)
      get xxx(): string
  
      // 你也可以定义更简单的值
      simpleNumber: number
    }
    export interface DefineStoreOptionsBase<S, Store> {
        // 最好在选项上加上?，不然由于是必填，导致所有的 store 定义都会因为缺少参数而爆红。
        myParams?: any | null,
    }
  }

export function piniaPluginDemo(context: PiniaPluginContext): Partial<PiniaCustomProperties & PiniaCustomStateProperties> | void {
    // 插件内的修改添加不会触发监听的 $subscript ，因为插件先于 store 被激活。

    // 拿到 myParams 的这种自定义参数。
    console.log('ppd options:', context.options);

    if (context.store.count === 0) {
        context.store.count = 100;
    }

    // 调试模式下非返回值需要自己添加 customProperties 的标记上。
    // ts 这种做法会导致ts 类型上判定不出来，毕竟是这么动态就给加上个字段的。
    // PiniaCustomProperties 的类型声明可以添加类型。
    context.store.xxx = 'yyy';
    if (process.env.NODE_ENV === 'development') {
        // 如果不添加此句，devtools 没办法帮助你调试，但是实际上 xxx 还是会给赋值，是可以用的。
        context.store._customProperties.add('xxx');
    }

    // 返回值会直接附加到所有 store 上
    return {
        hello: 'world',
    };
}