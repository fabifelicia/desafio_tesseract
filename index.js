const URL = 'https://api.github.com/orgs/grupotesseract/public_members'

async function ListMembers() {
     const members = await fetch(URL)
        .then((response) => response.json())     
        .catch((error) => {console.log(error)})
    
    return members
    }

const table = document.querySelector('#data-table tbody')
table.innerHTML = "";

ListMembers().then(members => {    
    members.forEach((member) => {
        const tr = document.createElement('tr')
        tr.innerHTML = 
        `
            <td>
                <img class="logo" src=${member.avatar_url}"  alt="User Image" />
            </td>
            <td class="login">${member.login}</td>
        `
        table.appendChild(tr);
    })
})

function filterByLogin(member) {
    
}




 

