const URL = 'https://api.github.com/orgs/grupotesseract/public_members'
const table = document.querySelector('#data-table tbody')
let countMembers = qtdMembers()

async function listMembers() {
  try {
    const response = await fetch(URL)
    const members = await response.json()
    return { count: members.length, members }
  } catch (error) {
    console.log(error)
    return { count: 0, members: [] }
  }
}

const modal = {
  click() {
    document.querySelector('.modal-overlay').classList.toggle('active')   
      clearTable()
      members()  
  },  
}

function rows(member) {
  const tr = document.createElement('tr')
  tr.innerHTML =
    `
    <td>
      <img class="logo" src=${member.avatar_url}" alt="User Image" />
    </td>
    <td class="login">${member.login}</td>
    <td>
      <button class="details" onclick="openDetails('${member.login}')">
        <i class="fa-solid fa-circle-info"></i>
        Info
      </button>
    </td>        
  `
  table.appendChild(tr)
}

function clearTable() {
  table.innerHTML = ''
}

async function members() {
  try {
    const { members } = await listMembers()
    members.forEach(member => {
      rows(member)
    })
  } catch (error) {
    console.error(error)
  }
}

async function qtdMembers() {
  const { count } = await listMembers()
  document.getElementsByClassName('table-row-count')[0].innerHTML = `${count} Members`

  return count
}

async function filterByLogin(login) {
  const { members } = await listMembers()
  members.find(member => {
    if (member.login === login) {
      clearTable()
      rows(member)
    } else {
      document.querySelector('input').value = ''
    }
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
  clearTable()
  members()
})

function openDetails(user) {
  const div = document.querySelector('.input-group')
  fetch(`https://api.github.com/users/${user}`)
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

members()