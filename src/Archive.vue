<script setup>
import { ref, onMounted } from 'vue';
import {
  NButton,
  NTabs,
  NTabPane,
  NDivider,
  NInput,
  NCheckbox,
  NImage,
  useMessage,
} from 'naive-ui';
import store from './plugins/store';
const message = useMessage();

const archiveConfig = ref({
  url: '',
  lazyload: true,
  optimize: true,
});
const submitUrl = () => {
  fetch('/api/create/', {
    method: 'POST',
    body: JSON.stringify(archiveConfig.value),
  })
    .then(res => res.json())
    .then(res => {
      if (res.status === 'success') {
        message.success('提交成功');
      } else {
        message.error('提交失败');
      }
    });
};
const checkUrl = ref(''),
  data = ref({});
const getUrl = () => {
  fetch('/api/get/?url=' + btoa(checkUrl.value))
    .then(res => res.json())
    .then(res => {
      if (res.status === 'success') {
        data.value = res;
      } else if (res.status === 'error') {
        message.error(res.message);
      } else {
        message.error('查询失败');
      }
    });
};

onMounted(() => {
  if (location.href.includes('url=')) {
    checkUrl.value = atob(location.href.split('url=')[1]);
    getUrl();
  }
});
</script>

<template>
  <div class="submit-url">
    <n-input
      v-model:value="archiveConfig.url"
      type="text"
      placeholder="请输入要存档的URL"
    />
    <n-checkbox v-model:checked="archiveConfig.lazyload">
      处理懒加载
    </n-checkbox>
    <n-checkbox v-model:checked="archiveConfig.optimize"> 优化网页 </n-checkbox>
    <n-button type="primary" @click="submitUrl"> 存档 </n-button>
  </div>
  <n-divider />
  <div class="submit-url">
    <n-input
      v-model:value="checkUrl"
      type="text"
      placeholder="请输入要查询的URL"
    />
    <n-button type="primary" @click="getUrl"> 查询 </n-button>
  </div>
  <n-tabs
    type="line"
    animated
    style="margin: 50px"
    default-value="show:lazy"
    v-show="data.url"
  >
    <n-tab-pane name="images" tab="图片">
      <n-image v-for="i in data.images" :src="i" />
    </n-tab-pane>
    <n-tab-pane name="pdfs" tab="PDF">
      <iframe v-for="i in data.pdfs" :src="i" />
    </n-tab-pane>
  </n-tabs>
</template>

<style lang="scss">
.submit-url {
  width: 100%;
  text-align: center;
  .n-input {
    text-align: left;
    width: 60%;
    margin-right: 10px;
  }
}
.n-image {
  justify-content: center;
  width: 100%;
  img {
    width: 60vw !important;
    margin: auto;
  }
}
iframe {
  width: 90vw;
  height: 90vh;
}
</style>
