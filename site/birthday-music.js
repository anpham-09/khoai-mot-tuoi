/* Happy Birthday, arranged as a bright music box with plucked accompaniment.
   All sound is synthesized locally; no audio files or network requests. */
(() => {
  'use strict';
  const beat = 60 / 114;
  const cycleBeats = 28;
  const melody = [
    [67,.75],[67,.25],[69,1],[67,1],[72,1],[71,2],
    [67,.75],[67,.25],[69,1],[67,1],[74,1],[72,2],
    [67,.75],[67,.25],[79,1],[76,1],[72,1],[71,1],[69,1],
    [77,.75],[77,.25],[76,1],[72,1],[74,1],[72,2]
  ];
  const harmony = [
    [1,[48,52,55]],[4,[43,50,53]],[7,[43,50,55]],[10,[48,52,55]],
    [13,[48,52,55]],[16,[41,48,53]],[19,[41,48,53]],[22,[48,52,55]]
  ];
  const frequency = midi => 440 * Math.pow(2, (midi - 69) / 12);
  function renderScore(context, destination, start = 0, voices = new Set()) {
    function track(node, connections) {
      voices.add(node);
      node.onended = () => { voices.delete(node); node.disconnect(); connections.forEach(n => n.disconnect()); };
    }
    function tone(note, at, length, level, type='sine', harmonic=1) {
      const oscillator = context.createOscillator(), envelope = context.createGain();
      oscillator.type = type; oscillator.frequency.value = frequency(note) * harmonic;
      const time = start + at * beat;
      envelope.gain.setValueAtTime(0, time);
      envelope.gain.linearRampToValueAtTime(level, time + .008);
      envelope.gain.exponentialRampToValueAtTime(.0001, time + length);
      oscillator.connect(envelope); envelope.connect(destination);
      track(oscillator, [envelope]); oscillator.start(time); oscillator.stop(time + length + .02);
    }
    let cursor = 0;
    melody.forEach(([note, duration]) => {
      const length = Math.min(1.35, duration * beat + .36);
      tone(note, cursor, length, .105);
      tone(note, cursor, length * .58, .025, 'sine', 2);
      tone(note, cursor, length * .32, .007, 'sine', 3);
      cursor += duration;
    });
    // A little answering chime after the final birthday phrase.
    tone(76, 24.5, .9, .035); tone(79, 25, .9, .03); tone(84, 25.5, 1.1, .025);
    harmony.forEach(([at, chord]) => {
      tone(chord[0] - 12, at, .43, .065);
      [1,2].forEach(offset => chord.forEach((note, i) => {
        tone(note + 12, at + offset + i * .035, .29, .017, 'triangle');
      }));
    });
    // Close the phrase with a gently arpeggiated C major chord.
    [48,55,60,64,67,72].forEach((note,i) => tone(note, 24+i*.12, .8, .016, 'triangle'));
    // Quiet shaker on the offbeats keeps the waltz playful rather than sleepy.
    const noise = context.createBuffer(1, Math.ceil(context.sampleRate * .055), context.sampleRate);
    const samples = noise.getChannelData(0);
    let seed = 17052025;
    for(let i=0;i<samples.length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;samples[i]=seed/2147483648-1;}
    for(let at=1.5;at<24;at+=1){
      const source=context.createBufferSource(),filter=context.createBiquadFilter(),envelope=context.createGain();
      const time=start+at*beat;source.buffer=noise;filter.type='highpass';filter.frequency.value=4800;
      envelope.gain.setValueAtTime(.022,time);envelope.gain.exponentialRampToValueAtTime(.0001,time+.05);
      source.connect(filter);filter.connect(envelope);envelope.connect(destination);track(source,[filter,envelope]);source.start(time);source.stop(time+.06);
    }
    return start + cycleBeats * beat;
  }
  // A short silent WAV played through an <audio> element switches iOS to the
  // "playback" audio session, so Web Audio is heard even with the silent switch on.
  function silentWavUrl(){
    const rate=8000,n=rate/2,buf=new ArrayBuffer(44+n),v=new DataView(buf);
    const w=(o,t)=>[...t].forEach((c,i)=>v.setUint8(o+i,c.charCodeAt(0)));
    w(0,'RIFF');v.setUint32(4,36+n,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);
    v.setUint32(24,rate,true);v.setUint32(28,rate,true);v.setUint16(32,1,true);v.setUint16(34,8,true);w(36,'data');v.setUint32(40,n,true);
    for(let i=0;i<n;i++)v.setUint8(44+i,128);
    let bin='';new Uint8Array(buf).forEach(b=>bin+=String.fromCharCode(b));return 'data:audio/wav;base64,'+btoa(bin);
  }
  function createPlayer() {
    let context, master, timer, pauseTimer, playing=false, starting=null, nextCycle=0, keepAlive=null;
    const voices = new Set();
    function schedule(){if(playing && nextCycle<context.currentTime+.5)nextCycle=renderScore(context,master,nextCycle,voices);}
    return {
      get playing(){return playing;},
      // Must be called from inside a tap/click/key handler: everything up to the
      // first await runs synchronously, which is what browsers require to unlock audio.
      play(){
        if(playing)return Promise.resolve();
        if(starting)return starting;
        clearTimeout(pauseTimer);
        const Audio=window.AudioContext||window.webkitAudioContext;
        if(!Audio)return Promise.reject(new Error('Audio is unavailable'));
        if(!context){context=new Audio();master=context.createGain();master.connect(context.destination);}
        try{if(!keepAlive){keepAlive=new window.Audio(silentWavUrl());keepAlive.loop=true;keepAlive.setAttribute('playsinline','');}keepAlive.play().catch(()=>{});}catch{}
        try{const tick=context.createBufferSource();tick.buffer=context.createBuffer(1,1,22050);tick.connect(context.destination);tick.start(0);}catch{}
        const resumed=context.resume();
        starting=(async()=>{
          try{
            await Promise.race([resumed,new Promise(r=>setTimeout(r,700))]);
            if(context.state!=='running')throw new Error('Audio is blocked until the page is tapped');
            master.gain.cancelScheduledValues(context.currentTime);master.gain.setValueAtTime(0,context.currentTime);master.gain.linearRampToValueAtTime(.65,context.currentTime+.04);
            playing=true;nextCycle=context.currentTime+.05;schedule();timer=setInterval(schedule,200);
          }finally{starting=null;}
        })();
        return starting;
      },
      stop(){
        playing=false;clearInterval(timer);clearTimeout(pauseTimer);
        try{keepAlive?.pause();}catch{}
        if(!context)return;
        const now=context.currentTime;
        master.gain.cancelScheduledValues(now);master.gain.setTargetAtTime(0,now,.008);
        for(const voice of voices){try{voice.stop(now+.035);}catch{}}
        pauseTimer=setTimeout(()=>{if(!playing&&context.state==='running')context.suspend().catch(()=>{});},50);
      }
    };
  }
  window.KhoaiBirthdayMusic=Object.freeze({createPlayer,renderScore,durationSeconds:cycleBeats*beat});
})();
