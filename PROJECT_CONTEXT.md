你現在是一位資深全端開發者，我要用 NextJS/React + TypeScript + Vite + Tailwind CSS + shadcn/ui + git來開發一個個人求職用的專業介紹網站（Portfolio / Personal Website）
使用的技術都可以提出更好建議

專案目標：
- 用來求職展示（適合 Frontend / Full Stack / Creative Developer 職位）
- 必須同時支援 **中文（繁體）**、**英文**、**日文** 三種語言
- 必須有完整的 **暗黑模式（Dark Mode）**，並支援系統偏好自動切換
- 滑動時要有高質感動畫，部分區塊要使用 **Three.js**（或 React Three Fiber）來增加沉浸感與科技感，但整體要保持專業、不過度花俏
- 設計風格：現代、極簡、科技感、乾淨專業（可適度加入個人特色）
- 完全響應式
- 之後希望能輕鬆部署到 Vercel 或我的 Homelab（kitsunet.app，使用 Docker + Nginx Proxy Manager）

請先幫我用 Plan Mode 完整規劃以下內容：

1. **整體網站結構與頁面規劃**
   - 推薦的區塊順序（Hero、About Me、Experience、Projects、Skills、Education、Contact 等）
   - 每個區塊的核心內容建議，以及哪些區塊適合加入 Three.js 互動或 scroll-triggered 動畫

2. **多語言支援（i18n）方案**
   - 推薦使用哪個庫？（i18next + react-i18next 還是其他？）
   - 目錄結構與翻譯檔案管理方式（JSON 檔案如何組織）
   - 語言切換器 UI 設計 + 瀏覽器語言自動偵測 + URL 路徑或 subdomain 方案
   - 如何處理 Three.js 內的文字翻譯（如果有）

3. **暗黑模式實作**
   - 推薦方案（next-themes 風格的 ThemeProvider + Tailwind dark: 前綴 + shadcn/ui 支援）
   - 如何避免 hydration 閃爍（flicker）
   - 切換器放在哪裡？如何與語言切換器整合

4. **動畫與 Three.js 整合**
   - 整體 scroll 動畫推薦方案（Framer Motion + GSAP ScrollTrigger 還是純 CSS？）
   - Three.js 使用建議：React Three Fiber + Drei
     - 哪些區塊適合放 3D 元素？（例如 Hero 背景星空/粒子系統、Skills 區塊 3D 技能球、Projects 區塊 3D 卡片 hover 等）
   - 效能考量：如何確保手機上順暢？（lazy load、low-poly、suspend 等）
   - 動畫觸發方式（scroll progress、intersection observer）

5. **專案目錄結構**
   - 推薦完整的目錄結構（類似我 grok-app 的風格，包含 locales、components、lib、hooks 等）

6. **技術選型與權衡**
   - 是否建議改用 Next.js App Router？（因為 i18n + 影像優化 + 未來擴展較方便）
   - 或維持 Vite + React Router？
   - 狀態管理：Zustand 是否足夠？（語言 + 主題）

7. **開發階段建議**
   - 第一階段優先完成哪些部分？
   - 如何一步步實作（從建立專案開始）


請用清晰的 Markdown 格式輸出規劃，包含每個部分的優缺點或注意事項。
之後我會根據你的 Plan 一步步讓你幫我產生實際程式碼。
未來希望能用 Docker + Nginx Proxy Manager 部署到我的 kitsunet.app 網域，結構要方便轉成 Docker Compose。

我的個人特色：
- 名字: Slan Chong(Kitsunezu)[請在這裡填入你的名字、目前職稱、擅長領域、個人風格等，例如：熱愛 TypeScript、喜歡乾淨極簡設計、有 Homelab 經驗、喜歡寫技術部落格等]
- 職稱: Full Stack Developer
- 個人SNS: https://x.com/slan1024 , 
- 技能:
   - Languages: Java Spring Boot, TypeScript, JSP, Node.js
   - Frameworks: React, Next.js
   - Tools: RabbitMQ, Kubernetes (k8s), ArgoCD, Docker, Webpack, Swagger
   - Databases: Redis, Elasticsearch, OpenSearch
   - EDUCATION:
      - Feng Chia University | Bachelor of Science in Electronic Engineering | Aug 2017 – Aug 2021
      - Lab Experience: Computational Analytics & Cognitive Vision Lab (Jan 2018 – June 2021)
         - Focused on data analysis, computer vision algorithms, and hardware-software integration
   - WORK EXPERIENCE: HKTVmall | Shoalter Technology Programmer (Full-Stack Developer) | July 2022