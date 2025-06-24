#!/bin/bash

DATE=$(date '+%Y-%m-%d %H:%M')
FILENAME="KOMPETE_GUIDE_$(date '+%Y-%m-%d_%H_%M').md"

ENTRY="$DATE  
[$FILENAME](https://github.com/SarabachiQ/kompete-stat-allocator/blob/main/$FILENAME)  
開発構造整理＆整合性重視へ方針転換"

echo -e "$ENTRY\n" >> KOMPETE_GUIDE_index.md

echo "✅ 追記完了: $FILENAME"
