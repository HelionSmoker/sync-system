import chai from "chai";
const { assert } = chai;

import { parseConf, parseName, parseDate, parseUploadPeriod, parseSource } from "../main.js";

describe("Job Confirmation Parser", function () {
	it("an empty string", () => {
		const input = "";
		const out = 0;

		assert.deepEqual(parseConf(input), out);
	});

	it("long format", () => {
		const input = "100064706";
		const out = 64706;

		assert.deepEqual(parseConf(input), out);
	});

	it("short format", () => {
		const input = "64706";
		const out = 64706;

		assert.deepEqual(parseConf(input), out);
	});

	it("ignore non-digits", () => {
		const input = "1000 . &@*& abc -64706";
		const out = 64706;

		assert.deepEqual(parseConf(input), out);
	});

	it("ignore minus sign", () => {
		const input = "-64706";
		const out = 64706;

		assert.deepEqual(parseConf(input), out);
	});

	it("ignore leading zeros", () => {
		const input = "00064706";
		const out = 64706;

		assert.deepEqual(parseConf(input), out);
	});
});

describe("Worker Name Parser", function () {
	it("an empty string", () => {
		const input = "";
		const out = "";

		assert.deepEqual(parseName(input), out);
	});

	it("regular first and last name", () => {
		const input = "John Smith";
		const out = "John Smith";

		assert.deepEqual(parseName(input), out);
	});

	it("regular first, last, and middle name", () => {
		const input = "John Andrew Smith";
		const out = "John Andrew Smith";

		assert.deepEqual(parseName(input), out);
	});

	it("don't fix broken names", () => {
		const input = "John Sm ith";
		const out = "John Sm Ith";

		assert.deepEqual(parseName(input), out);
	});

	it("ignore non-alpha and non-space", () => {
		const input = "()-=John 123Smi1th";
		const out = "John Smith";

		assert.deepEqual(parseName(input), out);
	});

	it("should trim the text and remove duplicate spaces", () => {
		const input = "  John    Smith  ";
		const out = "John Smith";

		assert.deepEqual(parseName(input), out);
	});
});