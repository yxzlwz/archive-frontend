<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { NButton, NInput, NCheckbox, NSpace } from 'naive-ui';
import { Axios } from '@/plugins/axios';

const archiveConfig = ref({
  url: '',
  lazyload: true,
  optimize: true,
});
const disable = ref(false);

const submit = () => {
  if (archiveConfig.value.url.indexOf('http') !== 0) {
    archiveConfig.value.url = 'http://' + archiveConfig.value.url;
  }
  disable.value = true;
  Axios.post('/page/', archiveConfig.value)
    .then(res => {
      if (res.status === 'success') {
        message.success('提交成功，正在处理中...');
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
