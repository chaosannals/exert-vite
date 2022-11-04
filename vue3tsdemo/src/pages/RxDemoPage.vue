<template>
    <div class="rx-demo-page">
        <div>{{ data.intervalCount }}</div>
        <button @click="onClickThrottleTime">throttleTime: {{ data.throttleTimeCount }}</button>
        <button @click="onClickWindowCount">Window Count: {{ data.windowCountCount }}</button>
        <button @click="onClickWindowToggle">Window Toggle: {{ data.windowToggleCount }}</button>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import {
    Observable,
    Subscriber,
    map,
    interval,
    windowCount,
    windowToggle,
    merge,
    skip,
    from,
    throttleTime,
    debounceTime,
    mergeAll,
    empty,
    Subject,
    mapTo,
} from 'rxjs';


const data = reactive({
    intervalCount: 0,

    throttleTimeCount: 0,

    windowCountCount: 0,
    windowCountClickCount: 0,

    windowToggleCount: 0,
    windowToggle: false,
});

// from([1, 2, 3, 4, 5]) 直接提供一个数组的数据流出来，一次性产生数组个数的事件。
// 这个感觉没什么用，只是用来测试的时候提供一个固定的数据流。。。

// Observable 数据提供源
//  interval 每隔 x 时间提供一次数据。
interval(1000)
    .subscribe(x => {
        data.intervalCount = x;
        console.log('interval x:', x, new Date().getTime());
    });

// throttleTime =============================================================== 
let throttleTimeSr: any = null;
new Observable(sr => throttleTimeSr = sr)
    .pipe(throttleTime(1000)) // 过滤，无论多少个，只要在设定时间内提供的，都只让过1个。
    .subscribe(x => {
        console.log('throttleTime ob:', x, new Date().getTime());
        data.throttleTimeCount++;
    });

const onClickThrottleTime = () => {
    throttleTimeSr.next();
    console.log('on click throttleTime');
};

// windowsCount =========================================================
let windowCountObr: Subscriber<number> | null = null;
new Observable<number>(ob => {
    windowCountObr = ob;
})
    // .pipe(windowCount(1, 3)) // 3 个只过 1个
    .pipe(windowCount(2, 3)) // 3 个只过 2个
    .pipe(mergeAll())
    .subscribe(b => {
        console.log('on window count sub', b);
        data.windowCountCount = b;
    });

const onClickWindowCount = () => {
    data.windowCountClickCount++;
    console.log('on click window count:', data.windowCountClickCount);
    windowCountObr?.next(data.windowCountCount + 1);
}

// windowToggle ===============================================================
const windowToggleInterval = interval(1000).pipe(map(() => 1));
const windowToggleOn = new Subject<void>();
const windowToggleOff = new Subject<void>();
windowToggleOn
    .pipe(map(() => true))
    .subscribe(i => {
        data.windowToggle = i;
        console.log('window toggle on', i);
    });
windowToggleOff
    .pipe(map(() => false))
    .subscribe(i => {
        data.windowToggle = i;
        console.log('window toggle off', i);
    });
windowToggleInterval.pipe(
    // windowToggleOn 执行 next 就会触发，使得管道开通。与 windowToggleOn 返回值无关。
    // 由提供函数提供的 windowToggleOff next 被触发，就会使得管道关闭。与 windowToggleOff 返回值无关。
    windowToggle(windowToggleOn, i => {
        console.log('window toggle switch', i)
        return windowToggleOff;
    })
    , mergeAll())
    .subscribe(i => {
        // 管道的值在关闭时被直接丢弃的。
        // interval 返回的值 i 递增，所以即使值被丢弃了，仍然可以知道 i 是第几个。
        // interval 通过 map 改变值，采用叠加方式。
        console.log('on window toggle tick');
        data.windowToggleCount += i;
    });

const onClickWindowToggle = () => {
    console.log('on click window toggle', data.windowToggle);
    if (data.windowToggle) {
        windowToggleOff.next();
    } else {
        windowToggleOn.next();
    }
};

</script>

<style lang="scss" scoped>
.rx-demo-page {
    width: 100%;
    height: 100%;
}
</style>