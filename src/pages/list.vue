<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import {
  NButton,
  NInput,
  NTable,
  NTime,
  NRadioGroup,
  NRadioButton,
  NDivider,
  NEllipsis,
  NPagination,
  NSpin,
} from 'naive-ui';
import { Axios } from '@/plugins/axios';

const searchText = ref('');
const searchBy = ref('url');

const data = ref([]);
const pagination = ref({ page: 1, count: 0 }),
  loading = ref(false);
const search = () => {
  const params = { page: pagination.value.page };
  params[searchBy.value] = searchText.value;
  loading.value = true;
  Axios.get('/page/', {
    params,
  }).then(response => {
    data.value = response.results;
    pagination.value.count = response.count;
    loading.value = false;
  });
};
search();
</script>

<template>
  <div style="line-height: 3.5em">
    <n-input
      v-model:value="searchText"
      type="text"
      size="large"
      style="width: 50%; margin-right: 10px"
      placeholder="请输入查询关键字"
      @keydown.enter="search"
    />
    <n-radio-group
      v-model:value="searchBy"
      size="large"
      style="margin-right: 10px"
    >
      <n-radio-button value="url" label="URL" />
      <n-radio-button value="title" label="标题" />
    </n-radio-group>
    <n-button type="success" size="large" @click="search"> 搜搜看 </n-button>
  </div>

  <n-divider style="margin: 30px 0" />

  <n-spin :show="loading">
    <n-table :single-line="false" style="margin-bottom: 30px">
      <thead>
        <tr>
          <!-- <th>缩略图</th> -->
          <th>标题</th>
          <th>URL</th>
          <th>创建时间</th>
          <th>详情</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="page in data" :key="page.id">
          <!-- <td>
          <img class="cover" :src="page.cover" />
        </td> -->
          <td>
            <n-ellipsis style="max-width: 20vw">
              {{ page.title }}
              <template #tooltip>
                <div style="text-align: center">
                  {{ page.title }}
                </div>
              </template>
            </n-ellipsis>
          </td>
          <td>
            <n-ellipsis style="max-width: 20vw">
              <a :href="page.url" target="_blank"> {{ page.url }}</a>
              <template #tooltip>
                <div style="text-align: center">{{ page.url }}</div>
              </template>
            </n-ellipsis>
          </td>
          <td>
            <n-time
              :time="new Date(page.created_at)"
              format="yyyy-MM-dd hh:mm:ss"
            />
          </td>
          <td>
            <router-link :to="`/detail/${page.id}`">
              <n-button type="primary">前往</n-button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-spin>
  <n-pagination
    v-model:page="pagination.page"
    :item-count="pagination.count"
    @update:page="search"
  />
</template>

<style scoped lang="scss">
.cover {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
a {
  color: black;
  text-decoration: none;
}
</style>
