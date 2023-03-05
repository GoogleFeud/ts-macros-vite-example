import './style.css'
import typescriptLogo from './typescript.svg'
import { $createCounters } from './counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card" id="counter-container">
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

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