<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Axios } from '@/plugins/axios';
import {
  NCollapse,
  NCollapseItem,
  NImage,
  NTable,
  NTime,
  NH2,
  NDivider,
  NButton,
  NEllipsis,
} from 'naive-ui';

const route = useRoute();
const id = route.params.id;
const data = ref({});

Axios.get(`/page/${id}/`).then(res => {
  data.value = res;
});

const _ = value => {
  switch (value) {
    case true:
      return '是';
    case false:
      return '否';
    case null:
      return '-';
    case undefined:
      return '-';
    default:
      return value;
  }
};
</script>

<template>
  <n-h2 style="display: flex">
    {{ data.title }}
    <a :href="data.url" target="_blank">
      <n-button type="primary" size="small" style="margin-left: 15px">
        原文链接
      </n-button>
    </a>
  </n-h2>

  <n-divider />

  <n-collapse>
    <n-collapse-item title="用户配置" name="1">
      <n-table :single-line="false">
        <thead>
          <tr>
            <th>处理懒加载</th>
            <th>启用针对性优化</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ _(data.crawl_task.config.lazyload) }}</td>
            <td>{{ _(data.crawl_task.config.optimize) }}</td>
          </tr>
        </tbody>
      </n-table>
    </n-collapse-item>
    <n-collapse-item title="爬取详情" name="2">
      <n-table :single-line="false">
        <thead>
          <tr>
            <th>爬取完成时间</th>
            <th>代理</th>
            <th>爬取引擎</th>
            <th>真实URL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <n-time
                :time="new Date(data.crawl_task.crawled_at)"
                format="yyyy-MM-dd hh:mm:ss"
              />
            </td>
            <td>{{ _(data.crawl_task.detail.proxy) }}</td>
            <td>{{ _(data.crawl_task.detail.engine) }}</td>
            <td>
              <n-ellipsis style="max-width: 20vw">
                <a :href="data.crawl_task.detail.genuine_url" target="_blank">
                  {{ _(data.crawl_task.detail.genuine_url) }}
                </a>
                <template #tooltip>
                  <div style="text-align: center">
                    {{ _(data.crawl_task.detail.genuine_url) }}
                  </div>
                </template>
              </n-ellipsis>
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-collapse-item>
    <n-collapse-item title="截图" name="3">
      <n-image v-for="i in data.images" :src="i" />
    </n-collapse-item>
    <n-collapse-item title="PDF" name="4">
      <iframe v-for="i in data.pdfs" :src="i" />
    </n-collapse-item>
  </n-collapse>
</template>

<style scoped lang="scss">
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
a {
  color: var(--n-text-color);
  text-decoration: none;
}
</style>
