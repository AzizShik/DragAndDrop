window.addEventListener('load', () => {
	const containerEl = document.querySelector('[data-drag-container]');
	const containerItemLists = document.querySelectorAll('.container__item-list');
	let containerItemEls;

	let backlogArr = ['Release the course', 'Sit back and relax'],
		progressArr = ['Work on projects', 'Listen to music'],
		completeArr = ['Being cool', 'Getting stuff done'],
		holdArr = ['Being uncool'];

	let currentItem;

	loadKanbanInfo();

	function loadKanbanInfo() {
		containerItemLists.forEach((item, idx) => {
			if (idx === 0) {
				backlogArr.forEach((arrItem) => {
					createContainerItem(item, arrItem);
				});
			} else if (idx === 1) {
				progressArr.forEach((arrItem) => {
					createContainerItem(item, arrItem);
				});
			} else if (idx === 2) {
				completeArr.forEach((arrItem) => {
					createContainerItem(item, arrItem);
				});
			} else if (idx === 3) {
				holdArr.forEach((arrItem) => {
					createContainerItem(item, arrItem);
				});
			}
		});

		containerItemEls = document.querySelectorAll('[data-drag-item]');

		containerItemEls.forEach((item) => {
			item.addEventListener('dragstart', (e) => {
				const el = e.target;
				el.classList.add('selected');
				currentItem = el;
			});
		});
	}

	function createContainerItem(item, arrItem) {
		const li = document.createElement('li');
		li.classList.add('container__item-li');
		li.textContent = arrItem;
		li.setAttribute('data-drag-item', '');
		li.setAttribute('draggable', 'true');
		item.appendChild(li);
	}

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
			containerItemLists.forEach((item) => item.classList.remove('drag-over'));
		});

		item.addEventListener('dragenter', (e) => {
			const el = e.target;
			addDragOver(el);
		});

		item.addEventListener('dragover', (e) => {
			e.preventDefault();
			const el = e.target;
			containerItemLists.forEach((item) => item.classList.remove('drag-over'));
			addDragOver(el);
		});
	});

	function addDragOver(el) {
		if (el.classList.contains('container__item-li')) {
			el.parentNode.classList.add('drag-over');
		} else {
			el.classList.add('drag-over');
		}
	}
});
