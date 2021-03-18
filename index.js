let data = [];

async function getData() {
  const results = await fetch("https://api.github.com/orgs/grupotesseract/public_members")
    .then((response) => response.json())
    .then((json) => json.results);
  return results;
}

async function main() {
  data = await getData();
  console.log(data);  
}

main();
