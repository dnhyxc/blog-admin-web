import { ref, onMounted, onBeforeMount } from 'vue';

export const useWindowScroll = (dom: HTMLDivElement) => {
  const y = ref(0);

  const onScroll = () => {
    y.value = dom.scrollTop;
    console.log(y.value, 'aaaaa');
  };

  onMounted(() => {
    console.log(dom, 'dom');

    window.addEventListener('scroll', onScroll, true);
  });

  onBeforeMount(() => {
    window.removeEventListener('scroll', onScroll);
  });

  return {
    scrollTop: y.value,
  };
};
