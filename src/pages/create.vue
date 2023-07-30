<script setup>
import { ref } from 'vue';
import {
  NButton,
  NInput,
  NCheckbox,
  NSpace,
  NModal,
  NCard,
  NSpin,
} from 'naive-ui';
import { Axios } from '@/plugins/axios';
import router from '../router';

const archiveConfig = ref({
  url: '',
  lazyload: true,
  optimize: true,
});
const disable = ref(false),
  waiting = ref(false);
let id, interval;
const check = () => {
  Axios.get(`/page/${id}/check/`).then(res => {
    if (res.status === 'success') {
      clearInterval(interval);
      router.push(`/detail/${id}`);
    }
  });
};
const submit = () => {
  if (archiveConfig.value.url.indexOf('http') !== 0) {
    archiveConfig.value.url = 'http://' + archiveConfig.value.url;
  }
  disable.value = true;
  Axios.post('/page/', archiveConfig.value)
    .then(res => {
      if (res.status === 'success') {
        waiting.value = true;
        id = res.id;
        interval = setInterval(check, 5000);
      }
    })
    .catch(err => {
      disable.value = false;
    });
};
</script>

<template>
  <div class="submit-url">
    <n-input
      v-model:value="archiveConfig.url"
      type="text"
      size="large"
      placeholder="请输入要存档的URL"
      round
    />
    <n-space size="large">
      <n-checkbox v-model:checked="archiveConfig.lazyload" size="large">
        处理懒加载
      </n-checkbox>
      <n-checkbox v-model:checked="archiveConfig.optimize" size="large">
        启用针对性优化
      </n-checkbox>
    </n-space>
    <n-button
      type="primary"
      @click="submit"
      size="large"
      :disabled="disable || !archiveConfig.url"
    >
      存档
    </n-button>
  </div>

  <n-modal v-model:show="waiting" :mask-closable="false">
    <n-card
      style="width: 50vw; text-align: center"
      title="正在存档内容，请稍后..."
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-spin show>
        <template #description>
          你可以随时离开此界面；若2分钟未跳转请检查列表或重新提交
        </template>
      </n-spin>
    </n-card>
  </n-modal>
</template>

<style lang="scss">
.submit-url {
  width: 100%;
  .n-input {
    margin-bottom: 30px;
  }
  .n-space {
    margin-bottom: 30px;
  }
}
</style>
