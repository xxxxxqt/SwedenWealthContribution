(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const h of a.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();const i=window.d3;function Nt(t){const e=t.map(Math.floor);let r=100-i.sum(e);const s=t.map((n,a)=>({i:a,frac:n-Math.floor(n)})).sort((n,a)=>a.frac-n.frac);for(let n=0;n<s.length&&r>0;n+=1)e[s[n].i]+=1,r-=1;return e}const Et=[{key:"bottom50",label:"Bottom 50%",color:"#4dabf7",pop:50},{key:"top10",label:"Top 10%",color:"#fcc419",pop:10},{key:"top1",label:"Top 1%",color:"#ff8787",pop:1},{key:"top01",label:"Top 0.1%",color:"#e599f7",pop:.1},{key:"top001",label:"Top 0.01%",color:"#ff6b6b",pop:.01},{key:"top0001",label:"Top 0.001%",color:"#c92a2a",pop:.001}];i.scaleSqrt().domain([.001,50]).range([.6,6]);let nt=[];async function At(){const e=(await i.text("./data/wealth_avg.csv")).split(`
`),r=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};nt=[];for(let n=1;n<e.length;n++){const a=e[n].split(",");if(a.length<r.length)continue;const h=Number(a[0]);if(!Number.isFinite(h))continue;const c={year:h};let y=!0;for(let u=1;u<r.length;u++){const o=s[r[u].trim()];if(!o)continue;const l=Number(a[u]);if(!Number.isFinite(l)){y=!1;break}c[o]=l}y&&c.bottom50!==void 0&&nt.push(c)}nt.sort((n,a)=>n.year-a.year),new Map(nt.map(n=>[n.year,n]))}let ot=[];async function Ft(){const e=(await i.text("./data/income_avg.csv")).split(`
`),r=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};ot=[];for(let n=1;n<e.length;n++){const a=e[n].split(",");if(a.length<2)continue;const h=Number(a[0]);if(!Number.isFinite(h))continue;const c={year:h};for(let y=1;y<r.length;y++){const u=s[r[y].trim()];u&&(c[u]=Number(a[y])||0)}c.bottom50!==void 0&&ot.push(c)}ot.sort((n,a)=>n.year-a.year),new Map(ot.map(n=>[n.year,n]))}function qt(t){const e=Math.abs(t);return e>=1e9?(t/1e9).toFixed(1)+"B":e>=1e6?(t/1e6).toFixed(1)+"M":e>=1e3?(t/1e3).toFixed(0)+"K":t.toFixed(0)}function kt(t){return t>=1?`${t}%`:t>=.1?`${t.toFixed(1)}%`:t>=.01?`${t.toFixed(2)}%`:`${t.toFixed(3)}%`}function V(t){const e=Math.abs(t);return e>=1e9?`${(t/1e9).toFixed(e>=1e10?0:1)}B`:e>=1e6?`${(t/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(t/1e3).toFixed(e>=1e5?0:1)}K`:`${Math.round(t)}`}Et.filter(t=>["top0001","top001"].includes(t.key));Et.filter(t=>!["top0001","top001"].includes(t.key));i.scaleSqrt().domain([.001,50]).range([.6,6]);async function zt(){await Promise.all([At(),Ft()]),Jt()}zt();const jt=[1980,1990,2e3,2010,2020,2024],I=[{key:"bottom50",label:"Bottom 50%",pop:50,color:"#4dabf7"},{key:"top9",label:"Top 10%",pop:9,color:"#ffd43b"},{key:"top0_9",label:"Top 1%",pop:.9,color:"#ff922b"},{key:"top0_09",label:"Top 0.1%",pop:.09,color:"#f06595"},{key:"top0_009",label:"Top 0.01%",pop:.009,color:"#e64980"},{key:"top0_001",label:"Top 0.001%",pop:.001,color:"#c92a2a"}],Wt=["bottom50","middle40","top9","top0_9","top0_09","top0_009","top0_001"];function et(t,e,r){const s=Math.log10(.001),n=Math.log10(50),a=(Math.log10(Math.max(t,1e-4))-s)/(n-s);return e+a*(r-e)}let st=[],ct=[],St=new Map,ht=new Map,O=null;function vt(t){if(!t)return null;const e={bottom50:t.bottom50*50,middle40:t.mid40*40,top10:t.top10*10,top1:t.top1*1,top01:t.top01*.1,top001:t.top001*.01,top0001:t.top0001*.001};return{year:t.year,values:{bottom50:t.bottom50,middle40:t.mid40,top9:(e.top10-e.top1)/9,top0_9:(e.top1-e.top01)/.9,top0_09:(e.top01-e.top001)/.09,top0_009:(e.top001-e.top0001)/.009,top0_001:t.top0001},totals:{bottom50:e.bottom50,middle40:e.middle40,top9:e.top10-e.top1,top0_9:e.top1-e.top01,top0_09:e.top01-e.top001,top0_009:e.top001-e.top0001,top0_001:e.top0001}}}function Pt(){st.length&&ct.length||(st=ot.map(vt).filter(Boolean),ct=nt.map(vt).filter(Boolean),St=new Map(st.map(t=>[t.year,t])),ht=new Map(ct.map(t=>[t.year,t])))}function tt(){return st.map(t=>t.year).filter(t=>ht.has(t))}function _t(t){var s;const e=new Set(tt()),r=Array.from(new Set(((s=String(t).match(/\d{4}/g))==null?void 0:s.map(Number))||[])).filter(n=>e.has(n)).sort((n,a)=>n-a);return r.length?r:jt.filter(n=>e.has(n))}function G(t,e){return(t==="income"?St:ht).get(e)}function X(t){return t==="income"?st:ct}function H(t,e,r){return t.values[e.key]}function it(t){return`${qt(t)} SEK`}function U(t,e){const r=document.createElement("div");if(r.className="cwi-card",e){const s=document.createElement("h3");s.textContent=e,r.appendChild(s)}return t.appendChild(r),r}function yt(t,e,r,s){const n=document.createElement("div");n.className="cwi-anim-bar",n.innerHTML=`<button type="button" id="cwi-matrix-play">Play</button><input type="range" id="cwi-matrix-year" min="0" max="${e.length-1}" step="1" value="0"><span id="cwi-matrix-year-label">${e[0]}</span>`,t.appendChild(n);const a=U(t,s),h=document.createElement("div");a.appendChild(h);const c=n.querySelector("#cwi-matrix-year"),y=n.querySelector("#cwi-matrix-play"),u=n.querySelector("#cwi-matrix-year-label"),o=l=>{const m=e[l];u.textContent=String(m),r(m,h)};c.addEventListener("input",()=>o(Number(c.value))),y.addEventListener("click",()=>{if(O){clearInterval(O),O=null,y.textContent="Play";return}y.textContent="Pause",O=setInterval(()=>{const l=(Number(c.value)+1)%e.length;c.value=String(l),o(l)},900)}),o(0)}function Ht(t,e,r,s,n){const a=n.includes("income"),h=n.includes("wealth"),c=`${a?"<th>Income</th>":""}${h?"<th>Wealth</th>":""}`,y=(u,o,l)=>{const m=s?`<td>${kt(u.pop)}</td>`:"",$=a?`<td>${it(o.values[u.key])}</td>`:"",w=h?`<td>${it(l.values[u.key])}</td>`:"";return`<tr><td>${u.label}</td>${m}${$}${w}</tr>`};if(r==="juxtaposition"){const u=document.createElement("div");u.className="cwi-years-grid",t.appendChild(u),e.forEach(o=>{const l=U(u,String(o)),m=document.createElement("table");m.className="cwi-table",m.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${c}</tr></thead><tbody>${I.map($=>y($,G("income",o),G("wealth",o))).join("")}</tbody>`,l.appendChild(m)});return}if(r==="superposition"){const u=U(t,"Combined table across selected years"),o=document.createElement("table");o.className="cwi-table";const l=n.length,m=`<tr><th rowspan="2">Group</th>${s?'<th rowspan="2">Pop.</th>':""}${e.map(M=>`<th colspan="${l}">${M}</th>`).join("")}</tr>`,$=`<tr>${e.map(()=>`${a?"<th>Income</th>":""}${h?"<th>Wealth</th>":""}`).join("")}</tr>`,w=I.map(M=>{const v=e.map(f=>{const x=G("income",f),d=G("wealth",f);return`${a?`<td>${it(x.values[M.key])}</td>`:""}${h?`<td>${it(d.values[M.key])}</td>`:""}`}).join("");return`<tr><td>${M.label}</td>${s?`<td>${kt(M.pop)}</td>`:""}${v}</tr>`}).join("");o.innerHTML=`<thead>${m}${$}</thead><tbody>${w}</tbody>`,u.appendChild(o);return}yt(t,tt(),(u,o)=>{o.innerHTML="";const l=document.createElement("table");l.className="cwi-table",l.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${c}</tr></thead><tbody>${I.map(m=>y(m,G("income",u),G("wealth",u))).join("")}</tbody>`,o.appendChild(l)},"Animated table")}function Mt(t,e,r,s,n){const a=i.select(t),h=520,c=310,y={top:18,right:16,bottom:28,left:120},u=h-y.left-y.right,o=c-y.top-y.bottom,l=I.map(b=>H(e,b)),m=i.min(l),$=i.max(l),w=(n==null?void 0:n.min)!=null?n.min:Math.min(0,m),M=(n==null?void 0:n.max)!=null?n.max:$*1.05,v=i.scaleLinear().domain([w,M]).range([0,u]),f=o/I.length;a.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${c}`),a.selectAll("*").remove();const x=`clip-hbar-${r}-${Math.random().toString(36).slice(2)}`;a.append("defs").append("clipPath").attr("id",x).append("rect").attr("width",u).attr("height",o);const d=a.append("g").attr("transform",`translate(${y.left},${y.top})`);if(d.append("g").attr("transform",`translate(0,${o})`).call(i.axisBottom(v).ticks(5).tickFormat(V)),w<0||M>0){const b=v(Math.max(w,Math.min(0,M)));d.append("line").attr("x1",b).attr("x2",b).attr("y1",0).attr("y2",o).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3")}const k=i.select("#cwi-tooltip"),B=d.append("g").attr("clip-path",`url(#${x})`);I.forEach((b,P)=>{const _=H(e,b),g=s?et(b.pop,f*.18,f*.82):f*.7,T=P*f+f/2,E=T-g/2,C=v(Math.max(w,Math.min(0,_))),p=v(Math.min(M,Math.max(0,_)));d.append("text").attr("x",-10).attr("y",T).attr("dy","0.35em").attr("text-anchor","end").attr("font-size",10).text(b.label),B.append("rect").attr("x",Math.min(C,p)).attr("y",E).attr("width",Math.max(2,Math.abs(p-C))).attr("height",g).attr("rx",3).attr("fill",b.color).style("cursor","crosshair").on("mouseover",S=>{k.html(`<strong style="color:${b.color}">${b.label}</strong><br>${V(_)}`).style("display","block").style("left",S.clientX+14+"px").style("top",S.clientY-36+"px")}).on("mousemove",S=>{k.style("left",S.clientX+14+"px").style("top",S.clientY-36+"px")}).on("mouseleave",()=>k.style("display","none"))})}function Yt(t,e,r,s,n,a){const h=c=>{if(n.length===1)return c;const y=document.createElement("div");return y.className="cwi-grid-2",c.appendChild(y),y};if(r==="juxtaposition"){const c=document.createElement("div");c.className="cwi-years-grid",t.appendChild(c),e.forEach(y=>{const u=U(c,String(y)),o=h(u);n.forEach(l=>{const m=document.createElement("div");m.innerHTML=`<p class="cwi-chart-title">${l==="income"?"Income":"Wealth"}</p>`;const $=document.createElementNS("http://www.w3.org/2000/svg","svg");m.appendChild($),o.appendChild(m),Mt($,G(l,y),l,s,a)})});return}if(r==="superposition"){const c=h(t);n.forEach(y=>{const o=U(c,y==="income"?"Income by year — SEK  (dashed = baseline year)":"Wealth by year — SEK  (dashed = baseline year)"),l=(S,N)=>S?H(S,N):0,m=G(y,e[0]),$=e.flatMap(S=>I.map(N=>l(G(y,S),N))),w=i.max($.map(Math.abs)),M=Math.min(0,i.min($)),v=(a==null?void 0:a.min)!=null?a.min:M*1.1,f=(a==null?void 0:a.max)!=null?a.max:w*1.1,x=700,d=360,k={top:24,right:16,bottom:44,left:78},B=x-k.left-k.right,b=d-k.top-k.bottom,P=i.select(o).append("svg").attr("class","cwi-svg").attr("viewBox",`0 0 ${x} ${d}`),_=`clip-vbar-${y}-${Math.random().toString(36).slice(2)}`;P.append("defs").append("clipPath").attr("id",_).append("rect").attr("width",B).attr("height",b);const g=P.append("g").attr("transform",`translate(${k.left},${k.top})`),T=i.scaleBand().domain(e).range([0,B]).paddingInner(.2),E=i.scaleLinear().domain([v,f]).range([b,0]);g.append("g").attr("transform",`translate(0,${b})`).call(i.axisBottom(T).tickFormat(i.format("d"))),g.append("g").call(i.axisLeft(E).ticks(6).tickFormat(V)),v<0&&f>0&&g.append("line").attr("x1",0).attr("x2",B).attr("y1",E(0)).attr("y2",E(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3");const C=i.select("#cwi-tooltip"),p=g.append("g").attr("clip-path",`url(#${_})`);e.forEach(S=>{const N=G(y,S);if(!N)return;const A=T.bandwidth(),F=2,R=I.length,Y=A-F*R,Z=I.map(z=>et(z.pop,.1,1)),L=i.sum(Z);let j=T(S);I.forEach((z,W)=>{const J=Math.max(s?Z[W]/L*Y:Y/R,3),D=l(N,z),K=Math.max(v,Math.min(f,D)),lt=Math.max(v,Math.min(f,0)),at=E(Math.max(K,lt)),pt=Math.max(1,Math.abs(E(K)-E(lt)));if(p.append("rect").attr("x",j).attr("y",at).attr("width",J).attr("height",pt).attr("fill",z.color).attr("rx",2).attr("opacity",.85).style("cursor","crosshair").on("mouseover",Q=>{C.html(`<strong style="color:${z.color}">${z.label}</strong><br>${S}<br>${V(D)}`).style("display","block").style("left",Q.clientX+14+"px").style("top",Q.clientY-36+"px")}).on("mousemove",Q=>{C.style("left",Q.clientX+14+"px").style("top",Q.clientY-36+"px")}).on("mouseleave",()=>C.style("display","none")),m&&S!==e[0]){const Q=l(m,z);Q>=v&&Q<=f&&g.append("line").attr("x1",j).attr("x2",j+J).attr("y1",E(Q)).attr("y2",E(Q)).attr("stroke","#202124").attr("stroke-width",1.5).attr("stroke-dasharray","4 3").attr("opacity",.5)}j+=J+F})})});return}yt(t,tt(),(c,y)=>{y.innerHTML="";const u=h(y);n.forEach(o=>{const l=document.createElement("div");l.innerHTML=`<p class="cwi-chart-title">${o==="income"?"Income":"Wealth"}</p>`;const m=document.createElementNS("http://www.w3.org/2000/svg","svg");l.appendChild(m),u.appendChild(l),Mt(m,G(o,c),o,s,a)})},"Animated bars")}function Rt(t,e,r,s,n,a,h){const c=i.select(t),y=400,u=250,o={top:14,right:58,bottom:30,left:70},l=y-o.left-o.right,m=u-o.top-o.bottom,$=tt(),w=i.scaleLinear().domain(i.extent($)).range([0,l]),[M,v]=a,f=h?M:Math.min(0,M),x=h?v:v*1.08,d=f<0,k=i.scaleLinear().domain([f,x]).range([m,0]),B=k.ticks(4);c.attr("class","cwi-svg").attr("viewBox",`0 0 ${y} ${u}`),c.selectAll("*").remove();const b=c.append("g").attr("transform",`translate(${o.left},${o.top})`);b.selectAll("line.hg").data(B).join("line").attr("class","hg").attr("x1",0).attr("x2",l).attr("y1",p=>k(p)).attr("y2",p=>k(p)).attr("stroke","#e8eaed").attr("stroke-width",.8),b.append("g").attr("transform",`translate(0,${m})`).call(i.axisBottom(w).ticks(5).tickFormat(i.format("d"))).call(p=>p.selectAll("text").attr("font-size",10)),b.append("g").call(i.axisLeft(k).tickValues(B).tickFormat(V)).call(p=>p.selectAll("text").attr("font-size",10)),d&&b.append("line").attr("x1",0).attr("x2",l).attr("y1",k(0)).attr("y2",k(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),b.selectAll(".yr-mark").data(n).join("line").attr("class","yr-mark").attr("x1",p=>w(p)).attr("x2",p=>w(p)).attr("y1",0).attr("y2",m).attr("stroke","#dee2e6").attr("stroke-width",1.5);const P=s?et(e.pop,1,10):1.8;r.forEach((p,S)=>{const N=X(p),A=i.line().defined(F=>Number.isFinite(H(F,e))).x(F=>w(F.year)).y(F=>k(H(F,e)));b.append("path").datum(N).attr("fill","none").attr("stroke",e.color).attr("stroke-width",P).attr("stroke-dasharray",S===1?"5 3":null).attr("d",A)});const _=X(r[0]).at(-1);if(_){const p=H(_,e);Number.isFinite(p)&&b.append("text").attr("x",l+4).attr("y",k(p)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(V(p))}const g=i.select("#cwi-tooltip"),T=X(r[0]),E=i.bisector(p=>p.year).left,C=b.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",m).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");b.append("rect").attr("width",l).attr("height",m).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",p=>{const[S]=i.pointer(p),N=w.invert(S),A=E(T,N),F=T[Math.max(0,A-1)],R=T[Math.min(T.length-1,A)],Y=R&&Math.abs(N-R.year)<Math.abs(N-F.year)?R:F;if(!Y)return;C.attr("x1",w(Y.year)).attr("x2",w(Y.year)).style("display",null);const Z=r.map(L=>{const j=X(L).find(W=>W.year===Y.year),z=j?H(j,e):null;return`${L}: ${z!=null?V(z):"n/a"}`});g.html(`<strong style="color:${e.color}">${e.label}</strong> · ${Y.year}<br>${Z.join("<br>")}`).style("display","block").style("left",p.clientX+16+"px").style("top",p.clientY-50+"px")}).on("mouseleave",()=>{C.style("display","none"),g.style("display","none")})}function Vt(t,e,r,s,n){const a=X(e),h=i.select(t),c=620,y=340,u={top:20,right:110,bottom:28,left:80},o=c-u.left-u.right,l=y-u.top-u.bottom,m=a.flatMap(g=>I.map(T=>H(g,T))).filter(Number.isFinite),$=i.min(m),w=i.max(m),M=(n==null?void 0:n.min)!=null?n.min:Math.min(0,$),v=(n==null?void 0:n.max)!=null?n.max:w*1.05,f=i.scaleLinear().domain(i.extent(a,g=>g.year)).range([0,o]),x=i.scaleLinear().domain([M,v]).range([l,0]);h.attr("class","cwi-svg").attr("viewBox",`0 0 ${c} ${y}`),h.selectAll("*").remove();const d=h.append("g").attr("transform",`translate(${u.left},${u.top})`),k=`clip-line-${e}`;h.append("defs").append("clipPath").attr("id",k).append("rect").attr("width",o).attr("height",l),d.append("g").attr("transform",`translate(0,${l})`).call(i.axisBottom(f).tickFormat(i.format("d"))),d.append("g").call(i.axisLeft(x).ticks(6).tickFormat(V)),M<0&&v>0&&d.append("line").attr("x1",0).attr("x2",o).attr("y1",x(0)).attr("y2",x(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),d.selectAll(".year-mark").data(s).join("line").attr("x1",g=>f(g)).attr("x2",g=>f(g)).attr("y1",0).attr("y2",l).attr("stroke","#f1f3f5");const B=d.append("g").attr("clip-path",`url(#${k})`);I.forEach(g=>{const T=i.line().defined(p=>Number.isFinite(H(p,g))).x(p=>f(p.year)).y(p=>x(H(p,g)));B.append("path").datum(a).attr("fill","none").attr("stroke",g.color).attr("stroke-width",r?et(g.pop,1,10):2).attr("d",T);const E=a[a.length-1],C=H(E,g);Number.isFinite(C)&&C>=M&&C<=v&&d.append("text").attr("x",o+5).attr("y",x(C)).attr("dy","0.35em").attr("font-size",10).attr("fill",g.color).text(g.label)});const b=i.select("#cwi-tooltip"),P=i.bisector(g=>g.year).left,_=d.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",l).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");d.append("rect").attr("width",o).attr("height",l).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",g=>{const[T]=i.pointer(g),E=f.invert(T),C=P(a,E),p=a[Math.max(0,C-1)],S=a[Math.min(a.length-1,C)],N=S&&Math.abs(E-S.year)<Math.abs(E-p.year)?S:p;if(!N)return;_.attr("x1",f(N.year)).attr("x2",f(N.year)).style("display",null);const A=`<strong>${N.year}</strong><br>`+I.map(F=>{const R=H(N,F);return`<span style="color:${F.color}">${F.label}</span>: ${V(R)}`}).join("<br>");b.html(A).style("display","block").style("left",g.clientX+16+"px").style("top",g.clientY-60+"px")}).on("mouseleave",()=>{_.style("display","none"),b.style("display","none")})}function Gt(t,e,r,s,n,a){if(r==="juxtaposition"){const d=n.includes("income")?X("income"):[],k=n.includes("wealth")?X("wealth"):[],B=[...d.flatMap(E=>I.map(C=>H(E,C))),...k.flatMap(E=>I.map(C=>H(E,C)))].filter(Number.isFinite),b=i.min(B),P=i.max(B),_=(a==null?void 0:a.min)!=null||(a==null?void 0:a.max)!=null,g=[(a==null?void 0:a.min)!=null?a.min:b,(a==null?void 0:a.max)!=null?a.max:P];if(n.length>1){const E=document.createElement("p");E.className="cwi-note",E.textContent="Solid line = income · Dashed line = wealth. All panels share the same Y axis.",t.appendChild(E)}const T=document.createElement("div");T.className="cwi-sm-grid",t.appendChild(T),I.forEach(E=>{const C=U(T,E.label),p=document.createElementNS("http://www.w3.org/2000/svg","svg");C.appendChild(p),Rt(p,E,n,s,e,g,_)});return}if(n.length===1){const d=U(t,n[0]==="income"?"Income over time":"Wealth over time"),k=document.createElementNS("http://www.w3.org/2000/svg","svg");d.appendChild(k),Vt(k,n[0],s,e,a);return}const h=U(t,"Superposed indexed lines (income solid, wealth dashed)"),c=document.createElement("div");c.className="cwi-inline-legend",c.innerHTML='<span><i style="background:#495057"></i><span>Income solid</span></span><span><i style="background:#ffffff;border:2px dashed #495057"></i><span>Wealth dashed, indexed to 100</span></span>',h.appendChild(c);const y=i.select(h).append("svg").attr("class","cwi-svg tall"),u=840,o=380,l={top:20,right:120,bottom:28,left:70},m=u-l.left-l.right,$=o-l.top-l.bottom,w=tt(),M=w.map(d=>({year:d,income:G("income",d),wealth:G("wealth",d)})),v=i.scaleLinear().domain(i.extent(w)).range([0,m]),f=i.scaleLinear().domain([0,260]).range([$,0]);y.attr("viewBox",`0 0 ${u} ${o}`);const x=y.append("g").attr("transform",`translate(${l.left},${l.top})`);x.append("g").attr("transform",`translate(0,${$})`).call(i.axisBottom(v).tickFormat(i.format("d"))),x.append("g").call(i.axisLeft(f).ticks(6).tickFormat(d=>`${Math.round(d)}%`)),I.forEach(d=>{const k=Math.abs(H(M[0].income,d))||1,B=Math.abs(H(M[0].wealth,d))||1,b=i.line().x(g=>v(g.year)).y(g=>f(Math.abs(H(g.income,d))/k*100)),P=i.line().x(g=>v(g.year)).y(g=>f(Math.abs(H(g.wealth,d))/B*100)),_=s?et(d.pop,1,7):2;x.append("path").datum(M).attr("fill","none").attr("stroke",d.color).attr("stroke-width",_).attr("d",b),x.append("path").datum(M).attr("fill","none").attr("stroke",d.color).attr("stroke-width",_).attr("stroke-dasharray","5 4").attr("opacity",.85).attr("d",P)})}function Xt(t,e,r,s,n,a,h){const c=i.select(t),y=400,u=250,o={top:14,right:58,bottom:30,left:70},l=y-o.left-o.right,m=u-o.top-o.bottom,$=tt(),w=i.scaleLinear().domain(i.extent($)).range([0,l]),[M,v]=a,f=h?M:Math.min(0,M),x=h?v:v*1.08,d=i.scaleLinear().domain([f,x]).range([m,0]),k=d.ticks(4);c.attr("class","cwi-svg").attr("viewBox",`0 0 ${y} ${u}`),c.selectAll("*").remove();const B=`clip-ga-${e.key}-${Math.random().toString(36).slice(2)}`;c.append("defs").append("clipPath").attr("id",B).append("rect").attr("width",l).attr("height",m);const b=c.append("g").attr("transform",`translate(${o.left},${o.top})`);b.selectAll("line.hg").data(k).join("line").attr("class","hg").attr("x1",0).attr("x2",l).attr("y1",p=>d(p)).attr("y2",p=>d(p)).attr("stroke","#e8eaed").attr("stroke-width",.8),b.append("g").attr("transform",`translate(0,${m})`).call(i.axisBottom(w).ticks(5).tickFormat(i.format("d"))).call(p=>p.selectAll("text").attr("font-size",10)),b.append("g").call(i.axisLeft(d).tickValues(k).tickFormat(V)).call(p=>p.selectAll("text").attr("font-size",10)),f<0&&x>0&&b.append("line").attr("x1",0).attr("x2",l).attr("y1",d(0)).attr("y2",d(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),b.selectAll(".yr-mark").data(n).join("line").attr("class","yr-mark").attr("x1",p=>w(p)).attr("x2",p=>w(p)).attr("y1",0).attr("y2",m).attr("stroke","#dee2e6").attr("stroke-width",1.5);const P=b.append("g").attr("clip-path",`url(#${B})`);r.forEach((p,S)=>{const N=X(p),A=i.area().x(F=>w(F.year)).y0(d(Math.max(f,Math.min(x,0)))).y1(F=>d(Math.max(f,Math.min(x,F.values[e.key]||0))));P.append("path").datum(N).attr("fill",e.color).attr("opacity",S===0?.72:.42).attr("stroke-dasharray",S===1?"5 3":null).attr("d",A)});const _=X(r[0]).at(-1);if(_){const p=_.values[e.key]||0;Number.isFinite(p)&&p>=f&&p<=x&&b.append("text").attr("x",l+4).attr("y",d(p)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(V(p))}const g=i.select("#cwi-tooltip"),T=X(r[0]),E=i.bisector(p=>p.year).left,C=b.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",m).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");b.append("rect").attr("width",l).attr("height",m).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",p=>{const[S]=i.pointer(p),N=w.invert(S),A=E(T,N),F=T[Math.max(0,A-1)],R=T[Math.min(T.length-1,A)],Y=R&&Math.abs(N-R.year)<Math.abs(N-F.year)?R:F;if(!Y)return;C.attr("x1",w(Y.year)).attr("x2",w(Y.year)).style("display",null);const Z=r.map(L=>{const j=X(L).find(W=>W.year===Y.year),z=j?j.values[e.key]||0:null;return`${L}: ${z!=null?V(z):"n/a"}`});g.html(`<strong style="color:${e.color}">${e.label}</strong> · ${Y.year}<br>${Z.join("<br>")}`).style("display","block").style("left",p.clientX+16+"px").style("top",p.clientY-50+"px")}).on("mouseleave",()=>{C.style("display","none"),g.style("display","none")})}function Kt(t,e,r,s,n,a){const h=o=>{let l=0;return I.map(m=>{const $=o.values[m.key]||0,w=l;return l+=$,{grp:m,y0:w,y1:l}})},c=(o,l)=>{const m=X(l),$=m[m.length-1],w=m.flatMap(L=>h(L).flatMap(j=>[j.y0,j.y1])),M=i.min(w),v=i.max(w),f=Math.min(0,M*1.05),x=v*1.05,d=(a==null?void 0:a.min)!=null?a.min:f,k=(a==null?void 0:a.max)!=null?a.max:x,B=700,b=340,P=22,g={top:20,right:s?148:112,bottom:28,left:80},T=B-g.left-g.right,E=b-g.top-g.bottom,C=i.select(o);C.attr("class","cwi-svg").attr("viewBox",`0 0 ${B} ${b}`),C.selectAll("*").remove();const p=i.scaleLinear().domain(i.extent(m,L=>L.year)).range([0,T]),S=i.scaleLinear().domain([d,k]).range([E,0]),N=`clip-area-${l}-${Math.random().toString(36).slice(2)}`;C.append("defs").append("clipPath").attr("id",N).append("rect").attr("width",T).attr("height",E);const A=C.append("g").attr("transform",`translate(${g.left},${g.top})`);A.append("g").attr("transform",`translate(0,${E})`).call(i.axisBottom(p).tickFormat(i.format("d"))),A.append("g").call(i.axisLeft(S).ticks(6).tickFormat(V)),d<0&&k>0&&A.append("line").attr("x1",0).attr("x2",T).attr("y1",S(0)).attr("y2",S(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),A.selectAll(".yr-ref").data(e).join("line").attr("x1",L=>p(L)).attr("x2",L=>p(L)).attr("y1",0).attr("y2",E).attr("stroke","#e9ecef");const F=A.append("g").attr("clip-path",`url(#${N})`);for(let L=I.length-1;L>=0;L--){const j=I[L],z=i.area().x(W=>p(W.year)).y0(W=>S(Math.max(d,Math.min(k,h(W)[L].y0)))).y1(W=>S(Math.max(d,Math.min(k,h(W)[L].y1))));F.append("path").datum(m).attr("fill",j.color).attr("opacity",.88).attr("d",z)}if(h($).forEach(({grp:L,y0:j,y1:z})=>{const W=(j+z)/2;W>=d&&W<=k&&A.append("text").attr("x",T+5).attr("y",S(W)).attr("dy","0.35em").attr("font-size",10).attr("fill",L.color).text(L.label)}),s){const L=T+104;A.append("text").attr("x",L+P/2).attr("y",-7).attr("text-anchor","middle").attr("font-size",9).attr("fill","#6c757d").text("Pop.");const j=I.map(J=>et(J.pop,.1,1)),z=i.sum(j);let W=0;I.forEach((J,D)=>{const K=Math.max(2,j[D]/z*E);A.append("rect").attr("x",L).attr("y",W).attr("width",P).attr("height",K).attr("rx",2).attr("fill",J.color).attr("opacity",.85),K>=10&&A.append("text").attr("x",L+P/2).attr("y",W+K/2).attr("dy","0.35em").attr("text-anchor","middle").attr("font-size",8).attr("fill","#fff").attr("pointer-events","none").text(`${J.pop}%`),W+=K})}const R=i.select("#cwi-tooltip"),Y=i.bisector(L=>L.year).left,Z=A.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",E).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");A.append("rect").attr("width",T).attr("height",E).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",L=>{const[j]=i.pointer(L),z=p.invert(j),W=Y(m,z),J=m[Math.max(0,W-1)],D=m[Math.min(m.length-1,W)],K=D&&Math.abs(z-D.year)<Math.abs(z-J.year)?D:J;if(!K)return;Z.attr("x1",p(K.year)).attr("x2",p(K.year)).style("display",null);const lt=`<strong>${K.year}</strong><br>`+I.map(at=>{const pt=K.values[at.key]||0;return`<span style="color:${at.color}">${at.label}</span>: ${V(pt)}`}).join("<br>");R.html(lt).style("display","block").style("left",L.clientX+16+"px").style("top",L.clientY-60+"px")}).on("mouseleave",()=>{Z.style("display","none"),R.style("display","none")})};if(r==="juxtaposition"){const o=n.flatMap(v=>X(v).flatMap(f=>I.map(x=>f.values[x.key]||0))).filter(Number.isFinite),l=i.min(o),m=i.max(o),$=(a==null?void 0:a.max)!=null,w=[Math.min(0,l),(a==null?void 0:a.max)!=null?a.max:m];if(n.length>1){const v=document.createElement("p");v.className="cwi-note",v.textContent="Solid fill = income · Translucent dashed fill = wealth. All panels share the same Y axis.",t.appendChild(v)}const M=document.createElement("div");M.className="cwi-sm-grid",t.appendChild(M),I.forEach(v=>{const f=U(M,v.label),x=document.createElementNS("http://www.w3.org/2000/svg","svg");f.appendChild(x),Xt(x,v,n,s,e,w,$)});return}const u=(o=>{if(n.length===1)return o;const l=document.createElement("div");return l.className="cwi-grid-2",o.appendChild(l),l})(t);n.forEach(o=>{const m=U(u,o==="income"?"Average pre-tax income per person (SEK, linear scale, gray = Middle 40%)":"Average net wealth per person (SEK, linear scale, gray = Middle 40%, below 0 = net debt)"),$=document.createElementNS("http://www.w3.org/2000/svg","svg");m.appendChild($),c($,o)})}function Lt(t){const e=G("income",t),r=i.sum(Wt,s=>Math.max(0,e.totals[s]||0));return I.map(s=>{const n=Math.max(0,e.totals[s.key]||0);return r>0?n/r*100:0})}function Tt(t,e,r,s,n,a,h){e.forEach(u=>{t.append("rect").attr("x",u.x).attr("y",u.y).attr("width",r).attr("height",s).attr("rx",3).attr("fill",h)});let c=0;n.map((u,o)=>{const l={start:c,end:c+u,color:a[o]};return c+=u,l}).forEach(u=>{e.forEach(o=>{const l=Math.max(o.i,u.start),m=Math.min(o.i+1,u.end);if(m<=l+.001)return;const $=l-o.i,w=m-o.i,M=w-$>=.999,v=o.y+s*(1-w),f=Math.max(1,s*(w-$));t.append("rect").attr("x",o.x).attr("y",v).attr("width",r).attr("height",f).attr("rx",M?3:1).attr("fill",u.color)})})}function $t(t,e,r){const s=i.select(t),n=250,a=r?290:240,h=20,c=Lt(e);s.attr("class","cwi-svg").attr("viewBox",`0 0 ${n} ${a}`),s.selectAll("*").remove();const y=i.range(100).map(o=>({i:o,x:15+o%10*22,y:15+(9-Math.floor(o/10))*22})),u=s.append("g");if(Tt(u,y,h,h,c,I.map(o=>o.color),"#eef1ea"),r){const o=[...I.map(w=>w.pop),40],l=[...I.map(w=>w.color),"#dee2e6"],m=Nt(o);let $=0;s.append("text").attr("x",15).attr("y",255).attr("font-size",10).attr("fill","#5f6368").text("Population strip (gray = Middle 40%)"),m.forEach((w,M)=>{for(let v=0;v<w;v+=1)s.append("rect").attr("x",15+$*2.05).attr("y",265).attr("width",1.8).attr("height",10).attr("rx",1).attr("fill",l[M]).attr("opacity",.75),$+=1})}}function Ut(t,e,r,s){const n=document.createElement("div");if(n.className="cwi-note",n.textContent="Income waffle shares: population share × average income for each disjoint group. Wealth excluded (negative values).",t.appendChild(n),r==="juxtaposition"){I.forEach((a,h)=>{const c=document.createElement("div");c.style.cssText="margin-bottom:1.2rem;";const y=document.createElement("h4");y.textContent=a.label,y.style.cssText=`font-size:0.95rem;font-weight:700;color:${a.color};margin:0 0 0.4rem;`,c.appendChild(y);const u=document.createElement("div");u.style.cssText="display:flex;flex-wrap:wrap;gap:0.6rem;",e.forEach(o=>{const l=U(u,String(o));l.style.minWidth="170px";const $=Lt(o)[h],w=i.select(l).append("svg").attr("class","cwi-svg").attr("viewBox","0 0 240 240"),M=i.range(100).map(x=>({i:x,x:10+x%10*22,y:10+(9-Math.floor(x/10))*22})),v=w.append("g");Tt(v,M,20,20,[$],[a.color],"#e9ecef");const f=document.createElement("p");f.textContent=`${$.toFixed(2)}%`,f.style.cssText="text-align:center;font-size:0.8rem;color:#5f6368;margin:0.2rem 0 0;",l.appendChild(f)}),c.appendChild(u),t.appendChild(c)});return}if(r==="superposition"){const a=document.createElement("div");a.className="cwi-years-grid";const h=document.createElement("div");h.className="cwi-inline-legend",h.style.marginBottom="0.6rem",I.forEach(c=>{const y=document.createElement("span");y.innerHTML=`<i style="background:${c.color}"></i><span>${c.label}</span>`,h.appendChild(y)}),t.appendChild(h),t.appendChild(a),e.forEach(c=>{const y=U(a,String(c)),u=document.createElementNS("http://www.w3.org/2000/svg","svg");y.appendChild(u),$t(u,c,s)});return}yt(t,tt(),(a,h)=>{h.innerHTML="";const c=document.createElementNS("http://www.w3.org/2000/svg","svg");h.appendChild(c),$t(c,a,s)},"Animated income waffle")}function Jt(){Pt();const t=document.getElementById("cwi-years-input"),e=document.getElementById("cwi-representation"),r=document.getElementById("cwi-comparison"),s=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),a=document.getElementById("cwi-render-root");if(!t||!e||!r||!s||!n||!a)return;const h=document.getElementById("cwi-yview"),c=document.getElementById("cwi-ymax-slider"),y=document.getElementById("cwi-ymax-val"),u=document.getElementById("cwi-yview-reset");let o={min:null,max:null},l=1;const m=x=>{const d=x.flatMap(k=>X(k).flatMap(B=>I.map(b=>B.values[b.key]||0))).filter(Number.isFinite);return i.max(d)},$=x=>{const d=Math.max(5,Math.log10(Math.abs(l))-4.5),k=Math.log10(Math.abs(l));return Math.pow(10,d+(k-d)*x/1e3)},w=x=>{const d=Math.max(5,Math.log10(Math.abs(l))-4.5),k=Math.log10(Math.abs(l));return Math.max(0,Math.min(1e3,Math.round((Math.log10(Math.max(x,1))-d)/(k-d)*1e3)))},M=()=>{const x=o.max!=null?o.max:l;y.textContent=V(x)},v=()=>{const x=o.max!=null?o.max:l;c.value=w(x),M()};c.addEventListener("input",()=>{o.max=$(Number(c.value)),M(),f()}),u.addEventListener("click",()=>{o={min:null,max:null},v(),f()});const f=()=>{O&&(clearInterval(O),O=null);const x=_t(t.value),d=e.value,k=n.value==="with";s.disabled=d==="waffle",d==="waffle"&&(s.value="income");const B=s.value==="both"?["income","wealth"]:[s.value];Array.from(r.options).forEach(P=>{P.disabled=(d==="line"||d==="stacked")&&P.value==="animation"}),(d==="line"||d==="stacked")&&r.value==="animation"&&(r.value="juxtaposition");const b=r.value;d==="line"||d==="bar"||d==="stacked"?(h.classList.remove("hidden"),l=m(B),v()):(h.classList.add("hidden"),o={min:null,max:null}),a.innerHTML="",d==="table"&&Ht(a,x,b,k,B),d==="bar"&&Yt(a,x,b,k,B,o),d==="line"&&Gt(a,x,b,k,B,o),d==="stacked"&&Kt(a,x,b,k,B,o),d==="waffle"&&Ut(a,x,b,k)};e.addEventListener("change",f),r.addEventListener("change",f),s.addEventListener("change",f),n.addEventListener("change",f),t.addEventListener("change",f),t.addEventListener("blur",f),f()}const ft="1.0",It="wealth-study-data",rt=[{id:"consent",type:"info",title:"Participant Information & Consent",content:`
      <p>You are invited to participate in a user study conducted as part of a Master's thesis at Linköping University.</p>
      <p><strong>What you will do:</strong> Interact with the visualization tool and answer a short question.</p>
      <p><strong>Data:</strong> Your responses are stored locally in your browser. No personal data is collected.</p>
      <p><strong>Participation is voluntary.</strong> You may close this window at any time.</p>
      <label class="consent-check">
        <input type="checkbox" id="consent-checkbox" />
        I have read the information above and agree to participate.
      </label>`,nextLabel:"Start",requireConsent:!0},{id:"task_test",type:"task",phase:"Task 1 of 1",vizConfig:{representation:"bar",comparison:"juxtaposition",metric:"wealth",popEncoding:"without",years:"1980,1990,2000,2010,2020,2024"},taskText:"test",questionText:"test",options:[{label:"a test",value:"a"},{label:"b test",value:"b"},{label:"c test",value:"c"},{label:"d test",value:"d"}]},{id:"complete",type:"complete",title:"Thank you!",content:"<p>Your response has been recorded.</p>"}],q={currentStep:0,startTime:Date.now(),stepTimes:{},answers:{},participantId:Math.random().toString(36).slice(2,9)};function Qt(t){const e=document.getElementById("cwi-representation"),r=document.getElementById("cwi-comparison"),s=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),a=document.getElementById("cwi-years-input");e&&(t.representation&&(e.value=t.representation),t.years&&(a.value=t.years,a.dispatchEvent(new Event("change"))),t.metric&&(s.value=t.metric),t.comparison&&(r.value=t.comparison),t.popEncoding&&(n.value=t.popEncoding),e.dispatchEvent(new Event("change")))}function Ct(t,e,r={}){q.answers[t]={value:e,timestamp:Date.now(),elapsed:Date.now()-(q.stepTimes[t]||q.startTime),...r},localStorage.setItem(It,JSON.stringify({state:q,version:ft}))}function Zt(){rt.find(n=>n.id==="pre_q1");const t={participantId:q.participantId,studyVersion:ft,startTime:new Date(q.startTime).toISOString(),completedTime:new Date().toISOString(),answers:q.answers,summary:Bt()},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(e),s=document.createElement("a");s.href=r,s.download=`study-${q.participantId}.json`,s.click(),URL.revokeObjectURL(r)}function Bt(){var t;return{taskTestAnswer:((t=q.answers.task_test)==null?void 0:t.value)??"—"}}function xt(){const t=rt[q.currentStep];q.stepTimes[t.id]=Date.now();const e=document.getElementById("study-overlay"),r=document.getElementById("study-panel"),s=document.getElementById("study-task-banner");t.type==="task"?(e.classList.add("hidden"),s.classList.remove("hidden"),Qt(t.vizConfig),te(t,s)):(s.classList.add("hidden"),e.classList.remove("hidden"),t.type==="info"&&Dt(t,r),t.type==="question"&&Ot(t,r),t.type==="complete"&&ee(t,r)),ae()}function Dt(t,e){var r,s;if(e.innerHTML=`
    <div class="study-phase-tag">Information</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-nav">
      ${q.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${t.requireConsent?"disabled":""}>${t.nextLabel||"Next →"}</button>
    </div>`,t.requireConsent){const n=e.querySelector("#consent-checkbox"),a=e.querySelector("#study-next");n.addEventListener("change",()=>{a.disabled=!n.checked})}(r=e.querySelector("#study-next"))==null||r.addEventListener("click",bt),(s=e.querySelector("#study-prev"))==null||s.addEventListener("click",gt)}function Ot(t,e){var s,n;const r=(s=q.answers[t.id])==null?void 0:s.value;e.innerHTML=`
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
      ${q.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${r?"":"disabled"}>Next →</button>
    </div>`,e.querySelectorAll(".study-option").forEach(a=>{a.addEventListener("click",()=>{e.querySelectorAll(".study-option").forEach(c=>c.classList.remove("selected")),a.classList.add("selected");const h=a.querySelector("input").value;Ct(t.id,h),e.querySelector("#study-next").disabled=!1})}),e.querySelector("#study-next").addEventListener("click",bt),(n=e.querySelector("#study-prev"))==null||n.addEventListener("click",gt)}let dt="description";function te(t,e){dt="description",e.innerHTML=ut(t),mt(t,e)}function ut(t){var r;const e=(r=q.answers[t.id])==null?void 0:r.value;return dt==="description"?`
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
    </div>`}function mt(t,e){var r,s,n,a,h;(r=e.querySelector("#task-back"))==null||r.addEventListener("click",()=>{gt()}),(s=e.querySelector("#task-ready"))==null||s.addEventListener("click",()=>{dt="question",e.innerHTML=ut(t),mt(t,e)}),(n=e.querySelector("#task-back-q"))==null||n.addEventListener("click",()=>{dt="description",e.innerHTML=ut(t),mt(t,e)}),e.querySelectorAll(".task-option").forEach(c=>{c.addEventListener("click",()=>{e.querySelectorAll(".task-option").forEach(u=>u.classList.remove("selected")),c.classList.add("selected");const y=c.querySelector("input").value;Ct(t.id,y),e.querySelector("#task-submit").disabled=!1})}),(a=e.querySelector("#task-submit"))==null||a.addEventListener("click",bt),(h=e.querySelector("#task-close-btn"))==null||h.addEventListener("click",wt)}function ee(t,e){const r=Bt();e.innerHTML=`
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
    </div>`,e.querySelector("#study-download").addEventListener("click",Zt),e.querySelector("#study-close-complete").addEventListener("click",wt)}function ae(){const t=document.getElementById("study-progress-bar"),e=document.getElementById("study-progress-label"),r=rt.length-1,s=Math.round(q.currentStep/r*100);t&&(t.style.width=s+"%"),e&&(e.textContent=`Step ${q.currentStep+1} of ${rt.length}`)}function bt(){q.currentStep<rt.length-1&&(q.currentStep++,xt())}function gt(){q.currentStep>0&&(q.currentStep--,xt())}function ne(){oe(),se();try{const t=localStorage.getItem(It);if(t){const e=JSON.parse(t);e.version===ft&&e.state&&Object.assign(q,e.state)}}catch{}document.getElementById("study-launch-btn").addEventListener("click",()=>{document.getElementById("study-launcher").classList.add("hidden"),document.getElementById("study-overlay").classList.remove("hidden"),xt()}),document.getElementById("study-close-btn").addEventListener("click",wt)}function wt(){document.getElementById("study-overlay").classList.add("hidden"),document.getElementById("study-task-banner").classList.add("hidden"),document.getElementById("study-progress-container").classList.add("hidden"),document.getElementById("study-launcher").classList.remove("hidden"),q.currentStep=0}function oe(){document.body.insertAdjacentHTML("beforeend",`
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
  `),new MutationObserver(()=>{const e=document.getElementById("study-overlay"),r=document.getElementById("study-task-banner"),s=document.getElementById("study-progress-container");e.classList.contains("hidden")&&r.classList.contains("hidden")&&q.currentStep===0?s.classList.add("hidden"):s.classList.remove("hidden")}).observe(document.getElementById("study-overlay"),{attributes:!0})}function se(){const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t)}ne();
