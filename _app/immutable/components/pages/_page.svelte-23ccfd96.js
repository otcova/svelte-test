import{S as L,i as W,s as j,k as v,a as w,l as $,m as b,c as D,h as m,n as u,b as k,G as E,B as I,I as M,o as z}from"../../chunks/index-14cc5f3c.js";function V(s,e,o){const n=s.slice();return n[7]=e[o],n}function q(s,e,o){const n=s.slice();return n[10]=e[o],n}function P(s,e,o){const n=s.slice();return n[10]=e[o],n}function S(s){let e,o;return{c(){e=v("div"),this.h()},l(n){e=$(n,"DIV",{class:!0,style:!0}),b(e).forEach(m),this.h()},h(){u(e,"class","dot svelte-5f80se"),u(e,"style",o=`left:${s[10].x-20}px;top:${s[10].y-20}px`)},m(n,r){k(n,e,r)},p(n,r){r&1&&o!==(o=`left:${n[10].x-20}px;top:${n[10].y-20}px`)&&u(e,"style",o)},d(n){n&&m(e)}}}function F(s){let e;return{c(){e=v("div"),this.h()},l(o){e=$(o,"DIV",{class:!0,style:!0}),b(e).forEach(m),this.h()},h(){u(e,"class","small_dot svelte-5f80se"),u(e,"style",`left:${s[10].x-10}px;top:${s[10].y-10}px`)},m(o,n){k(o,e,n)},p:I,d(o){o&&m(e)}}}function G(s){let e,o;return{c(){e=v("div"),this.h()},l(n){e=$(n,"DIV",{class:!0,style:!0}),b(e).forEach(m),this.h()},h(){u(e,"class","bar svelte-5f80se"),u(e,"style",o=`translate:${s[7].x-50}px ${s[7].y}px;transform: rotate(${s[7].a}rad) translate(100px,0)`)},m(n,r){k(n,e,r)},p(n,r){r&2&&o!==(o=`translate:${n[7].x-50}px ${n[7].y}px;transform: rotate(${n[7].a}rad) translate(100px,0)`)&&u(e,"style",o)},d(n){n&&m(e)}}}function J(s){let e,o,n,r=s[0],i=[];for(let l=0;l<r.length;l+=1)i[l]=S(P(s,r,l));let _=s[2],c=[];for(let l=0;l<_.length;l+=1)c[l]=F(q(s,_,l));let f=s[1],a=[];for(let l=0;l<f.length;l+=1)a[l]=G(V(s,f,l));return{c(){e=v("div");for(let l=0;l<i.length;l+=1)i[l].c();o=w();for(let l=0;l<c.length;l+=1)c[l].c();n=w();for(let l=0;l<a.length;l+=1)a[l].c();this.h()},l(l){e=$(l,"DIV",{id:!0,class:!0});var h=b(e);for(let t=0;t<i.length;t+=1)i[t].l(h);o=D(h);for(let t=0;t<c.length;t+=1)c[t].l(h);n=D(h);for(let t=0;t<a.length;t+=1)a[t].l(h);h.forEach(m),this.h()},h(){u(e,"id","container"),u(e,"class","svelte-5f80se")},m(l,h){k(l,e,h);for(let t=0;t<i.length;t+=1)i[t].m(e,null);E(e,o);for(let t=0;t<c.length;t+=1)c[t].m(e,null);E(e,n);for(let t=0;t<a.length;t+=1)a[t].m(e,null)},p(l,[h]){if(h&1){r=l[0];let t;for(t=0;t<r.length;t+=1){const x=P(l,r,t);i[t]?i[t].p(x,h):(i[t]=S(x),i[t].c(),i[t].m(e,o))}for(;t<i.length;t+=1)i[t].d(1);i.length=r.length}if(h&4){_=l[2];let t;for(t=0;t<_.length;t+=1){const x=q(l,_,t);c[t]?c[t].p(x,h):(c[t]=F(x),c[t].c(),c[t].m(e,n))}for(;t<c.length;t+=1)c[t].d(1);c.length=_.length}if(h&2){f=l[1];let t;for(t=0;t<f.length;t+=1){const x=V(l,f,t);a[t]?a[t].p(x,h):(a[t]=G(x),a[t].c(),a[t].m(e,null))}for(;t<a.length;t+=1)a[t].d(1);a.length=f.length}},i:I,o:I,d(l){l&&m(e),M(i,l),M(c,l),M(a,l)}}}function K(s,e,o,n){const r=e.x-s.x,i=e.y-s.y,_=n.x-o.x,c=n.y-o.y,f=(-i*(s.x-o.x)+r*(s.y-o.y))/(-_*i+r*c),a=(_*(s.y-o.y)-c*(s.x-o.x))/(-_*i+r*c),l=.001;return l<f&&f<1-l&&l<a&&a<1-l?{x:s.x+a*r,y:s.y+a*i}:!1}function H(s,e,o){var n;const r=o.x-e.x,i=o.y-e.y,_=s.x-e.x,c=s.y-e.y,f=(_*r+c*i)/(i*i+r*r);return f>=0&&f<=1?n=(e.x+r*f-s.x)**2+(e.y+i*f-s.y)**2:n=f<0?(e.x-s.x)**2+(e.y-s.y)**2:(o.x-s.x)**2+(o.y-s.y)**2,n<s.r*s.r}function N(s,e,o){let n=[{x:0,y:0}],r=[],i=[];z(()=>c());let _=null;function c(){const h=performance.now();_??(_=h-100);let t=Math.min(100,(h-_)/100);for(let x=t-n.length;x>0;--x)a();t<100&&requestAnimationFrame(c)}let f=0;function a(){for(;f<n.length;){const l=f;t:for(let h=0;h<1e3;++h){const t=Math.random()*2*Math.PI,x=200,d=n[l].x+Math.cos(t)*x,p=n[l].y+Math.sin(t)*x;let g=50;if(d<g||p<g||d>innerWidth-g||p>innerHeight-g)continue t;for(const y of n)if((y.x-d)**2+(y.y-p)**2<g**2||y!=n[l]&&H({x:y.x,y:y.y,r:2*g},{x:d,y:p},n[l]))continue t;for(const y of i)if(K({x:d,y:p},{x:n[l].x,y:n[l].y},{x:y.x,y:y.y},{x:y.x0,y:y.y0})||H({x:d,y:p,r:2*g},{x:y.x,y:y.y},{x:y.x0,y:y.y0}))continue t;o(0,n=[...n,{x:d,y:p}]),o(1,i=[...i,{x:d,y:p,a:Math.atan2(n[l].y-p,n[l].x-d),x0:n[l].x,y0:n[l].y}]);return}++f}}return[n,i,r]}class Q extends L{constructor(e){super(),W(this,e,N,J,j,{})}}export{Q as default};