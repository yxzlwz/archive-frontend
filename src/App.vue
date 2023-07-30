<script setup>
import {
  NMessageProvider,
  NGlobalStyle,
  NLayout,
  NButton,
  NLayoutHeader,
  NLayoutContent,
  NConfigProvider,
  darkTheme,
  zhCN,
  dateZhCN,
} from 'naive-ui';
import store from './plugins/store';
import NaiveMessage from './plugins/NaiveMessage.vue';
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="store.state.theme === 'dark' ? darkTheme : null"
  >
    <n-message-provider>
      <n-global-style />
      <NaiveMessage />
      <n-layout style="min-height: 100vh">
        <n-layout-header bordered>
          <router-link to="/">
            <h2 id="page-title">网页存档</h2>
          </router-link>
          <n-button
            quaternary
            @click="store.commit('changeTheme')"
            id="change-theme"
          >
            {{ store.state.theme === 'dark' ? '浅色' : '深色' }}
          </n-button>
        </n-layout-header>
        <n-layout-content content-style="padding: 24px 3vw;">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped lang="scss">
.n-layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  #page-title {
    display: inline-block;
    color: var(--n-text-color);
  }
  #change-theme {
    float: right;
  }
}
</style>
