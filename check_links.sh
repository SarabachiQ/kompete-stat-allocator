#!/data/data/com.termux/files/usr/bin/bash

# チェック対象ファイル一覧
FILES=(
  "KOMPETE_TERMS_v0.1.md"
  "KOMPETE_GUIDE_index.md"
  "KOMPETE_GUIDE_2025-06-24_18_11.md"
  "KOMPETE_GUIDE.md"
  "README.md"
)

echo "🔍 リンクチェック開始"

for file in "${FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ ファイルが見つかりません：$file"
    continue
  fi
  echo "● チェック中：$file"
  missing=0
  for target in "${FILES[@]}" "${FILES[-1]}"; do
    grep "$target" "$file" >/dev/null || {
      echo "  🔸 リンク欠落：[$target] が見つかりません"
      missing=1
    }
  done
  [ "$missing" -eq 0 ] && echo "  ✅ リンクOK"
done
