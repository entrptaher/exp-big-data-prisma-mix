const fetch = require('node-fetch');
const endpoint = 'http://localhost:4005';

const request = ({ query, variables }) => {
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  }).then((response) => response.json());
};

const CREATE_SITE = `
mutation CREATE_SITE {
  createSite {
    id
    data
  }
}
`;

const UPDATE_SITE = `
mutation UPDATE_SITE($data: SiteUpdateInput!, $where: SiteWhereUniqueInput!) {
  updateSite(
    where: $where
    data: $data
  ) {
    id
    data
  }
}`;

const rawData = require('./generator')();

async function main() {
  // const site = await request({ query: CREATE_SITE });
  const updatedSite = await request({
    query: UPDATE_SITE,
    variables: {
      where: { id: 'cka8dbsfi00380752t69fziwd' },
      data: { data: JSON.stringify(rawData) }, // this is the raw data for everything
    },
  });
  console.log(JSON.stringify({ updatedSite }, null, 2))
}

main();
