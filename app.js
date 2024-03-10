const firstInput = document.querySelector('.first-input')
const secondInput = document.querySelector('.second-input')
const btn = document.querySelector('.add-btn')
const ul = document.querySelector('.ul')

function view() {
	const tasks = JSON.parse(localStorage.getItem('task')) || []
	ul.innerHTML = ''
	tasks.forEach(el => {
		const li = document.createElement('li')
		li.classList.add(
			'list-group-item',
			'd-flex',
			'justify-content-between',
			'align-items-center'
		)
		li.innerHTML = `
            <div class="line">${el.name[0].toUpperCase()}${el.username[0].toUpperCase()}</div> 
            Name: ${el.name} Username: ${el.username}
            <button class="del-btn btn btn-danger" data-id="${
							el.id
						}">delete</button>`
		ul.appendChild(li)
	})
}

view()

btn.addEventListener('click', () => {
	if (firstInput.value !== '' && secondInput.value !== '') {
		const tasks = JSON.parse(localStorage.getItem('task')) || []
		const newTask = {
			id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
			name: firstInput.value[0].toUpperCase() + firstInput.value.slice(1),
			username: secondInput.value[0].toUpperCase() + secondInput.value.slice(1)
		}
		tasks.push(newTask)
		localStorage.setItem('task', JSON.stringify(tasks))
		view()
		firstInput.style.border = '2px solid green'
		secondInput.style.border = '2px solid green'
	} else {
		firstInput.style.border = '3px solid red'
		secondInput.style.border = '3px solid red'
	}
})

ul.addEventListener('click', e => {
	if (e.target.classList.contains('del-btn')) {
		const taskId = parseInt(e.target.getAttribute('data-id'))
		let tasks = JSON.parse(localStorage.getItem('task')) || []
		tasks = tasks.filter(task => task.id !== taskId)
		localStorage.setItem('task', JSON.stringify(tasks))
		view()
	}
})

firstInput.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		secondInput.focus()
	}
})

secondInput.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		btn.focus()
	}
})

btn.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		firstInput.focus()
	}
})
