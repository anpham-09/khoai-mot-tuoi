from pathlib import Path
import base64, json, re, html, zipfile
root = Path(__file__).parent
site = root/'site'
source = (site/'index.html').read_text()
cache = {}
def inline_image(path):
    if path not in cache:
        cache[path] = 'data:image/jpeg;base64,'+base64.b64encode((site/path).read_bytes()).decode()
    return cache[path]
manifest = json.loads((site/'photos.js').read_text().removeprefix('window.KHOAI_PHOTOS = ').strip().removesuffix(';'))
for photo in manifest:
    photo['src'] = inline_image(photo['src'])
    photo['thumb'] = inline_image(photo['thumb'])
def inline_fonts(css):
    return re.sub(r'url\((fonts/[^)]+\.woff2)\)',lambda m:'url(data:font/woff2;base64,'+base64.b64encode((site/m.group(1)).read_bytes()).decode()+')',css)
source = source.replace('<link rel="stylesheet" href="fonts.css">','<style>\n'+inline_fonts((site/'fonts.css').read_text())+'\n</style>')
standalone = source.replace('<link rel="stylesheet" href="style.css">', '<style>\n'+(site/'style.css').read_text()+'\n</style>')
standalone = standalone.replace('<script src="photos.js" defer></script>','').replace('<script src="app.js" defer></script>','').replace('<script src="birthday-music.js" defer></script>','').replace('<script src="birthday-effects.js" defer></script>','')
standalone = re.sub(r'src="((?:photos|thumbs)/[^\"]+)"',lambda m: 'src="'+inline_image(m.group(1))+'"',standalone)
standalone = standalone.replace('</body>', '<script>\nwindow.KHOAI_PHOTOS = '+json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+';\n'+(site/'birthday-music.js').read_text()+'\n'+(site/'birthday-effects.js').read_text()+'\n'+(site/'app.js').read_text()+'\n</script></body>')
(root/'Khoai-mot-tuoi.html').write_text(standalone)
letter = re.search(r'<article class="letter-content".*?>(.*?)<div class="letter-actions">',source,re.S).group(1)
letter = re.sub(r'<br\s*/?>','\n',letter)
letter = re.sub(r'</(?:p|h3|div)>','\n\n',letter)
letter = html.unescape(re.sub(r'<[^>]+>','',letter))
letter = re.sub(r'\n{3,}','\n\n',letter).strip()
(root/'Thu-cua-chu-gui-An-Duy.txt').write_text(letter+'\n')
with zipfile.ZipFile(root/'Qua-sinh-nhat-An-Duy.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p in sorted(site.rglob('*')):
        if p.is_file():z.write(p,Path('An-Duy-mot-tuoi')/p.relative_to(site))
    z.write(root/'Thu-cua-chu-gui-An-Duy.txt','An-Duy-mot-tuoi/Thu-cua-chu.txt')
    z.writestr('An-Duy-mot-tuoi/CACH-MO.txt','Mở file index.html bằng trình duyệt để xem món quà.\nGiữ nguyên các file và thư mục ảnh đi kèm.\n')
print('Standalone:',round((root/'Khoai-mot-tuoi.html').stat().st_size/1024**2,1),'MB')
print('ZIP:',round((root/'Qua-sinh-nhat-An-Duy.zip').stat().st_size/1024**2,1),'MB')
