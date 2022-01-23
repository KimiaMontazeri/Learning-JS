const listsContainer       = document.querySelector('[data-lists]')
const newListForm          = document.querySelector('[data-new-list-form]')
const newListInput         = document.querySelector('[data-new-list-input]')
const deleteListButton     = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement     = document.querySelector('[data-list-title]')
const listCountElement     = document.querySelector('[data-list-count]')
const tasksContainer       = document.querySelector('[data-tasks]')
const taskTemplate         = document.getElementById('task-template')
const newTaskForm          = document.querySelector('[data-new-task-form]')
const newTaskInput         = document.querySelector('[data-new-task-input]')

// store the user's data in the browser (local storage)
// making a namespace prevents you from overwriting the info that is already in the storage, or preventing other websites from overwriting this local storage
const LOCAL_STORAGE_LIST_KEY = 'task.lists' 
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

newListForm.addEventListener('submit', e => {
    // stops the page from submitting 
    e.preventDefault()

    const listName = newListInput.value
    if (listName == null || listName === '') return
    
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
})

newTaskForm.addEventListener('submit', e => {
    // stops the page from submitting 
    e.preventDefault()

    const taskName = newTaskInput.value
    if (taskName == null || taskName === '') return
    
    const task = createTask(taskName)
    newTaskInput.value = null
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks.push(task) // same as lists.push(list)
    saveAndRender()
})

// adds a click event listener for li element inside the div
listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId
        saveAndRender()
    }
})

deleteListButton.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null
    saveAndRender()
})

function createList(name) {
    return { id: Date.now().toString(), name: name, tasks: [] }
}

function createTask(name) {
    return { id: Date.now().toString(), name: name, complete: false }
}

function saveAndRender() {
    save()
    render()
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

function render() {
    clearElement(listsContainer)
    renderLists()

    const selectedList = lists.find(list => list.id === selectedListId)
    if (selectedListId == null) {
        listDisplayContainer.style.display = 'none'
    } else {
        listDisplayContainer.style.display = '' // revert it back to what is was 
        listTitleElement.innerText = selectedList.name
        renderTaskCount(selectedList)
        clearElement(tasksContainer)
        renderTasks(selectedList)
    }
}

function renderLists() {
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.classList.add("list-name")
        listElement.dataset.listId = list.id
        listElement.innerText = list.name

        if (list.id === selectedListId) {
            listElement.classList.add('active-list')
        }

        listsContainer.appendChild(listElement)
    })
}

function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        // use a template 
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        
        checkbox.id = task.id
        checkbox.checked = task.complete
        
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id 
        label.append(task.name)

        tasksContainer.appendChild(taskElement)
    })
}

function renderTaskCount(selectedList) {
    const incompleteTasksCount = selectedList.tasks.filter(task => !task.complete).length
    const taskString = incompleteTasksCount === 1 ? "task" : "tasks"
    listCountElement.innerText = `${incompleteTasksCount} ${taskString} remaining`
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render()