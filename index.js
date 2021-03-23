const URL = 'https://api.github.com/orgs/grupotesseract/public_members'
const table = document.querySelector('#data-table tbody')

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
  },
}

function Rows(member) {
  const tr = document.createElement('tr')
  tr.innerHTML =
  `
    <td>
      <img class="logo" src=${member.avatar_url}" alt="User Image" />
    </td>
    <td class="login">${member.login}</td>
    <td>
      <button class="details" onclick="OpenDetails('${member.login}')">Detalhes</button>
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
const btnCancel = document.querySelector('.cancel')

btnFilter.addEventListener('click', () => {
  const login = document.querySelector('input').value
  filterByLogin(login)
})

btnCancel.addEventListener('click', () => {
  document.querySelector('input').value = ''
  ClearTable()
  Members()
})

function OpenDetails(user) {    
  const div = document.querySelector('.input-group')
  fetch('https://api.github.com/users/' + user)
    .then((response) => response.json())
    .then((user) => {      
      div.innerHTML = `
          <label class="sr-only">Name:
              <p>${user.name}</p>
          </label>
          <label class="sr-only">Repos:
              <p>${user.public_repos}</p>
          </label>
          <label class="sr-only">Followers:
              <p>${user.followers}</p>
          </label>
          <label class="sr-only">Created at:
              <p>${user.created_at}</p>
          </label> `      
    })
    modal.click() 
}

Members()