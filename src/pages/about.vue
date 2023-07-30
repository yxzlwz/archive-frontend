<script setup>
import { ref } from 'vue';
import { NH1, NH2 } from 'naive-ui';
import { Axios } from '@/plugins/axios';

const city = ref('');
Axios.get('https://ip.useragentinfo.com/json').then(
  res => (city.value = res.city)
);
</script>

<template>
  <div style="margin: 20px 100px">
    <n-h1>Hi, 欢迎你！</n-h1>
    <p>来自{{ city }}的朋友。</p>
    <n-h2>这是我们公益运营的一个互联网存档网站。</n-h2>
    <p>
      由于一些难以描述的原因，在我们这个国家，有一些网页总会在不知不觉中离我们远去。
    </p>
    <n-h2>有人说，这些网页违反了相关法律法规。</n-h2>
    <p>可是，从没有人告诉我们，这些法律法规是什么。</p>
    <p>更没有人向人民询问是否要立这样的法规。</p>
    <n-h2>再后来，留住这些网页，似乎便是犯罪。</n-h2>
    <p>他们要清除“错误”的历史记忆。</p>
    <p>这似乎是一个没有希望的世界。</p>
    <n-h2>所幸，我们所承受的伤痛，并非是人类所承受的。</n-h2>
    <p>世界上更多的人享受着远多于我们的自由。</p>
    <p>我不相信我们生来不如人。</p>
    <n-h2>人人生而平等，我相信希望也会降临这片土地。</n-h2>
    <p>到那一天，我们一定会团结坚定地走下去。</p>
    <n-h2>民主和自由不会只是别人的风景。</n-h2>
    <p>
      那么，在此之前，就让一个个与你现在所看到的这个网页类似的项目，将希望留在我们身边。
    </p>
    <n-h2>致敬每一位勇于奋斗的人。</n-h2>
    <p>如果在使用过程中遇到任何问题，请联系 mail@yixiangzhilv.com</p>
  </div>
</template>

<style scoped>
div {
  font-family: WebArchive;
}
p {
  font-size: 1rem;
}
</style>
