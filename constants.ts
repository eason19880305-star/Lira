import { ResumeData } from './types';

// Initial state based on the provided high-quality Java Backend example
export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: "张工科",
    jobIntention: "Java后端开发工程师",
    phone: "138-xxxx-xxxx",
    email: "zhang.gongke@example.com",
    location: "北京",
    photoUrl: "https://picsum.photos/300/400", // 3:4 Placeholder
    github: "github.com/zhanggongke",
    blog: "juejin.cn/user/zhanggongke",
  },
  sectionOrder: ['education', 'skills', 'internships', 'projects'],
  education: [
    {
      id: "edu1",
      school: "XXX大学 (985/211)",
      degree: "计算机科学与技术 硕士",
      college: "计算机学院",
      startDate: "2022-09",
      endDate: "2025-06",
      gpa: "GPA 3.8/4.0 (专业前3%)",
      honors: "国家奖学金、蓝桥杯国赛一等奖、英语六级(600)",
    },
    {
      id: "edu2",
      school: "XXX大学 (211)",
      degree: "计算机科学与技术 本科",
      college: "计算机学院",
      startDate: "2018-09",
      endDate: "2022-06",
    }
  ],
  internships: [
    {
      id: "work1",
      company: "腾讯",
      role: "后台开发实习生",
      startDate: "2025-03",
      endDate: "2025-05",
      summary: "参与微信支付核心链路优化，负责高并发场景下的订单处理模块。",
      details: [
        "优化支付回调逻辑，引入消息队列削峰填谷，将系统吞吐量提升20%。",
        "排查线上FullGC问题，通过优化JVM参数及大对象分配，将GC频率降低50%。",
        "编写自动化测试脚本，覆盖率提升至85%，减少回归测试时间。"
      ]
    }
  ],
  projects: [
    {
      id: "proj1",
      name: "雅鉴生活志 (高并发电商平台)",
      role: "后端核心开发",
      link: "github.com/zhanggongke/yajian",
      startDate: "2024-10",
      endDate: "2025-02",
      summary: "为用户提供商家查询、秒杀优惠券、智能客服功能的综合生活服务平台。",
      techStack: "SpringBoot, MySQL, Redis, Lua, Kafka, Caffeine, LangChain4j",
      details: [
        "秒杀防超卖：使用Redis+Lua脚本实现库存预扣减，结合一人一单策略，彻底解决超卖问题。",
        "异步削峰：引入Kafka消息队列将同步下单流程改造为异步处理，系统并发能力提升5倍。",
        "多级缓存架构：搭建Caffeine本地缓存+Redis分布式缓存的二级架构，热点数据响应时间降低至5ms以内。",
        "智能客服：基于LangChain4j接入大模型，利用Redis实现会话记忆，支持自然语言查询商家信息及预约。"
      ]
    }
  ],
  skills: [
    {
      category: "Java基础",
      items: ["熟悉面向对象、集合框架(HashMap/ArrayList源码)、反射、泛型、异常处理机制"]
    },
    {
      category: "并发编程",
      items: ["深入理解JMM内存模型、线程池、Synchronized、ReentrantLock、AQS原理、ConcurrentHashMap"]
    },
    {
      category: "JVM",
      items: ["熟悉内存结构、垃圾回收算法(CMS/G1)、双亲委派机制、类加载过程、常见OOM分析"]
    },
    {
      category: "数据库",
      items: ["精通MySQL事务、索引优化、MVCC、锁机制；熟悉Redis数据结构、持久化、分布式锁、缓存击穿/穿透/雪崩解决方案"]
    },
    {
      category: "框架与中间件",
      items: ["熟练掌握Spring Boot/Cloud、MyBatis Plus；熟悉Kafka消息可靠性投递、积压处理；了解SpringAI"]
    }
  ]
};

export const COURSE_PROJECT_MAPPING: Record<string, string> = {
  "数据结构": "通用排序算法可视化系统 / 高性能哈希表实现",
  "计算机网络": "基于Java Socket的简易HTTP服务器 / 网络抓包工具开发",
  "操作系统": "基于C语言的简易文件系统设计 / 进程调度模拟器",
  "单片机原理": "基于STM32的智能循迹小车 / 智能温湿度监控系统",
  "自动控制原理": "倒立摆PID控制系统仿真 / 无人机姿态控制算法",
  "机械设计": "二级圆柱齿轮减速器设计 / 自动化抓取机械臂结构设计",
  "数据库原理": "高校教务管理系统 / 电商后台数据库设计与优化",
  "模电数电": "高保真音频功率放大器设计 / 数字电子钟逻辑电路设计"
};