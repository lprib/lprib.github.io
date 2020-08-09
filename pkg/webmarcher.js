
let wasm;

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
* @param {number} ca
* @param {number} cb
* @param {number} cc
* @param {number} cd
* @param {number} zoom
* @param {number} aa_level
* @param {number} camx
* @param {number} camy
* @param {number} camz
* @returns {Configuration}
*/
export function new_configuration(ca, cb, cc, cd, zoom, aa_level, camx, camy, camz) {
    var ret = wasm.new_configuration(ca, cb, cc, cd, zoom, aa_level, camx, camy, camz);
    return Configuration.__wrap(ret);
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}
/**
* @param {Configuration} config
* @param {number} line
* @returns {string}
*/
export function get_line(config, line) {
    try {
        const retptr = wasm.__wbindgen_export_0.value - 16;
        wasm.__wbindgen_export_0.value = retptr;
        _assertClass(config, Configuration);
        wasm.get_line(retptr, config.ptr, line);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_export_0.value += 16;
        wasm.__wbindgen_free(r0, r1);
    }
}

/**
*/
export class Configuration {

    static __wrap(ptr) {
        const obj = Object.create(Configuration.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_configuration_free(ptr);
    }
    /**
    * @returns {number}
    */
    get ca() {
        var ret = wasm.__wbg_get_configuration_ca(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set ca(arg0) {
        wasm.__wbg_set_configuration_ca(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get cb() {
        var ret = wasm.__wbg_get_configuration_cb(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set cb(arg0) {
        wasm.__wbg_set_configuration_cb(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get cc() {
        var ret = wasm.__wbg_get_configuration_cc(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set cc(arg0) {
        wasm.__wbg_set_configuration_cc(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get cd() {
        var ret = wasm.__wbg_get_configuration_cd(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set cd(arg0) {
        wasm.__wbg_set_configuration_cd(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get zoom() {
        var ret = wasm.__wbg_get_configuration_zoom(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set zoom(arg0) {
        wasm.__wbg_set_configuration_zoom(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get aa_level() {
        var ret = wasm.__wbg_get_configuration_aa_level(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set aa_level(arg0) {
        wasm.__wbg_set_configuration_aa_level(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get camx() {
        var ret = wasm.__wbg_get_configuration_camx(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set camx(arg0) {
        wasm.__wbg_set_configuration_camx(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get camy() {
        var ret = wasm.__wbg_get_configuration_camy(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set camy(arg0) {
        wasm.__wbg_set_configuration_camy(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get camz() {
        var ret = wasm.__wbg_get_configuration_camz(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set camz(arg0) {
        wasm.__wbg_set_configuration_camz(this.ptr, arg0);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {

        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

