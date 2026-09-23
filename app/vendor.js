//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region node_modules/@emailjs/browser/es/models/EmailJSResponseStatus.js
var EmailJSResponseStatus = class {
	constructor(_status = 0, _text = "Network Error") {
		this.status = _status;
		this.text = _text;
	}
};
//#endregion
//#region node_modules/@emailjs/browser/es/utils/createWebStorage/createWebStorage.js
const createWebStorage = () => {
	if (typeof localStorage === "undefined") return;
	return {
		get: (key) => Promise.resolve(localStorage.getItem(key)),
		set: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
		remove: (key) => Promise.resolve(localStorage.removeItem(key))
	};
};
//#endregion
//#region node_modules/@emailjs/browser/es/store/store.js
const store = {
	origin: "https://api.emailjs.com",
	blockHeadless: false,
	storageProvider: createWebStorage()
};
//#endregion
//#region node_modules/@emailjs/browser/es/utils/buildOptions/buildOptions.js
const buildOptions = (options) => {
	if (!options) return {};
	if (typeof options === "string") return { publicKey: options };
	if (options.toString() === "[object Object]") return options;
	return {};
};
//#endregion
//#region node_modules/@emailjs/browser/es/methods/init/init.js
/**
* EmailJS global SDK config
* @param {object} options - the EmailJS global SDK config options
* @param {string} origin - the non-default EmailJS origin
*/
const init = (options, origin = "https://api.emailjs.com") => {
	if (!options) return;
	const opts = buildOptions(options);
	store.publicKey = opts.publicKey;
	store.blockHeadless = opts.blockHeadless;
	store.storageProvider = opts.storageProvider;
	store.blockList = opts.blockList;
	store.limitRate = opts.limitRate;
	store.origin = opts.origin || origin;
};
//#endregion
//#region node_modules/@emailjs/browser/es/api/sendPost.js
const sendPost = async (url, data, headers = {}) => {
	const response = await fetch(store.origin + url, {
		method: "POST",
		headers,
		body: data
	});
	const message = await response.text();
	const responseStatus = new EmailJSResponseStatus(response.status, message);
	if (response.ok) return responseStatus;
	throw responseStatus;
};
//#endregion
//#region node_modules/@emailjs/browser/es/utils/validateParams/validateParams.js
const validateParams = (publicKey, serviceID, templateID) => {
	if (!publicKey || typeof publicKey !== "string") throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
	if (!serviceID || typeof serviceID !== "string") throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
	if (!templateID || typeof templateID !== "string") throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
};
//#endregion
//#region node_modules/@emailjs/browser/es/utils/validateTemplateParams/validateTemplateParams.js
const validateTemplateParams = (templateParams) => {
	if (templateParams && templateParams.toString() !== "[object Object]") throw "The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/";
};
//#endregion
//#region node_modules/@emailjs/browser/es/utils/isHeadless/isHeadless.js
const isHeadless = (navigator) => {
	return navigator.webdriver || !navigator.languages || navigator.languages.length === 0;
};
//#endregion
//#region node_modules/@emailjs/browser/es/errors/headlessError/headlessError.js
const headlessError = () => {
	return new EmailJSResponseStatus(451, "Unavailable For Headless Browser");
};
//#endregion
//#region node_modules/@emailjs/browser/es/utils/validateBlockListParams/validateBlockListParams.js
const validateBlockListParams = (list, watchVariable) => {
	if (!Array.isArray(list)) throw "The BlockList list has to be an array";
	if (typeof watchVariable !== "string") throw "The BlockList watchVariable has to be a string";
};
//#endregion
//#region node_modules/@emailjs/browser/es/utils/isBlockedValueInParams/isBlockedValueInParams.js
const isBlockListDisabled = (options) => {
	return !options.list?.length || !options.watchVariable;
};
const getValue = (data, name) => {
	return data instanceof FormData ? data.get(name) : data[name];
};
const isBlockedValueInParams = (options, params) => {
	if (isBlockListDisabled(options)) return false;
	validateBlockListParams(options.list, options.watchVariable);
	const value = getValue(params, options.watchVariable);
	if (typeof value !== "string") return false;
	return options.list.includes(value);
};
//#endregion
//#region node_modules/@emailjs/browser/es/errors/blockedEmailError/blockedEmailError.js
const blockedEmailError = () => {
	return new EmailJSResponseStatus(403, "Forbidden");
};
//#endregion
//#region node_modules/@emailjs/browser/es/utils/validateLimitRateParams/validateLimitRateParams.js
const validateLimitRateParams = (throttle, id) => {
	if (typeof throttle !== "number" || throttle < 0) throw "The LimitRate throttle has to be a positive number";
	if (id && typeof id !== "string") throw "The LimitRate ID has to be a non-empty string";
};
//#endregion
//#region node_modules/@emailjs/browser/es/utils/isLimitRateHit/isLimitRateHit.js
const getLeftTime = async (id, throttle, storage) => {
	const lastTime = Number(await storage.get(id) || 0);
	return throttle - Date.now() + lastTime;
};
const isLimitRateHit = async (defaultID, options, storage) => {
	if (!options.throttle || !storage) return false;
	validateLimitRateParams(options.throttle, options.id);
	const id = options.id || defaultID;
	if (await getLeftTime(id, options.throttle, storage) > 0) return true;
	await storage.set(id, Date.now().toString());
	return false;
};
//#endregion
//#region node_modules/@emailjs/browser/es/errors/limitRateError/limitRateError.js
const limitRateError = () => {
	return new EmailJSResponseStatus(429, "Too Many Requests");
};
//#endregion
//#region node_modules/@emailjs/browser/es/methods/send/send.js
/**
* Send a template to the specific EmailJS service
* @param {string} serviceID - the EmailJS service ID
* @param {string} templateID - the EmailJS template ID
* @param {object} templateParams - the template params, what will be set to the EmailJS template
* @param {object} options - the EmailJS SDK config options
* @returns {Promise<EmailJSResponseStatus>}
*/
const send = async (serviceID, templateID, templateParams, options) => {
	const opts = buildOptions(options);
	const publicKey = opts.publicKey || store.publicKey;
	const blockHeadless = opts.blockHeadless || store.blockHeadless;
	const storageProvider = opts.storageProvider || store.storageProvider;
	const blockList = {
		...store.blockList,
		...opts.blockList
	};
	const limitRate = {
		...store.limitRate,
		...opts.limitRate
	};
	if (blockHeadless && isHeadless(navigator)) return Promise.reject(headlessError());
	validateParams(publicKey, serviceID, templateID);
	validateTemplateParams(templateParams);
	if (templateParams && isBlockedValueInParams(blockList, templateParams)) return Promise.reject(blockedEmailError());
	if (await isLimitRateHit(location.pathname, limitRate, storageProvider)) return Promise.reject(limitRateError());
	return sendPost("/api/v1.0/email/send", JSON.stringify({
		lib_version: "4.4.1",
		user_id: publicKey,
		service_id: serviceID,
		template_id: templateID,
		template_params: templateParams
	}), { "Content-type": "application/json" });
};
//#endregion
//#region node_modules/@emailjs/browser/es/utils/validateForm/validateForm.js
const validateForm = (form) => {
	if (!form || form.nodeName !== "FORM") throw "The 3rd parameter is expected to be the HTML form element or the style selector of the form";
};
//#endregion
//#region node_modules/@emailjs/browser/es/methods/sendForm/sendForm.js
const findHTMLForm = (form) => {
	return typeof form === "string" ? document.querySelector(form) : form;
};
/**
* Send a form the specific EmailJS service
* @param {string} serviceID - the EmailJS service ID
* @param {string} templateID - the EmailJS template ID
* @param {string | HTMLFormElement} form - the form element or selector
* @param {object} options - the EmailJS SDK config options
* @returns {Promise<EmailJSResponseStatus>}
*/
const sendForm = async (serviceID, templateID, form, options) => {
	const opts = buildOptions(options);
	const publicKey = opts.publicKey || store.publicKey;
	const blockHeadless = opts.blockHeadless || store.blockHeadless;
	const storageProvider = store.storageProvider || opts.storageProvider;
	const blockList = {
		...store.blockList,
		...opts.blockList
	};
	const limitRate = {
		...store.limitRate,
		...opts.limitRate
	};
	if (blockHeadless && isHeadless(navigator)) return Promise.reject(headlessError());
	const currentForm = findHTMLForm(form);
	validateParams(publicKey, serviceID, templateID);
	validateForm(currentForm);
	const formData = new FormData(currentForm);
	if (isBlockedValueInParams(blockList, formData)) return Promise.reject(blockedEmailError());
	if (await isLimitRateHit(location.pathname, limitRate, storageProvider)) return Promise.reject(limitRateError());
	formData.append("lib_version", "4.4.1");
	formData.append("service_id", serviceID);
	formData.append("template_id", templateID);
	formData.append("user_id", publicKey);
	return sendPost("/api/v1.0/email/send-form", formData);
};
//#endregion
//#region node_modules/@emailjs/browser/es/index.js
var es_exports = /* @__PURE__ */ __exportAll({
	EmailJSResponseStatus: () => EmailJSResponseStatus,
	default: () => es_default,
	init: () => init,
	send: () => send,
	sendForm: () => sendForm
});
var es_default = {
	init,
	send,
	sendForm,
	EmailJSResponseStatus
};
//#endregion
//#region node_modules/fuse.js/dist/fuse.mjs
var fuse_exports = /* @__PURE__ */ __exportAll({ default: () => entry_default });
/**
* Fuse.js v7.5.0 - Lightweight fuzzy-search (http://fusejs.io)
*
* Copyright (c) 2026 Kiro Risk (http://kiro.me)
* All Rights Reserved. Apache Software License 2.0
*
* http://www.apache.org/licenses/LICENSE-2.0
*/
function isArray(value) {
	return !Array.isArray ? getTag(value) === "[object Array]" : Array.isArray(value);
}
function baseToString(value) {
	if (typeof value == "string") return value;
	if (typeof value === "bigint") return value.toString();
	const result = value + "";
	return result == "0" && 1 / value == -Infinity ? "-0" : result;
}
function toString(value) {
	return value == null ? "" : baseToString(value);
}
function isString(value) {
	return typeof value === "string";
}
function isNumber(value) {
	return typeof value === "number";
}
function isBoolean(value) {
	return value === true || value === false || isObjectLike(value) && getTag(value) == "[object Boolean]";
}
function isObject(value) {
	return typeof value === "object";
}
function isObjectLike(value) {
	return isObject(value) && value !== null;
}
function isDefined(value) {
	return value !== void 0 && value !== null;
}
function isBlank(value) {
	return !value.trim().length;
}
function getTag(value) {
	return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
}
const INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
const INVALID_DOC_INDEX = "Invalid doc index: must be a non-negative integer within the bounds of the docs array";
const LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) => `Invalid value for key ${key}`;
const PATTERN_LENGTH_TOO_LARGE = (max) => `Pattern length exceeds max of ${max}.`;
const MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;
const INVALID_KEY_WEIGHT_VALUE = (key) => `Property 'weight' in key '${key}' must be a positive integer`;
const FUSE_MATCH_TOKEN_SEARCH_UNSUPPORTED = "Fuse.match does not support useTokenSearch: token search requires corpus-level statistics (df, fieldCount) that a one-off string comparison does not have. Use new Fuse(...).search(...) instead.";
const hasOwn = Object.prototype.hasOwnProperty;
var KeyStore = class {
	constructor(keys) {
		this._keys = [];
		this._keyMap = {};
		let totalWeight = 0;
		keys.forEach((key) => {
			const obj = createKey(key);
			this._keys.push(obj);
			this._keyMap[obj.id] = obj;
			totalWeight += obj.weight;
		});
		this._keys.forEach((key) => {
			key.weight /= totalWeight;
		});
	}
	get(keyId) {
		return this._keyMap[keyId];
	}
	keys() {
		return this._keys;
	}
	toJSON() {
		return JSON.stringify(this._keys);
	}
};
function createKey(key) {
	let path = null;
	let id = null;
	let src = null;
	let weight = 1;
	let getFn = null;
	if (isString(key) || isArray(key)) {
		src = key;
		path = createKeyPath(key);
		id = createKeyId(key);
	} else {
		if (!hasOwn.call(key, "name")) throw new Error(MISSING_KEY_PROPERTY("name"));
		const name = key.name;
		src = name;
		if (hasOwn.call(key, "weight") && key.weight !== void 0) {
			weight = key.weight;
			if (weight <= 0) throw new Error(INVALID_KEY_WEIGHT_VALUE(createKeyId(name)));
		}
		path = createKeyPath(name);
		id = createKeyId(name);
		getFn = key.getFn ?? null;
	}
	return {
		path,
		id,
		weight,
		src,
		getFn
	};
}
function createKeyPath(key) {
	return isArray(key) ? key : key.split(".");
}
function createKeyId(key) {
	return isArray(key) ? key.join(".") : key;
}
function get(obj, path) {
	const list = [];
	let arr = false;
	const deepGet = (obj, path, index, arrayIndex) => {
		if (!isDefined(obj)) return;
		if (!path[index]) list.push(arrayIndex !== void 0 ? {
			v: obj,
			i: arrayIndex
		} : obj);
		else {
			const value = obj[path[index]];
			if (!isDefined(value)) return;
			if (index === path.length - 1 && (isString(value) || isNumber(value) || isBoolean(value) || typeof value === "bigint")) list.push(arrayIndex !== void 0 ? {
				v: toString(value),
				i: arrayIndex
			} : toString(value));
			else if (isArray(value)) {
				arr = true;
				for (let i = 0, len = value.length; i < len; i += 1) deepGet(value[i], path, index + 1, i);
			} else if (path.length) deepGet(value, path, index + 1, arrayIndex);
		}
	};
	deepGet(obj, isString(path) ? path.split(".") : path, 0);
	return arr ? list : list[0];
}
const MatchOptions = {
	includeMatches: false,
	findAllMatches: false,
	minMatchCharLength: 1
};
const BasicOptions = {
	isCaseSensitive: false,
	ignoreDiacritics: false,
	includeScore: false,
	keys: [],
	shouldSort: true,
	sortFn: (a, b) => a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
};
const FuzzyOptions = {
	location: 0,
	threshold: .6,
	distance: 100
};
const AdvancedOptions = {
	useExtendedSearch: false,
	useTokenSearch: false,
	tokenize: void 0,
	tokenMatch: "any",
	getFn: get,
	ignoreLocation: false,
	ignoreFieldNorm: false,
	fieldNormWeight: 1
};
const Config = Object.freeze({
	...BasicOptions,
	...MatchOptions,
	...FuzzyOptions,
	...AdvancedOptions
});
function isWordSeparator(code) {
	return code >= 9 && code <= 13 || code === 32 || code === 160;
}
function norm(weight = 1, mantissa = 3) {
	const cache = /* @__PURE__ */ new Map();
	const m = Math.pow(10, mantissa);
	return {
		get(value) {
			let numTokens = 0;
			let inWord = false;
			for (let i = 0; i < value.length; i++) if (!isWordSeparator(value.charCodeAt(i))) {
				if (!inWord) {
					numTokens++;
					inWord = true;
				}
			} else inWord = false;
			if (numTokens === 0) numTokens = 1;
			if (cache.has(numTokens)) return cache.get(numTokens);
			const n = Math.round(m / Math.pow(numTokens, .5 * weight)) / m;
			cache.set(numTokens, n);
			return n;
		},
		clear() {
			cache.clear();
		}
	};
}
var FuseIndex = class {
	constructor({ getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
		this.norm = norm(fieldNormWeight, 3);
		this.getFn = getFn;
		this.isCreated = false;
		this.docs = [];
		this.keys = [];
		this._keysMap = {};
		this.setIndexRecords();
	}
	setSources(docs = []) {
		this.docs = docs;
	}
	setIndexRecords(records = []) {
		this.records = records;
	}
	setKeys(keys = []) {
		this.keys = keys;
		this._keysMap = {};
		keys.forEach((key, idx) => {
			this._keysMap[key.id] = idx;
		});
	}
	create() {
		if (this.isCreated || !this.docs.length) return;
		this.isCreated = true;
		const len = this.docs.length;
		this.records = new Array(len);
		let recordCount = 0;
		if (isString(this.docs[0])) for (let i = 0; i < len; i++) {
			const record = this._createStringRecord(this.docs[i], i);
			if (record) this.records[recordCount++] = record;
		}
		else for (let i = 0; i < len; i++) this.records[recordCount++] = this._createObjectRecord(this.docs[i], i);
		this.records.length = recordCount;
		this.norm.clear();
	}
	add(doc, docIndex) {
		if (!Number.isInteger(docIndex) || docIndex < 0) throw new Error(INVALID_DOC_INDEX);
		if (isString(doc)) {
			const record = this._createStringRecord(doc, docIndex);
			if (record) this.records.push(record);
			return record;
		}
		const record = this._createObjectRecord(doc, docIndex);
		this.records.push(record);
		return record;
	}
	removeAt(idx) {
		if (!Number.isInteger(idx) || idx < 0) throw new Error(INVALID_DOC_INDEX);
		for (let i = 0, len = this.records.length; i < len; i += 1) if (this.records[i].i === idx) {
			this.records.splice(i, 1);
			break;
		}
		for (let i = 0, len = this.records.length; i < len; i += 1) if (this.records[i].i > idx) this.records[i].i -= 1;
	}
	removeAll(indices) {
		const toRemove = /* @__PURE__ */ new Set();
		for (const v of indices) if (Number.isInteger(v) && v >= 0) toRemove.add(v);
		if (toRemove.size === 0) return;
		this.records = this.records.filter((r) => !toRemove.has(r.i));
		const sorted = Array.from(toRemove).sort((a, b) => a - b);
		for (const record of this.records) {
			let lo = 0;
			let hi = sorted.length;
			while (lo < hi) {
				const mid = lo + hi >>> 1;
				if (sorted[mid] < record.i) lo = mid + 1;
				else hi = mid;
			}
			record.i -= lo;
		}
	}
	getValueForItemAtKeyId(item, keyId) {
		return item[this._keysMap[keyId]];
	}
	size() {
		return this.records.length;
	}
	_createStringRecord(doc, docIndex) {
		if (!isDefined(doc) || isBlank(doc)) return null;
		return {
			v: doc,
			i: docIndex,
			n: this.norm.get(doc)
		};
	}
	_createObjectRecord(doc, docIndex) {
		const record = {
			i: docIndex,
			$: {}
		};
		for (let keyIndex = 0, keyLen = this.keys.length; keyIndex < keyLen; keyIndex++) {
			const key = this.keys[keyIndex];
			const value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
			if (!isDefined(value)) continue;
			if (isArray(value)) {
				const subRecords = [];
				for (let i = 0, len = value.length; i < len; i += 1) {
					const item = value[i];
					if (!isDefined(item)) continue;
					if (isString(item)) {
						if (!isBlank(item)) {
							const subRecord = {
								v: item,
								i,
								n: this.norm.get(item)
							};
							subRecords.push(subRecord);
						}
					} else if (isDefined(item.v)) {
						const text = isString(item.v) ? item.v : toString(item.v);
						if (!isBlank(text)) {
							const subRecord = {
								v: text,
								i: item.i,
								n: this.norm.get(text)
							};
							subRecords.push(subRecord);
						}
					}
				}
				record.$[keyIndex] = subRecords;
			} else if (isString(value) && !isBlank(value)) {
				const subRecord = {
					v: value,
					n: this.norm.get(value)
				};
				record.$[keyIndex] = subRecord;
			}
		}
		return record;
	}
	toJSON() {
		return {
			keys: this.keys.map(({ getFn, ...key }) => key),
			records: this.records
		};
	}
};
function createIndex(keys, docs, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
	const myIndex = new FuseIndex({
		getFn,
		fieldNormWeight
	});
	myIndex.setKeys(keys.map(createKey));
	myIndex.setSources(docs);
	myIndex.create();
	return myIndex;
}
function parseIndex(data, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
	const { keys, records } = data;
	const myIndex = new FuseIndex({
		getFn,
		fieldNormWeight
	});
	myIndex.setKeys(keys);
	myIndex.setIndexRecords(records);
	return myIndex;
}
function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
	const indices = [];
	let start = -1;
	let end = -1;
	let i = 0;
	for (let len = matchmask.length; i < len; i += 1) {
		const match = matchmask[i];
		if (match && start === -1) start = i;
		else if (!match && start !== -1) {
			end = i - 1;
			if (end - start + 1 >= minMatchCharLength) indices.push([start, end]);
			start = -1;
		}
	}
	if (matchmask[i - 1] && i - start >= minMatchCharLength) indices.push([start, i - 1]);
	return indices;
}
function search(text, pattern, patternAlphabet, { location = Config.location, distance = Config.distance, threshold = Config.threshold, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, includeMatches = Config.includeMatches, ignoreLocation = Config.ignoreLocation } = {}) {
	if (pattern.length > 32) throw new Error(PATTERN_LENGTH_TOO_LARGE(32));
	const patternLen = pattern.length;
	const textLen = text.length;
	const expectedLocation = Math.max(0, Math.min(location, textLen));
	let currentThreshold = threshold;
	let bestLocation = expectedLocation;
	const calcScore = (errors, currentLocation) => {
		const accuracy = errors / patternLen;
		if (ignoreLocation) return accuracy;
		const proximity = Math.abs(expectedLocation - currentLocation);
		if (!distance) return proximity ? 1 : accuracy;
		return accuracy + proximity / distance;
	};
	const computeMatches = minMatchCharLength > 1 || includeMatches;
	const matchMask = computeMatches ? Array(textLen) : [];
	let index;
	while ((index = text.indexOf(pattern, bestLocation)) > -1) {
		const score = calcScore(0, index);
		currentThreshold = Math.min(score, currentThreshold);
		bestLocation = index + patternLen;
		if (computeMatches) {
			let i = 0;
			while (i < patternLen) {
				matchMask[index + i] = 1;
				i += 1;
			}
		}
	}
	bestLocation = -1;
	let lastBitArr = [];
	let finalScore = 1;
	let bestErrors = 0;
	let binMax = patternLen + textLen;
	const mask = 1 << patternLen - 1;
	for (let i = 0; i < patternLen; i += 1) {
		let binMin = 0;
		let binMid = binMax;
		while (binMin < binMid) {
			if (calcScore(i, expectedLocation + binMid) <= currentThreshold) binMin = binMid;
			else binMax = binMid;
			binMid = Math.floor((binMax - binMin) / 2 + binMin);
		}
		binMax = binMid;
		let start = Math.max(1, expectedLocation - binMid + 1);
		const finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
		const bitArr = Array(finish + 2);
		bitArr[finish + 1] = (1 << i) - 1;
		for (let j = finish; j >= start; j -= 1) {
			const currentLocation = j - 1;
			const charMatch = patternAlphabet[text[currentLocation]];
			bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
			if (i) bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
			if (bitArr[j] & mask) {
				finalScore = calcScore(i, currentLocation);
				if (finalScore <= currentThreshold) {
					currentThreshold = finalScore;
					bestLocation = currentLocation;
					bestErrors = i;
					if (bestLocation <= expectedLocation) break;
					start = Math.max(1, 2 * expectedLocation - bestLocation);
				}
			}
		}
		if (calcScore(i + 1, expectedLocation) > currentThreshold) break;
		lastBitArr = bitArr;
	}
	if (computeMatches && bestLocation >= 0) {
		const matchEnd = Math.min(textLen - 1, bestLocation + patternLen - 1 + bestErrors);
		for (let k = bestLocation; k <= matchEnd; k += 1) if (patternAlphabet[text[k]]) matchMask[k] = 1;
	}
	const result = {
		isMatch: bestLocation >= 0,
		score: Math.max(.001, finalScore)
	};
	if (computeMatches) {
		const indices = convertMaskToIndices(matchMask, minMatchCharLength);
		if (!indices.length) result.isMatch = false;
		else if (includeMatches) result.indices = indices;
	}
	return result;
}
function createPatternAlphabet(pattern) {
	const mask = {};
	for (let i = 0, len = pattern.length; i < len; i += 1) {
		const char = pattern.charAt(i);
		mask[char] = (mask[char] || 0) | 1 << len - i - 1;
	}
	return mask;
}
function mergeIndices(indices) {
	if (indices.length <= 1) return indices;
	indices.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
	const merged = [indices[0]];
	for (let i = 1, len = indices.length; i < len; i += 1) {
		const last = merged[merged.length - 1];
		const curr = indices[i];
		if (curr[0] <= last[1] + 1) last[1] = Math.max(last[1], curr[1]);
		else merged.push(curr);
	}
	return merged;
}
const NON_DECOMPOSABLE_MAP = {
	"ł": "l",
	"Ł": "L",
	"đ": "d",
	"Đ": "D",
	"ø": "o",
	"Ø": "O",
	"ħ": "h",
	"Ħ": "H",
	"ŧ": "t",
	"Ŧ": "T",
	"ı": "i",
	"ß": "ss"
};
const NON_DECOMPOSABLE_RE = new RegExp("[" + Object.keys(NON_DECOMPOSABLE_MAP).join("") + "]", "g");
const stripDiacritics = typeof String.prototype.normalize === "function" ? (str) => str.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g, "").replace(NON_DECOMPOSABLE_RE, (ch) => NON_DECOMPOSABLE_MAP[ch]) : (str) => str;
var BitapSearch = class {
	constructor(pattern, { location = Config.location, threshold = Config.threshold, distance = Config.distance, includeMatches = Config.includeMatches, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, isCaseSensitive = Config.isCaseSensitive, ignoreDiacritics = Config.ignoreDiacritics, ignoreLocation = Config.ignoreLocation } = {}) {
		this.options = {
			location,
			threshold,
			distance,
			includeMatches,
			findAllMatches,
			minMatchCharLength,
			isCaseSensitive,
			ignoreDiacritics,
			ignoreLocation
		};
		pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
		pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
		this.pattern = pattern;
		this.chunks = [];
		if (!this.pattern.length) return;
		const addChunk = (pattern, startIndex) => {
			this.chunks.push({
				pattern,
				alphabet: createPatternAlphabet(pattern),
				startIndex
			});
		};
		const len = this.pattern.length;
		if (len > 32) {
			let i = 0;
			const remainder = len % 32;
			const end = len - remainder;
			while (i < end) {
				addChunk(this.pattern.substr(i, 32), i);
				i += 32;
			}
			if (remainder) {
				const startIndex = len - 32;
				addChunk(this.pattern.substr(startIndex), startIndex);
			}
		} else addChunk(this.pattern, 0);
	}
	searchIn(text) {
		const { isCaseSensitive, ignoreDiacritics, includeMatches } = this.options;
		text = isCaseSensitive ? text : text.toLowerCase();
		text = ignoreDiacritics ? stripDiacritics(text) : text;
		if (this.pattern === text) {
			if (text.length < this.options.minMatchCharLength) return {
				isMatch: false,
				score: 1
			};
			const result = {
				isMatch: true,
				score: 0
			};
			if (includeMatches) result.indices = [[0, text.length - 1]];
			return result;
		}
		const { location, distance, threshold, findAllMatches, minMatchCharLength, ignoreLocation } = this.options;
		const allIndices = [];
		let totalScore = 0;
		let hasMatches = false;
		this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
			const { isMatch, score, indices } = search(text, pattern, alphabet, {
				location: location + startIndex,
				distance,
				threshold,
				findAllMatches,
				minMatchCharLength,
				includeMatches,
				ignoreLocation
			});
			if (isMatch) hasMatches = true;
			totalScore += score;
			if (isMatch && indices) allIndices.push(...indices);
		});
		const result = {
			isMatch: hasMatches,
			score: hasMatches ? totalScore / this.chunks.length : 1
		};
		if (hasMatches && includeMatches) result.indices = mergeIndices(allIndices);
		return result;
	}
};
const MULTI_MATCH_TYPES = /* @__PURE__ */ new Set(["fuzzy", "include"]);
function isInverse(type) {
	return type.startsWith("inverse");
}
const matchers = [
	{
		type: "exact",
		multiRegex: /^="(.*)"$/,
		singleRegex: /^=(.*)$/,
		create: (pattern) => ({
			type: "exact",
			search(text) {
				const isMatch = text === pattern;
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, pattern.length - 1]
				};
			}
		})
	},
	{
		type: "include",
		multiRegex: /^'"(.*)"$/,
		singleRegex: /^'(.*)$/,
		create: (pattern) => ({
			type: "include",
			search(text) {
				let location = 0;
				let index;
				const indices = [];
				const patternLen = pattern.length;
				while ((index = text.indexOf(pattern, location)) > -1) {
					location = index + patternLen;
					indices.push([index, location - 1]);
				}
				const isMatch = !!indices.length;
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices
				};
			}
		})
	},
	{
		type: "prefix-exact",
		multiRegex: /^\^"(.*)"$/,
		singleRegex: /^\^(.*)$/,
		create: (pattern) => ({
			type: "prefix-exact",
			search(text) {
				const isMatch = text.startsWith(pattern);
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, pattern.length - 1]
				};
			}
		})
	},
	{
		type: "inverse-prefix-exact",
		multiRegex: /^!\^"(.*)"$/,
		singleRegex: /^!\^(.*)$/,
		create: (pattern) => ({
			type: "inverse-prefix-exact",
			search(text) {
				const isMatch = !text.startsWith(pattern);
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, text.length - 1]
				};
			}
		})
	},
	{
		type: "inverse-suffix-exact",
		multiRegex: /^!"(.*)"\$$/,
		singleRegex: /^!(.*)\$$/,
		create: (pattern) => ({
			type: "inverse-suffix-exact",
			search(text) {
				const isMatch = !text.endsWith(pattern);
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, text.length - 1]
				};
			}
		})
	},
	{
		type: "suffix-exact",
		multiRegex: /^"(.*)"\$$/,
		singleRegex: /^(.*)\$$/,
		create: (pattern) => ({
			type: "suffix-exact",
			search(text) {
				const isMatch = text.endsWith(pattern);
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [text.length - pattern.length, text.length - 1]
				};
			}
		})
	},
	{
		type: "inverse-exact",
		multiRegex: /^!"(.*)"$/,
		singleRegex: /^!(.*)$/,
		create: (pattern) => ({
			type: "inverse-exact",
			search(text) {
				const isMatch = text.indexOf(pattern) === -1;
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, text.length - 1]
				};
			}
		})
	},
	{
		type: "fuzzy",
		multiRegex: /^"(.*)"$/,
		singleRegex: /^(.*)$/,
		create: (pattern, options = {}) => {
			const bitap = new BitapSearch(pattern, {
				location: options.location ?? Config.location,
				threshold: options.threshold ?? Config.threshold,
				distance: options.distance ?? Config.distance,
				includeMatches: options.includeMatches ?? Config.includeMatches,
				findAllMatches: options.findAllMatches ?? Config.findAllMatches,
				minMatchCharLength: options.minMatchCharLength ?? Config.minMatchCharLength,
				isCaseSensitive: options.isCaseSensitive ?? Config.isCaseSensitive,
				ignoreDiacritics: options.ignoreDiacritics ?? Config.ignoreDiacritics,
				ignoreLocation: options.ignoreLocation ?? Config.ignoreLocation
			});
			return {
				type: "fuzzy",
				search(text) {
					return bitap.searchIn(text);
				}
			};
		}
	}
];
const matchersLen = matchers.length;
const ESCAPED_PIPE = "\0";
const OR_TOKEN = "|";
function tokenize(pattern) {
	const tokens = [];
	const len = pattern.length;
	let i = 0;
	while (i < len) {
		while (i < len && pattern[i] === " ") i++;
		if (i >= len) break;
		let j = i;
		while (j < len && pattern[j] !== " " && pattern[j] !== "\"") j++;
		if (j < len && pattern[j] === "\"") {
			j++;
			while (j < len) {
				if (pattern[j] === "\"") {
					const next = j + 1;
					if (next >= len || pattern[next] === " ") {
						j++;
						break;
					}
					if (pattern[next] === "$" && (next + 1 >= len || pattern[next + 1] === " ")) {
						j += 2;
						break;
					}
				}
				j++;
			}
			tokens.push(pattern.substring(i, j));
			i = j;
		} else {
			while (j < len && pattern[j] !== " ") j++;
			tokens.push(pattern.substring(i, j));
			i = j;
		}
	}
	return tokens;
}
function getMatch(pattern, exp) {
	const matches = pattern.match(exp);
	return matches ? matches[1] : null;
}
function parseQuery(pattern, options = {}) {
	return pattern.replace(/\\\|/g, ESCAPED_PIPE).split(OR_TOKEN).map((item) => {
		const query = tokenize(item.replace(/\u0000/g, "|").trim()).filter((item) => item && !!item.trim());
		const results = [];
		for (let i = 0, len = query.length; i < len; i += 1) {
			const queryItem = query[i];
			let found = false;
			let idx = -1;
			while (!found && ++idx < matchersLen) {
				const def = matchers[idx];
				const token = getMatch(queryItem, def.multiRegex);
				if (token) {
					results.push(def.create(token, options));
					found = true;
				}
			}
			if (found) continue;
			idx = -1;
			while (++idx < matchersLen) {
				const def = matchers[idx];
				const token = getMatch(queryItem, def.singleRegex);
				if (token) {
					results.push(def.create(token, options));
					break;
				}
			}
		}
		return results;
	});
}
var ExtendedSearch = class {
	constructor(pattern, { isCaseSensitive = Config.isCaseSensitive, ignoreDiacritics = Config.ignoreDiacritics, includeMatches = Config.includeMatches, minMatchCharLength = Config.minMatchCharLength, ignoreLocation = Config.ignoreLocation, findAllMatches = Config.findAllMatches, location = Config.location, threshold = Config.threshold, distance = Config.distance } = {}) {
		this.query = null;
		this.options = {
			isCaseSensitive,
			ignoreDiacritics,
			includeMatches,
			minMatchCharLength,
			findAllMatches,
			ignoreLocation,
			location,
			threshold,
			distance
		};
		pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
		pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
		this.pattern = pattern;
		this.query = parseQuery(this.pattern, this.options);
	}
	static condition(_, options) {
		return options.useExtendedSearch;
	}
	searchIn(text) {
		const query = this.query;
		if (!query) return {
			isMatch: false,
			score: 1
		};
		const { includeMatches, isCaseSensitive, ignoreDiacritics } = this.options;
		text = isCaseSensitive ? text : text.toLowerCase();
		text = ignoreDiacritics ? stripDiacritics(text) : text;
		let numMatches = 0;
		const allIndices = [];
		let totalScore = 0;
		let hasInverse = false;
		for (let i = 0, qLen = query.length; i < qLen; i += 1) {
			const searchers = query[i];
			allIndices.length = 0;
			numMatches = 0;
			hasInverse = false;
			for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
				const matcher = searchers[j];
				const { isMatch, indices, score } = matcher.search(text);
				if (isMatch) {
					numMatches += 1;
					totalScore += score;
					if (isInverse(matcher.type)) hasInverse = true;
					if (includeMatches) if (MULTI_MATCH_TYPES.has(matcher.type)) allIndices.push(...indices);
					else allIndices.push(indices);
				} else {
					totalScore = 0;
					numMatches = 0;
					allIndices.length = 0;
					hasInverse = false;
					break;
				}
			}
			if (numMatches) {
				const result = {
					isMatch: true,
					score: totalScore / numMatches
				};
				if (hasInverse) result.hasInverse = true;
				if (includeMatches) result.indices = mergeIndices(allIndices);
				return result;
			}
		}
		return {
			isMatch: false,
			score: 1
		};
	}
};
const registeredSearchers = [];
function register(...args) {
	registeredSearchers.push(...args);
}
function createSearcher(pattern, options) {
	for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
		const searcherClass = registeredSearchers[i];
		if (searcherClass.condition(pattern, options)) return new searcherClass(pattern, options);
	}
	return new BitapSearch(pattern, options);
}
const LogicalOperator = {
	AND: "$and",
	OR: "$or"
};
const KeyType = {
	PATH: "$path",
	PATTERN: "$val"
};
const isExpression = (query) => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
const isPath = (query) => !!query[KeyType.PATH];
const isLeaf = (query) => !isArray(query) && isObject(query) && !isExpression(query);
const convertToExplicit = (query) => ({ [LogicalOperator.AND]: Object.keys(query).map((key) => ({ [key]: query[key] })) });
function parse(query, options, { auto = true } = {}) {
	const next = (query) => {
		if (isString(query)) {
			const obj = {
				keyId: null,
				pattern: query
			};
			if (auto) obj.searcher = createSearcher(query, options);
			return obj;
		}
		const keys = Object.keys(query);
		const isQueryPath = isPath(query);
		if (!isQueryPath && keys.length > 1 && !isExpression(query)) return next(convertToExplicit(query));
		if (isLeaf(query)) {
			const key = isQueryPath ? query[KeyType.PATH] : keys[0];
			const pattern = isQueryPath ? query[KeyType.PATTERN] : query[key];
			if (!isString(pattern)) throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
			const obj = {
				keyId: createKeyId(key),
				pattern
			};
			if (auto) obj.searcher = createSearcher(pattern, options);
			return obj;
		}
		const node = {
			children: [],
			operator: keys[0]
		};
		keys.forEach((key) => {
			const value = query[key];
			if (isArray(value)) value.forEach((item) => {
				node.children.push(next(item));
			});
		});
		return node;
	};
	if (!isExpression(query)) query = convertToExplicit(query);
	return next(query);
}
function computeScoreSingle(matches, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
	let totalScore = 1;
	matches.forEach(({ key, norm, score }) => {
		const weight = key ? key.weight : null;
		totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm));
	});
	return totalScore;
}
function computeScore(results, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
	results.forEach((result) => {
		result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
	});
}
var MaxHeap = class {
	constructor(limit, comparator) {
		this.limit = limit;
		this.heap = [];
		this.comparator = comparator;
	}
	get size() {
		return this.heap.length;
	}
	insert(item) {
		if (this.size < this.limit) {
			this.heap.push(item);
			this._bubbleUp(this.size - 1);
		} else if (this.comparator(item, this.heap[0]) < 0) {
			this.heap[0] = item;
			this._sinkDown(0);
		}
	}
	extractSorted() {
		return this.heap.sort(this.comparator);
	}
	_bubbleUp(i) {
		const heap = this.heap;
		while (i > 0) {
			const parent = i - 1 >> 1;
			if (this.comparator(heap[i], heap[parent]) <= 0) break;
			const tmp = heap[i];
			heap[i] = heap[parent];
			heap[parent] = tmp;
			i = parent;
		}
	}
	_sinkDown(i) {
		const heap = this.heap;
		const len = heap.length;
		let largest = i;
		do {
			i = largest;
			const left = 2 * i + 1;
			const right = 2 * i + 2;
			if (left < len && this.comparator(heap[left], heap[largest]) > 0) largest = left;
			if (right < len && this.comparator(heap[right], heap[largest]) > 0) largest = right;
			if (largest !== i) {
				const tmp = heap[i];
				heap[i] = heap[largest];
				heap[largest] = tmp;
			}
		} while (largest !== i);
	}
};
function formatMatches(result) {
	const matches = [];
	result.matches.forEach((match) => {
		if (!isDefined(match.indices) || !match.indices.length) return;
		const obj = {
			indices: match.indices,
			value: match.value
		};
		if (match.key) obj.key = match.key.id;
		if (match.idx > -1) obj.refIndex = match.idx;
		matches.push(obj);
	});
	return matches;
}
function format(results, docs, { includeMatches = Config.includeMatches, includeScore = Config.includeScore } = {}) {
	return results.map((result) => {
		const { idx } = result;
		const data = {
			item: docs[idx],
			refIndex: idx
		};
		if (includeMatches) data.matches = formatMatches(result);
		if (includeScore) data.score = result.score;
		return data;
	});
}
const DEFAULT_TOKEN = /[\p{L}\p{M}\p{N}_]+/gu;
const warned = /* @__PURE__ */ new WeakSet();
function warnNonGlobal(regex) {
	if (!warned.has(regex)) {
		warned.add(regex);
		console.warn(`[Fuse] tokenize regex ${regex} lacks the global flag; only the first match per text will be returned. Add the 'g' flag.`);
	}
}
function resolveTokenize(tokenize) {
	if (typeof tokenize === "function") {
		let validated = false;
		return (text) => {
			const result = tokenize(text);
			if (!validated) {
				validated = true;
				if (!Array.isArray(result) || result.some((t) => typeof t !== "string")) throw new Error(`[Fuse] tokenize function must return string[]; received ${Array.isArray(result) ? "array containing non-strings" : typeof result}.`);
			}
			return result;
		};
	}
	if (tokenize instanceof RegExp) {
		if (!tokenize.global) warnNonGlobal(tokenize);
		return (text) => text.match(tokenize) || [];
	}
	return (text) => text.match(DEFAULT_TOKEN) || [];
}
function createAnalyzer({ isCaseSensitive = false, ignoreDiacritics = false, tokenize } = {}) {
	const tokenizeFn = resolveTokenize(tokenize);
	return { tokenize(text) {
		if (!isCaseSensitive) text = text.toLowerCase();
		if (ignoreDiacritics) text = stripDiacritics(text);
		return tokenizeFn(text);
	} };
}
var TokenSearch = class {
	static condition(_, options) {
		return options.useTokenSearch;
	}
	constructor(pattern, options) {
		this.options = options;
		this.analyzer = createAnalyzer({
			isCaseSensitive: options.isCaseSensitive,
			ignoreDiacritics: options.ignoreDiacritics,
			tokenize: options.tokenize
		});
		const queryTerms = this.analyzer.tokenize(pattern);
		const { df, fieldCount } = options._invertedIndex;
		this.termSearchers = [];
		this.idfWeights = [];
		for (const term of queryTerms) {
			this.termSearchers.push(new BitapSearch(term, {
				location: options.location,
				threshold: options.threshold,
				distance: options.distance,
				includeMatches: options.includeMatches,
				findAllMatches: options.findAllMatches,
				minMatchCharLength: options.minMatchCharLength,
				isCaseSensitive: options.isCaseSensitive,
				ignoreDiacritics: options.ignoreDiacritics,
				ignoreLocation: true
			}));
			const docFreq = df.get(term) || 0;
			const idf = Math.log(1 + (fieldCount - docFreq + .5) / (docFreq + .5));
			this.idfWeights.push(idf);
		}
		this.combineAll = options.tokenMatch === "all";
		this.numTerms = this.termSearchers.length;
		this.useMask = this.numTerms <= 31;
	}
	searchIn(text) {
		if (!this.termSearchers.length) return {
			isMatch: false,
			score: 1
		};
		const allIndices = [];
		let weightedScore = 0;
		let maxPossibleScore = 0;
		let matchedCount = 0;
		let matchedMask = 0;
		const matchedTerms = this.combineAll && !this.useMask ? /* @__PURE__ */ new Set() : null;
		for (let i = 0; i < this.termSearchers.length; i++) {
			const result = this.termSearchers[i].searchIn(text);
			const idf = this.idfWeights[i];
			maxPossibleScore += idf;
			if (result.isMatch) {
				matchedCount++;
				weightedScore += idf * (1 - result.score);
				if (result.indices) allIndices.push(...result.indices);
				if (this.combineAll) if (this.useMask) matchedMask |= 1 << i;
				else matchedTerms.add(i);
			}
		}
		if (matchedCount === 0) return {
			isMatch: false,
			score: 1
		};
		const normalized = maxPossibleScore > 0 ? 1 - weightedScore / maxPossibleScore : 0;
		const searchResult = {
			isMatch: true,
			score: Math.max(.001, normalized)
		};
		if (this.options.includeMatches && allIndices.length) searchResult.indices = mergeIndices(allIndices);
		if (this.combineAll) {
			if (this.useMask) searchResult.matchedMask = matchedMask;
			else searchResult.matchedTerms = matchedTerms;
			searchResult.termCount = this.numTerms;
		}
		return searchResult;
	}
};
function addField(index, text, docIdx, analyzer) {
	const tokens = analyzer.tokenize(text);
	if (!tokens.length) return;
	index.fieldCount++;
	index.docFieldCount.set(docIdx, (index.docFieldCount.get(docIdx) || 0) + 1);
	const distinctTerms = new Set(tokens);
	let perDocTerms = index.docTermFieldHits.get(docIdx);
	if (!perDocTerms) {
		perDocTerms = /* @__PURE__ */ new Map();
		index.docTermFieldHits.set(docIdx, perDocTerms);
	}
	for (const term of distinctTerms) {
		perDocTerms.set(term, (perDocTerms.get(term) || 0) + 1);
		index.df.set(term, (index.df.get(term) || 0) + 1);
	}
}
function ingestRecord(index, record, keyCount, analyzer) {
	const { i: docIdx, v, $: fields } = record;
	if (v !== void 0) {
		addField(index, v, docIdx, analyzer);
		return;
	}
	if (!fields) return;
	for (let keyIdx = 0; keyIdx < keyCount; keyIdx++) {
		const value = fields[keyIdx];
		if (!value) continue;
		if (Array.isArray(value)) for (const sub of value) addField(index, sub.v, docIdx, analyzer);
		else addField(index, value.v, docIdx, analyzer);
	}
}
function buildInvertedIndex(records, keyCount, analyzer) {
	const index = {
		fieldCount: 0,
		df: /* @__PURE__ */ new Map(),
		docFieldCount: /* @__PURE__ */ new Map(),
		docTermFieldHits: /* @__PURE__ */ new Map()
	};
	for (const record of records) ingestRecord(index, record, keyCount, analyzer);
	return index;
}
function addToInvertedIndex(index, record, keyCount, analyzer) {
	ingestRecord(index, record, keyCount, analyzer);
}
function removeFromInvertedIndex(index, docIdx) {
	const fieldCount = index.docFieldCount.get(docIdx);
	if (fieldCount === void 0) return;
	index.fieldCount -= fieldCount;
	index.docFieldCount.delete(docIdx);
	const perDocTerms = index.docTermFieldHits.get(docIdx);
	if (!perDocTerms) return;
	for (const [term, hits] of perDocTerms) {
		const next = (index.df.get(term) || 0) - hits;
		if (next <= 0) index.df.delete(term);
		else index.df.set(term, next);
	}
	index.docTermFieldHits.delete(docIdx);
}
function removeAndShiftInvertedIndex(index, removedIndices) {
	if (removedIndices.length === 0) return;
	const sorted = Array.from(new Set(removedIndices)).sort((a, b) => a - b);
	for (const idx of sorted) removeFromInvertedIndex(index, idx);
	const shift = (oldIdx) => {
		let lo = 0;
		let hi = sorted.length;
		while (lo < hi) {
			const mid = lo + hi >>> 1;
			if (sorted[mid] < oldIdx) lo = mid + 1;
			else hi = mid;
		}
		return oldIdx - lo;
	};
	const firstRemoved = sorted[0];
	const shiftedDocFieldCount = /* @__PURE__ */ new Map();
	for (const [oldKey, count] of index.docFieldCount) shiftedDocFieldCount.set(oldKey > firstRemoved ? shift(oldKey) : oldKey, count);
	index.docFieldCount = shiftedDocFieldCount;
	const shiftedDocTermFieldHits = /* @__PURE__ */ new Map();
	for (const [oldKey, terms] of index.docTermFieldHits) shiftedDocTermFieldHits.set(oldKey > firstRemoved ? shift(oldKey) : oldKey, terms);
	index.docTermFieldHits = shiftedDocTermFieldHits;
}
var Fuse = class {
	constructor(docs, options, index) {
		this.options = {
			...Config,
			...options
		};
		if (this.options.useExtendedSearch && false);
		if (this.options.useTokenSearch && false);
		this._keyStore = new KeyStore(this.options.keys);
		this._docs = docs;
		this._myIndex = null;
		this._invertedIndex = null;
		this.setCollection(docs, index);
		this._lastQuery = null;
		this._lastSearcher = null;
	}
	_getSearcher(query) {
		if (this._lastQuery === query) return this._lastSearcher;
		const searcher = createSearcher(query, this._invertedIndex ? {
			...this.options,
			_invertedIndex: this._invertedIndex
		} : this.options);
		this._lastQuery = query;
		this._lastSearcher = searcher;
		return searcher;
	}
	setCollection(docs, index) {
		this._docs = docs;
		if (index && !(index instanceof FuseIndex)) throw new Error(INCORRECT_INDEX_TYPE);
		this._myIndex = index || createIndex(this.options.keys, this._docs, {
			getFn: this.options.getFn,
			fieldNormWeight: this.options.fieldNormWeight
		});
		if (this.options.useTokenSearch) {
			const analyzer = createAnalyzer({
				isCaseSensitive: this.options.isCaseSensitive,
				ignoreDiacritics: this.options.ignoreDiacritics,
				tokenize: this.options.tokenize
			});
			this._invertedIndex = buildInvertedIndex(this._myIndex.records, this._myIndex.keys.length, analyzer);
		}
		this._invalidateSearcherCache();
	}
	add(doc) {
		if (!isDefined(doc)) return;
		this._docs.push(doc);
		const record = this._myIndex.add(doc, this._docs.length - 1);
		if (this._invertedIndex && record) {
			const analyzer = createAnalyzer({
				isCaseSensitive: this.options.isCaseSensitive,
				ignoreDiacritics: this.options.ignoreDiacritics,
				tokenize: this.options.tokenize
			});
			addToInvertedIndex(this._invertedIndex, record, this._myIndex.keys.length, analyzer);
		}
		this._invalidateSearcherCache();
	}
	remove(predicate = () => false) {
		const results = [];
		const indicesToRemove = [];
		for (let i = 0, len = this._docs.length; i < len; i += 1) if (predicate(this._docs[i], i)) {
			results.push(this._docs[i]);
			indicesToRemove.push(i);
		}
		if (indicesToRemove.length) {
			if (this._invertedIndex) removeAndShiftInvertedIndex(this._invertedIndex, indicesToRemove);
			const toRemove = new Set(indicesToRemove);
			this._docs = this._docs.filter((_, i) => !toRemove.has(i));
			this._myIndex.removeAll(indicesToRemove);
			this._invalidateSearcherCache();
		}
		return results;
	}
	removeAt(idx) {
		if (!Number.isInteger(idx) || idx < 0 || idx >= this._docs.length) throw new Error(INVALID_DOC_INDEX);
		if (this._invertedIndex) removeAndShiftInvertedIndex(this._invertedIndex, [idx]);
		const doc = this._docs.splice(idx, 1)[0];
		this._myIndex.removeAt(idx);
		this._invalidateSearcherCache();
		return doc;
	}
	_invalidateSearcherCache() {
		this._lastQuery = null;
		this._lastSearcher = null;
	}
	getIndex() {
		return this._myIndex;
	}
	_normalizedKeys() {
		return this._myIndex.keys.map((key) => this._keyStore.get(key.id) || key);
	}
	search(query, options) {
		const { limit = -1 } = options || {};
		const { includeMatches, includeScore, shouldSort, sortFn, ignoreFieldNorm } = this.options;
		if (isString(query) && !query.trim()) {
			let docs = this._docs.map((item, idx) => ({
				item,
				refIndex: idx
			}));
			if (isNumber(limit) && limit > -1) docs = docs.slice(0, limit);
			return docs;
		}
		const useHeap = shouldSort && isNumber(limit) && limit > 0 && isString(query);
		const comparator = sortFn;
		const stable = (a, b) => comparator(a, b) || a.idx - b.idx;
		let results;
		if (useHeap) {
			const heap = new MaxHeap(limit, stable);
			if (isString(this._docs[0])) this._searchStringList(query, {
				heap,
				ignoreFieldNorm
			});
			else this._searchObjectList(query, {
				heap,
				ignoreFieldNorm
			});
			results = heap.extractSorted();
		} else {
			results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
			computeScore(results, { ignoreFieldNorm });
			if (shouldSort) results.sort(isString(query) ? stable : comparator);
			if (isNumber(limit) && limit > -1) results = results.slice(0, limit);
		}
		return format(results, this._docs, {
			includeMatches,
			includeScore
		});
	}
	_searchStringList(query, { heap, ignoreFieldNorm } = {}) {
		const searcher = this._getSearcher(query);
		const requireAllTokens = this.options.useTokenSearch && this.options.tokenMatch === "all";
		const { records } = this._myIndex;
		const results = heap ? null : [];
		records.forEach(({ v: text, i: idx, n: norm }) => {
			if (!isDefined(text)) return;
			const searchResult = searcher.searchIn(text);
			if (searchResult.isMatch) {
				const match = {
					score: searchResult.score,
					value: text,
					norm,
					indices: searchResult.indices
				};
				if (requireAllTokens) {
					match.matchedMask = searchResult.matchedMask;
					match.matchedTerms = searchResult.matchedTerms;
					match.termCount = searchResult.termCount;
				}
				const matches = [match];
				if (!requireAllTokens || this._coversAllTokens(matches)) {
					const result = {
						item: text,
						idx,
						matches
					};
					if (heap) {
						result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
						heap.insert(result);
					} else results.push(result);
				}
			}
		});
		return results;
	}
	_searchLogical(query) {
		const expression = parse(query, this.options);
		const keys = this._normalizedKeys();
		const evaluate = (node, item, idx) => {
			if (!("children" in node)) {
				const { keyId, searcher } = node;
				let matches;
				if (keyId === null) {
					matches = [];
					keys.forEach((key, keyIndex) => {
						matches.push(...this._findMatches({
							key,
							value: item[keyIndex],
							searcher
						}));
					});
				} else matches = this._findMatches({
					key: this._keyStore.get(keyId),
					value: this._myIndex.getValueForItemAtKeyId(item, keyId),
					searcher
				});
				if (matches && matches.length) return [{
					idx,
					item,
					matches
				}];
				return [];
			}
			const { children, operator } = node;
			const res = [];
			for (let i = 0, len = children.length; i < len; i += 1) {
				const child = children[i];
				const result = evaluate(child, item, idx);
				if (result.length) res.push(...result);
				else if (operator === LogicalOperator.AND) return [];
			}
			return res;
		};
		const records = this._myIndex.records;
		const resultMap = /* @__PURE__ */ new Map();
		const results = [];
		records.forEach(({ $: item, i: idx }) => {
			if (isDefined(item)) {
				const expResults = evaluate(expression, item, idx);
				if (expResults.length) {
					if (!resultMap.has(idx)) {
						resultMap.set(idx, {
							idx,
							item,
							matches: []
						});
						results.push(resultMap.get(idx));
					}
					expResults.forEach(({ matches }) => {
						resultMap.get(idx).matches.push(...matches);
					});
				}
			}
		});
		return results;
	}
	_searchObjectList(query, { heap, ignoreFieldNorm } = {}) {
		const searcher = this._getSearcher(query);
		const requireAllTokens = this.options.useTokenSearch && this.options.tokenMatch === "all";
		const { records } = this._myIndex;
		const keys = this._normalizedKeys();
		const results = heap ? null : [];
		records.forEach(({ $: item, i: idx }) => {
			if (!isDefined(item)) return;
			const matches = [];
			let anyKeyFailed = false;
			let hasInverse = false;
			keys.forEach((key, keyIndex) => {
				const keyMatches = this._findMatches({
					key,
					value: item[keyIndex],
					searcher
				});
				if (keyMatches.length) {
					matches.push(...keyMatches);
					if (keyMatches[0].hasInverse) hasInverse = true;
				} else anyKeyFailed = true;
			});
			if (hasInverse && anyKeyFailed) return;
			if (matches.length && (!requireAllTokens || this._coversAllTokens(matches))) {
				const result = {
					idx,
					item,
					matches
				};
				if (heap) {
					result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
					heap.insert(result);
				} else results.push(result);
			}
		});
		return results;
	}
	_findMatches({ key, value, searcher }) {
		if (!isDefined(value)) return [];
		const matches = [];
		if (isArray(value)) value.forEach(({ v: text, i: idx, n: norm }) => {
			if (!isDefined(text)) return;
			const searchResult = searcher.searchIn(text);
			if (searchResult.isMatch) {
				const match = {
					score: searchResult.score,
					key,
					value: text,
					idx,
					norm,
					indices: searchResult.indices,
					hasInverse: searchResult.hasInverse
				};
				if (searchResult.termCount !== void 0) {
					match.matchedMask = searchResult.matchedMask;
					match.matchedTerms = searchResult.matchedTerms;
					match.termCount = searchResult.termCount;
				}
				matches.push(match);
			}
		});
		else {
			const { v: text, n: norm } = value;
			const searchResult = searcher.searchIn(text);
			if (searchResult.isMatch) {
				const match = {
					score: searchResult.score,
					key,
					value: text,
					norm,
					indices: searchResult.indices,
					hasInverse: searchResult.hasInverse
				};
				if (searchResult.termCount !== void 0) {
					match.matchedMask = searchResult.matchedMask;
					match.matchedTerms = searchResult.matchedTerms;
					match.termCount = searchResult.termCount;
				}
				matches.push(match);
			}
		}
		return matches;
	}
	_coversAllTokens(matches) {
		const termCount = matches.length ? matches[0].termCount : void 0;
		if (termCount === void 0) return true;
		if (termCount <= 31) {
			let coverage = 0;
			for (let i = 0; i < matches.length; i++) coverage |= matches[i].matchedMask || 0;
			return coverage === 2 ** termCount - 1;
		}
		const coverage = /* @__PURE__ */ new Set();
		for (let i = 0; i < matches.length; i++) {
			const terms = matches[i].matchedTerms;
			if (terms) for (const t of terms) coverage.add(t);
		}
		return coverage.size === termCount;
	}
};
Fuse.version = "7.5.0";
Fuse.createIndex = createIndex;
Fuse.parseIndex = parseIndex;
Fuse.config = Config;
Fuse.match = function(pattern, text, options) {
	if (options && options.useTokenSearch) throw new Error(FUSE_MATCH_TOKEN_SEARCH_UNSUPPORTED);
	return createSearcher(pattern, {
		...Config,
		...options
	}).searchIn(text);
};
Fuse.parseQuery = parse;
register(ExtendedSearch);
register(TokenSearch);
Fuse.use = function(...plugins) {
	plugins.forEach((plugin) => register(plugin));
};
var entry_default = Fuse;
//#endregion
//#region node_modules/marked/lib/marked.esm.js
var marked_esm_exports = /* @__PURE__ */ __exportAll({
	Hooks: () => S,
	Lexer: () => x,
	Marked: () => Q,
	Parser: () => b,
	Renderer: () => P,
	TextRenderer: () => L,
	Tokenizer: () => y,
	defaults: () => T,
	getDefaults: () => A,
	lexer: () => gn,
	marked: () => f,
	options: () => un,
	parse: () => dn,
	parseInline: () => hn,
	parser: () => kn,
	setOptions: () => pn,
	use: () => bt,
	walkTokens: () => cn
});
/**
* marked v18.0.13 - a markdown parser
* Copyright (c) 2018-2026, MarkedJS. (MIT License)
* Copyright (c) 2011-2018, Christopher Jeffrey. (MIT License)
* https://github.com/markedjs/marked
*/
/**
* DO NOT EDIT THIS FILE
* The code in this file is generated from files in ./src/
*/
function A() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}
var T = A();
function U(l) {
	T = l;
}
var E = { exec: () => null };
function I(l) {
	let e = [];
	return (t) => {
		let n = Math.max(0, Math.min(3, t - 1)), i = e[n];
		return i || (i = l(n), e[n] = i), i;
	};
}
function d(l, e = "") {
	let t = typeof l == "string" ? l : l.source, n = {
		replace: (i, r) => {
			let o = typeof r == "string" ? r : r.source;
			return o = o.replace(m.caret, "$1"), t = t.replace(i, o), n;
		},
		getRegex: () => new RegExp(t, e)
	};
	return n;
}
var we = ((l = "") => {
	try {
		return !!new RegExp("(?<=1)(?<!1)" + l);
	} catch {
		return !1;
	}
})();
var m = {
	codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm,
	outputLinkReplace: /\\([\[\]])/g,
	indentCodeCompensation: /^(\s+)(?:```)/,
	beginningSpace: /^\s+/,
	endingHash: /#$/,
	startingSpaceChar: /^ /,
	endingSpaceChar: / $/,
	endingSpaceTabChar: /[ \t]$/,
	nonSpaceChar: /[^ ]/,
	newLineCharGlobal: /\n/g,
	tabCharGlobal: /\t/g,
	multipleSpaceGlobal: /\s+/g,
	blankLine: /^[ \t]*$/,
	doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
	blockquoteStart: /^ {0,3}>/,
	blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
	blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
	listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
	listIsTask: /^\[[ xX]\] +\S/,
	listReplaceTask: /^\[[ xX]\] +/,
	listTaskCheckbox: /\[[ xX]\]/,
	anyLine: /\n.*\n/,
	hrefBrackets: /^<(.*)>$/,
	tableDelimiter: /[:|]/,
	tableAlignChars: /^\||\| *$/g,
	tableRowBlankLine: /\n[ \t]*$/,
	tableAlignRight: /^ *-+: *$/,
	tableAlignCenter: /^ *:-+: *$/,
	tableAlignLeft: /^ *:-+ *$/,
	startATag: /^<a /i,
	endATag: /^<\/a>/i,
	startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
	endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
	startAngleBracket: /^</,
	endAngleBracket: />$/,
	pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
	unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
	escapeTest: /[&<>"']/,
	escapeReplace: /[&<>"']/g,
	escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	caret: /(^|[^\[])\^/g,
	percentDecode: /%25/g,
	findPipe: /\|/g,
	splitPipe: / \|/,
	slashPipe: /\\\|/g,
	carriageReturn: /\r\n|\r/g,
	spaceLine: /^ +$/gm,
	notSpaceStart: /^\S*/,
	endingNewline: /\n$/,
	listItemRegex: (l) => new RegExp(`^( {0,3}${l})((?:[	 ][^\\n]*)?(?:\\n|$))`),
	nextBulletRegex: I((l) => new RegExp(`^ {0,${l}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
	hrRegex: I((l) => new RegExp(`^ {0,${l}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),
	fencesBeginRegex: I((l) => new RegExp(`^ {0,${l}}(?:\`\`\`|~~~)`)),
	headingBeginRegex: I((l) => new RegExp(`^ {0,${l}}#`)),
	htmlBeginRegex: I((l) => new RegExp(`^ {0,${l}}(?:</?(?:${H})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`, "i")),
	blockquoteBeginRegex: I((l) => new RegExp(`^ {0,${l}}>`))
};
var ye = /^(?:[ \t]*(?:\n|$))+/;
var Pe = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var Se = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var v = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var _e = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var K = / {0,3}(?:[*+-]|\d{1,9}[.)])/;
var le = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
var ue = d(le).replace(/bull/g, K).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
var $e = d(le).replace(/bull/g, K).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
var W = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/;
var Le = /^[^\n]+/;
var X = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
var ze = d(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", X).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var Ee = d(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, K).getRegex();
var H = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var J = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var Me = d("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", J).replace("tag", H).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var pe = (l) => d(W).replace("hr", v).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", l).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", H).getRegex();
var Ae = pe(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/);
var Ie = pe(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/);
var V = {
	blockquote: d(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ie).getRegex(),
	code: Pe,
	def: ze,
	fences: Se,
	heading: _e,
	hr: v,
	html: Me,
	lheading: ue,
	list: Ee,
	newline: ye,
	paragraph: Ae,
	table: E,
	text: Le
};
var ie = d("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", v).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", H).getRegex();
var Be = {
	...V,
	lheading: $e,
	table: ie,
	paragraph: d(W).replace("hr", v).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ie).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", H).getRegex()
};
var De = {
	...V,
	html: d(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", J).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: E,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: d(W).replace("hr", v).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", ue).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
};
var qe = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var ve = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var ce = /^( {2,}|\\)\n(?!\s*$)[ \t]*/;
var He = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var _ = /[\p{P}\p{S}]/u;
var C = /[\s\p{P}\p{S}]/u;
var Z = /[^\s\p{P}\p{S}]/u;
var Ze = d(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, C).getRegex();
var Ge = /[\p{Pi}\p{Ps}"']/u;
var he = /(?!~)[\p{P}\p{S}]/u;
var Qe = /(?!~)[\s\p{P}\p{S}]/u;
var Ne = /(?:[^\s\p{P}\p{S}]|~)/u;
var je = d(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", we ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
var de = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/;
var Ue = d(de, "u").replace(/punct/g, _).getRegex();
var Fe = d(de, "u").replace(/punct/g, he).getRegex();
var We = d(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, Ge).replace(/punct/g, _).getRegex();
var ke = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var Xe = d(ke, "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
var Je = d(ke, "gu").replace(/notPunctSpace/g, Ne).replace(/punctSpace/g, Qe).replace(/punct/g, he).getRegex();
var Ye = d("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
var et = d("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
var nt = d("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
var rt = d(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, _).getRegex();
var it = d("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
var ot = d(/\\(punct)/, "gu").replace(/punct/g, _).getRegex();
var at = d(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var lt = d(J).replace("(?:-->|$)", "-->").getRegex();
var ut = d("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", lt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var ge = /\[(?:\\[\s\S]|[^\[\]\\])*\]/;
var N = d(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", ge).getRegex();
var pt = d(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", N).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var ct = d(/^!?\[(label)\]\[(ref)\]/).replace("label", N).replace("ref", X).getRegex();
var ht = d(/^!?\[(ref)\](?:\[\])?/).replace("ref", X).getRegex();
var oe = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/;
var dt = d(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", ge).getRegex();
var kt = d("reflink|nolink(?!\\()", "g").replace("reflink", d(/^!?\[(label)\]\[(ref)\]/).replace("label", dt).replace("ref", oe).getRegex()).replace("nolink", d(/^!?\[(ref)\](?:\[\])?/).replace("ref", oe).getRegex()).getRegex();
var ae = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
var Y = {
	_backpedal: E,
	anyPunctuation: ot,
	autolink: at,
	blockSkip: je,
	br: ce,
	code: ve,
	del: E,
	delLDelim: E,
	delRDelim: E,
	emStrongLDelim: Ue,
	emStrongRDelimAst: Xe,
	emStrongRDelimUnd: et,
	escape: qe,
	link: pt,
	nolink: ht,
	punctuation: Ze,
	reflink: ct,
	reflinkSearch: kt,
	tag: ut,
	text: He,
	url: E
};
var gt = {
	...Y,
	emStrongLDelim: We,
	emStrongRDelimAst: Ye,
	emStrongRDelimUnd: nt,
	link: d(/^!?\[(label)\]\((.*?)\)/).replace("label", N).getRegex(),
	reflink: d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", N).getRegex()
};
var F = {
	...Y,
	emStrongRDelimAst: Je,
	emStrongLDelim: Fe,
	delLDelim: rt,
	delRDelim: it,
	url: d(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", ae).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: d(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", ae).getRegex()
};
var ft = {
	...F,
	br: d(ce).replace("{2,}", "*").getRegex(),
	text: d(F.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
var G = {
	normal: V,
	gfm: Be,
	pedantic: De
};
var B = {
	normal: Y,
	gfm: F,
	breaks: ft,
	pedantic: gt
};
var mt = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
var fe = (l) => mt[l];
function R(l, e) {
	if (e) {
		if (m.escapeTest.test(l)) return l.replace(m.escapeReplace, fe);
	} else if (m.escapeTestNoEncode.test(l)) return l.replace(m.escapeReplaceNoEncode, fe);
	return l;
}
function ee(l) {
	try {
		l = encodeURI(l).replace(m.percentDecode, "%");
	} catch {
		return null;
	}
	return l;
}
function te(l, e) {
	let n = l.replace(m.findPipe, (r, o, s) => {
		let u = !1, a = o;
		for (; --a >= 0 && s[a] === "\\";) u = !u;
		return u ? "|" : " |";
	}).split(m.splitPipe), i = 0;
	if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
	else for (; n.length < e;) n.push("");
	for (; i < n.length; i++) n[i] = n[i].trim().replace(m.slashPipe, "|");
	return n;
}
function $(l, e, t) {
	let n = l.length;
	if (n === 0) return "";
	let i = 0;
	for (; i < n;) {
		let r = l.charAt(n - i - 1);
		if (r === e && !t) i++;
		else if (r !== e && t) i++;
		else break;
	}
	return l.slice(0, n - i);
}
function ne(l) {
	let e = l.split(`
`), t = e.length - 1;
	for (; t >= 0 && m.blankLine.test(e[t]);) t--;
	return e.length - t <= 2 ? l : e.slice(0, t + 1).join(`
`);
}
function D(l) {
	return l.toLowerCase().toUpperCase().toLowerCase();
}
function me(l, e) {
	if (l.indexOf(e[1]) === -1) return -1;
	let t = 0;
	for (let n = 0; n < l.length; n++) if (l[n] === "\\") n++;
	else if (l[n] === e[0]) t++;
	else if (l[n] === e[1] && (t--, t < 0)) return n;
	return t > 0 ? -2 : -1;
}
function xe(l, e = 0) {
	let t = e, n = "";
	for (let i of l) if (i === "	") {
		let r = 4 - t % 4;
		n += " ".repeat(r), t += r;
	} else n += i, t++;
	return n;
}
function be(l, e, t, n, i) {
	let r = e.href, o = e.title || null, s = l[1].replace(i.other.outputLinkReplace, "$1"), u = l[0].charAt(0) === "!";
	n.state.inLink = !0;
	let a = n.state.linkEmitted, p = n.state.inRawBlock;
	n.state.linkEmitted = !1;
	let c = n.inlineTokens(s), h = n.state.linkEmitted;
	if (n.state.linkEmitted = a, n.state.inLink = !1, !u) {
		if (h) {
			n.state.inRawBlock = p;
			return;
		}
		n.state.linkEmitted = !0;
	}
	return {
		type: u ? "image" : "link",
		raw: t,
		href: r,
		title: o,
		text: s,
		tokens: c
	};
}
function xt(l, e, t) {
	let n = l.match(t.other.indentCodeCompensation);
	if (n === null) return e;
	let i = n[1];
	return e.split(`
`).map((r) => {
		let o = r.match(t.other.beginningSpace);
		if (o === null) return r;
		let [s] = o;
		return r.slice(Math.min(s.length, i.length));
	}).join(`
`);
}
function Re(l, e, t, n) {
	if (!e.includes("<")) return !1;
	for (let i = 0; i < e.length; i++) {
		if (e[i] === "\\") {
			i++;
			continue;
		}
		if (e[i] === "`") {
			let s = n.inline.code.exec(e.slice(i));
			if (s) {
				i += s[0].length - 1;
				continue;
			}
		}
		if (e[i] !== "<") continue;
		let r = l.slice(t + i), o = n.inline.tag.exec(r) || n.inline.autolink.exec(r);
		if (o) {
			if (o[0].length > e.length - i) return !0;
			i += o[0].length - 1;
		}
	}
	return !1;
}
var y = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || T;
	}
	space(e) {
		let t = this.rules.block.newline.exec(e);
		if (t && t[0].length > 0) return {
			type: "space",
			raw: t[0]
		};
	}
	code(e) {
		let t = this.rules.block.code.exec(e);
		if (t) {
			let n = this.options.pedantic ? t[0] : ne(t[0]);
			return {
				type: "code",
				raw: n,
				codeBlockStyle: "indented",
				text: n.replace(this.rules.other.codeRemoveIndent, "")
			};
		}
	}
	fences(e) {
		let t = this.rules.block.fences.exec(e);
		if (t) {
			let n = t[0], i = xt(n, t[3] || "", this.rules);
			return {
				type: "code",
				raw: n,
				lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
				text: i
			};
		}
	}
	heading(e) {
		let t = this.rules.block.heading.exec(e);
		if (t) {
			let n = t[2].trim();
			if (this.rules.other.endingHash.test(n)) {
				let i = $(n, "#");
				(this.options.pedantic || !i || this.rules.other.endingSpaceTabChar.test(i)) && (n = i.trim());
			}
			return {
				type: "heading",
				raw: $(t[0], `
`),
				depth: t[1].length,
				text: n,
				tokens: this.lexer.inline(n)
			};
		}
	}
	hr(e) {
		let t = this.rules.block.hr.exec(e);
		if (t) return {
			type: "hr",
			raw: $(t[0], `
`)
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let n = $(t[0], `
`).split(`
`), i = "", r = "", o = [];
			for (; n.length > 0;) {
				let s = !1, u = [], a = 0;
				for (; a < n.length; a++) if (this.rules.other.blockquoteStart.test(n[a])) u.push(n[a]), s = !0;
				else if (!s) u.push(n[a]);
				else break;
				n = n.slice(a);
				let p = u.join(`
`), c = p.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
				i = i ? `${i}
${p}` : p, r = r ? `${r}
${c}` : c;
				let h = this.lexer.state.top;
				if (this.lexer.state.top = !0, this.lexer.blockTokens(c, o, !0), this.lexer.state.top = h, n.length === 0) break;
				let k = o.at(-1);
				if (k?.type === "code") break;
				if (k?.type === "blockquote") {
					let O = k, g = n.join(`
`), w = O.raw + `
` + g.replace(this.rules.other.blockquoteSetextReplace2, ""), z = this.blockquote(w);
					o[o.length - 1] = z, i = `${i}
${g}`, r = r.substring(0, r.length - O.text.length) + z.text;
					break;
				} else if (k?.type === "list") {
					let O = k, g = O.raw + `
` + n.join(`
`), w = this.list(g);
					o[o.length - 1] = w, i = i.substring(0, i.length - k.raw.length) + w.raw, r = r.substring(0, r.length - O.raw.length) + w.raw, n = g.substring(o.at(-1).raw.length).split(`
`);
					continue;
				}
			}
			return {
				type: "blockquote",
				raw: i,
				tokens: o,
				text: r
			};
		}
	}
	list(e) {
		let t = this.rules.block.list.exec(e);
		if (t) {
			let n = t[1].trim(), i = n.length > 1, r = {
				type: "list",
				raw: "",
				ordered: i,
				start: i ? +n.slice(0, -1) : "",
				loose: !1,
				items: []
			};
			n = i ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = i ? n : "[*+-]");
			let o = this.rules.other.listItemRegex(n), s = !1;
			for (; e;) {
				let a = !1, p = "", c = "";
				if (!(t = o.exec(e)) || this.rules.block.hr.test(e)) break;
				p = t[0], e = e.substring(p.length);
				let h = xe(t[2].split(`
`, 1)[0], t[1].length), k = e.split(`
`, 1)[0], O = !h.trim(), g = 0;
				if (this.options.pedantic ? (g = 2, c = h.trimStart()) : O ? g = t[1].length + 1 : (g = h.search(this.rules.other.nonSpaceChar), g = g > 4 ? 1 : g, c = h.slice(g), g += t[1].length), O && this.rules.other.blankLine.test(k) && (p += k + `
`, e = e.substring(k.length + 1), a = !0), !a) {
					let w = this.rules.other.nextBulletRegex(g), z = this.rules.other.hrRegex(g), re = this.rules.other.fencesBeginRegex(g), se = this.rules.other.headingBeginRegex(g), Te = this.rules.other.htmlBeginRegex(g), Oe = this.rules.other.blockquoteBeginRegex(g);
					for (; e;) {
						let j = e.split(`
`, 1)[0], q;
						if (k = j, this.options.pedantic ? (k = k.replace(this.rules.other.listReplaceNesting, "  "), q = k) : q = k.replace(this.rules.other.tabCharGlobal, "    "), re.test(k) || se.test(k) || Te.test(k) || Oe.test(k) || w.test(k) || z.test(k)) break;
						if (q.search(this.rules.other.nonSpaceChar) >= g || !k.trim()) c += `
` + q.slice(g);
						else {
							if (O || h.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || re.test(h) || se.test(h) || z.test(h)) break;
							c += `
` + k;
						}
						O = !k.trim(), p += j + `
`, e = e.substring(j.length + 1), h = q.slice(g);
					}
				}
				r.loose || (s ? r.loose = !0 : this.rules.other.doubleBlankLine.test(p) && (s = !0)), r.items.push({
					type: "list_item",
					raw: p,
					task: !!this.options.gfm && this.rules.other.listIsTask.test(c),
					loose: !1,
					text: c,
					tokens: []
				}), r.raw += p;
			}
			let u = r.items.at(-1);
			if (u) u.raw = u.raw.trimEnd(), u.text = u.text.trimEnd();
			else return;
			r.raw = r.raw.trimEnd();
			for (let a of r.items) if (this.lexer.state.top = !1, a.tokens = this.lexer.blockTokens(a.text, []), !r.loose) {
				let p = a.tokens.filter((h) => h.type === "space");
				r.loose = p.length > 0 && p.some((h) => this.rules.other.anyLine.test(h.raw));
			}
			for (let a of r.items) {
				let p = a.tokens[0];
				if (a.task && (p?.type === "text" || p?.type === "paragraph")) {
					a.text = a.text.replace(this.rules.other.listReplaceTask, ""), p.raw = p.raw.replace(this.rules.other.listReplaceTask, ""), p.text = p.text.replace(this.rules.other.listReplaceTask, "");
					for (let h = this.lexer.inlineQueue.length - 1; h >= 0; h--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)) {
						this.lexer.inlineQueue[h].src = this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask, "");
						break;
					}
					let c = this.rules.other.listTaskCheckbox.exec(a.raw);
					if (c) {
						let h = {
							type: "checkbox",
							raw: c[0] + " ",
							checked: c[0] !== "[ ]"
						};
						a.checked = h.checked, r.loose ? a.tokens[0] && ["paragraph", "text"].includes(a.tokens[0].type) && "tokens" in a.tokens[0] && a.tokens[0].tokens ? (a.tokens[0].raw = h.raw + a.tokens[0].raw, a.tokens[0].text = h.raw + a.tokens[0].text, a.tokens[0].tokens.unshift(h)) : a.tokens.unshift({
							type: "paragraph",
							raw: h.raw,
							text: h.raw,
							tokens: [h]
						}) : a.tokens.unshift(h);
					}
				} else a.task && (a.task = !1);
			}
			if (r.loose) for (let a of r.items) {
				a.loose = !0;
				for (let p of a.tokens) p.type === "text" && (p.type = "paragraph");
			}
			return r;
		}
	}
	html(e) {
		let t = this.rules.block.html.exec(e);
		if (t) {
			let n = ne(t[0]);
			return {
				type: "html",
				block: !0,
				raw: n,
				pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
				text: n
			};
		}
	}
	def(e) {
		let t = this.rules.block.def.exec(e);
		if (t) {
			let n = D(t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: n,
				raw: $(t[0], `
`),
				href: i,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = te(t[1]), i = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], o = {
			type: "table",
			raw: $(t[0], `
`),
			header: [],
			align: [],
			rows: []
		};
		if (n.length === i.length) {
			for (let s of i) this.rules.other.tableAlignRight.test(s) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(s) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(s) ? o.align.push("left") : o.align.push(null);
			for (let s = 0; s < n.length; s++) o.header.push({
				text: n[s],
				tokens: this.lexer.inline(n[s]),
				header: !0,
				align: o.align[s]
			});
			for (let s of r) o.rows.push(te(s, o.header.length).map((u, a) => ({
				text: u,
				tokens: this.lexer.inline(u),
				header: !1,
				align: o.align[a]
			})));
			return o;
		}
	}
	lheading(e) {
		let t = this.rules.block.lheading.exec(e);
		if (t) {
			let n = t[1].trim();
			return {
				type: "heading",
				raw: $(t[0], `
`),
				depth: t[2].charAt(0) === "=" ? 1 : 2,
				text: n,
				tokens: this.lexer.inline(n)
			};
		}
	}
	paragraph(e) {
		let t = this.rules.block.paragraph.exec(e);
		if (t) {
			let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
			return {
				type: "paragraph",
				raw: t[0],
				text: n,
				tokens: this.lexer.inline(n)
			};
		}
	}
	text(e) {
		let t = this.rules.block.text.exec(e);
		if (t) return {
			type: "text",
			raw: t[0],
			text: t[0],
			tokens: this.lexer.inline(t[0])
		};
	}
	escape(e) {
		let t = this.rules.inline.escape.exec(e);
		if (t) return {
			type: "escape",
			raw: t[0],
			text: t[1]
		};
	}
	tag(e) {
		let t = this.rules.inline.tag.exec(e);
		if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
			type: "html",
			raw: t[0],
			inLink: this.lexer.state.inLink,
			inRawBlock: this.lexer.state.inRawBlock,
			block: !1,
			text: t[0]
		};
	}
	link(e) {
		let t = this.rules.inline.link.exec(e);
		if (t) {
			let n = t[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && Re(e, t[1], n, this.rules)) return;
			let i = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(i)) {
				if (!this.rules.other.endAngleBracket.test(i)) return;
				let s = $(i.slice(0, -1), "\\");
				if ((i.length - s.length) % 2 === 0) return;
			} else {
				let s = me(t[2], "()");
				if (s === -2) return;
				if (s > -1) {
					let a = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
					t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, a).trim(), t[3] = "";
				}
			}
			let r = t[2], o = "";
			if (this.options.pedantic) {
				let s = this.rules.other.pedanticHrefTitle.exec(r);
				s && (r = s[1], o = s[3]);
			} else o = t[3] ? t[3].slice(1, -1) : "";
			return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(i) ? r = r.slice(1) : r = r.slice(1, -1)), be(t, {
				href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
				title: o && o.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let i = n[0].charAt(0) === "!" ? 2 : 1;
			if (!this.options.pedantic && Re(e, n[1], i, this.rules)) return;
			let o = t[D((n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "))];
			if (!o) {
				let s = n[0].charAt(0);
				return {
					type: "text",
					raw: s,
					text: s
				};
			}
			return be(n, o, n[0], this.lexer, this.rules);
		}
	}
	emStrong(e, t, n = "") {
		let i = this.rules.inline.emStrongLDelim.exec(e);
		if (!i || !i[1] && !i[2] && !i[3] && !i[4] || i[4] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
		if (!(i[1] || i[3] || "") || !n || this.rules.inline.punctuation.exec(n)) {
			let o = [...i[0]].length - 1, s, u, a = o, p = 0, c = i[0][0], h = n === c, k = c === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
			for (k.lastIndex = 0, t = t.slice(-1 * e.length + o); (i = k.exec(t)) !== null;) {
				if (s = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !s) continue;
				if (u = [...s].length, i[3] || i[4]) {
					a += u;
					continue;
				} else if (i[5] || i[6]) {
					if (o % 3 && !((o + u) % 3)) {
						p += u;
						continue;
					}
					if (h) break;
				}
				if (a -= u, a > 0) continue;
				u = Math.min(u, u + a + p);
				let O = [...i[0]][0].length, g = e.slice(0, o + i.index + O + u);
				if (Math.min(o, u) % 2) {
					let z = g.slice(1, -1);
					return {
						type: "em",
						raw: g,
						text: z,
						tokens: this.lexer.inlineTokens(z)
					};
				}
				let w = g.slice(2, -2);
				return {
					type: "strong",
					raw: g,
					text: w,
					tokens: this.lexer.inlineTokens(w)
				};
			}
		}
	}
	codespan(e) {
		let t = this.rules.inline.code.exec(e);
		if (t) {
			let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), i = this.rules.other.nonSpaceChar.test(n), r = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
			return i && r && (n = n.substring(1, n.length - 1)), {
				type: "codespan",
				raw: t[0],
				text: n
			};
		}
	}
	br(e) {
		let t = this.rules.inline.br.exec(e);
		if (t) return {
			type: "br",
			raw: t[0]
		};
	}
	del(e, t, n = "") {
		let i = this.rules.inline.delLDelim.exec(e);
		if (!i) return;
		if (!(i[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
			let o = [...i[0]].length - 1, s, u, a = o, p = this.rules.inline.delRDelim;
			for (p.lastIndex = 0, t = t.slice(-1 * e.length + o); (i = p.exec(t)) !== null;) {
				if (s = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !s || (u = [...s].length, u !== o)) continue;
				if (i[3] || i[4]) {
					a += u;
					continue;
				}
				if (a -= u, a > 0) continue;
				u = Math.min(u, u + a);
				let c = [...i[0]][0].length, h = e.slice(0, o + i.index + c + u), k = h.slice(o, -o);
				return {
					type: "del",
					raw: h,
					text: k,
					tokens: this.lexer.inlineTokens(k)
				};
			}
		}
	}
	autolink(e) {
		let t = this.rules.inline.autolink.exec(e);
		if (t) {
			let n, i;
			return t[2] === "@" ? (n = t[1], i = "mailto:" + n) : (n = t[1], i = n), {
				type: "link",
				raw: t[0],
				text: n,
				href: i,
				autolink: !0,
				tokens: [{
					type: "text",
					raw: n,
					text: n
				}]
			};
		}
	}
	url(e) {
		let t;
		if (t = this.rules.inline.url.exec(e)) {
			let n, i;
			if (t[2] === "@") n = t[0], i = "mailto:" + n;
			else {
				let r;
				do
					r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
				while (r !== t[0]);
				n = t[0], t[1] === "www." ? i = "http://" + t[0] : i = t[0];
			}
			return {
				type: "link",
				raw: t[0],
				text: n,
				href: i,
				autolink: !0,
				tokens: [{
					type: "text",
					raw: n,
					text: n
				}]
			};
		}
	}
	inlineText(e) {
		let t = this.rules.inline.text.exec(e);
		if (t) {
			let n = this.lexer.state.inRawBlock;
			return {
				type: "text",
				raw: t[0],
				text: t[0],
				escaped: n
			};
		}
	}
};
var x = class l {
	tokens;
	options;
	state;
	inlineQueue;
	tokenizer;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || T, this.options.tokenizer = this.options.tokenizer || new y(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			linkEmitted: !1,
			top: !0
		};
		let t = {
			other: m,
			block: G.normal,
			inline: B.normal
		};
		this.options.pedantic ? (t.block = G.pedantic, t.inline = B.pedantic) : this.options.gfm && (t.block = G.gfm, this.options.breaks ? t.inline = B.breaks : t.inline = B.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: G,
			inline: B
		};
	}
	static lex(e, t) {
		return new l(t).lex(e);
	}
	static lexInline(e, t) {
		return new l(t).inlineTokens(e);
	}
	lex(e) {
		e = e.replace(m.carriageReturn, `
`), this.blockTokens(e, this.tokens);
		for (let t = 0; t < this.inlineQueue.length; t++) {
			let n = this.inlineQueue[t];
			this.inlineTokens(n.src, n.tokens);
		}
		return this.inlineQueue = [], this.tokens;
	}
	blockTokens(e, t = [], n = !1) {
		this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(m.tabCharGlobal, "    ").replace(m.spaceLine, ""));
		let i = 1 / 0;
		for (; e;) {
			if (e.length < i) i = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			let r;
			if (this.options.extensions?.block?.some((s) => (r = s.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), !0) : !1)) continue;
			if (r = this.tokenizer.space(e)) {
				e = e.substring(r.raw.length);
				let s = t.at(-1);
				r.raw.length === 1 && s !== void 0 ? s.raw += `
` : t.push(r);
				continue;
			}
			if (r = this.tokenizer.code(e)) {
				e = e.substring(r.raw.length);
				let s = t.at(-1);
				s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.at(-1).src = s.text) : t.push(r);
				continue;
			}
			if (r = this.tokenizer.fences(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.heading(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.hr(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.blockquote(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.list(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.html(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.def(e)) {
				e = e.substring(r.raw.length);
				let s = t.at(-1);
				s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
					href: r.href,
					title: r.title
				}, t.push(r));
				continue;
			}
			if (r = this.tokenizer.table(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			if (r = this.tokenizer.lheading(e)) {
				e = e.substring(r.raw.length), t.push(r);
				continue;
			}
			let o = e;
			if (this.options.extensions?.startBlock) {
				let s = 1 / 0, u = e.slice(1), a;
				this.options.extensions.startBlock.forEach((p) => {
					a = p.call({ lexer: this }, u), typeof a == "number" && a >= 0 && (s = Math.min(s, a));
				}), s < 1 / 0 && s >= 0 && (o = e.substring(0, s + 1));
			}
			if (this.state.top && (r = this.tokenizer.paragraph(o))) {
				let s = t.at(-1);
				n && s?.type === "paragraph" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r), n = o.length !== e.length, e = e.substring(r.raw.length);
				continue;
			}
			if (r = this.tokenizer.text(e)) {
				e = e.substring(r.raw.length);
				let s = t.at(-1);
				s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return this.state.top = !0, t;
	}
	inline(e, t = []) {
		return this.inlineQueue.push({
			src: e,
			tokens: t
		}), t;
	}
	linkInText(e) {
		if (!e.includes("[")) return !1;
		let t = this.tokenizer.rules.inline.link;
		for (let n of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t.test(n[0]) && e.charAt(n.index - 1) !== "!") return !0;
		for (let n of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
			let i = n[0], r = i.lastIndexOf("[");
			if (!(i.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, D(i.slice(r + 1, -1)))) && !(r > 1 && this.linkInText(i.slice(1, r - 1)))) return !0;
		}
		return !1;
	}
	inlineTokens(e, t = []) {
		this.tokenizer.lexer = this;
		let n = e;
		if (this.tokens.links && e.includes("[")) {
			let s = this.tokenizer.rules.inline.reflinkSearch, u = (a) => {
				let p = a.lastIndexOf("[");
				if (!Object.hasOwn(this.tokens.links, D(a.slice(p + 1, -1)))) return a;
				if (p > 1 && a.charAt(0) !== "!") {
					let c = a.slice(1, p - 1);
					if (this.linkInText(c)) return "[" + c.replace(s, u) + "][" + "a".repeat(a.length - p - 2) + "]";
				}
				return "[" + "a".repeat(a.length - 2) + "]";
			};
			n = n.replace(s, u);
		}
		n = n.replace(this.tokenizer.rules.inline.anyPunctuation, (s) => "+".repeat(s.length)), n = n.replace(this.tokenizer.rules.inline.blockSkip, (s, u, a) => {
			let p = a ? a.length : 0;
			return s.slice(0, p) + "[" + "a".repeat(s.length - p - 2) + "]";
		}), n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
		let i = !1, r = "", o = 1 / 0;
		for (; e;) {
			if (e.length < o) o = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			i || (r = ""), i = !1;
			let s;
			if (this.options.extensions?.inline?.some((a) => (s = a.call({ lexer: this }, e, t)) ? (e = e.substring(s.raw.length), t.push(s), !0) : !1)) continue;
			if (s = this.tokenizer.escape(e)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.tag(e)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.link(e)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.reflink(e, this.tokens.links)) {
				e = e.substring(s.raw.length);
				let a = t.at(-1);
				s.type === "text" && a?.type === "text" ? (a.raw += s.raw, a.text += s.text) : t.push(s);
				continue;
			}
			if (s = this.tokenizer.emStrong(e, n, r)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.codespan(e)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.br(e)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.del(e, n, r)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (s = this.tokenizer.autolink(e)) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			if (!this.state.inLink && (s = this.tokenizer.url(e))) {
				e = e.substring(s.raw.length), t.push(s);
				continue;
			}
			let u = e;
			if (this.options.extensions?.startInline) {
				let a = 1 / 0, p = e.slice(1), c;
				this.options.extensions.startInline.forEach((h) => {
					c = h.call({ lexer: this }, p), typeof c == "number" && c >= 0 && (a = Math.min(a, c));
				}), a < 1 / 0 && a >= 0 && (u = e.substring(0, a + 1));
			}
			if (s = this.tokenizer.inlineText(u)) {
				e = e.substring(s.raw.length), s.raw.slice(-1) !== "_" && (r = s.raw.slice(-1)), i = !0;
				let a = t.at(-1);
				a?.type === "text" ? (a.raw += s.raw, a.text += s.text) : t.push(s);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return t;
	}
	infiniteLoopError(e) {
		let t = "Infinite loop on byte: " + e;
		if (this.options.silent) console.error(t);
		else throw new Error(t);
	}
};
var P = class {
	options;
	parser;
	constructor(e) {
		this.options = e || T;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let i = (t || "").match(m.notSpaceStart)?.[0], r = e ? e.replace(m.endingNewline, "") + `
` : "";
		return i ? "<pre><code class=\"language-" + R(i) + "\">" + (n ? r : R(r, !0)) + `</code></pre>
` : "<pre><code>" + (n ? r : R(r, !0)) + `</code></pre>
`;
	}
	blockquote({ tokens: e }) {
		return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
	}
	html({ text: e }) {
		return e;
	}
	def(e) {
		return "";
	}
	heading({ tokens: e, depth: t }) {
		return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
	}
	hr(e) {
		return `<hr>
`;
	}
	list(e) {
		let t = e.ordered, n = e.start, i = "";
		for (let s = 0; s < e.items.length; s++) {
			let u = e.items[s];
			i += this.listitem(u);
		}
		let r = t ? "ol" : "ul", o = t && n !== 1 ? " start=\"" + n + "\"" : "";
		return "<" + r + o + `>
` + i + "</" + r + `>
`;
	}
	listitem(e) {
		return `<li>${this.parser.parse(e.tokens)}</li>
`;
	}
	checkbox({ checked: e }) {
		return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\"> ";
	}
	paragraph({ tokens: e }) {
		return `<p>${this.parser.parseInline(e)}</p>
`;
	}
	table(e) {
		let t = "", n = "";
		for (let r = 0; r < e.header.length; r++) n += this.tablecell(e.header[r]);
		t += this.tablerow({ text: n });
		let i = "";
		for (let r = 0; r < e.rows.length; r++) {
			let o = e.rows[r];
			n = "";
			for (let s = 0; s < o.length; s++) n += this.tablecell(o[s]);
			i += this.tablerow({ text: n });
		}
		return i && (i = `<tbody>${i}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + i + `</table>
`;
	}
	tablerow({ text: e }) {
		return `<tr>
${e}</tr>
`;
	}
	tablecell(e) {
		let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
		return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
	}
	strong({ tokens: e }) {
		return `<strong>${this.parser.parseInline(e)}</strong>`;
	}
	em({ tokens: e }) {
		return `<em>${this.parser.parseInline(e)}</em>`;
	}
	codespan({ text: e }) {
		return `<code>${R(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, text: n, tokens: i, autolink: r }) {
		let o = r ? R(n, !0) : this.parser.parseInline(i), s = ee(e);
		if (s === null) return o;
		e = R(s, r);
		let u = "<a href=\"" + e + "\"";
		return t && (u += " title=\"" + R(t) + "\""), u += ">" + o + "</a>", u;
	}
	image({ href: e, title: t, text: n, tokens: i }) {
		i && (n = this.parser.parseInline(i, this.parser.textRenderer));
		let r = ee(e);
		if (r === null) return R(n);
		e = r;
		let o = `<img src="${R(e)}" alt="${R(n)}"`;
		return t && (o += ` title="${R(t)}"`), o += ">", o;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : R(e.text);
	}
};
var L = class {
	strong({ text: e }) {
		return e;
	}
	em({ text: e }) {
		return e;
	}
	codespan({ text: e }) {
		return e;
	}
	del({ text: e }) {
		return e;
	}
	html({ text: e }) {
		return e;
	}
	text({ text: e }) {
		return e;
	}
	link({ text: e }) {
		return "" + e;
	}
	image({ text: e }) {
		return "" + e;
	}
	br() {
		return "";
	}
	checkbox({ raw: e }) {
		return e;
	}
};
var b = class l {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || T, this.options.renderer = this.options.renderer || new P(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new L();
	}
	static parse(e, t) {
		return new l(t).parse(e);
	}
	static parseInline(e, t) {
		return new l(t).parseInline(e);
	}
	parse(e) {
		this.renderer.parser = this;
		let t = "";
		for (let n = 0; n < e.length; n++) {
			let i = e[n];
			if (this.options.extensions?.renderers?.[i.type]) {
				let o = i, s = this.options.extensions.renderers[o.type].call({ parser: this }, o);
				if (s !== !1 || ![
					"space",
					"hr",
					"heading",
					"code",
					"table",
					"blockquote",
					"list",
					"checkbox",
					"html",
					"def",
					"paragraph",
					"text"
				].includes(o.type)) {
					t += s || "";
					continue;
				}
			}
			let r = i;
			switch (r.type) {
				case "space":
					t += this.renderer.space(r);
					break;
				case "hr":
					t += this.renderer.hr(r);
					break;
				case "heading":
					t += this.renderer.heading(r);
					break;
				case "code":
					t += this.renderer.code(r);
					break;
				case "table":
					t += this.renderer.table(r);
					break;
				case "blockquote":
					t += this.renderer.blockquote(r);
					break;
				case "list":
					t += this.renderer.list(r);
					break;
				case "checkbox":
					t += this.renderer.checkbox(r);
					break;
				case "html":
					t += this.renderer.html(r);
					break;
				case "def":
					t += this.renderer.def(r);
					break;
				case "paragraph":
					t += this.renderer.paragraph(r);
					break;
				case "text":
					t += this.renderer.text(r);
					break;
				default: {
					let o = "Token with \"" + r.type + "\" type was not found.";
					if (this.options.silent) return console.error(o), "";
					throw new Error(o);
				}
			}
		}
		return t;
	}
	parseInline(e, t = this.renderer) {
		this.renderer.parser = this;
		let n = "";
		for (let i = 0; i < e.length; i++) {
			let r = e[i];
			if (this.options.extensions?.renderers?.[r.type]) {
				let s = this.options.extensions.renderers[r.type].call({ parser: this }, r);
				if (s !== !1 || ![
					"escape",
					"html",
					"link",
					"image",
					"checkbox",
					"strong",
					"em",
					"codespan",
					"br",
					"del",
					"text"
				].includes(r.type)) {
					n += s || "";
					continue;
				}
			}
			let o = r;
			switch (o.type) {
				case "escape":
					n += t.text(o);
					break;
				case "html":
					n += t.html(o);
					break;
				case "link":
					n += t.link(o);
					break;
				case "image":
					n += t.image(o);
					break;
				case "checkbox":
					n += t.checkbox(o);
					break;
				case "strong":
					n += t.strong(o);
					break;
				case "em":
					n += t.em(o);
					break;
				case "codespan":
					n += t.codespan(o);
					break;
				case "br":
					n += t.br(o);
					break;
				case "del":
					n += t.del(o);
					break;
				case "text":
					n += t.text(o);
					break;
				default: {
					let s = "Token with \"" + o.type + "\" type was not found.";
					if (this.options.silent) return console.error(s), "";
					throw new Error(s);
				}
			}
		}
		return n;
	}
};
var S = class {
	options;
	block;
	constructor(e) {
		this.options = e || T;
	}
	static passThroughHooks = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens",
		"emStrongMask"
	]);
	static passThroughHooksRespectAsync = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens"
	]);
	preprocess(e) {
		return e;
	}
	postprocess(e) {
		return e;
	}
	processAllTokens(e) {
		return e;
	}
	emStrongMask(e) {
		return e;
	}
	provideLexer(e = this.block) {
		return e ? x.lex : x.lexInline;
	}
	provideParser(e = this.block) {
		return e ? b.parse : b.parseInline;
	}
};
var Q = class {
	defaults = A();
	options = this.setOptions;
	parse = this.parseMarkdown(!0);
	parseInline = this.parseMarkdown(!1);
	Parser = b;
	Renderer = P;
	TextRenderer = L;
	Lexer = x;
	Tokenizer = y;
	Hooks = S;
	constructor(...e) {
		this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let i of e) switch (n = n.concat(t.call(this, i)), i.type) {
			case "table": {
				let r = i;
				for (let o of r.header) n = n.concat(this.walkTokens(o.tokens, t));
				for (let o of r.rows) for (let s of o) n = n.concat(this.walkTokens(s.tokens, t));
				break;
			}
			case "list": {
				let r = i;
				n = n.concat(this.walkTokens(r.items, t));
				break;
			}
			default: {
				let r = i;
				this.defaults.extensions?.childTokens?.[r.type] ? this.defaults.extensions.childTokens[r.type].forEach((o) => {
					let s = r[o].flat(1 / 0);
					n = n.concat(this.walkTokens(s, t));
				}) : r.tokens && (n = n.concat(this.walkTokens(r.tokens, t)));
			}
		}
		return n;
	}
	use(...e) {
		let t = this.defaults.extensions || {
			renderers: {},
			childTokens: {}
		};
		return e.forEach((n) => {
			let i = { ...n };
			if (i.async = this.defaults.async || i.async || !1, n.extensions && (n.extensions.forEach((r) => {
				if (!r.name) throw new Error("extension name required");
				if ("renderer" in r) {
					let o = t.renderers[r.name];
					o ? t.renderers[r.name] = function(...s) {
						let u = r.renderer.apply(this, s);
						return u === !1 && (u = o.apply(this, s)), u;
					} : t.renderers[r.name] = r.renderer;
				}
				if ("tokenizer" in r) {
					if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
					let o = t[r.level];
					o ? o.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
				}
				"childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
			}), i.extensions = t), n.renderer) {
				let r = this.defaults.renderer || new P(this.defaults);
				for (let o in n.renderer) {
					if (!(o in r)) throw new Error(`renderer '${o}' does not exist`);
					if (["options", "parser"].includes(o)) continue;
					let s = o, u = n.renderer[s], a = r[s];
					r[s] = (...p) => {
						let c = u.apply(r, p);
						return c === !1 && (c = a.apply(r, p)), c || "";
					};
				}
				i.renderer = r;
			}
			if (n.tokenizer) {
				let r = this.defaults.tokenizer || new y(this.defaults);
				for (let o in n.tokenizer) {
					if (!(o in r)) throw new Error(`tokenizer '${o}' does not exist`);
					if ([
						"options",
						"rules",
						"lexer"
					].includes(o)) continue;
					let s = o, u = n.tokenizer[s], a = r[s];
					r[s] = (...p) => {
						let c = u.apply(r, p);
						return c === !1 && (c = a.apply(r, p)), c;
					};
				}
				i.tokenizer = r;
			}
			if (n.hooks) {
				let r = this.defaults.hooks || new S();
				for (let o in n.hooks) {
					if (!(o in r)) throw new Error(`hook '${o}' does not exist`);
					if (["options", "block"].includes(o)) continue;
					let s = o, u = n.hooks[s], a = r[s];
					S.passThroughHooks.has(o) ? r[s] = (p) => {
						if (this.defaults.async && S.passThroughHooksRespectAsync.has(o)) return (async () => {
							let h = await u.call(r, p);
							return a.call(r, h);
						})();
						let c = u.call(r, p);
						return a.call(r, c);
					} : r[s] = (...p) => {
						if (this.defaults.async) return (async () => {
							let h = await u.apply(r, p);
							return h === !1 && (h = await a.apply(r, p)), h;
						})();
						let c = u.apply(r, p);
						return c === !1 && (c = a.apply(r, p)), c;
					};
				}
				i.hooks = r;
			}
			if (n.walkTokens) {
				let r = this.defaults.walkTokens, o = n.walkTokens;
				i.walkTokens = function(s) {
					let u = [];
					return u.push(o.call(this, s)), r && (u = u.concat(r.call(this, s))), u;
				};
			}
			this.defaults = {
				...this.defaults,
				...i
			};
		}), this;
	}
	setOptions(e) {
		return this.defaults = {
			...this.defaults,
			...e
		}, this;
	}
	lexer(e, t) {
		return x.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return b.parse(e, t ?? this.defaults);
	}
	parseMarkdown(e) {
		return (n, i) => {
			let r = { ...i }, o = {
				...this.defaults,
				...r
			}, s = this.onError(!!o.silent, !!o.async);
			if (this.defaults.async === !0 && r.async === !1) return s(/* @__PURE__ */ new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
			if (typeof n > "u" || n === null) return s(/* @__PURE__ */ new Error("marked(): input parameter is undefined or null"));
			if (typeof n != "string") return s(/* @__PURE__ */ new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
			if (o.hooks && (o.hooks.options = o, o.hooks.block = e), o.async) return (async () => {
				let u = o.hooks ? await o.hooks.preprocess(n) : n, p = await (o.hooks ? await o.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(u, o), c = o.hooks ? await o.hooks.processAllTokens(p) : p;
				o.walkTokens && await Promise.all(this.walkTokens(c, o.walkTokens));
				let k = await (o.hooks ? await o.hooks.provideParser(e) : e ? b.parse : b.parseInline)(c, o);
				return o.hooks ? await o.hooks.postprocess(k) : k;
			})().catch(s);
			try {
				o.hooks && (n = o.hooks.preprocess(n));
				let a = (o.hooks ? o.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(n, o);
				o.hooks && (a = o.hooks.processAllTokens(a)), o.walkTokens && this.walkTokens(a, o.walkTokens);
				let c = (o.hooks ? o.hooks.provideParser(e) : e ? b.parse : b.parseInline)(a, o);
				return o.hooks && (c = o.hooks.postprocess(c)), c;
			} catch (u) {
				return s(u);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
				let i = "<p>An error occurred:</p><pre>" + R(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(i) : i;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
};
var M = new Q();
function f(l, e) {
	return M.parse(l, e);
}
f.options = f.setOptions = function(l) {
	return M.setOptions(l), f.defaults = M.defaults, U(f.defaults), f;
};
f.getDefaults = A;
f.defaults = T;
function bt(...l) {
	return M.use(...l), f.defaults = M.defaults, U(f.defaults), f;
}
f.use = bt;
f.walkTokens = function(l, e) {
	return M.walkTokens(l, e);
};
f.parseInline = M.parseInline;
f.Parser = b;
f.parser = b.parse;
f.Renderer = P;
f.TextRenderer = L;
f.Lexer = x;
f.lexer = x.lex;
f.Tokenizer = y;
f.Hooks = S;
f.parse = f;
var un = f.options;
var pn = f.setOptions;
var cn = f.walkTokens;
var hn = f.parseInline;
var dn = f;
var kn = b.parse;
var gn = x.lex;
/**
* Prism: Lightweight, robust, elegant syntax highlighting
*
* @license MIT <https://opensource.org/licenses/MIT>
* @author Lea Verou <https://lea.verou.me>
* @namespace
* @public
*/
//#endregion
//#region .gofront-vendor-entry-1790166178941.mjs
var import_prism = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Prism = function(_self) {
		var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
		var uniqueId = 0;
		var plainTextGrammar = {};
		var _ = {
			/**
			* By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
			* current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
			* additional languages or plugins yourself.
			*
			* By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
			*
			* You obviously have to change this value before the automatic highlighting started. To do this, you can add an
			* empty Prism object into the global scope before loading the Prism script like this:
			*
			* ```js
			* window.Prism = window.Prism || {};
			* Prism.manual = true;
			* // add a new <script> to load Prism's script
			* ```
			*
			* @default false
			* @type {boolean}
			* @memberof Prism
			* @public
			*/
			manual: _self.Prism && _self.Prism.manual,
			/**
			* By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
			* `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
			* own worker, you don't want it to do this.
			*
			* By setting this value to `true`, Prism will not add its own listeners to the worker.
			*
			* You obviously have to change this value before Prism executes. To do this, you can add an
			* empty Prism object into the global scope before loading the Prism script like this:
			*
			* ```js
			* window.Prism = window.Prism || {};
			* Prism.disableWorkerMessageHandler = true;
			* // Load Prism's script
			* ```
			*
			* @default false
			* @type {boolean}
			* @memberof Prism
			* @public
			*/
			disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
			/**
			* A namespace for utility methods.
			*
			* All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
			* change or disappear at any time.
			*
			* @namespace
			* @memberof Prism
			*/
			util: {
				encode: function encode(tokens) {
					if (tokens instanceof Token) return new Token(tokens.type, encode(tokens.content), tokens.alias);
					else if (Array.isArray(tokens)) return tokens.map(encode);
					else return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
				},
				/**
				* Returns the name of the type of the given value.
				*
				* @param {any} o
				* @returns {string}
				* @example
				* type(null)      === 'Null'
				* type(undefined) === 'Undefined'
				* type(123)       === 'Number'
				* type('foo')     === 'String'
				* type(true)      === 'Boolean'
				* type([1, 2])    === 'Array'
				* type({})        === 'Object'
				* type(String)    === 'Function'
				* type(/abc+/)    === 'RegExp'
				*/
				type: function(o) {
					return Object.prototype.toString.call(o).slice(8, -1);
				},
				/**
				* Returns a unique number for the given object. Later calls will still return the same number.
				*
				* @param {Object} obj
				* @returns {number}
				*/
				objId: function(obj) {
					if (!obj["__id"]) Object.defineProperty(obj, "__id", { value: ++uniqueId });
					return obj["__id"];
				},
				/**
				* Creates a deep clone of the given object.
				*
				* The main intended use of this function is to clone language definitions.
				*
				* @param {T} o
				* @param {Record<number, any>} [visited]
				* @returns {T}
				* @template T
				*/
				clone: function deepClone(o, visited) {
					visited = visited || {};
					var clone;
					var id;
					switch (_.util.type(o)) {
						case "Object":
							id = _.util.objId(o);
							if (visited[id]) return visited[id];
							clone = {};
							visited[id] = clone;
							for (var key in o) if (o.hasOwnProperty(key)) clone[key] = deepClone(o[key], visited);
							return clone;
						case "Array":
							id = _.util.objId(o);
							if (visited[id]) return visited[id];
							clone = [];
							visited[id] = clone;
							o.forEach(function(v, i) {
								clone[i] = deepClone(v, visited);
							});
							return clone;
						default: return o;
					}
				},
				/**
				* Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
				*
				* If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
				*
				* @param {Element} element
				* @returns {string}
				*/
				getLanguage: function(element) {
					while (element) {
						var m = lang.exec(element.className);
						if (m) return m[1].toLowerCase();
						element = element.parentElement;
					}
					return "none";
				},
				/**
				* Sets the Prism `language-xxxx` class of the given element.
				*
				* @param {Element} element
				* @param {string} language
				* @returns {void}
				*/
				setLanguage: function(element, language) {
					element.className = element.className.replace(RegExp(lang, "gi"), "");
					element.classList.add("language-" + language);
				},
				/**
				* Returns the script element that is currently executing.
				*
				* This does __not__ work for line script element.
				*
				* @returns {HTMLScriptElement | null}
				*/
				currentScript: function() {
					if (typeof document === "undefined") return null;
					if (document.currentScript && document.currentScript.tagName === "SCRIPT" && true) return document.currentScript;
					try {
						throw new Error();
					} catch (err) {
						var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
						if (src) {
							var scripts = document.getElementsByTagName("script");
							for (var i in scripts) if (scripts[i].src == src) return scripts[i];
						}
						return null;
					}
				},
				/**
				* Returns whether a given class is active for `element`.
				*
				* The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
				* if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
				* given class is just the given class with a `no-` prefix.
				*
				* Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
				* closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
				* ancestors have the given class or the negated version of it, then the default activation will be returned.
				*
				* In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
				* version of it, the class is considered active.
				*
				* @param {Element} element
				* @param {string} className
				* @param {boolean} [defaultActivation=false]
				* @returns {boolean}
				*/
				isActive: function(element, className, defaultActivation) {
					var no = "no-" + className;
					while (element) {
						var classList = element.classList;
						if (classList.contains(className)) return true;
						if (classList.contains(no)) return false;
						element = element.parentElement;
					}
					return !!defaultActivation;
				}
			},
			/**
			* This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
			*
			* @namespace
			* @memberof Prism
			* @public
			*/
			languages: {
				/**
				* The grammar for plain, unformatted text.
				*/
				plain: plainTextGrammar,
				plaintext: plainTextGrammar,
				text: plainTextGrammar,
				txt: plainTextGrammar,
				/**
				* Creates a deep copy of the language with the given id and appends the given tokens.
				*
				* If a token in `redef` also appears in the copied language, then the existing token in the copied language
				* will be overwritten at its original position.
				*
				* ## Best practices
				*
				* Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
				* doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
				* understand the language definition because, normally, the order of tokens matters in Prism grammars.
				*
				* Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
				* Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
				*
				* @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
				* @param {Grammar} redef The new tokens to append.
				* @returns {Grammar} The new language created.
				* @public
				* @example
				* Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
				*     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
				*     // at its original position
				*     'comment': { ... },
				*     // CSS doesn't have a 'color' token, so this token will be appended
				*     'color': /\b(?:red|green|blue)\b/
				* });
				*/
				extend: function(id, redef) {
					var lang = _.util.clone(_.languages[id]);
					for (var key in redef) lang[key] = redef[key];
					return lang;
				},
				/**
				* Inserts tokens _before_ another token in a language definition or any other grammar.
				*
				* ## Usage
				*
				* This helper method makes it easy to modify existing languages. For example, the CSS language definition
				* not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
				* in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
				* appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
				* this:
				*
				* ```js
				* Prism.languages.markup.style = {
				*     // token
				* };
				* ```
				*
				* then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
				* before existing tokens. For the CSS example above, you would use it like this:
				*
				* ```js
				* Prism.languages.insertBefore('markup', 'cdata', {
				*     'style': {
				*         // token
				*     }
				* });
				* ```
				*
				* ## Special cases
				*
				* If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
				* will be ignored.
				*
				* This behavior can be used to insert tokens after `before`:
				*
				* ```js
				* Prism.languages.insertBefore('markup', 'comment', {
				*     'comment': Prism.languages.markup.comment,
				*     // tokens after 'comment'
				* });
				* ```
				*
				* ## Limitations
				*
				* The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
				* properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
				* differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
				* deleting properties which is necessary to insert at arbitrary positions.
				*
				* To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
				* Instead, it will create a new object and replace all references to the target object with the new one. This
				* can be done without temporarily deleting properties, so the iteration order is well-defined.
				*
				* However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
				* you hold the target object in a variable, then the value of the variable will not change.
				*
				* ```js
				* var oldMarkup = Prism.languages.markup;
				* var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
				*
				* assert(oldMarkup !== Prism.languages.markup);
				* assert(newMarkup === Prism.languages.markup);
				* ```
				*
				* @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
				* object to be modified.
				* @param {string} before The key to insert before.
				* @param {Grammar} insert An object containing the key-value pairs to be inserted.
				* @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
				* object to be modified.
				*
				* Defaults to `Prism.languages`.
				* @returns {Grammar} The new grammar object.
				* @public
				*/
				insertBefore: function(inside, before, insert, root) {
					root = root || _.languages;
					var grammar = root[inside];
					/** @type {Grammar} */
					var ret = {};
					for (var token in grammar) if (grammar.hasOwnProperty(token)) {
						if (token == before) {
							for (var newToken in insert) if (insert.hasOwnProperty(newToken)) ret[newToken] = insert[newToken];
						}
						if (!insert.hasOwnProperty(token)) ret[token] = grammar[token];
					}
					var old = root[inside];
					root[inside] = ret;
					_.languages.DFS(_.languages, function(key, value) {
						if (value === old && key != inside) this[key] = ret;
					});
					return ret;
				},
				DFS: function DFS(o, callback, type, visited) {
					visited = visited || {};
					var objId = _.util.objId;
					for (var i in o) if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);
						var property = o[i];
						var propertyType = _.util.type(property);
						if (propertyType === "Object" && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, null, visited);
						} else if (propertyType === "Array" && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, i, visited);
						}
					}
				}
			},
			plugins: {},
			/**
			* This is the most high-level function in Prism’s API.
			* It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
			* each one of them.
			*
			* This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
			*
			* @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
			* @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
			* @memberof Prism
			* @public
			*/
			highlightAll: function(async, callback) {
				_.highlightAllUnder(document, async, callback);
			},
			/**
			* Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
			* {@link Prism.highlightElement} on each one of them.
			*
			* The following hooks will be run:
			* 1. `before-highlightall`
			* 2. `before-all-elements-highlight`
			* 3. All hooks of {@link Prism.highlightElement} for each element.
			*
			* @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
			* @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
			* @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
			* @memberof Prism
			* @public
			*/
			highlightAllUnder: function(container, async, callback) {
				var env = {
					callback,
					container,
					selector: "code[class*=\"language-\"], [class*=\"language-\"] code, code[class*=\"lang-\"], [class*=\"lang-\"] code"
				};
				_.hooks.run("before-highlightall", env);
				env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
				_.hooks.run("before-all-elements-highlight", env);
				for (var i = 0, element; element = env.elements[i++];) _.highlightElement(element, async === true, env.callback);
			},
			/**
			* Highlights the code inside a single element.
			*
			* The following hooks will be run:
			* 1. `before-sanity-check`
			* 2. `before-highlight`
			* 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
			* 4. `before-insert`
			* 5. `after-highlight`
			* 6. `complete`
			*
			* Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
			* the element's language.
			*
			* @param {Element} element The element containing the code.
			* It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
			* @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
			* to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
			* [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
			*
			* Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
			* asynchronous highlighting to work. You can build your own bundle on the
			* [Download page](https://prismjs.com/download.html).
			* @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
			* Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
			* @memberof Prism
			* @public
			*/
			highlightElement: function(element, async, callback) {
				var language = _.util.getLanguage(element);
				var grammar = _.languages[language];
				_.util.setLanguage(element, language);
				var parent = element.parentElement;
				if (parent && parent.nodeName.toLowerCase() === "pre") _.util.setLanguage(parent, language);
				var env = {
					element,
					language,
					grammar,
					code: element.textContent
				};
				function insertHighlightedCode(highlightedCode) {
					env.highlightedCode = highlightedCode;
					_.hooks.run("before-insert", env);
					env.element.innerHTML = env.highlightedCode;
					_.hooks.run("after-highlight", env);
					_.hooks.run("complete", env);
					callback && callback.call(env.element);
				}
				_.hooks.run("before-sanity-check", env);
				parent = env.element.parentElement;
				if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) parent.setAttribute("tabindex", "0");
				if (!env.code) {
					_.hooks.run("complete", env);
					callback && callback.call(env.element);
					return;
				}
				_.hooks.run("before-highlight", env);
				if (!env.grammar) {
					insertHighlightedCode(_.util.encode(env.code));
					return;
				}
				if (async && _self.Worker) {
					var worker = new Worker(_.filename);
					worker.onmessage = function(evt) {
						insertHighlightedCode(evt.data);
					};
					worker.postMessage(JSON.stringify({
						language: env.language,
						code: env.code,
						immediateClose: true
					}));
				} else insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
			},
			/**
			* Low-level function, only use if you know what you’re doing. It accepts a string of text as input
			* and the language definitions to use, and returns a string with the HTML produced.
			*
			* The following hooks will be run:
			* 1. `before-tokenize`
			* 2. `after-tokenize`
			* 3. `wrap`: On each {@link Token}.
			*
			* @param {string} text A string with the code to be highlighted.
			* @param {Grammar} grammar An object containing the tokens to use.
			*
			* Usually a language definition like `Prism.languages.markup`.
			* @param {string} language The name of the language definition passed to `grammar`.
			* @returns {string} The highlighted HTML.
			* @memberof Prism
			* @public
			* @example
			* Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
			*/
			highlight: function(text, grammar, language) {
				var env = {
					code: text,
					grammar,
					language
				};
				_.hooks.run("before-tokenize", env);
				if (!env.grammar) throw new Error("The language \"" + env.language + "\" has no grammar.");
				env.tokens = _.tokenize(env.code, env.grammar);
				_.hooks.run("after-tokenize", env);
				return Token.stringify(_.util.encode(env.tokens), env.language);
			},
			/**
			* This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
			* and the language definitions to use, and returns an array with the tokenized code.
			*
			* When the language definition includes nested tokens, the function is called recursively on each of these tokens.
			*
			* This method could be useful in other contexts as well, as a very crude parser.
			*
			* @param {string} text A string with the code to be highlighted.
			* @param {Grammar} grammar An object containing the tokens to use.
			*
			* Usually a language definition like `Prism.languages.markup`.
			* @returns {TokenStream} An array of strings and tokens, a token stream.
			* @memberof Prism
			* @public
			* @example
			* let code = `var foo = 0;`;
			* let tokens = Prism.tokenize(code, Prism.languages.javascript);
			* tokens.forEach(token => {
			*     if (token instanceof Prism.Token && token.type === 'number') {
			*         console.log(`Found numeric literal: ${token.content}`);
			*     }
			* });
			*/
			tokenize: function(text, grammar) {
				var rest = grammar.rest;
				if (rest) {
					for (var token in rest) grammar[token] = rest[token];
					delete grammar.rest;
				}
				var tokenList = new LinkedList();
				addAfter(tokenList, tokenList.head, text);
				matchGrammar(text, tokenList, grammar, tokenList.head, 0);
				return toArray(tokenList);
			},
			/**
			* @namespace
			* @memberof Prism
			* @public
			*/
			hooks: {
				all: {},
				/**
				* Adds the given callback to the list of callbacks for the given hook.
				*
				* The callback will be invoked when the hook it is registered for is run.
				* Hooks are usually directly run by a highlight function but you can also run hooks yourself.
				*
				* One callback function can be registered to multiple hooks and the same hook multiple times.
				*
				* @param {string} name The name of the hook.
				* @param {HookCallback} callback The callback function which is given environment variables.
				* @public
				*/
				add: function(name, callback) {
					var hooks = _.hooks.all;
					hooks[name] = hooks[name] || [];
					hooks[name].push(callback);
				},
				/**
				* Runs a hook invoking all registered callbacks with the given environment variables.
				*
				* Callbacks will be invoked synchronously and in the order in which they were registered.
				*
				* @param {string} name The name of the hook.
				* @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
				* @public
				*/
				run: function(name, env) {
					var callbacks = _.hooks.all[name];
					if (!callbacks || !callbacks.length) return;
					for (var i = 0, callback; callback = callbacks[i++];) callback(env);
				}
			},
			Token
		};
		_self.Prism = _;
		/**
		* Creates a new token.
		*
		* @param {string} type See {@link Token#type type}
		* @param {string | TokenStream} content See {@link Token#content content}
		* @param {string|string[]} [alias] The alias(es) of the token.
		* @param {string} [matchedStr=""] A copy of the full string this token was created from.
		* @class
		* @global
		* @public
		*/
		function Token(type, content, alias, matchedStr) {
			/**
			* The type of the token.
			*
			* This is usually the key of a pattern in a {@link Grammar}.
			*
			* @type {string}
			* @see GrammarToken
			* @public
			*/
			this.type = type;
			/**
			* The strings or tokens contained by this token.
			*
			* This will be a token stream if the pattern matched also defined an `inside` grammar.
			*
			* @type {string | TokenStream}
			* @public
			*/
			this.content = content;
			/**
			* The alias(es) of the token.
			*
			* @type {string|string[]}
			* @see GrammarToken
			* @public
			*/
			this.alias = alias;
			this.length = (matchedStr || "").length | 0;
		}
		/**
		* A token stream is an array of strings and {@link Token Token} objects.
		*
		* Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
		* them.
		*
		* 1. No adjacent strings.
		* 2. No empty strings.
		*
		*    The only exception here is the token stream that only contains the empty string and nothing else.
		*
		* @typedef {Array<string | Token>} TokenStream
		* @global
		* @public
		*/
		/**
		* Converts the given token or token stream to an HTML representation.
		*
		* The following hooks will be run:
		* 1. `wrap`: On each {@link Token}.
		*
		* @param {string | Token | TokenStream} o The token or token stream to be converted.
		* @param {string} language The name of current language.
		* @returns {string} The HTML representation of the token or token stream.
		* @memberof Token
		* @static
		*/
		Token.stringify = function stringify(o, language) {
			if (typeof o == "string") return o;
			if (Array.isArray(o)) {
				var s = "";
				o.forEach(function(e) {
					s += stringify(e, language);
				});
				return s;
			}
			var env = {
				type: o.type,
				content: stringify(o.content, language),
				tag: "span",
				classes: ["token", o.type],
				attributes: {},
				language
			};
			var aliases = o.alias;
			if (aliases) {
				if (Array.isArray(aliases)) Array.prototype.push.apply(env.classes, aliases);
				else env.classes.push(aliases);
			}
			_.hooks.run("wrap", env);
			var attributes = "";
			for (var name in env.attributes) attributes += " " + name + "=\"" + (env.attributes[name] || "").replace(/"/g, "&quot;") + "\"";
			return "<" + env.tag + " class=\"" + env.classes.join(" ") + "\"" + attributes + ">" + env.content + "</" + env.tag + ">";
		};
		/**
		* @param {RegExp} pattern
		* @param {number} pos
		* @param {string} text
		* @param {boolean} lookbehind
		* @returns {RegExpExecArray | null}
		*/
		function matchPattern(pattern, pos, text, lookbehind) {
			pattern.lastIndex = pos;
			var match = pattern.exec(text);
			if (match && lookbehind && match[1]) {
				var lookbehindLength = match[1].length;
				match.index += lookbehindLength;
				match[0] = match[0].slice(lookbehindLength);
			}
			return match;
		}
		/**
		* @param {string} text
		* @param {LinkedList<string | Token>} tokenList
		* @param {any} grammar
		* @param {LinkedListNode<string | Token>} startNode
		* @param {number} startPos
		* @param {RematchOptions} [rematch]
		* @returns {void}
		* @private
		*
		* @typedef RematchOptions
		* @property {string} cause
		* @property {number} reach
		*/
		function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
			for (var token in grammar) {
				if (!grammar.hasOwnProperty(token) || !grammar[token]) continue;
				var patterns = grammar[token];
				patterns = Array.isArray(patterns) ? patterns : [patterns];
				for (var j = 0; j < patterns.length; ++j) {
					if (rematch && rematch.cause == token + "," + j) return;
					var patternObj = patterns[j];
					var inside = patternObj.inside;
					var lookbehind = !!patternObj.lookbehind;
					var greedy = !!patternObj.greedy;
					var alias = patternObj.alias;
					if (greedy && !patternObj.pattern.global) {
						var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
						patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
					}
					/** @type {RegExp} */
					var pattern = patternObj.pattern || patternObj;
					for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
						if (rematch && pos >= rematch.reach) break;
						var str = currentNode.value;
						if (tokenList.length > text.length) return;
						if (str instanceof Token) continue;
						var removeCount = 1;
						var match;
						if (greedy) {
							match = matchPattern(pattern, pos, text, lookbehind);
							if (!match || match.index >= text.length) break;
							var from = match.index;
							var to = match.index + match[0].length;
							var p = pos;
							p += currentNode.value.length;
							while (from >= p) {
								currentNode = currentNode.next;
								p += currentNode.value.length;
							}
							p -= currentNode.value.length;
							pos = p;
							if (currentNode.value instanceof Token) continue;
							for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
								removeCount++;
								p += k.value.length;
							}
							removeCount--;
							str = text.slice(pos, p);
							match.index -= pos;
						} else {
							match = matchPattern(pattern, 0, str, lookbehind);
							if (!match) continue;
						}
						var from = match.index;
						var matchStr = match[0];
						var before = str.slice(0, from);
						var after = str.slice(from + matchStr.length);
						var reach = pos + str.length;
						if (rematch && reach > rematch.reach) rematch.reach = reach;
						var removeFrom = currentNode.prev;
						if (before) {
							removeFrom = addAfter(tokenList, removeFrom, before);
							pos += before.length;
						}
						removeRange(tokenList, removeFrom, removeCount);
						var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
						currentNode = addAfter(tokenList, removeFrom, wrapped);
						if (after) addAfter(tokenList, currentNode, after);
						if (removeCount > 1) {
							/** @type {RematchOptions} */
							var nestedRematch = {
								cause: token + "," + j,
								reach
							};
							matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
							if (rematch && nestedRematch.reach > rematch.reach) rematch.reach = nestedRematch.reach;
						}
					}
				}
			}
		}
		/**
		* @typedef LinkedListNode
		* @property {T} value
		* @property {LinkedListNode<T> | null} prev The previous node.
		* @property {LinkedListNode<T> | null} next The next node.
		* @template T
		* @private
		*/
		/**
		* @template T
		* @private
		*/
		function LinkedList() {
			/** @type {LinkedListNode<T>} */
			var head = {
				value: null,
				prev: null,
				next: null
			};
			/** @type {LinkedListNode<T>} */
			var tail = {
				value: null,
				prev: head,
				next: null
			};
			head.next = tail;
			/** @type {LinkedListNode<T>} */
			this.head = head;
			/** @type {LinkedListNode<T>} */
			this.tail = tail;
			this.length = 0;
		}
		/**
		* Adds a new node with the given value to the list.
		*
		* @param {LinkedList<T>} list
		* @param {LinkedListNode<T>} node
		* @param {T} value
		* @returns {LinkedListNode<T>} The added node.
		* @template T
		*/
		function addAfter(list, node, value) {
			var next = node.next;
			var newNode = {
				value,
				prev: node,
				next
			};
			node.next = newNode;
			next.prev = newNode;
			list.length++;
			return newNode;
		}
		/**
		* Removes `count` nodes after the given node. The given node will not be removed.
		*
		* @param {LinkedList<T>} list
		* @param {LinkedListNode<T>} node
		* @param {number} count
		* @template T
		*/
		function removeRange(list, node, count) {
			var next = node.next;
			for (var i = 0; i < count && next !== list.tail; i++) next = next.next;
			node.next = next;
			next.prev = node;
			list.length -= i;
		}
		/**
		* @param {LinkedList<T>} list
		* @returns {T[]}
		* @template T
		*/
		function toArray(list) {
			var array = [];
			var node = list.head.next;
			while (node !== list.tail) {
				array.push(node.value);
				node = node.next;
			}
			return array;
		}
		if (!_self.document) {
			if (!_self.addEventListener) return _;
			if (!_.disableWorkerMessageHandler) _self.addEventListener("message", function(evt) {
				var message = JSON.parse(evt.data);
				var lang = message.language;
				var code = message.code;
				var immediateClose = message.immediateClose;
				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) _self.close();
			}, false);
			return _;
		}
		var script = _.util.currentScript();
		if (script) {
			_.filename = script.src;
			if (script.hasAttribute("data-manual")) _.manual = true;
		}
		function highlightAutomaticallyCallback() {
			if (!_.manual) _.highlightAll();
		}
		if (!_.manual) {
			var readyState = document.readyState;
			if (readyState === "loading" || readyState === "interactive" && script && script.defer) document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
			else if (window.requestAnimationFrame) window.requestAnimationFrame(highlightAutomaticallyCallback);
			else window.setTimeout(highlightAutomaticallyCallback, 16);
		}
		return _;
	}(typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {});
	if (typeof module !== "undefined" && module.exports) module.exports = Prism;
	if (typeof global !== "undefined") global.Prism = Prism;
	/**
	* The expansion of a simple `RegExp` literal to support additional properties.
	*
	* @typedef GrammarToken
	* @property {RegExp} pattern The regular expression of the token.
	* @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
	* behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
	* @property {boolean} [greedy=false] Whether the token is greedy.
	* @property {string|string[]} [alias] An optional alias or list of aliases.
	* @property {Grammar} [inside] The nested grammar of this token.
	*
	* The `inside` grammar will be used to tokenize the text value of each token of this kind.
	*
	* This can be used to make nested and even recursive language definitions.
	*
	* Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
	* each another.
	* @global
	* @public
	*/
	/**
	* @typedef Grammar
	* @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
	* @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
	* @global
	* @public
	*/
	/**
	* A function which will invoked after an element was successfully highlighted.
	*
	* @callback HighlightCallback
	* @param {Element} element The element successfully highlighted.
	* @returns {void}
	* @global
	* @public
	*/
	/**
	* @callback HookCallback
	* @param {Object<string, any>} env The environment variables of the hook.
	* @returns {void}
	* @global
	* @public
	*/
	Prism.languages.markup = {
		"comment": {
			pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
			greedy: true
		},
		"prolog": {
			pattern: /<\?[\s\S]+?\?>/,
			greedy: true
		},
		"doctype": {
			pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
			greedy: true,
			inside: {
				"internal-subset": {
					pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
					lookbehind: true,
					greedy: true,
					inside: null
				},
				"string": {
					pattern: /"[^"]*"|'[^']*'/,
					greedy: true
				},
				"punctuation": /^<!|>$|[[\]]/,
				"doctype-tag": /^DOCTYPE/i,
				"name": /[^\s<>'"]+/
			}
		},
		"cdata": {
			pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
			greedy: true
		},
		"tag": {
			pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
			greedy: true,
			inside: {
				"tag": {
					pattern: /^<\/?[^\s>\/]+/,
					inside: {
						"punctuation": /^<\/?/,
						"namespace": /^[^\s>\/:]+:/
					}
				},
				"special-attr": [],
				"attr-value": {
					pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
					inside: { "punctuation": [{
						pattern: /^=/,
						alias: "attr-equals"
					}, {
						pattern: /^(\s*)["']|["']$/,
						lookbehind: true
					}] }
				},
				"punctuation": /\/?>/,
				"attr-name": {
					pattern: /[^\s>\/]+/,
					inside: { "namespace": /^[^\s>\/:]+:/ }
				}
			}
		},
		"entity": [{
			pattern: /&[\da-z]{1,8};/i,
			alias: "named-entity"
		}, /&#x?[\da-f]{1,8};/i]
	};
	Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];
	Prism.languages.markup["doctype"].inside["internal-subset"].inside = Prism.languages.markup;
	Prism.hooks.add("wrap", function(env) {
		if (env.type === "entity") env.attributes["title"] = env.content.replace(/&amp;/, "&");
	});
	Object.defineProperty(Prism.languages.markup.tag, "addInlined", { 
	/**
	* Adds an inlined language to markup.
	*
	* An example of an inlined language is CSS with `<style>` tags.
	*
	* @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	* case insensitive.
	* @param {string} lang The language key.
	* @example
	* addInlined('style', 'css');
	*/
value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside["language-" + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang]
		};
		includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
		var inside = { "included-cdata": {
			pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
			inside: includedCdataInside
		} };
		inside["language-" + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang]
		};
		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
				return tagName;
			}), "i"),
			lookbehind: true,
			greedy: true,
			inside
		};
		Prism.languages.insertBefore("markup", "cdata", def);
	} });
	Object.defineProperty(Prism.languages.markup.tag, "addAttribute", { 
	/**
	* Adds an pattern to highlight languages embedded in HTML attributes.
	*
	* An example of an inlined language is CSS with `style` attributes.
	*
	* @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	* case insensitive.
	* @param {string} lang The language key.
	* @example
	* addAttribute('style', 'css');
	*/
value: function(attrName, lang) {
		Prism.languages.markup.tag.inside["special-attr"].push({
			pattern: RegExp(/(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
			lookbehind: true,
			inside: {
				"attr-name": /^[^\s=]+/,
				"attr-value": {
					pattern: /=[\s\S]+/,
					inside: {
						"value": {
							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
							lookbehind: true,
							alias: [lang, "language-" + lang],
							inside: Prism.languages[lang]
						},
						"punctuation": [{
							pattern: /^=/,
							alias: "attr-equals"
						}, /"|'/]
					}
				}
			}
		});
	} });
	Prism.languages.html = Prism.languages.markup;
	Prism.languages.mathml = Prism.languages.markup;
	Prism.languages.svg = Prism.languages.markup;
	Prism.languages.xml = Prism.languages.extend("markup", {});
	Prism.languages.ssml = Prism.languages.xml;
	Prism.languages.atom = Prism.languages.xml;
	Prism.languages.rss = Prism.languages.xml;
	(function(Prism) {
		var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
		Prism.languages.css = {
			"comment": /\/\*[\s\S]*?\*\//,
			"atrule": {
				pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
				inside: {
					"rule": /^@[\w-]+/,
					"selector-function-argument": {
						pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
						lookbehind: true,
						alias: "selector"
					},
					"keyword": {
						pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
						lookbehind: true
					}
				}
			},
			"url": {
				pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
				greedy: true,
				inside: {
					"function": /^url/i,
					"punctuation": /^\(|\)$/,
					"string": {
						pattern: RegExp("^" + string.source + "$"),
						alias: "url"
					}
				}
			},
			"selector": {
				pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + string.source + ")*(?=\\s*\\{)"),
				lookbehind: true
			},
			"string": {
				pattern: string,
				greedy: true
			},
			"property": {
				pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
				lookbehind: true
			},
			"important": /!important\b/i,
			"function": {
				pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
				lookbehind: true
			},
			"punctuation": /[(){};:,]/
		};
		Prism.languages.css["atrule"].inside.rest = Prism.languages.css;
		var markup = Prism.languages.markup;
		if (markup) {
			markup.tag.addInlined("style", "css");
			markup.tag.addAttribute("style", "css");
		}
	})(Prism);
	Prism.languages.clike = {
		"comment": [{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		}, {
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}],
		"string": {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		"class-name": {
			pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
			lookbehind: true,
			inside: { "punctuation": /[.\\]/ }
		},
		"keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
		"boolean": /\b(?:false|true)\b/,
		"function": /\b\w+(?=\()/,
		"number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
		"operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
		"punctuation": /[{}[\];(),.:]/
	};
	Prism.languages.javascript = Prism.languages.extend("clike", {
		"class-name": [Prism.languages.clike["class-name"], {
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
			lookbehind: true
		}],
		"keyword": [{
			pattern: /((?:^|\})\s*)catch\b/,
			lookbehind: true
		}, {
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		}],
		"function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
		"number": {
			pattern: RegExp(/(^|[^\w$])/.source + "(?:" + (/NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source + "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + /\d+(?:_\d+)*n/.source + "|" + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source),
			lookbehind: true
		},
		"operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
	});
	Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
	Prism.languages.insertBefore("javascript", "keyword", {
		"regex": {
			pattern: RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				"regex-source": {
					pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
					lookbehind: true,
					alias: "language-regex",
					inside: Prism.languages.regex
				},
				"regex-delimiter": /^\/|\/$/,
				"regex-flags": /^[a-z]+$/
			}
		},
		"function-variable": {
			pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
			alias: "function"
		},
		"parameter": [
			{
				pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
				lookbehind: true,
				inside: Prism.languages.javascript
			}
		],
		"constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
	});
	Prism.languages.insertBefore("javascript", "string", {
		"hashbang": {
			pattern: /^#!.*/,
			greedy: true,
			alias: "comment"
		},
		"template-string": {
			pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
			greedy: true,
			inside: {
				"template-punctuation": {
					pattern: /^`|`$/,
					alias: "string"
				},
				"interpolation": {
					pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
					lookbehind: true,
					inside: {
						"interpolation-punctuation": {
							pattern: /^\$\{|\}$/,
							alias: "punctuation"
						},
						rest: Prism.languages.javascript
					}
				},
				"string": /[\s\S]+/
			}
		},
		"string-property": {
			pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
			lookbehind: true,
			greedy: true,
			alias: "property"
		}
	});
	Prism.languages.insertBefore("javascript", "operator", { "literal-property": {
		pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
		lookbehind: true,
		alias: "property"
	} });
	if (Prism.languages.markup) {
		Prism.languages.markup.tag.addInlined("script", "javascript");
		Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript");
	}
	Prism.languages.js = Prism.languages.javascript;
	(function() {
		if (typeof Prism === "undefined" || typeof document === "undefined") return;
		if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
		var LOADING_MESSAGE = "Loading…";
		var FAILURE_MESSAGE = function(status, message) {
			return "✖ Error " + status + " while fetching file: " + message;
		};
		var FAILURE_EMPTY_MESSAGE = "✖ Error: File does not exist or is empty";
		var EXTENSIONS = {
			"js": "javascript",
			"py": "python",
			"rb": "ruby",
			"ps1": "powershell",
			"psm1": "powershell",
			"sh": "bash",
			"bat": "batch",
			"h": "c",
			"tex": "latex"
		};
		var STATUS_ATTR = "data-src-status";
		var STATUS_LOADING = "loading";
		var STATUS_LOADED = "loaded";
		var STATUS_FAILED = "failed";
		var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + "=\"" + STATUS_LOADED + "\"]):not([" + STATUS_ATTR + "=\"" + STATUS_LOADING + "\"])";
		/**
		* Loads the given file.
		*
		* @param {string} src The URL or path of the source file to load.
		* @param {(result: string) => void} success
		* @param {(reason: string) => void} error
		*/
		function loadFile(src, success, error) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", src, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status < 400 && xhr.responseText) success(xhr.responseText);
					else if (xhr.status >= 400) error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
					else error(FAILURE_EMPTY_MESSAGE);
				}
			};
			xhr.send(null);
		}
		/**
		* Parses the given range.
		*
		* This returns a range with inclusive ends.
		*
		* @param {string | null | undefined} range
		* @returns {[number, number | undefined] | undefined}
		*/
		function parseRange(range) {
			var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
			if (m) {
				var start = Number(m[1]);
				var comma = m[2];
				var end = m[3];
				if (!comma) return [start, start];
				if (!end) return [start, void 0];
				return [start, Number(end)];
			}
		}
		Prism.hooks.add("before-highlightall", function(env) {
			env.selector += ", " + SELECTOR;
		});
		Prism.hooks.add("before-sanity-check", function(env) {
			var pre = env.element;
			if (pre.matches(SELECTOR)) {
				env.code = "";
				pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
				var code = pre.appendChild(document.createElement("CODE"));
				code.textContent = LOADING_MESSAGE;
				var src = pre.getAttribute("data-src");
				var language = env.language;
				if (language === "none") {
					var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
					language = EXTENSIONS[extension] || extension;
				}
				Prism.util.setLanguage(code, language);
				Prism.util.setLanguage(pre, language);
				var autoloader = Prism.plugins.autoloader;
				if (autoloader) autoloader.loadLanguages(language);
				loadFile(src, function(text) {
					pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
					var range = parseRange(pre.getAttribute("data-range"));
					if (range) {
						var lines = text.split(/\r\n?|\n/g);
						var start = range[0];
						var end = range[1] == null ? lines.length : range[1];
						if (start < 0) start += lines.length;
						start = Math.max(0, Math.min(start - 1, lines.length));
						if (end < 0) end += lines.length;
						end = Math.max(0, Math.min(end, lines.length));
						text = lines.slice(start, end).join("\n");
						if (!pre.hasAttribute("data-start")) pre.setAttribute("data-start", String(start + 1));
					}
					code.textContent = text;
					Prism.highlightElement(code);
				}, function(error) {
					pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
					code.textContent = error;
				});
			}
		});
		Prism.plugins.fileHighlight = { 
		/**
		* Executes the File Highlight plugin for all matching `pre` elements under the given container.
		*
		* Note: Elements which are already loaded or currently loading will not be touched by this method.
		*
		* @param {ParentNode} [container=document]
		*/
highlight: function highlight(container) {
			var elements = (container || document).querySelectorAll(SELECTOR);
			for (var i = 0, element; element = elements[i++];) Prism.highlightElement(element);
		} };
		var logged = false;
		/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
		Prism.fileHighlight = function() {
			if (!logged) {
				console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
				logged = true;
			}
			Prism.plugins.fileHighlight.highlight.apply(this, arguments);
		};
	})();
})))(), 1);
if (typeof window !== "undefined") {
	window["@emailjs/browser"] = es_default || es_exports;
	window["browser"] = es_default || es_exports;
	window["emailjs"] = es_default || es_exports;
	window["fuse.js"] = entry_default || fuse_exports;
	window["fuse_js"] = entry_default || fuse_exports;
	window["Fuse"] = entry_default || fuse_exports;
	window["fuse"] = entry_default || fuse_exports;
	window["marked"] = marked_esm_exports;
	window["prismjs"] = import_prism.default || import_prism;
	window["Prism"] = import_prism.default || import_prism;
	window["prism"] = import_prism.default || import_prism;
}
//#endregion
export { es_exports as browser, fuse_exports as fuse_js, marked_esm_exports as marked, import_prism as prismjs };
