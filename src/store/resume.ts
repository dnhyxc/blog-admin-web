import { markRaw } from 'vue';
import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import {
  BaseInfo,
  SkillInfo,
  JobInfo,
  ProjectInfo,
  EducationInfo,
  SummaryInfo,
  ResumeElements,
  ResumeParams,
  HonorInfo,
  ResearchInfo,
  OtherExperiencesInfo,
  RESUME_TYPE,
} from '@/typings/comment';
import BaseInfoNode from '@/views/resume/make/UResume/BaseInfo/index.vue';
import SkillInfoNode from '@/views/resume/make/UResume/SkillInfo/index.vue';
import JobInfoNode from '@/views/resume/make/UResume/JobInfo/index.vue';
import ProjectInfoNode from '@/views/resume/make/UResume/ProjectInfo/index.vue';
import EducationInfoNode from '@/views/resume/make/UResume/EducationInfo/index.vue';
import SummaryInfoNode from '@/views/resume/make/UResume/SummaryInfo/index.vue';
import HonorInfoNode from '@/views/resume/make/UResume/HonorInfo/index.vue';
import ResearchInfoNode from '@/views/resume/make/UResume/ResearchInfo/index.vue';
import OtherExperiencesInfoNode from '@/views/resume/make/UResume/OtherExperiencesInfo/index.vue';
import CustomModuleInfoNode from '@/views/resume/make/UResume/CustomModuleInfo/index.vue';
import BaseInfoItem from '@/views/resume/make/UEditor/BaseInfo/index.vue';
import SkillInfoItem from '@/views/resume/make/UEditor/SkillInfo/index.vue';
import JobInfoItem from '@/views/resume/make/UEditor/JobInfo/index.vue';
import ProjectInfoItem from '@/views/resume/make/UEditor/ProjectInfo/index.vue';
import EducationInfoItem from '@/views/resume/make/UEditor/EducationInfo/index.vue';
import SummaryInfoItem from '@/views/resume/make/UEditor/SummaryInfo/index.vue';
import HonorInfoItem from '@/views/resume/make/UEditor/HonorInfo/index.vue';
import ResearchInfoItem from '@/views/resume/make/UEditor/ResearchInfo/index.vue';
import OtherExperiencesInfoItem from '@/views/resume/make/UEditor/OtherExperiencesInfo/index.vue';
import CustomModuleInfoItem from '@/views/resume/make/UEditor/CustomModuleInfo/index.vue';
import * as Service from '@/server';
import { normalizeResult } from '@/utils';

interface IProps {
  resumeInfo: {
    baseInfo: BaseInfo[];
    skillInfo: SkillInfo[];
    jobInfo: JobInfo[];
    projectInfo: ProjectInfo[];
    educationInfo: EducationInfo[];
    honorInfo?: HonorInfo[];
    researchInfo?: ResearchInfo[];
    otherExperiencesInfo?: OtherExperiencesInfo[];
    summaryInfo: SummaryInfo[];
  };
  // 当前选中的选项
  activeOption: string;
  elements: ResumeElements[];
  customModuleCount: number;
  resumeModules: {
    [key: string]: {
      element: any;
      formItem: any;
    };
  };
  customStyles: { [key: string]: string | number };
  pageNo: number;
  pageSize: number;
  total: number;
  resumeInfoList: ResumeParams[];
  loading: boolean | null;
  resumeCount: number;
}

const initCustomStyles = {
  fontSize: 14,
  lineHeight: 22,
  childTitleMarginTop: 4, // 子标题标题上边距
  titleMarginBottom: 10, // 标题下边距
  moduleMarginBottom: 15, // 每个模块的下边距
  theme: '#1e90ff', // 标题主题色 #8bc35a 089220
  titleColor: '#1e90ff', // 标题字体色
  baseLayoutType: '居左',
  baseViewType: '文字',
  titleStyle: 'left_border_underline',
  sidebarBgColor: '#1e90ff', // #235d3a - f5f5dc - rgb(29 116 206) rgb(29 116 206)
  sidebarTextColor: '#fff',
  linkColor: '#fff',
  type: 'default' as RESUME_TYPE, // speciality | doubleColumn | default
};

const initElements = [
  {
    key: 'baseInfo',
    title: '基本信息',
    element: markRaw(BaseInfoNode),
    formItem: markRaw(BaseInfoItem),
    sort: 1,
  },
  {
    key: 'skillInfo',
    title: '专业技能',
    element: markRaw(SkillInfoNode),
    formItem: markRaw(SkillInfoItem),
    sort: 2,
  },
  {
    key: 'jobInfo',
    title: '工作经历',
    element: markRaw(JobInfoNode),
    formItem: markRaw(JobInfoItem),
    sort: 3,
  },
  {
    key: 'projectInfo',
    title: '项目及作品',
    element: markRaw(ProjectInfoNode),
    formItem: markRaw(ProjectInfoItem),
    sort: 4,
  },
  {
    key: 'educationInfo',
    title: '教育经历',
    element: markRaw(EducationInfoNode),
    formItem: markRaw(EducationInfoItem),
    sort: 5,
  },
  {
    key: 'summaryInfo',
    title: '个人总结',
    element: markRaw(SummaryInfoNode),
    formItem: markRaw(SummaryInfoItem),
    sort: 6,
  },
];

const initResumeModules = {
  baseInfo: {
    element: markRaw(BaseInfoNode),
    formItem: markRaw(BaseInfoItem),
  },
  skillInfo: {
    element: markRaw(SkillInfoNode),
    formItem: markRaw(SkillInfoItem),
  },
  jobInfo: {
    element: markRaw(JobInfoNode),
    formItem: markRaw(JobInfoItem),
  },
  projectInfo: {
    element: markRaw(ProjectInfoNode),
    formItem: markRaw(ProjectInfoItem),
  },
  educationInfo: {
    element: markRaw(EducationInfoNode),
    formItem: markRaw(EducationInfoItem),
  },
  summaryInfo: {
    element: markRaw(SummaryInfoNode),
    formItem: markRaw(SummaryInfoItem),
  },
  honorInfo: {
    element: markRaw(HonorInfoNode),
    formItem: markRaw(HonorInfoItem),
  },
  researchInfo: {
    element: markRaw(ResearchInfoNode),
    formItem: markRaw(ResearchInfoItem),
  },
  otherExperiencesInfo: {
    element: markRaw(OtherExperiencesInfoNode),
    formItem: markRaw(OtherExperiencesInfoItem),
  },
  customModule: {
    element: markRaw(CustomModuleInfoNode),
    formItem: markRaw(CustomModuleInfoItem),
  },
};

const initResumeInfo = {
  baseInfo: [
    {
      label: 'avatar',
      key: '头像',
      value: '',
      icon: '',
    },
    {
      label: 'username',
      key: '姓名',
      value: 'dnhyxc',
      icon: '',
    },
    {
      label: 'phone',
      key: '手机号',
      value: '13812345678',
      icon: 'icon-dianhua',
    },
    {
      label: 'email',
      key: '邮箱',
      value: 'dnhyxc@gmail.com',
      icon: 'icon-youxiang5',
    },
    {
      label: 'address',
      key: '地址',
      value: '杭州市西湖区',
      icon: 'icon-dingwei',
    },
    {
      label: 'position',
      key: '职位',
      value: 'Web前端工程师',
      icon: 'icon-zhiwei',
    },
    {
      label: 'github',
      key: 'github',
      value: 'https://github.com/dnhyxc',
      icon: 'icon-github4',
    },
    {
      label: 'website',
      key: '个人网站',
      value: 'https://dnhyxc.cn',
      icon: 'icon-wangzhan1',
    },
  ],
  // 用户信息
  skillInfo: [
    {
      key: 1,
      title: '专业技能',
      description: '充分将你所掌握的技能列举出来吧', // 技能信息
    },
  ],
  jobInfo: [
    {
      key: 1, // 序号
      name: '腾讯', // 公司名称
      time: {
        start: 1691510400000,
        end: '至今',
      }, // 工作时间
      position: '前端开发工程师', // 职位名称
      description: '', // 工作描述
    },
    {
      key: 2, // 序号
      name: '字节跳动', // 公司名称
      time: {
        start: 1691683200000,
        end: '2022年10月',
      }, // 工作时间
      position: '前端开发工程师', // 职位名称
      description: '', // 工作描述
    },
  ], // 工作信息
  projectInfo: [
    {
      key: 1, // 序号
      name: '腾讯视频客户端', // 项目名称
      time: {
        start: 1691683200000,
        end: '2021年09月',
      }, // 项目时间
      position: '前端开发工程师',
      description: '',
    },
    {
      key: 2, // 序号
      name: '抖音内容推荐系统优化', // 项目名称
      time: {
        start: 1691683200000,
        end: '至今',
      }, // 项目时间
      position: '前端开发工程师',
      description: '',
    },
  ], // 项目信息
  educationInfo: [
    {
      key: 1, // 序号
      school: 'XX大学', // 学校名称
      time: {
        start: 1691683200000,
        end: '2019年06月',
      }, // 学历时间
      major: '计算机科学与技术', // 专业名称
      education: '本科', // 学历
      educationType: '全日制', // 学历类型
      city: '杭州', // 所在城市
      experience: '', // 在校经历
    },
  ], // 教育信息
  summaryInfo: [
    {
      key: 1,
      title: '个人总结',
      description: '在这里充分介绍一下自己吧',
    },
  ],
};

const initCustomModuleCount = 0;

const initActiveOption = '';

export const useResumeStore = defineStore('resume', {
  state: (): IProps => ({
    elements: initElements,
    resumeInfo: initResumeInfo,
    resumeModules: initResumeModules,
    customModuleCount: initCustomModuleCount,
    activeOption: initActiveOption,
    pageNo: 0,
    pageSize: 20,
    total: 0,
    resumeInfoList: [],
    customStyles: initCustomStyles,
    loading: null,
    resumeCount: 0,
  }),

  getters: {
    // 获取简历信息
    getBaseInfo(state) {
      return state.resumeInfo.baseInfo;
    },

    // 获取排序元素
    sortedElements(state) {
      state.elements.sort((a, b) => a.sort - b.sort);
      return state.elements;
    },

    getCloneElements(state) {
      return state.elements.map((item) => ({ ...item }));
    },
  },

  actions: {
    // 设置简历样式
    setCustomStyles(styles: { [key: string]: string | number }) {
      this.customStyles = {
        ...this.customStyles,
        ...styles,
      };
    },

    // 设置排序
    setSortFormItem(prev: { sort: number; title: string; key: string }, type: 'up' | 'down', index: number) {
      const findIndex = this.elements.findIndex((item) => item.key === prev.key);
      const next = type === 'up' ? this.elements[findIndex - 1] : this.elements[findIndex + 1];
      if (next) {
        const tempSort = prev.sort;
        prev.sort = next.sort;
        next.sort = tempSort;
      }
    },

    // 添加其他基础信息
    addOtherBase(base: Partial<BaseInfo>) {
      this.resumeInfo.baseInfo.push({
        label: base.label!,
        key: base.title!,
        sort: base.sort,
        value: '',
        icon: base.icon || '',
      });
    },

    // 删除添加的其他基础信息
    removeOtherBase(item: BaseInfo) {
      this.resumeInfo.baseInfo = this.resumeInfo.baseInfo.filter((i) => i.label !== item.label);
    },

    // 交换简历预览选项
    setResumeOption(prev: IProps['elements'][0], next: IProps['elements'][0]) {
      const prevIndex = this.elements.findIndex((item) => item.key === prev.key);
      const nextIndex = this.elements.findIndex((item) => item.key === next.key);
      const prevSort = this.elements[prevIndex];
      const nextSort = this.elements[nextIndex];
      if (prevSort && nextSort) {
        const tempSort = prevSort.sort;
        prevSort.sort = nextSort.sort;
        nextSort.sort = tempSort;
      }
    },

    // 删除选项
    removeSort(key: string) {
      this.elements = this.elements.filter((item) => item.key !== key);
    },

    addSkillInfo(key: string) {
      const module = this.resumeInfo[key as keyof typeof this.resumeInfo] as any[];
      this.resumeInfo[key as keyof typeof this.resumeInfo] = [
        ...module,
        {
          key: module.length + 1, // 序号
          title: '其他技能',
          description: '',
        },
      ];
    },

    addJobInfo(key: string) {
      const module = this.resumeInfo[key as keyof typeof this.resumeInfo] as any[];
      (this.resumeInfo[key as keyof typeof this.resumeInfo] as any[]) = [
        ...module,
        {
          key: module.length + 1, // 序号
          name: '', // 公司名称
          time: {
            start: '',
            end: '',
          }, // 工作时间
          position: '', // 职位名称
          description: '',
        },
      ];
    },

    addProjectInfo(key: string) {
      this.addJobInfo(key);
    },
    addEducationInfo(key: string) {
      const module = this.resumeInfo[key as keyof typeof this.resumeInfo] as any[];
      (this.resumeInfo[key as keyof typeof this.resumeInfo] as any[]) = [
        ...module,
        {
          key: module.length + 1, // 序号
          school: '', // 学校名称
          time: {
            start: '',
            end: '',
          }, // 学历时间
          major: '', // 专业名称
          education: '', // 学历
          educationType: '', // 学历类型
          city: '', // 所在城市
          experience: '', // 在校经历
        },
      ];
    },
    addSummaryInfo(key: string) {
      const module = this.resumeInfo[key as keyof typeof this.resumeInfo] as any[];
      (this.resumeInfo[key as keyof typeof this.resumeInfo] as any[]) = [
        ...module,
        {
          key: module.length + 1,
          title: '其他',
          description: '',
        },
      ];
    },
    addHonorInfo(key: string) {
      const module = this.resumeInfo[key as keyof typeof this.resumeInfo] as any[];
      (this.resumeInfo[key as keyof typeof this.resumeInfo] as any[]) = [
        ...module,
        {
          key: module.length + 1,
          name: '获得奖学金',
          time: 0,
        },
      ];
    },
    addResearchInfo(key: string) {
      const module = this.resumeInfo[key as keyof typeof this.resumeInfo] as any[];
      (this.resumeInfo[key as keyof typeof this.resumeInfo] as any[]) = [
        ...module,
        {
          key: module.length + 1,
          name: '',
          time: {
            start: '',
            end: '',
          },
          city: '',
          role: '',
          dept: '',
          description: '',
        },
      ];
    },

    addOtherExperiencesInfo(key: string) {
      this.addResearchInfo(key);
    },
    addCustomModuleInfo(key: string) {
      const module = this.resumeInfo[key as keyof typeof this.resumeInfo] as any[];
      (this.resumeInfo[key as keyof typeof this.resumeInfo] as any[]) = [
        ...module,
        {
          key: module.length + 1,
          name: '自定义名称',
          time: {
            start: '',
            end: '',
          },
          description: '',
        },
      ];
    },

    // 添加模块
    addModule(key: string) {
      this.activeOption = key;
      if (key.includes('customModuleInfo')) {
        this.addCustomModuleInfo(key);
      } else {
        const actions = {
          skillInfo: this.addSkillInfo,
          jobInfo: this.addJobInfo,
          projectInfo: this.addProjectInfo,
          educationInfo: this.addEducationInfo,
          summaryInfo: this.addSummaryInfo,
          honorInfo: this.addHonorInfo,
          researchInfo: this.addResearchInfo,
          otherExperiencesInfo: this.addOtherExperiencesInfo,
        } as Record<string, (key: string) => void>;
        actions[key]?.(key);
      }
    },

    // 交换新增模块的位置
    swapModule(key: string, prevIndex: number, type: string) {
      const module = this.resumeInfo[key as keyof typeof this.resumeInfo] as any[];
      const nextIndex = type === 'up' ? prevIndex - 1 : prevIndex + 1;
      if (prevIndex < 0 || nextIndex < 0 || prevIndex >= module.length || nextIndex >= module.length) return;
      [module[prevIndex], module[nextIndex]] = [module[nextIndex], module[prevIndex]];
    },

    // 删除module选项
    removeModule(key: string, delIndex: number) {
      const module = this.resumeInfo[key as keyof typeof this.resumeInfo] as any[];
      this.resumeInfo[key as keyof typeof this.resumeInfo] = module.filter((_, index) => index !== delIndex);
    },

    // 添加自定义模块
    addCustomModule(item: IProps['elements'][0]) {
      switch (item.key) {
        case 'honorInfo':
          this.elements.push({
            ...item,
            element: markRaw(HonorInfoNode),
            formItem: markRaw(HonorInfoItem),
          });
          this.resumeInfo.honorInfo = [
            {
              key: 1,
              name: '',
              time: 0,
            },
          ];
          break;
        case 'researchInfo':
          this.elements.push({
            ...item,
            element: markRaw(ResearchInfoNode),
            formItem: markRaw(ResearchInfoItem),
          });
          this.resumeInfo.researchInfo = [
            {
              key: 1,
              name: '',
              time: {
                start: '',
                end: '',
              },
              city: '',
              role: '',
              dept: '',
              description: '',
            },
          ];
          break;
        case 'otherExperiencesInfo':
          this.elements.push({
            ...item,
            element: markRaw(OtherExperiencesInfoNode),
            formItem: markRaw(OtherExperiencesInfoItem),
          });
          this.resumeInfo.otherExperiencesInfo = [
            {
              key: 1,
              name: '',
              time: {
                start: '',
                end: '',
              },
              city: '',
              role: '',
              dept: '',
              description: '',
            },
          ];
          break;
        case 'custom':
          this.customModuleCount += 1;
          this.elements.push({
            key: `customModuleInfo${this.customModuleCount}`,
            title: '自定义模块',
            element: markRaw(CustomModuleInfoNode),
            formItem: markRaw(CustomModuleInfoItem),
            sort: this.elements.length + 1,
          });
          (this.resumeInfo as any)[`customModuleInfo${this.customModuleCount}`] = [
            {
              key: 1,
              name: '自定义名称',
              time: {
                start: '',
                end: '',
              },
              description: '',
            },
          ];
          this.activeOption = `customModuleInfo${this.customModuleCount}`;
          break;

        default:
          this.elements.push({
            ...item,
            element: this.resumeModules[item.key].element,
            formItem: this.resumeModules[item.key].formItem,
          });
          break;
      }
      if (item.key !== 'custom') {
        this.activeOption = item.key;
      }
    },

    async saveResumeInfo(params: { coverUrl: string }) {
      try {
        const res = normalizeResult<string>(
          await Service.saveResumeInfo({
            resumeInfo: this.resumeInfo as any,
            elements: this.elements.map((i) => ({ key: i.key, sort: i.sort, title: i.title })),
            customModuleCount: this.customModuleCount,
            customStyles: this.customStyles,
            coverUrl: params.coverUrl,
          }),
        );
        this.loading = false;
        ElMessage({
          message: res.message,
          type: res.success ? 'success' : 'error',
        });
        return res.data;
      } catch (error) {
        ElMessage({
          message: '保存简历失败',
          type: 'error',
        });
        throw error;
      }
    },

    async updateResumeInfo({
      coverUrl,
      id,
      needMessage = true,
    }: {
      coverUrl: string;
      id: string;
      needMessage: boolean;
    }) {
      try {
        const res = normalizeResult<string>(
          await Service.updateResumeInfo({
            id,
            resumeInfo: this.resumeInfo as any,
            elements: this.elements.map((i) => ({ key: i.key, sort: i.sort, title: i.title })),
            customModuleCount: this.customModuleCount,
            customStyles: this.customStyles,
            coverUrl,
          }),
        );
        needMessage && (this.loading = false);
        needMessage &&
          ElMessage({
            message: res.message,
            type: res.success ? 'success' : 'error',
          });
      } catch (error) {
        ElMessage({
          message: '保存简历失败',
          type: 'error',
        });
        throw error;
      }
    },

    async deleteResumeInfo(id: string) {
      try {
        this.loading = true;
        const res = normalizeResult<string>(await Service.deleteResumeInfo({ id }));
        if (res.success) {
          this.clearResumeInfo();
          this.getResumeInfoList();
        }
        ElMessage({
          message: res.message,
          type: res.success ? 'success' : 'error',
        });
      } catch (error) {
        throw error;
      }
    },

    async getResumeInfo(id: string) {
      try {
        const res = normalizeResult<ResumeParams>(await Service.getResumeInfo({ id }));
        if (res.success) {
          this.resumeInfo = res.data.resumeInfo as any;
          this.customModuleCount = res.data.customModuleCount;
          this.elements = res.data.elements.map((i) => ({
            key: i.key,
            sort: i.sort,
            title: i.title,
            element: this.resumeModules?.[i.key]?.element || this.resumeModules.customModule.element,
            formItem: this.resumeModules?.[i.key]?.formItem || this.resumeModules.customModule.formItem,
          }));
          this.customStyles = res.data.customStyles;
        }
      } catch (error) {
        throw error;
      }
    },

    async getResumeInfoList() {
      if (this.resumeInfoList.length !== 0 && this.resumeInfoList.length >= this.total) return;
      this.pageNo = this.pageNo + 1;
      this.loading = true;
      const res = normalizeResult<{ list: ResumeParams[]; total: number }>(
        await Service.getResumeInfoList({ pageNo: this.pageNo, pageSize: this.pageSize }),
      );
      this.loading = false;
      if (res.success) {
        this.resumeInfoList = [...this.resumeInfoList, ...res.data.list];
        this.total = res.data.total;
        this.resumeCount = res.data.total;
      } else {
        ElMessage({
          message: res.message,
          type: res.success ? 'success' : 'error',
        });
      }
    },

    clearResumeInfo() {
      this.resumeInfoList = [];
      this.total = 0;
      this.pageNo = 0;
    },

    initResumeInfo() {
      this.elements = [
        {
          key: 'baseInfo',
          title: '基本信息',
          element: markRaw(BaseInfoNode),
          formItem: markRaw(BaseInfoItem),
          sort: 1,
        },
        {
          key: 'skillInfo',
          title: '专业技能',
          element: markRaw(SkillInfoNode),
          formItem: markRaw(SkillInfoItem),
          sort: 2,
        },
        {
          key: 'jobInfo',
          title: '工作经历',
          element: markRaw(JobInfoNode),
          formItem: markRaw(JobInfoItem),
          sort: 3,
        },
        {
          key: 'projectInfo',
          title: '项目及作品',
          element: markRaw(ProjectInfoNode),
          formItem: markRaw(ProjectInfoItem),
          sort: 4,
        },
        {
          key: 'educationInfo',
          title: '教育经历',
          element: markRaw(EducationInfoNode),
          formItem: markRaw(EducationInfoItem),
          sort: 5,
        },
        {
          key: 'summaryInfo',
          title: '个人总结',
          element: markRaw(SummaryInfoNode),
          formItem: markRaw(SummaryInfoItem),
          sort: 6,
        },
      ];
      this.resumeInfo = {
        baseInfo: [
          {
            label: 'avatar',
            key: '头像',
            value: '',
            icon: '',
          },
          {
            label: 'username',
            key: '姓名',
            value: 'dnhyxc',
            icon: '',
          },
          {
            label: 'phone',
            key: '手机号',
            value: '13812345678',
            icon: 'icon-dianhua',
          },
          {
            label: 'email',
            key: '邮箱',
            value: 'dnhyxc@gmail.com',
            icon: 'icon-youxiang5',
          },
          {
            label: 'address',
            key: '地址',
            value: '杭州市西湖区',
            icon: 'icon-dingwei',
          },
          {
            label: 'position',
            key: '职位',
            value: 'Web前端工程师',
            icon: 'icon-zhiwei',
          },
          {
            label: 'github',
            key: 'github',
            value: 'https://github.com/dnhyxc',
            icon: 'icon-github4',
          },
          {
            label: 'website',
            key: '个人网站',
            value: 'https://dnhyxc.cn',
            icon: 'icon-wangzhan1',
          },
        ],
        // 用户信息
        skillInfo: [
          {
            key: 1,
            title: '专业技能',
            description: '充分将你所掌握的技能列举出来吧', // 技能信息
          },
        ],
        jobInfo: [
          {
            key: 1, // 序号
            name: '腾讯', // 公司名称
            time: {
              start: 1691510400000,
              end: '至今',
            }, // 工作时间
            position: '前端开发工程师', // 职位名称
            description: '', // 工作描述
          },
          {
            key: 2, // 序号
            name: '字节跳动', // 公司名称
            time: {
              start: 1691683200000,
              end: '2022年10月',
            }, // 工作时间
            position: '前端开发工程师', // 职位名称
            description: '', // 工作描述
          },
        ], // 工作信息
        projectInfo: [
          {
            key: 1, // 序号
            name: '腾讯视频客户端', // 项目名称
            time: {
              start: 1691683200000,
              end: '2021年09月',
            }, // 项目时间
            position: '前端开发工程师',
            description: '',
          },
          {
            key: 2, // 序号
            name: '抖音内容推荐系统优化', // 项目名称
            time: {
              start: 1691683200000,
              end: '至今',
            }, // 项目时间
            position: '前端开发工程师',
            description: '',
          },
        ], // 项目信息
        educationInfo: [
          {
            key: 1, // 序号
            school: 'XX大学', // 学校名称
            time: {
              start: 1691683200000,
              end: '2019年06月',
            }, // 学历时间
            major: '计算机科学与技术', // 专业名称
            education: '本科', // 学历
            educationType: '全日制', // 学历类型
            city: '杭州', // 所在城市
            experience: '', // 在校经历
          },
        ], // 教育信息
        summaryInfo: [
          {
            key: 1,
            title: '个人总结',
            description: '在这里充分介绍一下自己吧',
          },
        ],
      };
      this.resumeModules = {
        baseInfo: {
          element: markRaw(BaseInfoNode),
          formItem: markRaw(BaseInfoItem),
        },
        skillInfo: {
          element: markRaw(SkillInfoNode),
          formItem: markRaw(SkillInfoItem),
        },
        jobInfo: {
          element: markRaw(JobInfoNode),
          formItem: markRaw(JobInfoItem),
        },
        projectInfo: {
          element: markRaw(ProjectInfoNode),
          formItem: markRaw(ProjectInfoItem),
        },
        educationInfo: {
          element: markRaw(EducationInfoNode),
          formItem: markRaw(EducationInfoItem),
        },
        summaryInfo: {
          element: markRaw(SummaryInfoNode),
          formItem: markRaw(SummaryInfoItem),
        },
        honorInfo: {
          element: markRaw(HonorInfoNode),
          formItem: markRaw(SummaryInfoItem),
        },
        researchInfo: {
          element: markRaw(ResearchInfoNode),
          formItem: markRaw(ResearchInfoItem),
        },
        otherExperiencesInfo: {
          element: markRaw(OtherExperiencesInfoNode),
          formItem: markRaw(OtherExperiencesInfoItem),
        },
        customModule: {
          element: markRaw(CustomModuleInfoNode),
          formItem: markRaw(CustomModuleInfoItem),
        },
      };
      this.customModuleCount = initCustomModuleCount;
      this.activeOption = initActiveOption;
    },

    initCustomStyles() {
      this.customStyles = initCustomStyles;
    },
  },
});
