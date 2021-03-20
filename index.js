const URL = 'https://api.github.com/orgs/grupotesseract/public_members'

async function ListMembers() {
  const members = await fetch(URL)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })

  return members
}

const modal = {
  click() {
    document.querySelector('.modal-overlay').classList.toggle('active')
  }
}

const table = document.querySelector('#data-table tbody')

function Rows(member) {
  const tr = document.createElement('tr')
    tr.innerHTML = `
            <td>
                <img class="logo" src=${member.avatar_url}"  alt="User Image" />
            </td>
            <td class="login">${member.login}</td>
            <td>
            <button class="details" onclick="modal.click()">Detalhes</button>
            </td>
                      
        `
    table.appendChild(tr)
}

function ClearTable() {  
  table.innerHTML = ''
}

function Members() {
  ListMembers().then((members) => {  
    members.forEach((member) => {    
      Rows(member)
    })  
  })
}

Members()

function filterByLogin(login) {
  ListMembers().then((members) => {
    members.find((member) => {
      if (member.login === login) {
        ClearTable()
        Rows(member)
      } else {        
        document.querySelector('input').value = ''               
      }
    })
  })
}

const btnFilter = document.querySelector('.search')
const btnCancel =  document.querySelector('.cancel')

btnFilter.addEventListener('click', () => {
  const login = document.querySelector('input').value
  filterByLogin(login)  
})

btnCancel.addEventListener('click', () => {  
  document.querySelector('input').value = ''
  ClearTable()
  Members()
})

document.getElementById('.details').addEventListener('click', () => {  
  modal.click()
})

