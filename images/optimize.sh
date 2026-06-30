#!/usr/bin/env bash
# Regenerates the optimized/responsive image set from images/originals/.
# Run from the images/ directory: ./optimize.sh
set -euo pipefail
cd "$(dirname "$0")"
SRC=originals

# Therapist portraits: oversized opaque PNGs -> resized webp + jpg fallback
for name in terapeuta1 terapeuta2Me; do
    magick "$SRC/$name.png" -resize 1100x -strip -quality 80 "${name/Me/}.webp"
done
magick "$SRC/terapeuta1.png" -resize 1100x -strip -quality 82 terapeuta1.jpg
magick "$SRC/terapeuta2Me.png" -resize 1100x -strip -quality 82 terapeuta2.jpg

# Hero image: already well-sized, just re-encode
magick "$SRC/terapia.jpeg" -strip -quality 85 terapia.webp
magick "$SRC/terapia.jpeg" -strip -quality 85 terapia.jpeg

# Services grid images: resize down to 2x display size + re-encode
magick "$SRC/rt.jpeg" -resize 700x -strip -quality 80 rt.webp
magick "$SRC/rt.jpeg" -resize 700x -strip -quality 82 rt.jpeg
magick "$SRC/fg.jpg" -resize 700x -strip -quality 80 fg.webp
magick "$SRC/fg.jpg" -strip -quality 82 fg.jpg
magick "$SRC/fp.jpeg" -resize 700x -strip -quality 80 fp.webp
magick "$SRC/fp.jpeg" -resize 700x -strip -quality 82 fp.jpeg

# Logo: tiny on-screen size, resize down + keep alpha
magick "$SRC/logo3.png" -resize 200x200 -strip logo3.png
magick "$SRC/logo3.png" -resize 200x200 -strip -quality 90 logo3.webp

identify -format "%f %wx%h\n" *.webp *.jpg *.jpeg *.png 2>/dev/null
