from pathlib import Path
from PIL import Image, ImageOps
import json
source = Path('/Users/phamvietan/Desktop/Personal Docs/Em Khoai')
out = Path(__file__).parent / 'site'
files = sorted((p for p in source.glob('*.jpg') if p.stem.isdigit()), key=lambda p: int(p.stem)) + sorted(source.glob('birthday-photos*.jpg'))
manifest = []
for p in files:
    im = ImageOps.exif_transpose(Image.open(p)).convert('RGB')
    full = im.copy(); full.thumbnail((1200,1200))
    full.save(out/'photos'/f'{p.stem}.jpg', quality=83, optimize=True)
    thumb = im.copy(); thumb.thumbnail((360,360))
    thumb.save(out/'thumbs'/f'{p.stem}.jpg', quality=75, optimize=True)
    manifest.append({'id':p.stem,'src':f'photos/{p.stem}.jpg','thumb':f'thumbs/{p.stem}.jpg','width':im.width,'height':im.height,'birthday':p.stem.startswith('birthday'),'label':('Sinh nhật một tuổi · '+p.stem.removeprefix('birthday-photos')) if p.stem.startswith('birthday') else ('Khoảnh khắc '+p.stem)})
(out/'photos.js').write_text('window.KHOAI_PHOTOS = '+json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+';\n')
print(f'Prepared {len(manifest)} photos. Originals untouched.')
print(f'Optimized images: {sum(p.stat().st_size for d in ("photos","thumbs") for p in (out/d).glob("*.jpg"))/1024**2:.1f} MB')
