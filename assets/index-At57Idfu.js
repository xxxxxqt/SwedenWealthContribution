(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();const o=window.d3;function Kt(t){const e=t.map(Math.floor);let r=100-o.sum(e);const s=t.map((n,a)=>({i:a,frac:n-Math.floor(n)})).sort((n,a)=>a.frac-n.frac);for(let n=0;n<s.length&&r>0;n+=1)e[s[n].i]+=1,r-=1;return e}const Wt=[{key:"bottom50",label:"Bottom 50%",color:"#4dabf7",pop:50},{key:"top10",label:"Top 10%",color:"#fcc419",pop:10},{key:"top1",label:"Top 1%",color:"#ff8787",pop:1},{key:"top01",label:"Top 0.1%",color:"#e599f7",pop:.1},{key:"top001",label:"Top 0.01%",color:"#ff6b6b",pop:.01},{key:"top0001",label:"Top 0.001%",color:"#c92a2a",pop:.001}];o.scaleSqrt().domain([.001,50]).range([.6,6]);let yt=[];async function Ut(){const e=(await o.text("./data/wealth_avg.csv")).split(`
`),r=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};yt=[];for(let n=1;n<e.length;n++){const a=e[n].split(",");if(a.length<r.length)continue;const u=Number(a[0]);if(!Number.isFinite(u))continue;const d={year:u};let h=!0;for(let m=1;m<r.length;m++){const l=s[r[m].trim()];if(!l)continue;const i=Number(a[m]);if(!Number.isFinite(i)){h=!1;break}d[l]=i}h&&d.bottom50!==void 0&&yt.push(d)}yt.sort((n,a)=>n.year-a.year),new Map(yt.map(n=>[n.year,n]))}let ft=[];async function Jt(){const e=(await o.text("./data/income_avg.csv")).split(`
`),r=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};ft=[];for(let n=1;n<e.length;n++){const a=e[n].split(",");if(a.length<2)continue;const u=Number(a[0]);if(!Number.isFinite(u))continue;const d={year:u};for(let h=1;h<r.length;h++){const m=s[r[h].trim()];m&&(d[m]=Number(a[h])||0)}d.bottom50!==void 0&&ft.push(d)}ft.sort((n,a)=>n.year-a.year),new Map(ft.map(n=>[n.year,n]))}function Qt(t){const e=Math.abs(t);return e>=1e9?(t/1e9).toFixed(1)+"B":e>=1e6?(t/1e6).toFixed(1)+"M":e>=1e3?(t/1e3).toFixed(0)+"K":t.toFixed(0)}function qt(t){return t>=1?`${t}%`:t>=.1?`${t.toFixed(1)}%`:t>=.01?`${t.toFixed(2)}%`:`${t.toFixed(3)}%`}function U(t){const e=Math.abs(t);return e>=1e9?`${(t/1e9).toFixed(e>=1e10?0:1)}B`:e>=1e6?`${(t/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(t/1e3).toFixed(e>=1e5?0:1)}K`:`${Math.round(t)}`}Wt.filter(t=>["top0001","top001"].includes(t.key));Wt.filter(t=>!["top0001","top001"].includes(t.key));o.scaleSqrt().domain([.001,50]).range([.6,6]);async function Zt(){await Promise.all([Ut(),Jt()]),de()}Zt();const Dt=[1980,1990,2e3,2010,2020,2024],z=[{key:"bottom50",label:"Bottom 50%",pop:50,color:"#4dabf7"},{key:"top9",label:"Top 10%",pop:9,color:"#ffd43b"},{key:"top0_9",label:"Top 1%",pop:.9,color:"#ff922b"},{key:"top0_09",label:"Top 0.1%",pop:.09,color:"#f06595"},{key:"top0_009",label:"Top 0.01%",pop:.009,color:"#e64980"},{key:"top0_001",label:"Top 0.001%",pop:.001,color:"#c92a2a"}],Ot=["bottom50","middle40","top9","top0_9","top0_09","top0_009","top0_001"];function mt(t,e,r){const s=Math.log10(.001),n=Math.log10(50),a=(Math.log10(Math.max(t,1e-4))-s)/(n-s);return e+a*(r-e)}let xt=[],Mt=[],Yt=new Map,Lt=new Map,pt=null;function jt(t){if(!t)return null;const e={bottom50:t.bottom50*50,middle40:t.mid40*40,top10:t.top10*10,top1:t.top1*1,top01:t.top01*.1,top001:t.top001*.01,top0001:t.top0001*.001};return{year:t.year,values:{bottom50:t.bottom50,middle40:t.mid40,top9:(e.top10-e.top1)/9,top0_9:(e.top1-e.top01)/.9,top0_09:(e.top01-e.top001)/.09,top0_009:(e.top001-e.top0001)/.009,top0_001:t.top0001},totals:{bottom50:e.bottom50,middle40:e.middle40,top9:e.top10-e.top1,top0_9:e.top1-e.top01,top0_09:e.top01-e.top001,top0_009:e.top001-e.top0001,top0_001:e.top0001}}}function te(){xt.length&&Mt.length||(xt=ft.map(jt).filter(Boolean),Mt=yt.map(jt).filter(Boolean),Yt=new Map(xt.map(t=>[t.year,t])),Lt=new Map(Mt.map(t=>[t.year,t])))}function ut(){return xt.map(t=>t.year).filter(t=>Lt.has(t))}function ee(t){var s;const e=new Set(ut()),r=Array.from(new Set(((s=String(t).match(/\d{4}/g))==null?void 0:s.map(Number))||[])).filter(n=>e.has(n)).sort((n,a)=>n-a);return r.length?r:Dt.filter(n=>e.has(n))}function Z(t,e){return(t==="income"?Yt:Lt).get(e)}function D(t){return t==="income"?xt:Mt}function R(t,e,r){return t.values[e.key]}function kt(t){return`${Qt(t)} SEK`}function ot(t,e){const r=document.createElement("div");if(r.className="cwi-card",e){const s=document.createElement("h3");s.textContent=e,r.appendChild(s)}return t.appendChild(r),r}function Tt(t,e,r,s){const n=document.createElement("div");n.className="cwi-anim-bar",n.innerHTML=`<button type="button" id="cwi-matrix-play">Play</button><input type="range" id="cwi-matrix-year" min="0" max="${e.length-1}" step="1" value="0"><span id="cwi-matrix-year-label">${e[0]}</span>`,t.appendChild(n);const a=ot(t,s),u=document.createElement("div");a.appendChild(u);const d=n.querySelector("#cwi-matrix-year"),h=n.querySelector("#cwi-matrix-play"),m=n.querySelector("#cwi-matrix-year-label"),l=i=>{const c=e[i];m.textContent=String(c),r(c,u)};d.addEventListener("input",()=>l(Number(d.value))),h.addEventListener("click",()=>{if(pt){clearInterval(pt),pt=null,h.textContent="Play";return}h.textContent="Pause",pt=setInterval(()=>{const i=(Number(d.value)+1)%e.length;d.value=String(i),l(i)},900)}),l(0)}function ae(t,e,r,s,n){const a=n.includes("income"),u=n.includes("wealth"),d=`${a?"<th>Income</th>":""}${u?"<th>Wealth</th>":""}`,h=(m,l,i)=>{const c=s?`<td>${qt(m.pop)}</td>`:"",S=a?`<td>${kt(l.values[m.key])}</td>`:"",x=u?`<td>${kt(i.values[m.key])}</td>`:"";return`<tr><td>${m.label}</td>${c}${S}${x}</tr>`};if(r==="juxtaposition"){const m=document.createElement("div");m.className="cwi-years-grid",t.appendChild(m),e.forEach(l=>{const i=ot(m,String(l)),c=document.createElement("table");c.className="cwi-table",c.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${d}</tr></thead><tbody>${z.map(S=>h(S,Z("income",l),Z("wealth",l))).join("")}</tbody>`,i.appendChild(c)});return}if(r==="superposition"){const m=ot(t,"Combined table across selected years"),l=document.createElement("table");l.className="cwi-table";const i=n.length,c=`<tr><th rowspan="2">Group</th>${s?'<th rowspan="2">Pop.</th>':""}${e.map(M=>`<th colspan="${i}">${M}</th>`).join("")}</tr>`,S=`<tr>${e.map(()=>`${a?"<th>Income</th>":""}${u?"<th>Wealth</th>":""}`).join("")}</tr>`,x=z.map(M=>{const k=e.map(v=>{const I=Z("income",v),L=Z("wealth",v);return`${a?`<td>${kt(I.values[M.key])}</td>`:""}${u?`<td>${kt(L.values[M.key])}</td>`:""}`}).join("");return`<tr><td>${M.label}</td>${s?`<td>${qt(M.pop)}</td>`:""}${k}</tr>`}).join("");l.innerHTML=`<thead>${c}${S}</thead><tbody>${x}</tbody>`,m.appendChild(l);return}Tt(t,ut(),(m,l)=>{l.innerHTML="";const i=document.createElement("table");i.className="cwi-table",i.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${d}</tr></thead><tbody>${z.map(c=>h(c,Z("income",m),Z("wealth",m))).join("")}</tbody>`,l.appendChild(i)},"Animated table")}function Pt(t,e,r,s,n){const a=o.select(t),u=520,d=310,h={top:18,right:16,bottom:28,left:120},m=u-h.left-h.right,l=d-h.top-h.bottom,i=z.map(b=>R(e,b)),c=o.min(i),S=o.max(i),x=(n==null?void 0:n.min)!=null?n.min:Math.min(0,c),M=(n==null?void 0:n.max)!=null?n.max:S*1.05,k=o.scaleLinear().domain([x,M]).range([0,m]),v=l/z.length;a.attr("class","cwi-svg").attr("viewBox",`0 0 ${u} ${d}`),a.selectAll("*").remove();const I=`clip-hbar-${r}-${Math.random().toString(36).slice(2)}`;a.append("defs").append("clipPath").attr("id",I).append("rect").attr("width",m).attr("height",l);const L=a.append("g").attr("transform",`translate(${h.left},${h.top})`);if(L.append("g").attr("transform",`translate(0,${l})`).call(o.axisBottom(k).ticks(5).tickFormat(U)),x<0||M>0){const b=k(Math.max(x,Math.min(0,M)));L.append("line").attr("x1",b).attr("x2",b).attr("y1",0).attr("y2",l).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3")}const g=o.select("#cwi-tooltip"),N=L.append("g").attr("clip-path",`url(#${I})`);z.forEach((b,$)=>{const q=R(e,b),C=s?mt(b.pop,v*.18,v*.82):v*.7,y=$*v+v/2,E=y-C/2,T=k(Math.max(x,Math.min(0,q))),p=k(Math.min(M,Math.max(0,q)));L.append("text").attr("x",-10).attr("y",y).attr("dy","0.35em").attr("text-anchor","end").attr("font-size",10).text(b.label),N.append("rect").attr("x",Math.min(T,p)).attr("y",E).attr("width",Math.max(2,Math.abs(p-T))).attr("height",C).attr("rx",3).attr("fill",b.color).style("cursor","crosshair").on("mouseover",w=>{g.html(`<strong style="color:${b.color}">${b.label}</strong><br>${U(q)}`).style("display","block").style("left",w.clientX+14+"px").style("top",w.clientY-36+"px")}).on("mousemove",w=>{g.style("left",w.clientX+14+"px").style("top",w.clientY-36+"px")}).on("mouseleave",()=>g.style("display","none"))})}function ne(t,e,r,s,n,a){const u=d=>{if(n.length===1)return d;const h=document.createElement("div");return h.className="cwi-grid-2",d.appendChild(h),h};if(r==="juxtaposition"){const d=document.createElement("div");d.className="cwi-years-grid",t.appendChild(d),e.forEach(h=>{const m=ot(d,String(h)),l=u(m);n.forEach(i=>{const c=document.createElement("div");c.innerHTML=`<p class="cwi-chart-title">${i==="income"?"Income":"Wealth"}</p>`;const S=document.createElementNS("http://www.w3.org/2000/svg","svg");c.appendChild(S),l.appendChild(c),Pt(S,Z(i,h),i,s,a)})});return}if(r==="superposition"){const d=u(t);n.forEach(h=>{const l=ot(d,h==="income"?"Income by year — SEK  (dashed = baseline year)":"Wealth by year — SEK  (dashed = baseline year)"),i=(w,P)=>w?R(w,P):0,c=Z(h,e[0]),S=e.flatMap(w=>z.map(P=>i(Z(h,w),P))),x=o.max(S.map(Math.abs)),M=Math.min(0,o.min(S)),k=(a==null?void 0:a.min)!=null?a.min:M*1.1,v=(a==null?void 0:a.max)!=null?a.max:x*1.1,I=700,L=360,g={top:24,right:16,bottom:44,left:78},N=I-g.left-g.right,b=L-g.top-g.bottom,$=o.select(l).append("svg").attr("class","cwi-svg").attr("viewBox",`0 0 ${I} ${L}`),q=`clip-vbar-${h}-${Math.random().toString(36).slice(2)}`;$.append("defs").append("clipPath").attr("id",q).append("rect").attr("width",N).attr("height",b);const C=$.append("g").attr("transform",`translate(${g.left},${g.top})`),y=o.scaleBand().domain(e).range([0,N]).paddingInner(.2),E=o.scaleLinear().domain([k,v]).range([b,0]);C.append("g").attr("transform",`translate(0,${b})`).call(o.axisBottom(y).tickFormat(o.format("d"))),C.append("g").call(o.axisLeft(E).ticks(6).tickFormat(U)),k<0&&v>0&&C.append("line").attr("x1",0).attr("x2",N).attr("y1",E(0)).attr("y2",E(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3");const T=o.select("#cwi-tooltip"),p=C.append("g").attr("clip-path",`url(#${q})`);e.forEach(w=>{const P=Z(h,w);if(!P)return;const F=y.bandwidth(),A=2,H=z.length,G=F-A*H,O=z.map(j=>mt(j.pop,.1,1)),B=o.sum(O);let W=y(w);z.forEach((j,_)=>{const Y=Math.max(s?O[_]/B*G:G/H,3),K=i(P,j),tt=Math.max(k,Math.min(v,K)),at=Math.max(k,Math.min(v,0)),st=E(Math.max(tt,at)),dt=Math.max(1,Math.abs(E(tt)-E(at)));if(p.append("rect").attr("x",W).attr("y",st).attr("width",Y).attr("height",dt).attr("fill",j.color).attr("rx",2).attr("opacity",.85).style("cursor","crosshair").on("mouseover",f=>{T.html(`<strong style="color:${j.color}">${j.label}</strong><br>${w}<br>${U(K)}`).style("display","block").style("left",f.clientX+14+"px").style("top",f.clientY-36+"px")}).on("mousemove",f=>{T.style("left",f.clientX+14+"px").style("top",f.clientY-36+"px")}).on("mouseleave",()=>T.style("display","none")),c&&w!==e[0]){const f=i(c,j);f>=k&&f<=v&&C.append("line").attr("x1",W).attr("x2",W+Y).attr("y1",E(f)).attr("y2",E(f)).attr("stroke","#202124").attr("stroke-width",1.5).attr("stroke-dasharray","4 3").attr("opacity",.5)}W+=Y+A})})});return}Tt(t,ut(),(d,h)=>{h.innerHTML="";const m=u(h);n.forEach(l=>{const i=document.createElement("div");i.innerHTML=`<p class="cwi-chart-title">${l==="income"?"Income":"Wealth"}</p>`;const c=document.createElementNS("http://www.w3.org/2000/svg","svg");i.appendChild(c),m.appendChild(i),Pt(c,Z(l,d),l,s,a)})},"Animated bars")}function oe(t,e,r,s,n,a,u){const d=o.select(t),h=400,m=250,l={top:14,right:58,bottom:30,left:70},i=h-l.left-l.right,c=m-l.top-l.bottom,S=ut(),x=o.scaleLinear().domain(o.extent(S)).range([0,i]),[M,k]=a,v=u?M:Math.min(0,M),I=u?k:k*1.08,L=v<0,g=o.scaleLinear().domain([v,I]).range([c,0]),N=g.ticks(4);d.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${m}`),d.selectAll("*").remove();const b=d.append("g").attr("transform",`translate(${l.left},${l.top})`);b.selectAll("line.hg").data(N).join("line").attr("class","hg").attr("x1",0).attr("x2",i).attr("y1",p=>g(p)).attr("y2",p=>g(p)).attr("stroke","#e8eaed").attr("stroke-width",.8),b.append("g").attr("transform",`translate(0,${c})`).call(o.axisBottom(x).ticks(5).tickFormat(o.format("d"))).call(p=>p.selectAll("text").attr("font-size",10)),b.append("g").call(o.axisLeft(g).tickValues(N).tickFormat(U)).call(p=>p.selectAll("text").attr("font-size",10)),L&&b.append("line").attr("x1",0).attr("x2",i).attr("y1",g(0)).attr("y2",g(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),b.selectAll(".yr-mark").data(n).join("line").attr("class","yr-mark").attr("x1",p=>x(p)).attr("x2",p=>x(p)).attr("y1",0).attr("y2",c).attr("stroke","#dee2e6").attr("stroke-width",1.5);const $=s?mt(e.pop,1,10):1.8;r.forEach((p,w)=>{const P=D(p),F=o.line().defined(A=>Number.isFinite(R(A,e))).x(A=>x(A.year)).y(A=>g(R(A,e)));b.append("path").datum(P).attr("fill","none").attr("stroke",e.color).attr("stroke-width",$).attr("stroke-dasharray",w===1?"5 3":null).attr("d",F)});const q=D(r[0]).at(-1);if(q){const p=R(q,e);Number.isFinite(p)&&b.append("text").attr("x",i+4).attr("y",g(p)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(U(p))}const C=o.select("#cwi-tooltip"),y=D(r[0]),E=o.bisector(p=>p.year).left,T=b.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",c).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");b.append("rect").attr("width",i).attr("height",c).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",p=>{const[w]=o.pointer(p),P=x.invert(w),F=E(y,P),A=y[Math.max(0,F-1)],H=y[Math.min(y.length-1,F)],G=H&&Math.abs(P-H.year)<Math.abs(P-A.year)?H:A;if(!G)return;T.attr("x1",x(G.year)).attr("x2",x(G.year)).style("display",null);const O=r.map(B=>{const W=D(B).find(_=>_.year===G.year),j=W?R(W,e):null;return`${B}: ${j!=null?U(j):"n/a"}`});C.html(`<strong style="color:${e.color}">${e.label}</strong> · ${G.year}<br>${O.join("<br>")}`).style("display","block").style("left",p.clientX+16+"px").style("top",p.clientY-50+"px")}).on("mouseleave",()=>{T.style("display","none"),C.style("display","none")})}function se(t,e,r,s,n,a="linear"){const u=D(e),d=o.select(t),h=620,m=340,l={top:20,right:110,bottom:28,left:80},i=h-l.left-l.right,c=m-l.top-l.bottom,S=u.flatMap(y=>z.map(E=>R(y,E))).filter(Number.isFinite),x=o.min(S),M=o.max(S);if(a==="break"){const y=z.map(f=>o.max(u,Q=>{const rt=R(Q,f);return Number.isFinite(rt)?rt:-1/0})).filter(f=>Number.isFinite(f)&&f>0).sort((f,Q)=>f-Q);let E=y.length-1,T=0;for(let f=1;f<y.length;f++){const Q=y[f]/y[f-1];Q>T&&(T=Q,E=f)}const p=y[E-1]*1.25,w=y[E]*.75,P=Math.min(0,x),F=M*1.05,A=14,H=Math.round(c*.56),G=o.scaleLinear().domain([P,p]).range([c,H+Math.ceil(A/2)]),O=o.scaleLinear().domain([w,F]).range([H-Math.floor(A/2),0]),B=f=>Number.isFinite(f)?f<=p?G(Math.max(P,Math.min(p,f))):f>=w?O(Math.max(w,Math.min(F,f))):null:null;d.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${m}`),d.selectAll("*").remove();const W=d.append("defs"),j=`brk-lo-${e}`;W.append("clipPath").attr("id",j).append("rect").attr("x",0).attr("y",H+Math.ceil(A/2)).attr("width",i).attr("height",c-H-Math.ceil(A/2));const _=`brk-hi-${e}`;W.append("clipPath").attr("id",_).append("rect").attr("x",0).attr("y",0).attr("width",i).attr("height",H-Math.floor(A/2));const Y=d.append("g").attr("transform",`translate(${l.left},${l.top})`),K=o.scaleLinear().domain(o.extent(u,f=>f.year)).range([0,i]);Y.append("g").attr("transform",`translate(0,${c})`).call(o.axisBottom(K).tickFormat(o.format("d"))),Y.append("g").call(o.axisLeft(G).ticks(4).tickFormat(U)).call(f=>f.select(".domain").remove()),Y.append("g").call(o.axisLeft(O).ticks(3).tickFormat(U)).call(f=>f.select(".domain").remove()),Y.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",H-Math.floor(A/2)).attr("stroke","#495057").attr("stroke-width",1.5),Y.append("line").attr("x1",0).attr("x2",0).attr("y1",H+Math.ceil(A/2)).attr("y2",c).attr("stroke","#495057").attr("stroke-width",1.5);const tt=f=>{Y.append("line").attr("x1",-10).attr("x2",10).attr("y1",f-4).attr("y2",f+4).attr("stroke","#868e96").attr("stroke-width",2).attr("stroke-linecap","round"),Y.append("line").attr("x1",-10).attr("x2",10).attr("y1",f).attr("y2",f+8).attr("stroke","#868e96").attr("stroke-width",2).attr("stroke-linecap","round")};if(tt(H-Math.floor(A/2)-2),tt(H+Math.ceil(A/2)-4),P<0){const f=G(0);f>H&&f<=c&&Y.append("line").attr("x1",0).attr("x2",i).attr("y1",f).attr("y2",f).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3")}Y.selectAll(".yr-mark").data(s).join("line").attr("class","yr-mark").attr("x1",f=>K(f)).attr("x2",f=>K(f)).attr("y1",0).attr("y2",c).attr("stroke","#f1f3f5"),z.forEach(f=>{const Q=r?mt(f.pop,1,10):2,rt=o.line().defined(X=>{const ct=R(X,f);return Number.isFinite(ct)&&ct<=p}).x(X=>K(X.year)).y(X=>G(R(X,f)));Y.append("path").datum(u).attr("fill","none").attr("stroke",f.color).attr("stroke-width",Q).attr("d",rt).attr("clip-path",`url(#${j})`);const it=o.line().defined(X=>{const ct=R(X,f);return Number.isFinite(ct)&&ct>=w}).x(X=>K(X.year)).y(X=>O(R(X,f)));Y.append("path").datum(u).attr("fill","none").attr("stroke",f.color).attr("stroke-width",Q).attr("d",it).attr("clip-path",`url(#${_})`);const et=u[u.length-1],nt=B(R(et,f));nt!==null&&Y.append("text").attr("x",i+5).attr("y",nt).attr("dy","0.35em").attr("font-size",10).attr("fill",f.color).text(f.label)});const at=o.select("#cwi-tooltip"),st=o.bisector(f=>f.year).left,dt=Y.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",c).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");Y.append("rect").attr("width",i).attr("height",c).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",f=>{const[Q]=o.pointer(f),rt=K.invert(Q),it=st(u,rt),et=u[Math.max(0,it-1)],nt=u[Math.min(u.length-1,it)],X=nt&&Math.abs(rt-nt.year)<Math.abs(rt-et.year)?nt:et;if(!X)return;dt.attr("x1",K(X.year)).attr("x2",K(X.year)).style("display",null);const ct=`<strong>${X.year}</strong><br>`+z.map(J=>{const lt=R(X,J);return`<span style="color:${J.color}">${J.label}</span>: ${U(lt)}`}).join("<br>");at.html(ct).style("display","block").style("left",f.clientX+16+"px").style("top",f.clientY-60+"px")}).on("mouseleave",()=>{dt.style("display","none"),at.style("display","none")});return}const k=(n==null?void 0:n.min)!=null?n.min:Math.min(0,x),v=(n==null?void 0:n.max)!=null?n.max:M*1.05,I=o.scaleLinear().domain(o.extent(u,y=>y.year)).range([0,i]),L=o.scaleLinear().domain([k,v]).range([c,0]);d.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${m}`),d.selectAll("*").remove();const g=d.append("g").attr("transform",`translate(${l.left},${l.top})`),N=`clip-line-${e}`;d.append("defs").append("clipPath").attr("id",N).append("rect").attr("width",i).attr("height",c),g.append("g").attr("transform",`translate(0,${c})`).call(o.axisBottom(I).tickFormat(o.format("d"))),g.append("g").call(o.axisLeft(L).ticks(6).tickFormat(U)),k<0&&v>0&&g.append("line").attr("x1",0).attr("x2",i).attr("y1",L(0)).attr("y2",L(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),g.selectAll(".year-mark").data(s).join("line").attr("x1",y=>I(y)).attr("x2",y=>I(y)).attr("y1",0).attr("y2",c).attr("stroke","#f1f3f5");const b=g.append("g").attr("clip-path",`url(#${N})`);z.forEach(y=>{const E=o.line().defined(w=>Number.isFinite(R(w,y))).x(w=>I(w.year)).y(w=>L(R(w,y)));b.append("path").datum(u).attr("fill","none").attr("stroke",y.color).attr("stroke-width",r?mt(y.pop,1,10):2).attr("d",E);const T=u[u.length-1],p=R(T,y);Number.isFinite(p)&&p>=k&&p<=v&&g.append("text").attr("x",i+5).attr("y",L(p)).attr("dy","0.35em").attr("font-size",10).attr("fill",y.color).text(y.label)});const $=o.select("#cwi-tooltip"),q=o.bisector(y=>y.year).left,C=g.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",c).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");g.append("rect").attr("width",i).attr("height",c).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",y=>{const[E]=o.pointer(y),T=I.invert(E),p=q(u,T),w=u[Math.max(0,p-1)],P=u[Math.min(u.length-1,p)],F=P&&Math.abs(T-P.year)<Math.abs(T-w.year)?P:w;if(!F)return;C.attr("x1",I(F.year)).attr("x2",I(F.year)).style("display",null);const A=`<strong>${F.year}</strong><br>`+z.map(H=>{const G=R(F,H);return`<span style="color:${H.color}">${H.label}</span>: ${U(G)}`}).join("<br>");$.html(A).style("display","block").style("left",y.clientX+16+"px").style("top",y.clientY-60+"px")}).on("mouseleave",()=>{C.style("display","none"),$.style("display","none")})}function re(t,e,r,s,n,a,u="linear"){if(r==="juxtaposition"){const g=n.includes("income")?D("income"):[],N=n.includes("wealth")?D("wealth"):[],b=[...g.flatMap(T=>z.map(p=>R(T,p))),...N.flatMap(T=>z.map(p=>R(T,p)))].filter(Number.isFinite),$=o.min(b),q=o.max(b),C=(a==null?void 0:a.min)!=null||(a==null?void 0:a.max)!=null,y=[(a==null?void 0:a.min)!=null?a.min:$,(a==null?void 0:a.max)!=null?a.max:q];if(n.length>1){const T=document.createElement("p");T.className="cwi-note",T.textContent="Solid line = income · Dashed line = wealth. All panels share the same Y axis.",t.appendChild(T)}const E=document.createElement("div");E.className="cwi-sm-grid",t.appendChild(E),z.forEach(T=>{const p=ot(E,T.label),w=document.createElementNS("http://www.w3.org/2000/svg","svg");p.appendChild(w),oe(w,T,n,s,e,y,C)});return}if(n.length===1){const g=ot(t,n[0]==="income"?"Income over time":"Wealth over time"),N=document.createElementNS("http://www.w3.org/2000/svg","svg");g.appendChild(N),se(N,n[0],s,e,a,u);return}const d=ot(t,"Superposed indexed lines (income solid, wealth dashed)"),h=document.createElement("div");h.className="cwi-inline-legend",h.innerHTML='<span><i style="background:#495057"></i><span>Income solid</span></span><span><i style="background:#ffffff;border:2px dashed #495057"></i><span>Wealth dashed, indexed to 100</span></span>',d.appendChild(h);const m=o.select(d).append("svg").attr("class","cwi-svg tall"),l=840,i=380,c={top:20,right:120,bottom:28,left:70},S=l-c.left-c.right,x=i-c.top-c.bottom,M=ut(),k=M.map(g=>({year:g,income:Z("income",g),wealth:Z("wealth",g)})),v=o.scaleLinear().domain(o.extent(M)).range([0,S]),I=o.scaleLinear().domain([0,260]).range([x,0]);m.attr("viewBox",`0 0 ${l} ${i}`);const L=m.append("g").attr("transform",`translate(${c.left},${c.top})`);L.append("g").attr("transform",`translate(0,${x})`).call(o.axisBottom(v).tickFormat(o.format("d"))),L.append("g").call(o.axisLeft(I).ticks(6).tickFormat(g=>`${Math.round(g)}%`)),z.forEach(g=>{const N=Math.abs(R(k[0].income,g))||1,b=Math.abs(R(k[0].wealth,g))||1,$=o.line().x(y=>v(y.year)).y(y=>I(Math.abs(R(y.income,g))/N*100)),q=o.line().x(y=>v(y.year)).y(y=>I(Math.abs(R(y.wealth,g))/b*100)),C=s?mt(g.pop,1,7):2;L.append("path").datum(k).attr("fill","none").attr("stroke",g.color).attr("stroke-width",C).attr("d",$),L.append("path").datum(k).attr("fill","none").attr("stroke",g.color).attr("stroke-width",C).attr("stroke-dasharray","5 4").attr("opacity",.85).attr("d",q)})}function le(t,e,r,s,n,a,u){const d=o.select(t),h=400,m=250,l={top:14,right:58,bottom:30,left:70},i=h-l.left-l.right,c=m-l.top-l.bottom,S=ut(),x=o.scaleLinear().domain(o.extent(S)).range([0,i]),[M,k]=a,v=u?M:Math.min(0,M),I=u?k:k*1.08,L=o.scaleLinear().domain([v,I]).range([c,0]),g=L.ticks(4);d.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${m}`),d.selectAll("*").remove();const N=`clip-ga-${e.key}-${Math.random().toString(36).slice(2)}`;d.append("defs").append("clipPath").attr("id",N).append("rect").attr("width",i).attr("height",c);const b=d.append("g").attr("transform",`translate(${l.left},${l.top})`);b.selectAll("line.hg").data(g).join("line").attr("class","hg").attr("x1",0).attr("x2",i).attr("y1",p=>L(p)).attr("y2",p=>L(p)).attr("stroke","#e8eaed").attr("stroke-width",.8),b.append("g").attr("transform",`translate(0,${c})`).call(o.axisBottom(x).ticks(5).tickFormat(o.format("d"))).call(p=>p.selectAll("text").attr("font-size",10)),b.append("g").call(o.axisLeft(L).tickValues(g).tickFormat(U)).call(p=>p.selectAll("text").attr("font-size",10)),v<0&&I>0&&b.append("line").attr("x1",0).attr("x2",i).attr("y1",L(0)).attr("y2",L(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),b.selectAll(".yr-mark").data(n).join("line").attr("class","yr-mark").attr("x1",p=>x(p)).attr("x2",p=>x(p)).attr("y1",0).attr("y2",c).attr("stroke","#dee2e6").attr("stroke-width",1.5);const $=b.append("g").attr("clip-path",`url(#${N})`);r.forEach((p,w)=>{const P=D(p),F=o.area().x(A=>x(A.year)).y0(L(Math.max(v,Math.min(I,0)))).y1(A=>L(Math.max(v,Math.min(I,A.values[e.key]||0))));$.append("path").datum(P).attr("fill",e.color).attr("opacity",w===0?.72:.42).attr("stroke-dasharray",w===1?"5 3":null).attr("d",F)});const q=D(r[0]).at(-1);if(q){const p=q.values[e.key]||0;Number.isFinite(p)&&p>=v&&p<=I&&b.append("text").attr("x",i+4).attr("y",L(p)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(U(p))}const C=o.select("#cwi-tooltip"),y=D(r[0]),E=o.bisector(p=>p.year).left,T=b.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",c).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");b.append("rect").attr("width",i).attr("height",c).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",p=>{const[w]=o.pointer(p),P=x.invert(w),F=E(y,P),A=y[Math.max(0,F-1)],H=y[Math.min(y.length-1,F)],G=H&&Math.abs(P-H.year)<Math.abs(P-A.year)?H:A;if(!G)return;T.attr("x1",x(G.year)).attr("x2",x(G.year)).style("display",null);const O=r.map(B=>{const W=D(B).find(_=>_.year===G.year),j=W?W.values[e.key]||0:null;return`${B}: ${j!=null?U(j):"n/a"}`});C.html(`<strong style="color:${e.color}">${e.label}</strong> · ${G.year}<br>${O.join("<br>")}`).style("display","block").style("left",p.clientX+16+"px").style("top",p.clientY-50+"px")}).on("mouseleave",()=>{T.style("display","none"),C.style("display","none")})}function ie(t,e,r,s,n,a){const u=l=>{let i=0;return z.map(c=>{const S=l.values[c.key]||0,x=i;return i+=S,{grp:c,y0:x,y1:i}})},d=(l,i)=>{const c=D(i),S=c[c.length-1],x=c.flatMap(B=>u(B).flatMap(W=>[W.y0,W.y1])),M=o.min(x),k=o.max(x),v=Math.min(0,M*1.05),I=k*1.05,L=(a==null?void 0:a.min)!=null?a.min:v,g=(a==null?void 0:a.max)!=null?a.max:I,N=700,b=340,$=22,C={top:20,right:s?168:112,bottom:28,left:80},y=N-C.left-C.right,E=b-C.top-C.bottom,T=o.select(l);T.attr("class","cwi-svg").attr("viewBox",`0 0 ${N} ${b}`),T.selectAll("*").remove();const p=o.scaleLinear().domain(o.extent(c,B=>B.year)).range([0,y]),w=o.scaleLinear().domain([L,g]).range([E,0]),P=`clip-area-${i}-${Math.random().toString(36).slice(2)}`;T.append("defs").append("clipPath").attr("id",P).append("rect").attr("width",y).attr("height",E);const F=T.append("g").attr("transform",`translate(${C.left},${C.top})`);F.append("g").attr("transform",`translate(0,${E})`).call(o.axisBottom(p).tickFormat(o.format("d"))),F.append("g").call(o.axisLeft(w).ticks(6).tickFormat(U)),L<0&&g>0&&F.append("line").attr("x1",0).attr("x2",y).attr("y1",w(0)).attr("y2",w(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),F.selectAll(".yr-ref").data(e).join("line").attr("x1",B=>p(B)).attr("x2",B=>p(B)).attr("y1",0).attr("y2",E).attr("stroke","#e9ecef");const A=F.append("g").attr("clip-path",`url(#${P})`);for(let B=z.length-1;B>=0;B--){const W=z[B],j=o.area().x(_=>p(_.year)).y0(_=>w(Math.max(L,Math.min(g,u(_)[B].y0)))).y1(_=>w(Math.max(L,Math.min(g,u(_)[B].y1))));A.append("path").datum(c).attr("fill",W.color).attr("opacity",.88).attr("d",j)}if(u(S).forEach(({grp:B,y0:W,y1:j})=>{const _=(W+j)/2;_>=L&&_<=g&&F.append("text").attr("x",y+5).attr("y",w(_)).attr("dy","0.35em").attr("font-size",10).attr("fill",B.color).text(B.label)}),s){const B=y+104,W=B+$+7,j=8,_=16,Y=o.sum(z,J=>J.pop);let K=0;const tt=z.map(J=>{const lt=K;return K+=J.pop,{gr:J,start:lt,end:K}});let at=0,st=Y;const dt=.002,f=`clip-pbz-${Math.random().toString(36).slice(2)}`;T.select("defs").append("clipPath").attr("id",f).append("rect").attr("x",B-1).attr("y",0).attr("width",$+2).attr("height",E);const Q=F.append("g").attr("clip-path",`url(#${f})`),rt=()=>{Q.selectAll("*").remove();const J=st-at;tt.forEach(({gr:lt,start:$t,end:gt})=>{const ht=Math.max($t,at),zt=Math.min(gt,st);if(zt<=ht)return;const At=(ht-at)/J*E,wt=Math.max(1,(zt-ht)/J*E);Q.append("rect").attr("x",B).attr("y",At).attr("width",$).attr("height",wt).attr("rx",2).attr("fill",lt.color).attr("opacity",.9),wt>=10&&Q.append("text").attr("x",B+$/2).attr("y",At+wt/2).attr("dy","0.35em").attr("text-anchor","middle").attr("font-size",Math.min(8,wt*.45)).attr("fill","#fff").attr("pointer-events","none").text(`${lt.pop}%`)})};rt(),F.append("text").attr("x",B+$/2).attr("y",-7).attr("text-anchor","middle").attr("font-size",9).attr("fill","#6c757d").text("Pop."),F.append("text").attr("x",W+j/2).attr("y",-7).attr("text-anchor","middle").attr("font-size",8).attr("fill","#adb5bd").text("+"),F.append("text").attr("x",W+j/2).attr("y",E+10).attr("text-anchor","middle").attr("font-size",8).attr("fill","#adb5bd").text("−"),F.append("rect").attr("x",W+2).attr("y",0).attr("width",j-4).attr("height",E).attr("rx",3).attr("fill","#e9ecef");const it=E-_;let et=it;const nt=F.append("rect").attr("x",W).attr("y",et).attr("width",j).attr("height",_).attr("rx",3).attr("fill","#868e96").style("cursor","ns-resize"),X=J=>{const lt=1-J/it,$t=Math.log10(dt),gt=Math.log10(Y),ht=Math.pow(10,gt+lt*($t-gt));at=Math.max(0,Y-ht),st=Y,rt()},ct=o.drag().on("start",()=>nt.attr("fill","#495057")).on("drag",J=>{et=Math.max(0,Math.min(it,et+J.dy)),nt.attr("y",et),X(et)}).on("end",()=>nt.attr("fill","#868e96"));nt.call(ct),F.append("rect").attr("x",W).attr("y",0).attr("width",j).attr("height",E).attr("fill","none").style("pointer-events","all").on("click",J=>{const[,lt]=o.pointer(J);et=Math.max(0,Math.min(it,lt-_/2)),nt.attr("y",et),X(et)})}const H=o.select("#cwi-tooltip"),G=o.bisector(B=>B.year).left,O=F.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",E).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");F.append("rect").attr("width",y).attr("height",E).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",B=>{const[W]=o.pointer(B),j=p.invert(W),_=G(c,j),Y=c[Math.max(0,_-1)],K=c[Math.min(c.length-1,_)],tt=K&&Math.abs(j-K.year)<Math.abs(j-Y.year)?K:Y;if(!tt)return;O.attr("x1",p(tt.year)).attr("x2",p(tt.year)).style("display",null);const at=`<strong>${tt.year}</strong><br>`+z.map(st=>{const dt=tt.values[st.key]||0;return`<span style="color:${st.color}">${st.label}</span>: ${U(dt)}`}).join("<br>");H.html(at).style("display","block").style("left",B.clientX+16+"px").style("top",B.clientY-60+"px")}).on("mouseleave",()=>{O.style("display","none"),H.style("display","none")})};if(r==="juxtaposition"){const l=n.flatMap(k=>D(k).flatMap(v=>z.map(I=>v.values[I.key]||0))).filter(Number.isFinite),i=o.min(l),c=o.max(l),S=(a==null?void 0:a.max)!=null,x=[Math.min(0,i),(a==null?void 0:a.max)!=null?a.max:c];if(n.length>1){const k=document.createElement("p");k.className="cwi-note",k.textContent="Solid fill = income · Translucent dashed fill = wealth. All panels share the same Y axis.",t.appendChild(k)}const M=document.createElement("div");M.className="cwi-sm-grid",t.appendChild(M),z.forEach(k=>{const v=ot(M,k.label),I=document.createElementNS("http://www.w3.org/2000/svg","svg");v.appendChild(I),le(I,k,n,s,e,x,S)});return}const m=(l=>{if(n.length===1)return l;const i=document.createElement("div");return i.className="cwi-grid-2",l.appendChild(i),i})(t);n.forEach(l=>{const c=ot(m,l==="income"?"Average pre-tax income per person (SEK, linear scale, gray = Middle 40%)":"Average net wealth per person (SEK, linear scale, gray = Middle 40%, below 0 = net debt)"),S=document.createElementNS("http://www.w3.org/2000/svg","svg");c.appendChild(S),d(S,l)})}function _t(t){const e=Z("income",t),r=o.sum(Ot,s=>Math.max(0,e.totals[s]||0));return z.map(s=>{const n=Math.max(0,e.totals[s.key]||0);return r>0?n/r*100:0})}function Rt(t,e,r,s,n,a,u){e.forEach(m=>{t.append("rect").attr("x",m.x).attr("y",m.y).attr("width",r).attr("height",s).attr("rx",3).attr("fill",u)});let d=0;n.map((m,l)=>{const i={start:d,end:d+m,color:a[l]};return d+=m,i}).forEach(m=>{e.forEach(l=>{const i=Math.max(l.i,m.start),c=Math.min(l.i+1,m.end);if(c<=i+.001)return;const S=i-l.i,x=c-l.i,M=x-S>=.999,k=l.y+s*(1-x),v=Math.max(1,s*(x-S));t.append("rect").attr("x",l.x).attr("y",k).attr("width",r).attr("height",v).attr("rx",M?3:1).attr("fill",m.color)})})}function Ht(t,e,r){const s=o.select(t),n=250,a=r?290:240,u=20,d=_t(e);s.attr("class","cwi-svg").attr("viewBox",`0 0 ${n} ${a}`),s.selectAll("*").remove();const h=o.range(100).map(l=>({i:l,x:15+l%10*22,y:15+(9-Math.floor(l/10))*22})),m=s.append("g");if(Rt(m,h,u,u,d,z.map(l=>l.color),"#eef1ea"),r){const l=[...z.map(x=>x.pop),40],i=[...z.map(x=>x.color),"#dee2e6"],c=Kt(l);let S=0;s.append("text").attr("x",15).attr("y",255).attr("font-size",10).attr("fill","#5f6368").text("Population strip (gray = Middle 40%)"),c.forEach((x,M)=>{for(let k=0;k<x;k+=1)s.append("rect").attr("x",15+S*2.05).attr("y",265).attr("width",1.8).attr("height",10).attr("rx",1).attr("fill",i[M]).attr("opacity",.75),S+=1})}}function ce(t,e,r,s){const n=document.createElement("div");if(n.className="cwi-note",n.textContent="Income waffle shares: population share × average income for each disjoint group. Wealth excluded (negative values).",t.appendChild(n),r==="juxtaposition"){z.forEach((a,u)=>{const d=document.createElement("div");d.style.cssText="margin-bottom:1.2rem;";const h=document.createElement("h4");h.textContent=a.label,h.style.cssText=`font-size:0.95rem;font-weight:700;color:${a.color};margin:0 0 0.4rem;`,d.appendChild(h);const m=document.createElement("div");m.style.cssText="display:flex;flex-wrap:wrap;gap:0.6rem;",e.forEach(l=>{const i=ot(m,String(l));i.style.minWidth="170px";const S=_t(l)[u],x=o.select(i).append("svg").attr("class","cwi-svg").attr("viewBox","0 0 240 240"),M=o.range(100).map(I=>({i:I,x:10+I%10*22,y:10+(9-Math.floor(I/10))*22})),k=x.append("g");Rt(k,M,20,20,[S],[a.color],"#e9ecef");const v=document.createElement("p");v.textContent=`${S.toFixed(2)}%`,v.style.cssText="text-align:center;font-size:0.8rem;color:#5f6368;margin:0.2rem 0 0;",i.appendChild(v)}),d.appendChild(m),t.appendChild(d)});return}if(r==="superposition"){const a=document.createElement("div");a.className="cwi-years-grid";const u=document.createElement("div");u.className="cwi-inline-legend",u.style.marginBottom="0.6rem",z.forEach(d=>{const h=document.createElement("span");h.innerHTML=`<i style="background:${d.color}"></i><span>${d.label}</span>`,u.appendChild(h)}),t.appendChild(u),t.appendChild(a),e.forEach(d=>{const h=ot(a,String(d)),m=document.createElementNS("http://www.w3.org/2000/svg","svg");h.appendChild(m),Ht(m,d,s)});return}Tt(t,ut(),(a,u)=>{u.innerHTML="";const d=document.createElementNS("http://www.w3.org/2000/svg","svg");u.appendChild(d),Ht(d,a,s)},"Animated income waffle")}function de(){te();const t=document.getElementById("cwi-years-input"),e=document.getElementById("cwi-representation"),r=document.getElementById("cwi-comparison"),s=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),a=document.getElementById("cwi-render-root");if(!t||!e||!r||!s||!n||!a)return;const u=document.getElementById("cwi-yscale-ctrl"),d=document.getElementById("cwi-yscale-linear"),h=document.getElementById("cwi-yscale-break");let m="linear";d==null||d.addEventListener("change",()=>{m="linear",N()}),h==null||h.addEventListener("change",()=>{m="break",N()});const l=document.getElementById("cwi-yview"),i=document.getElementById("cwi-ymax-slider"),c=document.getElementById("cwi-ymax-val"),S=document.getElementById("cwi-yview-reset");let x={min:null,max:null},M=1;const k=b=>{const $=b.flatMap(q=>D(q).flatMap(C=>z.map(y=>C.values[y.key]||0))).filter(Number.isFinite);return o.max($)},v=b=>{const $=Math.max(5,Math.log10(Math.abs(M))-4.5),q=Math.log10(Math.abs(M));return Math.pow(10,$+(q-$)*b/1e3)},I=b=>{const $=Math.max(5,Math.log10(Math.abs(M))-4.5),q=Math.log10(Math.abs(M));return Math.max(0,Math.min(1e3,Math.round((Math.log10(Math.max(b,1))-$)/(q-$)*1e3)))},L=()=>{const b=x.max!=null?x.max:M;c.textContent=U(b)},g=()=>{const b=x.max!=null?x.max:M;i.value=I(b),L()};i.addEventListener("input",()=>{x.max=v(Number(i.value)),L(),N()}),S.addEventListener("click",()=>{x={min:null,max:null},g(),N()});const N=()=>{pt&&(clearInterval(pt),pt=null);const b=ee(t.value),$=e.value,q=n.value==="with";s.disabled=$==="waffle",$==="waffle"&&(s.value="income");const C=s.value==="both"?["income","wealth"]:[s.value];Array.from(r.options).forEach(T=>{T.disabled=($==="line"||$==="stacked")&&T.value==="animation"}),($==="line"||$==="stacked")&&r.value==="animation"&&(r.value="juxtaposition");const y=r.value;$==="line"?u.classList.remove("hidden"):(u.classList.add("hidden"),m="linear",d&&(d.checked=!0)),$==="bar"||$==="stacked"||$==="line"&&m==="linear"?(l.classList.remove("hidden"),M=k(C),g()):(l.classList.add("hidden"),x={min:null,max:null}),a.innerHTML="",$==="table"&&ae(a,b,y,q,C),$==="bar"&&ne(a,b,y,q,C,x),$==="line"&&re(a,b,y,q,C,x,m),$==="stacked"&&ie(a,b,y,q,C,x),$==="waffle"&&ce(a,b,y,q)};e.addEventListener("change",N),r.addEventListener("change",N),s.addEventListener("change",N),n.addEventListener("change",N),t.addEventListener("change",N),t.addEventListener("blur",N),N()}const It="1.0",Vt="wealth-study-data",bt=[{id:"consent",type:"info",title:"Participant Information & Consent",content:`
      <p>You are invited to participate in a user study conducted as part of a Master's thesis at Linköping University.</p>
      <p><strong>What you will do:</strong> Interact with the visualization tool and answer a short question.</p>
      <p><strong>Data:</strong> Your responses are stored locally in your browser. No personal data is collected.</p>
      <p><strong>Participation is voluntary.</strong> You may close this window at any time.</p>
      <label class="consent-check">
        <input type="checkbox" id="consent-checkbox" />
        I have read the information above and agree to participate.
      </label>`,nextLabel:"Start",requireConsent:!0},{id:"task_test",type:"task",phase:"Task 1 of 1",vizConfig:{representation:"bar",comparison:"juxtaposition",metric:"wealth",popEncoding:"without",years:"1980,1990,2000,2010,2020,2024"},taskText:"test",questionText:"test",options:[{label:"a test",value:"a"},{label:"b test",value:"b"},{label:"c test",value:"c"},{label:"d test",value:"d"}]},{id:"complete",type:"complete",title:"Thank you!",content:"<p>Your response has been recorded.</p>"}],V={currentStep:0,startTime:Date.now(),stepTimes:{},answers:{},participantId:Math.random().toString(36).slice(2,9)};function pe(t){const e=document.getElementById("cwi-representation"),r=document.getElementById("cwi-comparison"),s=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),a=document.getElementById("cwi-years-input");e&&(t.representation&&(e.value=t.representation),t.years&&(a.value=t.years,a.dispatchEvent(new Event("change"))),t.metric&&(s.value=t.metric),t.comparison&&(r.value=t.comparison),t.popEncoding&&(n.value=t.popEncoding),e.dispatchEvent(new Event("change")))}function Gt(t,e,r={}){V.answers[t]={value:e,timestamp:Date.now(),elapsed:Date.now()-(V.stepTimes[t]||V.startTime),...r},localStorage.setItem(Vt,JSON.stringify({state:V,version:It}))}function ue(){bt.find(n=>n.id==="pre_q1");const t={participantId:V.participantId,studyVersion:It,startTime:new Date(V.startTime).toISOString(),completedTime:new Date().toISOString(),answers:V.answers,summary:Xt()},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(e),s=document.createElement("a");s.href=r,s.download=`study-${V.participantId}.json`,s.click(),URL.revokeObjectURL(r)}function Xt(){var t;return{taskTestAnswer:((t=V.answers.task_test)==null?void 0:t.value)??"—"}}function Bt(){const t=bt[V.currentStep];V.stepTimes[t.id]=Date.now();const e=document.getElementById("study-overlay"),r=document.getElementById("study-panel"),s=document.getElementById("study-task-banner");t.type==="task"?(e.classList.add("hidden"),s.classList.remove("hidden"),pe(t.vizConfig),ye(t,s)):(s.classList.add("hidden"),e.classList.remove("hidden"),t.type==="info"&&me(t,r),t.type==="question"&&he(t,r),t.type==="complete"&&fe(t,r)),xe()}function me(t,e){var r,s;if(e.innerHTML=`
    <div class="study-phase-tag">Information</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-nav">
      ${V.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${t.requireConsent?"disabled":""}>${t.nextLabel||"Next →"}</button>
    </div>`,t.requireConsent){const n=e.querySelector("#consent-checkbox"),a=e.querySelector("#study-next");n.addEventListener("change",()=>{a.disabled=!n.checked})}(r=e.querySelector("#study-next"))==null||r.addEventListener("click",Ct),(s=e.querySelector("#study-prev"))==null||s.addEventListener("click",Nt)}function he(t,e){var s,n;const r=(s=V.answers[t.id])==null?void 0:s.value;e.innerHTML=`
    <div class="study-phase-tag">${t.phase} — Question ${t.questionNum}</div>
    <h2 class="study-title">${t.text}</h2>
    ${t.note?`<p class="study-note">${t.note}</p>`:""}
    <div class="study-options" id="study-options">
      ${t.options.map(a=>`
        <label class="study-option ${r===a.value?"selected":""}">
          <input type="radio" name="sq" value="${a.value}" ${r===a.value?"checked":""}/>
          ${a.label}
        </label>`).join("")}
    </div>
    <div class="study-nav">
      ${V.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${r?"":"disabled"}>Next →</button>
    </div>`,e.querySelectorAll(".study-option").forEach(a=>{a.addEventListener("click",()=>{e.querySelectorAll(".study-option").forEach(d=>d.classList.remove("selected")),a.classList.add("selected");const u=a.querySelector("input").value;Gt(t.id,u),e.querySelector("#study-next").disabled=!1})}),e.querySelector("#study-next").addEventListener("click",Ct),(n=e.querySelector("#study-prev"))==null||n.addEventListener("click",Nt)}let vt="description";function ye(t,e){vt="description",e.innerHTML=Et(t),St(t,e)}function Et(t){var r;const e=(r=V.answers[t.id])==null?void 0:r.value;return vt==="description"?`
      <div class="task-banner-inner">
        <button class="study-close-btn" id="task-close-btn" title="Close study">✕</button>
        <div class="task-phase-tag">${t.phase}</div>
        <p class="task-desc">${t.taskText}</p>
        <div class="task-banner-nav">
          <button class="study-btn secondary" id="task-back">← Back</button>
          <button class="study-btn primary" id="task-ready">I've examined the chart — show question →</button>
        </div>
      </div>`:`
    <div class="task-banner-inner">
      <button class="study-close-btn" id="task-close-btn" title="Close study">✕</button>
      <div class="task-phase-tag">${t.phase} — Question</div>
      <p class="task-question"><strong>${t.questionText}</strong></p>
      ${t.note?`<p class="study-note">${t.note}</p>`:""}
      <div class="task-options-row">
        ${t.options.map(s=>`
          <label class="task-option ${e===s.value?"selected":""}">
            <input type="radio" name="tq" value="${s.value}" ${e===s.value?"checked":""}/>
            ${s.label}
          </label>`).join("")}
      </div>
      <div class="task-banner-nav">
        <button class="study-btn secondary" id="task-back-q">← Re-read description</button>
        <button class="study-btn primary" id="task-submit" ${e?"":"disabled"}>Submit →</button>
      </div>
    </div>`}function St(t,e){var r,s,n,a,u;(r=e.querySelector("#task-back"))==null||r.addEventListener("click",()=>{Nt()}),(s=e.querySelector("#task-ready"))==null||s.addEventListener("click",()=>{vt="question",e.innerHTML=Et(t),St(t,e)}),(n=e.querySelector("#task-back-q"))==null||n.addEventListener("click",()=>{vt="description",e.innerHTML=Et(t),St(t,e)}),e.querySelectorAll(".task-option").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".task-option").forEach(m=>m.classList.remove("selected")),d.classList.add("selected");const h=d.querySelector("input").value;Gt(t.id,h),e.querySelector("#task-submit").disabled=!1})}),(a=e.querySelector("#task-submit"))==null||a.addEventListener("click",Ct),(u=e.querySelector("#task-close-btn"))==null||u.addEventListener("click",Ft)}function fe(t,e){const r=Xt();e.innerHTML=`
    <div class="study-phase-tag">Complete</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-summary">
      <h3>Your response summary</h3>
      <table class="summary-table">
        <tr><th>Task answer</th><td>${r.taskTestAnswer}</td></tr>
      </table>
    </div>
    <div class="study-nav centered">
      <button class="study-btn primary large" id="study-download">⬇ Download my data (JSON)</button>
      <button class="study-btn secondary" id="study-close-complete">Close</button>
    </div>`,e.querySelector("#study-download").addEventListener("click",ue),e.querySelector("#study-close-complete").addEventListener("click",Ft)}function xe(){const t=document.getElementById("study-progress-bar"),e=document.getElementById("study-progress-label"),r=bt.length-1,s=Math.round(V.currentStep/r*100);t&&(t.style.width=s+"%"),e&&(e.textContent=`Step ${V.currentStep+1} of ${bt.length}`)}function Ct(){V.currentStep<bt.length-1&&(V.currentStep++,Bt())}function Nt(){V.currentStep>0&&(V.currentStep--,Bt())}function be(){ge(),we();try{const t=localStorage.getItem(Vt);if(t){const e=JSON.parse(t);e.version===It&&e.state&&Object.assign(V,e.state)}}catch{}document.getElementById("study-launch-btn").addEventListener("click",()=>{document.getElementById("study-launcher").classList.add("hidden"),document.getElementById("study-overlay").classList.remove("hidden"),Bt()}),document.getElementById("study-close-btn").addEventListener("click",Ft)}function Ft(){document.getElementById("study-overlay").classList.add("hidden"),document.getElementById("study-task-banner").classList.add("hidden"),document.getElementById("study-progress-container").classList.add("hidden"),document.getElementById("study-launcher").classList.remove("hidden"),V.currentStep=0}function ge(){document.body.insertAdjacentHTML("beforeend",`
    <!-- Launch button -->
    <div id="study-launcher" class="study-launcher">
      <button id="study-launch-btn" class="study-launch-btn">Start User Study</button>
    </div>

    <!-- Progress bar (shown during study) -->
    <div id="study-progress-container" class="study-progress-container hidden">
      <div id="study-progress-bar" class="study-progress-bar" style="width:0%"></div>
      <span id="study-progress-label" class="study-progress-label"></span>
    </div>

    <!-- Full-screen overlay (for info/question/complete steps) -->
    <div id="study-overlay" class="study-overlay hidden">
      <button id="study-close-btn" class="study-close-btn" title="Close study">✕</button>
      <div id="study-panel" class="study-panel"></div>
    </div>

    <!-- Task banner (shown over the visualization) -->
    <div id="study-task-banner" class="study-task-banner hidden"></div>
  `),new MutationObserver(()=>{const e=document.getElementById("study-overlay"),r=document.getElementById("study-task-banner"),s=document.getElementById("study-progress-container");e.classList.contains("hidden")&&r.classList.contains("hidden")&&V.currentStep===0?s.classList.add("hidden"):s.classList.remove("hidden")}).observe(document.getElementById("study-overlay"),{attributes:!0})}function we(){const t=document.createElement("style");t.textContent=`
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
.study-close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  background: transparent;
  border: none;
  color: #6c757d;
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 10;
}
.study-close-btn:hover { background: #f1f3f5; color: #212529; }

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
  `,document.head.appendChild(t)}be();
