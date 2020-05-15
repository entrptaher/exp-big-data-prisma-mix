const fetch = require('node-fetch');
const debug = require('debug')('client');

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

async function main() {
  debug('init');

  // create data
  // 1 => ~100kb data, 2 => ~200kb data
  const rawData = require('./generator')(1);
  debug('generate');
  
  // create site without any data
  const site = await request({ query: CREATE_SITE });
  debug('create');
  
  for(let i=0; i< 1000; i++){
    // update the site with new data
    const updatedSite = await request({
      query: UPDATE_SITE,
      variables: {
        where: { id: site.data.createSite.id },
        data: { data: JSON.stringify(rawData) }, // this is the raw data for everything
      },
    });
    debug('update');
  }
  // console.log(JSON.stringify({ updatedSite }, null, 2))
}

main();
