(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();const o=window.d3;function Kt(t){const e=t.map(Math.floor);let r=100-o.sum(e);const s=t.map((n,a)=>({i:a,frac:n-Math.floor(n)})).sort((n,a)=>a.frac-n.frac);for(let n=0;n<s.length&&r>0;n+=1)e[s[n].i]+=1,r-=1;return e}const Ht=[{key:"bottom50",label:"Bottom 50%",color:"#4dabf7",pop:50},{key:"top10",label:"Top 10%",color:"#fcc419",pop:10},{key:"top1",label:"Top 1%",color:"#ff8787",pop:1},{key:"top01",label:"Top 0.1%",color:"#e599f7",pop:.1},{key:"top001",label:"Top 0.01%",color:"#ff6b6b",pop:.01},{key:"top0001",label:"Top 0.001%",color:"#c92a2a",pop:.001}];o.scaleSqrt().domain([.001,50]).range([.6,6]);let ft=[];async function Ut(){const e=(await o.text("./data/wealth_avg.csv")).split(`
`),r=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};ft=[];for(let n=1;n<e.length;n++){const a=e[n].split(",");if(a.length<r.length)continue;const u=Number(a[0]);if(!Number.isFinite(u))continue;const d={year:u};let h=!0;for(let m=1;m<r.length;m++){const l=s[r[m].trim()];if(!l)continue;const i=Number(a[m]);if(!Number.isFinite(i)){h=!1;break}d[l]=i}h&&d.bottom50!==void 0&&ft.push(d)}ft.sort((n,a)=>n.year-a.year),new Map(ft.map(n=>[n.year,n]))}let xt=[];async function Jt(){const e=(await o.text("./data/income_avg.csv")).split(`
`),r=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};xt=[];for(let n=1;n<e.length;n++){const a=e[n].split(",");if(a.length<2)continue;const u=Number(a[0]);if(!Number.isFinite(u))continue;const d={year:u};for(let h=1;h<r.length;h++){const m=s[r[h].trim()];m&&(d[m]=Number(a[h])||0)}d.bottom50!==void 0&&xt.push(d)}xt.sort((n,a)=>n.year-a.year),new Map(xt.map(n=>[n.year,n]))}function Qt(t){const e=Math.abs(t);return e>=1e9?(t/1e9).toFixed(1)+"B":e>=1e6?(t/1e6).toFixed(1)+"M":e>=1e3?(t/1e3).toFixed(0)+"K":t.toFixed(0)}function qt(t){return t>=1?`${t}%`:t>=.1?`${t.toFixed(1)}%`:t>=.01?`${t.toFixed(2)}%`:`${t.toFixed(3)}%`}function U(t){const e=Math.abs(t);return e>=1e9?`${(t/1e9).toFixed(e>=1e10?0:1)}B`:e>=1e6?`${(t/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(t/1e3).toFixed(e>=1e5?0:1)}K`:`${Math.round(t)}`}Ht.filter(t=>["top0001","top001"].includes(t.key));Ht.filter(t=>!["top0001","top001"].includes(t.key));o.scaleSqrt().domain([.001,50]).range([.6,6]);async function Zt(){await Promise.all([Ut(),Jt()]),de()}Zt();const Dt=[1980,1990,2e3,2010,2020,2024],A=[{key:"bottom50",label:"Bottom 50%",pop:50,color:"#4dabf7"},{key:"top9",label:"Top 10%",pop:9,color:"#ffd43b"},{key:"top0_9",label:"Top 1%",pop:.9,color:"#ff922b"},{key:"top0_09",label:"Top 0.1%",pop:.09,color:"#f06595"},{key:"top0_009",label:"Top 0.01%",pop:.009,color:"#e64980"},{key:"top0_001",label:"Top 0.001%",pop:.001,color:"#c92a2a"}],Ot=["bottom50","middle40","top9","top0_9","top0_09","top0_009","top0_001"];function mt(t,e,r){const s=Math.log10(.001),n=Math.log10(50),a=(Math.log10(Math.max(t,1e-4))-s)/(n-s);return e+a*(r-e)}let bt=[],Mt=[],Wt=new Map,Lt=new Map,pt=null;function jt(t){if(!t)return null;const e={bottom50:t.bottom50*50,middle40:t.mid40*40,top10:t.top10*10,top1:t.top1*1,top01:t.top01*.1,top001:t.top001*.01,top0001:t.top0001*.001};return{year:t.year,values:{bottom50:t.bottom50,middle40:t.mid40,top9:(e.top10-e.top1)/9,top0_9:(e.top1-e.top01)/.9,top0_09:(e.top01-e.top001)/.09,top0_009:(e.top001-e.top0001)/.009,top0_001:t.top0001},totals:{bottom50:e.bottom50,middle40:e.middle40,top9:e.top10-e.top1,top0_9:e.top1-e.top01,top0_09:e.top01-e.top001,top0_009:e.top001-e.top0001,top0_001:e.top0001}}}function te(){bt.length&&Mt.length||(bt=xt.map(jt).filter(Boolean),Mt=ft.map(jt).filter(Boolean),Wt=new Map(bt.map(t=>[t.year,t])),Lt=new Map(Mt.map(t=>[t.year,t])))}function ut(){return bt.map(t=>t.year).filter(t=>Lt.has(t))}function ee(t){var s;const e=new Set(ut()),r=Array.from(new Set(((s=String(t).match(/\d{4}/g))==null?void 0:s.map(Number))||[])).filter(n=>e.has(n)).sort((n,a)=>n-a);return r.length?r:Dt.filter(n=>e.has(n))}function Z(t,e){return(t==="income"?Wt:Lt).get(e)}function D(t){return t==="income"?bt:Mt}function W(t,e,r){return t.values[e.key]}function vt(t){return`${Qt(t)} SEK`}function ot(t,e){const r=document.createElement("div");if(r.className="cwi-card",e){const s=document.createElement("h3");s.textContent=e,r.appendChild(s)}return t.appendChild(r),r}function Tt(t,e,r,s){const n=document.createElement("div");n.className="cwi-anim-bar",n.innerHTML=`<button type="button" id="cwi-matrix-play">Play</button><input type="range" id="cwi-matrix-year" min="0" max="${e.length-1}" step="1" value="0"><span id="cwi-matrix-year-label">${e[0]}</span>`,t.appendChild(n);const a=ot(t,s),u=document.createElement("div");a.appendChild(u);const d=n.querySelector("#cwi-matrix-year"),h=n.querySelector("#cwi-matrix-play"),m=n.querySelector("#cwi-matrix-year-label"),l=i=>{const c=e[i];m.textContent=String(c),r(c,u)};d.addEventListener("input",()=>l(Number(d.value))),h.addEventListener("click",()=>{if(pt){clearInterval(pt),pt=null,h.textContent="Play";return}h.textContent="Pause",pt=setInterval(()=>{const i=(Number(d.value)+1)%e.length;d.value=String(i),l(i)},900)}),l(0)}function ae(t,e,r,s,n){const a=n.includes("income"),u=n.includes("wealth"),d=`${a?"<th>Income</th>":""}${u?"<th>Wealth</th>":""}`,h=(m,l,i)=>{const c=s?`<td>${qt(m.pop)}</td>`:"",S=a?`<td>${vt(l.values[m.key])}</td>`:"",f=u?`<td>${vt(i.values[m.key])}</td>`:"";return`<tr><td>${m.label}</td>${c}${S}${f}</tr>`};if(r==="juxtaposition"){const m=document.createElement("div");m.className="cwi-years-grid",t.appendChild(m),e.forEach(l=>{const i=ot(m,String(l)),c=document.createElement("table");c.className="cwi-table",c.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${d}</tr></thead><tbody>${A.map(S=>h(S,Z("income",l),Z("wealth",l))).join("")}</tbody>`,i.appendChild(c)});return}if(r==="superposition"){const m=ot(t,"Combined table across selected years"),l=document.createElement("table");l.className="cwi-table";const i=n.length,c=`<tr><th rowspan="2">Group</th>${s?'<th rowspan="2">Pop.</th>':""}${e.map(v=>`<th colspan="${i}">${v}</th>`).join("")}</tr>`,S=`<tr>${e.map(()=>`${a?"<th>Income</th>":""}${u?"<th>Wealth</th>":""}`).join("")}</tr>`,f=A.map(v=>{const g=e.map(M=>{const C=Z("income",M),L=Z("wealth",M);return`${a?`<td>${vt(C.values[v.key])}</td>`:""}${u?`<td>${vt(L.values[v.key])}</td>`:""}`}).join("");return`<tr><td>${v.label}</td>${s?`<td>${qt(v.pop)}</td>`:""}${g}</tr>`}).join("");l.innerHTML=`<thead>${c}${S}</thead><tbody>${f}</tbody>`,m.appendChild(l);return}Tt(t,ut(),(m,l)=>{l.innerHTML="";const i=document.createElement("table");i.className="cwi-table",i.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${d}</tr></thead><tbody>${A.map(c=>h(c,Z("income",m),Z("wealth",m))).join("")}</tbody>`,l.appendChild(i)},"Animated table")}function Pt(t,e,r,s,n){const a=o.select(t),u=520,d=310,h={top:18,right:16,bottom:28,left:120},m=u-h.left-h.right,l=d-h.top-h.bottom,i=A.map(x=>W(e,x)),c=o.min(i),S=o.max(i),f=(n==null?void 0:n.min)!=null?n.min:Math.min(0,c),v=(n==null?void 0:n.max)!=null?n.max:S*1.05,g=o.scaleLinear().domain([f,v]).range([0,m]),M=l/A.length;a.attr("class","cwi-svg").attr("viewBox",`0 0 ${u} ${d}`),a.selectAll("*").remove();const C=`clip-hbar-${r}-${Math.random().toString(36).slice(2)}`;a.append("defs").append("clipPath").attr("id",C).append("rect").attr("width",m).attr("height",l);const L=a.append("g").attr("transform",`translate(${h.left},${h.top})`);if(L.append("g").attr("transform",`translate(0,${l})`).call(o.axisBottom(g).ticks(5).tickFormat(U)),f<0||v>0){const x=g(Math.max(f,Math.min(0,v)));L.append("line").attr("x1",x).attr("x2",x).attr("y1",0).attr("y2",l).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3")}const b=o.select("#cwi-tooltip"),z=L.append("g").attr("clip-path",`url(#${C})`);A.forEach((x,$)=>{const j=W(e,x),N=s?mt(x.pop,M*.18,M*.82):M*.7,y=$*M+M/2,T=y-N/2,E=g(Math.max(f,Math.min(0,j))),p=g(Math.min(v,Math.max(0,j)));L.append("text").attr("x",-10).attr("y",y).attr("dy","0.35em").attr("text-anchor","end").attr("font-size",10).text(x.label),z.append("rect").attr("x",Math.min(E,p)).attr("y",T).attr("width",Math.max(2,Math.abs(p-E))).attr("height",N).attr("rx",3).attr("fill",x.color).style("cursor","crosshair").on("mouseover",w=>{b.html(`<strong style="color:${x.color}">${x.label}</strong><br>${U(j)}`).style("display","block").style("left",w.clientX+14+"px").style("top",w.clientY-36+"px")}).on("mousemove",w=>{b.style("left",w.clientX+14+"px").style("top",w.clientY-36+"px")}).on("mouseleave",()=>b.style("display","none"))})}function ne(t,e,r,s,n,a){const u=d=>{if(n.length===1)return d;const h=document.createElement("div");return h.className="cwi-grid-2",d.appendChild(h),h};if(r==="juxtaposition"){const d=document.createElement("div");d.className="cwi-years-grid",t.appendChild(d),e.forEach(h=>{const m=ot(d,String(h)),l=u(m);n.forEach(i=>{const c=document.createElement("div");c.innerHTML=`<p class="cwi-chart-title">${i==="income"?"Income":"Wealth"}</p>`;const S=document.createElementNS("http://www.w3.org/2000/svg","svg");c.appendChild(S),l.appendChild(c),Pt(S,Z(i,h),i,s,a)})});return}if(r==="superposition"){const d=u(t);n.forEach(h=>{const l=ot(d,h==="income"?"Income by year — SEK  (dashed = baseline year)":"Wealth by year — SEK  (dashed = baseline year)"),i=(w,Y)=>w?W(w,Y):0,c=Z(h,e[0]),S=e.flatMap(w=>A.map(Y=>i(Z(h,w),Y))),f=o.max(S.map(Math.abs)),v=Math.min(0,o.min(S)),g=(a==null?void 0:a.min)!=null?a.min:v*1.1,M=(a==null?void 0:a.max)!=null?a.max:f*1.1,C=700,L=360,b={top:24,right:16,bottom:44,left:78},z=C-b.left-b.right,x=L-b.top-b.bottom,$=o.select(l).append("svg").attr("class","cwi-svg").attr("viewBox",`0 0 ${C} ${L}`),j=`clip-vbar-${h}-${Math.random().toString(36).slice(2)}`;$.append("defs").append("clipPath").attr("id",j).append("rect").attr("width",z).attr("height",x);const N=$.append("g").attr("transform",`translate(${b.left},${b.top})`),y=o.scaleBand().domain(e).range([0,z]).paddingInner(.2),T=o.scaleLinear().domain([g,M]).range([x,0]);N.append("g").attr("transform",`translate(0,${x})`).call(o.axisBottom(y).tickFormat(o.format("d"))),N.append("g").call(o.axisLeft(T).ticks(6).tickFormat(U)),g<0&&M>0&&N.append("line").attr("x1",0).attr("x2",z).attr("y1",T(0)).attr("y2",T(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3");const E=o.select("#cwi-tooltip"),p=N.append("g").attr("clip-path",`url(#${j})`);e.forEach(w=>{const Y=Z(h,w);if(!Y)return;const I=y.bandwidth(),q=2,R=A.length,V=I-q*R,st=A.map(P=>mt(P.pop,.1,1)),B=o.sum(st);let H=y(w);A.forEach((P,F)=>{const X=Math.max(s?st[F]/B*V:V/R,3),O=i(Y,P),et=Math.max(g,Math.min(M,O)),rt=Math.max(g,Math.min(M,0)),at=T(Math.max(et,rt)),dt=Math.max(1,Math.abs(T(et)-T(rt)));if(p.append("rect").attr("x",H).attr("y",at).attr("width",X).attr("height",dt).attr("fill",P.color).attr("rx",2).attr("opacity",.85).style("cursor","crosshair").on("mouseover",J=>{E.html(`<strong style="color:${P.color}">${P.label}</strong><br>${w}<br>${U(O)}`).style("display","block").style("left",J.clientX+14+"px").style("top",J.clientY-36+"px")}).on("mousemove",J=>{E.style("left",J.clientX+14+"px").style("top",J.clientY-36+"px")}).on("mouseleave",()=>E.style("display","none")),c&&w!==e[0]){const J=i(c,P);J>=g&&J<=M&&N.append("line").attr("x1",H).attr("x2",H+X).attr("y1",T(J)).attr("y2",T(J)).attr("stroke","#202124").attr("stroke-width",1.5).attr("stroke-dasharray","4 3").attr("opacity",.5)}H+=X+q})})});return}Tt(t,ut(),(d,h)=>{h.innerHTML="";const m=u(h);n.forEach(l=>{const i=document.createElement("div");i.innerHTML=`<p class="cwi-chart-title">${l==="income"?"Income":"Wealth"}</p>`;const c=document.createElementNS("http://www.w3.org/2000/svg","svg");i.appendChild(c),m.appendChild(i),Pt(c,Z(l,d),l,s,a)})},"Animated bars")}function oe(t,e,r,s,n,a,u){const d=o.select(t),h=400,m=250,l={top:14,right:58,bottom:30,left:70},i=h-l.left-l.right,c=m-l.top-l.bottom,S=ut(),f=o.scaleLinear().domain(o.extent(S)).range([0,i]),[v,g]=a,M=u?v:Math.min(0,v),C=u?g:g*1.08,L=M<0,b=o.scaleLinear().domain([M,C]).range([c,0]),z=b.ticks(4);d.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${m}`),d.selectAll("*").remove();const x=d.append("g").attr("transform",`translate(${l.left},${l.top})`);x.selectAll("line.hg").data(z).join("line").attr("class","hg").attr("x1",0).attr("x2",i).attr("y1",p=>b(p)).attr("y2",p=>b(p)).attr("stroke","#e8eaed").attr("stroke-width",.8),x.append("g").attr("transform",`translate(0,${c})`).call(o.axisBottom(f).ticks(5).tickFormat(o.format("d"))).call(p=>p.selectAll("text").attr("font-size",10)),x.append("g").call(o.axisLeft(b).tickValues(z).tickFormat(U)).call(p=>p.selectAll("text").attr("font-size",10)),L&&x.append("line").attr("x1",0).attr("x2",i).attr("y1",b(0)).attr("y2",b(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),x.selectAll(".yr-mark").data(n).join("line").attr("class","yr-mark").attr("x1",p=>f(p)).attr("x2",p=>f(p)).attr("y1",0).attr("y2",c).attr("stroke","#dee2e6").attr("stroke-width",1.5);const $=s?mt(e.pop,1,10):1.8;r.forEach((p,w)=>{const Y=D(p),I=o.line().defined(q=>Number.isFinite(W(q,e))).x(q=>f(q.year)).y(q=>b(W(q,e)));x.append("path").datum(Y).attr("fill","none").attr("stroke",e.color).attr("stroke-width",$).attr("stroke-dasharray",w===1?"5 3":null).attr("d",I)});const j=D(r[0]).at(-1);if(j){const p=W(j,e);Number.isFinite(p)&&x.append("text").attr("x",i+4).attr("y",b(p)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(U(p))}const N=o.select("#cwi-tooltip"),y=D(r[0]),T=o.bisector(p=>p.year).left,E=x.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",c).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");x.append("rect").attr("width",i).attr("height",c).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",p=>{const[w]=o.pointer(p),Y=f.invert(w),I=T(y,Y),q=y[Math.max(0,I-1)],R=y[Math.min(y.length-1,I)],V=R&&Math.abs(Y-R.year)<Math.abs(Y-q.year)?R:q;if(!V)return;E.attr("x1",f(V.year)).attr("x2",f(V.year)).style("display",null);const st=r.map(B=>{const H=D(B).find(F=>F.year===V.year),P=H?W(H,e):null;return`${B}: ${P!=null?U(P):"n/a"}`});N.html(`<strong style="color:${e.color}">${e.label}</strong> · ${V.year}<br>${st.join("<br>")}`).style("display","block").style("left",p.clientX+16+"px").style("top",p.clientY-50+"px")}).on("mouseleave",()=>{E.style("display","none"),N.style("display","none")})}function se(t,e,r,s,n,a="linear"){const u=D(e),d=o.select(t),h=620,m=340,l={top:20,right:110,bottom:28,left:80},i=h-l.left-l.right,c=m-l.top-l.bottom,S=u.flatMap(y=>A.map(T=>W(y,T))).filter(Number.isFinite),f=o.min(S),v=o.max(S);if(a==="break"){const y=A[A.length-2],T=o.max(u,k=>{const Q=W(k,y);return Number.isFinite(Q)?Q:-1/0}),E=Math.max(0,T)*1.15,p=v*.75,w=Math.min(0,f),Y=v*1.05,I=14,q=Math.round(c*.62),R=o.scaleLinear().domain([w,E]).range([c,q+Math.ceil(I/2)]),V=o.scaleLinear().domain([p,Y]).range([q-Math.floor(I/2),0]),st=k=>Number.isFinite(k)?k<=E?R(Math.max(w,Math.min(E,k))):k>=p?V(Math.max(p,Math.min(Y,k))):null:null;d.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${m}`),d.selectAll("*").remove();const B=d.append("defs"),H=`brk-lo-${e}`;B.append("clipPath").attr("id",H).append("rect").attr("x",0).attr("y",q+Math.ceil(I/2)).attr("width",i).attr("height",c-q-Math.ceil(I/2));const P=`brk-hi-${e}`;B.append("clipPath").attr("id",P).append("rect").attr("x",0).attr("y",0).attr("width",i).attr("height",q-Math.floor(I/2));const F=d.append("g").attr("transform",`translate(${l.left},${l.top})`),X=o.scaleLinear().domain(o.extent(u,k=>k.year)).range([0,i]);F.append("g").attr("transform",`translate(0,${c})`).call(o.axisBottom(X).tickFormat(o.format("d"))),F.append("g").call(o.axisLeft(R).ticks(4).tickFormat(U)).call(k=>k.select(".domain").remove()),F.append("g").call(o.axisLeft(V).ticks(3).tickFormat(U)).call(k=>k.select(".domain").remove()),F.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",q-Math.floor(I/2)).attr("stroke","#495057").attr("stroke-width",1.5),F.append("line").attr("x1",0).attr("x2",0).attr("y1",q+Math.ceil(I/2)).attr("y2",c).attr("stroke","#495057").attr("stroke-width",1.5);const O=q,et=[-10,0,10,0,-10].map((k,Q)=>`${k},${O-6+Q*3}`).join(" "),rt=[-10,0,10,0,-10].map((k,Q)=>`${k},${O+1+Q*3}`).join(" ");if(F.append("polyline").attr("points",et).attr("fill","none").attr("stroke","#868e96").attr("stroke-width",1.8).attr("stroke-linecap","round"),F.append("polyline").attr("points",rt).attr("fill","none").attr("stroke","#868e96").attr("stroke-width",1.8).attr("stroke-linecap","round"),w<0){const k=R(0);k>q&&k<=c&&F.append("line").attr("x1",0).attr("x2",i).attr("y1",k).attr("y2",k).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3")}F.selectAll(".yr-mark").data(s).join("line").attr("class","yr-mark").attr("x1",k=>X(k)).attr("x2",k=>X(k)).attr("y1",0).attr("y2",c).attr("stroke","#f1f3f5"),A.forEach(k=>{const Q=r?mt(k.pop,1,10):2,lt=o.line().defined(K=>{const G=W(K,k);return Number.isFinite(G)&&G<=E}).x(K=>X(K.year)).y(K=>R(W(K,k)));F.append("path").datum(u).attr("fill","none").attr("stroke",k.color).attr("stroke-width",Q).attr("d",lt).attr("clip-path",`url(#${H})`);const tt=o.line().defined(K=>{const G=W(K,k);return Number.isFinite(G)&&G>=p}).x(K=>X(K.year)).y(K=>V(W(K,k)));F.append("path").datum(u).attr("fill","none").attr("stroke",k.color).attr("stroke-width",Q).attr("d",tt).attr("clip-path",`url(#${P})`);const it=u[u.length-1],ct=st(W(it,k));ct!==null&&F.append("text").attr("x",i+5).attr("y",ct).attr("dy","0.35em").attr("font-size",10).attr("fill",k.color).text(k.label)});const at=o.select("#cwi-tooltip"),dt=o.bisector(k=>k.year).left,J=F.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",c).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");F.append("rect").attr("width",i).attr("height",c).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",k=>{const[Q]=o.pointer(k),lt=X.invert(Q),tt=dt(u,lt),it=u[Math.max(0,tt-1)],ct=u[Math.min(u.length-1,tt)],K=ct&&Math.abs(lt-ct.year)<Math.abs(lt-it.year)?ct:it;if(!K)return;J.attr("x1",X(K.year)).attr("x2",X(K.year)).style("display",null);const G=`<strong>${K.year}</strong><br>`+A.map(nt=>{const ht=W(K,nt);return`<span style="color:${nt.color}">${nt.label}</span>: ${U(ht)}`}).join("<br>");at.html(G).style("display","block").style("left",k.clientX+16+"px").style("top",k.clientY-60+"px")}).on("mouseleave",()=>{J.style("display","none"),at.style("display","none")});return}const g=(n==null?void 0:n.min)!=null?n.min:Math.min(0,f),M=(n==null?void 0:n.max)!=null?n.max:v*1.05,C=o.scaleLinear().domain(o.extent(u,y=>y.year)).range([0,i]),L=o.scaleLinear().domain([g,M]).range([c,0]);d.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${m}`),d.selectAll("*").remove();const b=d.append("g").attr("transform",`translate(${l.left},${l.top})`),z=`clip-line-${e}`;d.append("defs").append("clipPath").attr("id",z).append("rect").attr("width",i).attr("height",c),b.append("g").attr("transform",`translate(0,${c})`).call(o.axisBottom(C).tickFormat(o.format("d"))),b.append("g").call(o.axisLeft(L).ticks(6).tickFormat(U)),g<0&&M>0&&b.append("line").attr("x1",0).attr("x2",i).attr("y1",L(0)).attr("y2",L(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),b.selectAll(".year-mark").data(s).join("line").attr("x1",y=>C(y)).attr("x2",y=>C(y)).attr("y1",0).attr("y2",c).attr("stroke","#f1f3f5");const x=b.append("g").attr("clip-path",`url(#${z})`);A.forEach(y=>{const T=o.line().defined(w=>Number.isFinite(W(w,y))).x(w=>C(w.year)).y(w=>L(W(w,y)));x.append("path").datum(u).attr("fill","none").attr("stroke",y.color).attr("stroke-width",r?mt(y.pop,1,10):2).attr("d",T);const E=u[u.length-1],p=W(E,y);Number.isFinite(p)&&p>=g&&p<=M&&b.append("text").attr("x",i+5).attr("y",L(p)).attr("dy","0.35em").attr("font-size",10).attr("fill",y.color).text(y.label)});const $=o.select("#cwi-tooltip"),j=o.bisector(y=>y.year).left,N=b.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",c).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");b.append("rect").attr("width",i).attr("height",c).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",y=>{const[T]=o.pointer(y),E=C.invert(T),p=j(u,E),w=u[Math.max(0,p-1)],Y=u[Math.min(u.length-1,p)],I=Y&&Math.abs(E-Y.year)<Math.abs(E-w.year)?Y:w;if(!I)return;N.attr("x1",C(I.year)).attr("x2",C(I.year)).style("display",null);const q=`<strong>${I.year}</strong><br>`+A.map(R=>{const V=W(I,R);return`<span style="color:${R.color}">${R.label}</span>: ${U(V)}`}).join("<br>");$.html(q).style("display","block").style("left",y.clientX+16+"px").style("top",y.clientY-60+"px")}).on("mouseleave",()=>{N.style("display","none"),$.style("display","none")})}function re(t,e,r,s,n,a,u="linear"){if(r==="juxtaposition"){const b=n.includes("income")?D("income"):[],z=n.includes("wealth")?D("wealth"):[],x=[...b.flatMap(E=>A.map(p=>W(E,p))),...z.flatMap(E=>A.map(p=>W(E,p)))].filter(Number.isFinite),$=o.min(x),j=o.max(x),N=(a==null?void 0:a.min)!=null||(a==null?void 0:a.max)!=null,y=[(a==null?void 0:a.min)!=null?a.min:$,(a==null?void 0:a.max)!=null?a.max:j];if(n.length>1){const E=document.createElement("p");E.className="cwi-note",E.textContent="Solid line = income · Dashed line = wealth. All panels share the same Y axis.",t.appendChild(E)}const T=document.createElement("div");T.className="cwi-sm-grid",t.appendChild(T),A.forEach(E=>{const p=ot(T,E.label),w=document.createElementNS("http://www.w3.org/2000/svg","svg");p.appendChild(w),oe(w,E,n,s,e,y,N)});return}if(n.length===1){const b=ot(t,n[0]==="income"?"Income over time":"Wealth over time"),z=document.createElementNS("http://www.w3.org/2000/svg","svg");b.appendChild(z),se(z,n[0],s,e,a,u);return}const d=ot(t,"Superposed indexed lines (income solid, wealth dashed)"),h=document.createElement("div");h.className="cwi-inline-legend",h.innerHTML='<span><i style="background:#495057"></i><span>Income solid</span></span><span><i style="background:#ffffff;border:2px dashed #495057"></i><span>Wealth dashed, indexed to 100</span></span>',d.appendChild(h);const m=o.select(d).append("svg").attr("class","cwi-svg tall"),l=840,i=380,c={top:20,right:120,bottom:28,left:70},S=l-c.left-c.right,f=i-c.top-c.bottom,v=ut(),g=v.map(b=>({year:b,income:Z("income",b),wealth:Z("wealth",b)})),M=o.scaleLinear().domain(o.extent(v)).range([0,S]),C=o.scaleLinear().domain([0,260]).range([f,0]);m.attr("viewBox",`0 0 ${l} ${i}`);const L=m.append("g").attr("transform",`translate(${c.left},${c.top})`);L.append("g").attr("transform",`translate(0,${f})`).call(o.axisBottom(M).tickFormat(o.format("d"))),L.append("g").call(o.axisLeft(C).ticks(6).tickFormat(b=>`${Math.round(b)}%`)),A.forEach(b=>{const z=Math.abs(W(g[0].income,b))||1,x=Math.abs(W(g[0].wealth,b))||1,$=o.line().x(y=>M(y.year)).y(y=>C(Math.abs(W(y.income,b))/z*100)),j=o.line().x(y=>M(y.year)).y(y=>C(Math.abs(W(y.wealth,b))/x*100)),N=s?mt(b.pop,1,7):2;L.append("path").datum(g).attr("fill","none").attr("stroke",b.color).attr("stroke-width",N).attr("d",$),L.append("path").datum(g).attr("fill","none").attr("stroke",b.color).attr("stroke-width",N).attr("stroke-dasharray","5 4").attr("opacity",.85).attr("d",j)})}function le(t,e,r,s,n,a,u){const d=o.select(t),h=400,m=250,l={top:14,right:58,bottom:30,left:70},i=h-l.left-l.right,c=m-l.top-l.bottom,S=ut(),f=o.scaleLinear().domain(o.extent(S)).range([0,i]),[v,g]=a,M=u?v:Math.min(0,v),C=u?g:g*1.08,L=o.scaleLinear().domain([M,C]).range([c,0]),b=L.ticks(4);d.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${m}`),d.selectAll("*").remove();const z=`clip-ga-${e.key}-${Math.random().toString(36).slice(2)}`;d.append("defs").append("clipPath").attr("id",z).append("rect").attr("width",i).attr("height",c);const x=d.append("g").attr("transform",`translate(${l.left},${l.top})`);x.selectAll("line.hg").data(b).join("line").attr("class","hg").attr("x1",0).attr("x2",i).attr("y1",p=>L(p)).attr("y2",p=>L(p)).attr("stroke","#e8eaed").attr("stroke-width",.8),x.append("g").attr("transform",`translate(0,${c})`).call(o.axisBottom(f).ticks(5).tickFormat(o.format("d"))).call(p=>p.selectAll("text").attr("font-size",10)),x.append("g").call(o.axisLeft(L).tickValues(b).tickFormat(U)).call(p=>p.selectAll("text").attr("font-size",10)),M<0&&C>0&&x.append("line").attr("x1",0).attr("x2",i).attr("y1",L(0)).attr("y2",L(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),x.selectAll(".yr-mark").data(n).join("line").attr("class","yr-mark").attr("x1",p=>f(p)).attr("x2",p=>f(p)).attr("y1",0).attr("y2",c).attr("stroke","#dee2e6").attr("stroke-width",1.5);const $=x.append("g").attr("clip-path",`url(#${z})`);r.forEach((p,w)=>{const Y=D(p),I=o.area().x(q=>f(q.year)).y0(L(Math.max(M,Math.min(C,0)))).y1(q=>L(Math.max(M,Math.min(C,q.values[e.key]||0))));$.append("path").datum(Y).attr("fill",e.color).attr("opacity",w===0?.72:.42).attr("stroke-dasharray",w===1?"5 3":null).attr("d",I)});const j=D(r[0]).at(-1);if(j){const p=j.values[e.key]||0;Number.isFinite(p)&&p>=M&&p<=C&&x.append("text").attr("x",i+4).attr("y",L(p)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(U(p))}const N=o.select("#cwi-tooltip"),y=D(r[0]),T=o.bisector(p=>p.year).left,E=x.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",c).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");x.append("rect").attr("width",i).attr("height",c).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",p=>{const[w]=o.pointer(p),Y=f.invert(w),I=T(y,Y),q=y[Math.max(0,I-1)],R=y[Math.min(y.length-1,I)],V=R&&Math.abs(Y-R.year)<Math.abs(Y-q.year)?R:q;if(!V)return;E.attr("x1",f(V.year)).attr("x2",f(V.year)).style("display",null);const st=r.map(B=>{const H=D(B).find(F=>F.year===V.year),P=H?H.values[e.key]||0:null;return`${B}: ${P!=null?U(P):"n/a"}`});N.html(`<strong style="color:${e.color}">${e.label}</strong> · ${V.year}<br>${st.join("<br>")}`).style("display","block").style("left",p.clientX+16+"px").style("top",p.clientY-50+"px")}).on("mouseleave",()=>{E.style("display","none"),N.style("display","none")})}function ie(t,e,r,s,n,a){const u=l=>{let i=0;return A.map(c=>{const S=l.values[c.key]||0,f=i;return i+=S,{grp:c,y0:f,y1:i}})},d=(l,i)=>{const c=D(i),S=c[c.length-1],f=c.flatMap(B=>u(B).flatMap(H=>[H.y0,H.y1])),v=o.min(f),g=o.max(f),M=Math.min(0,v*1.05),C=g*1.05,L=(a==null?void 0:a.min)!=null?a.min:M,b=(a==null?void 0:a.max)!=null?a.max:C,z=700,x=340,$=22,N={top:20,right:s?168:112,bottom:28,left:80},y=z-N.left-N.right,T=x-N.top-N.bottom,E=o.select(l);E.attr("class","cwi-svg").attr("viewBox",`0 0 ${z} ${x}`),E.selectAll("*").remove();const p=o.scaleLinear().domain(o.extent(c,B=>B.year)).range([0,y]),w=o.scaleLinear().domain([L,b]).range([T,0]),Y=`clip-area-${i}-${Math.random().toString(36).slice(2)}`;E.append("defs").append("clipPath").attr("id",Y).append("rect").attr("width",y).attr("height",T);const I=E.append("g").attr("transform",`translate(${N.left},${N.top})`);I.append("g").attr("transform",`translate(0,${T})`).call(o.axisBottom(p).tickFormat(o.format("d"))),I.append("g").call(o.axisLeft(w).ticks(6).tickFormat(U)),L<0&&b>0&&I.append("line").attr("x1",0).attr("x2",y).attr("y1",w(0)).attr("y2",w(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),I.selectAll(".yr-ref").data(e).join("line").attr("x1",B=>p(B)).attr("x2",B=>p(B)).attr("y1",0).attr("y2",T).attr("stroke","#e9ecef");const q=I.append("g").attr("clip-path",`url(#${Y})`);for(let B=A.length-1;B>=0;B--){const H=A[B],P=o.area().x(F=>p(F.year)).y0(F=>w(Math.max(L,Math.min(b,u(F)[B].y0)))).y1(F=>w(Math.max(L,Math.min(b,u(F)[B].y1))));q.append("path").datum(c).attr("fill",H.color).attr("opacity",.88).attr("d",P)}if(u(S).forEach(({grp:B,y0:H,y1:P})=>{const F=(H+P)/2;F>=L&&F<=b&&I.append("text").attr("x",y+5).attr("y",w(F)).attr("dy","0.35em").attr("font-size",10).attr("fill",B.color).text(B.label)}),s){const B=y+104,H=B+$+7,P=8,F=16,X=o.sum(A,G=>G.pop);let O=0;const et=A.map(G=>{const nt=O;return O+=G.pop,{gr:G,start:nt,end:O}});let rt=0,at=X;const dt=.002,J=`clip-pbz-${Math.random().toString(36).slice(2)}`;E.select("defs").append("clipPath").attr("id",J).append("rect").attr("x",B-1).attr("y",0).attr("width",$+2).attr("height",T);const k=I.append("g").attr("clip-path",`url(#${J})`),Q=()=>{k.selectAll("*").remove();const G=at-rt;et.forEach(({gr:nt,start:ht,end:wt})=>{const yt=Math.max(ht,rt),zt=Math.min(wt,at);if(zt<=yt)return;const At=(yt-rt)/G*T,kt=Math.max(1,(zt-yt)/G*T);k.append("rect").attr("x",B).attr("y",At).attr("width",$).attr("height",kt).attr("rx",2).attr("fill",nt.color).attr("opacity",.9),kt>=10&&k.append("text").attr("x",B+$/2).attr("y",At+kt/2).attr("dy","0.35em").attr("text-anchor","middle").attr("font-size",Math.min(8,kt*.45)).attr("fill","#fff").attr("pointer-events","none").text(`${nt.pop}%`)})};Q(),I.append("text").attr("x",B+$/2).attr("y",-7).attr("text-anchor","middle").attr("font-size",9).attr("fill","#6c757d").text("Pop."),I.append("text").attr("x",H+P/2).attr("y",-7).attr("text-anchor","middle").attr("font-size",8).attr("fill","#adb5bd").text("+"),I.append("text").attr("x",H+P/2).attr("y",T+10).attr("text-anchor","middle").attr("font-size",8).attr("fill","#adb5bd").text("−"),I.append("rect").attr("x",H+2).attr("y",0).attr("width",P-4).attr("height",T).attr("rx",3).attr("fill","#e9ecef");const lt=T-F;let tt=lt;const it=I.append("rect").attr("x",H).attr("y",tt).attr("width",P).attr("height",F).attr("rx",3).attr("fill","#868e96").style("cursor","ns-resize"),ct=G=>{const nt=1-G/lt,ht=Math.log10(dt),wt=Math.log10(X),yt=Math.pow(10,wt+nt*(ht-wt));rt=Math.max(0,X-yt),at=X,Q()},K=o.drag().on("start",()=>it.attr("fill","#495057")).on("drag",G=>{tt=Math.max(0,Math.min(lt,tt+G.dy)),it.attr("y",tt),ct(tt)}).on("end",()=>it.attr("fill","#868e96"));it.call(K),I.append("rect").attr("x",H).attr("y",0).attr("width",P).attr("height",T).attr("fill","none").style("pointer-events","all").on("click",G=>{const[,nt]=o.pointer(G);tt=Math.max(0,Math.min(lt,nt-F/2)),it.attr("y",tt),ct(tt)})}const R=o.select("#cwi-tooltip"),V=o.bisector(B=>B.year).left,st=I.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",T).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");I.append("rect").attr("width",y).attr("height",T).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",B=>{const[H]=o.pointer(B),P=p.invert(H),F=V(c,P),X=c[Math.max(0,F-1)],O=c[Math.min(c.length-1,F)],et=O&&Math.abs(P-O.year)<Math.abs(P-X.year)?O:X;if(!et)return;st.attr("x1",p(et.year)).attr("x2",p(et.year)).style("display",null);const rt=`<strong>${et.year}</strong><br>`+A.map(at=>{const dt=et.values[at.key]||0;return`<span style="color:${at.color}">${at.label}</span>: ${U(dt)}`}).join("<br>");R.html(rt).style("display","block").style("left",B.clientX+16+"px").style("top",B.clientY-60+"px")}).on("mouseleave",()=>{st.style("display","none"),R.style("display","none")})};if(r==="juxtaposition"){const l=n.flatMap(g=>D(g).flatMap(M=>A.map(C=>M.values[C.key]||0))).filter(Number.isFinite),i=o.min(l),c=o.max(l),S=(a==null?void 0:a.max)!=null,f=[Math.min(0,i),(a==null?void 0:a.max)!=null?a.max:c];if(n.length>1){const g=document.createElement("p");g.className="cwi-note",g.textContent="Solid fill = income · Translucent dashed fill = wealth. All panels share the same Y axis.",t.appendChild(g)}const v=document.createElement("div");v.className="cwi-sm-grid",t.appendChild(v),A.forEach(g=>{const M=ot(v,g.label),C=document.createElementNS("http://www.w3.org/2000/svg","svg");M.appendChild(C),le(C,g,n,s,e,f,S)});return}const m=(l=>{if(n.length===1)return l;const i=document.createElement("div");return i.className="cwi-grid-2",l.appendChild(i),i})(t);n.forEach(l=>{const c=ot(m,l==="income"?"Average pre-tax income per person (SEK, linear scale, gray = Middle 40%)":"Average net wealth per person (SEK, linear scale, gray = Middle 40%, below 0 = net debt)"),S=document.createElementNS("http://www.w3.org/2000/svg","svg");c.appendChild(S),d(S,l)})}function _t(t){const e=Z("income",t),r=o.sum(Ot,s=>Math.max(0,e.totals[s]||0));return A.map(s=>{const n=Math.max(0,e.totals[s.key]||0);return r>0?n/r*100:0})}function Rt(t,e,r,s,n,a,u){e.forEach(m=>{t.append("rect").attr("x",m.x).attr("y",m.y).attr("width",r).attr("height",s).attr("rx",3).attr("fill",u)});let d=0;n.map((m,l)=>{const i={start:d,end:d+m,color:a[l]};return d+=m,i}).forEach(m=>{e.forEach(l=>{const i=Math.max(l.i,m.start),c=Math.min(l.i+1,m.end);if(c<=i+.001)return;const S=i-l.i,f=c-l.i,v=f-S>=.999,g=l.y+s*(1-f),M=Math.max(1,s*(f-S));t.append("rect").attr("x",l.x).attr("y",g).attr("width",r).attr("height",M).attr("rx",v?3:1).attr("fill",m.color)})})}function Yt(t,e,r){const s=o.select(t),n=250,a=r?290:240,u=20,d=_t(e);s.attr("class","cwi-svg").attr("viewBox",`0 0 ${n} ${a}`),s.selectAll("*").remove();const h=o.range(100).map(l=>({i:l,x:15+l%10*22,y:15+(9-Math.floor(l/10))*22})),m=s.append("g");if(Rt(m,h,u,u,d,A.map(l=>l.color),"#eef1ea"),r){const l=[...A.map(f=>f.pop),40],i=[...A.map(f=>f.color),"#dee2e6"],c=Kt(l);let S=0;s.append("text").attr("x",15).attr("y",255).attr("font-size",10).attr("fill","#5f6368").text("Population strip (gray = Middle 40%)"),c.forEach((f,v)=>{for(let g=0;g<f;g+=1)s.append("rect").attr("x",15+S*2.05).attr("y",265).attr("width",1.8).attr("height",10).attr("rx",1).attr("fill",i[v]).attr("opacity",.75),S+=1})}}function ce(t,e,r,s){const n=document.createElement("div");if(n.className="cwi-note",n.textContent="Income waffle shares: population share × average income for each disjoint group. Wealth excluded (negative values).",t.appendChild(n),r==="juxtaposition"){A.forEach((a,u)=>{const d=document.createElement("div");d.style.cssText="margin-bottom:1.2rem;";const h=document.createElement("h4");h.textContent=a.label,h.style.cssText=`font-size:0.95rem;font-weight:700;color:${a.color};margin:0 0 0.4rem;`,d.appendChild(h);const m=document.createElement("div");m.style.cssText="display:flex;flex-wrap:wrap;gap:0.6rem;",e.forEach(l=>{const i=ot(m,String(l));i.style.minWidth="170px";const S=_t(l)[u],f=o.select(i).append("svg").attr("class","cwi-svg").attr("viewBox","0 0 240 240"),v=o.range(100).map(C=>({i:C,x:10+C%10*22,y:10+(9-Math.floor(C/10))*22})),g=f.append("g");Rt(g,v,20,20,[S],[a.color],"#e9ecef");const M=document.createElement("p");M.textContent=`${S.toFixed(2)}%`,M.style.cssText="text-align:center;font-size:0.8rem;color:#5f6368;margin:0.2rem 0 0;",i.appendChild(M)}),d.appendChild(m),t.appendChild(d)});return}if(r==="superposition"){const a=document.createElement("div");a.className="cwi-years-grid";const u=document.createElement("div");u.className="cwi-inline-legend",u.style.marginBottom="0.6rem",A.forEach(d=>{const h=document.createElement("span");h.innerHTML=`<i style="background:${d.color}"></i><span>${d.label}</span>`,u.appendChild(h)}),t.appendChild(u),t.appendChild(a),e.forEach(d=>{const h=ot(a,String(d)),m=document.createElementNS("http://www.w3.org/2000/svg","svg");h.appendChild(m),Yt(m,d,s)});return}Tt(t,ut(),(a,u)=>{u.innerHTML="";const d=document.createElementNS("http://www.w3.org/2000/svg","svg");u.appendChild(d),Yt(d,a,s)},"Animated income waffle")}function de(){te();const t=document.getElementById("cwi-years-input"),e=document.getElementById("cwi-representation"),r=document.getElementById("cwi-comparison"),s=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),a=document.getElementById("cwi-render-root");if(!t||!e||!r||!s||!n||!a)return;const u=document.getElementById("cwi-yscale-ctrl"),d=document.getElementById("cwi-yscale-linear"),h=document.getElementById("cwi-yscale-break");let m="linear";d==null||d.addEventListener("change",()=>{m="linear",z()}),h==null||h.addEventListener("change",()=>{m="break",z()});const l=document.getElementById("cwi-yview"),i=document.getElementById("cwi-ymax-slider"),c=document.getElementById("cwi-ymax-val"),S=document.getElementById("cwi-yview-reset");let f={min:null,max:null},v=1;const g=x=>{const $=x.flatMap(j=>D(j).flatMap(N=>A.map(y=>N.values[y.key]||0))).filter(Number.isFinite);return o.max($)},M=x=>{const $=Math.max(5,Math.log10(Math.abs(v))-4.5),j=Math.log10(Math.abs(v));return Math.pow(10,$+(j-$)*x/1e3)},C=x=>{const $=Math.max(5,Math.log10(Math.abs(v))-4.5),j=Math.log10(Math.abs(v));return Math.max(0,Math.min(1e3,Math.round((Math.log10(Math.max(x,1))-$)/(j-$)*1e3)))},L=()=>{const x=f.max!=null?f.max:v;c.textContent=U(x)},b=()=>{const x=f.max!=null?f.max:v;i.value=C(x),L()};i.addEventListener("input",()=>{f.max=M(Number(i.value)),L(),z()}),S.addEventListener("click",()=>{f={min:null,max:null},b(),z()});const z=()=>{pt&&(clearInterval(pt),pt=null);const x=ee(t.value),$=e.value,j=n.value==="with";s.disabled=$==="waffle",$==="waffle"&&(s.value="income");const N=s.value==="both"?["income","wealth"]:[s.value];Array.from(r.options).forEach(E=>{E.disabled=($==="line"||$==="stacked")&&E.value==="animation"}),($==="line"||$==="stacked")&&r.value==="animation"&&(r.value="juxtaposition");const y=r.value;$==="line"?u.classList.remove("hidden"):(u.classList.add("hidden"),m="linear",d&&(d.checked=!0)),$==="bar"||$==="stacked"||$==="line"&&m==="linear"?(l.classList.remove("hidden"),v=g(N),b()):(l.classList.add("hidden"),f={min:null,max:null}),a.innerHTML="",$==="table"&&ae(a,x,y,j,N),$==="bar"&&ne(a,x,y,j,N,f),$==="line"&&re(a,x,y,j,N,f,m),$==="stacked"&&ie(a,x,y,j,N,f),$==="waffle"&&ce(a,x,y,j)};e.addEventListener("change",z),r.addEventListener("change",z),s.addEventListener("change",z),n.addEventListener("change",z),t.addEventListener("change",z),t.addEventListener("blur",z),z()}const It="1.0",Vt="wealth-study-data",gt=[{id:"consent",type:"info",title:"Participant Information & Consent",content:`
      <p>You are invited to participate in a user study conducted as part of a Master's thesis at Linköping University.</p>
      <p><strong>What you will do:</strong> Interact with the visualization tool and answer a short question.</p>
      <p><strong>Data:</strong> Your responses are stored locally in your browser. No personal data is collected.</p>
      <p><strong>Participation is voluntary.</strong> You may close this window at any time.</p>
      <label class="consent-check">
        <input type="checkbox" id="consent-checkbox" />
        I have read the information above and agree to participate.
      </label>`,nextLabel:"Start",requireConsent:!0},{id:"task_test",type:"task",phase:"Task 1 of 1",vizConfig:{representation:"bar",comparison:"juxtaposition",metric:"wealth",popEncoding:"without",years:"1980,1990,2000,2010,2020,2024"},taskText:"test",questionText:"test",options:[{label:"a test",value:"a"},{label:"b test",value:"b"},{label:"c test",value:"c"},{label:"d test",value:"d"}]},{id:"complete",type:"complete",title:"Thank you!",content:"<p>Your response has been recorded.</p>"}],_={currentStep:0,startTime:Date.now(),stepTimes:{},answers:{},participantId:Math.random().toString(36).slice(2,9)};function pe(t){const e=document.getElementById("cwi-representation"),r=document.getElementById("cwi-comparison"),s=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),a=document.getElementById("cwi-years-input");e&&(t.representation&&(e.value=t.representation),t.years&&(a.value=t.years,a.dispatchEvent(new Event("change"))),t.metric&&(s.value=t.metric),t.comparison&&(r.value=t.comparison),t.popEncoding&&(n.value=t.popEncoding),e.dispatchEvent(new Event("change")))}function Gt(t,e,r={}){_.answers[t]={value:e,timestamp:Date.now(),elapsed:Date.now()-(_.stepTimes[t]||_.startTime),...r},localStorage.setItem(Vt,JSON.stringify({state:_,version:It}))}function ue(){gt.find(n=>n.id==="pre_q1");const t={participantId:_.participantId,studyVersion:It,startTime:new Date(_.startTime).toISOString(),completedTime:new Date().toISOString(),answers:_.answers,summary:Xt()},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),r=URL.createObjectURL(e),s=document.createElement("a");s.href=r,s.download=`study-${_.participantId}.json`,s.click(),URL.revokeObjectURL(r)}function Xt(){var t;return{taskTestAnswer:((t=_.answers.task_test)==null?void 0:t.value)??"—"}}function Ct(){const t=gt[_.currentStep];_.stepTimes[t.id]=Date.now();const e=document.getElementById("study-overlay"),r=document.getElementById("study-panel"),s=document.getElementById("study-task-banner");t.type==="task"?(e.classList.add("hidden"),s.classList.remove("hidden"),pe(t.vizConfig),ye(t,s)):(s.classList.add("hidden"),e.classList.remove("hidden"),t.type==="info"&&me(t,r),t.type==="question"&&he(t,r),t.type==="complete"&&fe(t,r)),xe()}function me(t,e){var r,s;if(e.innerHTML=`
    <div class="study-phase-tag">Information</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-nav">
      ${_.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${t.requireConsent?"disabled":""}>${t.nextLabel||"Next →"}</button>
    </div>`,t.requireConsent){const n=e.querySelector("#consent-checkbox"),a=e.querySelector("#study-next");n.addEventListener("change",()=>{a.disabled=!n.checked})}(r=e.querySelector("#study-next"))==null||r.addEventListener("click",Bt),(s=e.querySelector("#study-prev"))==null||s.addEventListener("click",Nt)}function he(t,e){var s,n;const r=(s=_.answers[t.id])==null?void 0:s.value;e.innerHTML=`
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
      ${_.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${r?"":"disabled"}>Next →</button>
    </div>`,e.querySelectorAll(".study-option").forEach(a=>{a.addEventListener("click",()=>{e.querySelectorAll(".study-option").forEach(d=>d.classList.remove("selected")),a.classList.add("selected");const u=a.querySelector("input").value;Gt(t.id,u),e.querySelector("#study-next").disabled=!1})}),e.querySelector("#study-next").addEventListener("click",Bt),(n=e.querySelector("#study-prev"))==null||n.addEventListener("click",Nt)}let $t="description";function ye(t,e){$t="description",e.innerHTML=Et(t),St(t,e)}function Et(t){var r;const e=(r=_.answers[t.id])==null?void 0:r.value;return $t==="description"?`
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
    </div>`}function St(t,e){var r,s,n,a,u;(r=e.querySelector("#task-back"))==null||r.addEventListener("click",()=>{Nt()}),(s=e.querySelector("#task-ready"))==null||s.addEventListener("click",()=>{$t="question",e.innerHTML=Et(t),St(t,e)}),(n=e.querySelector("#task-back-q"))==null||n.addEventListener("click",()=>{$t="description",e.innerHTML=Et(t),St(t,e)}),e.querySelectorAll(".task-option").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".task-option").forEach(m=>m.classList.remove("selected")),d.classList.add("selected");const h=d.querySelector("input").value;Gt(t.id,h),e.querySelector("#task-submit").disabled=!1})}),(a=e.querySelector("#task-submit"))==null||a.addEventListener("click",Bt),(u=e.querySelector("#task-close-btn"))==null||u.addEventListener("click",Ft)}function fe(t,e){const r=Xt();e.innerHTML=`
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
    </div>`,e.querySelector("#study-download").addEventListener("click",ue),e.querySelector("#study-close-complete").addEventListener("click",Ft)}function xe(){const t=document.getElementById("study-progress-bar"),e=document.getElementById("study-progress-label"),r=gt.length-1,s=Math.round(_.currentStep/r*100);t&&(t.style.width=s+"%"),e&&(e.textContent=`Step ${_.currentStep+1} of ${gt.length}`)}function Bt(){_.currentStep<gt.length-1&&(_.currentStep++,Ct())}function Nt(){_.currentStep>0&&(_.currentStep--,Ct())}function be(){ge(),we();try{const t=localStorage.getItem(Vt);if(t){const e=JSON.parse(t);e.version===It&&e.state&&Object.assign(_,e.state)}}catch{}document.getElementById("study-launch-btn").addEventListener("click",()=>{document.getElementById("study-launcher").classList.add("hidden"),document.getElementById("study-overlay").classList.remove("hidden"),Ct()}),document.getElementById("study-close-btn").addEventListener("click",Ft)}function Ft(){document.getElementById("study-overlay").classList.add("hidden"),document.getElementById("study-task-banner").classList.add("hidden"),document.getElementById("study-progress-container").classList.add("hidden"),document.getElementById("study-launcher").classList.remove("hidden"),_.currentStep=0}function ge(){document.body.insertAdjacentHTML("beforeend",`
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
  `),new MutationObserver(()=>{const e=document.getElementById("study-overlay"),r=document.getElementById("study-task-banner"),s=document.getElementById("study-progress-container");e.classList.contains("hidden")&&r.classList.contains("hidden")&&_.currentStep===0?s.classList.add("hidden"):s.classList.remove("hidden")}).observe(document.getElementById("study-overlay"),{attributes:!0})}function we(){const t=document.createElement("style");t.textContent=`
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
