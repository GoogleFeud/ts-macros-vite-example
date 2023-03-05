import { Save } from "ts-macros";

interface CounterData {
  color: string,
  startCount: number
}

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