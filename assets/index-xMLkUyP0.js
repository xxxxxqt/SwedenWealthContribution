(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const u=window.d3;function Mt(t){const e=t.map(Math.floor);let n=100-u.sum(e);const o=t.map((a,s)=>({i:s,frac:a-Math.floor(a)})).sort((a,s)=>s.frac-a.frac);for(let a=0;a<o.length&&n>0;a+=1)e[o[a].i]+=1,n-=1;return e}const bt=[{key:"bottom50",label:"Bottom 50%",color:"#4dabf7",pop:50},{key:"top10",label:"Top 10%",color:"#fcc419",pop:10},{key:"top1",label:"Top 1%",color:"#ff8787",pop:1},{key:"top01",label:"Top 0.1%",color:"#e599f7",pop:.1},{key:"top001",label:"Top 0.01%",color:"#ff6b6b",pop:.01},{key:"top0001",label:"Top 0.001%",color:"#c92a2a",pop:.001}];u.scaleSqrt().domain([.001,50]).range([.6,6]);let O=[];async function Tt(){const e=(await u.text("./data/wealth_avg.csv")).split(`
`),n=e[0].split(","),o={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};O=[];for(let a=1;a<e.length;a++){const s=e[a].split(",");if(s.length<n.length)continue;const d=Number(s[0]);if(!Number.isFinite(d))continue;const l={year:d};let p=!0;for(let i=1;i<n.length;i++){const r=o[n[i].trim()];if(!r)continue;const c=Number(s[i]);if(!Number.isFinite(c)){p=!1;break}l[r]=c}p&&l.bottom50!==void 0&&O.push(l)}O.sort((a,s)=>a.year-s.year),new Map(O.map(a=>[a.year,a]))}let K=[];async function qt(){const e=(await u.text("./data/income_avg.csv")).split(`
`),n=e[0].split(","),o={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};K=[];for(let a=1;a<e.length;a++){const s=e[a].split(",");if(s.length<2)continue;const d=Number(s[0]);if(!Number.isFinite(d))continue;const l={year:d};for(let p=1;p<n.length;p++){const i=o[n[p].trim()];i&&(l[i]=Number(s[p])||0)}l.bottom50!==void 0&&K.push(l)}K.sort((a,s)=>a.year-s.year),new Map(K.map(a=>[a.year,a]))}function Lt(t){const e=Math.abs(t);return e>=1e9?(t/1e9).toFixed(1)+"B":e>=1e6?(t/1e6).toFixed(1)+"M":e>=1e3?(t/1e3).toFixed(0)+"K":t.toFixed(0)}function ht(t){return t>=1?`${t}%`:t>=.1?`${t.toFixed(1)}%`:t>=.01?`${t.toFixed(2)}%`:`${t.toFixed(3)}%`}function J(t){const e=Math.abs(t);return e>=1e9?`${(t/1e9).toFixed(e>=1e10?0:1)}B`:e>=1e6?`${(t/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(t/1e3).toFixed(e>=1e5?0:1)}K`:`${Math.round(t)}`}bt.filter(t=>["top0001","top001"].includes(t.key));bt.filter(t=>!["top0001","top001"].includes(t.key));u.scaleSqrt().domain([.001,50]).range([.6,6]);async function Ct(){await Promise.all([Tt(),qt()]),Vt()}Ct();const It=[1980,1990,2e3,2010,2020,2024],S=[{key:"bottom50",label:"Bottom 50%",pop:50,color:"#4dabf7"},{key:"top9",label:"Top 9%",pop:9,color:"#ffd43b"},{key:"top0_9",label:"Top 0.9%",pop:.9,color:"#ff922b"},{key:"top0_09",label:"Top 0.09%",pop:.09,color:"#f06595"},{key:"top0_009",label:"Top 0.009%",pop:.009,color:"#e64980"},{key:"top0_001",label:"Top 0.001%",pop:.001,color:"#c92a2a"}],Bt=["bottom50","middle40","top9","top0_9","top0_09","top0_009","top0_001"];function Y(t,e,n){const o=Math.log10(.001),a=Math.log10(50),s=(Math.log10(Math.max(t,1e-4))-o)/(a-o);return e+s*(n-e)}let G=[],Q=[],gt=new Map,rt=new Map,H=null;function mt(t){if(!t)return null;const e={bottom50:t.bottom50*50,middle40:t.mid40*40,top10:t.top10*10,top1:t.top1*1,top01:t.top01*.1,top001:t.top001*.01,top0001:t.top0001*.001};return{year:t.year,values:{bottom50:t.bottom50,middle40:t.mid40,top9:(e.top10-e.top1)/9,top0_9:(e.top1-e.top01)/.9,top0_09:(e.top01-e.top001)/.09,top0_009:(e.top001-e.top0001)/.009,top0_001:t.top0001},totals:{bottom50:e.bottom50,middle40:e.middle40,top9:e.top10-e.top1,top0_9:e.top1-e.top01,top0_09:e.top01-e.top001,top0_009:e.top001-e.top0001,top0_001:e.top0001}}}function Nt(){G.length&&Q.length||(G=K.map(mt).filter(Boolean),Q=O.map(mt).filter(Boolean),gt=new Map(G.map(t=>[t.year,t])),rt=new Map(Q.map(t=>[t.year,t])))}function D(){return G.map(t=>t.year).filter(t=>rt.has(t))}function At(t){var o;const e=new Set(D()),n=Array.from(new Set(((o=String(t).match(/\d{4}/g))==null?void 0:o.map(Number))||[])).filter(a=>e.has(a)).sort((a,s)=>a-s);return n.length?n:It.filter(a=>e.has(a))}function N(t,e){return(t==="income"?gt:rt).get(e)}function V(t){return t==="income"?G:Q}function I(t,e,n){return t.values[e.key]}function U(t){return`${Lt(t)} SEK`}function W(t,e){const n=document.createElement("div");if(n.className="cwi-card",e){const o=document.createElement("h3");o.textContent=e,n.appendChild(o)}return t.appendChild(n),n}function it(t,e,n,o){const a=document.createElement("div");a.className="cwi-anim-bar",a.innerHTML=`<button type="button" id="cwi-matrix-play">Play</button><input type="range" id="cwi-matrix-year" min="0" max="${e.length-1}" step="1" value="0"><span id="cwi-matrix-year-label">${e[0]}</span>`,t.appendChild(a);const s=W(t,o),d=document.createElement("div");s.appendChild(d);const l=a.querySelector("#cwi-matrix-year"),p=a.querySelector("#cwi-matrix-play"),i=a.querySelector("#cwi-matrix-year-label"),r=c=>{const m=e[c];i.textContent=String(m),n(m,d)};l.addEventListener("input",()=>r(Number(l.value))),p.addEventListener("click",()=>{if(H){clearInterval(H),H=null,p.textContent="Play";return}p.textContent="Pause",H=setInterval(()=>{const c=(Number(l.value)+1)%e.length;l.value=String(c),r(c)},900)}),r(0)}function _t(t,e,n,o,a){const s=a.includes("income"),d=a.includes("wealth"),l=`${s?"<th>Income</th>":""}${d?"<th>Wealth</th>":""}`,p=(i,r,c)=>{const m=o?`<td>${ht(i.pop)}</td>`:"",y=s?`<td>${U(r.values[i.key])}</td>`:"",h=d?`<td>${U(c.values[i.key])}</td>`:"";return`<tr><td>${i.label}</td>${m}${y}${h}</tr>`};if(n==="juxtaposition"){const i=document.createElement("div");i.className="cwi-years-grid",t.appendChild(i),e.forEach(r=>{const c=W(i,String(r)),m=document.createElement("table");m.className="cwi-table",m.innerHTML=`<thead><tr><th>Group</th>${o?"<th>Pop.</th>":""}${l}</tr></thead><tbody>${S.map(y=>p(y,N("income",r),N("wealth",r))).join("")}</tbody>`,c.appendChild(m)});return}if(n==="superposition"){const i=W(t,"Combined table across selected years"),r=document.createElement("table");r.className="cwi-table";const c=a.length,m=`<tr><th rowspan="2">Group</th>${o?'<th rowspan="2">Pop.</th>':""}${e.map(g=>`<th colspan="${c}">${g}</th>`).join("")}</tr>`,y=`<tr>${e.map(()=>`${s?"<th>Income</th>":""}${d?"<th>Wealth</th>":""}`).join("")}</tr>`,h=S.map(g=>{const w=e.map(f=>{const b=N("income",f),v=N("wealth",f);return`${s?`<td>${U(b.values[g.key])}</td>`:""}${d?`<td>${U(v.values[g.key])}</td>`:""}`}).join("");return`<tr><td>${g.label}</td>${o?`<td>${ht(g.pop)}</td>`:""}${w}</tr>`}).join("");r.innerHTML=`<thead>${m}${y}</thead><tbody>${h}</tbody>`,i.appendChild(r);return}it(t,D(),(i,r)=>{r.innerHTML="";const c=document.createElement("table");c.className="cwi-table",c.innerHTML=`<thead><tr><th>Group</th>${o?"<th>Pop.</th>":""}${l}</tr></thead><tbody>${S.map(m=>p(m,N("income",i),N("wealth",i))).join("")}</tbody>`,r.appendChild(c)},"Animated table")}function yt(t,e,n,o){const a=u.select(t),s=520,d=310,l={top:18,right:16,bottom:20,left:120},p=s-l.left-l.right,i=d-l.top-l.bottom,r=S.map(w=>I(e,w)),c=u.min(r),m=u.max(r),y=n==="wealth"?u.scaleSymlog().constant(1e6).domain([Math.min(0,c*1.1),m*1.05]).range([0,p]):u.scaleLinear().domain([0,m*1.05]).range([0,p]),h=i/S.length;a.attr("class","cwi-svg").attr("viewBox",`0 0 ${s} ${d}`),a.selectAll("*").remove();const g=a.append("g").attr("transform",`translate(${l.left},${l.top})`);n==="wealth"&&g.append("line").attr("x1",y(0)).attr("x2",y(0)).attr("y1",0).attr("y2",i).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),S.forEach((w,f)=>{const b=I(e,w),v=o?Y(w.pop,h*.18,h*.82):h*.7,q=f*h+h/2,L=q-v/2,x=y(n==="wealth"?Math.min(0,b):0),k=y(b);g.append("text").attr("x",-10).attr("y",q).attr("dy","0.35em").attr("text-anchor","end").attr("font-size",10).text(w.label),g.append("rect").attr("x",Math.min(x,k)).attr("y",L).attr("width",Math.max(2,Math.abs(k-x))).attr("height",v).attr("rx",4).attr("fill",w.color),g.append("text").attr("x",b>=0?Math.max(x,k)+6:Math.min(x,k)-6).attr("y",q).attr("dy","0.35em").attr("text-anchor",b>=0?"start":"end").attr("font-size",10).text(U(b))})}function zt(t,e,n,o,a){const s=d=>{if(a.length===1)return d;const l=document.createElement("div");return l.className="cwi-grid-2",d.appendChild(l),l};if(n==="juxtaposition"){const d=document.createElement("div");d.className="cwi-years-grid",t.appendChild(d),e.forEach(l=>{const p=W(d,String(l)),i=s(p);a.forEach(r=>{const c=document.createElement("div");c.innerHTML=`<p class="cwi-chart-title">${r==="income"?"Income":"Wealth"}</p>`;const m=document.createElementNS("http://www.w3.org/2000/svg","svg");c.appendChild(m),i.appendChild(c),yt(m,N(r,l),r,o)})});return}if(n==="superposition"){const d=s(t);a.forEach(l=>{const r=W(d,l==="income"?"Income by year — SEK  (dashed = baseline year)":"Wealth by year — SEK  (dashed = baseline year)"),c=(C,A)=>C?I(C,A):0,m=N(l,e[0]);u.sum(S,C=>C.pop);const y=e.flatMap(C=>S.map(A=>c(N(l,C),A))),h=u.max(y.map(Math.abs))*1.1,g=Math.min(0,u.min(y))*1.1,w=Z(g,h),f=700,b=360,v={top:24,right:16,bottom:44,left:72},q=f-v.left-v.right,L=b-v.top-v.bottom,k=u.select(r).append("svg").attr("class","cwi-svg").attr("viewBox",`0 0 ${f} ${b}`).append("g").attr("transform",`translate(${v.left},${v.top})`),M=u.scaleBand().domain(e).range([0,q]).paddingInner(.2),T=u.scaleSymlog().constant(1e5).domain([g,h]).range([L,0]);k.append("g").attr("transform",`translate(0,${L})`).call(u.axisBottom(M).tickFormat(u.format("d"))),k.append("g").call(u.axisLeft(T).tickValues(w).tickFormat(J)),g<0&&k.append("line").attr("x1",0).attr("x2",q).attr("y1",T(0)).attr("y2",T(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),e.forEach(C=>{const A=N(l,C);if(!A)return;const z=M.bandwidth(),tt=2,et=S.length,$=z-tt*et,B=S.map(_=>Y(_.pop,.1,1)),j=u.sum(B);let P=M(C);S.forEach((_,at)=>{const F=Math.max(o?B[at]/j*$:$/et,3),nt=c(A,_),St=nt>=0?T(nt):T(0),$t=Math.max(1,Math.abs(T(nt)-T(0)));if(k.append("rect").attr("x",P).attr("y",St).attr("width",F).attr("height",$t).attr("fill",_.color).attr("rx",2).attr("opacity",.85),m&&C!==e[0]){const ut=c(m,_);k.append("line").attr("x1",P).attr("x2",P+F).attr("y1",T(ut)).attr("y2",T(ut)).attr("stroke","#202124").attr("stroke-width",1.5).attr("stroke-dasharray","4 3").attr("opacity",.5)}P+=F+tt})})});return}it(t,D(),(d,l)=>{l.innerHTML="";const p=s(l);a.forEach(i=>{const r=document.createElement("div");r.innerHTML=`<p class="cwi-chart-title">${i==="income"?"Income":"Wealth"}</p>`;const c=document.createElementNS("http://www.w3.org/2000/svg","svg");r.appendChild(c),p.appendChild(r),yt(c,N(i,d),i,o)})},"Animated bars")}function Z(t,e){const n=[];if(t<0&&n.push(t),n.push(0),e<=0)return n;const o=Math.max(3,Math.log10(e)-3),a=Math.log10(e);for(let s=1;s<=3;s++){const d=Math.pow(10,Math.round(o+(a-o)*s/4));!n.includes(d)&&d<e*.95&&n.push(d)}return n}function Wt(t,e,n,o,a,s){const d=u.select(t),l=400,p=250,i={top:14,right:58,bottom:30,left:66},r=l-i.left-i.right,c=p-i.top-i.bottom,m=D(),y=u.scaleLinear().domain(u.extent(m)).range([0,r]),[h,g]=s,w=h<0,f=u.scaleSymlog().constant(1e6).domain([w?h*1.12:0,g*1.1]).range([c,0]),b=Z(h,g);d.attr("class","cwi-svg").attr("viewBox",`0 0 ${l} ${p}`),d.selectAll("*").remove();const v=d.append("g").attr("transform",`translate(${i.left},${i.top})`);v.selectAll("line.hg").data(b).join("line").attr("class","hg").attr("x1",0).attr("x2",r).attr("y1",x=>f(x)).attr("y2",x=>f(x)).attr("stroke","#e8eaed").attr("stroke-width",.8),v.append("g").attr("transform",`translate(0,${c})`).call(u.axisBottom(y).ticks(5).tickFormat(u.format("d"))).call(x=>x.selectAll("text").attr("font-size",10)),v.append("g").call(u.axisLeft(f).tickValues(b).tickFormat(J)).call(x=>x.selectAll("text").attr("font-size",10)),w&&v.append("line").attr("x1",0).attr("x2",r).attr("y1",f(0)).attr("y2",f(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),v.selectAll(".yr-mark").data(a).join("line").attr("class","yr-mark").attr("x1",x=>y(x)).attr("x2",x=>y(x)).attr("y1",0).attr("y2",c).attr("stroke","#dee2e6").attr("stroke-width",1.5);const q=o?Y(e.pop,1,10):1.8;n.forEach((x,k)=>{const M=V(x),T=u.line().defined(C=>Number.isFinite(I(C,e))).x(C=>y(C.year)).y(C=>f(I(C,e)));v.append("path").datum(M).attr("fill","none").attr("stroke",e.color).attr("stroke-width",q).attr("stroke-dasharray",k===1?"5 3":null).attr("d",T)});const L=V(n[0]).at(-1);if(L){const x=I(L,e);Number.isFinite(x)&&v.append("text").attr("x",r+4).attr("y",f(x)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(J(x))}}function Pt(t,e,n,o){const a=V(e),s=u.select(t),d=620,l=340,p={top:20,right:110,bottom:28,left:70},i=d-p.left-p.right,r=l-p.top-p.bottom,c=a.flatMap(f=>S.map(b=>I(f,b))),m=u.min(c),y=u.max(c),h=u.scaleLinear().domain(u.extent(a,f=>f.year)).range([0,i]),g=e==="wealth"?u.scaleSymlog().constant(1e6).domain([m*1.1,y*1.06]).range([r,0]):u.scaleSymlog().constant(1e4).domain([0,y*1.06]).range([r,0]);s.attr("class","cwi-svg").attr("viewBox",`0 0 ${d} ${l}`),s.selectAll("*").remove();const w=s.append("g").attr("transform",`translate(${p.left},${p.top})`);w.append("g").attr("transform",`translate(0,${r})`).call(u.axisBottom(h).tickFormat(u.format("d"))),w.append("g").call(u.axisLeft(g).tickValues(Z(m,y)).tickFormat(J)),e==="wealth"&&m<0&&w.append("line").attr("x1",0).attr("x2",i).attr("y1",g(0)).attr("y2",g(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),w.selectAll(".year-mark").data(o).join("line").attr("x1",f=>h(f)).attr("x2",f=>h(f)).attr("y1",0).attr("y2",r).attr("stroke","#f1f3f5"),S.forEach(f=>{const b=u.line().x(q=>h(q.year)).y(q=>g(I(q,f)));w.append("path").datum(a).attr("fill","none").attr("stroke",f.color).attr("stroke-width",n?Y(f.pop,1,10):2).attr("d",b);const v=a[a.length-1];w.append("text").attr("x",i+6).attr("y",g(I(v,f))).attr("dy","0.35em").attr("font-size",10).attr("fill",f.color).text(f.label)})}function Ft(t,e,n,o,a){if(n==="juxtaposition"){const b=a.includes("income")?V("income"):[],v=a.includes("wealth")?V("wealth"):[],q=[...b.flatMap(k=>S.map(M=>I(k,M))),...v.flatMap(k=>S.map(M=>I(k,M)))].filter(Number.isFinite),L=[u.min(q),u.max(q)];if(a.length>1){const k=document.createElement("p");k.className="cwi-note",k.textContent="Solid line = income · Dashed line = wealth. All panels share the same Y axis.",t.appendChild(k)}const x=document.createElement("div");x.className="cwi-sm-grid",t.appendChild(x),S.forEach(k=>{const M=W(x,k.label),T=document.createElementNS("http://www.w3.org/2000/svg","svg");M.appendChild(T),Wt(T,k,a,o,e,L)});return}if(a.length===1){const b=W(t,a[0]==="income"?"Income over time":"Wealth over time"),v=document.createElementNS("http://www.w3.org/2000/svg","svg");b.appendChild(v),Pt(v,a[0],o,e);return}const s=W(t,"Superposed indexed lines (income solid, wealth dashed)"),d=document.createElement("div");d.className="cwi-inline-legend",d.innerHTML='<span><i style="background:#495057"></i><span>Income solid</span></span><span><i style="background:#ffffff;border:2px dashed #495057"></i><span>Wealth dashed, indexed to 100</span></span>',s.appendChild(d);const l=u.select(s).append("svg").attr("class","cwi-svg tall"),p=840,i=380,r={top:20,right:120,bottom:28,left:70},c=p-r.left-r.right,m=i-r.top-r.bottom,y=D(),h=y.map(b=>({year:b,income:N("income",b),wealth:N("wealth",b)})),g=u.scaleLinear().domain(u.extent(y)).range([0,c]),w=u.scaleLinear().domain([0,260]).range([m,0]);l.attr("viewBox",`0 0 ${p} ${i}`);const f=l.append("g").attr("transform",`translate(${r.left},${r.top})`);f.append("g").attr("transform",`translate(0,${m})`).call(u.axisBottom(g).tickFormat(u.format("d"))),f.append("g").call(u.axisLeft(w).ticks(6).tickFormat(b=>`${Math.round(b)}%`)),S.forEach(b=>{const v=Math.abs(I(h[0].income,b))||1,q=Math.abs(I(h[0].wealth,b))||1,L=u.line().x(M=>g(M.year)).y(M=>w(Math.abs(I(M.income,b))/v*100)),x=u.line().x(M=>g(M.year)).y(M=>w(Math.abs(I(M.wealth,b))/q*100)),k=o?Y(b.pop,1,7):2;f.append("path").datum(h).attr("fill","none").attr("stroke",b.color).attr("stroke-width",k).attr("d",L),f.append("path").datum(h).attr("fill","none").attr("stroke",b.color).attr("stroke-width",k).attr("stroke-dasharray","5 4").attr("opacity",.85).attr("d",x)})}function jt(t,e,n,o,a){const s=(p,i)=>{const r=V(i),c=r[r.length-1],m=r.flatMap($=>S.map(B=>$.values[B.key]||0)),y=u.min(m),h=u.max(m),g=Math.min(0,y*1.12),w=h*1.06,f=700,b=340,v=22,L={top:20,right:o?148:112,bottom:28,left:80},x=f-L.left-L.right,k=b-L.top-L.bottom,M=u.select(p);M.attr("class","cwi-svg").attr("viewBox",`0 0 ${f} ${b}`),M.selectAll("*").remove();const T=u.scaleLinear().domain(u.extent(r,$=>$.year)).range([0,x]),C=i==="wealth"?1e6:1e5,A=u.scaleSymlog().constant(C).domain([g,w]).range([k,0]),z=M.append("g").attr("transform",`translate(${L.left},${L.top})`);if(z.append("g").attr("transform",`translate(0,${k})`).call(u.axisBottom(T).tickFormat(u.format("d"))),z.append("g").call(u.axisLeft(A).tickValues(Z(y,h)).tickFormat(J)),g<0&&z.append("line").attr("x1",0).attr("x2",x).attr("y1",A(0)).attr("y2",A(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),z.selectAll(".yr-ref").data(e).join("line").attr("x1",$=>T($)).attr("x2",$=>T($)).attr("y1",0).attr("y2",k).attr("stroke","#e9ecef"),[...[...S,{key:"middle40",label:"Middle 40%",pop:40,color:"#dee2e6"}]].sort(($,B)=>Math.abs(c.values[B.key]||0)-Math.abs(c.values[$.key]||0)).forEach($=>{const B=u.area().x(j=>T(j.year)).y0(A(0)).y1(j=>A(j.values[$.key]||0));z.append("path").datum(r).attr("fill",$.color).attr("opacity",$.key==="middle40"?.35:.72).attr("d",B)}),S.forEach($=>{const B=c.values[$.key]||0;Number.isFinite(B)&&z.append("text").attr("x",x+5).attr("y",A(B)).attr("dy","0.35em").attr("font-size",10).attr("fill",$.color).text($.label)}),o){const $=x+104;z.append("text").attr("x",$+v/2).attr("y",-7).attr("text-anchor","middle").attr("font-size",9).attr("fill","#6c757d").text("Pop.");const B=S.map(_=>Y(_.pop,.1,1)),j=u.sum(B);let P=0;S.forEach((_,at)=>{const F=Math.max(2,B[at]/j*k);z.append("rect").attr("x",$).attr("y",P).attr("width",v).attr("height",F).attr("rx",2).attr("fill",_.color).attr("opacity",.85),F>=10&&z.append("text").attr("x",$+v/2).attr("y",P+F/2).attr("dy","0.35em").attr("text-anchor","middle").attr("font-size",8).attr("fill","#fff").attr("pointer-events","none").text(_.pop>=1?`${_.pop}%`:`${_.pop}%`),P+=F})}},l=(p=>{if(a.length===1)return p;const i=document.createElement("div");return i.className="cwi-grid-2",p.appendChild(i),i})(t);a.forEach(p=>{const r=W(l,p==="income"?"Average pre-tax income per person (SEK, symlog scale, gray = Middle 40%)":"Average net wealth per person (SEK, symlog scale, gray = Middle 40%, below 0 = net debt)"),c=document.createElementNS("http://www.w3.org/2000/svg","svg");r.appendChild(c),s(c,p)})}function wt(t){const e=N("income",t),n=u.sum(Bt,o=>Math.max(0,e.totals[o]||0));return S.map(o=>{const a=Math.max(0,e.totals[o.key]||0);return n>0?a/n*100:0})}function xt(t,e,n,o,a,s,d){e.forEach(i=>{t.append("rect").attr("x",i.x).attr("y",i.y).attr("width",n).attr("height",o).attr("rx",3).attr("fill",d)});let l=0;a.map((i,r)=>{const c={start:l,end:l+i,color:s[r]};return l+=i,c}).forEach(i=>{e.forEach(r=>{const c=Math.max(r.i,i.start),m=Math.min(r.i+1,i.end);if(m<=c+.001)return;const y=c-r.i,h=m-r.i,g=h-y>=.999,w=r.y+o*(1-h),f=Math.max(1,o*(h-y));t.append("rect").attr("x",r.x).attr("y",w).attr("width",n).attr("height",f).attr("rx",g?3:1).attr("fill",i.color)})})}function ft(t,e,n){const o=u.select(t),a=250,s=n?290:240,d=20,l=wt(e);o.attr("class","cwi-svg").attr("viewBox",`0 0 ${a} ${s}`),o.selectAll("*").remove();const p=u.range(100).map(r=>({i:r,x:15+r%10*22,y:15+(9-Math.floor(r/10))*22})),i=o.append("g");if(xt(i,p,d,d,l,S.map(r=>r.color),"#eef1ea"),n){const r=[...S.map(h=>h.pop),40],c=[...S.map(h=>h.color),"#dee2e6"],m=Mt(r);let y=0;o.append("text").attr("x",15).attr("y",255).attr("font-size",10).attr("fill","#5f6368").text("Population strip (gray = Middle 40%)"),m.forEach((h,g)=>{for(let w=0;w<h;w+=1)o.append("rect").attr("x",15+y*2.05).attr("y",265).attr("width",1.8).attr("height",10).attr("rx",1).attr("fill",c[g]).attr("opacity",.75),y+=1})}}function Ht(t,e,n,o){const a=document.createElement("div");if(a.className="cwi-note",a.textContent="Income waffle shares: population share × average income for each disjoint group. Wealth excluded (negative values).",t.appendChild(a),n==="juxtaposition"){S.forEach((s,d)=>{const l=document.createElement("div");l.style.cssText="margin-bottom:1.2rem;";const p=document.createElement("h4");p.textContent=s.label,p.style.cssText=`font-size:0.95rem;font-weight:700;color:${s.color};margin:0 0 0.4rem;`,l.appendChild(p);const i=document.createElement("div");i.style.cssText="display:flex;flex-wrap:wrap;gap:0.6rem;",e.forEach(r=>{const c=W(i,String(r));c.style.minWidth="170px";const y=wt(r)[d],h=u.select(c).append("svg").attr("class","cwi-svg").attr("viewBox","0 0 240 240"),g=u.range(100).map(b=>({i:b,x:10+b%10*22,y:10+(9-Math.floor(b/10))*22})),w=h.append("g");xt(w,g,20,20,[y],[s.color],"#e9ecef");const f=document.createElement("p");f.textContent=`${y.toFixed(2)}%`,f.style.cssText="text-align:center;font-size:0.8rem;color:#5f6368;margin:0.2rem 0 0;",c.appendChild(f)}),l.appendChild(i),t.appendChild(l)});return}if(n==="superposition"){const s=document.createElement("div");s.className="cwi-years-grid";const d=document.createElement("div");d.className="cwi-inline-legend",d.style.marginBottom="0.6rem",S.forEach(l=>{const p=document.createElement("span");p.innerHTML=`<i style="background:${l.color}"></i><span>${l.label}</span>`,d.appendChild(p)}),t.appendChild(d),t.appendChild(s),e.forEach(l=>{const p=W(s,String(l)),i=document.createElementNS("http://www.w3.org/2000/svg","svg");p.appendChild(i),ft(i,l,o)});return}it(t,D(),(s,d)=>{d.innerHTML="";const l=document.createElementNS("http://www.w3.org/2000/svg","svg");d.appendChild(l),ft(l,s,o)},"Animated income waffle")}function Vt(){Nt();const t=document.getElementById("cwi-spec-summary"),e=document.getElementById("cwi-years-input"),n=document.getElementById("cwi-representation"),o=document.getElementById("cwi-comparison"),a=document.getElementById("cwi-metric"),s=document.getElementById("cwi-pop-encoding"),d=document.getElementById("cwi-meta"),l=document.getElementById("cwi-note"),p=document.getElementById("cwi-render-root");if(!t||!e||!n||!o||!a||!s||!d||!l||!p)return;t.innerHTML="<strong>30 combinations</strong> from 5 representations × 3 comparison conditions × 2 population encodings, minus <strong>2 invalid animation cases</strong> for line and stacked area charts. That leaves <strong>28 valid configurations</strong>.";const i=()=>{H&&(clearInterval(H),H=null);const r=At(e.value),c=n.value,m=s.value==="with";a.disabled=c==="waffle",c==="waffle"&&(a.value="income");const y=a.value==="both"?["income","wealth"]:[a.value];Array.from(o.options).forEach(w=>{w.disabled=(c==="line"||c==="stacked")&&w.value==="animation"}),(c==="line"||c==="stacked")&&o.value==="animation"&&(o.value="juxtaposition");const h=o.value,g=y.length===2?"income + wealth":y[0];d.textContent=`Configuration: ${c} / ${h} / ${g} / ${m?"with":"without"} pop. encoding. Years: ${r.join(", ")}.`,l.textContent=c==="waffle"?"Waffle charts show income only — wealth has negative values that cannot map to waffle proportions.":c==="line"||c==="stacked"?"Line and stacked-area charts use the full time series; selected years are marked as reference points.":"Discrete views use the selected comparison years directly. Edit the year list above to change time points.",p.innerHTML="",c==="table"&&_t(p,r,h,m,y),c==="bar"&&zt(p,r,h,m,y),c==="line"&&Ft(p,r,h,m,y),c==="stacked"&&jt(p,r,h,m,y),c==="waffle"&&Ht(p,r,h,m)};n.addEventListener("change",i),o.addEventListener("change",i),a.addEventListener("change",i),s.addEventListener("change",i),e.addEventListener("change",i),e.addEventListener("blur",i),i()}const lt="1.0",vt="wealth-study-data",R=[{id:"consent",type:"info",title:"Participant Information & Consent",content:`
      <p>You are invited to participate in a user study conducted as part of a Master's thesis at Linköping University. The study investigates how different visualization types help people understand wealth and income inequality in Sweden.</p>
      <p><strong>What you will do:</strong> Answer a few background questions, interact with an interactive chart tool, and answer questions about what you see. The study takes approximately <strong>10–15 minutes</strong>.</p>
      <p><strong>Data:</strong> Your responses are stored locally in your browser. No personal data (name, email, IP address) is collected. At the end you can download a copy of your answers as a JSON file for the researcher.</p>
      <p><strong>Participation is voluntary.</strong> You may stop at any time by closing the browser tab.</p>
      <label class="consent-check">
        <input type="checkbox" id="consent-checkbox" />
        I have read the information above and agree to participate.
      </label>`,nextLabel:"Start Study",requireConsent:!0},{id:"pre_q1",type:"question",phase:"Pre-study",questionNum:"1 / 3",text:"In 2024, approximately what share of Sweden's total wealth was held by the richest 1% of adults?",options:[{label:"Less than 15 %",value:"a"},{label:"15 – 25 %",value:"b"},{label:"25 – 35 %",value:"c"},{label:"35 – 50 %",value:"d"},{label:"More than 50 %",value:"e"}],correctValue:"d",note:"(Answer this from memory — no need to look anything up yet.)"},{id:"pre_q2",type:"question",phase:"Pre-study",questionNum:"2 / 3",text:"How do you think Swedish wealth inequality has changed between 1980 and 2024?",options:[{label:"It decreased significantly",value:"a"},{label:"It decreased slightly",value:"b"},{label:"It stayed about the same",value:"c"},{label:"It increased slightly",value:"d"},{label:"It increased significantly",value:"e"}],correctValue:"e",note:"(Answer from your current understanding.)"},{id:"pre_q3",type:"question",phase:"Pre-study",questionNum:"3 / 3",text:"Compared to income inequality, how unequal is wealth distribution in Sweden?",options:[{label:"Wealth is much less unequal than income",value:"a"},{label:"Wealth is slightly less unequal than income",value:"b"},{label:"They are about equally unequal",value:"c"},{label:"Wealth is slightly more unequal than income",value:"d"},{label:"Wealth is much more unequal than income",value:"e"}],correctValue:"e",note:"(Answer from your current understanding.)"},{id:"task_intro",type:"info",title:"Visualization Tasks",content:`
      <p>You will now complete <strong>5 short tasks</strong> using the visualization tool.</p>
      <p>For each task, the chart will be set to a specific configuration automatically.
         Read the task description carefully, explore the chart, then answer the question.</p>
      <p>The chart controls (Representation, Comparison, etc.) are available above the chart —
         feel free to adjust them if a task asks you to explore, but some tasks will lock them
         to a required setting.</p>
      <ul>
        <li>You can zoom in, hover for tooltips, and read axis labels.</li>
        <li>There is no time limit — take as long as you need.</li>
        <li>Some questions have a correct answer; others ask for your opinion.</li>
      </ul>`,nextLabel:"Begin Tasks"},{id:"task1",type:"task",phase:"Task 1 of 5",vizConfig:{representation:"bar",comparison:"juxtaposition",metric:"wealth",popEncoding:"without",years:"1980,1990,2000,2010,2020,2024"},taskText:"The chart shows average net personal wealth (SEK) for six population groups in selected years. Examine the bar chart, paying particular attention to the 2024 column.",questionText:"In 2024, what was approximately the net wealth position of the Bottom 50% of Swedish adults?",options:[{label:"About +500,000 SEK (positive wealth)",value:"a"},{label:"About +100,000 SEK (slightly positive)",value:"b"},{label:"Near zero or negative (effectively no net wealth)",value:"c"},{label:"About −1,000,000 SEK (heavily in debt)",value:"d"},{label:"Cannot tell from the chart",value:"e"}],correctValue:"c"},{id:"task2",type:"task",phase:"Task 2 of 5",vizConfig:{representation:"table",comparison:"juxtaposition",metric:"both",popEncoding:"without",years:"1980,2024"},taskText:"The table now shows numerical values for both income and wealth in 1980 and 2024. Examine the numbers for the Top 1% and Top 0.1% rows.",questionText:"Based on the numbers in the table: between 1980 and 2024, which increased more — income inequality or wealth inequality?",options:[{label:"Income inequality increased more",value:"a"},{label:"Wealth inequality increased more",value:"b"},{label:"They increased about equally",value:"c"},{label:"Both decreased",value:"d"},{label:"Cannot tell from the table",value:"e"}],correctValue:"b"},{id:"task3",type:"task",phase:"Task 3 of 5",vizConfig:{representation:"bar",comparison:"juxtaposition",metric:"both",popEncoding:"without",years:"1980,2024"},taskText:"The same data (income and wealth for 1980 and 2024) is now shown as a bar chart instead of a table.",questionText:"Based on the bar chart: between 1980 and 2024, which increased more — income inequality or wealth inequality?",options:[{label:"Income inequality increased more",value:"a"},{label:"Wealth inequality increased more",value:"b"},{label:"They increased about equally",value:"c"},{label:"Both decreased",value:"d"},{label:"Cannot tell from the chart",value:"e"}],correctValue:"b",note:"This is the same question as Task 2 — we are comparing how easy it is to answer with a table vs. a chart."},{id:"task4",type:"task",phase:"Task 4 of 5",vizConfig:{representation:"line",comparison:"superposition",metric:"wealth",popEncoding:"without",years:"1980,1990,2000,2010,2020,2024"},taskText:"All six groups are shown as overlapping lines (WITHOUT population-size encoding — all lines have the same thickness). Each line shows how average wealth changed from 1980 to 2024.",questionText:"Without looking at the legend, can you tell from the chart alone which group has the SMALLEST population (fewest number of people)?",options:[{label:"Yes — it is clearly the Bottom 50%",value:"a"},{label:"Yes — it is clearly the Top 0.001%",value:"b"},{label:"Yes — it is one of the middle groups",value:"c"},{label:"No — the chart gives no information about group size",value:"d"}],correctValue:"d"},{id:"task5",type:"task",phase:"Task 5 of 5",vizConfig:{representation:"line",comparison:"superposition",metric:"wealth",popEncoding:"with",years:"1980,1990,2000,2010,2020,2024"},taskText:"The same chart is now shown WITH population-size encoding: each line's thickness is proportional to the group's share of the population. A thicker line means a larger group.",questionText:"Based on the line thicknesses, which group has the SMALLEST population (fewest number of people)?",options:[{label:"Bottom 50%",value:"a"},{label:"Top 9%",value:"b"},{label:"Top 0.9%",value:"c"},{label:"Top 0.09%",value:"d"},{label:"Top 0.001%",value:"e"}],correctValue:"e",note:"The Top 0.001% of Sweden's adult population is approximately 80 people out of 8 million."},{id:"post_q1",type:"question",phase:"Post-study",questionNum:"1 / 5",text:"After using the visualization tool, what do you now think is the approximate share of total Swedish wealth held by the richest 1% in 2024?",options:[{label:"Less than 15 %",value:"a"},{label:"15 – 25 %",value:"b"},{label:"25 – 35 %",value:"c"},{label:"35 – 50 %",value:"d"},{label:"More than 50 %",value:"e"}],correctValue:"d"},{id:"post_q2",type:"question",phase:"Post-study",questionNum:"2 / 5",text:"After using the tool, how do you think Swedish wealth inequality changed between 1980 and 2024?",options:[{label:"It decreased significantly",value:"a"},{label:"It decreased slightly",value:"b"},{label:"It stayed about the same",value:"c"},{label:"It increased slightly",value:"d"},{label:"It increased significantly",value:"e"}],correctValue:"e"},{id:"post_q3",type:"question",phase:"Post-study",questionNum:"3 / 5",text:"After using the tool, how unequal is wealth distribution in Sweden compared to income distribution?",options:[{label:"Wealth is much less unequal than income",value:"a"},{label:"Wealth is slightly less unequal than income",value:"b"},{label:"They are about equally unequal",value:"c"},{label:"Wealth is slightly more unequal than income",value:"d"},{label:"Wealth is much more unequal than income",value:"e"}],correctValue:"e"},{id:"post_q4",type:"question",phase:"Post-study",questionNum:"4 / 5",text:"In Task 5, line thickness was proportional to group population share. Did the thickness encoding help you understand how few people are in the top groups?",options:[{label:"Yes, it was very helpful",value:"5"},{label:"Yes, it was somewhat helpful",value:"4"},{label:"Neither helpful nor unhelpful",value:"3"},{label:"No, it was somewhat confusing",value:"2"},{label:"No, it was very confusing",value:"1"}]},{id:"post_q5",type:"question",phase:"Post-study",questionNum:"5 / 5",text:"Which chart type did you find most useful for understanding the wealth and income distribution?",options:[{label:"Data table",value:"table"},{label:"Line chart",value:"line"},{label:"Stacked area chart",value:"stacked"},{label:"Bar chart",value:"bar"},{label:"Waffle chart",value:"waffle"}]},{id:"complete",type:"complete",title:"Thank you for participating!",content:`
      <p>Your responses have been recorded. Please download your data file and send it to the researcher.</p>
      <p><strong>Contact:</strong> Submit your downloaded JSON file to the researcher as instructed.</p>`}],E={currentStep:0,startTime:Date.now(),stepTimes:{},answers:{},participantId:Math.random().toString(36).slice(2,9)};function Rt(t){const e=document.getElementById("cwi-representation"),n=document.getElementById("cwi-comparison"),o=document.getElementById("cwi-metric"),a=document.getElementById("cwi-pop-encoding"),s=document.getElementById("cwi-years-input");e&&(t.representation&&(e.value=t.representation),t.years&&(s.value=t.years,s.dispatchEvent(new Event("change"))),t.metric&&(o.value=t.metric),t.comparison&&(n.value=t.comparison),t.popEncoding&&(a.value=t.popEncoding),e.dispatchEvent(new Event("change")))}function kt(t,e,n={}){E.answers[t]={value:e,timestamp:Date.now(),elapsed:Date.now()-(E.stepTimes[t]||E.startTime),...n},localStorage.setItem(vt,JSON.stringify({state:E,version:lt}))}function Yt(){R.find(a=>a.id==="pre_q1");const t={participantId:E.participantId,studyVersion:lt,startTime:new Date(E.startTime).toISOString(),completedTime:new Date().toISOString(),answers:E.answers,summary:Et()},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),o=document.createElement("a");o.href=n,o.download=`study-${E.participantId}.json`,o.click(),URL.revokeObjectURL(n)}function Et(){var o,a,s,d,l,p,i;const t=["pre_q1","pre_q2","pre_q3"],e=["post_q1","post_q2","post_q3"],n=r=>r.reduce((c,m)=>{const y=R.find(g=>g.id===m),h=E.answers[m];return!y||!h||!y.correctValue?c:c+(h.value===y.correctValue?1:0)},0);return{preStudyScore:`${n(t)} / ${t.length}`,postStudyScore:`${n(e)} / ${e.length}`,task2_tableCorrect:((o=E.answers.task2)==null?void 0:o.value)==="b",task3_chartCorrect:((a=E.answers.task3)==null?void 0:a.value)==="b",task4_noEncoding:(s=E.answers.task4)==null?void 0:s.value,task5_withEncoding:(d=E.answers.task5)==null?void 0:d.value,task5Correct:((l=E.answers.task5)==null?void 0:l.value)==="e",populationEncodingRating:(p=E.answers.post_q4)==null?void 0:p.value,preferredChart:(i=E.answers.post_q5)==null?void 0:i.value}}function ct(){const t=R[E.currentStep];E.stepTimes[t.id]=Date.now();const e=document.getElementById("study-overlay"),n=document.getElementById("study-panel"),o=document.getElementById("study-task-banner");t.type==="task"?(e.classList.add("hidden"),o.classList.remove("hidden"),Rt(t.vizConfig),Kt(t,o)):(o.classList.add("hidden"),e.classList.remove("hidden"),t.type==="info"&&Dt(t,n),t.type==="question"&&Ot(t,n),t.type==="complete"&&Ut(t,n)),Gt()}function Dt(t,e){var n,o;if(e.innerHTML=`
    <div class="study-phase-tag">Information</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-nav">
      ${E.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${t.requireConsent?"disabled":""}>${t.nextLabel||"Next →"}</button>
    </div>`,t.requireConsent){const a=e.querySelector("#consent-checkbox"),s=e.querySelector("#study-next");a.addEventListener("change",()=>{s.disabled=!a.checked})}(n=e.querySelector("#study-next"))==null||n.addEventListener("click",dt),(o=e.querySelector("#study-prev"))==null||o.addEventListener("click",pt)}function Ot(t,e){var o,a;const n=(o=E.answers[t.id])==null?void 0:o.value;e.innerHTML=`
    <div class="study-phase-tag">${t.phase} — Question ${t.questionNum}</div>
    <h2 class="study-title">${t.text}</h2>
    ${t.note?`<p class="study-note">${t.note}</p>`:""}
    <div class="study-options" id="study-options">
      ${t.options.map(s=>`
        <label class="study-option ${n===s.value?"selected":""}">
          <input type="radio" name="sq" value="${s.value}" ${n===s.value?"checked":""}/>
          ${s.label}
        </label>`).join("")}
    </div>
    <div class="study-nav">
      ${E.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${n?"":"disabled"}>Next →</button>
    </div>`,e.querySelectorAll(".study-option").forEach(s=>{s.addEventListener("click",()=>{e.querySelectorAll(".study-option").forEach(l=>l.classList.remove("selected")),s.classList.add("selected");const d=s.querySelector("input").value;kt(t.id,d),e.querySelector("#study-next").disabled=!1})}),e.querySelector("#study-next").addEventListener("click",dt),(a=e.querySelector("#study-prev"))==null||a.addEventListener("click",pt)}let X="description";function Kt(t,e){X="description",e.innerHTML=ot(t),st(t,e)}function ot(t){var n;const e=(n=E.answers[t.id])==null?void 0:n.value;return X==="description"?`
      <div class="task-banner-inner">
        <div class="task-phase-tag">${t.phase}</div>
        <p class="task-desc">${t.taskText}</p>
        <div class="task-banner-nav">
          <button class="study-btn secondary" id="task-back">← Back</button>
          <button class="study-btn primary" id="task-ready">I've examined the chart — show question →</button>
        </div>
      </div>`:`
    <div class="task-banner-inner">
      <div class="task-phase-tag">${t.phase} — Question</div>
      <p class="task-question"><strong>${t.questionText}</strong></p>
      ${t.note?`<p class="study-note">${t.note}</p>`:""}
      <div class="task-options-row">
        ${t.options.map(o=>`
          <label class="task-option ${e===o.value?"selected":""}">
            <input type="radio" name="tq" value="${o.value}" ${e===o.value?"checked":""}/>
            ${o.label}
          </label>`).join("")}
      </div>
      <div class="task-banner-nav">
        <button class="study-btn secondary" id="task-back-q">← Re-read description</button>
        <button class="study-btn primary" id="task-submit" ${e?"":"disabled"}>Submit →</button>
      </div>
    </div>`}function st(t,e){var n,o,a,s;(n=e.querySelector("#task-back"))==null||n.addEventListener("click",()=>{pt()}),(o=e.querySelector("#task-ready"))==null||o.addEventListener("click",()=>{X="question",e.innerHTML=ot(t),st(t,e)}),(a=e.querySelector("#task-back-q"))==null||a.addEventListener("click",()=>{X="description",e.innerHTML=ot(t),st(t,e)}),e.querySelectorAll(".task-option").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".task-option").forEach(p=>p.classList.remove("selected")),d.classList.add("selected");const l=d.querySelector("input").value;kt(t.id,l),e.querySelector("#task-submit").disabled=!1})}),(s=e.querySelector("#task-submit"))==null||s.addEventListener("click",dt)}function Ut(t,e){const n=Et();e.innerHTML=`
    <div class="study-phase-tag">Complete</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-summary">
      <h3>Your response summary</h3>
      <table class="summary-table">
        <tr><th>Pre-study knowledge score</th><td>${n.preStudyScore}</td></tr>
        <tr><th>Post-study knowledge score</th><td>${n.postStudyScore}</td></tr>
        <tr><th>Task 2 (table) — correct?</th><td>${n.task2_tableCorrect?"✓ Yes":"✗ No"}</td></tr>
        <tr><th>Task 3 (bar chart) — correct?</th><td>${n.task3_chartCorrect?"✓ Yes":"✗ No"}</td></tr>
        <tr><th>Task 4 (no encoding) — group size answer</th><td>${n.task4_noEncoding??"—"}</td></tr>
        <tr><th>Task 5 (with encoding) — correct?</th><td>${n.task5Correct?"✓ Yes (Top 0.001%)":"✗ No"}</td></tr>
        <tr><th>Population encoding helpfulness</th><td>${n.populationEncodingRating??"—"} / 5</td></tr>
        <tr><th>Preferred chart type</th><td>${n.preferredChart??"—"}</td></tr>
      </table>
    </div>
    <div class="study-nav centered">
      <button class="study-btn primary large" id="study-download">⬇ Download my data (JSON)</button>
    </div>`,e.querySelector("#study-download").addEventListener("click",Yt)}function Gt(){const t=document.getElementById("study-progress-bar"),e=document.getElementById("study-progress-label"),n=R.length-1,o=Math.round(E.currentStep/n*100);t&&(t.style.width=o+"%"),e&&(e.textContent=`Step ${E.currentStep+1} of ${R.length}`)}function dt(){E.currentStep<R.length-1&&(E.currentStep++,ct())}function pt(){E.currentStep>0&&(E.currentStep--,ct())}function Jt(){Qt(),Xt();try{const t=localStorage.getItem(vt);if(t){const e=JSON.parse(t);e.version===lt&&e.state&&Object.assign(E,e.state)}}catch{}document.getElementById("study-launch-btn").addEventListener("click",()=>{document.getElementById("study-launcher").classList.add("hidden"),document.getElementById("study-overlay").classList.remove("hidden"),ct()})}function Qt(){document.body.insertAdjacentHTML("beforeend",`
    <!-- Launch button -->
    <div id="study-launcher" class="study-launcher">
      <button id="study-launch-btn" class="study-launch-btn">
        🎓 Start User Study
      </button>
    </div>

    <!-- Progress bar (shown during study) -->
    <div id="study-progress-container" class="study-progress-container hidden">
      <div id="study-progress-bar" class="study-progress-bar" style="width:0%"></div>
      <span id="study-progress-label" class="study-progress-label"></span>
    </div>

    <!-- Full-screen overlay (for info/question/complete steps) -->
    <div id="study-overlay" class="study-overlay hidden">
      <div id="study-panel" class="study-panel"></div>
    </div>

    <!-- Task banner (shown over the visualization) -->
    <div id="study-task-banner" class="study-task-banner hidden"></div>
  `),new MutationObserver(()=>{const e=document.getElementById("study-overlay"),n=document.getElementById("study-task-banner"),o=document.getElementById("study-progress-container");e.classList.contains("hidden")&&n.classList.contains("hidden")&&E.currentStep===0?o.classList.add("hidden"):o.classList.remove("hidden")}).observe(document.getElementById("study-overlay"),{attributes:!0})}function Xt(){const t=document.createElement("style");t.textContent=`
/* ── Study launcher ── */
.study-launcher {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9000;
}
.study-launch-btn {
  background: #2b6cb0;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px 22px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  transition: background 0.2s;
}
.study-launch-btn:hover { background: #2c5282; }

/* ── Progress ── */
.study-progress-container {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 6px;
  background: #e2e8f0;
  z-index: 9100;
  display: flex;
  align-items: center;
}
.study-progress-bar {
  height: 100%;
  background: #2b6cb0;
  transition: width 0.4s ease;
}
.study-progress-label {
  position: fixed;
  top: 8px;
  right: 12px;
  font-size: 11px;
  color: #718096;
  z-index: 9101;
}

/* ── Full-screen overlay ── */
.study-overlay {
  position: fixed;
  inset: 0;
  background: rgba(247, 250, 252, 0.97);
  z-index: 9200;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 16px;
}
.study-panel {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
  padding: 40px 48px;
  max-width: 680px;
  width: 100%;
}

/* ── Typography ── */
.study-phase-tag {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2b6cb0;
  margin-bottom: 10px;
}
.study-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 18px;
  line-height: 1.4;
}
.study-body { font-size: 15px; color: #2d3748; line-height: 1.7; }
.study-body p { margin: 0 0 12px; }
.study-body ul { margin: 0 0 12px; padding-left: 20px; }
.study-note { font-size: 13px; color: #718096; font-style: italic; margin-bottom: 16px; }

/* ── Consent checkbox ── */
.consent-check { display: flex; align-items: flex-start; gap: 10px; font-size: 14px;
  color: #2d3748; cursor: pointer; margin-top: 16px; }
.consent-check input { margin-top: 3px; flex-shrink: 0; width: 16px; height: 16px; }

/* ── Options ── */
.study-options { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
.study-option {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #2d3748;
  transition: border-color 0.15s, background 0.15s;
}
.study-option:hover { border-color: #90cdf4; background: #ebf8ff; }
.study-option.selected { border-color: #2b6cb0; background: #ebf8ff; font-weight: 600; }
.study-option input { accent-color: #2b6cb0; width: 16px; height: 16px; flex-shrink: 0; }

/* ── Navigation ── */
.study-nav { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
.study-nav.centered { justify-content: center; }
.study-btn {
  padding: 10px 22px; border-radius: 7px; font-size: 14px;
  font-weight: 600; border: none; cursor: pointer; transition: 0.15s;
}
.study-btn.primary { background: #2b6cb0; color: #fff; }
.study-btn.primary:hover:not(:disabled) { background: #2c5282; }
.study-btn.primary:disabled { background: #a0aec0; cursor: not-allowed; }
.study-btn.secondary { background: #edf2f7; color: #2d3748; }
.study-btn.secondary:hover { background: #e2e8f0; }
.study-btn.large { padding: 14px 32px; font-size: 16px; }

/* ── Task banner ── */
.study-task-banner {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: rgba(255, 255, 255, 0.97);
  border-top: 3px solid #2b6cb0;
  z-index: 9200;
  box-shadow: 0 -4px 24px rgba(0,0,0,0.12);
  max-height: 42vh;
  overflow-y: auto;
}
.task-banner-inner { padding: 16px 24px; max-width: 1100px; margin: 0 auto; }
.task-phase-tag {
  font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; color: #2b6cb0; margin-bottom: 6px;
}
.task-desc { font-size: 14px; color: #2d3748; line-height: 1.6; margin: 0 0 12px; }
.task-question { font-size: 15px; color: #1a202c; margin: 0 0 12px; }
.task-options-row {
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;
}
.task-option {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 7px;
  cursor: pointer;
  font-size: 13px;
  color: #2d3748;
  transition: border-color 0.15s, background 0.15s;
  white-space: nowrap;
}
.task-option:hover { border-color: #90cdf4; background: #ebf8ff; }
.task-option.selected { border-color: #2b6cb0; background: #ebf8ff; font-weight: 600; }
.task-option input { accent-color: #2b6cb0; width: 14px; height: 14px; flex-shrink: 0; }
.task-banner-nav { display: flex; gap: 10px; justify-content: flex-end; }

/* ── Summary table ── */
.study-summary { margin: 20px 0; }
.study-summary h3 { font-size: 15px; font-weight: 700; color: #2d3748; margin: 0 0 12px; }
.summary-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.summary-table th, .summary-table td {
  text-align: left; padding: 8px 12px;
  border-bottom: 1px solid #e2e8f0;
}
.summary-table th { color: #718096; font-weight: 600; width: 55%; }
.summary-table td { color: #2d3748; font-weight: 600; }

/* ── Utilities ── */
.hidden { display: none !important; }

/* ── Responsive: push viz up when task banner is open ── */
body:has(#study-task-banner:not(.hidden)) #app {
  padding-bottom: 42vh;
}
  `,document.head.appendChild(t)}Jt();
