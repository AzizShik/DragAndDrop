window.addEventListener('load', () => {
	const containerEl = document.querySelector('[data-drag-container]');
	const containerItemEls = document.querySelectorAll('[data-drag-item]');
	const containerItemLists = document.querySelectorAll('.container__item-list');

	let backlogArr = [],
		progressArr = [],
		completeArr = [],
		holdArr = [];

	let currentItem;

	containerItemEls.forEach((item) => {
		item.addEventListener('dragstart', (e) => {
			const el = e.target;
			el.classList.add('selected');
			currentItem = el;
		});
	});

	containerItemLists.forEach((item) => {
		item.addEventListener('drop', (e) => {
			e.preventDefault();
			const el = e.target;

			if (el.classList.contains('container__item-li')) {
				const parent = el.parentNode;
				parent.appendChild(currentItem);
			} else {
				el.appendChild(currentItem);
			}

			containerItemEls.forEach((item) => item.classList.remove('selected'));
		});

		item.addEventListener('dragover', (e) => {
			e.preventDefault();
		});
	});
});
