const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const name = "Sidney Kertzmann"
  // Sidney Kertzmann
  const index = niceList.findIndex(n => n === name);
  // create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList);

  // const root = merkleTree.getRoot();
  const proof = merkleTree.getProof(index);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: proof,
  });

  console.log({ gift });
}

main();