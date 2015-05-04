/*
 * stylie.treeview
 * https://github.com/typesettin/stylie.treeview
 *
 * Copyright (c) 2015 Yaw Joseph Etse. All rights reserved.
 */
'use strict';

var extend = require('util-extend'),
	classie = require('classie'),
	events = require('events'),
	htmlEl,
	util = require('util');

/**
 * A module that represents a StylieModals object, a componentTab is a page composition tool.
 * @{@link https://github.com/typesettin/stylie.treeview}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2015 Typesettin. All rights reserved.
 * @license MIT
 * @constructor StylieModals
 * @requires module:util-extent
 * @requires module:util
 * @requires module:events
 * @param {object} el element of tab container
 * @param {object} options configuration options
 */
var StylieModals = function (options) {
	events.EventEmitter.call(this);

	// this.el = el;
	this.options = extend(this.options, options);
	// console.log(this.options);
	this._init();
	this.show = this._show;
	this.hide = this._hide;
};

var closeModalOnKeydown = function (e) {
	if (this.options.close_modal_on_escape_key === true && e.keyCode === 27) {
		this.hide(this.options.current_modal);
		document.querySelector('html').removeEventListener('keydown', closeModalOnKeydown, false);
	}
};

var closeOverlayOnClick = function () {
	this.hide(this.options.current_modal);
};

var closeModalClickHandler = function (e) {
	if (classie.has(e.target, this.options.modal_close_class)) {
		this.hide(this.options.current_modal);
	}
};

util.inherits(StylieModals, events.EventEmitter);

/** module default configuration */
StylieModals.prototype.options = {
	start: 0,
	modal_overlay_selector: '.ts-modal-overlay',
	modal_elements: '.ts-modal',
	modal_body_container_class: 'ts-modal-container',
	modal_close_class: 'ts-modal-close',
	modal_default_class: 'ts-modal-effect-1',
	modals: {},
	overlay: null,
	close_modal_on_overlay_click: true,
	close_modal_on_escape_key: true,
	current_modal: ''
};
/**
 * initializes modals and shows current tab.
 * @emits modalsInitialized
 */
StylieModals.prototype._init = function () {
	var body = document.querySelector('body');
	htmlEl = document.querySelector('html');

	this.options.overlay = document.querySelector(this.options.modal_overlay_selector);
	this.options.modalEls = document.querySelectorAll(this.options.modal_elements);

	if (!classie.has(body, this.options.modal_body_container_class)) {
		classie.add(body, this.options.modal_body_container_class);
	}

	for (var x in this.options.modalEls) {
		if (typeof this.options.modalEls[x] === 'object') {
			this.options.modals[this.options.modalEls[x].getAttribute('data-name')] = this.options.modalEls[x];
		}
	}
	this._initEvents();
	this.emit('modalsInitialized');
};

/**
 * handle tab click events.
 */
StylieModals.prototype._initEvents = function () {
	if (this.options.close_modal_on_overlay_click === true) {
		this.options.overlay.addEventListener('click', closeOverlayOnClick.bind(this), false);
	}
	this.emit('modalsEventsInitialized');
};

/**
 * Hides a modal component.
 * @param {string} modal name
 * @emits showModal
 */
StylieModals.prototype._hide = function (modal_name) {
	var modal = this.options.modals[modal_name];
	classie.remove(modal, 'ts-modal-show');
	// this.options.current_modal = '';

	modal.removeEventListener('click', closeModalClickHandler, false);

	if (this.options.close_modal_on_escape_key === true) {
		htmlEl.removeEventListener('keydown', closeModalOnKeydown.bind(this), false);
	}


	this.emit('hideModal', {
		modal: modal,
		modal_name: modal_name
	});
};

/**
 * Shows a modal component.
 * @param {string} modal name
 * @emits showModal
 */
StylieModals.prototype._show = function (modal_name) {
	var modal = this.options.modals[modal_name],
		hasModalEffect = false;

	for (var y = 0; y < modal.classList.length; y++) {
		if (modal.classList[y].search('ts-modal-effect-') >= 0) {
			hasModalEffect = true;
		}
	}

	if (hasModalEffect === false) {
		classie.add(modal, this.options.modal_default_class);
	}

	classie.add(modal, 'ts-modal-show');
	this.options.current_modal = modal_name;

	modal.addEventListener('click', closeModalClickHandler.bind(this), false);

	if (this.options.close_modal_on_escape_key === true) {
		htmlEl.addEventListener('keydown', closeModalOnKeydown.bind(this), false);
	}

	this.emit('showModal', {
		modal: modal,
		modal_name: modal_name
	});
};
module.exports = StylieModals;
