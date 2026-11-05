/* Decorative birthday effects: local, lightweight, and motion-preference aware. */
(() => {
  'use strict';
  function create({bookFrame}) {
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const palette=['#d8b16d','#d9ada4','#aeb79a','#ecd8a8','#bd9368'];
    const scene=document.createElement('div');scene.className='birthday-scene';scene.setAttribute('aria-hidden','true');
    for(let i=0;i<4;i++){const balloon=document.createElement('span');balloon.className='party-balloon balloon-'+i;scene.append(balloon);}
    const ambient=document.createElement('canvas');ambient.className='birthday-ambient';ambient.setAttribute('aria-hidden','true');scene.append(ambient);document.body.prepend(scene);
    const confetti=document.createElement('canvas');confetti.className='birthday-confetti';confetti.setAttribute('aria-hidden','true');document.body.append(confetti);
    const glow=ambient.getContext('2d'),ctx=confetti.getContext('2d');
    let width=innerWidth,height=innerHeight,ambientFrame=0,confettiFrame=0,lastDraw=0,wished=false,visitedCover=false,visitedBirthday=false,particles=[];
    const stars=Array.from({length:22},(_,i)=>({x:((i*47+9)%101)/100,y:((i*31+13)%97)/100,phase:i*1.91,size:1.4+(i%4)*.55}));
    function resize(){
      width=innerWidth;height=innerHeight;const scale=Math.min(devicePixelRatio||1,2);
      for(const canvas of [ambient,confetti]){canvas.width=Math.round(width*scale);canvas.height=Math.round(height*scale);canvas.getContext('2d')?.setTransform(scale,0,0,scale,0,0);}
    }
    function star(context,x,y,r){context.beginPath();context.moveTo(x,y-r);context.quadraticCurveTo(x+r*.15,y-r*.15,x+r,y);context.quadraticCurveTo(x+r*.15,y+r*.15,x,y+r);context.quadraticCurveTo(x-r*.15,y+r*.15,x-r,y);context.quadraticCurveTo(x-r*.15,y-r*.15,x,y-r);context.fill();}
    function ambientLoop(time){
      if(reduced.matches||document.hidden){ambientFrame=0;return;}
      ambientFrame=requestAnimationFrame(ambientLoop);if(time-lastDraw<50)return;lastDraw=time;
      glow.clearRect(0,0,width,height);
      stars.forEach(s=>{const alpha=.13+(Math.sin(time*.0012+s.phase)+1)*.22;const x=s.x*width,y=s.y*height+Math.sin(time*.0004+s.phase)*9;glow.fillStyle=`rgba(184,139,62,${alpha})`;glow.shadowColor='#f3d99b';glow.shadowBlur=9;star(glow,x,y,s.size);});
      glow.shadowBlur=0;
    }
    function startAmbient(){if(glow&&!ambientFrame&&!reduced.matches&&!document.hidden)ambientFrame=requestAnimationFrame(ambientLoop);}
    function stopFrames(){cancelAnimationFrame(ambientFrame);cancelAnimationFrame(confettiFrame);ambientFrame=0;confettiFrame=0;particles=[];glow?.clearRect(0,0,width,height);ctx?.clearRect(0,0,width,height);}
    function confettiLoop(time){
      if(reduced.matches||document.hidden){particles=[];ctx?.clearRect(0,0,width,height);confettiFrame=0;return;}
      ctx.clearRect(0,0,width,height);particles=particles.filter(p=>time-p.birth<p.life);
      particles.forEach(p=>{
        const t=(time-p.birth)/1000;const alpha=Math.min(1,(p.life-(time-p.birth))/850);
        const x=p.x+p.vx*t+Math.sin(t*3+p.phase)*12,y=p.y+p.vy*t+37*t*t;
        ctx.save();ctx.translate(x,y);ctx.rotate(p.rotation+t*p.spin);ctx.globalAlpha=Math.max(0,alpha);ctx.fillStyle=p.color;
        if(p.shape===0)star(ctx,0,0,p.size);else{ctx.scale(1,Math.cos(t*5+p.phase)*.65+.35);ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*.55);}ctx.restore();
      });
      if(particles.length)confettiFrame=requestAnimationFrame(confettiLoop);else{confettiFrame=0;ctx.clearRect(0,0,width,height);}
    }
    function burst(big=false){
      if(reduced.matches||document.hidden||!ctx)return;
      const now=performance.now(),rect=bookFrame.getBoundingClientRect(),small=width<761;
      const count=big?(small?70:115):(small?24:38);
      for(let i=0;i<count;i++){
        const fromLeft=i%2===0;
        particles.push({x:fromLeft?rect.left+rect.width*.12:rect.right-rect.width*.12,y:big?rect.top+rect.height*.27:rect.top+25,vx:(fromLeft?1:-1)*(30+Math.random()*160),vy:big?-125-Math.random()*140:-35+Math.random()*50,size:3+Math.random()*5,color:palette[i%palette.length],rotation:Math.random()*6.28,spin:(Math.random()-.5)*8,phase:Math.random()*6.28,birth:now,life:big?3600+Math.random()*1000:2100+Math.random()*750,shape:i%4});
      }
      particles=particles.slice(-150);
      if(!confettiFrame)confettiFrame=requestAnimationFrame(confettiLoop);
    }
    function garland(){const bunting=document.createElement('span');bunting.className='party-bunting';bunting.setAttribute('aria-hidden','true');for(let i=0;i<9;i++){const flag=document.createElement('i');flag.style.setProperty('--flag',palette[i%palette.length]);bunting.append(flag);}return bunting;}
    function decorate(spread,page){
      if(page.kind==='cover')spread.querySelector('.paper.left').prepend(garland());
      if(page.kind==='photos'&&page.chapter===11){
        spread.classList.add('birthday-spread');
        if(page.part===0){
          const note=spread.querySelector('.story-note');note.classList.add('birthday-note');note.querySelector('.story-symbol')?.remove();
          const cake=document.createElement('div');cake.className='birthday-cake'+(wished?' wished':'');cake.setAttribute('aria-hidden','true');
          cake.innerHTML='<span class="cake-plate"></span><span class="cake-layer"></span><span class="cake-icing"></span><span class="cake-candle"></span><span class="cake-flame"></span><span class="cake-sprinkle a"></span><span class="cake-sprinkle b"></span><span class="cake-sprinkle c"></span>';
          note.prepend(cake);
          const wish=document.createElement('button');wish.type='button';wish.className='birthday-wish-button';wish.setAttribute('aria-pressed',String(wished));wish.textContent=wished?'Thắp lại nến ↺':'Cùng ước cho Khoai, rồi thổi nến!';
          const status=document.createElement('span');status.className='candle-status';status.setAttribute('aria-live','polite');status.textContent=wished?'Chúc Khoai một tuổi thật nhiều niềm vui!':'';
          wish.addEventListener('click',()=>{wished=!wished;cake.classList.toggle('wished',wished);wish.setAttribute('aria-pressed',String(wished));wish.textContent=wished?'Thắp lại nến ↺':'Cùng ước cho Khoai, rồi thổi nến!';status.textContent=wished?'Chúc Khoai một tuổi thật nhiều niềm vui!':'';if(wished)burst(true);});
          note.append(wish,status);
        }
      }
    }
    function onPage(page){
      const birthday=page.kind==='photos'&&page.chapter===11,cover=page.kind==='cover';
      document.body.classList.toggle('party-mood',birthday||cover);bookFrame.classList.toggle('birthday-glow',birthday);
      if(cover&&!visitedCover){visitedCover=true;burst(false);}if(birthday&&!visitedBirthday){visitedBirthday=true;burst(true);}
      startAmbient();
    }
    resize();if(glow)startAmbient();
    addEventListener('resize',resize);
    document.addEventListener('visibilitychange',()=>document.hidden?stopFrames():startAmbient());
    reduced.addEventListener?.('change',()=>reduced.matches?stopFrames():startAmbient());
    addEventListener('pagehide',stopFrames);addEventListener('pageshow',startAmbient);
    return {decorate,onPage};
  }
  window.KhoaiBirthdayEffects=Object.freeze({create});
})();
