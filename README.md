# CheckIn Base

CheckIn Base 是一个面向 Base 主网的移动端每日打卡 Mini App，核心体验包含每日打卡、连续天数、历史轨迹、状态反馈与个人成就面板。

## 安装

```bash
npm install
```

## 本地运行

```bash
npm run dev
```

## 环境变量

复制 `.env.example` 到 `.env.local` 并填写：

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME=CheckIn Base
```

## 构建

```bash
npm run build
```

## Vercel 部署

```bash
vercel
vercel --prod
```

## Base Mini App 元信息位置

- 应用 Meta: `app/layout.tsx`
- Farcaster 清单: `public/.well-known/farcaster.json`

## 如何替换域名到 farcaster.json

将 `public/.well-known/farcaster.json` 中的 `homeUrl`、`iconUrl`、`imageUrl`、`splashImageUrl` 替换为你的正式域名地址，同时同步更新 `.env.local` 中的 `NEXT_PUBLIC_APP_URL`。

