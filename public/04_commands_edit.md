# 💻 commands.md

## 🔧 よく使うコマンド・スクリプト集

このファイルには、KOMPETE開発で頻繁に使うコマンドやTips、操作手順を記録します。Markdownとしてコピー＆ペーストしやすい形式でまとめています。

---

### 📁 ドキュメント管理

```bash
# docsフォルダの中身を表示
ls -l ~/docs

# ファイルを作成（例：overview.md）
touch ~/docs/overview.md

# ファイルを編集（例：log_2025-06.md）
nano ~/docs/log_2025-06.md

# ファイルを削除（例：howto.md を削除）
rm ~/docs/howto.md

# nanoエディタがインストールされているか確認
pkg list-installed | grep nano

# nanoをインストール（未導入の場合）
pkg install nano

# パッケージリポジトリを変更（通信エラー時など）
termux-change-repo

# 変更ファイルを全てステージング
git add .

# コミット（コメント付き）
git commit -m "update: progress log 2025-06-25"

# GitHubへプッシュ
git push origin main
