#!/data/data/com.termux/files/usr/bin/bash

FILES=(
  "KOMPETE_TERMS_v0.1.md"
  "KOMPETE_GUIDE_index.md"
  "KOMPETE_GUIDE_2025-06-24_18_11.md"
  "KOMPETE_GUIDE.md"
  "README.md"
)

LINKS='
---
📂 関連リンク

- [KOMPETE_TERMS_v0.1.md](KOMPETE_TERMS_v0.1.md)
- [KOMPETE_GUIDE_index.md](KOMPETE_GUIDE_index.md)
- [KOMPETE_GUIDE_2025-06-24_18_11.md](KOMPETE_GUIDE_2025-06-24_18_11.md)
- [KOMPETE_GUIDE.md](KOMPETE_GUIDE.md)
- [README.md](README.md)
'

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    grep "📂 関連リンク" "$file" >/dev/null && echo "✅ すでにリンクあり：$file" && continue
    echo "$LINKS" >> "$file"
    echo "➕ リンク追加：$file"
  else
    echo "❌ ファイルなし：$file"
  fi
done
