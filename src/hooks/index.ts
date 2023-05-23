import { ref, onMounted, onBeforeMount, onUnmounted } from 'vue';

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

// 监听滚动条事件hooks
export const useScroller = (visible?: boolean) => {
  const scrollRef = ref<any>();
  const scrollTop = ref<number>(0);

  onMounted(() => {
    // 监听滚动条滚动事件
    scrollRef.value?.wrapRef?.addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    // 卸载滚动条滚动事件
    scrollRef.value?.wrapRef.removeEventListener('scroll', onScroll);
  });

  // 滚动事件
  const onScroll = (e: any) => {
    scrollTop.value = e.target.scrollTop;
  };

  return { scrollRef, scrollTop };
};
