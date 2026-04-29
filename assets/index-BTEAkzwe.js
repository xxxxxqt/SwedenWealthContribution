(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const h of a.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const i=window.d3;function Nt(t){const e=t.map(Math.floor);let s=100-i.sum(e);const o=t.map((n,a)=>({i:a,frac:n-Math.floor(n)})).sort((n,a)=>a.frac-n.frac);for(let n=0;n<o.length&&s>0;n+=1)e[o[n].i]+=1,s-=1;return e}const Et=[{key:"bottom50",label:"Bottom 50%",color:"#4dabf7",pop:50},{key:"top10",label:"Top 10%",color:"#fcc419",pop:10},{key:"top1",label:"Top 1%",color:"#ff8787",pop:1},{key:"top01",label:"Top 0.1%",color:"#e599f7",pop:.1},{key:"top001",label:"Top 0.01%",color:"#ff6b6b",pop:.01},{key:"top0001",label:"Top 0.001%",color:"#c92a2a",pop:.001}];i.scaleSqrt().domain([.001,50]).range([.6,6]);let ot=[];async function Ft(){const e=(await i.text("./data/wealth_avg.csv")).split(`
`),s=e[0].split(","),o={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};ot=[];for(let n=1;n<e.length;n++){const a=e[n].split(",");if(a.length<s.length)continue;const h=Number(a[0]);if(!Number.isFinite(h))continue;const p={year:h};let m=!0;for(let c=1;c<s.length;c++){const r=o[s[c].trim()];if(!r)continue;const l=Number(a[c]);if(!Number.isFinite(l)){m=!1;break}p[r]=l}m&&p.bottom50!==void 0&&ot.push(p)}ot.sort((n,a)=>n.year-a.year),new Map(ot.map(n=>[n.year,n]))}let st=[];async function At(){const e=(await i.text("./data/income_avg.csv")).split(`
`),s=e[0].split(","),o={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};st=[];for(let n=1;n<e.length;n++){const a=e[n].split(",");if(a.length<2)continue;const h=Number(a[0]);if(!Number.isFinite(h))continue;const p={year:h};for(let m=1;m<s.length;m++){const c=o[s[m].trim()];c&&(p[c]=Number(a[m])||0)}p.bottom50!==void 0&&st.push(p)}st.sort((n,a)=>n.year-a.year),new Map(st.map(n=>[n.year,n]))}function qt(t){const e=Math.abs(t);return e>=1e9?(t/1e9).toFixed(1)+"B":e>=1e6?(t/1e6).toFixed(1)+"M":e>=1e3?(t/1e3).toFixed(0)+"K":t.toFixed(0)}function kt(t){return t>=1?`${t}%`:t>=.1?`${t.toFixed(1)}%`:t>=.01?`${t.toFixed(2)}%`:`${t.toFixed(3)}%`}function H(t){const e=Math.abs(t);return e>=1e9?`${(t/1e9).toFixed(e>=1e10?0:1)}B`:e>=1e6?`${(t/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(t/1e3).toFixed(e>=1e5?0:1)}K`:`${Math.round(t)}`}Et.filter(t=>["top0001","top001"].includes(t.key));Et.filter(t=>!["top0001","top001"].includes(t.key));i.scaleSqrt().domain([.001,50]).range([.6,6]);async function zt(){await Promise.all([Ft(),At()]),Jt()}zt();const jt=[1980,1990,2e3,2010,2020,2024],C=[{key:"bottom50",label:"Bottom 50%",pop:50,color:"#4dabf7"},{key:"top9",label:"Top 9%",pop:9,color:"#ffd43b"},{key:"top0_9",label:"Top 0.9%",pop:.9,color:"#ff922b"},{key:"top0_09",label:"Top 0.09%",pop:.09,color:"#f06595"},{key:"top0_009",label:"Top 0.009%",pop:.009,color:"#e64980"},{key:"top0_001",label:"Top 0.001%",pop:.001,color:"#c92a2a"}],Wt=["bottom50","middle40","top9","top0_9","top0_09","top0_009","top0_001"];function at(t,e,s){const o=Math.log10(.001),n=Math.log10(50),a=(Math.log10(Math.max(t,1e-4))-o)/(n-o);return e+a*(s-e)}let rt=[],ct=[],St=new Map,ht=new Map,tt=null;function vt(t){if(!t)return null;const e={bottom50:t.bottom50*50,middle40:t.mid40*40,top10:t.top10*10,top1:t.top1*1,top01:t.top01*.1,top001:t.top001*.01,top0001:t.top0001*.001};return{year:t.year,values:{bottom50:t.bottom50,middle40:t.mid40,top9:(e.top10-e.top1)/9,top0_9:(e.top1-e.top01)/.9,top0_09:(e.top01-e.top001)/.09,top0_009:(e.top001-e.top0001)/.009,top0_001:t.top0001},totals:{bottom50:e.bottom50,middle40:e.middle40,top9:e.top10-e.top1,top0_9:e.top1-e.top01,top0_09:e.top01-e.top001,top0_009:e.top001-e.top0001,top0_001:e.top0001}}}function Pt(){rt.length&&ct.length||(rt=st.map(vt).filter(Boolean),ct=ot.map(vt).filter(Boolean),St=new Map(rt.map(t=>[t.year,t])),ht=new Map(ct.map(t=>[t.year,t])))}function et(){return rt.map(t=>t.year).filter(t=>ht.has(t))}function _t(t){var o;const e=new Set(et()),s=Array.from(new Set(((o=String(t).match(/\d{4}/g))==null?void 0:o.map(Number))||[])).filter(n=>e.has(n)).sort((n,a)=>n-a);return s.length?s:jt.filter(n=>e.has(n))}function V(t,e){return(t==="income"?St:ht).get(e)}function G(t){return t==="income"?rt:ct}function W(t,e,s){return t.values[e.key]}function it(t){return`${qt(t)} SEK`}function U(t,e){const s=document.createElement("div");if(s.className="cwi-card",e){const o=document.createElement("h3");o.textContent=e,s.appendChild(o)}return t.appendChild(s),s}function yt(t,e,s,o){const n=document.createElement("div");n.className="cwi-anim-bar",n.innerHTML=`<button type="button" id="cwi-matrix-play">Play</button><input type="range" id="cwi-matrix-year" min="0" max="${e.length-1}" step="1" value="0"><span id="cwi-matrix-year-label">${e[0]}</span>`,t.appendChild(n);const a=U(t,o),h=document.createElement("div");a.appendChild(h);const p=n.querySelector("#cwi-matrix-year"),m=n.querySelector("#cwi-matrix-play"),c=n.querySelector("#cwi-matrix-year-label"),r=l=>{const y=e[l];c.textContent=String(y),s(y,h)};p.addEventListener("input",()=>r(Number(p.value))),m.addEventListener("click",()=>{if(tt){clearInterval(tt),tt=null,m.textContent="Play";return}m.textContent="Pause",tt=setInterval(()=>{const l=(Number(p.value)+1)%e.length;p.value=String(l),r(l)},900)}),r(0)}function Ht(t,e,s,o,n){const a=n.includes("income"),h=n.includes("wealth"),p=`${a?"<th>Income</th>":""}${h?"<th>Wealth</th>":""}`,m=(c,r,l)=>{const y=o?`<td>${kt(c.pop)}</td>`:"",$=a?`<td>${it(r.values[c.key])}</td>`:"",w=h?`<td>${it(l.values[c.key])}</td>`:"";return`<tr><td>${c.label}</td>${y}${$}${w}</tr>`};if(s==="juxtaposition"){const c=document.createElement("div");c.className="cwi-years-grid",t.appendChild(c),e.forEach(r=>{const l=U(c,String(r)),y=document.createElement("table");y.className="cwi-table",y.innerHTML=`<thead><tr><th>Group</th>${o?"<th>Pop.</th>":""}${p}</tr></thead><tbody>${C.map($=>m($,V("income",r),V("wealth",r))).join("")}</tbody>`,l.appendChild(y)});return}if(s==="superposition"){const c=U(t,"Combined table across selected years"),r=document.createElement("table");r.className="cwi-table";const l=n.length,y=`<tr><th rowspan="2">Group</th>${o?'<th rowspan="2">Pop.</th>':""}${e.map(k=>`<th colspan="${l}">${k}</th>`).join("")}</tr>`,$=`<tr>${e.map(()=>`${a?"<th>Income</th>":""}${h?"<th>Wealth</th>":""}`).join("")}</tr>`,w=C.map(k=>{const M=e.map(f=>{const g=V("income",f),d=V("wealth",f);return`${a?`<td>${it(g.values[k.key])}</td>`:""}${h?`<td>${it(d.values[k.key])}</td>`:""}`}).join("");return`<tr><td>${k.label}</td>${o?`<td>${kt(k.pop)}</td>`:""}${M}</tr>`}).join("");r.innerHTML=`<thead>${y}${$}</thead><tbody>${w}</tbody>`,c.appendChild(r);return}yt(t,et(),(c,r)=>{r.innerHTML="";const l=document.createElement("table");l.className="cwi-table",l.innerHTML=`<thead><tr><th>Group</th>${o?"<th>Pop.</th>":""}${p}</tr></thead><tbody>${C.map(y=>m(y,V("income",c),V("wealth",c))).join("")}</tbody>`,r.appendChild(l)},"Animated table")}function Mt(t,e,s,o,n){const a=i.select(t),h=520,p=310,m={top:18,right:16,bottom:28,left:120},c=h-m.left-m.right,r=p-m.top-m.bottom,l=C.map(x=>W(e,x)),y=i.min(l),$=i.max(l),w=(n==null?void 0:n.min)!=null?n.min:Math.min(0,y),k=(n==null?void 0:n.max)!=null?n.max:$*1.05,M=i.scaleLinear().domain([w,k]).range([0,c]),f=r/C.length;a.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${p}`),a.selectAll("*").remove();const g=`clip-hbar-${s}-${Math.random().toString(36).slice(2)}`;a.append("defs").append("clipPath").attr("id",g).append("rect").attr("width",c).attr("height",r);const d=a.append("g").attr("transform",`translate(${m.left},${m.top})`);if(d.append("g").attr("transform",`translate(0,${r})`).call(i.axisBottom(M).ticks(5).tickFormat(H)),w<0||k>0){const x=M(Math.max(w,Math.min(0,k)));d.append("line").attr("x1",x).attr("x2",x).attr("y1",0).attr("y2",r).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3")}const v=i.select("#cwi-tooltip"),N=d.append("g").attr("clip-path",`url(#${g})`);C.forEach((x,j)=>{const A=W(e,x),b=o?at(x.pop,f*.18,f*.82):f*.7,T=j*f+f/2,S=T-b/2,I=M(Math.max(w,Math.min(0,A))),u=M(Math.min(k,Math.max(0,A)));d.append("text").attr("x",-10).attr("y",T).attr("dy","0.35em").attr("text-anchor","end").attr("font-size",10).text(x.label),N.append("rect").attr("x",Math.min(I,u)).attr("y",S).attr("width",Math.max(2,Math.abs(u-I))).attr("height",b).attr("rx",3).attr("fill",x.color).style("cursor","crosshair").on("mouseover",B=>{v.html(`<strong style="color:${x.color}">${x.label}</strong><br>${H(A)}`).style("display","block").style("left",B.clientX+14+"px").style("top",B.clientY-36+"px")}).on("mousemove",B=>{v.style("left",B.clientX+14+"px").style("top",B.clientY-36+"px")}).on("mouseleave",()=>v.style("display","none"))})}function Yt(t,e,s,o,n,a){const h=p=>{if(n.length===1)return p;const m=document.createElement("div");return m.className="cwi-grid-2",p.appendChild(m),m};if(s==="juxtaposition"){const p=document.createElement("div");p.className="cwi-years-grid",t.appendChild(p),e.forEach(m=>{const c=U(p,String(m)),r=h(c);n.forEach(l=>{const y=document.createElement("div");y.innerHTML=`<p class="cwi-chart-title">${l==="income"?"Income":"Wealth"}</p>`;const $=document.createElementNS("http://www.w3.org/2000/svg","svg");y.appendChild($),r.appendChild(y),Mt($,V(l,m),l,o,a)})});return}if(s==="superposition"){const p=h(t);n.forEach(m=>{const r=U(p,m==="income"?"Income by year — SEK  (dashed = baseline year)":"Wealth by year — SEK  (dashed = baseline year)"),l=(B,L)=>B?W(B,L):0,y=V(m,e[0]),$=e.flatMap(B=>C.map(L=>l(V(m,B),L))),w=i.max($.map(Math.abs)),k=Math.min(0,i.min($)),M=(a==null?void 0:a.min)!=null?a.min:k*1.1,f=(a==null?void 0:a.max)!=null?a.max:w*1.1,g=700,d=360,v={top:24,right:16,bottom:44,left:78},N=g-v.left-v.right,x=d-v.top-v.bottom,j=i.select(r).append("svg").attr("class","cwi-svg").attr("viewBox",`0 0 ${g} ${d}`),A=`clip-vbar-${m}-${Math.random().toString(36).slice(2)}`;j.append("defs").append("clipPath").attr("id",A).append("rect").attr("width",N).attr("height",x);const b=j.append("g").attr("transform",`translate(${v.left},${v.top})`),T=i.scaleBand().domain(e).range([0,N]).paddingInner(.2),S=i.scaleLinear().domain([M,f]).range([x,0]);b.append("g").attr("transform",`translate(0,${x})`).call(i.axisBottom(T).tickFormat(i.format("d"))),b.append("g").call(i.axisLeft(S).ticks(6).tickFormat(H)),M<0&&f>0&&b.append("line").attr("x1",0).attr("x2",N).attr("y1",S(0)).attr("y2",S(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3");const I=i.select("#cwi-tooltip"),u=b.append("g").attr("clip-path",`url(#${A})`);e.forEach(B=>{const L=V(m,B);if(!L)return;const Y=T.bandwidth(),q=2,R=C.length,P=Y-q*R,D=C.map(F=>at(F.pop,.1,1)),J=i.sum(D);let E=T(B);C.forEach((F,_)=>{const Q=Math.max(o?D[_]/J*P:P/R,3),Z=l(L,F),O=Math.max(M,Math.min(f,Z)),X=Math.max(M,Math.min(f,0)),pt=S(Math.max(O,X)),nt=Math.max(1,Math.abs(S(O)-S(X)));if(u.append("rect").attr("x",E).attr("y",pt).attr("width",Q).attr("height",nt).attr("fill",F.color).attr("rx",2).attr("opacity",.85).style("cursor","crosshair").on("mouseover",K=>{I.html(`<strong style="color:${F.color}">${F.label}</strong><br>${B}<br>${H(Z)}`).style("display","block").style("left",K.clientX+14+"px").style("top",K.clientY-36+"px")}).on("mousemove",K=>{I.style("left",K.clientX+14+"px").style("top",K.clientY-36+"px")}).on("mouseleave",()=>I.style("display","none")),y&&B!==e[0]){const K=l(y,F);K>=M&&K<=f&&b.append("line").attr("x1",E).attr("x2",E+Q).attr("y1",S(K)).attr("y2",S(K)).attr("stroke","#202124").attr("stroke-width",1.5).attr("stroke-dasharray","4 3").attr("opacity",.5)}E+=Q+q})})});return}yt(t,et(),(p,m)=>{m.innerHTML="";const c=h(m);n.forEach(r=>{const l=document.createElement("div");l.innerHTML=`<p class="cwi-chart-title">${r==="income"?"Income":"Wealth"}</p>`;const y=document.createElementNS("http://www.w3.org/2000/svg","svg");l.appendChild(y),c.appendChild(l),Mt(y,V(r,p),r,o,a)})},"Animated bars")}function Rt(t,e,s,o,n,a,h){const p=i.select(t),m=400,c=250,r={top:14,right:58,bottom:30,left:70},l=m-r.left-r.right,y=c-r.top-r.bottom,$=et(),w=i.scaleLinear().domain(i.extent($)).range([0,l]),[k,M]=a,f=h?k:Math.min(0,k),g=h?M:M*1.08,d=f<0,v=i.scaleLinear().domain([f,g]).range([y,0]),N=v.ticks(4);p.attr("class","cwi-svg").attr("viewBox",`0 0 ${m} ${c}`),p.selectAll("*").remove();const x=p.append("g").attr("transform",`translate(${r.left},${r.top})`);x.selectAll("line.hg").data(N).join("line").attr("class","hg").attr("x1",0).attr("x2",l).attr("y1",u=>v(u)).attr("y2",u=>v(u)).attr("stroke","#e8eaed").attr("stroke-width",.8),x.append("g").attr("transform",`translate(0,${y})`).call(i.axisBottom(w).ticks(5).tickFormat(i.format("d"))).call(u=>u.selectAll("text").attr("font-size",10)),x.append("g").call(i.axisLeft(v).tickValues(N).tickFormat(H)).call(u=>u.selectAll("text").attr("font-size",10)),d&&x.append("line").attr("x1",0).attr("x2",l).attr("y1",v(0)).attr("y2",v(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),x.selectAll(".yr-mark").data(n).join("line").attr("class","yr-mark").attr("x1",u=>w(u)).attr("x2",u=>w(u)).attr("y1",0).attr("y2",y).attr("stroke","#dee2e6").attr("stroke-width",1.5);const j=o?at(e.pop,1,10):1.8;s.forEach((u,B)=>{const L=G(u),Y=i.line().defined(q=>Number.isFinite(W(q,e))).x(q=>w(q.year)).y(q=>v(W(q,e)));x.append("path").datum(L).attr("fill","none").attr("stroke",e.color).attr("stroke-width",j).attr("stroke-dasharray",B===1?"5 3":null).attr("d",Y)});const A=G(s[0]).at(-1);if(A){const u=W(A,e);Number.isFinite(u)&&x.append("text").attr("x",l+4).attr("y",v(u)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(H(u))}const b=i.select("#cwi-tooltip"),T=G(s[0]),S=i.bisector(u=>u.year).left,I=x.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",y).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");x.append("rect").attr("width",l).attr("height",y).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",u=>{const[B]=i.pointer(u),L=w.invert(B),Y=S(T,L),q=T[Math.max(0,Y-1)],R=T[Math.min(T.length-1,Y)],P=R&&Math.abs(L-R.year)<Math.abs(L-q.year)?R:q;if(!P)return;I.attr("x1",w(P.year)).attr("x2",w(P.year)).style("display",null);const D=s.map(J=>{const E=G(J).find(_=>_.year===P.year),F=E?W(E,e):null;return`${J}: ${F!=null?H(F):"n/a"}`});b.html(`<strong style="color:${e.color}">${e.label}</strong> · ${P.year}<br>${D.join("<br>")}`).style("display","block").style("left",u.clientX+16+"px").style("top",u.clientY-50+"px")}).on("mouseleave",()=>{I.style("display","none"),b.style("display","none")})}function Vt(t,e,s,o,n){const a=G(e),h=i.select(t),p=620,m=340,c={top:20,right:110,bottom:28,left:80},r=p-c.left-c.right,l=m-c.top-c.bottom,y=a.flatMap(b=>C.map(T=>W(b,T))).filter(Number.isFinite),$=i.min(y),w=i.max(y),k=(n==null?void 0:n.min)!=null?n.min:Math.min(0,$),M=(n==null?void 0:n.max)!=null?n.max:w*1.05,f=i.scaleLinear().domain(i.extent(a,b=>b.year)).range([0,r]),g=i.scaleLinear().domain([k,M]).range([l,0]);h.attr("class","cwi-svg").attr("viewBox",`0 0 ${p} ${m}`),h.selectAll("*").remove();const d=h.append("g").attr("transform",`translate(${c.left},${c.top})`),v=`clip-line-${e}`;h.append("defs").append("clipPath").attr("id",v).append("rect").attr("width",r).attr("height",l),d.append("g").attr("transform",`translate(0,${l})`).call(i.axisBottom(f).tickFormat(i.format("d"))),d.append("g").call(i.axisLeft(g).ticks(6).tickFormat(H)),k<0&&M>0&&d.append("line").attr("x1",0).attr("x2",r).attr("y1",g(0)).attr("y2",g(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),d.selectAll(".year-mark").data(o).join("line").attr("x1",b=>f(b)).attr("x2",b=>f(b)).attr("y1",0).attr("y2",l).attr("stroke","#f1f3f5");const N=d.append("g").attr("clip-path",`url(#${v})`);C.forEach(b=>{const T=i.line().defined(u=>Number.isFinite(W(u,b))).x(u=>f(u.year)).y(u=>g(W(u,b)));N.append("path").datum(a).attr("fill","none").attr("stroke",b.color).attr("stroke-width",s?at(b.pop,1,10):2).attr("d",T);const S=a[a.length-1],I=W(S,b);Number.isFinite(I)&&I>=k&&I<=M&&d.append("text").attr("x",r+5).attr("y",g(I)).attr("dy","0.35em").attr("font-size",10).attr("fill",b.color).text(b.label)});const x=i.select("#cwi-tooltip"),j=i.bisector(b=>b.year).left,A=d.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",l).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");d.append("rect").attr("width",r).attr("height",l).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",b=>{const[T]=i.pointer(b),S=f.invert(T),I=j(a,S),u=a[Math.max(0,I-1)],B=a[Math.min(a.length-1,I)],L=B&&Math.abs(S-B.year)<Math.abs(S-u.year)?B:u;if(!L)return;A.attr("x1",f(L.year)).attr("x2",f(L.year)).style("display",null);const Y=`<strong>${L.year}</strong><br>`+C.map(q=>{const R=W(L,q);return`<span style="color:${q.color}">${q.label}</span>: ${H(R)}`}).join("<br>");x.html(Y).style("display","block").style("left",b.clientX+16+"px").style("top",b.clientY-60+"px")}).on("mouseleave",()=>{A.style("display","none"),x.style("display","none")})}function Gt(t,e,s,o,n,a){if(s==="juxtaposition"){const d=n.includes("income")?G("income"):[],v=n.includes("wealth")?G("wealth"):[],N=[...d.flatMap(S=>C.map(I=>W(S,I))),...v.flatMap(S=>C.map(I=>W(S,I)))].filter(Number.isFinite),x=i.min(N),j=i.max(N),A=(a==null?void 0:a.min)!=null||(a==null?void 0:a.max)!=null,b=[(a==null?void 0:a.min)!=null?a.min:x,(a==null?void 0:a.max)!=null?a.max:j];if(n.length>1){const S=document.createElement("p");S.className="cwi-note",S.textContent="Solid line = income · Dashed line = wealth. All panels share the same Y axis.",t.appendChild(S)}const T=document.createElement("div");T.className="cwi-sm-grid",t.appendChild(T),C.forEach(S=>{const I=U(T,S.label),u=document.createElementNS("http://www.w3.org/2000/svg","svg");I.appendChild(u),Rt(u,S,n,o,e,b,A)});return}if(n.length===1){const d=U(t,n[0]==="income"?"Income over time":"Wealth over time"),v=document.createElementNS("http://www.w3.org/2000/svg","svg");d.appendChild(v),Vt(v,n[0],o,e,a);return}const h=U(t,"Superposed indexed lines (income solid, wealth dashed)"),p=document.createElement("div");p.className="cwi-inline-legend",p.innerHTML='<span><i style="background:#495057"></i><span>Income solid</span></span><span><i style="background:#ffffff;border:2px dashed #495057"></i><span>Wealth dashed, indexed to 100</span></span>',h.appendChild(p);const m=i.select(h).append("svg").attr("class","cwi-svg tall"),c=840,r=380,l={top:20,right:120,bottom:28,left:70},y=c-l.left-l.right,$=r-l.top-l.bottom,w=et(),k=w.map(d=>({year:d,income:V("income",d),wealth:V("wealth",d)})),M=i.scaleLinear().domain(i.extent(w)).range([0,y]),f=i.scaleLinear().domain([0,260]).range([$,0]);m.attr("viewBox",`0 0 ${c} ${r}`);const g=m.append("g").attr("transform",`translate(${l.left},${l.top})`);g.append("g").attr("transform",`translate(0,${$})`).call(i.axisBottom(M).tickFormat(i.format("d"))),g.append("g").call(i.axisLeft(f).ticks(6).tickFormat(d=>`${Math.round(d)}%`)),C.forEach(d=>{const v=Math.abs(W(k[0].income,d))||1,N=Math.abs(W(k[0].wealth,d))||1,x=i.line().x(b=>M(b.year)).y(b=>f(Math.abs(W(b.income,d))/v*100)),j=i.line().x(b=>M(b.year)).y(b=>f(Math.abs(W(b.wealth,d))/N*100)),A=o?at(d.pop,1,7):2;g.append("path").datum(k).attr("fill","none").attr("stroke",d.color).attr("stroke-width",A).attr("d",x),g.append("path").datum(k).attr("fill","none").attr("stroke",d.color).attr("stroke-width",A).attr("stroke-dasharray","5 4").attr("opacity",.85).attr("d",j)})}function Xt(t,e,s,o,n,a,h){const p=i.select(t),m=400,c=250,r={top:14,right:58,bottom:30,left:70},l=m-r.left-r.right,y=c-r.top-r.bottom,$=et(),w=i.scaleLinear().domain(i.extent($)).range([0,l]),[k,M]=a,f=h?k:Math.min(0,k),g=h?M:M*1.08,d=i.scaleLinear().domain([f,g]).range([y,0]),v=d.ticks(4);p.attr("class","cwi-svg").attr("viewBox",`0 0 ${m} ${c}`),p.selectAll("*").remove();const N=`clip-ga-${e.key}-${Math.random().toString(36).slice(2)}`;p.append("defs").append("clipPath").attr("id",N).append("rect").attr("width",l).attr("height",y);const x=p.append("g").attr("transform",`translate(${r.left},${r.top})`);x.selectAll("line.hg").data(v).join("line").attr("class","hg").attr("x1",0).attr("x2",l).attr("y1",u=>d(u)).attr("y2",u=>d(u)).attr("stroke","#e8eaed").attr("stroke-width",.8),x.append("g").attr("transform",`translate(0,${y})`).call(i.axisBottom(w).ticks(5).tickFormat(i.format("d"))).call(u=>u.selectAll("text").attr("font-size",10)),x.append("g").call(i.axisLeft(d).tickValues(v).tickFormat(H)).call(u=>u.selectAll("text").attr("font-size",10)),f<0&&g>0&&x.append("line").attr("x1",0).attr("x2",l).attr("y1",d(0)).attr("y2",d(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),x.selectAll(".yr-mark").data(n).join("line").attr("class","yr-mark").attr("x1",u=>w(u)).attr("x2",u=>w(u)).attr("y1",0).attr("y2",y).attr("stroke","#dee2e6").attr("stroke-width",1.5);const j=x.append("g").attr("clip-path",`url(#${N})`);s.forEach((u,B)=>{const L=G(u),Y=i.area().x(q=>w(q.year)).y0(d(Math.max(f,Math.min(g,0)))).y1(q=>d(Math.max(f,Math.min(g,q.values[e.key]||0))));j.append("path").datum(L).attr("fill",e.color).attr("opacity",B===0?.72:.42).attr("stroke-dasharray",B===1?"5 3":null).attr("d",Y)});const A=G(s[0]).at(-1);if(A){const u=A.values[e.key]||0;Number.isFinite(u)&&u>=f&&u<=g&&x.append("text").attr("x",l+4).attr("y",d(u)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(H(u))}const b=i.select("#cwi-tooltip"),T=G(s[0]),S=i.bisector(u=>u.year).left,I=x.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",y).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");x.append("rect").attr("width",l).attr("height",y).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",u=>{const[B]=i.pointer(u),L=w.invert(B),Y=S(T,L),q=T[Math.max(0,Y-1)],R=T[Math.min(T.length-1,Y)],P=R&&Math.abs(L-R.year)<Math.abs(L-q.year)?R:q;if(!P)return;I.attr("x1",w(P.year)).attr("x2",w(P.year)).style("display",null);const D=s.map(J=>{const E=G(J).find(_=>_.year===P.year),F=E?E.values[e.key]||0:null;return`${J}: ${F!=null?H(F):"n/a"}`});b.html(`<strong style="color:${e.color}">${e.label}</strong> · ${P.year}<br>${D.join("<br>")}`).style("display","block").style("left",u.clientX+16+"px").style("top",u.clientY-50+"px")}).on("mouseleave",()=>{I.style("display","none"),b.style("display","none")})}function Kt(t,e,s,o,n,a){const h=(c,r)=>{const l=G(r),y=l[l.length-1],$=l.flatMap(E=>C.map(F=>E.values[F.key]||0)),w=i.min($),k=i.max($),M=Math.min(0,w*1.12),f=k*1.06,g=(a==null?void 0:a.min)!=null?a.min:M,d=(a==null?void 0:a.max)!=null?a.max:f,v=700,N=340,x=22,A={top:20,right:o?148:112,bottom:28,left:80},b=v-A.left-A.right,T=N-A.top-A.bottom,S=i.select(c);S.attr("class","cwi-svg").attr("viewBox",`0 0 ${v} ${N}`),S.selectAll("*").remove();const I=i.scaleLinear().domain(i.extent(l,E=>E.year)).range([0,b]),u=i.scaleLinear().domain([g,d]).range([T,0]),B=`clip-area-${r}-${Math.random().toString(36).slice(2)}`;S.append("defs").append("clipPath").attr("id",B).append("rect").attr("width",b).attr("height",T);const L=S.append("g").attr("transform",`translate(${A.left},${A.top})`);L.append("g").attr("transform",`translate(0,${T})`).call(i.axisBottom(I).tickFormat(i.format("d"))),L.append("g").call(i.axisLeft(u).ticks(6).tickFormat(H)),g<0&&d>0&&L.append("line").attr("x1",0).attr("x2",b).attr("y1",u(0)).attr("y2",u(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),L.selectAll(".yr-ref").data(e).join("line").attr("x1",E=>I(E)).attr("x2",E=>I(E)).attr("y1",0).attr("y2",T).attr("stroke","#e9ecef");const q=[...[...C,{key:"middle40",label:"Middle 40%",pop:40,color:"#dee2e6"}]].sort((E,F)=>Math.abs(y.values[F.key]||0)-Math.abs(y.values[E.key]||0)),R=L.append("g").attr("clip-path",`url(#${B})`);if(q.forEach(E=>{const F=i.area().x(_=>I(_.year)).y0(u(Math.max(g,Math.min(d,0)))).y1(_=>u(Math.max(g,Math.min(d,_.values[E.key]||0))));R.append("path").datum(l).attr("fill",E.color).attr("opacity",E.key==="middle40"?.35:.72).attr("d",F)}),C.forEach(E=>{const F=y.values[E.key]||0;Number.isFinite(F)&&F>=g&&F<=d&&L.append("text").attr("x",b+5).attr("y",u(F)).attr("dy","0.35em").attr("font-size",10).attr("fill",E.color).text(E.label)}),o){const E=b+104;L.append("text").attr("x",E+x/2).attr("y",-7).attr("text-anchor","middle").attr("font-size",9).attr("fill","#6c757d").text("Pop.");const F=C.map(Z=>at(Z.pop,.1,1)),_=i.sum(F);let Q=0;C.forEach((Z,O)=>{const X=Math.max(2,F[O]/_*T);L.append("rect").attr("x",E).attr("y",Q).attr("width",x).attr("height",X).attr("rx",2).attr("fill",Z.color).attr("opacity",.85),X>=10&&L.append("text").attr("x",E+x/2).attr("y",Q+X/2).attr("dy","0.35em").attr("text-anchor","middle").attr("font-size",8).attr("fill","#fff").attr("pointer-events","none").text(`${Z.pop}%`),Q+=X})}const P=i.select("#cwi-tooltip"),D=i.bisector(E=>E.year).left,J=L.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",T).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");L.append("rect").attr("width",b).attr("height",T).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",E=>{const[F]=i.pointer(E),_=I.invert(F),Q=D(l,_),Z=l[Math.max(0,Q-1)],O=l[Math.min(l.length-1,Q)],X=O&&Math.abs(_-O.year)<Math.abs(_-Z.year)?O:Z;if(!X)return;J.attr("x1",I(X.year)).attr("x2",I(X.year)).style("display",null);const pt=`<strong>${X.year}</strong><br>`+C.map(nt=>{const K=X.values[nt.key]||0;return`<span style="color:${nt.color}">${nt.label}</span>: ${H(K)}`}).join("<br>");P.html(pt).style("display","block").style("left",E.clientX+16+"px").style("top",E.clientY-60+"px")}).on("mouseleave",()=>{J.style("display","none"),P.style("display","none")})};if(s==="juxtaposition"){const c=n.flatMap(k=>G(k).flatMap(M=>C.map(f=>M.values[f.key]||0))).filter(Number.isFinite),r=i.min(c),l=i.max(c),y=(a==null?void 0:a.max)!=null,$=[Math.min(0,r),(a==null?void 0:a.max)!=null?a.max:l];if(n.length>1){const k=document.createElement("p");k.className="cwi-note",k.textContent="Solid fill = income · Translucent dashed fill = wealth. All panels share the same Y axis.",t.appendChild(k)}const w=document.createElement("div");w.className="cwi-sm-grid",t.appendChild(w),C.forEach(k=>{const M=U(w,k.label),f=document.createElementNS("http://www.w3.org/2000/svg","svg");M.appendChild(f),Xt(f,k,n,o,e,$,y)});return}const m=(c=>{if(n.length===1)return c;const r=document.createElement("div");return r.className="cwi-grid-2",c.appendChild(r),r})(t);n.forEach(c=>{const l=U(m,c==="income"?"Average pre-tax income per person (SEK, linear scale, gray = Middle 40%)":"Average net wealth per person (SEK, linear scale, gray = Middle 40%, below 0 = net debt)"),y=document.createElementNS("http://www.w3.org/2000/svg","svg");l.appendChild(y),h(y,c)})}function Lt(t){const e=V("income",t),s=i.sum(Wt,o=>Math.max(0,e.totals[o]||0));return C.map(o=>{const n=Math.max(0,e.totals[o.key]||0);return s>0?n/s*100:0})}function Tt(t,e,s,o,n,a,h){e.forEach(c=>{t.append("rect").attr("x",c.x).attr("y",c.y).attr("width",s).attr("height",o).attr("rx",3).attr("fill",h)});let p=0;n.map((c,r)=>{const l={start:p,end:p+c,color:a[r]};return p+=c,l}).forEach(c=>{e.forEach(r=>{const l=Math.max(r.i,c.start),y=Math.min(r.i+1,c.end);if(y<=l+.001)return;const $=l-r.i,w=y-r.i,k=w-$>=.999,M=r.y+o*(1-w),f=Math.max(1,o*(w-$));t.append("rect").attr("x",r.x).attr("y",M).attr("width",s).attr("height",f).attr("rx",k?3:1).attr("fill",c.color)})})}function $t(t,e,s){const o=i.select(t),n=250,a=s?290:240,h=20,p=Lt(e);o.attr("class","cwi-svg").attr("viewBox",`0 0 ${n} ${a}`),o.selectAll("*").remove();const m=i.range(100).map(r=>({i:r,x:15+r%10*22,y:15+(9-Math.floor(r/10))*22})),c=o.append("g");if(Tt(c,m,h,h,p,C.map(r=>r.color),"#eef1ea"),s){const r=[...C.map(w=>w.pop),40],l=[...C.map(w=>w.color),"#dee2e6"],y=Nt(r);let $=0;o.append("text").attr("x",15).attr("y",255).attr("font-size",10).attr("fill","#5f6368").text("Population strip (gray = Middle 40%)"),y.forEach((w,k)=>{for(let M=0;M<w;M+=1)o.append("rect").attr("x",15+$*2.05).attr("y",265).attr("width",1.8).attr("height",10).attr("rx",1).attr("fill",l[k]).attr("opacity",.75),$+=1})}}function Ut(t,e,s,o){const n=document.createElement("div");if(n.className="cwi-note",n.textContent="Income waffle shares: population share × average income for each disjoint group. Wealth excluded (negative values).",t.appendChild(n),s==="juxtaposition"){C.forEach((a,h)=>{const p=document.createElement("div");p.style.cssText="margin-bottom:1.2rem;";const m=document.createElement("h4");m.textContent=a.label,m.style.cssText=`font-size:0.95rem;font-weight:700;color:${a.color};margin:0 0 0.4rem;`,p.appendChild(m);const c=document.createElement("div");c.style.cssText="display:flex;flex-wrap:wrap;gap:0.6rem;",e.forEach(r=>{const l=U(c,String(r));l.style.minWidth="170px";const $=Lt(r)[h],w=i.select(l).append("svg").attr("class","cwi-svg").attr("viewBox","0 0 240 240"),k=i.range(100).map(g=>({i:g,x:10+g%10*22,y:10+(9-Math.floor(g/10))*22})),M=w.append("g");Tt(M,k,20,20,[$],[a.color],"#e9ecef");const f=document.createElement("p");f.textContent=`${$.toFixed(2)}%`,f.style.cssText="text-align:center;font-size:0.8rem;color:#5f6368;margin:0.2rem 0 0;",l.appendChild(f)}),p.appendChild(c),t.appendChild(p)});return}if(s==="superposition"){const a=document.createElement("div");a.className="cwi-years-grid";const h=document.createElement("div");h.className="cwi-inline-legend",h.style.marginBottom="0.6rem",C.forEach(p=>{const m=document.createElement("span");m.innerHTML=`<i style="background:${p.color}"></i><span>${p.label}</span>`,h.appendChild(m)}),t.appendChild(h),t.appendChild(a),e.forEach(p=>{const m=U(a,String(p)),c=document.createElementNS("http://www.w3.org/2000/svg","svg");m.appendChild(c),$t(c,p,o)});return}yt(t,et(),(a,h)=>{h.innerHTML="";const p=document.createElementNS("http://www.w3.org/2000/svg","svg");h.appendChild(p),$t(p,a,o)},"Animated income waffle")}function Jt(){Pt();const t=document.getElementById("cwi-years-input"),e=document.getElementById("cwi-representation"),s=document.getElementById("cwi-comparison"),o=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),a=document.getElementById("cwi-render-root");if(!t||!e||!s||!o||!n||!a)return;const h=document.getElementById("cwi-yview"),p=document.getElementById("cwi-ymax-slider"),m=document.getElementById("cwi-ymax-val"),c=document.getElementById("cwi-yview-reset");let r={min:null,max:null},l=1;const y=g=>{const d=g.flatMap(v=>G(v).flatMap(N=>C.map(x=>N.values[x.key]||0))).filter(Number.isFinite);return i.max(d)},$=g=>{const d=Math.max(5,Math.log10(Math.abs(l))-4.5),v=Math.log10(Math.abs(l));return Math.pow(10,d+(v-d)*g/1e3)},w=g=>{const d=Math.max(5,Math.log10(Math.abs(l))-4.5),v=Math.log10(Math.abs(l));return Math.max(0,Math.min(1e3,Math.round((Math.log10(Math.max(g,1))-d)/(v-d)*1e3)))},k=()=>{const g=r.max!=null?r.max:l;m.textContent=H(g)},M=()=>{const g=r.max!=null?r.max:l;p.value=w(g),k()};p.addEventListener("input",()=>{r.max=$(Number(p.value)),k(),f()}),c.addEventListener("click",()=>{r={min:null,max:null},M(),f()});const f=()=>{tt&&(clearInterval(tt),tt=null);const g=_t(t.value),d=e.value,v=n.value==="with";o.disabled=d==="waffle",d==="waffle"&&(o.value="income");const N=o.value==="both"?["income","wealth"]:[o.value];Array.from(s.options).forEach(j=>{j.disabled=(d==="line"||d==="stacked")&&j.value==="animation"}),(d==="line"||d==="stacked")&&s.value==="animation"&&(s.value="juxtaposition");const x=s.value;d==="line"||d==="bar"||d==="stacked"?(h.classList.remove("hidden"),l=y(N),M()):(h.classList.add("hidden"),r={min:null,max:null}),a.innerHTML="",d==="table"&&Ht(a,g,x,v,N),d==="bar"&&Yt(a,g,x,v,N,r),d==="line"&&Gt(a,g,x,v,N,r),d==="stacked"&&Kt(a,g,x,v,N,r),d==="waffle"&&Ut(a,g,x,v)};e.addEventListener("change",f),s.addEventListener("change",f),o.addEventListener("change",f),n.addEventListener("change",f),t.addEventListener("change",f),t.addEventListener("blur",f),f()}const ft="1.0",It="wealth-study-data",lt=[{id:"consent",type:"info",title:"Participant Information & Consent",content:`
      <p>You are invited to participate in a user study conducted as part of a Master's thesis at Linköping University.</p>
      <p><strong>What you will do:</strong> Interact with the visualization tool and answer a short question.</p>
      <p><strong>Data:</strong> Your responses are stored locally in your browser. No personal data is collected.</p>
      <p><strong>Participation is voluntary.</strong> You may close this window at any time.</p>
      <label class="consent-check">
        <input type="checkbox" id="consent-checkbox" />
        I have read the information above and agree to participate.
      </label>`,nextLabel:"Start",requireConsent:!0},{id:"task_test",type:"task",phase:"Task 1 of 1",vizConfig:{representation:"bar",comparison:"juxtaposition",metric:"wealth",popEncoding:"without",years:"1980,1990,2000,2010,2020,2024"},taskText:"test",questionText:"test",options:[{label:"a test",value:"a"},{label:"b test",value:"b"},{label:"c test",value:"c"},{label:"d test",value:"d"}]},{id:"complete",type:"complete",title:"Thank you!",content:"<p>Your response has been recorded.</p>"}],z={currentStep:0,startTime:Date.now(),stepTimes:{},answers:{},participantId:Math.random().toString(36).slice(2,9)};function Qt(t){const e=document.getElementById("cwi-representation"),s=document.getElementById("cwi-comparison"),o=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),a=document.getElementById("cwi-years-input");e&&(t.representation&&(e.value=t.representation),t.years&&(a.value=t.years,a.dispatchEvent(new Event("change"))),t.metric&&(o.value=t.metric),t.comparison&&(s.value=t.comparison),t.popEncoding&&(n.value=t.popEncoding),e.dispatchEvent(new Event("change")))}function Ct(t,e,s={}){z.answers[t]={value:e,timestamp:Date.now(),elapsed:Date.now()-(z.stepTimes[t]||z.startTime),...s},localStorage.setItem(It,JSON.stringify({state:z,version:ft}))}function Zt(){lt.find(n=>n.id==="pre_q1");const t={participantId:z.participantId,studyVersion:ft,startTime:new Date(z.startTime).toISOString(),completedTime:new Date().toISOString(),answers:z.answers,summary:Bt()},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),s=URL.createObjectURL(e),o=document.createElement("a");o.href=s,o.download=`study-${z.participantId}.json`,o.click(),URL.revokeObjectURL(s)}function Bt(){var t;return{taskTestAnswer:((t=z.answers.task_test)==null?void 0:t.value)??"—"}}function xt(){const t=lt[z.currentStep];z.stepTimes[t.id]=Date.now();const e=document.getElementById("study-overlay"),s=document.getElementById("study-panel"),o=document.getElementById("study-task-banner");t.type==="task"?(e.classList.add("hidden"),o.classList.remove("hidden"),Qt(t.vizConfig),te(t,o)):(o.classList.add("hidden"),e.classList.remove("hidden"),t.type==="info"&&Dt(t,s),t.type==="question"&&Ot(t,s),t.type==="complete"&&ee(t,s)),ae()}function Dt(t,e){var s,o;if(e.innerHTML=`
    <div class="study-phase-tag">Information</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-nav">
      ${z.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${t.requireConsent?"disabled":""}>${t.nextLabel||"Next →"}</button>
    </div>`,t.requireConsent){const n=e.querySelector("#consent-checkbox"),a=e.querySelector("#study-next");n.addEventListener("change",()=>{a.disabled=!n.checked})}(s=e.querySelector("#study-next"))==null||s.addEventListener("click",bt),(o=e.querySelector("#study-prev"))==null||o.addEventListener("click",gt)}function Ot(t,e){var o,n;const s=(o=z.answers[t.id])==null?void 0:o.value;e.innerHTML=`
    <div class="study-phase-tag">${t.phase} — Question ${t.questionNum}</div>
    <h2 class="study-title">${t.text}</h2>
    ${t.note?`<p class="study-note">${t.note}</p>`:""}
    <div class="study-options" id="study-options">
      ${t.options.map(a=>`
        <label class="study-option ${s===a.value?"selected":""}">
          <input type="radio" name="sq" value="${a.value}" ${s===a.value?"checked":""}/>
          ${a.label}
        </label>`).join("")}
    </div>
    <div class="study-nav">
      ${z.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${s?"":"disabled"}>Next →</button>
    </div>`,e.querySelectorAll(".study-option").forEach(a=>{a.addEventListener("click",()=>{e.querySelectorAll(".study-option").forEach(p=>p.classList.remove("selected")),a.classList.add("selected");const h=a.querySelector("input").value;Ct(t.id,h),e.querySelector("#study-next").disabled=!1})}),e.querySelector("#study-next").addEventListener("click",bt),(n=e.querySelector("#study-prev"))==null||n.addEventListener("click",gt)}let dt="description";function te(t,e){dt="description",e.innerHTML=ut(t),mt(t,e)}function ut(t){var s;const e=(s=z.answers[t.id])==null?void 0:s.value;return dt==="description"?`
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
    </div>`}function mt(t,e){var s,o,n,a,h;(s=e.querySelector("#task-back"))==null||s.addEventListener("click",()=>{gt()}),(o=e.querySelector("#task-ready"))==null||o.addEventListener("click",()=>{dt="question",e.innerHTML=ut(t),mt(t,e)}),(n=e.querySelector("#task-back-q"))==null||n.addEventListener("click",()=>{dt="description",e.innerHTML=ut(t),mt(t,e)}),e.querySelectorAll(".task-option").forEach(p=>{p.addEventListener("click",()=>{e.querySelectorAll(".task-option").forEach(c=>c.classList.remove("selected")),p.classList.add("selected");const m=p.querySelector("input").value;Ct(t.id,m),e.querySelector("#task-submit").disabled=!1})}),(a=e.querySelector("#task-submit"))==null||a.addEventListener("click",bt),(h=e.querySelector("#task-close-btn"))==null||h.addEventListener("click",wt)}function ee(t,e){const s=Bt();e.innerHTML=`
    <div class="study-phase-tag">Complete</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-summary">
      <h3>Your response summary</h3>
      <table class="summary-table">
        <tr><th>Task answer</th><td>${s.taskTestAnswer}</td></tr>
      </table>
    </div>
    <div class="study-nav centered">
      <button class="study-btn primary large" id="study-download">⬇ Download my data (JSON)</button>
      <button class="study-btn secondary" id="study-close-complete">Close</button>
    </div>`,e.querySelector("#study-download").addEventListener("click",Zt),e.querySelector("#study-close-complete").addEventListener("click",wt)}function ae(){const t=document.getElementById("study-progress-bar"),e=document.getElementById("study-progress-label"),s=lt.length-1,o=Math.round(z.currentStep/s*100);t&&(t.style.width=o+"%"),e&&(e.textContent=`Step ${z.currentStep+1} of ${lt.length}`)}function bt(){z.currentStep<lt.length-1&&(z.currentStep++,xt())}function gt(){z.currentStep>0&&(z.currentStep--,xt())}function ne(){oe(),se();try{const t=localStorage.getItem(It);if(t){const e=JSON.parse(t);e.version===ft&&e.state&&Object.assign(z,e.state)}}catch{}document.getElementById("study-launch-btn").addEventListener("click",()=>{document.getElementById("study-launcher").classList.add("hidden"),document.getElementById("study-overlay").classList.remove("hidden"),xt()}),document.getElementById("study-close-btn").addEventListener("click",wt)}function wt(){document.getElementById("study-overlay").classList.add("hidden"),document.getElementById("study-task-banner").classList.add("hidden"),document.getElementById("study-progress-container").classList.add("hidden"),document.getElementById("study-launcher").classList.remove("hidden"),z.currentStep=0}function oe(){document.body.insertAdjacentHTML("beforeend",`
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
  `),new MutationObserver(()=>{const e=document.getElementById("study-overlay"),s=document.getElementById("study-task-banner"),o=document.getElementById("study-progress-container");e.classList.contains("hidden")&&s.classList.contains("hidden")&&z.currentStep===0?o.classList.add("hidden"):o.classList.remove("hidden")}).observe(document.getElementById("study-overlay"),{attributes:!0})}function se(){const t=document.createElement("style");t.textContent=`
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
