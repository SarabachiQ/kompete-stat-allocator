# 📗 log_2025-06.md

## 🗓️ 進捗ログ（月間）

このファイルには、2025年6月の開発記録・試行錯誤・成功や失敗などのログを日別に記録していきます。



## ✅ 2025-6-27（金）

### 🔧 `/log` ページの文字化け修正

- `log_2025-06_edit.md` を正しく表示しようとした際、文字化けが発生。
- 原因は `src/LogPage.jsx` のコードにあり、`.md` ファイルの読み込み処理が不適切だった。
- `OverviewPage.jsx` を参考にコードを修正し、`public/docs/` 以下の Markdown を正しく読み込めるようにした。
- 結果、`http://localhost:5173/log` で内容が正常に表示されるようになった。



## ✅ 2025-06-26（木）

### 📄 `overview_edit.md` のMarkdown表示を整備・調整！

#### 🔧 やったことリスト

- `OverviewPage.jsx` で `overview_edit.md` を fetch して表示する仕組みを実装
- `react-markdown` と `react-syntax-highlighter` を使って、コード部分のみをグレーの角丸背景で囲むように調整
- `SyntaxHighlighter` を適用する条件として `language-xxx` クラス名を検出する正規表現を使用
- コード以外の文章は通常の背景・レイアウトのまま表示されるように修正
- Markdown上のコマンドブロック（```bashなど）を使って、GitHubでコピーしやすい形式を維持
- 表示確認用URL： [http://localhost:5173/overview](http://localhost:5173/overview)

#### ✅ 最終確認

- コードブロックのみグレー背景・角丸で表示されることを確認
- `overview_edit.md` に Markdown 形式でセクションとコマンドを記述 → 正常にレンダリングされることを確認
- `devedit` の使い方にも慣れ、バックアップや編集もスムーズにできるように！

#### 💬 コメント

> うぉぉぉぉぉ！！！やっとできました！！！ちゃんとコードだけが囲えてます！


---

## ✅ 2025-06-24

- `KOMPETE_GUIDE_2025-06-24_17_14.md` → Markdownファイル分類構想を着手
- ChatGPTと対話しながら `overview.md` の設計ルールを確定
- `howto.md` の削除を検討（不要ファイルとしてリストアップ）

---

## ✅ 2025-06-25

- ファイル構成ルールを正式決定し、`overview.md` に記録
- `docs` フォルダの整理開始、空状態でスタートを確認
- ChatGPTとの対話メモからファイルごとの仕分け開始
- `overview.md` 初期構成・テンプレート追記完了
