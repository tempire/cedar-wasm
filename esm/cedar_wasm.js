import * as wasm from "./cedar_wasm_bg.wasm";
import { __wbg_set_wasm } from "./cedar_wasm_bg.js";
__wbg_set_wasm(wasm);
export * from "./cedar_wasm_bg.js";
