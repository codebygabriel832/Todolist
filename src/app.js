class Todo {

    constructor(title, description, duedate, priority) {
        
        this.title = title,
        this.description = description,
        this.duedate = duedate
        this.priority = priority
    }

}

//Global Variables
let todolist = []
let complete = false


//Check complete status
const checkCompleteStatus = (container) => {

    complete = true

    if(complete) {

    container.style.backgroundColor = 'green'
    }
}

//Add todo
const addToList = (title, description, due_date, priority) => {

    const todo = new Todo(title, description, due_date, priority)

    todolist.push(todo)
    console.log(todolist)
}

//display todo
export const displayList = () => {

    const contentContainer  = document.querySelector("#content-container")

    contentContainer.innerHTML = ""

    todolist.forEach((todo) => {

        createUiElements(todo, contentContainer)

    })
}

//add button
export const add = () => {

        const add_btn = document.querySelector("#add_btn")
        add_btn.addEventListener('click', () => {

            const existingForm = document.querySelector('#todo-form')
            if (existingForm) {

                if (existingForm.style.display === 'none' || existingForm.style.display === '') { 

                    existingForm.style.display = 'block'; 

                } else {

                    existingForm.style.display = 'none';

                }
            } else {
        
                createform();
            }
        })
}


//create form
const createform = ({title = '', description = '', due_date = '', priority = '', onSave = null} = {}) => {

    const contentContainer = document.querySelector('#content')


    const form = document.createElement('form')
    form.id = 'todo-form'
    
    const tittle_div = document.createElement('div')
    const description_div = document.createElement('div')
    const duedate_div = document.createElement('div')
    const priority_div = document.createElement('div')

    const title_label = document.createElement('label')
    const tittle_input = document.createElement('input')
    const description_label = document.createElement('label')
    const description_input = document.createElement('textarea')
    const duedate_label = document.createElement('label')
    const duedate_input = document.createElement('input')
    const priority_label = document.createElement('label')
    const priority_input = document.createElement('select')
    const option1 = document.createElement('option')
    const option2 = document.createElement('option')
    const option3 = document.createElement('option')
    const submit_btn = document.createElement('button')

    title_label.setAttribute('for', 'title')
    tittle_input.setAttribute('id', 'title')
    description_label.setAttribute('for', 'desc')
    description_input.setAttribute('id', 'desc')
    duedate_label.setAttribute('for', 'due_date')
    duedate_input.setAttribute('id', 'due_date')
    duedate_input.setAttribute('type', 'date')
    submit_btn.setAttribute('type', 'submit')
    submit_btn.classList.add('submit-btn')

    tittle_input.required = true
    description_input.required = true
    duedate_input.required = true


    tittle_div.classList.add('title-div')
    description_div.classList.add('description-div')
    duedate_div.classList.add('duedate-div')
    priority_div.classList.add('priority-div')
    submit_btn.classList.add('btn')
    submit_btn.id = 'submit_btn'

    title_label.textContent = "Tittle"
    description_label.textContent = 'Description'
    duedate_label.textContent = 'Due Date'
    priority_label.textContent = 'Priority'
    option1.textContent = "Low"
    option2.textContent = "Medium"
    option3.textContent = "High"
    submit_btn.textContent = onSave ? "Save Changes" : "Submit"


    priority_input.appendChild(option1)
    priority_input.appendChild(option2)
    priority_input.appendChild(option3)

    tittle_div.appendChild(title_label)
    tittle_div.appendChild(tittle_input)
    description_div.appendChild(description_label)
    description_div.appendChild(description_input)
    duedate_div.appendChild(duedate_label)
    duedate_div.appendChild(duedate_input)
    priority_div.appendChild(priority_label)
    priority_div.appendChild(priority_input)


    tittle_input.value = title
    description_input.value = description
    duedate_input.value = due_date
    priority_input.value = priority

    form.addEventListener('submit', (e) => {

        e.preventDefault()

        title = tittle_input.value
        description = description_input.value
        due_date = duedate_input.value
        priority = priority_input.value

        if(onSave){

            onSave({ title: title, description: description, due_date: due_date, priority: priority });

        }else {

            addToList(title, description, due_date, priority)
            displayList()

        }
        
        tittle_input.value = ""
        description_input.value = ""
        duedate_input.value = ""
        form.style.display = "none"



    })

    form.appendChild(tittle_div)
    form.appendChild(description_div)
    form.appendChild(duedate_div)
    form.appendChild(priority_div)
    form.appendChild(submit_btn)
    contentContainer.appendChild(form)

}

//create uiElements
const createUiElements = (todo, contentContainer) => { 

    const div = document.createElement('div')

    const completeBtn = document.createElement('button')
    const title = document.createElement('p')
    const description = document.createElement('p')
    const duedate = document.createElement('p')
    const priority = document.createElement('p')
    const btnContainer = document.createElement('div')
    const delBtn = document.createElement('button')
    const editBtn = document.createElement('button')

    div.classList.add('todo-card')
    delBtn.classList.add('btn')
    editBtn.classList.add('btn')
    completeBtn.classList.add('btn')
    btnContainer.classList.add('btn-container')

    delBtn.id = 'del_btn'
    editBtn.id = 'edit_btn'
    completeBtn.id = 'complete_btn'

    title.textContent = `Title: ${todo.title}` 
    description.textContent = `Desc: ${todo.description}`
    duedate.textContent = `Due_Date: ${todo.duedate}`
    priority.textContent = `Priority: ${todo.priority}`
    delBtn.textContent = "Delete"
    editBtn.textContent = "Edit"
    completeBtn.textContent = "Complete"

    btnContainer.appendChild(delBtn)
    btnContainer.appendChild(editBtn)
    btnContainer.appendChild(completeBtn)

    div.appendChild(title)
    div.appendChild(description)
    div.appendChild(duedate)
    div.appendChild(priority)
    div. appendChild(btnContainer)

    //complete button event handler
    completeBtn.addEventListener('click', () => {

        checkCompleteStatus(div)
    })

    //delete button event handler
    delBtn.addEventListener('click', ()=> {

        let index = todolist.indexOf(todo)

        todolist.splice(index, 1)

        div.remove()
    })

    //Edit button event handler

    editBtn.addEventListener('click', ()=> {

        createform({
            title: todo.title,
            description: todo.description,
            due_date: todo.due_date,
            priority: todo.priority,
            onSave: (updateData) => {

                todo.title = updateData.title
                todo.description = updateData.description
                todo.due_date = updateData.due_date
                todo.priority = updateData.priority
                
                displayList()
            }
        })

    })


    contentContainer.appendChild(div)

}
