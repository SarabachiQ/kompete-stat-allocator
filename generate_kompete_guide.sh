#!/data/data/com.termux/files/usr/bin/bash

# 日本時間を取得
JST_TIME=$(TZ=Asia/Tokyo date "+%Y-%m-%d %H:%M")

# ファイル名（日時入り、コロンと空白を置換）
FILENAME="KOMPETE_GUIDE_${JST_TIME//[: ]/_}.md"

# Markdown本文を生成
cat > $FILENAME << EOM
# 🧠 KOMPETE Stat Allocator 攻略ブック（${JST_TIME}作成）

この攻略ブックは、KOMPETE用「Stat Allocator」開発の記録です。作業効率を高め、過去の認識を正しく共有する目的で記録しています。

---

## 📁 プロジェクト構成

\`\`\`
src/
  ├─ App.jsx
  ├─ StatAllocator.jsx
  ├─ index.css
  ├─ index.jsx
  └─ main.jsx

tailwind.config.js
vite.config.js
vercel.json
README.md
\`\`\`

---

## 💡 現在の仕様

- 各ステータスはスライダーで割り振り
- 合計139pt上限。最大値は99
- グラフは五角形にリアルタイム反映
- オーバー時は赤表示
- モバイル対応（縦持ち/横持ち）

---

## 🧪 開発中の課題・目的（${JST_TIME}）

- GASとの連携はまだテスト中（書き込み未反映）
- 現在は真っ黒な画面が表示されており、main.jsxなど構成ファイルの整合性を確認したい
- Markdownファイルは**一発コピペ形式**で生成・保存し、バージョン管理indexからリンクする形で管理予定
- \`最新\` という記載はせず、**実際に起きたこと・目標**を記載する
- ChatGPTとセッションが切れても過去を参照できるように

---

## 🔖 メモ（共通認識）

- Markdownは**一発コピペ形式**で出力する
- ファイルは**新規作成して上書きせず保存**
- 各ファイルのバージョンはindexからリンク
- セッションが切れても、バージョン名とリンクで文脈を復元する
- AndroidのTermuxでは「全選択」が困難なため**空の新規ファイルにコピペする運用**とする

---

## 💬 よく使うコマンド（Termux）

\`\`\`bash
# 開発サーバー起動
npm run dev

# 本番ビルド
vite build

# ファイル編集
nano src/App.jsx

# GitHubアップロード
git add .
git commit -m "更新内容"
git push origin main
\`\`\`

---

## 📅 最終更新: ${JST_TIME}（JST）

---

[← バージョン一覧に戻る](https://github.com/SarabachiQ/kompete-stat-allocator/blob/main/KOMPETE_GUIDE_index.md)
EOM

echo "✅ Markdownファイル '$FILENAME' を生成しました。"
