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
  // 1, 1 => ~1kb data
  // 1, 10 => ~10kb data
  // 1, 100 => ~100kb data
  // 1, 200 => ~200kb data
  // 2, 100 => ~200kb data
  
  // create site without any data
  const site = await request({ query: CREATE_SITE });
  debug('create');
  
  const rawData = JSON.stringify(require('./generator')(1, 100));
  for(let i=0; i< 1000; i++){
    // this is the raw data for everything
    // debug('generate');

    // update the site with new data
    await request({
      query: UPDATE_SITE,
      variables: {
        where: { id: site.data.createSite.id },
        data: { data: rawData }, 
        // data: { data: "{}" }, // empty data
      },
    });
    debug('update');
  }
  console.log(site.data.createSite.id);
  // console.log(JSON.stringify({ updatedSite }, null, 2))
}

main();
