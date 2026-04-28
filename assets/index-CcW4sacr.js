(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function o(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=o(a);fetch(a.href,n)}})();const p=window.d3;function Tt(t){const e=t.map(Math.floor);let o=100-p.sum(e);const s=t.map((a,n)=>({i:n,frac:a-Math.floor(a)})).sort((a,n)=>n.frac-a.frac);for(let a=0;a<s.length&&o>0;a+=1)e[s[a].i]+=1,o-=1;return e}const bt=[{key:"bottom50",label:"Bottom 50%",color:"#4dabf7",pop:50},{key:"top10",label:"Top 10%",color:"#fcc419",pop:10},{key:"top1",label:"Top 1%",color:"#ff8787",pop:1},{key:"top01",label:"Top 0.1%",color:"#e599f7",pop:.1},{key:"top001",label:"Top 0.01%",color:"#ff6b6b",pop:.01},{key:"top0001",label:"Top 0.001%",color:"#c92a2a",pop:.001}];p.scaleSqrt().domain([.001,50]).range([.6,6]);let Q=[];async function $t(){const e=(await p.text("./data/wealth_avg.csv")).split(`
`),o=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};Q=[];for(let a=1;a<e.length;a++){const n=e[a].split(",");if(n.length<o.length)continue;const d=Number(n[0]);if(!Number.isFinite(d))continue;const r={year:d};let u=!0;for(let l=1;l<o.length;l++){const i=s[o[l].trim()];if(!i)continue;const c=Number(n[l]);if(!Number.isFinite(c)){u=!1;break}r[i]=c}u&&r.bottom50!==void 0&&Q.push(r)}Q.sort((a,n)=>a.year-n.year),new Map(Q.map(a=>[a.year,a]))}let X=[];async function qt(){const e=(await p.text("./data/income_avg.csv")).split(`
`),o=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};X=[];for(let a=1;a<e.length;a++){const n=e[a].split(",");if(n.length<2)continue;const d=Number(n[0]);if(!Number.isFinite(d))continue;const r={year:d};for(let u=1;u<o.length;u++){const l=s[o[u].trim()];l&&(r[l]=Number(n[u])||0)}r.bottom50!==void 0&&X.push(r)}X.sort((a,n)=>a.year-n.year),new Map(X.map(a=>[a.year,a]))}function Lt(t){const e=Math.abs(t);return e>=1e9?(t/1e9).toFixed(1)+"B":e>=1e6?(t/1e6).toFixed(1)+"M":e>=1e3?(t/1e3).toFixed(0)+"K":t.toFixed(0)}function ht(t){return t>=1?`${t}%`:t>=.1?`${t.toFixed(1)}%`:t>=.01?`${t.toFixed(2)}%`:`${t.toFixed(3)}%`}function R(t){const e=Math.abs(t);return e>=1e9?`${(t/1e9).toFixed(e>=1e10?0:1)}B`:e>=1e6?`${(t/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(t/1e3).toFixed(e>=1e5?0:1)}K`:`${Math.round(t)}`}bt.filter(t=>["top0001","top001"].includes(t.key));bt.filter(t=>!["top0001","top001"].includes(t.key));p.scaleSqrt().domain([.001,50]).range([.6,6]);async function It(){await Promise.all([$t(),qt()]),Vt()}It();const Ct=[1980,1990,2e3,2010,2020,2024],L=[{key:"bottom50",label:"Bottom 50%",pop:50,color:"#4dabf7"},{key:"top9",label:"Top 9%",pop:9,color:"#ffd43b"},{key:"top0_9",label:"Top 0.9%",pop:.9,color:"#ff922b"},{key:"top0_09",label:"Top 0.09%",pop:.09,color:"#f06595"},{key:"top0_009",label:"Top 0.009%",pop:.009,color:"#e64980"},{key:"top0_001",label:"Top 0.001%",pop:.001,color:"#c92a2a"}],Bt=["bottom50","middle40","top9","top0_9","top0_09","top0_009","top0_001"];function G(t,e,o){const s=Math.log10(.001),a=Math.log10(50),n=(Math.log10(Math.max(t,1e-4))-s)/(a-s);return e+n*(o-e)}let D=[],O=[],gt=new Map,rt=new Map,Y=null;function mt(t){if(!t)return null;const e={bottom50:t.bottom50*50,middle40:t.mid40*40,top10:t.top10*10,top1:t.top1*1,top01:t.top01*.1,top001:t.top001*.01,top0001:t.top0001*.001};return{year:t.year,values:{bottom50:t.bottom50,middle40:t.mid40,top9:(e.top10-e.top1)/9,top0_9:(e.top1-e.top01)/.9,top0_09:(e.top01-e.top001)/.09,top0_009:(e.top001-e.top0001)/.009,top0_001:t.top0001},totals:{bottom50:e.bottom50,middle40:e.middle40,top9:e.top10-e.top1,top0_9:e.top1-e.top01,top0_09:e.top01-e.top001,top0_009:e.top001-e.top0001,top0_001:e.top0001}}}function Nt(){D.length&&O.length||(D=X.map(mt).filter(Boolean),O=Q.map(mt).filter(Boolean),gt=new Map(D.map(t=>[t.year,t])),rt=new Map(O.map(t=>[t.year,t])))}function J(){return D.map(t=>t.year).filter(t=>rt.has(t))}function At(t){var s;const e=new Set(J()),o=Array.from(new Set(((s=String(t).match(/\d{4}/g))==null?void 0:s.map(Number))||[])).filter(a=>e.has(a)).sort((a,n)=>a-n);return o.length?o:Ct.filter(a=>e.has(a))}function W(t,e){return(t==="income"?gt:rt).get(e)}function K(t){return t==="income"?D:O}function z(t,e,o){return t.values[e.key]}function Z(t){return`${Lt(t)} SEK`}function P(t,e){const o=document.createElement("div");if(o.className="cwi-card",e){const s=document.createElement("h3");s.textContent=e,o.appendChild(s)}return t.appendChild(o),o}function it(t,e,o,s){const a=document.createElement("div");a.className="cwi-anim-bar",a.innerHTML=`<button type="button" id="cwi-matrix-play">Play</button><input type="range" id="cwi-matrix-year" min="0" max="${e.length-1}" step="1" value="0"><span id="cwi-matrix-year-label">${e[0]}</span>`,t.appendChild(a);const n=P(t,s),d=document.createElement("div");n.appendChild(d);const r=a.querySelector("#cwi-matrix-year"),u=a.querySelector("#cwi-matrix-play"),l=a.querySelector("#cwi-matrix-year-label"),i=c=>{const y=e[c];l.textContent=String(y),o(y,d)};r.addEventListener("input",()=>i(Number(r.value))),u.addEventListener("click",()=>{if(Y){clearInterval(Y),Y=null,u.textContent="Play";return}u.textContent="Pause",Y=setInterval(()=>{const c=(Number(r.value)+1)%e.length;r.value=String(c),i(c)},900)}),i(0)}function _t(t,e,o,s,a){const n=a.includes("income"),d=a.includes("wealth"),r=`${n?"<th>Income</th>":""}${d?"<th>Wealth</th>":""}`,u=(l,i,c)=>{const y=s?`<td>${ht(l.pop)}</td>`:"",v=n?`<td>${Z(i.values[l.key])}</td>`:"",g=d?`<td>${Z(c.values[l.key])}</td>`:"";return`<tr><td>${l.label}</td>${y}${v}${g}</tr>`};if(o==="juxtaposition"){const l=document.createElement("div");l.className="cwi-years-grid",t.appendChild(l),e.forEach(i=>{const c=P(l,String(i)),y=document.createElement("table");y.className="cwi-table",y.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${r}</tr></thead><tbody>${L.map(v=>u(v,W("income",i),W("wealth",i))).join("")}</tbody>`,c.appendChild(y)});return}if(o==="superposition"){const l=P(t,"Combined table across selected years"),i=document.createElement("table");i.className="cwi-table";const c=a.length,y=`<tr><th rowspan="2">Group</th>${s?'<th rowspan="2">Pop.</th>':""}${e.map(m=>`<th colspan="${c}">${m}</th>`).join("")}</tr>`,v=`<tr>${e.map(()=>`${n?"<th>Income</th>":""}${d?"<th>Wealth</th>":""}`).join("")}</tr>`,g=L.map(m=>{const b=e.map(k=>{const $=W("income",k),x=W("wealth",k);return`${n?`<td>${Z($.values[m.key])}</td>`:""}${d?`<td>${Z(x.values[m.key])}</td>`:""}`}).join("");return`<tr><td>${m.label}</td>${s?`<td>${ht(m.pop)}</td>`:""}${b}</tr>`}).join("");i.innerHTML=`<thead>${y}${v}</thead><tbody>${g}</tbody>`,l.appendChild(i);return}it(t,J(),(l,i)=>{i.innerHTML="";const c=document.createElement("table");c.className="cwi-table",c.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${r}</tr></thead><tbody>${L.map(y=>u(y,W("income",l),W("wealth",l))).join("")}</tbody>`,i.appendChild(c)},"Animated table")}function ft(t,e,o,s){const a=p.select(t),n=520,d=310,r={top:18,right:16,bottom:20,left:120},u=n-r.left-r.right,l=d-r.top-r.bottom,i=L.map(b=>z(e,b)),c=p.min(i),y=p.max(i),v=o==="wealth"?p.scaleSymlog().constant(1e6).domain([Math.min(0,c*1.1),y*1.05]).range([0,u]):p.scaleLinear().domain([0,y*1.05]).range([0,u]),g=l/L.length;a.attr("class","cwi-svg").attr("viewBox",`0 0 ${n} ${d}`),a.selectAll("*").remove();const m=a.append("g").attr("transform",`translate(${r.left},${r.top})`);o==="wealth"&&m.append("line").attr("x1",v(0)).attr("x2",v(0)).attr("y1",0).attr("y2",l).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),L.forEach((b,k)=>{const $=z(e,b),x=s?G(b.pop,g*.18,g*.82):g*.7,I=k*g+g/2,M=I-x/2,E=v(o==="wealth"?Math.min(0,$):0),S=v($);m.append("text").attr("x",-10).attr("y",I).attr("dy","0.35em").attr("text-anchor","end").attr("font-size",10).text(b.label),m.append("rect").attr("x",Math.min(E,S)).attr("y",M).attr("width",Math.max(2,Math.abs(S-E))).attr("height",x).attr("rx",4).attr("fill",b.color),m.append("text").attr("x",$>=0?Math.max(E,S)+6:Math.min(E,S)-6).attr("y",I).attr("dy","0.35em").attr("text-anchor",$>=0?"start":"end").attr("font-size",10).text(Z($))})}function zt(t,e,o,s,a){const n=d=>{if(a.length===1)return d;const r=document.createElement("div");return r.className="cwi-grid-2",d.appendChild(r),r};if(o==="juxtaposition"){const d=document.createElement("div");d.className="cwi-years-grid",t.appendChild(d),e.forEach(r=>{const u=P(d,String(r)),l=n(u);a.forEach(i=>{const c=document.createElement("div");c.innerHTML=`<p class="cwi-chart-title">${i==="income"?"Income":"Wealth"}</p>`;const y=document.createElementNS("http://www.w3.org/2000/svg","svg");c.appendChild(y),l.appendChild(c),ft(y,W(i,r),i,s)})});return}if(o==="superposition"){const d=n(t);a.forEach(r=>{const i=P(d,r==="income"?"Income by year — SEK  (dashed = baseline year)":"Wealth by year — SEK  (dashed = baseline year)"),c=(f,h)=>f?z(f,h):0,y=W(r,e[0]);p.sum(L,f=>f.pop);const v=e.flatMap(f=>L.map(h=>c(W(r,f),h))),g=p.max(v.map(Math.abs))*1.1,m=Math.min(0,p.min(v))*1.1,b=et(m,g),k=700,$=360,x={top:24,right:16,bottom:44,left:72},I=k-x.left-x.right,M=$-x.top-x.bottom,S=p.select(i).append("svg").attr("class","cwi-svg").attr("viewBox",`0 0 ${k} ${$}`).append("g").attr("transform",`translate(${x.left},${x.top})`),N=p.scaleBand().domain(e).range([0,I]).paddingInner(.2),w=p.scaleSymlog().constant(1e5).domain([m,g]).range([M,0]);S.append("g").attr("transform",`translate(0,${M})`).call(p.axisBottom(N).tickFormat(p.format("d"))),S.append("g").call(p.axisLeft(w).tickValues(b).tickFormat(R)),m<0&&S.append("line").attr("x1",0).attr("x2",I).attr("y1",w(0)).attr("y2",w(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),e.forEach(f=>{const h=W(r,f);if(!h)return;const T=N.bandwidth(),A=2,_=L.length,C=T-A*_,B=L.map(F=>G(F.pop,.1,1)),H=p.sum(B);let j=N(f);L.forEach((F,at)=>{const V=Math.max(s?B[at]/H*C:C/_,3),nt=c(h,F),Et=nt>=0?w(nt):w(0),St=Math.max(1,Math.abs(w(nt)-w(0)));if(S.append("rect").attr("x",j).attr("y",Et).attr("width",V).attr("height",St).attr("fill",F.color).attr("rx",2).attr("opacity",.85),y&&f!==e[0]){const ut=c(y,F);S.append("line").attr("x1",j).attr("x2",j+V).attr("y1",w(ut)).attr("y2",w(ut)).attr("stroke","#202124").attr("stroke-width",1.5).attr("stroke-dasharray","4 3").attr("opacity",.5)}j+=V+A})})});return}it(t,J(),(d,r)=>{r.innerHTML="";const u=n(r);a.forEach(l=>{const i=document.createElement("div");i.innerHTML=`<p class="cwi-chart-title">${l==="income"?"Income":"Wealth"}</p>`;const c=document.createElementNS("http://www.w3.org/2000/svg","svg");i.appendChild(c),u.appendChild(i),ft(c,W(l,d),l,s)})},"Animated bars")}function et(t,e){const o=[];if(t<0&&o.push(t),o.push(0),e<=0)return o;const s=Math.max(3,Math.log10(e)-3),a=Math.log10(e);for(let n=1;n<=3;n++){const d=Math.pow(10,Math.round(s+(a-s)*n/4));!o.includes(d)&&d<e*.95&&o.push(d)}return o}function Wt(t,e,o,s,a,n,d){const r=p.select(t),u=400,l=250,i={top:14,right:58,bottom:30,left:66},c=u-i.left-i.right,y=l-i.top-i.bottom,v=J(),g=p.scaleLinear().domain(p.extent(v)).range([0,c]),[m,b]=n,k=d?m:m<0?m*1.12:0,$=d?b:b*1.1,x=k<0,I=k>=0&&$/Math.max(Math.abs(k),1)<200,M=I?p.scaleLinear().domain([k,$]).range([y,0]):p.scaleSymlog().constant(1e6).domain([k,$]).range([y,0]),E=I?M.ticks(4):et(m,b);r.attr("class","cwi-svg").attr("viewBox",`0 0 ${u} ${l}`),r.selectAll("*").remove();const S=r.append("g").attr("transform",`translate(${i.left},${i.top})`);S.selectAll("line.hg").data(E).join("line").attr("class","hg").attr("x1",0).attr("x2",c).attr("y1",f=>M(f)).attr("y2",f=>M(f)).attr("stroke","#e8eaed").attr("stroke-width",.8),S.append("g").attr("transform",`translate(0,${y})`).call(p.axisBottom(g).ticks(5).tickFormat(p.format("d"))).call(f=>f.selectAll("text").attr("font-size",10)),S.append("g").call(p.axisLeft(M).tickValues(E).tickFormat(R)).call(f=>f.selectAll("text").attr("font-size",10)),x&&S.append("line").attr("x1",0).attr("x2",c).attr("y1",M(0)).attr("y2",M(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),S.selectAll(".yr-mark").data(a).join("line").attr("class","yr-mark").attr("x1",f=>g(f)).attr("x2",f=>g(f)).attr("y1",0).attr("y2",y).attr("stroke","#dee2e6").attr("stroke-width",1.5);const N=s?G(e.pop,1,10):1.8;o.forEach((f,h)=>{const T=K(f),A=p.line().defined(_=>Number.isFinite(z(_,e))).x(_=>g(_.year)).y(_=>M(z(_,e)));S.append("path").datum(T).attr("fill","none").attr("stroke",e.color).attr("stroke-width",N).attr("stroke-dasharray",h===1?"5 3":null).attr("d",A)});const w=K(o[0]).at(-1);if(w){const f=z(w,e);Number.isFinite(f)&&S.append("text").attr("x",c+4).attr("y",M(f)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(R(f))}}function Ft(t,e,o,s,a){const n=K(e),d=p.select(t),r=620,u=340,l={top:20,right:110,bottom:28,left:70},i=r-l.left-l.right,c=u-l.top-l.bottom,y=n.flatMap(E=>L.map(S=>z(E,S))),v=p.min(y),g=p.max(y),m=(a==null?void 0:a.min)!=null?a.min:e==="wealth"?v*1.1:0,b=(a==null?void 0:a.max)!=null?a.max:g*1.06;(a==null?void 0:a.min)!=null||(a==null?void 0:a.max)!=null;const k=b/Math.max(Math.abs(m),1),$=m>=0&&k<200,x=p.scaleLinear().domain(p.extent(n,E=>E.year)).range([0,i]),I=$?p.scaleLinear().domain([m,b]).range([c,0]):e==="wealth"?p.scaleSymlog().constant(1e6).domain([m,b]).range([c,0]):p.scaleSymlog().constant(1e4).domain([m,b]).range([c,0]);d.attr("class","cwi-svg").attr("viewBox",`0 0 ${r} ${u}`),d.selectAll("*").remove();const M=d.append("g").attr("transform",`translate(${l.left},${l.top})`);M.append("g").attr("transform",`translate(0,${c})`).call(p.axisBottom(x).tickFormat(p.format("d"))),$?M.append("g").call(p.axisLeft(I).ticks(5).tickFormat(R)):M.append("g").call(p.axisLeft(I).tickValues(et(m,b)).tickFormat(R)),m<0&&M.append("line").attr("x1",0).attr("x2",i).attr("y1",I(0)).attr("y2",I(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),M.selectAll(".year-mark").data(s).join("line").attr("x1",E=>x(E)).attr("x2",E=>x(E)).attr("y1",0).attr("y2",c).attr("stroke","#f1f3f5"),L.forEach(E=>{const S=p.line().x(f=>x(f.year)).y(f=>{const h=z(f,E);return h<m||h>b?null:I(h)}).defined(f=>{const h=z(f,E);return Number.isFinite(h)&&h>=m&&h<=b});M.append("path").datum(n).attr("fill","none").attr("stroke",E.color).attr("stroke-width",o?G(E.pop,1,10):2).attr("d",S);const N=n[n.length-1],w=z(N,E);w>=m&&w<=b&&M.append("text").attr("x",i+6).attr("y",I(w)).attr("dy","0.35em").attr("font-size",10).attr("fill",E.color).text(E.label)})}function Pt(t,e,o,s,a,n){if(o==="juxtaposition"){const x=a.includes("income")?K("income"):[],I=a.includes("wealth")?K("wealth"):[],M=[...x.flatMap(h=>L.map(T=>z(h,T))),...I.flatMap(h=>L.map(T=>z(h,T)))].filter(Number.isFinite),E=p.min(M),S=p.max(M),N=(n==null?void 0:n.min)!=null||(n==null?void 0:n.max)!=null,w=[(n==null?void 0:n.min)!=null?n.min:E,(n==null?void 0:n.max)!=null?n.max:S];if(a.length>1){const h=document.createElement("p");h.className="cwi-note",h.textContent="Solid line = income · Dashed line = wealth. All panels share the same Y axis.",t.appendChild(h)}const f=document.createElement("div");f.className="cwi-sm-grid",t.appendChild(f),L.forEach(h=>{const T=P(f,h.label),A=document.createElementNS("http://www.w3.org/2000/svg","svg");T.appendChild(A),Wt(A,h,a,s,e,w,N)});return}if(a.length===1){const x=P(t,a[0]==="income"?"Income over time":"Wealth over time"),I=document.createElementNS("http://www.w3.org/2000/svg","svg");x.appendChild(I),Ft(I,a[0],s,e,n);return}const d=P(t,"Superposed indexed lines (income solid, wealth dashed)"),r=document.createElement("div");r.className="cwi-inline-legend",r.innerHTML='<span><i style="background:#495057"></i><span>Income solid</span></span><span><i style="background:#ffffff;border:2px dashed #495057"></i><span>Wealth dashed, indexed to 100</span></span>',d.appendChild(r);const u=p.select(d).append("svg").attr("class","cwi-svg tall"),l=840,i=380,c={top:20,right:120,bottom:28,left:70},y=l-c.left-c.right,v=i-c.top-c.bottom,g=J(),m=g.map(x=>({year:x,income:W("income",x),wealth:W("wealth",x)})),b=p.scaleLinear().domain(p.extent(g)).range([0,y]),k=p.scaleLinear().domain([0,260]).range([v,0]);u.attr("viewBox",`0 0 ${l} ${i}`);const $=u.append("g").attr("transform",`translate(${c.left},${c.top})`);$.append("g").attr("transform",`translate(0,${v})`).call(p.axisBottom(b).tickFormat(p.format("d"))),$.append("g").call(p.axisLeft(k).ticks(6).tickFormat(x=>`${Math.round(x)}%`)),L.forEach(x=>{const I=Math.abs(z(m[0].income,x))||1,M=Math.abs(z(m[0].wealth,x))||1,E=p.line().x(w=>b(w.year)).y(w=>k(Math.abs(z(w.income,x))/I*100)),S=p.line().x(w=>b(w.year)).y(w=>k(Math.abs(z(w.wealth,x))/M*100)),N=s?G(x.pop,1,7):2;$.append("path").datum(m).attr("fill","none").attr("stroke",x.color).attr("stroke-width",N).attr("d",E),$.append("path").datum(m).attr("fill","none").attr("stroke",x.color).attr("stroke-width",N).attr("stroke-dasharray","5 4").attr("opacity",.85).attr("d",S)})}function jt(t,e,o,s,a){const n=(u,l)=>{const i=K(l),c=i[i.length-1],y=i.flatMap(C=>L.map(B=>C.values[B.key]||0)),v=p.min(y),g=p.max(y),m=Math.min(0,v*1.12),b=g*1.06,k=700,$=340,x=22,M={top:20,right:s?148:112,bottom:28,left:80},E=k-M.left-M.right,S=$-M.top-M.bottom,N=p.select(u);N.attr("class","cwi-svg").attr("viewBox",`0 0 ${k} ${$}`),N.selectAll("*").remove();const w=p.scaleLinear().domain(p.extent(i,C=>C.year)).range([0,E]),f=l==="wealth"?1e6:1e5,h=p.scaleSymlog().constant(f).domain([m,b]).range([S,0]),T=N.append("g").attr("transform",`translate(${M.left},${M.top})`);if(T.append("g").attr("transform",`translate(0,${S})`).call(p.axisBottom(w).tickFormat(p.format("d"))),T.append("g").call(p.axisLeft(h).tickValues(et(v,g)).tickFormat(R)),m<0&&T.append("line").attr("x1",0).attr("x2",E).attr("y1",h(0)).attr("y2",h(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),T.selectAll(".yr-ref").data(e).join("line").attr("x1",C=>w(C)).attr("x2",C=>w(C)).attr("y1",0).attr("y2",S).attr("stroke","#e9ecef"),[...[...L,{key:"middle40",label:"Middle 40%",pop:40,color:"#dee2e6"}]].sort((C,B)=>Math.abs(c.values[B.key]||0)-Math.abs(c.values[C.key]||0)).forEach(C=>{const B=p.area().x(H=>w(H.year)).y0(h(0)).y1(H=>h(H.values[C.key]||0));T.append("path").datum(i).attr("fill",C.color).attr("opacity",C.key==="middle40"?.35:.72).attr("d",B)}),L.forEach(C=>{const B=c.values[C.key]||0;Number.isFinite(B)&&T.append("text").attr("x",E+5).attr("y",h(B)).attr("dy","0.35em").attr("font-size",10).attr("fill",C.color).text(C.label)}),s){const C=E+104;T.append("text").attr("x",C+x/2).attr("y",-7).attr("text-anchor","middle").attr("font-size",9).attr("fill","#6c757d").text("Pop.");const B=L.map(F=>G(F.pop,.1,1)),H=p.sum(B);let j=0;L.forEach((F,at)=>{const V=Math.max(2,B[at]/H*S);T.append("rect").attr("x",C).attr("y",j).attr("width",x).attr("height",V).attr("rx",2).attr("fill",F.color).attr("opacity",.85),V>=10&&T.append("text").attr("x",C+x/2).attr("y",j+V/2).attr("dy","0.35em").attr("text-anchor","middle").attr("font-size",8).attr("fill","#fff").attr("pointer-events","none").text(F.pop>=1?`${F.pop}%`:`${F.pop}%`),j+=V})}},r=(u=>{if(a.length===1)return u;const l=document.createElement("div");return l.className="cwi-grid-2",u.appendChild(l),l})(t);a.forEach(u=>{const i=P(r,u==="income"?"Average pre-tax income per person (SEK, symlog scale, gray = Middle 40%)":"Average net wealth per person (SEK, symlog scale, gray = Middle 40%, below 0 = net debt)"),c=document.createElementNS("http://www.w3.org/2000/svg","svg");i.appendChild(c),n(c,u)})}function xt(t){const e=W("income",t),o=p.sum(Bt,s=>Math.max(0,e.totals[s]||0));return L.map(s=>{const a=Math.max(0,e.totals[s.key]||0);return o>0?a/o*100:0})}function wt(t,e,o,s,a,n,d){e.forEach(l=>{t.append("rect").attr("x",l.x).attr("y",l.y).attr("width",o).attr("height",s).attr("rx",3).attr("fill",d)});let r=0;a.map((l,i)=>{const c={start:r,end:r+l,color:n[i]};return r+=l,c}).forEach(l=>{e.forEach(i=>{const c=Math.max(i.i,l.start),y=Math.min(i.i+1,l.end);if(y<=c+.001)return;const v=c-i.i,g=y-i.i,m=g-v>=.999,b=i.y+s*(1-g),k=Math.max(1,s*(g-v));t.append("rect").attr("x",i.x).attr("y",b).attr("width",o).attr("height",k).attr("rx",m?3:1).attr("fill",l.color)})})}function yt(t,e,o){const s=p.select(t),a=250,n=o?290:240,d=20,r=xt(e);s.attr("class","cwi-svg").attr("viewBox",`0 0 ${a} ${n}`),s.selectAll("*").remove();const u=p.range(100).map(i=>({i,x:15+i%10*22,y:15+(9-Math.floor(i/10))*22})),l=s.append("g");if(wt(l,u,d,d,r,L.map(i=>i.color),"#eef1ea"),o){const i=[...L.map(g=>g.pop),40],c=[...L.map(g=>g.color),"#dee2e6"],y=Tt(i);let v=0;s.append("text").attr("x",15).attr("y",255).attr("font-size",10).attr("fill","#5f6368").text("Population strip (gray = Middle 40%)"),y.forEach((g,m)=>{for(let b=0;b<g;b+=1)s.append("rect").attr("x",15+v*2.05).attr("y",265).attr("width",1.8).attr("height",10).attr("rx",1).attr("fill",c[m]).attr("opacity",.75),v+=1})}}function Ht(t,e,o,s){const a=document.createElement("div");if(a.className="cwi-note",a.textContent="Income waffle shares: population share × average income for each disjoint group. Wealth excluded (negative values).",t.appendChild(a),o==="juxtaposition"){L.forEach((n,d)=>{const r=document.createElement("div");r.style.cssText="margin-bottom:1.2rem;";const u=document.createElement("h4");u.textContent=n.label,u.style.cssText=`font-size:0.95rem;font-weight:700;color:${n.color};margin:0 0 0.4rem;`,r.appendChild(u);const l=document.createElement("div");l.style.cssText="display:flex;flex-wrap:wrap;gap:0.6rem;",e.forEach(i=>{const c=P(l,String(i));c.style.minWidth="170px";const v=xt(i)[d],g=p.select(c).append("svg").attr("class","cwi-svg").attr("viewBox","0 0 240 240"),m=p.range(100).map($=>({i:$,x:10+$%10*22,y:10+(9-Math.floor($/10))*22})),b=g.append("g");wt(b,m,20,20,[v],[n.color],"#e9ecef");const k=document.createElement("p");k.textContent=`${v.toFixed(2)}%`,k.style.cssText="text-align:center;font-size:0.8rem;color:#5f6368;margin:0.2rem 0 0;",c.appendChild(k)}),r.appendChild(l),t.appendChild(r)});return}if(o==="superposition"){const n=document.createElement("div");n.className="cwi-years-grid";const d=document.createElement("div");d.className="cwi-inline-legend",d.style.marginBottom="0.6rem",L.forEach(r=>{const u=document.createElement("span");u.innerHTML=`<i style="background:${r.color}"></i><span>${r.label}</span>`,d.appendChild(u)}),t.appendChild(d),t.appendChild(n),e.forEach(r=>{const u=P(n,String(r)),l=document.createElementNS("http://www.w3.org/2000/svg","svg");u.appendChild(l),yt(l,r,s)});return}it(t,J(),(n,d)=>{d.innerHTML="";const r=document.createElementNS("http://www.w3.org/2000/svg","svg");d.appendChild(r),yt(r,n,s)},"Animated income waffle")}function Vt(){Nt();const t=document.getElementById("cwi-spec-summary"),e=document.getElementById("cwi-years-input"),o=document.getElementById("cwi-representation"),s=document.getElementById("cwi-comparison"),a=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),d=document.getElementById("cwi-meta"),r=document.getElementById("cwi-note"),u=document.getElementById("cwi-render-root");if(!t||!e||!o||!s||!a||!n||!d||!r||!u)return;const l=document.getElementById("cwi-yview"),i=document.getElementById("cwi-ymax-slider"),c=document.getElementById("cwi-ymin-slider"),y=document.getElementById("cwi-ymax-val"),v=document.getElementById("cwi-ymin-val"),g=document.getElementById("cwi-yview-reset");let m={min:null,max:null},b=0,k=1;const $=f=>{const h=f.flatMap(T=>K(T).flatMap(A=>L.map(_=>A.values[_.key]||0))).filter(Number.isFinite);return{dMin:p.min(h),dMax:p.max(h)}},x=f=>{const h=Math.max(5,Math.log10(Math.abs(k))-4.5),T=Math.log10(Math.abs(k));return Math.pow(10,h+(T-h)*f/1e3)},I=f=>b>=0?0:b*(1-f/1e3),M=f=>{const h=Math.max(5,Math.log10(Math.abs(k))-4.5),T=Math.log10(Math.abs(k));return Math.max(0,Math.min(1e3,Math.round((Math.log10(Math.max(f,1))-h)/(T-h)*1e3)))},E=f=>b>=0?1e3:Math.max(0,Math.min(1e3,Math.round((1-f/b)*1e3))),S=()=>{const f=m.max!=null?m.max:k,h=m.min!=null?m.min:Math.min(0,b);y.textContent=R(f),v.textContent=R(h)},N=()=>{const f=m.max!=null?m.max:k,h=m.min!=null?m.min:Math.min(0,b);i.value=M(f),c.value=E(h),S()};i.addEventListener("input",()=>{m.max=x(Number(i.value)),S(),w()}),c.addEventListener("input",()=>{m.min=I(Number(c.value)),S(),w()}),g.addEventListener("click",()=>{m={min:null,max:null},N(),w()}),t.innerHTML="<strong>30 combinations</strong> from 5 representations × 3 comparison conditions × 2 population encodings, minus <strong>2 invalid animation cases</strong> for line and stacked area charts. That leaves <strong>28 valid configurations</strong>.";const w=()=>{Y&&(clearInterval(Y),Y=null);const f=At(e.value),h=o.value,T=n.value==="with";a.disabled=h==="waffle",h==="waffle"&&(a.value="income");const A=a.value==="both"?["income","wealth"]:[a.value];Array.from(s.options).forEach(B=>{B.disabled=(h==="line"||h==="stacked")&&B.value==="animation"}),(h==="line"||h==="stacked")&&s.value==="animation"&&(s.value="juxtaposition");const _=s.value;if(h==="line"){l.classList.remove("hidden");const{dMin:B,dMax:H}=$(A);b=B,k=H;const j=A.includes("wealth")&&B<0;c.parentElement.style.display=j?"":"none",N()}else l.classList.add("hidden"),m={min:null,max:null};const C=A.length===2?"income + wealth":A[0];d.textContent=`Configuration: ${h} / ${_} / ${C} / ${T?"with":"without"} pop. encoding. Years: ${f.join(", ")}.`,r.textContent=h==="waffle"?"Waffle charts show income only — wealth has negative values that cannot map to waffle proportions.":h==="line"||h==="stacked"?"Line and stacked-area charts use the full time series; selected years are marked as reference points.":"Discrete views use the selected comparison years directly. Edit the year list above to change time points.",u.innerHTML="",h==="table"&&_t(u,f,_,T,A),h==="bar"&&zt(u,f,_,T,A),h==="line"&&Pt(u,f,_,T,A,m),h==="stacked"&&jt(u,f,_,T,A),h==="waffle"&&Ht(u,f,_,T)};o.addEventListener("change",w),s.addEventListener("change",w),a.addEventListener("change",w),n.addEventListener("change",w),e.addEventListener("change",w),e.addEventListener("blur",w),w()}const lt="1.0",vt="wealth-study-data",U=[{id:"consent",type:"info",title:"Participant Information & Consent",content:`
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
      <p><strong>Contact:</strong> Submit your downloaded JSON file to the researcher as instructed.</p>`}],q={currentStep:0,startTime:Date.now(),stepTimes:{},answers:{},participantId:Math.random().toString(36).slice(2,9)};function Rt(t){const e=document.getElementById("cwi-representation"),o=document.getElementById("cwi-comparison"),s=document.getElementById("cwi-metric"),a=document.getElementById("cwi-pop-encoding"),n=document.getElementById("cwi-years-input");e&&(t.representation&&(e.value=t.representation),t.years&&(n.value=t.years,n.dispatchEvent(new Event("change"))),t.metric&&(s.value=t.metric),t.comparison&&(o.value=t.comparison),t.popEncoding&&(a.value=t.popEncoding),e.dispatchEvent(new Event("change")))}function kt(t,e,o={}){q.answers[t]={value:e,timestamp:Date.now(),elapsed:Date.now()-(q.stepTimes[t]||q.startTime),...o},localStorage.setItem(vt,JSON.stringify({state:q,version:lt}))}function Yt(){U.find(a=>a.id==="pre_q1");const t={participantId:q.participantId,studyVersion:lt,startTime:new Date(q.startTime).toISOString(),completedTime:new Date().toISOString(),answers:q.answers,summary:Mt()},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),o=URL.createObjectURL(e),s=document.createElement("a");s.href=o,s.download=`study-${q.participantId}.json`,s.click(),URL.revokeObjectURL(o)}function Mt(){var s,a,n,d,r,u,l;const t=["pre_q1","pre_q2","pre_q3"],e=["post_q1","post_q2","post_q3"],o=i=>i.reduce((c,y)=>{const v=U.find(m=>m.id===y),g=q.answers[y];return!v||!g||!v.correctValue?c:c+(g.value===v.correctValue?1:0)},0);return{preStudyScore:`${o(t)} / ${t.length}`,postStudyScore:`${o(e)} / ${e.length}`,task2_tableCorrect:((s=q.answers.task2)==null?void 0:s.value)==="b",task3_chartCorrect:((a=q.answers.task3)==null?void 0:a.value)==="b",task4_noEncoding:(n=q.answers.task4)==null?void 0:n.value,task5_withEncoding:(d=q.answers.task5)==null?void 0:d.value,task5Correct:((r=q.answers.task5)==null?void 0:r.value)==="e",populationEncodingRating:(u=q.answers.post_q4)==null?void 0:u.value,preferredChart:(l=q.answers.post_q5)==null?void 0:l.value}}function ct(){const t=U[q.currentStep];q.stepTimes[t.id]=Date.now();const e=document.getElementById("study-overlay"),o=document.getElementById("study-panel"),s=document.getElementById("study-task-banner");t.type==="task"?(e.classList.add("hidden"),s.classList.remove("hidden"),Rt(t.vizConfig),Gt(t,s)):(s.classList.add("hidden"),e.classList.remove("hidden"),t.type==="info"&&Kt(t,o),t.type==="question"&&Ut(t,o),t.type==="complete"&&Jt(t,o)),Qt()}function Kt(t,e){var o,s;if(e.innerHTML=`
    <div class="study-phase-tag">Information</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-nav">
      ${q.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${t.requireConsent?"disabled":""}>${t.nextLabel||"Next →"}</button>
    </div>`,t.requireConsent){const a=e.querySelector("#consent-checkbox"),n=e.querySelector("#study-next");a.addEventListener("change",()=>{n.disabled=!a.checked})}(o=e.querySelector("#study-next"))==null||o.addEventListener("click",dt),(s=e.querySelector("#study-prev"))==null||s.addEventListener("click",pt)}function Ut(t,e){var s,a;const o=(s=q.answers[t.id])==null?void 0:s.value;e.innerHTML=`
    <div class="study-phase-tag">${t.phase} — Question ${t.questionNum}</div>
    <h2 class="study-title">${t.text}</h2>
    ${t.note?`<p class="study-note">${t.note}</p>`:""}
    <div class="study-options" id="study-options">
      ${t.options.map(n=>`
        <label class="study-option ${o===n.value?"selected":""}">
          <input type="radio" name="sq" value="${n.value}" ${o===n.value?"checked":""}/>
          ${n.label}
        </label>`).join("")}
    </div>
    <div class="study-nav">
      ${q.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${o?"":"disabled"}>Next →</button>
    </div>`,e.querySelectorAll(".study-option").forEach(n=>{n.addEventListener("click",()=>{e.querySelectorAll(".study-option").forEach(r=>r.classList.remove("selected")),n.classList.add("selected");const d=n.querySelector("input").value;kt(t.id,d),e.querySelector("#study-next").disabled=!1})}),e.querySelector("#study-next").addEventListener("click",dt),(a=e.querySelector("#study-prev"))==null||a.addEventListener("click",pt)}let tt="description";function Gt(t,e){tt="description",e.innerHTML=ot(t),st(t,e)}function ot(t){var o;const e=(o=q.answers[t.id])==null?void 0:o.value;return tt==="description"?`
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
    </div>`}function st(t,e){var o,s,a,n;(o=e.querySelector("#task-back"))==null||o.addEventListener("click",()=>{pt()}),(s=e.querySelector("#task-ready"))==null||s.addEventListener("click",()=>{tt="question",e.innerHTML=ot(t),st(t,e)}),(a=e.querySelector("#task-back-q"))==null||a.addEventListener("click",()=>{tt="description",e.innerHTML=ot(t),st(t,e)}),e.querySelectorAll(".task-option").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".task-option").forEach(u=>u.classList.remove("selected")),d.classList.add("selected");const r=d.querySelector("input").value;kt(t.id,r),e.querySelector("#task-submit").disabled=!1})}),(n=e.querySelector("#task-submit"))==null||n.addEventListener("click",dt)}function Jt(t,e){const o=Mt();e.innerHTML=`
    <div class="study-phase-tag">Complete</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-summary">
      <h3>Your response summary</h3>
      <table class="summary-table">
        <tr><th>Pre-study knowledge score</th><td>${o.preStudyScore}</td></tr>
        <tr><th>Post-study knowledge score</th><td>${o.postStudyScore}</td></tr>
        <tr><th>Task 2 (table) — correct?</th><td>${o.task2_tableCorrect?"✓ Yes":"✗ No"}</td></tr>
        <tr><th>Task 3 (bar chart) — correct?</th><td>${o.task3_chartCorrect?"✓ Yes":"✗ No"}</td></tr>
        <tr><th>Task 4 (no encoding) — group size answer</th><td>${o.task4_noEncoding??"—"}</td></tr>
        <tr><th>Task 5 (with encoding) — correct?</th><td>${o.task5Correct?"✓ Yes (Top 0.001%)":"✗ No"}</td></tr>
        <tr><th>Population encoding helpfulness</th><td>${o.populationEncodingRating??"—"} / 5</td></tr>
        <tr><th>Preferred chart type</th><td>${o.preferredChart??"—"}</td></tr>
      </table>
    </div>
    <div class="study-nav centered">
      <button class="study-btn primary large" id="study-download">⬇ Download my data (JSON)</button>
    </div>`,e.querySelector("#study-download").addEventListener("click",Yt)}function Qt(){const t=document.getElementById("study-progress-bar"),e=document.getElementById("study-progress-label"),o=U.length-1,s=Math.round(q.currentStep/o*100);t&&(t.style.width=s+"%"),e&&(e.textContent=`Step ${q.currentStep+1} of ${U.length}`)}function dt(){q.currentStep<U.length-1&&(q.currentStep++,ct())}function pt(){q.currentStep>0&&(q.currentStep--,ct())}function Xt(){Zt(),Dt();try{const t=localStorage.getItem(vt);if(t){const e=JSON.parse(t);e.version===lt&&e.state&&Object.assign(q,e.state)}}catch{}document.getElementById("study-launch-btn").addEventListener("click",()=>{document.getElementById("study-launcher").classList.add("hidden"),document.getElementById("study-overlay").classList.remove("hidden"),ct()})}function Zt(){document.body.insertAdjacentHTML("beforeend",`
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
  `),new MutationObserver(()=>{const e=document.getElementById("study-overlay"),o=document.getElementById("study-task-banner"),s=document.getElementById("study-progress-container");e.classList.contains("hidden")&&o.classList.contains("hidden")&&q.currentStep===0?s.classList.add("hidden"):s.classList.remove("hidden")}).observe(document.getElementById("study-overlay"),{attributes:!0})}function Dt(){const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t)}Xt();
