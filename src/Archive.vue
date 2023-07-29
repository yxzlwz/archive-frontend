<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import {
  NButton,
  NTabs,
  NTabPane,
  NDivider,
  NInput,
  NCheckbox,
  NImage,
  useMessage,
  NAutoComplete,
} from 'naive-ui';
import store from './plugins/store';
import { Axios } from './plugins/axios';
const message = useMessage();
window.message = message;

const archiveConfig = ref({
  url: '',
  lazyload: true,
  optimize: true,
});
const submitUrl = () => {
  if (archiveConfig.value.url.indexOf('http') !== 0) {
    archiveConfig.value.url = 'http://' + archiveConfig.value.url;
  }
  Axios.post('/create/', archiveConfig.value).then(res => {
    if (res.status === 'success') {
      message.success('提交成功');
    }
  });
};

const checkUrl = ref(''),
  data = ref({});
const searchList = ref([]);
let searching = null;
const doSearch = () => {
  Axios.get('/search/', {
    params: { key: checkUrl.value },
  }).then(response => {
    const data = response.by_title.concat(response.by_url);
    const res = [];
    for (const i of data) {
      res.push({
        label: `${i.title} | ${i.url}`,
        value: i.id,
      });
    }
    searchList.value = res;
  });
};
watch(checkUrl, () => {
  if (searching) {
    clearTimeout(searching);
  }
  searching = setTimeout(doSearch, 500);
});
const getUrl = () => {
  clearTimeout(searching);
  setTimeout(() => {
    if (checkUrl.value.includes(' | ')) {
      checkUrl.value = checkUrl.value.split(' | ')[1];
    }
    if (checkUrl.value.indexOf('http') !== 0) {
      checkUrl.value = 'http://' + checkUrl.value;
    }
    checkUrl.value = checkUrl.value.trim();
    setTimeout(() => {
      clearTimeout(searching);
    }, 100);
    Axios.get('/get/', { params: { url: checkUrl.value } }).then(res => {
      data.value = res;
    });
  }, 100);
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
    <div class="config">
      <n-checkbox v-model:checked="archiveConfig.lazyload">
        处理懒加载
      </n-checkbox>
      <n-checkbox v-model:checked="archiveConfig.optimize">
        启用针对性优化
      </n-checkbox>
    </div>
    <n-button type="primary" @click="submitUrl"> 存档 </n-button>
  </div>
  <n-divider />
  <div class="check-url">
    <n-auto-complete
      v-model:value="checkUrl"
      :input-props="{
        autocomplete: 'disabled',
      }"
      :options="searchList"
      placeholder="请输入要查询的URL"
      @select="getUrl"
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
  .n-input {
    margin-bottom: 10px;
  }
  .config {
    margin-bottom: 10px;
  }
}
.check-url {
  width: 100%;
  .n-input {
    margin-bottom: 10px;
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
