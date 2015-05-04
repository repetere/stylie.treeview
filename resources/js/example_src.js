'use strict';

var StylieModal = require('../../index'),
	classie = require('classie'),
	StylieModal1,
	modalButtonContainer;

var openModalButtonHandler = function (e) {
	if (classie.has(e.target, 'md-trigger')) {
		StylieModal1.show(e.target.getAttribute('data-modal'));
	}
};

window.addEventListener('load', function () {
	modalButtonContainer = document.querySelector('#td-modal-buttons');
	StylieModal1 = new StylieModal({});
	modalButtonContainer.addEventListener('click', openModalButtonHandler, false);

	window.StylieModal1 = StylieModal1;
}, false);
