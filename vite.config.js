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