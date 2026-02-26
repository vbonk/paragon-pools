#!/bin/bash
# One-off script to download all Wix source images
set -e
DIR="scripts/scraped-data/raw-images"
cd /home/claude-runner/projects/paragon-pools

# High-res pool project photos
curl -sL -o "$DIR/DJI_0892.jpg" "https://static.wixstatic.com/media/231922_95a60cb91f7c4d64a85af4dba212af5f~mv2.jpg"
echo "DJI_0892 done"
curl -sL -o "$DIR/SNY00551.jpg" "https://static.wixstatic.com/media/231922_14a07b6e8bdc4fdf855942f5aeb7c5ac~mv2.jpg"
echo "SNY00551 done"

# Product gallery thumbnails
curl -sL -o "$DIR/product-1.jpg" "https://static.wixstatic.com/media/231922_cf93883cfc184d5e8a6fe3c61f6ce736~mv2.jpg"
echo "product-1 done"
curl -sL -o "$DIR/product-2.jpg" "https://static.wixstatic.com/media/231922_d9ab687f466545779fbca31f04a9f3ed~mv2.jpg"
echo "product-2 done"
curl -sL -o "$DIR/product-3.jpg" "https://static.wixstatic.com/media/231922_6519cf39f72f41829688e000e4a5d9cd~mv2.jpg"
echo "product-3 done"
curl -sL -o "$DIR/product-4.jpg" "https://static.wixstatic.com/media/231922_9e993ad80f4643f2806fbefdf3db7b8c~mv2.jpg"
echo "product-4 done"
curl -sL -o "$DIR/product-5.jpg" "https://static.wixstatic.com/media/231922_37fb54f8386040168a56e0b63bec4f12~mv2.jpg"
echo "product-5 done"
curl -sL -o "$DIR/product-6.jpg" "https://static.wixstatic.com/media/231922_bf1baa4363b14fc5af691e4601aebe07~mv2.jpg"
echo "product-6 done"
curl -sL -o "$DIR/product-7.jpg" "https://static.wixstatic.com/media/231922_f53d4595e6b74d26864747adb874cd47~mv2.jpg"
echo "product-7 done"
curl -sL -o "$DIR/product-8.jpg" "https://static.wixstatic.com/media/231922_486d2dfd01654b31877c46c32fe43688~mv2.jpg"
echo "product-8 done"
curl -sL -o "$DIR/product-9.jpg" "https://static.wixstatic.com/media/231922_37bb2bae32d246de83acc16c9c521fc4~mv2.jpg"
echo "product-9 done"

# Latham dealer
curl -sL -o "$DIR/latham-dealer.jpg" "https://static.wixstatic.com/media/231922_318ee690a3394ee4bc8b671b7d9d4b2e~mv2.jpg"
echo "latham-dealer done"

# Stock photos
curl -sL -o "$DIR/beach-ball-pool.jpg" "https://static.wixstatic.com/media/4f5c904bb9f4405bbbd900e8e43fb96d.jpg"
echo "beach-ball-pool done"
curl -sL -o "$DIR/poolside-chairs.jpg" "https://static.wixstatic.com/media/1dd5a477594c40c0936a8c9b1de3661b.jpg"
echo "poolside-chairs done"
curl -sL -o "$DIR/custom-pool-design.jpg" "https://static.wixstatic.com/media/b625345a21b44d20862e1fef43723cf2.jpg"
echo "custom-pool-design done"
curl -sL -o "$DIR/pool-construction.jpg" "https://static.wixstatic.com/media/nsplsh_352d577349505577686c49~mv2_d_4928_3264_s_4_2.jpg"
echo "pool-construction done"
curl -sL -o "$DIR/pool-water.jpg" "https://static.wixstatic.com/media/nsplsh_3553777370645658754f34~mv2_d_4000_2668_s_4_2.jpg"
echo "pool-water done"
curl -sL -o "$DIR/testimonials-bg.jpg" "https://static.wixstatic.com/media/nsplsh_361d9583948a4e95a646c9d0857832bb~mv2.jpg"
echo "testimonials-bg done"
curl -sL -o "$DIR/pool-view.jpg" "https://static.wixstatic.com/media/nsplsh_76795f63564a4341564730~mv2.jpg"
echo "pool-view done"

echo ""
echo "=== All downloads complete ==="
ls -lhS "$DIR"/*.jpg
