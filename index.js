const URL = 'https://api.github.com/orgs/grupotesseract/public_members'

fetch(URL)
    .then((response) => response.json().then((data) => console.log(data)))
    .catch((err) => console.error(err));
  
