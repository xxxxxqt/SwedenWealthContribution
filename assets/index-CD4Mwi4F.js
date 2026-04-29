(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const h of n.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const c=window.d3;function Ct(t){const e=t.map(Math.floor);let s=100-c.sum(e);const o=t.map((a,n)=>({i:n,frac:a-Math.floor(a)})).sort((a,n)=>n.frac-a.frac);for(let a=0;a<o.length&&s>0;a+=1)e[o[a].i]+=1,s-=1;return e}const $t=[{key:"bottom50",label:"Bottom 50%",color:"#4dabf7",pop:50},{key:"top10",label:"Top 10%",color:"#fcc419",pop:10},{key:"top1",label:"Top 1%",color:"#ff8787",pop:1},{key:"top01",label:"Top 0.1%",color:"#e599f7",pop:.1},{key:"top001",label:"Top 0.01%",color:"#ff6b6b",pop:.01},{key:"top0001",label:"Top 0.001%",color:"#c92a2a",pop:.001}];c.scaleSqrt().domain([.001,50]).range([.6,6]);let st=[];async function Bt(){const e=(await c.text("./data/wealth_avg.csv")).split(`
`),s=e[0].split(","),o={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};st=[];for(let a=1;a<e.length;a++){const n=e[a].split(",");if(n.length<s.length)continue;const h=Number(n[0]);if(!Number.isFinite(h))continue;const p={year:h};let d=!0;for(let l=1;l<s.length;l++){const r=o[s[l].trim()];if(!r)continue;const i=Number(n[l]);if(!Number.isFinite(i)){d=!1;break}p[r]=i}d&&p.bottom50!==void 0&&st.push(p)}st.sort((a,n)=>a.year-n.year),new Map(st.map(a=>[a.year,a]))}let rt=[];async function Nt(){const e=(await c.text("./data/income_avg.csv")).split(`
`),s=e[0].split(","),o={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};rt=[];for(let a=1;a<e.length;a++){const n=e[a].split(",");if(n.length<2)continue;const h=Number(n[0]);if(!Number.isFinite(h))continue;const p={year:h};for(let d=1;d<s.length;d++){const l=o[s[d].trim()];l&&(p[l]=Number(n[d])||0)}p.bottom50!==void 0&&rt.push(p)}rt.sort((a,n)=>a.year-n.year),new Map(rt.map(a=>[a.year,a]))}function At(t){const e=Math.abs(t);return e>=1e9?(t/1e9).toFixed(1)+"B":e>=1e6?(t/1e6).toFixed(1)+"M":e>=1e3?(t/1e3).toFixed(0)+"K":t.toFixed(0)}function wt(t){return t>=1?`${t}%`:t>=.1?`${t.toFixed(1)}%`:t>=.01?`${t.toFixed(2)}%`:`${t.toFixed(3)}%`}function V(t){const e=Math.abs(t);return e>=1e9?`${(t/1e9).toFixed(e>=1e10?0:1)}B`:e>=1e6?`${(t/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(t/1e3).toFixed(e>=1e5?0:1)}K`:`${Math.round(t)}`}$t.filter(t=>["top0001","top001"].includes(t.key));$t.filter(t=>!["top0001","top001"].includes(t.key));c.scaleSqrt().domain([.001,50]).range([.6,6]);async function _t(){await Promise.all([Bt(),Nt()]),Ut()}_t();const zt=[1980,1990,2e3,2010,2020,2024],B=[{key:"bottom50",label:"Bottom 50%",pop:50,color:"#4dabf7"},{key:"top9",label:"Top 9%",pop:9,color:"#ffd43b"},{key:"top0_9",label:"Top 0.9%",pop:.9,color:"#ff922b"},{key:"top0_09",label:"Top 0.09%",pop:.09,color:"#f06595"},{key:"top0_009",label:"Top 0.009%",pop:.009,color:"#e64980"},{key:"top0_001",label:"Top 0.001%",pop:.001,color:"#c92a2a"}],Wt=["bottom50","middle40","top9","top0_9","top0_09","top0_009","top0_001"];function at(t,e,s){const o=Math.log10(.001),a=Math.log10(50),n=(Math.log10(Math.max(t,1e-4))-o)/(a-o);return e+n*(s-e)}let it=[],ct=[],Et=new Map,mt=new Map,O=null;function vt(t){if(!t)return null;const e={bottom50:t.bottom50*50,middle40:t.mid40*40,top10:t.top10*10,top1:t.top1*1,top01:t.top01*.1,top001:t.top001*.01,top0001:t.top0001*.001};return{year:t.year,values:{bottom50:t.bottom50,middle40:t.mid40,top9:(e.top10-e.top1)/9,top0_9:(e.top1-e.top01)/.9,top0_09:(e.top01-e.top001)/.09,top0_009:(e.top001-e.top0001)/.009,top0_001:t.top0001},totals:{bottom50:e.bottom50,middle40:e.middle40,top9:e.top10-e.top1,top0_9:e.top1-e.top01,top0_09:e.top01-e.top001,top0_009:e.top001-e.top0001,top0_001:e.top0001}}}function Pt(){it.length&&ct.length||(it=rt.map(vt).filter(Boolean),ct=st.map(vt).filter(Boolean),Et=new Map(it.map(t=>[t.year,t])),mt=new Map(ct.map(t=>[t.year,t])))}function nt(){return it.map(t=>t.year).filter(t=>mt.has(t))}function Ft(t){var o;const e=new Set(nt()),s=Array.from(new Set(((o=String(t).match(/\d{4}/g))==null?void 0:o.map(Number))||[])).filter(a=>e.has(a)).sort((a,n)=>a-n);return s.length?s:zt.filter(a=>e.has(a))}function j(t,e){return(t==="income"?Et:mt).get(e)}function Q(t){return t==="income"?it:ct}function W(t,e,s){return t.values[e.key]}function lt(t){return`${At(t)} SEK`}function U(t,e){const s=document.createElement("div");if(s.className="cwi-card",e){const o=document.createElement("h3");o.textContent=e,s.appendChild(o)}return t.appendChild(s),s}function yt(t,e,s,o){const a=document.createElement("div");a.className="cwi-anim-bar",a.innerHTML=`<button type="button" id="cwi-matrix-play">Play</button><input type="range" id="cwi-matrix-year" min="0" max="${e.length-1}" step="1" value="0"><span id="cwi-matrix-year-label">${e[0]}</span>`,t.appendChild(a);const n=U(t,o),h=document.createElement("div");n.appendChild(h);const p=a.querySelector("#cwi-matrix-year"),d=a.querySelector("#cwi-matrix-play"),l=a.querySelector("#cwi-matrix-year-label"),r=i=>{const f=e[i];l.textContent=String(f),s(f,h)};p.addEventListener("input",()=>r(Number(p.value))),d.addEventListener("click",()=>{if(O){clearInterval(O),O=null,d.textContent="Play";return}d.textContent="Pause",O=setInterval(()=>{const i=(Number(p.value)+1)%e.length;p.value=String(i),r(i)},900)}),r(0)}function jt(t,e,s,o,a){const n=a.includes("income"),h=a.includes("wealth"),p=`${n?"<th>Income</th>":""}${h?"<th>Wealth</th>":""}`,d=(l,r,i)=>{const f=o?`<td>${wt(l.pop)}</td>`:"",$=n?`<td>${lt(r.values[l.key])}</td>`:"",k=h?`<td>${lt(i.values[l.key])}</td>`:"";return`<tr><td>${l.label}</td>${f}${$}${k}</tr>`};if(s==="juxtaposition"){const l=document.createElement("div");l.className="cwi-years-grid",t.appendChild(l),e.forEach(r=>{const i=U(l,String(r)),f=document.createElement("table");f.className="cwi-table",f.innerHTML=`<thead><tr><th>Group</th>${o?"<th>Pop.</th>":""}${p}</tr></thead><tbody>${B.map($=>d($,j("income",r),j("wealth",r))).join("")}</tbody>`,i.appendChild(f)});return}if(s==="superposition"){const l=U(t,"Combined table across selected years"),r=document.createElement("table");r.className="cwi-table";const i=a.length,f=`<tr><th rowspan="2">Group</th>${o?'<th rowspan="2">Pop.</th>':""}${e.map(b=>`<th colspan="${i}">${b}</th>`).join("")}</tr>`,$=`<tr>${e.map(()=>`${n?"<th>Income</th>":""}${h?"<th>Wealth</th>":""}`).join("")}</tr>`,k=B.map(b=>{const M=e.map(w=>{const L=j("income",w),x=j("wealth",w);return`${n?`<td>${lt(L.values[b.key])}</td>`:""}${h?`<td>${lt(x.values[b.key])}</td>`:""}`}).join("");return`<tr><td>${b.label}</td>${o?`<td>${wt(b.pop)}</td>`:""}${M}</tr>`}).join("");r.innerHTML=`<thead>${f}${$}</thead><tbody>${k}</tbody>`,l.appendChild(r);return}yt(t,nt(),(l,r)=>{r.innerHTML="";const i=document.createElement("table");i.className="cwi-table",i.innerHTML=`<thead><tr><th>Group</th>${o?"<th>Pop.</th>":""}${p}</tr></thead><tbody>${B.map(f=>d(f,j("income",l),j("wealth",l))).join("")}</tbody>`,r.appendChild(i)},"Animated table")}function kt(t,e,s,o,a){const n=c.select(t),h=520,p=310,d={top:18,right:16,bottom:28,left:120},l=h-d.left-d.right,r=p-d.top-d.bottom,i=B.map(E=>W(e,E)),f=c.min(i),$=c.max(i),k=(a==null?void 0:a.min)!=null?a.min:Math.min(0,f),b=(a==null?void 0:a.max)!=null?a.max:$*1.05,M=c.scaleLinear().domain([k,b]).range([0,l]),w=r/B.length;n.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${p}`),n.selectAll("*").remove();const L=`clip-hbar-${s}-${Math.random().toString(36).slice(2)}`;n.append("defs").append("clipPath").attr("id",L).append("rect").attr("width",l).attr("height",r);const x=n.append("g").attr("transform",`translate(${d.left},${d.top})`);if(x.append("g").attr("transform",`translate(0,${r})`).call(c.axisBottom(M).ticks(5).tickFormat(V)),k<0||b>0){const E=M(Math.max(k,Math.min(0,b)));x.append("line").attr("x1",E).attr("x2",E).attr("y1",0).attr("y2",r).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3")}const q=c.select("#cwi-tooltip"),_=x.append("g").attr("clip-path",`url(#${L})`);B.forEach((E,P)=>{const N=W(e,E),m=o?at(E.pop,w*.18,w*.82):w*.7,g=P*w+w/2,u=g-m/2,v=M(Math.max(k,Math.min(0,N))),y=M(Math.min(b,Math.max(0,N)));x.append("text").attr("x",-10).attr("y",g).attr("dy","0.35em").attr("text-anchor","end").attr("font-size",10).text(E.label),_.append("rect").attr("x",Math.min(v,y)).attr("y",u).attr("width",Math.max(2,Math.abs(y-v))).attr("height",m).attr("rx",3).attr("fill",E.color).style("cursor","crosshair").on("mouseover",S=>{q.html(`<strong style="color:${E.color}">${E.label}</strong><br>${V(N)}`).style("display","block").style("left",S.clientX+14+"px").style("top",S.clientY-36+"px")}).on("mousemove",S=>{q.style("left",S.clientX+14+"px").style("top",S.clientY-36+"px")}).on("mouseleave",()=>q.style("display","none"))})}function Yt(t,e,s,o,a,n){const h=p=>{if(a.length===1)return p;const d=document.createElement("div");return d.className="cwi-grid-2",p.appendChild(d),d};if(s==="juxtaposition"){const p=document.createElement("div");p.className="cwi-years-grid",t.appendChild(p),e.forEach(d=>{const l=U(p,String(d)),r=h(l);a.forEach(i=>{const f=document.createElement("div");f.innerHTML=`<p class="cwi-chart-title">${i==="income"?"Income":"Wealth"}</p>`;const $=document.createElementNS("http://www.w3.org/2000/svg","svg");f.appendChild($),r.appendChild(f),kt($,j(i,d),i,o,n)})});return}if(s==="superposition"){const p=h(t);a.forEach(d=>{const r=U(p,d==="income"?"Income by year — SEK  (dashed = baseline year)":"Wealth by year — SEK  (dashed = baseline year)"),i=(S,I)=>S?W(S,I):0,f=j(d,e[0]),$=e.flatMap(S=>B.map(I=>i(j(d,S),I))),k=c.max($.map(Math.abs)),b=Math.min(0,c.min($)),M=(n==null?void 0:n.min)!=null?n.min:b*1.1,w=(n==null?void 0:n.max)!=null?n.max:k*1.1,L=700,x=360,q={top:24,right:16,bottom:44,left:78},_=L-q.left-q.right,E=x-q.top-q.bottom,P=c.select(r).append("svg").attr("class","cwi-svg").attr("viewBox",`0 0 ${L} ${x}`),N=`clip-vbar-${d}-${Math.random().toString(36).slice(2)}`;P.append("defs").append("clipPath").attr("id",N).append("rect").attr("width",_).attr("height",E);const m=P.append("g").attr("transform",`translate(${q.left},${q.top})`),g=c.scaleBand().domain(e).range([0,_]).paddingInner(.2),u=c.scaleLinear().domain([M,w]).range([E,0]);m.append("g").attr("transform",`translate(0,${E})`).call(c.axisBottom(g).tickFormat(c.format("d"))),m.append("g").call(c.axisLeft(u).ticks(6).tickFormat(V)),M<0&&w>0&&m.append("line").attr("x1",0).attr("x2",_).attr("y1",u(0)).attr("y2",u(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3");const v=c.select("#cwi-tooltip"),y=m.append("g").attr("clip-path",`url(#${N})`);e.forEach(S=>{const I=j(d,S);if(!I)return;const F=g.bandwidth(),z=2,R=B.length,G=F-z*R,tt=B.map(A=>at(A.pop,.1,1)),D=c.sum(tt);let T=g(S);B.forEach((A,Y)=>{const X=Math.max(o?tt[Y]/D*G:G/R,3),J=i(I,A),Z=Math.max(M,Math.min(w,J)),H=Math.max(M,Math.min(w,0)),pt=u(Math.max(Z,H)),ot=Math.max(1,Math.abs(u(Z)-u(H)));if(y.append("rect").attr("x",T).attr("y",pt).attr("width",X).attr("height",ot).attr("fill",A.color).attr("rx",2).attr("opacity",.85).style("cursor","crosshair").on("mouseover",K=>{v.html(`<strong style="color:${A.color}">${A.label}</strong><br>${S}<br>${V(J)}`).style("display","block").style("left",K.clientX+14+"px").style("top",K.clientY-36+"px")}).on("mousemove",K=>{v.style("left",K.clientX+14+"px").style("top",K.clientY-36+"px")}).on("mouseleave",()=>v.style("display","none")),f&&S!==e[0]){const K=i(f,A);K>=M&&K<=w&&m.append("line").attr("x1",T).attr("x2",T+X).attr("y1",u(K)).attr("y2",u(K)).attr("stroke","#202124").attr("stroke-width",1.5).attr("stroke-dasharray","4 3").attr("opacity",.5)}T+=X+z})})});return}yt(t,nt(),(p,d)=>{d.innerHTML="";const l=h(d);a.forEach(r=>{const i=document.createElement("div");i.innerHTML=`<p class="cwi-chart-title">${r==="income"?"Income":"Wealth"}</p>`;const f=document.createElementNS("http://www.w3.org/2000/svg","svg");i.appendChild(f),l.appendChild(i),kt(f,j(r,p),r,o,n)})},"Animated bars")}function Ht(t,e,s,o,a,n,h){const p=c.select(t),d=400,l=250,r={top:14,right:58,bottom:30,left:70},i=d-r.left-r.right,f=l-r.top-r.bottom,$=nt(),k=c.scaleLinear().domain(c.extent($)).range([0,i]),[b,M]=n,w=h?b:Math.min(0,b),L=h?M:M*1.08,x=w<0,q=c.scaleLinear().domain([w,L]).range([f,0]),_=q.ticks(4);p.attr("class","cwi-svg").attr("viewBox",`0 0 ${d} ${l}`),p.selectAll("*").remove();const E=p.append("g").attr("transform",`translate(${r.left},${r.top})`);E.selectAll("line.hg").data(_).join("line").attr("class","hg").attr("x1",0).attr("x2",i).attr("y1",y=>q(y)).attr("y2",y=>q(y)).attr("stroke","#e8eaed").attr("stroke-width",.8),E.append("g").attr("transform",`translate(0,${f})`).call(c.axisBottom(k).ticks(5).tickFormat(c.format("d"))).call(y=>y.selectAll("text").attr("font-size",10)),E.append("g").call(c.axisLeft(q).tickValues(_).tickFormat(V)).call(y=>y.selectAll("text").attr("font-size",10)),x&&E.append("line").attr("x1",0).attr("x2",i).attr("y1",q(0)).attr("y2",q(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),E.selectAll(".yr-mark").data(a).join("line").attr("class","yr-mark").attr("x1",y=>k(y)).attr("x2",y=>k(y)).attr("y1",0).attr("y2",f).attr("stroke","#dee2e6").attr("stroke-width",1.5);const P=o?at(e.pop,1,10):1.8;s.forEach((y,S)=>{const I=Q(y),F=c.line().defined(z=>Number.isFinite(W(z,e))).x(z=>k(z.year)).y(z=>q(W(z,e)));E.append("path").datum(I).attr("fill","none").attr("stroke",e.color).attr("stroke-width",P).attr("stroke-dasharray",S===1?"5 3":null).attr("d",F)});const N=Q(s[0]).at(-1);if(N){const y=W(N,e);Number.isFinite(y)&&E.append("text").attr("x",i+4).attr("y",q(y)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(V(y))}const m=c.select("#cwi-tooltip"),g=Q(s[0]),u=c.bisector(y=>y.year).left,v=E.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",f).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");E.append("rect").attr("width",i).attr("height",f).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",y=>{const[S]=c.pointer(y),I=k.invert(S),F=u(g,I),z=g[Math.max(0,F-1)],R=g[Math.min(g.length-1,F)],G=R&&Math.abs(I-R.year)<Math.abs(I-z.year)?R:z;if(!G)return;v.attr("x1",k(G.year)).attr("x2",k(G.year)).style("display",null);const tt=s.map(D=>{const T=Q(D).find(Y=>Y.year===G.year),A=T?W(T,e):null;return`${D}: ${A!=null?V(A):"n/a"}`});m.html(`<strong style="color:${e.color}">${e.label}</strong> · ${G.year}<br>${tt.join("<br>")}`).style("display","block").style("left",y.clientX+16+"px").style("top",y.clientY-50+"px")}).on("mouseleave",()=>{v.style("display","none"),m.style("display","none")})}function Vt(t,e,s,o,a){const n=Q(e),h=c.select(t),p=620,d=340,l={top:20,right:110,bottom:28,left:80},r=p-l.left-l.right,i=d-l.top-l.bottom,f=n.flatMap(m=>B.map(g=>W(m,g))).filter(Number.isFinite),$=c.min(f),k=c.max(f),b=(a==null?void 0:a.min)!=null?a.min:Math.min(0,$),M=(a==null?void 0:a.max)!=null?a.max:k*1.05,w=c.scaleLinear().domain(c.extent(n,m=>m.year)).range([0,r]),L=c.scaleLinear().domain([b,M]).range([i,0]);h.attr("class","cwi-svg").attr("viewBox",`0 0 ${p} ${d}`),h.selectAll("*").remove();const x=h.append("g").attr("transform",`translate(${l.left},${l.top})`),q=`clip-line-${e}`;h.append("defs").append("clipPath").attr("id",q).append("rect").attr("width",r).attr("height",i),x.append("g").attr("transform",`translate(0,${i})`).call(c.axisBottom(w).tickFormat(c.format("d"))),x.append("g").call(c.axisLeft(L).ticks(6).tickFormat(V)),b<0&&M>0&&x.append("line").attr("x1",0).attr("x2",r).attr("y1",L(0)).attr("y2",L(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),x.selectAll(".year-mark").data(o).join("line").attr("x1",m=>w(m)).attr("x2",m=>w(m)).attr("y1",0).attr("y2",i).attr("stroke","#f1f3f5");const _=x.append("g").attr("clip-path",`url(#${q})`);B.forEach(m=>{const g=c.line().defined(y=>Number.isFinite(W(y,m))).x(y=>w(y.year)).y(y=>L(W(y,m)));_.append("path").datum(n).attr("fill","none").attr("stroke",m.color).attr("stroke-width",s?at(m.pop,1,10):2).attr("d",g);const u=n[n.length-1],v=W(u,m);Number.isFinite(v)&&v>=b&&v<=M&&x.append("text").attr("x",r+5).attr("y",L(v)).attr("dy","0.35em").attr("font-size",10).attr("fill",m.color).text(m.label)});const E=c.select("#cwi-tooltip"),P=c.bisector(m=>m.year).left,N=x.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",i).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");x.append("rect").attr("width",r).attr("height",i).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",m=>{const[g]=c.pointer(m),u=w.invert(g),v=P(n,u),y=n[Math.max(0,v-1)],S=n[Math.min(n.length-1,v)],I=S&&Math.abs(u-S.year)<Math.abs(u-y.year)?S:y;if(!I)return;N.attr("x1",w(I.year)).attr("x2",w(I.year)).style("display",null);const F=`<strong>${I.year}</strong><br>`+B.map(z=>{const R=W(I,z);return`<span style="color:${z.color}">${z.label}</span>: ${V(R)}`}).join("<br>");E.html(F).style("display","block").style("left",m.clientX+16+"px").style("top",m.clientY-60+"px")}).on("mouseleave",()=>{N.style("display","none"),E.style("display","none")})}function Rt(t,e,s,o,a,n){if(s==="juxtaposition"){const x=a.includes("income")?Q("income"):[],q=a.includes("wealth")?Q("wealth"):[],_=[...x.flatMap(u=>B.map(v=>W(u,v))),...q.flatMap(u=>B.map(v=>W(u,v)))].filter(Number.isFinite),E=c.min(_),P=c.max(_),N=(n==null?void 0:n.min)!=null||(n==null?void 0:n.max)!=null,m=[(n==null?void 0:n.min)!=null?n.min:E,(n==null?void 0:n.max)!=null?n.max:P];if(a.length>1){const u=document.createElement("p");u.className="cwi-note",u.textContent="Solid line = income · Dashed line = wealth. All panels share the same Y axis.",t.appendChild(u)}const g=document.createElement("div");g.className="cwi-sm-grid",t.appendChild(g),B.forEach(u=>{const v=U(g,u.label),y=document.createElementNS("http://www.w3.org/2000/svg","svg");v.appendChild(y),Ht(y,u,a,o,e,m,N)});return}if(a.length===1){const x=U(t,a[0]==="income"?"Income over time":"Wealth over time"),q=document.createElementNS("http://www.w3.org/2000/svg","svg");x.appendChild(q),Vt(q,a[0],o,e,n);return}const h=U(t,"Superposed indexed lines (income solid, wealth dashed)"),p=document.createElement("div");p.className="cwi-inline-legend",p.innerHTML='<span><i style="background:#495057"></i><span>Income solid</span></span><span><i style="background:#ffffff;border:2px dashed #495057"></i><span>Wealth dashed, indexed to 100</span></span>',h.appendChild(p);const d=c.select(h).append("svg").attr("class","cwi-svg tall"),l=840,r=380,i={top:20,right:120,bottom:28,left:70},f=l-i.left-i.right,$=r-i.top-i.bottom,k=nt(),b=k.map(x=>({year:x,income:j("income",x),wealth:j("wealth",x)})),M=c.scaleLinear().domain(c.extent(k)).range([0,f]),w=c.scaleLinear().domain([0,260]).range([$,0]);d.attr("viewBox",`0 0 ${l} ${r}`);const L=d.append("g").attr("transform",`translate(${i.left},${i.top})`);L.append("g").attr("transform",`translate(0,${$})`).call(c.axisBottom(M).tickFormat(c.format("d"))),L.append("g").call(c.axisLeft(w).ticks(6).tickFormat(x=>`${Math.round(x)}%`)),B.forEach(x=>{const q=Math.abs(W(b[0].income,x))||1,_=Math.abs(W(b[0].wealth,x))||1,E=c.line().x(m=>M(m.year)).y(m=>w(Math.abs(W(m.income,x))/q*100)),P=c.line().x(m=>M(m.year)).y(m=>w(Math.abs(W(m.wealth,x))/_*100)),N=o?at(x.pop,1,7):2;L.append("path").datum(b).attr("fill","none").attr("stroke",x.color).attr("stroke-width",N).attr("d",E),L.append("path").datum(b).attr("fill","none").attr("stroke",x.color).attr("stroke-width",N).attr("stroke-dasharray","5 4").attr("opacity",.85).attr("d",P)})}function Kt(t,e,s,o,a,n){const h=(l,r)=>{const i=Q(r),f=i[i.length-1],$=i.flatMap(T=>B.map(A=>T.values[A.key]||0)),k=c.min($),b=c.max($),M=Math.min(0,k*1.12),w=b*1.06,L=(n==null?void 0:n.min)!=null?n.min:M,x=(n==null?void 0:n.max)!=null?n.max:w,q=700,_=340,E=22,N={top:20,right:o?148:112,bottom:28,left:80},m=q-N.left-N.right,g=_-N.top-N.bottom,u=c.select(l);u.attr("class","cwi-svg").attr("viewBox",`0 0 ${q} ${_}`),u.selectAll("*").remove();const v=c.scaleLinear().domain(c.extent(i,T=>T.year)).range([0,m]),y=c.scaleLinear().domain([L,x]).range([g,0]),S=`clip-area-${r}-${Math.random().toString(36).slice(2)}`;u.append("defs").append("clipPath").attr("id",S).append("rect").attr("width",m).attr("height",g);const I=u.append("g").attr("transform",`translate(${N.left},${N.top})`);I.append("g").attr("transform",`translate(0,${g})`).call(c.axisBottom(v).tickFormat(c.format("d"))),I.append("g").call(c.axisLeft(y).ticks(6).tickFormat(V)),L<0&&x>0&&I.append("line").attr("x1",0).attr("x2",m).attr("y1",y(0)).attr("y2",y(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),I.selectAll(".yr-ref").data(e).join("line").attr("x1",T=>v(T)).attr("x2",T=>v(T)).attr("y1",0).attr("y2",g).attr("stroke","#e9ecef");const z=[...[...B,{key:"middle40",label:"Middle 40%",pop:40,color:"#dee2e6"}]].sort((T,A)=>Math.abs(f.values[A.key]||0)-Math.abs(f.values[T.key]||0)),R=I.append("g").attr("clip-path",`url(#${S})`);if(z.forEach(T=>{const A=c.area().x(Y=>v(Y.year)).y0(y(Math.max(L,Math.min(x,0)))).y1(Y=>y(Math.max(L,Math.min(x,Y.values[T.key]||0))));R.append("path").datum(i).attr("fill",T.color).attr("opacity",T.key==="middle40"?.35:.72).attr("d",A)}),B.forEach(T=>{const A=f.values[T.key]||0;Number.isFinite(A)&&A>=L&&A<=x&&I.append("text").attr("x",m+5).attr("y",y(A)).attr("dy","0.35em").attr("font-size",10).attr("fill",T.color).text(T.label)}),o){const T=m+104;I.append("text").attr("x",T+E/2).attr("y",-7).attr("text-anchor","middle").attr("font-size",9).attr("fill","#6c757d").text("Pop.");const A=B.map(J=>at(J.pop,.1,1)),Y=c.sum(A);let X=0;B.forEach((J,Z)=>{const H=Math.max(2,A[Z]/Y*g);I.append("rect").attr("x",T).attr("y",X).attr("width",E).attr("height",H).attr("rx",2).attr("fill",J.color).attr("opacity",.85),H>=10&&I.append("text").attr("x",T+E/2).attr("y",X+H/2).attr("dy","0.35em").attr("text-anchor","middle").attr("font-size",8).attr("fill","#fff").attr("pointer-events","none").text(`${J.pop}%`),X+=H})}const G=c.select("#cwi-tooltip"),tt=c.bisector(T=>T.year).left,D=I.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",g).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");I.append("rect").attr("width",m).attr("height",g).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",T=>{const[A]=c.pointer(T),Y=v.invert(A),X=tt(i,Y),J=i[Math.max(0,X-1)],Z=i[Math.min(i.length-1,X)],H=Z&&Math.abs(Y-Z.year)<Math.abs(Y-J.year)?Z:J;if(!H)return;D.attr("x1",v(H.year)).attr("x2",v(H.year)).style("display",null);const pt=`<strong>${H.year}</strong><br>`+B.map(ot=>{const K=H.values[ot.key]||0;return`<span style="color:${ot.color}">${ot.label}</span>: ${V(K)}`}).join("<br>");G.html(pt).style("display","block").style("left",T.clientX+16+"px").style("top",T.clientY-60+"px")}).on("mouseleave",()=>{D.style("display","none"),G.style("display","none")})},d=(l=>{if(a.length===1)return l;const r=document.createElement("div");return r.className="cwi-grid-2",l.appendChild(r),r})(t);a.forEach(l=>{const i=U(d,l==="income"?"Average pre-tax income per person (SEK, linear scale, gray = Middle 40%)":"Average net wealth per person (SEK, linear scale, gray = Middle 40%, below 0 = net debt)"),f=document.createElementNS("http://www.w3.org/2000/svg","svg");i.appendChild(f),h(f,l)})}function St(t){const e=j("income",t),s=c.sum(Wt,o=>Math.max(0,e.totals[o]||0));return B.map(o=>{const a=Math.max(0,e.totals[o.key]||0);return s>0?a/s*100:0})}function Tt(t,e,s,o,a,n,h){e.forEach(l=>{t.append("rect").attr("x",l.x).attr("y",l.y).attr("width",s).attr("height",o).attr("rx",3).attr("fill",h)});let p=0;a.map((l,r)=>{const i={start:p,end:p+l,color:n[r]};return p+=l,i}).forEach(l=>{e.forEach(r=>{const i=Math.max(r.i,l.start),f=Math.min(r.i+1,l.end);if(f<=i+.001)return;const $=i-r.i,k=f-r.i,b=k-$>=.999,M=r.y+o*(1-k),w=Math.max(1,o*(k-$));t.append("rect").attr("x",r.x).attr("y",M).attr("width",s).attr("height",w).attr("rx",b?3:1).attr("fill",l.color)})})}function Mt(t,e,s){const o=c.select(t),a=250,n=s?290:240,h=20,p=St(e);o.attr("class","cwi-svg").attr("viewBox",`0 0 ${a} ${n}`),o.selectAll("*").remove();const d=c.range(100).map(r=>({i:r,x:15+r%10*22,y:15+(9-Math.floor(r/10))*22})),l=o.append("g");if(Tt(l,d,h,h,p,B.map(r=>r.color),"#eef1ea"),s){const r=[...B.map(k=>k.pop),40],i=[...B.map(k=>k.color),"#dee2e6"],f=Ct(r);let $=0;o.append("text").attr("x",15).attr("y",255).attr("font-size",10).attr("fill","#5f6368").text("Population strip (gray = Middle 40%)"),f.forEach((k,b)=>{for(let M=0;M<k;M+=1)o.append("rect").attr("x",15+$*2.05).attr("y",265).attr("width",1.8).attr("height",10).attr("rx",1).attr("fill",i[b]).attr("opacity",.75),$+=1})}}function Gt(t,e,s,o){const a=document.createElement("div");if(a.className="cwi-note",a.textContent="Income waffle shares: population share × average income for each disjoint group. Wealth excluded (negative values).",t.appendChild(a),s==="juxtaposition"){B.forEach((n,h)=>{const p=document.createElement("div");p.style.cssText="margin-bottom:1.2rem;";const d=document.createElement("h4");d.textContent=n.label,d.style.cssText=`font-size:0.95rem;font-weight:700;color:${n.color};margin:0 0 0.4rem;`,p.appendChild(d);const l=document.createElement("div");l.style.cssText="display:flex;flex-wrap:wrap;gap:0.6rem;",e.forEach(r=>{const i=U(l,String(r));i.style.minWidth="170px";const $=St(r)[h],k=c.select(i).append("svg").attr("class","cwi-svg").attr("viewBox","0 0 240 240"),b=c.range(100).map(L=>({i:L,x:10+L%10*22,y:10+(9-Math.floor(L/10))*22})),M=k.append("g");Tt(M,b,20,20,[$],[n.color],"#e9ecef");const w=document.createElement("p");w.textContent=`${$.toFixed(2)}%`,w.style.cssText="text-align:center;font-size:0.8rem;color:#5f6368;margin:0.2rem 0 0;",i.appendChild(w)}),p.appendChild(l),t.appendChild(p)});return}if(s==="superposition"){const n=document.createElement("div");n.className="cwi-years-grid";const h=document.createElement("div");h.className="cwi-inline-legend",h.style.marginBottom="0.6rem",B.forEach(p=>{const d=document.createElement("span");d.innerHTML=`<i style="background:${p.color}"></i><span>${p.label}</span>`,h.appendChild(d)}),t.appendChild(h),t.appendChild(n),e.forEach(p=>{const d=U(n,String(p)),l=document.createElementNS("http://www.w3.org/2000/svg","svg");d.appendChild(l),Mt(l,p,o)});return}yt(t,nt(),(n,h)=>{h.innerHTML="";const p=document.createElementNS("http://www.w3.org/2000/svg","svg");h.appendChild(p),Mt(p,n,o)},"Animated income waffle")}function Ut(){Pt();const t=document.getElementById("cwi-spec-summary"),e=document.getElementById("cwi-years-input"),s=document.getElementById("cwi-representation"),o=document.getElementById("cwi-comparison"),a=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),h=document.getElementById("cwi-meta"),p=document.getElementById("cwi-note"),d=document.getElementById("cwi-render-root");if(!t||!e||!s||!o||!a||!n||!h||!p||!d)return;const l=document.getElementById("cwi-yview"),r=document.getElementById("cwi-ymax-slider"),i=document.getElementById("cwi-ymin-slider"),f=document.getElementById("cwi-ymax-val"),$=document.getElementById("cwi-ymin-val"),k=document.getElementById("cwi-yview-reset");let b={min:null,max:null},M=0,w=1;const L=g=>{const u=g.flatMap(v=>Q(v).flatMap(y=>B.map(S=>y.values[S.key]||0))).filter(Number.isFinite);return{dMin:c.min(u),dMax:c.max(u)}},x=g=>{const u=Math.max(5,Math.log10(Math.abs(w))-4.5),v=Math.log10(Math.abs(w));return Math.pow(10,u+(v-u)*g/1e3)},q=g=>M>=0?0:M*(1-g/1e3),_=g=>{const u=Math.max(5,Math.log10(Math.abs(w))-4.5),v=Math.log10(Math.abs(w));return Math.max(0,Math.min(1e3,Math.round((Math.log10(Math.max(g,1))-u)/(v-u)*1e3)))},E=g=>M>=0?1e3:Math.max(0,Math.min(1e3,Math.round((1-g/M)*1e3))),P=()=>{const g=b.max!=null?b.max:w,u=b.min!=null?b.min:Math.min(0,M);f.textContent=V(g),$.textContent=V(u)},N=()=>{const g=b.max!=null?b.max:w,u=b.min!=null?b.min:Math.min(0,M);r.value=_(g),i.value=E(u),P()};r.addEventListener("input",()=>{b.max=x(Number(r.value)),P(),m()}),i.addEventListener("input",()=>{b.min=q(Number(i.value)),P(),m()}),k.addEventListener("click",()=>{b={min:null,max:null},N(),m()}),t.innerHTML="<strong>30 combinations</strong> from 5 representations × 3 comparison conditions × 2 population encodings, minus <strong>2 invalid animation cases</strong> for line and stacked area charts. That leaves <strong>28 valid configurations</strong>.";const m=()=>{O&&(clearInterval(O),O=null);const g=Ft(e.value),u=s.value,v=n.value==="with";a.disabled=u==="waffle",u==="waffle"&&(a.value="income");const y=a.value==="both"?["income","wealth"]:[a.value];Array.from(o.options).forEach(F=>{F.disabled=(u==="line"||u==="stacked")&&F.value==="animation"}),(u==="line"||u==="stacked")&&o.value==="animation"&&(o.value="juxtaposition");const S=o.value;if(u==="line"||u==="bar"||u==="stacked"){l.classList.remove("hidden");const{dMin:F,dMax:z}=L(y);M=F,w=z;const R=y.includes("wealth")&&F<0;document.getElementById("cwi-ymin-row").style.display=R?"":"none",N()}else l.classList.add("hidden"),b={min:null,max:null};const I=y.length===2?"income + wealth":y[0];h.textContent=`Configuration: ${u} / ${S} / ${I} / ${v?"with":"without"} pop. encoding. Years: ${g.join(", ")}.`,p.textContent=u==="waffle"?"Waffle charts show income only — wealth has negative values that cannot map to waffle proportions.":u==="line"||u==="stacked"?"Line and stacked-area charts use the full time series; selected years are marked as reference points.":"Discrete views use the selected comparison years directly. Edit the year list above to change time points.",d.innerHTML="",u==="table"&&jt(d,g,S,v,y),u==="bar"&&Yt(d,g,S,v,y,b),u==="line"&&Rt(d,g,S,v,y,b),u==="stacked"&&Kt(d,g,S,v,y,b),u==="waffle"&&Gt(d,g,S,v)};s.addEventListener("change",m),o.addEventListener("change",m),a.addEventListener("change",m),n.addEventListener("change",m),e.addEventListener("change",m),e.addEventListener("blur",m),m()}const ft="1.0",qt="wealth-study-data",et=[{id:"consent",type:"info",title:"Participant Information & Consent",content:`
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
      <p><strong>Contact:</strong> Submit your downloaded JSON file to the researcher as instructed.</p>`}],C={currentStep:0,startTime:Date.now(),stepTimes:{},answers:{},participantId:Math.random().toString(36).slice(2,9)};function Xt(t){const e=document.getElementById("cwi-representation"),s=document.getElementById("cwi-comparison"),o=document.getElementById("cwi-metric"),a=document.getElementById("cwi-pop-encoding"),n=document.getElementById("cwi-years-input");e&&(t.representation&&(e.value=t.representation),t.years&&(n.value=t.years,n.dispatchEvent(new Event("change"))),t.metric&&(o.value=t.metric),t.comparison&&(s.value=t.comparison),t.popEncoding&&(a.value=t.popEncoding),e.dispatchEvent(new Event("change")))}function Lt(t,e,s={}){C.answers[t]={value:e,timestamp:Date.now(),elapsed:Date.now()-(C.stepTimes[t]||C.startTime),...s},localStorage.setItem(qt,JSON.stringify({state:C,version:ft}))}function Jt(){et.find(a=>a.id==="pre_q1");const t={participantId:C.participantId,studyVersion:ft,startTime:new Date(C.startTime).toISOString(),completedTime:new Date().toISOString(),answers:C.answers,summary:It()},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),s=URL.createObjectURL(e),o=document.createElement("a");o.href=s,o.download=`study-${C.participantId}.json`,o.click(),URL.revokeObjectURL(s)}function It(){var o,a,n,h,p,d,l;const t=["pre_q1","pre_q2","pre_q3"],e=["post_q1","post_q2","post_q3"],s=r=>r.reduce((i,f)=>{const $=et.find(b=>b.id===f),k=C.answers[f];return!$||!k||!$.correctValue?i:i+(k.value===$.correctValue?1:0)},0);return{preStudyScore:`${s(t)} / ${t.length}`,postStudyScore:`${s(e)} / ${e.length}`,task2_tableCorrect:((o=C.answers.task2)==null?void 0:o.value)==="b",task3_chartCorrect:((a=C.answers.task3)==null?void 0:a.value)==="b",task4_noEncoding:(n=C.answers.task4)==null?void 0:n.value,task5_withEncoding:(h=C.answers.task5)==null?void 0:h.value,task5Correct:((p=C.answers.task5)==null?void 0:p.value)==="e",populationEncodingRating:(d=C.answers.post_q4)==null?void 0:d.value,preferredChart:(l=C.answers.post_q5)==null?void 0:l.value}}function bt(){const t=et[C.currentStep];C.stepTimes[t.id]=Date.now();const e=document.getElementById("study-overlay"),s=document.getElementById("study-panel"),o=document.getElementById("study-task-banner");t.type==="task"?(e.classList.add("hidden"),o.classList.remove("hidden"),Xt(t.vizConfig),Dt(t,o)):(o.classList.add("hidden"),e.classList.remove("hidden"),t.type==="info"&&Qt(t,s),t.type==="question"&&Zt(t,s),t.type==="complete"&&Ot(t,s)),te()}function Qt(t,e){var s,o;if(e.innerHTML=`
    <div class="study-phase-tag">Information</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-nav">
      ${C.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${t.requireConsent?"disabled":""}>${t.nextLabel||"Next →"}</button>
    </div>`,t.requireConsent){const a=e.querySelector("#consent-checkbox"),n=e.querySelector("#study-next");a.addEventListener("change",()=>{n.disabled=!a.checked})}(s=e.querySelector("#study-next"))==null||s.addEventListener("click",gt),(o=e.querySelector("#study-prev"))==null||o.addEventListener("click",xt)}function Zt(t,e){var o,a;const s=(o=C.answers[t.id])==null?void 0:o.value;e.innerHTML=`
    <div class="study-phase-tag">${t.phase} — Question ${t.questionNum}</div>
    <h2 class="study-title">${t.text}</h2>
    ${t.note?`<p class="study-note">${t.note}</p>`:""}
    <div class="study-options" id="study-options">
      ${t.options.map(n=>`
        <label class="study-option ${s===n.value?"selected":""}">
          <input type="radio" name="sq" value="${n.value}" ${s===n.value?"checked":""}/>
          ${n.label}
        </label>`).join("")}
    </div>
    <div class="study-nav">
      ${C.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${s?"":"disabled"}>Next →</button>
    </div>`,e.querySelectorAll(".study-option").forEach(n=>{n.addEventListener("click",()=>{e.querySelectorAll(".study-option").forEach(p=>p.classList.remove("selected")),n.classList.add("selected");const h=n.querySelector("input").value;Lt(t.id,h),e.querySelector("#study-next").disabled=!1})}),e.querySelector("#study-next").addEventListener("click",gt),(a=e.querySelector("#study-prev"))==null||a.addEventListener("click",xt)}let dt="description";function Dt(t,e){dt="description",e.innerHTML=ut(t),ht(t,e)}function ut(t){var s;const e=(s=C.answers[t.id])==null?void 0:s.value;return dt==="description"?`
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
    </div>`}function ht(t,e){var s,o,a,n;(s=e.querySelector("#task-back"))==null||s.addEventListener("click",()=>{xt()}),(o=e.querySelector("#task-ready"))==null||o.addEventListener("click",()=>{dt="question",e.innerHTML=ut(t),ht(t,e)}),(a=e.querySelector("#task-back-q"))==null||a.addEventListener("click",()=>{dt="description",e.innerHTML=ut(t),ht(t,e)}),e.querySelectorAll(".task-option").forEach(h=>{h.addEventListener("click",()=>{e.querySelectorAll(".task-option").forEach(d=>d.classList.remove("selected")),h.classList.add("selected");const p=h.querySelector("input").value;Lt(t.id,p),e.querySelector("#task-submit").disabled=!1})}),(n=e.querySelector("#task-submit"))==null||n.addEventListener("click",gt)}function Ot(t,e){const s=It();e.innerHTML=`
    <div class="study-phase-tag">Complete</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-summary">
      <h3>Your response summary</h3>
      <table class="summary-table">
        <tr><th>Pre-study knowledge score</th><td>${s.preStudyScore}</td></tr>
        <tr><th>Post-study knowledge score</th><td>${s.postStudyScore}</td></tr>
        <tr><th>Task 2 (table) — correct?</th><td>${s.task2_tableCorrect?"✓ Yes":"✗ No"}</td></tr>
        <tr><th>Task 3 (bar chart) — correct?</th><td>${s.task3_chartCorrect?"✓ Yes":"✗ No"}</td></tr>
        <tr><th>Task 4 (no encoding) — group size answer</th><td>${s.task4_noEncoding??"—"}</td></tr>
        <tr><th>Task 5 (with encoding) — correct?</th><td>${s.task5Correct?"✓ Yes (Top 0.001%)":"✗ No"}</td></tr>
        <tr><th>Population encoding helpfulness</th><td>${s.populationEncodingRating??"—"} / 5</td></tr>
        <tr><th>Preferred chart type</th><td>${s.preferredChart??"—"}</td></tr>
      </table>
    </div>
    <div class="study-nav centered">
      <button class="study-btn primary large" id="study-download">⬇ Download my data (JSON)</button>
    </div>`,e.querySelector("#study-download").addEventListener("click",Jt)}function te(){const t=document.getElementById("study-progress-bar"),e=document.getElementById("study-progress-label"),s=et.length-1,o=Math.round(C.currentStep/s*100);t&&(t.style.width=o+"%"),e&&(e.textContent=`Step ${C.currentStep+1} of ${et.length}`)}function gt(){C.currentStep<et.length-1&&(C.currentStep++,bt())}function xt(){C.currentStep>0&&(C.currentStep--,bt())}function ee(){ae(),ne();try{const t=localStorage.getItem(qt);if(t){const e=JSON.parse(t);e.version===ft&&e.state&&Object.assign(C,e.state)}}catch{}document.getElementById("study-launch-btn").addEventListener("click",()=>{document.getElementById("study-launcher").classList.add("hidden"),document.getElementById("study-overlay").classList.remove("hidden"),bt()})}function ae(){document.body.insertAdjacentHTML("beforeend",`
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
  `),new MutationObserver(()=>{const e=document.getElementById("study-overlay"),s=document.getElementById("study-task-banner"),o=document.getElementById("study-progress-container");e.classList.contains("hidden")&&s.classList.contains("hidden")&&C.currentStep===0?o.classList.add("hidden"):o.classList.remove("hidden")}).observe(document.getElementById("study-overlay"),{attributes:!0})}function ne(){const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t)}ee();
