'use strict';

var StylieTreeview = require('../../index'),
	tree1 = require('./tree_data_1'),
	tree2 = require('./tree_data_2'),
	StylieTreeview1,
	StylieTreeview2;

window.addEventListener('load', function () {
	StylieTreeview1 = new StylieTreeview({
		tree: tree1
	});
	StylieTreeview2 = new StylieTreeview({
		tree: tree2
	});
	document.querySelector('#tree-example-1').innerHTML = StylieTreeview1.getTreeHTML();
	document.querySelector('#tree-example-2').innerHTML = StylieTreeview2.getTreeHTML();
	window.StylieTreeview1 = StylieTreeview1;
	window.StylieTreeview2 = StylieTreeview2;
}, false);
