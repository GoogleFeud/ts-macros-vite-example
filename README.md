# ts-macros-vite-example

## Steps for creating a vite project with ts-macros

1. Run `npm create vite@latest` to create the vite project
2. Install ts-macros, @rollup/plugin-typescript and tslib: `npm i --save-dev ts-macros @rollup/plugin-typescript tslib`
3. Create a `vite.config.js` file in the root directory of your project and paste the following code inside it:
```js
import { defineConfig } from 'vite';
import typescript from '@rollup/plugin-typescript';
import Macros from "ts-macros";

export default defineConfig({
    plugins: [
        typescript({
            transformers: {
                before: [
                    {
                        type: "program",
                        factory: Macros.default
                    }
                ]
            }
        }),
    ],
})
```
4. Done!

## Example macro

An utility macro which attaches counters to an element:

```ts
export function $createCounters(attachTo: Save<HTMLElement>, counters: Array<CounterData>) : void {
  +[[counters], (counterData: CounterData) => {
    let counter = 0;
    const btn = document.createElement("button");

    btn.style.backgroundColor = counterData.color;

    const setCount = (count: number) => {
      counter = count;;
      btn.innerHTML = `count is ${count}`;
    }

    btn.addEventListener("click", () => setCount(counter + 1));
    setCount(counterData.startCount);

    attachTo.appendChild(btn);
  }]
}
```

Macro call:

```ts
$createCounters!(document.getElementById("counter-container")!, [
  {
    color: "transparent",
    startCount: 0
  }, 
  {
    color: "red",
    startCount: 10
  },
  {
    color: "pink",
    startCount: 1000
  }
]);
```


If we build the app with `npm run build` and then inspect the JS file in `dist/assets`, we're going to find that there's no `$createCounters` function anywhere in the file! Instead we'll find this:

```js
let l=document.getElementById("counter-container"),d=0;const o=document.createElement("button");o.style.backgroundColor="transparent";const u=r=>{d=r,o.innerHTML=`count is ${r}`};o.addEventListener("click",()=>u(d+1));u(0);l.appendChild(o);let p=0;const n=document.createElement("button");n.style.backgroundColor="red";const f=r=>{p=r,n.innerHTML=`count is ${r}`};n.addEventListener("click",()=>f(p+1));f(10);l.appendChild(n);let g=0;const c=document.createElement("button");c.style.backgroundColor="pink";const m=r=>{g=r,c.innerHTML=`count is ${r}`};c.addEventListener("click",()=>m(g+1));m(1e3);l.appendChild(c);
```