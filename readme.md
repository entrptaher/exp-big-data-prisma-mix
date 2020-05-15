```sh
# Run database and prisma
docker-compose up
docker-compose --compatibility up
docker-compose --compatibility up --build -d --force-recreate web

# deploy the prisma1 schema
yarn workspace core run prisma deploy

# run the server
DEBUG=core yarn workspace @entrptaher/core run dev

# run the client from a terminal to trigger create and update task
# it will create once and update 1000 times
DEBUG=client nodemon client/site.js
```

The goal is to have a structure like this where we can update the Site.data over and over without hanging prisma.
```js
{
  Site: {
    data: {
      page1: { group1: [], group2: [] },
      page2: { group1: [], group2: [] },
      page3: { group1: [], group2: [] },
      page4: { group1: [], group2: [] },
    }
  },
}
```

Example playground input:
```graphql
mutation createSite {
  createSite {
    id
    data
  }
}

mutation createSite {
  createSite(data: { data: "{\"foo\": \"bar\"}" }) {
    id
    data
  }
}

mutation updateSite {
  updateSite(
    where: { id: "cka8d052i002c0752k6l73ias" }
    data: { data: "{\"foo\": \"bar12\"}" }
  ) {
    id
    data
  }
}
```