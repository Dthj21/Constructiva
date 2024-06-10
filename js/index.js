const GRAPHQL_ENDPOINT = 'http://127.0.0.1:8000/graphql/';

fetch(GRAPHQL_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'query { message }' })
})
.then(response => response.json())
.then(data => console.log(data));
