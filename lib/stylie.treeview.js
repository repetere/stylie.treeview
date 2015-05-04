/*
 * stylie.treeview
 * https://github.com/typesettin/stylie.treeview
 *
 * Copyright (c) 2015 Yaw Joseph Etse. All rights reserved.
 */
'use strict';

var extend = require('util-extend'),
	events = require('events'),
	util = require('util');

/**
 * A module that represents a StylieTreeviews object, a componentTab is a page composition tool.
 * @{@link https://github.com/typesettin/stylie.treeview}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2015 Typesettin. All rights reserved.
 * @license MIT
 * @constructor StylieTreeviews
 * @requires module:util-extent
 * @requires module:util
 * @requires module:events
 * @param {object} el element of tab container
 * @param {object} options configuration options
 */
var StylieTreeviews = function (options) {
	events.EventEmitter.call(this);
	var defaultOptions = {
		tree: {}
	};

	this.options = extend(defaultOptions, options);
	// this.getTreeHTML = this.getTreeHTML;
};

util.inherits(StylieTreeviews, events.EventEmitter);

StylieTreeviews.prototype.getTreeItemAttributes = function (treeItemAttributes) {
	var returnHTML = '';
	for (var key in treeItemAttributes) {
		if (key !== 'class') {
			returnHTML += ' ' + key + '="' + treeItemAttributes[key] + '" ';
		}
	}

	return returnHTML;
};

StylieTreeviews.prototype.getTreeFolder = function (treeitem) {
	var returnHTML = '<li>';
	returnHTML += '<label for="' + treeitem['tree-item-id'] + '"  ' + this.getTreeItemAttributes(treeitem['tree-item-attributes']) + ' >' + treeitem['tree-item-label'] + '</label>';
	returnHTML += '<input type="checkbox" id="' + treeitem['tree-item-id'] + '" ' + this.getTreeItemAttributes(treeitem['tree-item-input-attributes']) + ' />';
	returnHTML += '<ol>';
	treeitem['tree-item-folder-contents'].forEach(function (nestedTreeItem) {
		if (nestedTreeItem['tree-item'] === 'file') {
			returnHTML += this.getTreeFile(nestedTreeItem);
		}
		if (nestedTreeItem['tree-item'] === 'folder') {
			returnHTML += this.getTreeFolder(nestedTreeItem);
		}
	}.bind(this));
	returnHTML += '</ol>';
	returnHTML += '</li>';
	return returnHTML;
};

StylieTreeviews.prototype.getTreeFile = function (treeitem) {
	var returnHTML = '<li class="ts-file ">';
	returnHTML += '<a class="' + treeitem['tree-item-attributes']['class'] + '" ';
	returnHTML += 'id="' + treeitem['tree-item-id'] + '"  ';
	returnHTML += this.getTreeItemAttributes(treeitem['tree-item-attributes']);
	returnHTML += ' href="' + treeitem['tree-item-link'] + '">';
	returnHTML += treeitem['tree-item-label'];
	returnHTML += '</a>';
	returnHTML += '</li>';

	return returnHTML;
};

StylieTreeviews.prototype.getTreeItem = function (treeitem) {
	if (treeitem['tree-item'] === 'file') {
		return this.getTreeFile(treeitem);
	}
	if (treeitem['tree-item'] === 'folder') {
		return this.getTreeFolder(treeitem);
	}
};


/**
 * Shows a modal component.
 * @param {string} modal name
 * @emits showModal
 */
StylieTreeviews.prototype.getTreeHTML = function () {
	var treeobject = this.options.tree,
		addedMainTreeId = treeobject['tree-item-id'] || '',
		addedMainTreeAttributes = treeobject['tree-item-attributes'],
		addedMainTreeClass = (addedMainTreeAttributes) ? addedMainTreeAttributes['class'] : '',
		returnHTML = '<ol class="ts-tree ' + addedMainTreeClass + '" id="' + addedMainTreeId + '" ' + this.getTreeItemAttributes(addedMainTreeAttributes) + ' >';
	treeobject.tree.forEach(function (treeitem) {
		returnHTML += this.getTreeItem(treeitem);
	}.bind(this));
	returnHTML += '</ol>';

	return returnHTML;
};

module.exports = StylieTreeviews;
