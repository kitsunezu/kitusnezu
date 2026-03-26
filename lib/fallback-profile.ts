import type { Profile } from "@/types/profile";

export const fallbackProfile: Profile = {
  name: "Slan Chong",
  title: {
    en: "Full Stack Developer",
    "zh-TW": "全端開發者",
    ja: "フルスタック開発者",
  },
  bio: {
    en: "I'm a Full Stack Developer with a passion for building clean, scalable web applications. I enjoy working across the stack — from crafting pixel-perfect UIs with React to designing robust backend systems with Java Spring Boot and Node.js. Outside of work, I run a homelab and love exploring new technologies.",
    "zh-TW":
      "我是一名全端開發者，熱衷於構建乾淨、可擴展的網頁應用。我喜歡在整個技術棧中工作 — 從使用 React 打造完美的 UI，到使用 Java Spring Boot 和 Node.js 設計穩健的後端系統。工作之餘，我經營自己的 Homelab，喜歡探索各種新技術。",
    ja: "クリーンでスケーラブルなウェブアプリケーションの構築に情熱を注ぐフルスタック開発者です。ReactによるピクセルパーフェクトなUI構築から、Java Spring BootやNode.jsによる堅牢なバックエンドシステムの設計まで、スタック全体で働くことを楽しんでいます。仕事以外では、自宅サーバーを運用し、新しい技術の探求を楽しんでいます。",
  },
  email: "contact@kitsunet.app",
  sns: [
    {
      platform: "X",
      url: "https://x.com/slan1024",
      label: "@slan1024",
    },
  ],
  experience: [
    {
      company: {
        en: "HKTVmall / Shoalter Technology",
        "zh-TW": "HKTVmall / Shoalter Technology",
        ja: "HKTVmall / Shoalter Technology",
      },
      title: {
        en: "Programmer (Full-Stack Developer)",
        "zh-TW": "程式設計師（全端開發者）",
        ja: "プログラマー（フルスタック開発者）",
      },
      location: {
        en: "Hong Kong",
        "zh-TW": "香港",
        ja: "香港",
      },
      startDate: "2022-07",
      endDate: null,
      description: {
        en: "Building and maintaining e-commerce platform features across the full stack using Java Spring Boot, React, and cloud-native tools.",
        "zh-TW":
          "使用 Java Spring Boot、React 和雲原生工具構建和維護電商平台的全端功能。",
        ja: "Java Spring Boot、React、クラウドネイティブツールを使用して、EC プラットフォームのフルスタック機能を構築・保守。",
      },
      highlights: [
        {
          en: "Developed microservices with RabbitMQ and Kubernetes",
          "zh-TW": "使用 RabbitMQ 和 Kubernetes 開發微服務",
          ja: "RabbitMQ と Kubernetes を使用したマイクロサービスの開発",
        },
        {
          en: "Implemented CI/CD pipelines with ArgoCD and Docker",
          "zh-TW": "使用 ArgoCD 和 Docker 實施 CI/CD 流水線",
          ja: "ArgoCD と Docker による CI/CD パイプラインの実装",
        },
        {
          en: "Integrated Elasticsearch/OpenSearch for product search optimization",
          "zh-TW": "整合 Elasticsearch/OpenSearch 優化商品搜尋",
          ja: "Elasticsearch/OpenSearch を統合した商品検索の最適化",
        },
      ],
    },
  ],
  education: [
    {
      school: {
        en: "Feng Chia University",
        "zh-TW": "逢甲大學",
        ja: "逢甲大學",
      },
      degree: {
        en: "Bachelor of Science in Electronic Engineering",
        "zh-TW": "電子工程學士",
        ja: "電子工学学士",
      },
      startDate: "2017-08",
      endDate: "2021-08",
      description: {
        en: "Lab Experience: Computational Analytics & Cognitive Vision Lab (Jan 2018 – June 2021). Focused on data analysis, computer vision algorithms, and hardware-software integration.",
        "zh-TW":
          "實驗室經歷：計算分析與認知視覺實驗室（2018年1月 – 2021年6月）。專注於數據分析、電腦視覺演算法和軟硬體整合。",
        ja: "研究室経歴：計算分析・認知ビジョン研究室（2018年1月 – 2021年6月）。データ分析、コンピュータビジョンアルゴリズム、ハードウェア・ソフトウェア統合に注力。",
      },
    },
  ],
  projects: [
    {
      name: "GitHub Profile Viewer",
      description: {
        en: "A web application that visualizes GitHub user profiles with detailed statistics and contribution data.",
        "zh-TW":
          "一個視覺化展示 GitHub 使用者個人資料、詳細統計數據和貢獻資料的網頁應用。",
        ja: "GitHub ユーザープロフィールを詳細な統計情報とコントリビューションデータで可視化するウェブアプリケーション。",
      },
      url: "https://gh-api-profile.netlify.app/",
      sourceUrl: "https://github.com/kitsunezu/github-profile",
      tags: ["React", "TypeScript", "GitHub API", "Netlify"],
    },
  ],
  skills: [
    {
      name: {
        en: "Languages",
        "zh-TW": "程式語言",
        ja: "プログラミング言語",
      },
      items: ["Java", "TypeScript", "JavaScript", "JSP"],
    },
    {
      name: {
        en: "Frameworks",
        "zh-TW": "框架",
        ja: "フレームワーク",
      },
      items: ["Spring Boot", "React", "Next.js", "Node.js", "Express"],
    },
    {
      name: {
        en: "Tools",
        "zh-TW": "工具",
        ja: "ツール",
      },
      items: [
        "Docker",
        "Kubernetes",
        "ArgoCD",
        "RabbitMQ",
        "Webpack",
        "Swagger",
        "Git",
      ],
    },
    {
      name: {
        en: "Databases",
        "zh-TW": "資料庫",
        ja: "データベース",
      },
      items: ["Redis", "Elasticsearch", "OpenSearch", "MongoDB"],
    },
  ],
};
