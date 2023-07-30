<script setup>
import { ref } from 'vue';
import { NButton, NGradientText, NSpace } from 'naive-ui';
import { Axios } from '@/plugins/axios';

const yiyan = ref('');
const color = ['primary', 'info', 'error', 'warning', 'success'].sort(
  () => Math.random() - 0.5
);

Axios.get('https://api.yixiangzhilv.com/yiyan/sentence/get/').then(res => {
  if (res.provenance && res.author) {
    res.from_show = `${res.provenance} · ${res.author}`;
  } else {
    res.from_show = `${res.provenance || res.author}`;
  }
  yiyan.value = `${res.content} - 「 ${res.from_show} 」`;
});
</script>

<template>
  <n-gradient-text id="welcome" :type="color[0]">
    Hi, 想做点什么？
  </n-gradient-text>

  <n-space justify="center" :size="30">
    <router-link to="/create">
      <n-button strong round size="large" :type="color[1]"> 去存档 </n-button>
    </router-link>
    <router-link to="/list">
      <n-button strong round size="large" :type="color[2]"> 看一看 </n-button>
    </router-link>
    <router-link to="/about">
      <n-button strong round size="large" :type="color[3]"> 你们是? </n-button>
    </router-link>
  </n-space>

  <n-gradient-text
    id="yiyan"
    :type="color[4]"
    :style="{ transition: 'all 0.5s', opacity: yiyan ? 1 : 0 }"
  >
    {{ yiyan }}
  </n-gradient-text>
</template>

<style lang="scss">
#welcome {
  margin-top: 100px;
  margin-bottom: 100px;
  font-weight: bold;
  font-size: 2.3em;
  display: block;
  text-align: center;
  width: 100%;
  user-select: none;
}

.n-space {
  margin-bottom: 100px;
}

#yiyan {
  user-select: none;
  font-size: 1.2em;
  display: block;
  text-align: center;
}
</style>
