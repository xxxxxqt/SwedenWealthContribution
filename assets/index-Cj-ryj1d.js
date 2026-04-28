(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=o(a);fetch(a.href,n)}})();const p=window.d3;function $t(t){const e=t.map(Math.floor);let o=100-p.sum(e);const s=t.map((a,n)=>({i:n,frac:a-Math.floor(a)})).sort((a,n)=>n.frac-a.frac);for(let a=0;a<s.length&&o>0;a+=1)e[s[a].i]+=1,o-=1;return e}const yt=[{key:"bottom50",label:"Bottom 50%",color:"#4dabf7",pop:50},{key:"top10",label:"Top 10%",color:"#fcc419",pop:10},{key:"top1",label:"Top 1%",color:"#ff8787",pop:1},{key:"top01",label:"Top 0.1%",color:"#e599f7",pop:.1},{key:"top001",label:"Top 0.01%",color:"#ff6b6b",pop:.01},{key:"top0001",label:"Top 0.001%",color:"#c92a2a",pop:.001}];p.scaleSqrt().domain([.001,50]).range([.6,6]);let Q=[];async function Tt(){const e=(await p.text("./data/wealth_avg.csv")).split(`
`),o=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};Q=[];for(let a=1;a<e.length;a++){const n=e[a].split(",");if(n.length<o.length)continue;const c=Number(n[0]);if(!Number.isFinite(c))continue;const r={year:c};let u=!0;for(let l=1;l<o.length;l++){const i=s[o[l].trim()];if(!i)continue;const d=Number(n[l]);if(!Number.isFinite(d)){u=!1;break}r[i]=d}u&&r.bottom50!==void 0&&Q.push(r)}Q.sort((a,n)=>a.year-n.year),new Map(Q.map(a=>[a.year,a]))}let X=[];async function qt(){const e=(await p.text("./data/income_avg.csv")).split(`
`),o=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};X=[];for(let a=1;a<e.length;a++){const n=e[a].split(",");if(n.length<2)continue;const c=Number(n[0]);if(!Number.isFinite(c))continue;const r={year:c};for(let u=1;u<o.length;u++){const l=s[o[u].trim()];l&&(r[l]=Number(n[u])||0)}r.bottom50!==void 0&&X.push(r)}X.sort((a,n)=>a.year-n.year),new Map(X.map(a=>[a.year,a]))}function Lt(t){const e=Math.abs(t);return e>=1e9?(t/1e9).toFixed(1)+"B":e>=1e6?(t/1e6).toFixed(1)+"M":e>=1e3?(t/1e3).toFixed(0)+"K":t.toFixed(0)}function ut(t){return t>=1?`${t}%`:t>=.1?`${t.toFixed(1)}%`:t>=.01?`${t.toFixed(2)}%`:`${t.toFixed(3)}%`}function Y(t){const e=Math.abs(t);return e>=1e9?`${(t/1e9).toFixed(e>=1e10?0:1)}B`:e>=1e6?`${(t/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(t/1e3).toFixed(e>=1e5?0:1)}K`:`${Math.round(t)}`}yt.filter(t=>["top0001","top001"].includes(t.key));yt.filter(t=>!["top0001","top001"].includes(t.key));p.scaleSqrt().domain([.001,50]).range([.6,6]);async function It(){await Promise.all([Tt(),qt()]),Vt()}It();const Ct=[1980,1990,2e3,2010,2020,2024],q=[{key:"bottom50",label:"Bottom 50%",pop:50,color:"#4dabf7"},{key:"top9",label:"Top 9%",pop:9,color:"#ffd43b"},{key:"top0_9",label:"Top 0.9%",pop:.9,color:"#ff922b"},{key:"top0_09",label:"Top 0.09%",pop:.09,color:"#f06595"},{key:"top0_009",label:"Top 0.009%",pop:.009,color:"#e64980"},{key:"top0_001",label:"Top 0.001%",pop:.001,color:"#c92a2a"}],Bt=["bottom50","middle40","top9","top0_9","top0_09","top0_009","top0_001"];function U(t,e,o){const s=Math.log10(.001),a=Math.log10(50),n=(Math.log10(Math.max(t,1e-4))-s)/(a-s);return e+n*(o-e)}let D=[],O=[],bt=new Map,st=new Map,R=null;function ht(t){if(!t)return null;const e={bottom50:t.bottom50*50,middle40:t.mid40*40,top10:t.top10*10,top1:t.top1*1,top01:t.top01*.1,top001:t.top001*.01,top0001:t.top0001*.001};return{year:t.year,values:{bottom50:t.bottom50,middle40:t.mid40,top9:(e.top10-e.top1)/9,top0_9:(e.top1-e.top01)/.9,top0_09:(e.top01-e.top001)/.09,top0_009:(e.top001-e.top0001)/.009,top0_001:t.top0001},totals:{bottom50:e.bottom50,middle40:e.middle40,top9:e.top10-e.top1,top0_9:e.top1-e.top01,top0_09:e.top01-e.top001,top0_009:e.top001-e.top0001,top0_001:e.top0001}}}function Nt(){D.length&&O.length||(D=X.map(ht).filter(Boolean),O=Q.map(ht).filter(Boolean),bt=new Map(D.map(t=>[t.year,t])),st=new Map(O.map(t=>[t.year,t])))}function J(){return D.map(t=>t.year).filter(t=>st.has(t))}function At(t){var s;const e=new Set(J()),o=Array.from(new Set(((s=String(t).match(/\d{4}/g))==null?void 0:s.map(Number))||[])).filter(a=>e.has(a)).sort((a,n)=>a-n);return o.length?o:Ct.filter(a=>e.has(a))}function z(t,e){return(t==="income"?bt:st).get(e)}function K(t){return t==="income"?D:O}function _(t,e,o){return t.values[e.key]}function Z(t){return`${Lt(t)} SEK`}function P(t,e){const o=document.createElement("div");if(o.className="cwi-card",e){const s=document.createElement("h3");s.textContent=e,o.appendChild(s)}return t.appendChild(o),o}function it(t,e,o,s){const a=document.createElement("div");a.className="cwi-anim-bar",a.innerHTML=`<button type="button" id="cwi-matrix-play">Play</button><input type="range" id="cwi-matrix-year" min="0" max="${e.length-1}" step="1" value="0"><span id="cwi-matrix-year-label">${e[0]}</span>`,t.appendChild(a);const n=P(t,s),c=document.createElement("div");n.appendChild(c);const r=a.querySelector("#cwi-matrix-year"),u=a.querySelector("#cwi-matrix-play"),l=a.querySelector("#cwi-matrix-year-label"),i=d=>{const b=e[d];l.textContent=String(b),o(b,c)};r.addEventListener("input",()=>i(Number(r.value))),u.addEventListener("click",()=>{if(R){clearInterval(R),R=null,u.textContent="Play";return}u.textContent="Pause",R=setInterval(()=>{const d=(Number(r.value)+1)%e.length;r.value=String(d),i(d)},900)}),i(0)}function _t(t,e,o,s,a){const n=a.includes("income"),c=a.includes("wealth"),r=`${n?"<th>Income</th>":""}${c?"<th>Wealth</th>":""}`,u=(l,i,d)=>{const b=s?`<td>${ut(l.pop)}</td>`:"",v=n?`<td>${Z(i.values[l.key])}</td>`:"",x=c?`<td>${Z(d.values[l.key])}</td>`:"";return`<tr><td>${l.label}</td>${b}${v}${x}</tr>`};if(o==="juxtaposition"){const l=document.createElement("div");l.className="cwi-years-grid",t.appendChild(l),e.forEach(i=>{const d=P(l,String(i)),b=document.createElement("table");b.className="cwi-table",b.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${r}</tr></thead><tbody>${q.map(v=>u(v,z("income",i),z("wealth",i))).join("")}</tbody>`,d.appendChild(b)});return}if(o==="superposition"){const l=P(t,"Combined table across selected years"),i=document.createElement("table");i.className="cwi-table";const d=a.length,b=`<tr><th rowspan="2">Group</th>${s?'<th rowspan="2">Pop.</th>':""}${e.map(f=>`<th colspan="${d}">${f}</th>`).join("")}</tr>`,v=`<tr>${e.map(()=>`${n?"<th>Income</th>":""}${c?"<th>Wealth</th>":""}`).join("")}</tr>`,x=q.map(f=>{const k=e.map(M=>{const E=z("income",M),g=z("wealth",M);return`${n?`<td>${Z(E.values[f.key])}</td>`:""}${c?`<td>${Z(g.values[f.key])}</td>`:""}`}).join("");return`<tr><td>${f.label}</td>${s?`<td>${ut(f.pop)}</td>`:""}${k}</tr>`}).join("");i.innerHTML=`<thead>${b}${v}</thead><tbody>${x}</tbody>`,l.appendChild(i);return}it(t,J(),(l,i)=>{i.innerHTML="";const d=document.createElement("table");d.className="cwi-table",d.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${r}</tr></thead><tbody>${q.map(b=>u(b,z("income",l),z("wealth",l))).join("")}</tbody>`,i.appendChild(d)},"Animated table")}function mt(t,e,o,s){const a=p.select(t),n=520,c=310,r={top:18,right:16,bottom:20,left:120},u=n-r.left-r.right,l=c-r.top-r.bottom,i=q.map(k=>_(e,k)),d=p.min(i),b=p.max(i),v=o==="wealth"?p.scaleSymlog().constant(1e6).domain([Math.min(0,d*1.1),b*1.05]).range([0,u]):p.scaleLinear().domain([0,b*1.05]).range([0,u]),x=l/q.length;a.attr("class","cwi-svg").attr("viewBox",`0 0 ${n} ${c}`),a.selectAll("*").remove();const f=a.append("g").attr("transform",`translate(${r.left},${r.top})`);o==="wealth"&&f.append("line").attr("x1",v(0)).attr("x2",v(0)).attr("y1",0).attr("y2",l).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),q.forEach((k,M)=>{const E=_(e,k),g=s?U(k.pop,x*.18,x*.82):x*.7,L=M*x+x/2,C=L-g/2,w=v(o==="wealth"?Math.min(0,E):0),T=v(E);f.append("text").attr("x",-10).attr("y",L).attr("dy","0.35em").attr("text-anchor","end").attr("font-size",10).text(k.label),f.append("rect").attr("x",Math.min(w,T)).attr("y",C).attr("width",Math.max(2,Math.abs(T-w))).attr("height",g).attr("rx",4).attr("fill",k.color),f.append("text").attr("x",E>=0?Math.max(w,T)+6:Math.min(w,T)-6).attr("y",L).attr("dy","0.35em").attr("text-anchor",E>=0?"start":"end").attr("font-size",10).text(Z(E))})}function zt(t,e,o,s,a){const n=c=>{if(a.length===1)return c;const r=document.createElement("div");return r.className="cwi-grid-2",c.appendChild(r),r};if(o==="juxtaposition"){const c=document.createElement("div");c.className="cwi-years-grid",t.appendChild(c),e.forEach(r=>{const u=P(c,String(r)),l=n(u);a.forEach(i=>{const d=document.createElement("div");d.innerHTML=`<p class="cwi-chart-title">${i==="income"?"Income":"Wealth"}</p>`;const b=document.createElementNS("http://www.w3.org/2000/svg","svg");d.appendChild(b),l.appendChild(d),mt(b,z(i,r),i,s)})});return}if(o==="superposition"){const c=n(t);a.forEach(r=>{const i=P(c,r==="income"?"Income by year — SEK  (dashed = baseline year)":"Wealth by year — SEK  (dashed = baseline year)"),d=(y,m)=>y?_(y,m):0,b=z(r,e[0]);p.sum(q,y=>y.pop);const v=e.flatMap(y=>q.map(m=>d(z(r,y),m))),x=p.max(v.map(Math.abs))*1.1,f=Math.min(0,p.min(v))*1.1,k=gt(f,x),M=700,E=360,g={top:24,right:16,bottom:44,left:72},L=M-g.left-g.right,C=E-g.top-g.bottom,T=p.select(i).append("svg").attr("class","cwi-svg").attr("viewBox",`0 0 ${M} ${E}`).append("g").attr("transform",`translate(${g.left},${g.top})`),N=p.scaleBand().domain(e).range([0,L]).paddingInner(.2),h=p.scaleSymlog().constant(1e5).domain([f,x]).range([C,0]);T.append("g").attr("transform",`translate(0,${C})`).call(p.axisBottom(N).tickFormat(p.format("d"))),T.append("g").call(p.axisLeft(h).tickValues(k).tickFormat(Y)),f<0&&T.append("line").attr("x1",0).attr("x2",L).attr("y1",h(0)).attr("y2",h(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),e.forEach(y=>{const m=z(r,y);if(!m)return;const S=N.bandwidth(),B=2,W=q.length,I=S-B*W,A=q.map(F=>U(F.pop,.1,1)),H=p.sum(A);let j=N(y);q.forEach((F,et)=>{const V=Math.max(s?A[et]/H*I:I/W,3),at=d(m,F),Et=at>=0?h(at):h(0),St=Math.max(1,Math.abs(h(at)-h(0)));if(T.append("rect").attr("x",j).attr("y",Et).attr("width",V).attr("height",St).attr("fill",F.color).attr("rx",2).attr("opacity",.85),b&&y!==e[0]){const pt=d(b,F);T.append("line").attr("x1",j).attr("x2",j+V).attr("y1",h(pt)).attr("y2",h(pt)).attr("stroke","#202124").attr("stroke-width",1.5).attr("stroke-dasharray","4 3").attr("opacity",.5)}j+=V+B})})});return}it(t,J(),(c,r)=>{r.innerHTML="";const u=n(r);a.forEach(l=>{const i=document.createElement("div");i.innerHTML=`<p class="cwi-chart-title">${l==="income"?"Income":"Wealth"}</p>`;const d=document.createElementNS("http://www.w3.org/2000/svg","svg");i.appendChild(d),u.appendChild(i),mt(d,z(l,c),l,s)})},"Animated bars")}function gt(t,e){const o=[];if(t<0&&o.push(t),o.push(0),e<=0)return o;const s=Math.max(3,Math.log10(e)-3),a=Math.log10(e);for(let n=1;n<=3;n++){const c=Math.pow(10,Math.round(s+(a-s)*n/4));!o.includes(c)&&c<e*.95&&o.push(c)}return o}function Wt(t,e,o,s,a,n,c){const r=p.select(t),u=400,l=250,i={top:14,right:58,bottom:30,left:70},d=u-i.left-i.right,b=l-i.top-i.bottom,v=J(),x=p.scaleLinear().domain(p.extent(v)).range([0,d]),[f,k]=n,M=c?f:Math.min(0,f),E=c?k:k*1.08,g=M<0,L=p.scaleLinear().domain([M,E]).range([b,0]),C=L.ticks(4);r.attr("class","cwi-svg").attr("viewBox",`0 0 ${u} ${l}`),r.selectAll("*").remove();const w=r.append("g").attr("transform",`translate(${i.left},${i.top})`);w.selectAll("line.hg").data(C).join("line").attr("class","hg").attr("x1",0).attr("x2",d).attr("y1",h=>L(h)).attr("y2",h=>L(h)).attr("stroke","#e8eaed").attr("stroke-width",.8),w.append("g").attr("transform",`translate(0,${b})`).call(p.axisBottom(x).ticks(5).tickFormat(p.format("d"))).call(h=>h.selectAll("text").attr("font-size",10)),w.append("g").call(p.axisLeft(L).tickValues(C).tickFormat(Y)).call(h=>h.selectAll("text").attr("font-size",10)),g&&w.append("line").attr("x1",0).attr("x2",d).attr("y1",L(0)).attr("y2",L(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),w.selectAll(".yr-mark").data(a).join("line").attr("class","yr-mark").attr("x1",h=>x(h)).attr("x2",h=>x(h)).attr("y1",0).attr("y2",b).attr("stroke","#dee2e6").attr("stroke-width",1.5);const T=s?U(e.pop,1,10):1.8;o.forEach((h,y)=>{const m=K(h),S=p.line().defined(B=>Number.isFinite(_(B,e))).x(B=>x(B.year)).y(B=>L(_(B,e)));w.append("path").datum(m).attr("fill","none").attr("stroke",e.color).attr("stroke-width",T).attr("stroke-dasharray",y===1?"5 3":null).attr("d",S)});const N=K(o[0]).at(-1);if(N){const h=_(N,e);Number.isFinite(h)&&w.append("text").attr("x",d+4).attr("y",L(h)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(Y(h))}}function Ft(t,e,o,s,a){const n=K(e),c=p.select(t),r=620,u=340,l={top:20,right:110,bottom:28,left:80},i=r-l.left-l.right,d=u-l.top-l.bottom,b=n.flatMap(w=>q.map(T=>_(w,T))).filter(Number.isFinite),v=p.min(b),x=p.max(b),f=(a==null?void 0:a.min)!=null?a.min:Math.min(0,v),k=(a==null?void 0:a.max)!=null?a.max:x*1.05,M=p.scaleLinear().domain(p.extent(n,w=>w.year)).range([0,i]),E=p.scaleLinear().domain([f,k]).range([d,0]);c.attr("class","cwi-svg").attr("viewBox",`0 0 ${r} ${u}`),c.selectAll("*").remove();const g=c.append("g").attr("transform",`translate(${l.left},${l.top})`),L=`clip-line-${e}`;c.append("defs").append("clipPath").attr("id",L).append("rect").attr("width",i).attr("height",d),g.append("g").attr("transform",`translate(0,${d})`).call(p.axisBottom(M).tickFormat(p.format("d"))),g.append("g").call(p.axisLeft(E).ticks(6).tickFormat(Y)),f<0&&k>0&&g.append("line").attr("x1",0).attr("x2",i).attr("y1",E(0)).attr("y2",E(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),g.selectAll(".year-mark").data(s).join("line").attr("x1",w=>M(w)).attr("x2",w=>M(w)).attr("y1",0).attr("y2",d).attr("stroke","#f1f3f5");const C=g.append("g").attr("clip-path",`url(#${L})`);q.forEach(w=>{const T=p.line().defined(y=>Number.isFinite(_(y,w))).x(y=>M(y.year)).y(y=>E(_(y,w)));C.append("path").datum(n).attr("fill","none").attr("stroke",w.color).attr("stroke-width",o?U(w.pop,1,10):2).attr("d",T);const N=n[n.length-1],h=_(N,w);Number.isFinite(h)&&h>=f&&h<=k&&g.append("text").attr("x",i+5).attr("y",E(h)).attr("dy","0.35em").attr("font-size",10).attr("fill",w.color).text(w.label)})}function Pt(t,e,o,s,a,n){if(o==="juxtaposition"){const g=a.includes("income")?K("income"):[],L=a.includes("wealth")?K("wealth"):[],C=[...g.flatMap(m=>q.map(S=>_(m,S))),...L.flatMap(m=>q.map(S=>_(m,S)))].filter(Number.isFinite),w=p.min(C),T=p.max(C),N=(n==null?void 0:n.min)!=null||(n==null?void 0:n.max)!=null,h=[(n==null?void 0:n.min)!=null?n.min:w,(n==null?void 0:n.max)!=null?n.max:T];if(a.length>1){const m=document.createElement("p");m.className="cwi-note",m.textContent="Solid line = income · Dashed line = wealth. All panels share the same Y axis.",t.appendChild(m)}const y=document.createElement("div");y.className="cwi-sm-grid",t.appendChild(y),q.forEach(m=>{const S=P(y,m.label),B=document.createElementNS("http://www.w3.org/2000/svg","svg");S.appendChild(B),Wt(B,m,a,s,e,h,N)});return}if(a.length===1){const g=P(t,a[0]==="income"?"Income over time":"Wealth over time"),L=document.createElementNS("http://www.w3.org/2000/svg","svg");g.appendChild(L),Ft(L,a[0],s,e,n);return}const c=P(t,"Superposed indexed lines (income solid, wealth dashed)"),r=document.createElement("div");r.className="cwi-inline-legend",r.innerHTML='<span><i style="background:#495057"></i><span>Income solid</span></span><span><i style="background:#ffffff;border:2px dashed #495057"></i><span>Wealth dashed, indexed to 100</span></span>',c.appendChild(r);const u=p.select(c).append("svg").attr("class","cwi-svg tall"),l=840,i=380,d={top:20,right:120,bottom:28,left:70},b=l-d.left-d.right,v=i-d.top-d.bottom,x=J(),f=x.map(g=>({year:g,income:z("income",g),wealth:z("wealth",g)})),k=p.scaleLinear().domain(p.extent(x)).range([0,b]),M=p.scaleLinear().domain([0,260]).range([v,0]);u.attr("viewBox",`0 0 ${l} ${i}`);const E=u.append("g").attr("transform",`translate(${d.left},${d.top})`);E.append("g").attr("transform",`translate(0,${v})`).call(p.axisBottom(k).tickFormat(p.format("d"))),E.append("g").call(p.axisLeft(M).ticks(6).tickFormat(g=>`${Math.round(g)}%`)),q.forEach(g=>{const L=Math.abs(_(f[0].income,g))||1,C=Math.abs(_(f[0].wealth,g))||1,w=p.line().x(h=>k(h.year)).y(h=>M(Math.abs(_(h.income,g))/L*100)),T=p.line().x(h=>k(h.year)).y(h=>M(Math.abs(_(h.wealth,g))/C*100)),N=s?U(g.pop,1,7):2;E.append("path").datum(f).attr("fill","none").attr("stroke",g.color).attr("stroke-width",N).attr("d",w),E.append("path").datum(f).attr("fill","none").attr("stroke",g.color).attr("stroke-width",N).attr("stroke-dasharray","5 4").attr("opacity",.85).attr("d",T)})}function jt(t,e,o,s,a){const n=(u,l)=>{const i=K(l),d=i[i.length-1],b=i.flatMap(I=>q.map(A=>I.values[A.key]||0)),v=p.min(b),x=p.max(b),f=Math.min(0,v*1.12),k=x*1.06,M=700,E=340,g=22,C={top:20,right:s?148:112,bottom:28,left:80},w=M-C.left-C.right,T=E-C.top-C.bottom,N=p.select(u);N.attr("class","cwi-svg").attr("viewBox",`0 0 ${M} ${E}`),N.selectAll("*").remove();const h=p.scaleLinear().domain(p.extent(i,I=>I.year)).range([0,w]),y=l==="wealth"?1e6:1e5,m=p.scaleSymlog().constant(y).domain([f,k]).range([T,0]),S=N.append("g").attr("transform",`translate(${C.left},${C.top})`);if(S.append("g").attr("transform",`translate(0,${T})`).call(p.axisBottom(h).tickFormat(p.format("d"))),S.append("g").call(p.axisLeft(m).tickValues(gt(v,x)).tickFormat(Y)),f<0&&S.append("line").attr("x1",0).attr("x2",w).attr("y1",m(0)).attr("y2",m(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),S.selectAll(".yr-ref").data(e).join("line").attr("x1",I=>h(I)).attr("x2",I=>h(I)).attr("y1",0).attr("y2",T).attr("stroke","#e9ecef"),[...[...q,{key:"middle40",label:"Middle 40%",pop:40,color:"#dee2e6"}]].sort((I,A)=>Math.abs(d.values[A.key]||0)-Math.abs(d.values[I.key]||0)).forEach(I=>{const A=p.area().x(H=>h(H.year)).y0(m(0)).y1(H=>m(H.values[I.key]||0));S.append("path").datum(i).attr("fill",I.color).attr("opacity",I.key==="middle40"?.35:.72).attr("d",A)}),q.forEach(I=>{const A=d.values[I.key]||0;Number.isFinite(A)&&S.append("text").attr("x",w+5).attr("y",m(A)).attr("dy","0.35em").attr("font-size",10).attr("fill",I.color).text(I.label)}),s){const I=w+104;S.append("text").attr("x",I+g/2).attr("y",-7).attr("text-anchor","middle").attr("font-size",9).attr("fill","#6c757d").text("Pop.");const A=q.map(F=>U(F.pop,.1,1)),H=p.sum(A);let j=0;q.forEach((F,et)=>{const V=Math.max(2,A[et]/H*T);S.append("rect").attr("x",I).attr("y",j).attr("width",g).attr("height",V).attr("rx",2).attr("fill",F.color).attr("opacity",.85),V>=10&&S.append("text").attr("x",I+g/2).attr("y",j+V/2).attr("dy","0.35em").attr("text-anchor","middle").attr("font-size",8).attr("fill","#fff").attr("pointer-events","none").text(F.pop>=1?`${F.pop}%`:`${F.pop}%`),j+=V})}},r=(u=>{if(a.length===1)return u;const l=document.createElement("div");return l.className="cwi-grid-2",u.appendChild(l),l})(t);a.forEach(u=>{const i=P(r,u==="income"?"Average pre-tax income per person (SEK, symlog scale, gray = Middle 40%)":"Average net wealth per person (SEK, symlog scale, gray = Middle 40%, below 0 = net debt)"),d=document.createElementNS("http://www.w3.org/2000/svg","svg");i.appendChild(d),n(d,u)})}function xt(t){const e=z("income",t),o=p.sum(Bt,s=>Math.max(0,e.totals[s]||0));return q.map(s=>{const a=Math.max(0,e.totals[s.key]||0);return o>0?a/o*100:0})}function wt(t,e,o,s,a,n,c){e.forEach(l=>{t.append("rect").attr("x",l.x).attr("y",l.y).attr("width",o).attr("height",s).attr("rx",3).attr("fill",c)});let r=0;a.map((l,i)=>{const d={start:r,end:r+l,color:n[i]};return r+=l,d}).forEach(l=>{e.forEach(i=>{const d=Math.max(i.i,l.start),b=Math.min(i.i+1,l.end);if(b<=d+.001)return;const v=d-i.i,x=b-i.i,f=x-v>=.999,k=i.y+s*(1-x),M=Math.max(1,s*(x-v));t.append("rect").attr("x",i.x).attr("y",k).attr("width",o).attr("height",M).attr("rx",f?3:1).attr("fill",l.color)})})}function ft(t,e,o){const s=p.select(t),a=250,n=o?290:240,c=20,r=xt(e);s.attr("class","cwi-svg").attr("viewBox",`0 0 ${a} ${n}`),s.selectAll("*").remove();const u=p.range(100).map(i=>({i,x:15+i%10*22,y:15+(9-Math.floor(i/10))*22})),l=s.append("g");if(wt(l,u,c,c,r,q.map(i=>i.color),"#eef1ea"),o){const i=[...q.map(x=>x.pop),40],d=[...q.map(x=>x.color),"#dee2e6"],b=$t(i);let v=0;s.append("text").attr("x",15).attr("y",255).attr("font-size",10).attr("fill","#5f6368").text("Population strip (gray = Middle 40%)"),b.forEach((x,f)=>{for(let k=0;k<x;k+=1)s.append("rect").attr("x",15+v*2.05).attr("y",265).attr("width",1.8).attr("height",10).attr("rx",1).attr("fill",d[f]).attr("opacity",.75),v+=1})}}function Ht(t,e,o,s){const a=document.createElement("div");if(a.className="cwi-note",a.textContent="Income waffle shares: population share × average income for each disjoint group. Wealth excluded (negative values).",t.appendChild(a),o==="juxtaposition"){q.forEach((n,c)=>{const r=document.createElement("div");r.style.cssText="margin-bottom:1.2rem;";const u=document.createElement("h4");u.textContent=n.label,u.style.cssText=`font-size:0.95rem;font-weight:700;color:${n.color};margin:0 0 0.4rem;`,r.appendChild(u);const l=document.createElement("div");l.style.cssText="display:flex;flex-wrap:wrap;gap:0.6rem;",e.forEach(i=>{const d=P(l,String(i));d.style.minWidth="170px";const v=xt(i)[c],x=p.select(d).append("svg").attr("class","cwi-svg").attr("viewBox","0 0 240 240"),f=p.range(100).map(E=>({i:E,x:10+E%10*22,y:10+(9-Math.floor(E/10))*22})),k=x.append("g");wt(k,f,20,20,[v],[n.color],"#e9ecef");const M=document.createElement("p");M.textContent=`${v.toFixed(2)}%`,M.style.cssText="text-align:center;font-size:0.8rem;color:#5f6368;margin:0.2rem 0 0;",d.appendChild(M)}),r.appendChild(l),t.appendChild(r)});return}if(o==="superposition"){const n=document.createElement("div");n.className="cwi-years-grid";const c=document.createElement("div");c.className="cwi-inline-legend",c.style.marginBottom="0.6rem",q.forEach(r=>{const u=document.createElement("span");u.innerHTML=`<i style="background:${r.color}"></i><span>${r.label}</span>`,c.appendChild(u)}),t.appendChild(c),t.appendChild(n),e.forEach(r=>{const u=P(n,String(r)),l=document.createElementNS("http://www.w3.org/2000/svg","svg");u.appendChild(l),ft(l,r,s)});return}it(t,J(),(n,c)=>{c.innerHTML="";const r=document.createElementNS("http://www.w3.org/2000/svg","svg");c.appendChild(r),ft(r,n,s)},"Animated income waffle")}function Vt(){Nt();const t=document.getElementById("cwi-spec-summary"),e=document.getElementById("cwi-years-input"),o=document.getElementById("cwi-representation"),s=document.getElementById("cwi-comparison"),a=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),c=document.getElementById("cwi-meta"),r=document.getElementById("cwi-note"),u=document.getElementById("cwi-render-root");if(!t||!e||!o||!s||!a||!n||!c||!r||!u)return;const l=document.getElementById("cwi-yview"),i=document.getElementById("cwi-ymax-slider"),d=document.getElementById("cwi-ymin-slider"),b=document.getElementById("cwi-ymax-val"),v=document.getElementById("cwi-ymin-val"),x=document.getElementById("cwi-yview-reset");let f={min:null,max:null},k=0,M=1;const E=y=>{const m=y.flatMap(S=>K(S).flatMap(B=>q.map(W=>B.values[W.key]||0))).filter(Number.isFinite);return{dMin:p.min(m),dMax:p.max(m)}},g=y=>{const m=Math.max(5,Math.log10(Math.abs(M))-4.5),S=Math.log10(Math.abs(M));return Math.pow(10,m+(S-m)*y/1e3)},L=y=>k>=0?0:k*(1-y/1e3),C=y=>{const m=Math.max(5,Math.log10(Math.abs(M))-4.5),S=Math.log10(Math.abs(M));return Math.max(0,Math.min(1e3,Math.round((Math.log10(Math.max(y,1))-m)/(S-m)*1e3)))},w=y=>k>=0?1e3:Math.max(0,Math.min(1e3,Math.round((1-y/k)*1e3))),T=()=>{const y=f.max!=null?f.max:M,m=f.min!=null?f.min:Math.min(0,k);b.textContent=Y(y),v.textContent=Y(m)},N=()=>{const y=f.max!=null?f.max:M,m=f.min!=null?f.min:Math.min(0,k);i.value=C(y),d.value=w(m),T()};i.addEventListener("input",()=>{f.max=g(Number(i.value)),T(),h()}),d.addEventListener("input",()=>{f.min=L(Number(d.value)),T(),h()}),x.addEventListener("click",()=>{f={min:null,max:null},N(),h()}),t.innerHTML="<strong>30 combinations</strong> from 5 representations × 3 comparison conditions × 2 population encodings, minus <strong>2 invalid animation cases</strong> for line and stacked area charts. That leaves <strong>28 valid configurations</strong>.";const h=()=>{R&&(clearInterval(R),R=null);const y=At(e.value),m=o.value,S=n.value==="with";a.disabled=m==="waffle",m==="waffle"&&(a.value="income");const B=a.value==="both"?["income","wealth"]:[a.value];Array.from(s.options).forEach(A=>{A.disabled=(m==="line"||m==="stacked")&&A.value==="animation"}),(m==="line"||m==="stacked")&&s.value==="animation"&&(s.value="juxtaposition");const W=s.value;if(m==="line"){l.classList.remove("hidden");const{dMin:A,dMax:H}=E(B);k=A,M=H;const j=B.includes("wealth")&&A<0;document.getElementById("cwi-ymin-row").style.display=j?"":"none",N()}else l.classList.add("hidden"),f={min:null,max:null};const I=B.length===2?"income + wealth":B[0];c.textContent=`Configuration: ${m} / ${W} / ${I} / ${S?"with":"without"} pop. encoding. Years: ${y.join(", ")}.`,r.textContent=m==="waffle"?"Waffle charts show income only — wealth has negative values that cannot map to waffle proportions.":m==="line"||m==="stacked"?"Line and stacked-area charts use the full time series; selected years are marked as reference points.":"Discrete views use the selected comparison years directly. Edit the year list above to change time points.",u.innerHTML="",m==="table"&&_t(u,y,W,S,B),m==="bar"&&zt(u,y,W,S,B),m==="line"&&Pt(u,y,W,S,B,f),m==="stacked"&&jt(u,y,W,S,B),m==="waffle"&&Ht(u,y,W,S)};o.addEventListener("change",h),s.addEventListener("change",h),a.addEventListener("change",h),n.addEventListener("change",h),e.addEventListener("change",h),e.addEventListener("blur",h),h()}const rt="1.0",vt="wealth-study-data",G=[{id:"consent",type:"info",title:"Participant Information & Consent",content:`
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
      <p><strong>Contact:</strong> Submit your downloaded JSON file to the researcher as instructed.</p>`}],$={currentStep:0,startTime:Date.now(),stepTimes:{},answers:{},participantId:Math.random().toString(36).slice(2,9)};function Rt(t){const e=document.getElementById("cwi-representation"),o=document.getElementById("cwi-comparison"),s=document.getElementById("cwi-metric"),a=document.getElementById("cwi-pop-encoding"),n=document.getElementById("cwi-years-input");e&&(t.representation&&(e.value=t.representation),t.years&&(n.value=t.years,n.dispatchEvent(new Event("change"))),t.metric&&(s.value=t.metric),t.comparison&&(o.value=t.comparison),t.popEncoding&&(a.value=t.popEncoding),e.dispatchEvent(new Event("change")))}function kt(t,e,o={}){$.answers[t]={value:e,timestamp:Date.now(),elapsed:Date.now()-($.stepTimes[t]||$.startTime),...o},localStorage.setItem(vt,JSON.stringify({state:$,version:rt}))}function Yt(){G.find(a=>a.id==="pre_q1");const t={participantId:$.participantId,studyVersion:rt,startTime:new Date($.startTime).toISOString(),completedTime:new Date().toISOString(),answers:$.answers,summary:Mt()},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),o=URL.createObjectURL(e),s=document.createElement("a");s.href=o,s.download=`study-${$.participantId}.json`,s.click(),URL.revokeObjectURL(o)}function Mt(){var s,a,n,c,r,u,l;const t=["pre_q1","pre_q2","pre_q3"],e=["post_q1","post_q2","post_q3"],o=i=>i.reduce((d,b)=>{const v=G.find(f=>f.id===b),x=$.answers[b];return!v||!x||!v.correctValue?d:d+(x.value===v.correctValue?1:0)},0);return{preStudyScore:`${o(t)} / ${t.length}`,postStudyScore:`${o(e)} / ${e.length}`,task2_tableCorrect:((s=$.answers.task2)==null?void 0:s.value)==="b",task3_chartCorrect:((a=$.answers.task3)==null?void 0:a.value)==="b",task4_noEncoding:(n=$.answers.task4)==null?void 0:n.value,task5_withEncoding:(c=$.answers.task5)==null?void 0:c.value,task5Correct:((r=$.answers.task5)==null?void 0:r.value)==="e",populationEncodingRating:(u=$.answers.post_q4)==null?void 0:u.value,preferredChart:(l=$.answers.post_q5)==null?void 0:l.value}}function lt(){const t=G[$.currentStep];$.stepTimes[t.id]=Date.now();const e=document.getElementById("study-overlay"),o=document.getElementById("study-panel"),s=document.getElementById("study-task-banner");t.type==="task"?(e.classList.add("hidden"),s.classList.remove("hidden"),Rt(t.vizConfig),Ut(t,s)):(s.classList.add("hidden"),e.classList.remove("hidden"),t.type==="info"&&Kt(t,o),t.type==="question"&&Gt(t,o),t.type==="complete"&&Jt(t,o)),Qt()}function Kt(t,e){var o,s;if(e.innerHTML=`
    <div class="study-phase-tag">Information</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-nav">
      ${$.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${t.requireConsent?"disabled":""}>${t.nextLabel||"Next →"}</button>
    </div>`,t.requireConsent){const a=e.querySelector("#consent-checkbox"),n=e.querySelector("#study-next");a.addEventListener("change",()=>{n.disabled=!a.checked})}(o=e.querySelector("#study-next"))==null||o.addEventListener("click",ct),(s=e.querySelector("#study-prev"))==null||s.addEventListener("click",dt)}function Gt(t,e){var s,a;const o=(s=$.answers[t.id])==null?void 0:s.value;e.innerHTML=`
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
      ${$.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${o?"":"disabled"}>Next →</button>
    </div>`,e.querySelectorAll(".study-option").forEach(n=>{n.addEventListener("click",()=>{e.querySelectorAll(".study-option").forEach(r=>r.classList.remove("selected")),n.classList.add("selected");const c=n.querySelector("input").value;kt(t.id,c),e.querySelector("#study-next").disabled=!1})}),e.querySelector("#study-next").addEventListener("click",ct),(a=e.querySelector("#study-prev"))==null||a.addEventListener("click",dt)}let tt="description";function Ut(t,e){tt="description",e.innerHTML=nt(t),ot(t,e)}function nt(t){var o;const e=(o=$.answers[t.id])==null?void 0:o.value;return tt==="description"?`
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
    </div>`}function ot(t,e){var o,s,a,n;(o=e.querySelector("#task-back"))==null||o.addEventListener("click",()=>{dt()}),(s=e.querySelector("#task-ready"))==null||s.addEventListener("click",()=>{tt="question",e.innerHTML=nt(t),ot(t,e)}),(a=e.querySelector("#task-back-q"))==null||a.addEventListener("click",()=>{tt="description",e.innerHTML=nt(t),ot(t,e)}),e.querySelectorAll(".task-option").forEach(c=>{c.addEventListener("click",()=>{e.querySelectorAll(".task-option").forEach(u=>u.classList.remove("selected")),c.classList.add("selected");const r=c.querySelector("input").value;kt(t.id,r),e.querySelector("#task-submit").disabled=!1})}),(n=e.querySelector("#task-submit"))==null||n.addEventListener("click",ct)}function Jt(t,e){const o=Mt();e.innerHTML=`
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
    </div>`,e.querySelector("#study-download").addEventListener("click",Yt)}function Qt(){const t=document.getElementById("study-progress-bar"),e=document.getElementById("study-progress-label"),o=G.length-1,s=Math.round($.currentStep/o*100);t&&(t.style.width=s+"%"),e&&(e.textContent=`Step ${$.currentStep+1} of ${G.length}`)}function ct(){$.currentStep<G.length-1&&($.currentStep++,lt())}function dt(){$.currentStep>0&&($.currentStep--,lt())}function Xt(){Zt(),Dt();try{const t=localStorage.getItem(vt);if(t){const e=JSON.parse(t);e.version===rt&&e.state&&Object.assign($,e.state)}}catch{}document.getElementById("study-launch-btn").addEventListener("click",()=>{document.getElementById("study-launcher").classList.add("hidden"),document.getElementById("study-overlay").classList.remove("hidden"),lt()})}function Zt(){document.body.insertAdjacentHTML("beforeend",`
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
  `),new MutationObserver(()=>{const e=document.getElementById("study-overlay"),o=document.getElementById("study-task-banner"),s=document.getElementById("study-progress-container");e.classList.contains("hidden")&&o.classList.contains("hidden")&&$.currentStep===0?s.classList.add("hidden"):s.classList.remove("hidden")}).observe(document.getElementById("study-overlay"),{attributes:!0})}function Dt(){const t=document.createElement("style");t.textContent=`
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
