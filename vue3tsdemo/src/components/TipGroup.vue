<template>
    <div class="tip-group">
        <div v-for="(t, i) in tips" :key="i" class="tip-box">
            <span>{{ t.text }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const data = reactive({
    latestTipTime: null as number | null,
});

const tips = ref([] as Array<{
    text: string,
    timeEnd: number,
}>);

const tick = () => {
    const now = (new Date).getTime();
    if (data.latestTipTime != null && data.latestTipTime > now) {
        setTimeout(tick, 1000);
    } else {
        data.latestTipTime = null;
    }
    tips.value = tips.value.filter(i => {
        return i.timeEnd > now;
    });
}

const addTip = (text: string, duration: number) => {
    const timeEnd = (new Date()).getTime() + duration * 1000;
    tips.value = [...tips.value, {
        text: text,
        timeEnd: timeEnd,
    }];
    if (data.latestTipTime == null || data.latestTipTime < timeEnd) {
        data.latestTipTime = timeEnd;
        tick();
    }
}

defineExpose({
    addTip,
});
</script>

<style lang="scss" scoped>
.tip-group {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 100;
}

.tip-box {
    color: white;
    font-size: 2.6667vw;
    border-radius: .6667vw;
    background: #4488dd22;
    margin: 0.667vw;
    padding: .6667vw;
}
</style>