window.addEventListener('load', () => {
	const containerEl = document.querySelector('[data-drag-container]');
	const containerItemLists = document.querySelectorAll('[data-drag-list]');
	const dataAddItems = document.querySelectorAll('[data-add-item]');
	let containerItemEls;

	let backlogArr = ['Release the course', 'Sit back and relax'],
		progressArr = ['Work on projects', 'Listen to music'],
		completeArr = ['Being cool', 'Getting stuff done'],
		holdArr = ['Being uncool'];

	let currentItem;

	if (localStorage.getItem('backlogArr') !== null) {
		backlogArr = JSON.parse(localStorage.getItem('backlogArr'));
		progressArr = JSON.parse(localStorage.getItem('progressArr'));
		completeArr = JSON.parse(localStorage.getItem('completeArr'));
		holdArr = JSON.parse(localStorage.getItem('holdArr'));
		loadKanbanInfo();
	} else {
		loadKanbanInfo();
	}

	function loadKanbanInfo() {
		containerItemLists.forEach((item, idx) => {
			switch (idx) {
				case 0:
					backlogArr.forEach((arrItem) => {
						createContainerItem(item, arrItem);
					});
					break;
				case 1:
					progressArr.forEach((arrItem) => {
						createContainerItem(item, arrItem);
					});
					break;
				case 2:
					completeArr.forEach((arrItem) => {
						createContainerItem(item, arrItem);
					});
					break;
				case 3:
					holdArr.forEach((arrItem) => {
						createContainerItem(item, arrItem);
					});
					break;
			}
		});

		containerItemEls = document.querySelectorAll('[data-drag-item]');

		containerItemEls.forEach((item) => {
			addEventListenersForItems(item);
		});
	}

	function addEventListenersForItems(item) {
		item.addEventListener('dragstart', (e) => {
			const el = e.target;
			el.classList.add('selected');
			currentItem = el;
		});

		item.addEventListener('input', (e) => {
			reloadContainerItems();
			saveLocalStorage();
		});

		item.addEventListener('focusout', (e) => {
			const el = e.target;
			reloadContainerItems();
			saveLocalStorage();
			if (!el.textContent) {
				el.remove();
				reloadContainerItems();
				saveLocalStorage();
			}
			removeActiveClasses();
		});
	}

	function createContainerItem(item, arrItem) {
		const li = document.createElement('li');
		li.classList.add('container__item-li');
		li.textContent = arrItem;
		li.setAttribute('data-drag-item', '');
		li.setAttribute('draggable', 'true');
		li.setAttribute('contenteditable', 'true');
		item.appendChild(li);
	}

	function removeActiveClasses() {
		containerItemEls.forEach((item) => item.classList.remove('selected'));
		containerItemLists.forEach((item) => item.classList.remove('drag-over'));
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

			removeActiveClasses();
			reloadContainerItems();
			saveLocalStorage();
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

	function reloadContainerItems() {
		containerItemLists.forEach((item, idx) => {
			const elements = item.querySelectorAll('[data-drag-item]');

			if (idx === 0) {
				backlogArr = [];
				pushToArray(backlogArr, elements);
			} else if (idx === 1) {
				progressArr = [];
				pushToArray(progressArr, elements);
			} else if (idx === 2) {
				completeArr = [];
				pushToArray(completeArr, elements);
			} else if (idx === 3) {
				holdArr = [];
				pushToArray(holdArr, elements);
			}
		});
	}

	function pushToArray(arr, elements) {
		elements.forEach((item) => {
			arr.push(item.textContent);
		});
	}

	function saveLocalStorage() {
		localStorage.setItem('backlogArr', JSON.stringify(backlogArr));
		localStorage.setItem('progressArr', JSON.stringify(progressArr));
		localStorage.setItem('completeArr', JSON.stringify(completeArr));
		localStorage.setItem('holdArr', JSON.stringify(holdArr));
	}

	function addDragOver(el) {
		if (el.classList.contains('container__item-li')) {
			el.parentNode.classList.add('drag-over');
		} else {
			el.classList.add('drag-over');
		}
	}

	dataAddItems.forEach((item) => {
		item.addEventListener('click', (e) => {
			const el = e.target;
			const parent = el.parentNode;
			const containerItemLlist = parent.querySelector('.container__item-list');
			const li = document.createElement('li');
			li.classList.add('container__item-li');
			li.setAttribute('data-drag-item', '');
			li.setAttribute('draggable', 'true');
			li.setAttribute('contenteditable', 'true');
			containerItemLlist.appendChild(li);

			containerItemEls = document.querySelectorAll('[data-drag-item]');

			containerItemEls.forEach((item) => {
				addEventListenersForItems(item);
			});
			reloadContainerItems();
			saveLocalStorage();
		});
	});
});
