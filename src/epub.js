import Book from "./book";
import CFI from "./epubcfi";
import * as utils from "./utils/core";
import { EPUBJS_VERSION } from "./utils/constants";

/**
 * Creates a new Book
 * @param {string|ArrayBuffer} url URL, Path or ArrayBuffer
 * @param {object} options to pass to the book
 * @returns {Book} a new Book object
 * @example ePub("/path/to/book.epub", {})
 */
function ePub(url, options) {
	return new Book(url, options);
}

ePub.VERSION = EPUBJS_VERSION;

if (typeof(global) !== "undefined") {
	global.EPUBJS_VERSION = EPUBJS_VERSION;
}

ePub.Book = Book;
ePub.CFI = CFI;
ePub.utils = utils;

export default ePub;
