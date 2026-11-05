(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const photos = window.KHOAI_PHOTOS || [];
  const byId = new Map(photos.map((p,i) => [p.id,{...p,number:i+1}]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const book = $('#book');
  const frame = $('#book-frame');
  const party = window.KhoaiBirthdayEffects.create({bookFrame:frame});
  const lightbox = $('#lightbox');
  const contents = $('#contents-dialog');
  const letterSource = $('#letter-template').content.querySelector('article');
  const paragraphs = [...letterSource.querySelectorAll(':scope > p')];
  const captions = {
    1:'Ngày con còn là một hình hài bé xíu.',2:'Một ngày nhà mình quây quần.',3:'Được ôm thật gần.',4:'Có con, niềm vui cũng khác.',5:'Con ở giữa những yêu thương.',6:'Một vòng tay thật ấm.',7:'Chỉ muốn ngắm con thêm chút nữa.',8:'Bé xíu trong vòng tay người thân.',9:'Cả nhà cùng giữ một kỷ niệm.',10:'Một ngày đầy sắc màu.',11:'Một em bé, cả một thế giới.',12:'Hôm nay con mặc đồ kẻ sọc.',13:'Ngủ ngoan nhé, Khoai.',15:'Một chuyến đi nhỏ.',16:'Ở trong lòng là thấy yên tâm.',17:'Con có người ở bên.',18:'Một mái tóc mới cho Khoai.',19:'Ngủ một giấc thật ngon.',20:'Đôi mắt đang nhìn ngắm thế giới.',21:'Chiếc mũ xinh của con.',22:'Lớn lên giữa những yêu thương.',23:'Đi chơi rồi ngủ quên mất.',24:'Ra ngoài cùng người thân.',25:'Bé nhỏ và chiếc mũ ấm.',26:'Một nụ cười được giữ lại.',27:'Chụp chung một tấm nhé.',28:'Ánh nhìn bé xíu, bao điều tò mò.',29:'Con đang ngắm điều gì thế?',30:'Thêm một ngày có bánh và niềm vui.',31:'Một buổi tối bên nhau.',32:'Trong lòng người thương con.',33:'Chiếc mũ nhỏ, nụ cười xinh.',34:'Có người luôn ở cạnh.',35:'Cùng nhau đi ngắm phố.',36:'Ra ngoài xem có gì vui.',37:'Một điểm dừng trong chuyến đi.',38:'Thế giới bắt đầu từ tấm thảm nhỏ.',39:'Con và những món đồ chơi.',40:'Thế giới có nhiều điều hay lắm.',41:'Thêm một lần sửa sang mái tóc.',42:'Một khoảnh khắc thật gần.',43:'Ngồi cạnh nhau một chút.',44:'Một giấc ngủ yên.',45:'Ôm bạn gấu, ngủ ngoan.',46:'Có bánh, có nến, có nhau.',47:'Một chút tò mò bên bàn ăn.',48:'Giờ tắm của Khoai.',49:'Những chuyện rất nhỏ của một ngày.',50:'Ngủ ngoan trong chiếc chăn ấm.',51:'Bình yên là những lúc thế này.',52:'Niềm vui đôi khi chỉ cần có thế.',53:'Được giữ thật chắc trong vòng tay.',54:'Ra ngoài hít một chút gió.',55:'Cỏ xanh, trời rộng và con.',56:'Có thêm những nơi để khám phá.',57:'Một vòng siêu thị cùng nhà mình.',58:'Một buổi đi chơi thật vui.',59:'Khoai và chiếc xe đẩy.',60:'Một nụ cười thật tươi.',61:'Giờ ăn cũng có nhiều điều hay.',62:'Ánh mắt đầy tò mò.',63:'Ngồi đây, ngắm thế giới.',64:'Từng chút một, thế giới rộng hơn.',65:'Những cuộc khám phá trên sàn nhà.',66:'Một em bé đang lớn dần.',67:'Cùng nhau giữ một tấm ảnh.',68:'Hôm nay mình đi đâu nhỉ?',69:'Một ngày có những người bạn nhỏ.',70:'Bữa ăn của con.',71:'Có bạn chơi cùng thật vui.',72:'Một cuộc gặp của những em bé.',73:'Bạn thú nhún màu xanh.',74:'Thêm một góc để khám phá.',75:'Con có cả một thế giới đồ chơi.',76:'Con ngồi đây, cười thật xinh.',77:'Nụ cười này làm ngày vui hơn.',78:'Một món mới để tìm hiểu.',79:'Một buổi chơi đầy sắc màu.',80:'Con thử tự mình một chút.',81:'Đi chơi cùng người thân.',82:'Một chuyến đi có cờ đỏ.',83:'Cười thật tươi, Khoai nhé.',84:'Đến giờ ăn của con rồi.',85:'Một chiếc cầu trượt thật vui.',86:'Bàn tay bé xíu muốn khám phá.',87:'Chiếc ba lô nhỏ của con.',88:'Một buổi chiều ngoài trời.',89:'Dạo chơi khi nắng đã dịu.',90:'Luôn có người ở ngay phía sau.',91:'Cùng đi chọn những món ngon.',92:'Con nhìn này, ngày thật đẹp.',93:'Một góc nhỏ để con chơi.',94:'Con lớn lên từng chút.',95:'Một nụ cười thật đẹp của nhà mình.',
    'birthday-photos1':'Khoai một tuổi rồi!','birthday-photos2':'Một nụ cười cho tuổi mới.','birthday-photos3':'Hôm nay là ngày của con.','birthday-photos4':'Một ngọn nến, thật nhiều yêu thương.','birthday-photos5':'Còn cả thế giới chờ con khám phá.'
  };
  const chapters = [
    {name:'Khi cả nhà chờ con',subtitle:'Chưa gặp mặt, đã thấy thương.',text:'Trước những bức ảnh con cười, trước những lần được bế con trên tay, có một tấm hình bé xíu như thế này. Một trang đầu thật đặc biệt của câu chuyện mang tên An Duy.',ids:['1'],quote:'Mọi câu chuyện đều có một trang đầu.'},
    {name:'Nhà mình thêm một người thương',subtitle:'Rồi con đến, và yêu thương đầy hơn.',range:[2,10],quote:'Có con, những ngày bình thường cũng thành kỷ niệm.'},
    {name:'Những ngày con còn bé xíu',subtitle:'Từng giấc ngủ, từng ánh nhìn.',range:[11,20],quote:'Nhỏ xíu thôi, mà khiến cả nhà thương thật nhiều.'},
    {name:'Đi đâu cũng có vòng tay',subtitle:'Thế giới đầu tiên của con là nhà mình.',range:[21,29],quote:'Lớn lên giữa những người luôn muốn ôm con thật gần.'},
    {name:'Cùng nhà mình gom kỷ niệm',subtitle:'Một lần đi chơi, một buổi ở nhà.',range:[30,39],quote:'Những ngày cùng nhau, đều là những ngày đáng giữ.'},
    {name:'Những điều nhỏ xíu mỗi ngày',subtitle:'Có những điều bình thường mà thương lắm.',range:[40,49],quote:'Rồi một ngày, mình sẽ nhớ cả những chuyện nhỏ này.'},
    {name:'Những vòng tay đưa con đi',subtitle:'Từ giấc ngủ êm đến những khoảng trời mới.',range:[50,59],quote:'Có người ở bên, chuyến đi nào cũng ấm.'},
    {name:'Thế giới rộng thêm từng chút',subtitle:'Con tò mò, con khám phá, con lớn lên.',range:[60,68],quote:'Cứ chậm thôi, con có cả thế giới để tìm hiểu.'},
    {name:'Những người bạn, những niềm vui',subtitle:'Thêm những gương mặt, thêm những điều hay.',range:[69,76],quote:'Mỗi ngày lại có một điều khiến con muốn mỉm cười.'},
    {name:'Nụ cười lớn dần cùng con',subtitle:'Con vui, một ngày cũng vui hơn.',range:[77,86],quote:'Nụ cười của con là một điều thật đẹp của nhà mình.'},
    {name:'Mang theo cả một trời háo hức',subtitle:'Con đã lớn thế này rồi, Khoai ơi.',range:[87,95],quote:'Từng chút một, rồi con sẽ đi xa hơn.'},
    {name:'Khoai một tuổi rồi!',subtitle:'Một ngọn nến nhỏ. Một cột mốc thật to.',ids:photos.filter(p=>p.birthday).map(p=>p.id),birthday:true,text:'Chúc mừng sinh nhật đầu tiên, Phạm Viết An Duy. Mong con khỏe mạnh, được yêu thương và có một tuổi thơ thật đẹp.',quote:'05.11.2025 — 05.11.2026 · Một năm đầy thương nhớ.'},
    {name:'Gửi An Duy của những năm sau',subtitle:'Một lá thư từ chú, để một ngày con đọc lại.',letter:true,quote:'Con cứ lớn lên. Lá thư này sẽ ở đây.'}
  ];
  const pages = [{kind:'cover',chapter:-1}];
  chapters.forEach((chapter,index)=>{
    chapter.start=pages.length;
    if(chapter.letter){for(let part=0;part<2;part++)pages.push({kind:'letter',chapter:index,part});chapter.parts=2;return;}
    const list = chapter.ids || photos.filter(p=>!p.birthday&&Number(p.id)>=chapter.range[0]&&Number(p.id)<=chapter.range[1]).map(p=>p.id);
    chapter.ids=list;
    const groups=[];
    if(list.length===1)groups.push(list);
    else if(chapter.birthday)groups.push(list);
    else {groups.push(list.slice(0,3),list.slice(3,6),list.slice(6));}
    chapter.parts=groups.length;
    groups.forEach((ids,part)=>pages.push({kind:'photos',chapter:index,ids,part}));
  });
  window.KHOAI_ALBUM=Object.freeze({pages:pages.map(p=>({...p})),chapters:chapters.map(c=>({name:c.name,start:c.start,parts:c.parts}))});
  const pad=n=>String(n).padStart(2,'0');
  function element(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;}
  function paper(side){return element('section','paper '+side);}
  function pageHead(chapter,page,full=false){
    const head=element('header','page-header');
    head.append(element('span','overline',page.chapter===0?'LỜI MỞ ĐẦU':chapter.birthday?'SINH NHẬT ĐẦU TIÊN':chapter.letter?'LÁ THƯ CỦA CHÚ':'CHƯƠNG '+pad(page.chapter)));
    if(full)head.append(element('h2','',chapter.name));else head.append(element('p','page-small-note',chapter.quote));
    return head;
  }
  function photoFigure(id){
    const photo=byId.get(id);const figure=element('figure','photo-print');figure.style.setProperty('--ar',(photo.width/photo.height).toFixed(4));if(photo.width>photo.height)figure.classList.add('landscape');
    const button=element('button','photo-trigger');button.type='button';button.dataset.photo=id;button.setAttribute('aria-label','Xem ảnh lớn: '+(captions[id]||photo.label));
    const windowEl=element('span','photo-window');const img=element('img');img.src=photo.src;img.alt=captions[id]||photo.label;img.width=photo.width;img.height=photo.height;img.draggable=false;windowEl.append(img);button.append(windowEl);
    const caption=element('figcaption');caption.append(element('span','',captions[id]||photo.label),element('small','',pad(photo.number)));
    figure.append(button,caption);return figure;
  }
  function photoGrid(ids){const grid=element('div','photo-grid '+(ids.length===2?'two':'single'));ids.forEach(id=>grid.append(photoFigure(id)));return grid;}
  function pageFoot(page,side){const footer=element('div','paper-footer');footer.append(element('span','','KHOAI · NHỮNG NGÀY CON BÉ'),element('span','',pad((pages.indexOf(page))*2+(side==='right'?0:-1))));return footer;}
  function coverSpread(){
    const spread=element('div','spread cover-spread');spread.dataset.kind='cover';
    const left=paper('left');const content=element('div','cover-copy');content.append(element('span','overline','MỘT CUỐN ALBUM · MỘT NĂM ĐẦU ĐỜI'),element('p','full-name','PHẠM VIẾT AN DUY'));
    const title=element('h1');title.append(document.createTextNode('Khoai ơi, '),document.createElement('br'),document.createTextNode('con '),element('em','','một tuổi'),document.createTextNode(' rồi!'));content.append(title,element('p','cover-sub','Một tuổi của con.\nMột năm đầy thương nhớ của cả nhà.'));
    const start=element('button','primary-button','Mở những trang đầu  ↗');start.type='button';start.dataset.goto='1';content.append(start,element('span','cover-date','05.11.2025 — 05.11.2026'));left.append(content);
    const right=paper('right');const figure=element('figure','cover-portrait');const image=element('img');image.src=byId.get('birthday-photos5').src;image.alt='An Duy trong bộ ảnh sinh nhật một tuổi';image.draggable=false;figure.append(image,element('figcaption','','Một món quà nhỏ, chú gửi con.'));right.append(figure,element('span','cover-seal','with love, từ chú'));spread.append(left,right);return spread;
  }
  const letterParts=[
    {title:'Chú viết cho con của những năm sau.',left:[0,1,2],right:[3]},
    {title:'Từng chút một, rồi con sẽ đi xa.',left:[4,5,6],right:[7,8]}
  ];
  function letterSpread(page){
    const part=letterParts[page.part];const spread=element('div','spread letter-spread letter-part-'+page.part);spread.dataset.kind='letter';
    const left=paper('left');const head=element('header','page-header');head.append(element('span','overline','05 THÁNG 11 NĂM 2026 · THƯ CỦA CHÚ'),element('h2','',part.title));left.append(head);
    const body=element('div','letter-body');if(page.part===0)body.append(element('p','salutation','Khoai thương mến,'));part.left.forEach(i=>body.append(paragraphs[i].cloneNode(true)));left.append(body,pageFoot(page,'left'));
    const right=paper('right');const rest=element('div','letter-body');part.right.forEach(i=>rest.append(paragraphs[i].cloneNode(true)));
    if(page.part===0)rest.append(element('p','letter-turn','Còn tiếp ở trang sau →'));
    else{const save=element('button','text-button','Giữ lại lá thư ↓');save.type='button';save.dataset.saveLetter='true';const restart=element('button','text-button','Về lại bìa album ↗');restart.type='button';restart.dataset.goto='0';const actions=element('div','closing-actions');actions.append(save,restart);rest.append(actions);}
    right.append(rest,pageFoot(page,'right'));spread.append(left,right);return spread;
  }
  function makeSpread(page){
    if(page.kind==='cover')return coverSpread();if(page.kind==='letter')return letterSpread(page);
    const chapter=chapters[page.chapter];const spread=element('div','spread photo-spread count-'+page.ids.length);spread.dataset.kind='photos';spread.dataset.chapter=page.chapter;
    const left=paper('left'),right=paper('right');left.append(pageHead(chapter,page,true));
    if(chapter.birthday){
      const grid=element('div','photo-grid birthday-collage');page.ids.forEach(id=>grid.append(photoFigure(id)));left.append(grid,pageFoot(page,'left'));
      const note=element('div','story-note');note.append(element('span','story-symbol','1'),element('span','overline','MỘT TUỔI · THẬT NHIỀU YÊU THƯƠNG'),element('h3','',chapter.subtitle),element('p','',chapter.text),element('span','little-signature',chapter.quote));right.append(note,pageFoot(page,'right'));spread.append(left,right);return spread;
    }
    const split=page.ids.length===4?2:1;
    left.append(photoGrid(page.ids.slice(0,split)),pageFoot(page,'left'));
    if(page.ids.length===1){const note=element('div','story-note');note.append(element('span','story-symbol',chapter.birthday?'1':'✳'),element('span','overline',chapter.birthday?'MỘT TUỔI · THẬT NHIỀU YÊU THƯƠNG':'NGÀY ẤY, CON CÒN BÉ THẾ NÀY'),element('h3','',chapter.subtitle),element('p','',chapter.text),element('span','little-signature',chapter.quote));right.append(note);}else right.append(pageHead(chapter,page,false),photoGrid(page.ids.slice(split)));
    right.append(pageFoot(page,'right'));spread.append(left,right);return spread;
  }
  let current=0,turning=false,animation=null,bookClosed=false,opening=null;
  let currentPhoto=0,lastPhotoId=null;
  const aliases={home:0,story:1,waiting:1,arrival:chapters[1].start,growing:chapters[4].start,birthday:chapters[11].start,letter:chapters[12].start};
  function hashPage(){const key=location.hash.slice(1);const n=/^trang-(\d+)$/.exec(key);return n?Math.max(0,Math.min(pages.length-1,Number(n[1])-1)):aliases[key]||0;}
  function updateChrome(){
    const page=pages[current],chapter=chapters[page.chapter];
    $('#chapter-overline').textContent=page.kind==='cover'?'MÓN QUÀ SINH NHẬT ĐẦU TIÊN':page.kind==='letter'?'LÁ THƯ CỦA CHÚ':page.chapter===0?'LỜI MỞ ĐẦU':'CHƯƠNG '+pad(page.chapter)+' / 11';
    $('#chapter-title').textContent=chapter?chapter.subtitle:'Một năm của con, thật nhiều thương nhớ.';
    $('#chapter-part').textContent=chapter?`Phần ${page.part+1} / ${chapter.parts}`:'05.11.2025 — 05.11.2026';
    $('#page-indicator').textContent=current===0?`Bìa album · 01 / ${pages.length}`:`Trang ${pad(current+1)} / ${pages.length}`;
    $('#page-progress').style.width=(current/(pages.length-1)*100)+'%';
    for(const id of ['prev-page','edge-prev'])$('#'+id).disabled=current===0||turning;
    for(const id of ['next-page','edge-next'])$('#'+id).disabled=current===pages.length-1||turning;
    document.querySelectorAll('[data-chapter-target]').forEach(b=>{if(Number(b.dataset.chapterTarget)===page.chapter)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
    $('#page-announcement').textContent=`${current===0?'Bìa album':chapter.name}. Trang ${current+1} trên ${pages.length}.`;
  }
  async function showPage(index,animate=true){
    if(bookClosed){openBook().then(()=>{if(index>1)showPage(index);});return;}
    if(turning||index<0||index>=pages.length||index===current&&book.children.length)return;
    const previous=book.firstElementChild;const forward=index>current;
    turning=Boolean(previous&&animate&&!reduced.matches);current=index;
    const next=makeSpread(pages[current]);party.decorate(next,pages[current]);next.dataset.pageIndex=current;book.replaceChildren(next);updateChrome();
    try{history.replaceState(null,'','#trang-'+(current+1));}catch{}
    if(turning){
      const layer=element('div','turn-layer');layer.setAttribute('aria-hidden','true');layer.inert=true;frame.append(layer);
      try{
        const ease='cubic-bezier(.35,.1,.25,1)';
        if(matchMedia('(max-width:760px)').matches){
          // Một trang giấy cong lên quanh mép trái, giống lật sổ ảnh.
          const d=760,leaf=element('div','m-leaf'),front=element('div','m-face m-front'),back=element('div','m-face m-back'),cast=element('div','turn-cast'),shade=element('div','flip-shade');cast.style.zIndex=2;
          if(forward){front.append(previous.cloneNode(true),shade);leaf.append(front,back);layer.append(cast,leaf);
            animation=leaf.animate([{transform:'perspective(1800px) rotateY(0deg)'},{transform:'perspective(1800px) rotateY(-180deg)'}],{duration:d,easing:ease,fill:'forwards'});
            cast.animate([{opacity:1},{opacity:0}],{duration:d,fill:'forwards'});shade.animate([{opacity:0},{opacity:1}],{duration:d/2,fill:'forwards'});
          }else{const still=element('div','m-static');still.append(previous.cloneNode(true));front.append(next.cloneNode(true),shade);leaf.append(front,back);layer.append(still,cast,leaf);
            animation=leaf.animate([{transform:'perspective(1800px) rotateY(-180deg)'},{transform:'perspective(1800px) rotateY(0deg)'}],{duration:d,easing:ease,fill:'forwards'});
            cast.animate([{opacity:0},{opacity:1}],{duration:d,fill:'forwards'});shade.animate([{opacity:1},{opacity:1,offset:.5},{opacity:0}],{duration:d,fill:'forwards'});
          }
        }else{
          const d=820,fixed=previous.querySelector(forward?'.paper.left':'.paper.right').cloneNode(true);fixed.classList.add('turn-static',forward?'left':'right');layer.append(fixed);
          const leaf=element('div','flip-leaf '+(forward?'forward':'backward'));
          const front=element('div','flip-face flip-front'),back=element('div','flip-face flip-back'),fs=element('div','flip-shade'),bs=element('div','flip-shade');
          front.append(previous.querySelector(forward?'.paper.right':'.paper.left').cloneNode(true),fs);back.append(next.querySelector(forward?'.paper.left':'.paper.right').cloneNode(true),bs);leaf.append(front,back);
          const cast=element('div','turn-cast'+(forward?'':' from-right'));Object.assign(cast.style,{zIndex:2,left:forward?'50%':'0',right:forward?'0':'50%'});layer.append(cast,leaf);
          animation=leaf.animate([{transform:'rotateY(0deg)'},{transform:`rotateY(${forward?-180:180}deg)`}],{duration:d,easing:ease,fill:'forwards'});
          fs.animate([{opacity:0},{opacity:1}],{duration:d/2,easing:'ease-in',fill:'forwards'});
          bs.animate([{opacity:1},{opacity:1,offset:.5},{opacity:0}],{duration:d,fill:'forwards'});
          cast.animate([{opacity:1},{opacity:0}],{duration:d,fill:'forwards'});
        }
        await animation.finished;
      }catch{}finally{layer.remove();animation=null;}
    }
    turning=false;updateChrome();party.onPage(pages[current]);
    // Decode only the following spread's images, so a long album stays light.
    const following=pages[current+1];if(following?.ids)following.ids.forEach(id=>{const im=new Image();im.src=byId.get(id).src;});
  }
  for(const id of ['prev-page','edge-prev'])$('#'+id).addEventListener('click',()=>showPage(current-1));
  for(const id of ['next-page','edge-next'])$('#'+id).addEventListener('click',()=>showPage(current+1));
  $('#home-link').addEventListener('click',e=>{e.preventDefault();showPage(0);});
  document.addEventListener('click',e=>{const b=e.target.closest('[data-goto]');if(b)showPage(Number(b.dataset.goto));if(e.target.closest('[data-save-letter]'))saveLetter();});
  function openContents(){contents.showModal();const currentButton=contents.querySelector('[aria-current=page]');if(currentButton)currentButton.focus();}
  $('#open-contents').addEventListener('click',openContents);$('#page-indicator').addEventListener('click',openContents);$('#close-contents').addEventListener('click',()=>contents.close());
  function contentsEntry(name,start,chapterIndex,ids,summary){
    const button=element('button','contents-entry');button.type='button';button.dataset.chapterTarget=chapterIndex;
    if(ids?.length){const image=element('img');image.src=byId.get(ids[0]).thumb;image.alt='';image.width=70;image.height=82;button.append(image);}else button.append(element('span','contents-icon',chapterIndex===-1?'🐻':'✳'));
    const text=element('span','contents-entry-copy');text.append(element('small','',chapterIndex===-1?'TRANG BÌA':chapterIndex===0?'LỜI MỞ ĐẦU':chapterIndex===12?'THƯ CỦA CHÚ':'CHƯƠNG '+pad(chapterIndex)),element('strong','',name),element('span','',summary));button.append(text,element('span','contents-page',pad(start+1)+' ↗'));
    button.addEventListener('click',()=>{contents.close();showPage(start);});$('#contents-list').append(button);
  }
  contentsEntry('Khoai ơi, con một tuổi rồi!',0,-1,null,'Món quà sinh nhật từ chú');
  chapters.forEach((c,i)=>contentsEntry(c.name,c.start,i,c.ids,c.letter?'2 trang thư để sau này con đọc':`${c.ids.length} ảnh · ${c.parts} trang album`));
  let swipe=null,lastSwipe=0;
  frame.addEventListener('pointerdown',e=>{if(e.isPrimary&&e.button===0)swipe={x:e.clientX,y:e.clientY};});
  frame.addEventListener('pointerup',e=>{if(!swipe)return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;swipe=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5){lastSwipe=Date.now();showPage(current+(dx<0?1:-1));}});
  frame.addEventListener('pointercancel',()=>{swipe=null;});
  frame.addEventListener('click',e=>{if(Date.now()-lastSwipe<350){e.preventDefault();e.stopPropagation();}},true);
  function drawPhoto(){const photo=photos[currentPhoto];$('#lightbox-image').src=photo.src;$('#lightbox-image').alt=captions[photo.id]||photo.label;$('#photo-count').textContent=`${pad(currentPhoto+1)} / ${photos.length}`;$('#photo-caption').textContent=captions[photo.id]||photo.label;$('#prev-photo').disabled=currentPhoto===0;$('#next-photo').disabled=currentPhoto===photos.length-1;}
  document.addEventListener('click',e=>{const button=e.target.closest('[data-photo]');if(!button)return;lastPhotoId=button.dataset.photo;currentPhoto=photos.findIndex(p=>p.id===lastPhotoId);drawPhoto();lightbox.showModal();});
  function changePhoto(n){const next=currentPhoto+n;if(next>=0&&next<photos.length){currentPhoto=next;drawPhoto();}}
  $('#prev-photo').addEventListener('click',()=>changePhoto(-1));$('#next-photo').addEventListener('click',()=>changePhoto(1));$('#close-photo').addEventListener('click',()=>lightbox.close());
  lightbox.addEventListener('close',()=>{const trigger=book.querySelector('[data-photo="'+lastPhotoId+'"]');if(trigger)trigger.focus({preventScroll:true});});
  document.addEventListener('keydown',e=>{
    if(lightbox.open){if(e.key==='ArrowRight'){e.preventDefault();changePhoto(1);}if(e.key==='ArrowLeft'){e.preventDefault();changePhoto(-1);}return;}
    if(contents.open||e.altKey||e.ctrlKey||e.metaKey||e.target.matches('input,textarea,select'))return;
    if(e.key==='ArrowRight'){e.preventDefault();showPage(current+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPage(current-1);}if(e.key==='Home'){e.preventDefault();showPage(0);}if(e.key==='End'){e.preventDefault();showPage(pages.length-1);}
  });
  for(const dialog of [contents,lightbox])dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
  function saveLetter(){const clone=letterSource.cloneNode(true);clone.querySelector('.letter-actions')?.remove();clone.querySelectorAll('br').forEach(br=>br.replaceWith('\n'));const text=[...clone.children].map(el=>el.textContent.trim()).join('\n\n');const url=URL.createObjectURL(new Blob(['\uFEFF'+text],{type:'text/plain;charset=utf-8'}));const link=element('a');link.href=url;link.download='Thu-cua-chu-gui-An-Duy-05-11-2026.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  addEventListener('hashchange',()=>showPage(hashPage(),false));
  addEventListener('resize',()=>{if(animation)animation.finish();});
  reduced.addEventListener?.('change',()=>{if(reduced.matches&&animation)animation.finish();});
  showPage(hashPage(),false);
  // Nút nổi chỉ hiện khi người xem chạm hoặc di chuột, để cuốn sách chiếm trọn màn hình.
  let idleTimer=0;
  function wake(){document.body.classList.remove('ui-idle');clearTimeout(idleTimer);idleTimer=setTimeout(()=>{if(contents.open||lightbox.open||document.querySelector('.reader-header:hover,.reader-controls:hover,.edge-button:hover,.reader-header :focus-visible,.reader-controls :focus-visible'))return wake();document.body.classList.add('ui-idle');},3200);}
  ['pointermove','pointerdown','keydown','touchstart'].forEach(t=>addEventListener(t,wake,{passive:true}));
  $('#prev-page').setAttribute('aria-label','Trang trước');$('#next-page').setAttribute('aria-label','Trang tiếp');$('#open-contents').setAttribute('aria-label','Mục lục');
  // Cuốn sách bìa cứng đang gập; chạm vào để lật bìa mở ra.
  if(current===0&&!reduced.matches){
    bookClosed=true;document.body.classList.add('is-closed');frame.classList.add('book-closed');
    const cover=element('div','hard-cover');cover.setAttribute('role','button');cover.tabIndex=0;cover.setAttribute('aria-label','Mở cuốn album của Khoai');
    const front=element('div','hc-face hc-front'),title=element('h1');
    title.append(document.createTextNode('Khoai ơi, '),document.createElement('br'),document.createTextNode('con '),element('em','','một tuổi'),document.createTextNode(' rồi!'));
    const fig=element('figure','hc-photo'),img=element('img');img.src=byId.get('birthday-photos2').src;img.alt='';img.draggable=false;fig.append(img);
    front.append(element('span','hc-over','MỘT CUỐN ALBUM · NĂM ĐẦU ĐỜI'),title,fig,element('span','hc-name','PHẠM VIẾT AN DUY'),element('span','hc-date','05.11.2025 — 05.11.2026'),element('span','hc-open','Chạm để mở sách'));
    const back=element('div','hc-face hc-back');
    if(matchMedia('(max-width:760px)').matches)back.classList.add('hc-endpaper');else back.append(book.querySelector('.paper.left').cloneNode(true));
    cover.append(front,back);frame.append(cover);
    cover.addEventListener('click',e=>{e.stopPropagation();openBook();});
    cover.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();openBook();}});
    setTimeout(()=>cover.focus({preventScroll:true}),60);
  }
  wake();
  function fitBook(){
    if(innerWidth>1100){const z=Math.min((innerWidth-120)/1180,(innerHeight-40)/690);frame.style.zoom=Math.max(.6,z).toFixed(3);}
    else frame.style.zoom='';
  }
  fitBook();addEventListener('resize',fitBook);
  function openBook(){
    if(!bookClosed)return Promise.resolve();
    if(opening)return opening;
    opening=(async()=>{
      const cover=frame.querySelector('.hard-cover'),mobile=matchMedia('(max-width:760px)').matches,d=mobile?1150:1500;
      frame.classList.add('book-opening');frame.classList.remove('book-closed');
      const turn=cover.animate([{transform:'perspective(2200px) rotateY(0deg)'},{transform:'perspective(2200px) rotateY(-180deg)'}],{duration:d,easing:'cubic-bezier(.5,.05,.25,1)',fill:'forwards'});
      if(mobile)cover.animate([{opacity:1},{opacity:1,offset:.5},{opacity:0}],{duration:d,fill:'forwards'});
      try{await turn.finished;}catch{}
      cover.remove();frame.classList.remove('book-opening');document.body.classList.remove('is-closed');bookClosed=false;opening=null;wake();
      book.querySelector('.primary-button')?.focus({preventScroll:true});
    })();
    return opening;
  }
  const musicButton=$('#music-toggle');
  const birthdayMusic=window.KhoaiBirthdayMusic.createPlayer();
  function musicLabel(playing){
    musicButton.setAttribute('aria-pressed',String(playing));
    musicButton.setAttribute('aria-label',playing?'Tắt nhạc Happy Birthday':'Bật nhạc Happy Birthday');
    musicButton.querySelector('.music-label').textContent=playing?'Tắt nhạc':'Bật nhạc';
  }
  // Nhạc bật sẵn: trình duyệt chỉ cho phát sau lần chạm đầu tiên, nên nhạc vang lên đúng lúc mở sách.
  // Ai tắt nhạc thì máy đó nhớ lựa chọn cho những lần mở sau.
  let musicWanted=true;try{musicWanted=localStorage.getItem('khoai-music')!=='off';}catch{}
  function rememberMusic(on){musicWanted=on;try{localStorage.setItem('khoai-music',on?'on':'off');}catch{}musicLabel(on);}
  function pauseMusic(){birthdayMusic.stop();}
  async function startMusic(){
    if(!musicWanted||birthdayMusic.playing||document.hidden)return;
    try{
      await birthdayMusic.play();
      if(!musicWanted||document.hidden){pauseMusic();return;}
      $('.audio-status').textContent='Đang phát Happy Birthday, phiên bản hộp nhạc sinh nhật.';
    }catch{
      $('.audio-status').textContent='Trình duyệt này chưa mở được nhạc. Con vẫn có thể xem trọn album nhé.';
    }
  }
  function onFirstGesture(e){
    if(e.target.closest?.('#music-toggle'))return;
    ['pointerdown','keydown','touchend'].forEach(t=>removeEventListener(t,onFirstGesture,true));
    startMusic();
  }
  function armMusic(){if(musicWanted)['pointerdown','keydown','touchend'].forEach(t=>addEventListener(t,onFirstGesture,true));}
  musicLabel(musicWanted);armMusic();
  musicButton.title='Happy Birthday · Hộp nhạc sinh nhật';
  musicButton.addEventListener('click',async()=>{
    if(musicWanted){rememberMusic(false);pauseMusic();$('.audio-status').textContent='Đã tắt nhạc.';return;}
    rememberMusic(true);musicButton.disabled=true;try{await startMusic();}finally{musicButton.disabled=false;}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseMusic();else armMusic();});
  window.addEventListener('pagehide',pauseMusic);
})();
