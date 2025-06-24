#!/data/data/com.termux/files/usr/bin/bash

# 新規作成ファイル名を引数で受け取る
NEWFILE="$1"
if [ -z "$NEWFILE" ]; then
  echo "Usage: $0 newfile.md"
  exit 1
fi

# 新規ファイルがすでに存在する場合は警告して終了
if [ -f "$NEWFILE" ]; then
  echo "Error: $NEWFILE already exists."
  exit 1
fi

# 新規ファイルを簡単なテンプレートで作成
cat > "$NEWFILE" <<EOF
# 🧠 KOMPETE Stat Allocator 攻略ブック（$(date +"%Y-%m-%d %H:%M")作成）

この攻略ブックは、KOMPETE用「Stat Allocator」開発の記録です。
作業効率を高め、過去の認識を正しく共有する目的で記録しています。

---

## 📂 関連リンク

- [KOMPETE_TERMS_v0.1.md](KOMPETE_TERMS_v0.1.md)
- [KOMPETE_GUIDE_index.md](KOMPETE_GUIDE_index.md)
- [KOMPETE_GUIDE.md](KOMPETE_GUIDE.md)
- [README.md](README.md)
- [$NEWFILE]($NEWFILE)

EOF

# 管理ファイル群（相互リンク更新対象）
FILES=("KOMPETE_TERMS_v0.1.md" "KOMPETE_GUIDE_index.md" "KOMPETE_GUIDE.md" "README.md" "$NEWFILE")

# すべてのファイルに相互リンク部分を上書き更新
for f in "${FILES[@]}"; do
  if [ -f "$f" ]; then
    sed -i '/^---$/,/^---$/c\
---\
📂 関連リンク\
- [KOMPETE_TERMS_v0.1.md](KOMPETE_TERMS_v0.1.md)\
- [KOMPETE_GUIDE_index.md](KOMPETE_GUIDE_index.md)\
- [KOMPETE_GUIDE.md](KOMPETE_GUIDE.md)\
- [README.md](README.md)\
- ['$NEWFILE']('$NEWFILE')\
---' "$f"
  else
    echo "Warning: $f が存在しません。"
  fi
done

# リンク切れチェック
for f in "${FILES[@]}"; do
  if [ -f "$f" ]; then
    grep -oP '.*?\K[^)]+(?=)' "$f" | while read -r link; do
      if [ ! -f "$link" ]; then
        echo "リンク切れ検出: ファイル $f 内のリンク $link が存在しません"
        exit 1
      fi
    done
  fi
done

# ここまでエラーなければGitに追加・コミット・プッシュ
git add "${FILES[@]}"
git commit -m "Add $NEWFILE and update mutual links"
git push origin main

echo "完了：$NEWFILE 作成、リンク更新、GitHubにpushされました。"
