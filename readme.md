```sh
docker-compose up
yarn workspace core run prisma deploy
yarn workspace core run dev
```

The goal is to have a structure like this where we can update the Site.data over and over without hanging prisma.
```
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