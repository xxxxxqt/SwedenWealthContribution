(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const h of a.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();const i=window.d3;function Wt(t){const e=t.map(Math.floor);let r=100-i.sum(e);const s=t.map((n,a)=>({i:a,frac:n-Math.floor(n)})).sort((n,a)=>a.frac-n.frac);for(let n=0;n<s.length&&r>0;n+=1)e[s[n].i]+=1,r-=1;return e}const Nt=[{key:"bottom50",label:"Bottom 50%",color:"#4dabf7",pop:50},{key:"top10",label:"Top 10%",color:"#fcc419",pop:10},{key:"top1",label:"Top 1%",color:"#ff8787",pop:1},{key:"top01",label:"Top 0.1%",color:"#e599f7",pop:.1},{key:"top001",label:"Top 0.01%",color:"#ff6b6b",pop:.01},{key:"top0001",label:"Top 0.001%",color:"#c92a2a",pop:.001}];i.scaleSqrt().domain([.001,50]).range([.6,6]);let it=[];async function _t(){const e=(await i.text("./data/wealth_avg.csv")).split(`
`),r=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};it=[];for(let n=1;n<e.length;n++){const a=e[n].split(",");if(a.length<r.length)continue;const h=Number(a[0]);if(!Number.isFinite(h))continue;const c={year:h};let y=!0;for(let u=1;u<r.length;u++){const o=s[r[u].trim()];if(!o)continue;const l=Number(a[u]);if(!Number.isFinite(l)){y=!1;break}c[o]=l}y&&c.bottom50!==void 0&&it.push(c)}it.sort((n,a)=>n.year-a.year),new Map(it.map(n=>[n.year,n]))}let ct=[];async function Ht(){const e=(await i.text("./data/income_avg.csv")).split(`
`),r=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};ct=[];for(let n=1;n<e.length;n++){const a=e[n].split(",");if(a.length<2)continue;const h=Number(a[0]);if(!Number.isFinite(h))continue;const c={year:h};for(let y=1;y<r.length;y++){const u=s[r[y].trim()];u&&(c[u]=Number(a[y])||0)}c.bottom50!==void 0&&ct.push(c)}ct.sort((n,a)=>n.year-a.year),new Map(ct.map(n=>[n.year,n]))}function Yt(t){const e=Math.abs(t);return e>=1e9?(t/1e9).toFixed(1)+"B":e>=1e6?(t/1e6).toFixed(1)+"M":e>=1e3?(t/1e3).toFixed(0)+"K":t.toFixed(0)}function Tt(t){return t>=1?`${t}%`:t>=.1?`${t.toFixed(1)}%`:t>=.01?`${t.toFixed(2)}%`:`${t.toFixed(3)}%`}function X(t){const e=Math.abs(t);return e>=1e9?`${(t/1e9).toFixed(e>=1e10?0:1)}B`:e>=1e6?`${(t/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(t/1e3).toFixed(e>=1e5?0:1)}K`:`${Math.round(t)}`}Nt.filter(t=>["top0001","top001"].includes(t.key));Nt.filter(t=>!["top0001","top001"].includes(t.key));i.scaleSqrt().domain([.001,50]).range([.6,6]);async function Rt(){await Promise.all([_t(),Ht()]),ae()}Rt();const Vt=[1980,1990,2e3,2010,2020,2024],C=[{key:"bottom50",label:"Bottom 50%",pop:50,color:"#4dabf7"},{key:"top9",label:"Top 10%",pop:9,color:"#ffd43b"},{key:"top0_9",label:"Top 1%",pop:.9,color:"#ff922b"},{key:"top0_09",label:"Top 0.1%",pop:.09,color:"#f06595"},{key:"top0_009",label:"Top 0.01%",pop:.009,color:"#e64980"},{key:"top0_001",label:"Top 0.001%",pop:.001,color:"#c92a2a"}],Gt=["bottom50","middle40","top9","top0_9","top0_09","top0_009","top0_001"];function ut(t,e,r){const s=Math.log10(.001),n=Math.log10(50),a=(Math.log10(Math.max(t,1e-4))-s)/(n-s);return e+a*(r-e)}let dt=[],ft=[],At=new Map,kt=new Map,nt=null;function It(t){if(!t)return null;const e={bottom50:t.bottom50*50,middle40:t.mid40*40,top10:t.top10*10,top1:t.top1*1,top01:t.top01*.1,top001:t.top001*.01,top0001:t.top0001*.001};return{year:t.year,values:{bottom50:t.bottom50,middle40:t.mid40,top9:(e.top10-e.top1)/9,top0_9:(e.top1-e.top01)/.9,top0_09:(e.top01-e.top001)/.09,top0_009:(e.top001-e.top0001)/.009,top0_001:t.top0001},totals:{bottom50:e.bottom50,middle40:e.middle40,top9:e.top10-e.top1,top0_9:e.top1-e.top01,top0_09:e.top01-e.top001,top0_009:e.top001-e.top0001,top0_001:e.top0001}}}function Xt(){dt.length&&ft.length||(dt=ct.map(It).filter(Boolean),ft=it.map(It).filter(Boolean),At=new Map(dt.map(t=>[t.year,t])),kt=new Map(ft.map(t=>[t.year,t])))}function ot(){return dt.map(t=>t.year).filter(t=>kt.has(t))}function Kt(t){var s;const e=new Set(ot()),r=Array.from(new Set(((s=String(t).match(/\d{4}/g))==null?void 0:s.map(Number))||[])).filter(n=>e.has(n)).sort((n,a)=>n-a);return r.length?r:Vt.filter(n=>e.has(n))}function K(t,e){return(t==="income"?At:kt).get(e)}function U(t){return t==="income"?dt:ft}function Y(t,e,r){return t.values[e.key]}function yt(t){return`${Yt(t)} SEK`}function Q(t,e){const r=document.createElement("div");if(r.className="cwi-card",e){const s=document.createElement("h3");s.textContent=e,r.appendChild(s)}return t.appendChild(r),r}function vt(t,e,r,s){const n=document.createElement("div");n.className="cwi-anim-bar",n.innerHTML=`<button type="button" id="cwi-matrix-play">Play</button><input type="range" id="cwi-matrix-year" min="0" max="${e.length-1}" step="1" value="0"><span id="cwi-matrix-year-label">${e[0]}</span>`,t.appendChild(n);const a=Q(t,s),h=document.createElement("div");a.appendChild(h);const c=n.querySelector("#cwi-matrix-year"),y=n.querySelector("#cwi-matrix-play"),u=n.querySelector("#cwi-matrix-year-label"),o=l=>{const m=e[l];u.textContent=String(m),r(m,h)};c.addEventListener("input",()=>o(Number(c.value))),y.addEventListener("click",()=>{if(nt){clearInterval(nt),nt=null,y.textContent="Play";return}y.textContent="Pause",nt=setInterval(()=>{const l=(Number(c.value)+1)%e.length;c.value=String(l),o(l)},900)}),o(0)}function Ut(t,e,r,s,n){const a=n.includes("income"),h=n.includes("wealth"),c=`${a?"<th>Income</th>":""}${h?"<th>Wealth</th>":""}`,y=(u,o,l)=>{const m=s?`<td>${Tt(u.pop)}</td>`:"",E=a?`<td>${yt(o.values[u.key])}</td>`:"",w=h?`<td>${yt(l.values[u.key])}</td>`:"";return`<tr><td>${u.label}</td>${m}${E}${w}</tr>`};if(r==="juxtaposition"){const u=document.createElement("div");u.className="cwi-years-grid",t.appendChild(u),e.forEach(o=>{const l=Q(u,String(o)),m=document.createElement("table");m.className="cwi-table",m.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${c}</tr></thead><tbody>${C.map(E=>y(E,K("income",o),K("wealth",o))).join("")}</tbody>`,l.appendChild(m)});return}if(r==="superposition"){const u=Q(t,"Combined table across selected years"),o=document.createElement("table");o.className="cwi-table";const l=n.length,m=`<tr><th rowspan="2">Group</th>${s?'<th rowspan="2">Pop.</th>':""}${e.map($=>`<th colspan="${l}">${$}</th>`).join("")}</tr>`,E=`<tr>${e.map(()=>`${a?"<th>Income</th>":""}${h?"<th>Wealth</th>":""}`).join("")}</tr>`,w=C.map($=>{const v=e.map(f=>{const x=K("income",f),d=K("wealth",f);return`${a?`<td>${yt(x.values[$.key])}</td>`:""}${h?`<td>${yt(d.values[$.key])}</td>`:""}`}).join("");return`<tr><td>${$.label}</td>${s?`<td>${Tt($.pop)}</td>`:""}${v}</tr>`}).join("");o.innerHTML=`<thead>${m}${E}</thead><tbody>${w}</tbody>`,u.appendChild(o);return}vt(t,ot(),(u,o)=>{o.innerHTML="";const l=document.createElement("table");l.className="cwi-table",l.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${c}</tr></thead><tbody>${C.map(m=>y(m,K("income",u),K("wealth",u))).join("")}</tbody>`,o.appendChild(l)},"Animated table")}function Ct(t,e,r,s,n){const a=i.select(t),h=520,c=310,y={top:18,right:16,bottom:28,left:120},u=h-y.left-y.right,o=c-y.top-y.bottom,l=C.map(b=>Y(e,b)),m=i.min(l),E=i.max(l),w=(n==null?void 0:n.min)!=null?n.min:Math.min(0,m),$=(n==null?void 0:n.max)!=null?n.max:E*1.05,v=i.scaleLinear().domain([w,$]).range([0,u]),f=o/C.length;a.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${c}`),a.selectAll("*").remove();const x=`clip-hbar-${r}-${Math.random().toString(36).slice(2)}`;a.append("defs").append("clipPath").attr("id",x).append("rect").attr("width",u).attr("height",o);const d=a.append("g").attr("transform",`translate(${y.left},${y.top})`);if(d.append("g").attr("transform",`translate(0,${o})`).call(i.axisBottom(v).ticks(5).tickFormat(X)),w<0||$>0){const b=v(Math.max(w,Math.min(0,$)));d.append("line").attr("x1",b).attr("x2",b).attr("y1",0).attr("y2",o).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3")}const k=i.select("#cwi-tooltip"),B=d.append("g").attr("clip-path",`url(#${x})`);C.forEach((b,q)=>{const _=Y(e,b),g=s?ut(b.pop,f*.18,f*.82):f*.7,T=q*f+f/2,M=T-g/2,I=v(Math.max(w,Math.min(0,_))),p=v(Math.min($,Math.max(0,_)));d.append("text").attr("x",-10).attr("y",T).attr("dy","0.35em").attr("text-anchor","end").attr("font-size",10).text(b.label),B.append("rect").attr("x",Math.min(I,p)).attr("y",M).attr("width",Math.max(2,Math.abs(p-I))).attr("height",g).attr("rx",3).attr("fill",b.color).style("cursor","crosshair").on("mouseover",L=>{k.html(`<strong style="color:${b.color}">${b.label}</strong><br>${X(_)}`).style("display","block").style("left",L.clientX+14+"px").style("top",L.clientY-36+"px")}).on("mousemove",L=>{k.style("left",L.clientX+14+"px").style("top",L.clientY-36+"px")}).on("mouseleave",()=>k.style("display","none"))})}function Jt(t,e,r,s,n,a){const h=c=>{if(n.length===1)return c;const y=document.createElement("div");return y.className="cwi-grid-2",c.appendChild(y),y};if(r==="juxtaposition"){const c=document.createElement("div");c.className="cwi-years-grid",t.appendChild(c),e.forEach(y=>{const u=Q(c,String(y)),o=h(u);n.forEach(l=>{const m=document.createElement("div");m.innerHTML=`<p class="cwi-chart-title">${l==="income"?"Income":"Wealth"}</p>`;const E=document.createElementNS("http://www.w3.org/2000/svg","svg");m.appendChild(E),o.appendChild(m),Ct(E,K(l,y),l,s,a)})});return}if(r==="superposition"){const c=h(t);n.forEach(y=>{const o=Q(c,y==="income"?"Income by year — SEK  (dashed = baseline year)":"Wealth by year — SEK  (dashed = baseline year)"),l=(L,N)=>L?Y(L,N):0,m=K(y,e[0]),E=e.flatMap(L=>C.map(N=>l(K(y,L),N))),w=i.max(E.map(Math.abs)),$=Math.min(0,i.min(E)),v=(a==null?void 0:a.min)!=null?a.min:$*1.1,f=(a==null?void 0:a.max)!=null?a.max:w*1.1,x=700,d=360,k={top:24,right:16,bottom:44,left:78},B=x-k.left-k.right,b=d-k.top-k.bottom,q=i.select(o).append("svg").attr("class","cwi-svg").attr("viewBox",`0 0 ${x} ${d}`),_=`clip-vbar-${y}-${Math.random().toString(36).slice(2)}`;q.append("defs").append("clipPath").attr("id",_).append("rect").attr("width",B).attr("height",b);const g=q.append("g").attr("transform",`translate(${k.left},${k.top})`),T=i.scaleBand().domain(e).range([0,B]).paddingInner(.2),M=i.scaleLinear().domain([v,f]).range([b,0]);g.append("g").attr("transform",`translate(0,${b})`).call(i.axisBottom(T).tickFormat(i.format("d"))),g.append("g").call(i.axisLeft(M).ticks(6).tickFormat(X)),v<0&&f>0&&g.append("line").attr("x1",0).attr("x2",B).attr("y1",M(0)).attr("y2",M(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3");const I=i.select("#cwi-tooltip"),p=g.append("g").attr("clip-path",`url(#${_})`);e.forEach(L=>{const N=K(y,L);if(!N)return;const A=T.bandwidth(),j=2,G=C.length,R=A-j*G,D=C.map(z=>ut(z.pop,.1,1)),S=i.sum(D);let F=T(L);C.forEach((z,H)=>{const V=Math.max(s?D[H]/S*R:R/G,3),J=l(N,z),Z=Math.max(v,Math.min(f,J)),at=Math.max(v,Math.min(f,0)),O=M(Math.max(Z,at)),st=Math.max(1,Math.abs(M(Z)-M(at)));if(p.append("rect").attr("x",F).attr("y",O).attr("width",V).attr("height",st).attr("fill",z.color).attr("rx",2).attr("opacity",.85).style("cursor","crosshair").on("mouseover",W=>{I.html(`<strong style="color:${z.color}">${z.label}</strong><br>${L}<br>${X(J)}`).style("display","block").style("left",W.clientX+14+"px").style("top",W.clientY-36+"px")}).on("mousemove",W=>{I.style("left",W.clientX+14+"px").style("top",W.clientY-36+"px")}).on("mouseleave",()=>I.style("display","none")),m&&L!==e[0]){const W=l(m,z);W>=v&&W<=f&&g.append("line").attr("x1",F).attr("x2",F+V).attr("y1",M(W)).attr("y2",M(W)).attr("stroke","#202124").attr("stroke-width",1.5).attr("stroke-dasharray","4 3").attr("opacity",.5)}F+=V+j})})});return}vt(t,ot(),(c,y)=>{y.innerHTML="";const u=h(y);n.forEach(o=>{const l=document.createElement("div");l.innerHTML=`<p class="cwi-chart-title">${o==="income"?"Income":"Wealth"}</p>`;const m=document.createElementNS("http://www.w3.org/2000/svg","svg");l.appendChild(m),u.appendChild(l),Ct(m,K(o,c),o,s,a)})},"Animated bars")}function Qt(t,e,r,s,n,a,h){const c=i.select(t),y=400,u=250,o={top:14,right:58,bottom:30,left:70},l=y-o.left-o.right,m=u-o.top-o.bottom,E=ot(),w=i.scaleLinear().domain(i.extent(E)).range([0,l]),[$,v]=a,f=h?$:Math.min(0,$),x=h?v:v*1.08,d=f<0,k=i.scaleLinear().domain([f,x]).range([m,0]),B=k.ticks(4);c.attr("class","cwi-svg").attr("viewBox",`0 0 ${y} ${u}`),c.selectAll("*").remove();const b=c.append("g").attr("transform",`translate(${o.left},${o.top})`);b.selectAll("line.hg").data(B).join("line").attr("class","hg").attr("x1",0).attr("x2",l).attr("y1",p=>k(p)).attr("y2",p=>k(p)).attr("stroke","#e8eaed").attr("stroke-width",.8),b.append("g").attr("transform",`translate(0,${m})`).call(i.axisBottom(w).ticks(5).tickFormat(i.format("d"))).call(p=>p.selectAll("text").attr("font-size",10)),b.append("g").call(i.axisLeft(k).tickValues(B).tickFormat(X)).call(p=>p.selectAll("text").attr("font-size",10)),d&&b.append("line").attr("x1",0).attr("x2",l).attr("y1",k(0)).attr("y2",k(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),b.selectAll(".yr-mark").data(n).join("line").attr("class","yr-mark").attr("x1",p=>w(p)).attr("x2",p=>w(p)).attr("y1",0).attr("y2",m).attr("stroke","#dee2e6").attr("stroke-width",1.5);const q=s?ut(e.pop,1,10):1.8;r.forEach((p,L)=>{const N=U(p),A=i.line().defined(j=>Number.isFinite(Y(j,e))).x(j=>w(j.year)).y(j=>k(Y(j,e)));b.append("path").datum(N).attr("fill","none").attr("stroke",e.color).attr("stroke-width",q).attr("stroke-dasharray",L===1?"5 3":null).attr("d",A)});const _=U(r[0]).at(-1);if(_){const p=Y(_,e);Number.isFinite(p)&&b.append("text").attr("x",l+4).attr("y",k(p)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(X(p))}const g=i.select("#cwi-tooltip"),T=U(r[0]),M=i.bisector(p=>p.year).left,I=b.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",m).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");b.append("rect").attr("width",l).attr("height",m).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",p=>{const[L]=i.pointer(p),N=w.invert(L),A=M(T,N),j=T[Math.max(0,A-1)],G=T[Math.min(T.length-1,A)],R=G&&Math.abs(N-G.year)<Math.abs(N-j.year)?G:j;if(!R)return;I.attr("x1",w(R.year)).attr("x2",w(R.year)).style("display",null);const D=r.map(S=>{const F=U(S).find(H=>H.year===R.year),z=F?Y(F,e):null;return`${S}: ${z!=null?X(z):"n/a"}`});g.html(`<strong style="color:${e.color}">${e.label}</strong> · ${R.year}<br>${D.join("<br>")}`).style("display","block").style("left",p.clientX+16+"px").style("top",p.clientY-50+"px")}).on("mouseleave",()=>{I.style("display","none"),g.style("display","none")})}function Zt(t,e,r,s,n){const a=U(e),h=i.select(t),c=620,y=340,u={top:20,right:110,bottom:28,left:80},o=c-u.left-u.right,l=y-u.top-u.bottom,m=a.flatMap(g=>C.map(T=>Y(g,T))).filter(Number.isFinite),E=i.min(m),w=i.max(m),$=(n==null?void 0:n.min)!=null?n.min:Math.min(0,E),v=(n==null?void 0:n.max)!=null?n.max:w*1.05,f=i.scaleLinear().domain(i.extent(a,g=>g.year)).range([0,o]),x=i.scaleLinear().domain([$,v]).range([l,0]);h.attr("class","cwi-svg").attr("viewBox",`0 0 ${c} ${y}`),h.selectAll("*").remove();const d=h.append("g").attr("transform",`translate(${u.left},${u.top})`),k=`clip-line-${e}`;h.append("defs").append("clipPath").attr("id",k).append("rect").attr("width",o).attr("height",l),d.append("g").attr("transform",`translate(0,${l})`).call(i.axisBottom(f).tickFormat(i.format("d"))),d.append("g").call(i.axisLeft(x).ticks(6).tickFormat(X)),$<0&&v>0&&d.append("line").attr("x1",0).attr("x2",o).attr("y1",x(0)).attr("y2",x(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),d.selectAll(".year-mark").data(s).join("line").attr("x1",g=>f(g)).attr("x2",g=>f(g)).attr("y1",0).attr("y2",l).attr("stroke","#f1f3f5");const B=d.append("g").attr("clip-path",`url(#${k})`);C.forEach(g=>{const T=i.line().defined(p=>Number.isFinite(Y(p,g))).x(p=>f(p.year)).y(p=>x(Y(p,g)));B.append("path").datum(a).attr("fill","none").attr("stroke",g.color).attr("stroke-width",r?ut(g.pop,1,10):2).attr("d",T);const M=a[a.length-1],I=Y(M,g);Number.isFinite(I)&&I>=$&&I<=v&&d.append("text").attr("x",o+5).attr("y",x(I)).attr("dy","0.35em").attr("font-size",10).attr("fill",g.color).text(g.label)});const b=i.select("#cwi-tooltip"),q=i.bisector(g=>g.year).left,_=d.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",l).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");d.append("rect").attr("width",o).attr("height",l).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",g=>{const[T]=i.pointer(g),M=f.invert(T),I=q(a,M),p=a[Math.max(0,I-1)],L=a[Math.min(a.length-1,I)],N=L&&Math.abs(M-L.year)<Math.abs(M-p.year)?L:p;if(!N)return;_.attr("x1",f(N.year)).attr("x2",f(N.year)).style("display",null);const A=`<strong>${N.year}</strong><br>`+C.map(j=>{const G=Y(N,j);return`<span style="color:${j.color}">${j.label}</span>: ${X(G)}`}).join("<br>");b.html(A).style("display","block").style("left",g.clientX+16+"px").style("top",g.clientY-60+"px")}).on("mouseleave",()=>{_.style("display","none"),b.style("display","none")})}function Dt(t,e,r,s,n,a){if(r==="juxtaposition"){const d=n.includes("income")?U("income"):[],k=n.includes("wealth")?U("wealth"):[],B=[...d.flatMap(M=>C.map(I=>Y(M,I))),...k.flatMap(M=>C.map(I=>Y(M,I)))].filter(Number.isFinite),b=i.min(B),q=i.max(B),_=(a==null?void 0:a.min)!=null||(a==null?void 0:a.max)!=null,g=[(a==null?void 0:a.min)!=null?a.min:b,(a==null?void 0:a.max)!=null?a.max:q];if(n.length>1){const M=document.createElement("p");M.className="cwi-note",M.textContent="Solid line = income · Dashed line = wealth. All panels share the same Y axis.",t.appendChild(M)}const T=document.createElement("div");T.className="cwi-sm-grid",t.appendChild(T),C.forEach(M=>{const I=Q(T,M.label),p=document.createElementNS("http://www.w3.org/2000/svg","svg");I.appendChild(p),Qt(p,M,n,s,e,g,_)});return}if(n.length===1){const d=Q(t,n[0]==="income"?"Income over time":"Wealth over time"),k=document.createElementNS("http://www.w3.org/2000/svg","svg");d.appendChild(k),Zt(k,n[0],s,e,a);return}const h=Q(t,"Superposed indexed lines (income solid, wealth dashed)"),c=document.createElement("div");c.className="cwi-inline-legend",c.innerHTML='<span><i style="background:#495057"></i><span>Income solid</span></span><span><i style="background:#ffffff;border:2px dashed #495057"></i><span>Wealth dashed, indexed to 100</span></span>',h.appendChild(c);const y=i.select(h).append("svg").attr("class","cwi-svg tall"),u=840,o=380,l={top:20,right:120,bottom:28,left:70},m=u-l.left-l.right,E=o-l.top-l.bottom,w=ot(),$=w.map(d=>({year:d,income:K("income",d),wealth:K("wealth",d)})),v=i.scaleLinear().domain(i.extent(w)).range([0,m]),f=i.scaleLinear().domain([0,260]).range([E,0]);y.attr("viewBox",`0 0 ${u} ${o}`);const x=y.append("g").attr("transform",`translate(${l.left},${l.top})`);x.append("g").attr("transform",`translate(0,${E})`).call(i.axisBottom(v).tickFormat(i.format("d"))),x.append("g").call(i.axisLeft(f).ticks(6).tickFormat(d=>`${Math.round(d)}%`)),C.forEach(d=>{const k=Math.abs(Y($[0].income,d))||1,B=Math.abs(Y($[0].wealth,d))||1,b=i.line().x(g=>v(g.year)).y(g=>f(Math.abs(Y(g.income,d))/k*100)),q=i.line().x(g=>v(g.year)).y(g=>f(Math.abs(Y(g.wealth,d))/B*100)),_=s?ut(d.pop,1,7):2;x.append("path").datum($).attr("fill","none").attr("stroke",d.color).attr("stroke-width",_).attr("d",b),x.append("path").datum($).attr("fill","none").attr("stroke",d.color).attr("stroke-width",_).attr("stroke-dasharray","5 4").attr("opacity",.85).attr("d",q)})}function Ot(t,e,r,s,n,a,h){const c=i.select(t),y=400,u=250,o={top:14,right:58,bottom:30,left:70},l=y-o.left-o.right,m=u-o.top-o.bottom,E=ot(),w=i.scaleLinear().domain(i.extent(E)).range([0,l]),[$,v]=a,f=h?$:Math.min(0,$),x=h?v:v*1.08,d=i.scaleLinear().domain([f,x]).range([m,0]),k=d.ticks(4);c.attr("class","cwi-svg").attr("viewBox",`0 0 ${y} ${u}`),c.selectAll("*").remove();const B=`clip-ga-${e.key}-${Math.random().toString(36).slice(2)}`;c.append("defs").append("clipPath").attr("id",B).append("rect").attr("width",l).attr("height",m);const b=c.append("g").attr("transform",`translate(${o.left},${o.top})`);b.selectAll("line.hg").data(k).join("line").attr("class","hg").attr("x1",0).attr("x2",l).attr("y1",p=>d(p)).attr("y2",p=>d(p)).attr("stroke","#e8eaed").attr("stroke-width",.8),b.append("g").attr("transform",`translate(0,${m})`).call(i.axisBottom(w).ticks(5).tickFormat(i.format("d"))).call(p=>p.selectAll("text").attr("font-size",10)),b.append("g").call(i.axisLeft(d).tickValues(k).tickFormat(X)).call(p=>p.selectAll("text").attr("font-size",10)),f<0&&x>0&&b.append("line").attr("x1",0).attr("x2",l).attr("y1",d(0)).attr("y2",d(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),b.selectAll(".yr-mark").data(n).join("line").attr("class","yr-mark").attr("x1",p=>w(p)).attr("x2",p=>w(p)).attr("y1",0).attr("y2",m).attr("stroke","#dee2e6").attr("stroke-width",1.5);const q=b.append("g").attr("clip-path",`url(#${B})`);r.forEach((p,L)=>{const N=U(p),A=i.area().x(j=>w(j.year)).y0(d(Math.max(f,Math.min(x,0)))).y1(j=>d(Math.max(f,Math.min(x,j.values[e.key]||0))));q.append("path").datum(N).attr("fill",e.color).attr("opacity",L===0?.72:.42).attr("stroke-dasharray",L===1?"5 3":null).attr("d",A)});const _=U(r[0]).at(-1);if(_){const p=_.values[e.key]||0;Number.isFinite(p)&&p>=f&&p<=x&&b.append("text").attr("x",l+4).attr("y",d(p)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(X(p))}const g=i.select("#cwi-tooltip"),T=U(r[0]),M=i.bisector(p=>p.year).left,I=b.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",m).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");b.append("rect").attr("width",l).attr("height",m).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",p=>{const[L]=i.pointer(p),N=w.invert(L),A=M(T,N),j=T[Math.max(0,A-1)],G=T[Math.min(T.length-1,A)],R=G&&Math.abs(N-G.year)<Math.abs(N-j.year)?G:j;if(!R)return;I.attr("x1",w(R.year)).attr("x2",w(R.year)).style("display",null);const D=r.map(S=>{const F=U(S).find(H=>H.year===R.year),z=F?F.values[e.key]||0:null;return`${S}: ${z!=null?X(z):"n/a"}`});g.html(`<strong style="color:${e.color}">${e.label}</strong> · ${R.year}<br>${D.join("<br>")}`).style("display","block").style("left",p.clientX+16+"px").style("top",p.clientY-50+"px")}).on("mouseleave",()=>{I.style("display","none"),g.style("display","none")})}function te(t,e,r,s,n,a){const h=o=>{let l=0;return C.map(m=>{const E=o.values[m.key]||0,w=l;return l+=E,{grp:m,y0:w,y1:l}})},c=(o,l)=>{const m=U(l),E=m[m.length-1],w=m.flatMap(S=>h(S).flatMap(F=>[F.y0,F.y1])),$=i.min(w),v=i.max(w),f=Math.min(0,$*1.05),x=v*1.05,d=(a==null?void 0:a.min)!=null?a.min:f,k=(a==null?void 0:a.max)!=null?a.max:x,B=700,b=340,q=22,g={top:20,right:s?148:112,bottom:28,left:80},T=B-g.left-g.right,M=b-g.top-g.bottom,I=i.select(o);I.attr("class","cwi-svg").attr("viewBox",`0 0 ${B} ${b}`),I.selectAll("*").remove();const p=i.scaleLinear().domain(i.extent(m,S=>S.year)).range([0,T]),L=i.scaleLinear().domain([d,k]).range([M,0]),N=`clip-area-${l}-${Math.random().toString(36).slice(2)}`;I.append("defs").append("clipPath").attr("id",N).append("rect").attr("width",T).attr("height",M);const A=I.append("g").attr("transform",`translate(${g.left},${g.top})`);A.append("g").attr("transform",`translate(0,${M})`).call(i.axisBottom(p).tickFormat(i.format("d"))),A.append("g").call(i.axisLeft(L).ticks(6).tickFormat(X)),d<0&&k>0&&A.append("line").attr("x1",0).attr("x2",T).attr("y1",L(0)).attr("y2",L(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),A.selectAll(".yr-ref").data(e).join("line").attr("x1",S=>p(S)).attr("x2",S=>p(S)).attr("y1",0).attr("y2",M).attr("stroke","#e9ecef");const j=A.append("g").attr("clip-path",`url(#${N})`);for(let S=C.length-1;S>=0;S--){const F=C[S],z=i.area().x(H=>p(H.year)).y0(H=>L(Math.max(d,Math.min(k,h(H)[S].y0)))).y1(H=>L(Math.max(d,Math.min(k,h(H)[S].y1))));j.append("path").datum(m).attr("fill",F.color).attr("opacity",.88).attr("d",z)}if(h(E).forEach(({grp:S,y0:F,y1:z})=>{const H=(F+z)/2;H>=d&&H<=k&&A.append("text").attr("x",T+5).attr("y",L(H)).attr("dy","0.35em").attr("font-size",10).attr("fill",S.color).text(S.label)}),s){const S=T+104;A.append("text").attr("x",S+q/2).attr("y",-7).attr("text-anchor","middle").attr("font-size",9).attr("fill","#6c757d").text("Pop."),A.append("text").attr("x",S+q/2).attr("y",M+13).attr("text-anchor","middle").attr("font-size",7).attr("fill","#adb5bd").text("scroll↕zoom");const F=i.sum(C,W=>W.pop);let z=0;const H=C.map(W=>{const rt=z;return z+=W.pop,{gr:W,start:rt,end:z}});let V=0,J=F;const Z=.002,at=`clip-popbar-${Math.random().toString(36).slice(2)}`;I.select("defs").append("clipPath").attr("id",at).append("rect").attr("x",S-1).attr("y",0).attr("width",q+2).attr("height",M);const O=A.append("g").attr("clip-path",`url(#${at})`),st=()=>{O.selectAll("*").remove();const W=J-V;H.forEach(({gr:rt,start:mt,end:bt})=>{const lt=Math.max(mt,V),tt=Math.min(bt,J);if(tt<=lt)return;const et=(lt-V)/W*M,ht=Math.max(1,(tt-lt)/W*M);O.append("rect").attr("x",S).attr("y",et).attr("width",q).attr("height",ht).attr("rx",2).attr("fill",rt.color).attr("opacity",.9),ht>=10&&O.append("text").attr("x",S+q/2).attr("y",et+ht/2).attr("dy","0.35em").attr("text-anchor","middle").attr("font-size",Math.min(8,ht*.45)).attr("fill","#fff").attr("pointer-events","none").text(`${rt.pop}%`)})};st(),A.append("rect").attr("x",S-4).attr("y",0).attr("width",q+8).attr("height",M).attr("fill","none").style("pointer-events","all").style("cursor","ns-resize").on("wheel",W=>{W.preventDefault();const[,rt]=i.pointer(W),mt=V+rt/M*(J-V),bt=W.deltaY>0?1.35:.74;let lt=Math.max(Z,Math.min(F,(J-V)*bt)),tt=mt-(mt-V)/(J-V)*lt,et=tt+lt;tt<0&&(et-=tt,tt=0),et>F&&(tt-=et-F,et=F),V=Math.max(0,tt),J=Math.min(F,et),st()})}const G=i.select("#cwi-tooltip"),R=i.bisector(S=>S.year).left,D=A.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",M).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");A.append("rect").attr("width",T).attr("height",M).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",S=>{const[F]=i.pointer(S),z=p.invert(F),H=R(m,z),V=m[Math.max(0,H-1)],J=m[Math.min(m.length-1,H)],Z=J&&Math.abs(z-J.year)<Math.abs(z-V.year)?J:V;if(!Z)return;D.attr("x1",p(Z.year)).attr("x2",p(Z.year)).style("display",null);const at=`<strong>${Z.year}</strong><br>`+C.map(O=>{const st=Z.values[O.key]||0;return`<span style="color:${O.color}">${O.label}</span>: ${X(st)}`}).join("<br>");G.html(at).style("display","block").style("left",S.clientX+16+"px").style("top",S.clientY-60+"px")}).on("mouseleave",()=>{D.style("display","none"),G.style("display","none")})};if(r==="juxtaposition"){const o=n.flatMap(v=>U(v).flatMap(f=>C.map(x=>f.values[x.key]||0))).filter(Number.isFinite),l=i.min(o),m=i.max(o),E=(a==null?void 0:a.max)!=null,w=[Math.min(0,l),(a==null?void 0:a.max)!=null?a.max:m];if(n.length>1){const v=document.createElement("p");v.className="cwi-note",v.textContent="Solid fill = income · Translucent dashed fill = wealth. All panels share the same Y axis.",t.appendChild(v)}const $=document.createElement("div");$.className="cwi-sm-grid",t.appendChild($),C.forEach(v=>{const f=Q($,v.label),x=document.createElementNS("http://www.w3.org/2000/svg","svg");f.appendChild(x),Ot(x,v,n,s,e,w,E)});return}const u=(o=>{if(n.length===1)return o;const l=document.createElement("div");return l.className="cwi-grid-2",o.appendChild(l),l})(t);n.forEach(o=>{const m=Q(u,o==="income"?"Average pre-tax income per person (SEK, linear scale, gray = Middle 40%)":"Average net wealth per person (SEK, linear scale, gray = Middle 40%, below 0 = net debt)"),E=document.createElementNS("http://www.w3.org/2000/svg","svg");m.appendChild(E),c(E,o)})}function Ft(t){const e=K("income",t),r=i.sum(Gt,s=>Math.max(0,e.totals[s]||0));return C.map(s=>{const n=Math.max(0,e.totals[s.key]||0);return r>0?n/r*100:0})}function zt(t,e,r,s,n,a,h){e.forEach(u=>{t.append("rect").attr("x",u.x).attr("y",u.y).attr("width",r).attr("height",s).attr("rx",3).attr("fill",h)});let c=0;n.map((u,o)=>{const l={start:c,end:c+u,color:a[o]};return c+=u,l}).forEach(u=>{e.forEach(o=>{const l=Math.max(o.i,u.start),m=Math.min(o.i+1,u.end);if(m<=l+.001)return;const E=l-o.i,w=m-o.i,$=w-E>=.999,v=o.y+s*(1-w),f=Math.max(1,s*(w-E));t.append("rect").attr("x",o.x).attr("y",v).attr("width",r).attr("height",f).attr("rx",$?3:1).attr("fill",u.color)})})}function Bt(t,e,r){const s=i.select(t),n=250,a=r?290:240,h=20,c=Ft(e);s.attr("class","cwi-svg").attr("viewBox",`0 0 ${n} ${a}`),s.selectAll("*").remove();const y=i.range(100).map(o=>({i:o,x:15+o%10*22,y:15+(9-Math.floor(o/10))*22})),u=s.append("g");if(zt(u,y,h,h,c,C.map(o=>o.color),"#eef1ea"),r){const o=[...C.map(w=>w.pop),40],l=[...C.map(w=>w.color),"#dee2e6"],m=Wt(o);let E=0;s.append("text").attr("x",15).attr("y",255).attr("font-size",10).attr("fill","#5f6368").text("Population strip (gray = Middle 40%)"),m.forEach((w,$)=>{for(let v=0;v<w;v+=1)s.append("rect").attr("x",15+E*2.05).attr("y",265).attr("width",1.8).attr("height",10).attr("rx",1).attr("fill",l[$]).attr("opacity",.75),E+=1})}}function ee(t,e,r,s){const n=document.createElement("div");if(n.className="cwi-note",n.textContent="Income waffle shares: population share × average income for each disjoint group. Wealth excluded (negative values).",t.appendChild(n),r==="juxtaposition"){C.forEach((a,h)=>{const c=document.createElement("div");c.style.cssText="margin-bottom:1.2rem;";const y=document.createElement("h4");y.textContent=a.label,y.style.cssText=`font-size:0.95rem;font-weight:700;color:${a.color};margin:0 0 0.4rem;`,c.appendChild(y);const u=document.createElement("div");u.style.cssText="display:flex;flex-wrap:wrap;gap:0.6rem;",e.forEach(o=>{const l=Q(u,String(o));l.style.minWidth="170px";const E=Ft(o)[h],w=i.select(l).append("svg").attr("class","cwi-svg").attr("viewBox","0 0 240 240"),$=i.range(100).map(x=>({i:x,x:10+x%10*22,y:10+(9-Math.floor(x/10))*22})),v=w.append("g");zt(v,$,20,20,[E],[a.color],"#e9ecef");const f=document.createElement("p");f.textContent=`${E.toFixed(2)}%`,f.style.cssText="text-align:center;font-size:0.8rem;color:#5f6368;margin:0.2rem 0 0;",l.appendChild(f)}),c.appendChild(u),t.appendChild(c)});return}if(r==="superposition"){const a=document.createElement("div");a.className="cwi-years-grid";const h=document.createElement("div");h.className="cwi-inline-legend",h.style.marginBottom="0.6rem",C.forEach(c=>{const y=document.createElement("span");y.innerHTML=`<i style="background:${c.color}"></i><span>${c.label}</span>`,h.appendChild(y)}),t.appendChild(h),t.appendChild(a),e.forEach(c=>{const y=Q(a,String(c)),u=document.createElementNS("http://www.w3.org/2000/svg","svg");y.appendChild(u),Bt(u,c,s)});return}vt(t,ot(),(a,h)=>{h.innerHTML="";const c=document.createElementNS("http://www.w3.org/2000/svg","svg");h.appendChild(c),Bt(c,a,s)},"Animated income waffle")}function ae(){Xt();const t=document.getElementById("cwi-years-input"),e=document.getElementById("cwi-representation"),r=document.getElementById("cwi-comparison"),s=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),a=document.getElementById("cwi-render-root");if(!t||!e||!r||!s||!n||!a)return;const h=document.getElementById("cwi-yview"),c=document.getElementById("cwi-ymax-slider"),y=document.getElementById("cwi-ymax-val"),u=document.getElementById("cwi-yview-reset");let o={min:null,max:null},l=1;const m=x=>{const d=x.flatMap(k=>U(k).flatMap(B=>C.map(b=>B.values[b.key]||0))).filter(Number.isFinite);return i.max(d)},E=x=>{const d=Math.max(5,Math.log10(Math.abs(l))-4.5),k=Math.log10(Math.abs(l));return Math.pow(10,d+(k-d)*x/1e3)},w=x=>{const d=Math.max(5,Math.log10(Math.abs(l))-4.5),k=Math.log10(Math.abs(l));return Math.max(0,Math.min(1e3,Math.round((Math.log10(Math.max(x,1))-d)/(k-d)*1e3)))},$=()=>{const x=o.max!=null?o.max:l;y.textContent=X(x)},v=()=>{const x=o.max!=null?o.max:l;c.value=w(x),$()};c.addEventListener("input",()=>{o.max=E(Number(c.value)),$(),f()}),u.addEventListener("click",()=>{o={min:null,max:null},v(),f()});const f=()=>{nt&&(clearInterval(nt),nt=null);const x=Kt(t.value),d=e.value,k=n.value==="with";s.disabled=d==="waffle",d==="waffle"&&(s.value="income");const B=s.value==="both"?["income","wealth"]:[s.value];Array.from(r.options).forEach(q=>{q.disabled=(d==="line"||d==="stacked")&&q.value==="animation"}),(d==="line"||d==="stacked")&&r.value==="animation"&&(r.value="juxtaposition");const b=r.value;d==="line"||d==="bar"||d==="stacked"?(h.classList.remove("hidden"),l=m(B),v()):(h.classList.add("hidden"),o={min:null,max:null}),a.innerHTML="",d==="table"&&Ut(a,x,b,k,B),d==="bar"&&Jt(a,x,b,k,B,o),d==="line"&&Dt(a,x,b,k,B,o),d==="stacked"&&te(a,x,b,k,B,o),d==="waffle"&&ee(a,x,b,k)};e.addEventListener("change",f),r.addEventListener("change",f),s.addEventListener("change",f),n.addEventListener("change",f),t.addEventListener("change",f),t.addEventListener("blur",f),f()}const Mt="1.0",qt="wealth-study-data",pt=[{id:"consent",type:"info",title:"Participant Information & Consent",content:`
      <p>You are invited to participate in a user study conducted as part of a Master's thesis at Linköping University.</p>
      <p><strong>What you will do:</strong> Interact with the visualization tool and answer a short question.</p>
      <p><strong>Data:</strong> Your responses are stored locally in your browser. No personal data is collected.</p>
      <p><strong>Participation is voluntary.</strong> You may close this window at any time.</p>
      <label class="consent-check">
        <input type="checkbox" id="consent-checkbox" />
        I have read the information above and agree to participate.
      </label>`,nextLabel:"Start",requireConsent:!0},{id:"task_test",type:"task",phase:"Task 1 of 1",vizConfig:{representation:"bar",comparison:"juxtaposition",metric:"wealth",popEncoding:"without",years:"1980,1990,2000,2010,2020,2024"},taskText:"test",questionText:"test",options:[{label:"a test",value:"a"},{label:"b test",value:"b"},{label:"c test",value:"c"},{label:"d test",value:"d"}]},{id:"complete",type:"complete",title:"Thank you!",content:"<p>Your response has been recorded.</p>"}],P={currentStep:0,startTime:Date.now(),stepTimes:{},answers:{},participantId:Math.random().toString(36).slice(2,9)};function ne(t){const e=document.getElementById("cwi-representation"),r=document.getElementById("cwi-comparison"),s=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),a=document.getElementById("cwi-years-input");e&&(t.representation&&(e.value=t.representation),t.years&&(a.value=t.years,a.dispatchEvent(new Event("change"))),t.metric&&(s.value=t.metric),t.comparison&&(r.value=t.comparison),t.popEncoding&&(n.value=t.popEncoding),e.dispatchEvent(new Event("change")))}function jt(t,e,r={}){P.answers[t]={value:e,timestamp:Date.now(),elapsed:Date.now()-(P.stepTimes[t]||P.startTime),...r},localStorage.setItem(qt,JSON.stringify({state:P,version:Mt}))}function oe(){pt.find(n=>n.id==="pre_q1");const t={participantId:P.participantId,studyVersion:Mt,startTime:new Date(P.startTime).toISOString(),completedTime:new Date().toISOString(),answers:P.answers,summary:Pt()},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(e),s=document.createElement("a");s.href=r,s.download=`study-${P.participantId}.json`,s.click(),URL.revokeObjectURL(r)}function Pt(){var t;return{taskTestAnswer:((t=P.answers.task_test)==null?void 0:t.value)??"—"}}function $t(){const t=pt[P.currentStep];P.stepTimes[t.id]=Date.now();const e=document.getElementById("study-overlay"),r=document.getElementById("study-panel"),s=document.getElementById("study-task-banner");t.type==="task"?(e.classList.add("hidden"),s.classList.remove("hidden"),ne(t.vizConfig),le(t,s)):(s.classList.add("hidden"),e.classList.remove("hidden"),t.type==="info"&&se(t,r),t.type==="question"&&re(t,r),t.type==="complete"&&ie(t,r)),ce()}function se(t,e){var r,s;if(e.innerHTML=`
    <div class="study-phase-tag">Information</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-nav">
      ${P.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${t.requireConsent?"disabled":""}>${t.nextLabel||"Next →"}</button>
    </div>`,t.requireConsent){const n=e.querySelector("#consent-checkbox"),a=e.querySelector("#study-next");n.addEventListener("change",()=>{a.disabled=!n.checked})}(r=e.querySelector("#study-next"))==null||r.addEventListener("click",Et),(s=e.querySelector("#study-prev"))==null||s.addEventListener("click",St)}function re(t,e){var s,n;const r=(s=P.answers[t.id])==null?void 0:s.value;e.innerHTML=`
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
      ${P.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${r?"":"disabled"}>Next →</button>
    </div>`,e.querySelectorAll(".study-option").forEach(a=>{a.addEventListener("click",()=>{e.querySelectorAll(".study-option").forEach(c=>c.classList.remove("selected")),a.classList.add("selected");const h=a.querySelector("input").value;jt(t.id,h),e.querySelector("#study-next").disabled=!1})}),e.querySelector("#study-next").addEventListener("click",Et),(n=e.querySelector("#study-prev"))==null||n.addEventListener("click",St)}let xt="description";function le(t,e){xt="description",e.innerHTML=gt(t),wt(t,e)}function gt(t){var r;const e=(r=P.answers[t.id])==null?void 0:r.value;return xt==="description"?`
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
    </div>`}function wt(t,e){var r,s,n,a,h;(r=e.querySelector("#task-back"))==null||r.addEventListener("click",()=>{St()}),(s=e.querySelector("#task-ready"))==null||s.addEventListener("click",()=>{xt="question",e.innerHTML=gt(t),wt(t,e)}),(n=e.querySelector("#task-back-q"))==null||n.addEventListener("click",()=>{xt="description",e.innerHTML=gt(t),wt(t,e)}),e.querySelectorAll(".task-option").forEach(c=>{c.addEventListener("click",()=>{e.querySelectorAll(".task-option").forEach(u=>u.classList.remove("selected")),c.classList.add("selected");const y=c.querySelector("input").value;jt(t.id,y),e.querySelector("#task-submit").disabled=!1})}),(a=e.querySelector("#task-submit"))==null||a.addEventListener("click",Et),(h=e.querySelector("#task-close-btn"))==null||h.addEventListener("click",Lt)}function ie(t,e){const r=Pt();e.innerHTML=`
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
    </div>`,e.querySelector("#study-download").addEventListener("click",oe),e.querySelector("#study-close-complete").addEventListener("click",Lt)}function ce(){const t=document.getElementById("study-progress-bar"),e=document.getElementById("study-progress-label"),r=pt.length-1,s=Math.round(P.currentStep/r*100);t&&(t.style.width=s+"%"),e&&(e.textContent=`Step ${P.currentStep+1} of ${pt.length}`)}function Et(){P.currentStep<pt.length-1&&(P.currentStep++,$t())}function St(){P.currentStep>0&&(P.currentStep--,$t())}function de(){pe(),ue();try{const t=localStorage.getItem(qt);if(t){const e=JSON.parse(t);e.version===Mt&&e.state&&Object.assign(P,e.state)}}catch{}document.getElementById("study-launch-btn").addEventListener("click",()=>{document.getElementById("study-launcher").classList.add("hidden"),document.getElementById("study-overlay").classList.remove("hidden"),$t()}),document.getElementById("study-close-btn").addEventListener("click",Lt)}function Lt(){document.getElementById("study-overlay").classList.add("hidden"),document.getElementById("study-task-banner").classList.add("hidden"),document.getElementById("study-progress-container").classList.add("hidden"),document.getElementById("study-launcher").classList.remove("hidden"),P.currentStep=0}function pe(){document.body.insertAdjacentHTML("beforeend",`
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
  `),new MutationObserver(()=>{const e=document.getElementById("study-overlay"),r=document.getElementById("study-task-banner"),s=document.getElementById("study-progress-container");e.classList.contains("hidden")&&r.classList.contains("hidden")&&P.currentStep===0?s.classList.add("hidden"):s.classList.remove("hidden")}).observe(document.getElementById("study-overlay"),{attributes:!0})}function ue(){const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t)}de();
