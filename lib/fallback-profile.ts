import type { Profile } from "@/types/profile";

export const fallbackProfile: Profile = {
  name: "Slan Chong",
  title: {
    en: "Full Stack Developer",
    "zh-TW": "Full-Stack Developer",
    ja: "フルスタック開発者",
  },
  bio: {
    en: "I'm a Full Stack Developer with a passion for building clean, scalable web applications. I enjoy working across the stack — from crafting pixel-perfect UIs with React to designing robust backend systems with Java Spring Boot and Node.js. Outside of work, I run a homelab and love exploring new technologies.",
    "zh-TW":
      "我是一名Full-Stack Developer，熱衷於構建乾淨、可擴展的網頁應用。我喜歡在整個技術棧中工作 — 從使用 React 打造完美的 UI，到使用 Java Spring Boot 和 Node.js 設計穩健的後端系統。工作之餘，我經營自己的 Homelab，喜歡探索各種新技術。",
    ja: "クリーンでスケーラブルなウェブアプリケーションの構築に情熱を注ぐフルスタック開発者です。ReactによるピクセルパーフェクトなUI構築から、Java Spring BootやNode.jsによる堅牢なバックエンドシステムの設計まで、スタック全体で働くことを楽しんでいます。仕事以外では、自宅サーバーを運用し、新しい技術の探求を楽しんでいます。",
  },
  email: "snchong.slan@gmail.com",
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
        "zh-TW": "程式設計師（Full-Stack Developer）",
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
        en: "Full-stack developer for Hong Kong's largest online shopping mall (HKTVmall), building core e-commerce features using SAP Hybris, Java Spring Boot, React, and cloud-native tools.",
        "zh-TW":
          "為香港最大網購平台 HKTVmall 開發核心電商功能，使用 SAP Hybris、Java Spring Boot、React 及雲原生技術。",
        ja: "香港最大のオンラインショッピングモール HKTVmall のコア EC 機能を、SAP Hybris・Java Spring Boot・React・クラウドネイティブツールで開発。",
      },
      highlights: [
        {
          en: "E-commerce: Core feature development on SAP Hybris e-Commerce platform for Hong Kong's largest online shopping mall",
          "zh-TW": "電商開發：在 SAP Hybris 電商平台上開發香港最大網購商城的核心功能",
          ja: "EC 開発：香港最大のオンラインショッピングモール向け SAP Hybris プラットフォームのコア機能開発",
        },
        {
          en: "Search Engine: Led Category Search Engine revamp with OpenSearch and RabbitMQ for real-time SKU indexing, significantly reducing data latency",
          "zh-TW": "搜尋引擎：主導分類搜尋引擎改版，以 OpenSearch 和 RabbitMQ 實現即時 SKU 索引，大幅降低資料延遲",
          ja: "検索エンジン：OpenSearch と RabbitMQ によるカテゴリ検索エンジン刷新を主導し、リアルタイム SKU インデックスでデータ遅延を大幅削減",
        },
        {
          en: "Algorithm Refinement: Optimized keyword search algorithms to improve product relevancy and conversion rates",
          "zh-TW": "演算法優化：改善關鍵字搜尋演算法，提升商品相關性及轉換率",
          ja: "アルゴリズム改善：キーワード検索アルゴリズムを最適化し、商品関連性とコンバージョン率を向上",
        },
        {
          en: "Call Center: Integrated Genesys Cloud and Salesforce to streamline support workflows",
          "zh-TW": "客服中心：整合 Genesys Cloud 和 Salesforce 以優化客服工作流程",
          ja: "コールセンター：Genesys Cloud と Salesforce を統合しサポートワークフローを効率化",
        },
        {
          en: "HKTVmall Cashback: Deployed WebViews compatible across Mobile App and Web, ensuring UI/UX consistency",
          "zh-TW": "HKTVmall 現金回饋：部署兼容 App 和 Web 的 WebView，確保 UI/UX 一致性",
          ja: "HKTVmall キャッシュバック：モバイルアプリと Web の両環境に対応した WebView を導入し UI/UX の一貫性を確保",
        },
        {
          en: "Implemented CI/CD pipelines with ArgoCD and Docker",
          "zh-TW": "使用 ArgoCD 和 Docker 實施 CI/CD 流水線",
          ja: "ArgoCD と Docker による CI/CD パイプラインの実装",
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
      location: {
        en: "Taiwan",
        "zh-TW": "台灣",
        ja: "台湾",
      },
      description: {
        en: "Lab Experience: Computational Analytics & Cognitive Vision Lab. Focused on data analysis, computer vision algorithms, and hardware-software integration.",
        "zh-TW":
          "實驗室經歷：計算分析與認知視覺實驗室。專注於數據分析、電腦視覺演算法和軟硬體整合。",
        ja: "研究室経歴：計算分析・認知ビジョン研究室。データ分析、コンピュータビジョンアルゴリズム、ハードウェア・ソフトウェア統合に注力。",
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
      items: ["Java Spring Boot", "TypeScript", "JavaScript", "Node.js", "JSP"],
    },
    {
      name: {
        en: "Frameworks",
        "zh-TW": "框架",
        ja: "フレームワーク",
      },
      items: ["React", "Next.js", "Vite", "jQuery", "Ant Design"],
    },
    {
      name: {
        en: "Tools & Platforms",
        "zh-TW": "工具與平台",
        ja: "ツール・プラットフォーム",
      },
      items: [
        "Docker",
        "Kubernetes",
        "ArgoCD",
        "RabbitMQ",
        "Webpack",
        "Swagger",
        "Jira",
        "Confluence",
        "Slack",
        "Git",
      ],
    },
    {
      name: {
        en: "Databases",
        "zh-TW": "資料庫",
        ja: "データベース",
      },
      items: ["Redis", "Elasticsearch", "OpenSearch"],
    },
  ],
};
