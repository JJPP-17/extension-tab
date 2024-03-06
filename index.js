let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
// 1. Store the delete button in a deleteBtn variable
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-btn")
let leadsFromlocalstorage = JSON.parse(localStorage.getItem("myLeads"))


tabBtn.addEventListener("click", function() {
    // Grab the url of the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
      })
} )


if (leadsFromlocalstorage) {
    myLeads = leadsFromlocalstorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    // save myLeads array to localstorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

console.log(localStorage.getItem("myLeads"))


