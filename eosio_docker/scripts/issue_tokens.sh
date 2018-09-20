#!/bin/bash
set -o errexit

echo "=== start deploy data ==="

# set PATH
PATH="$PATH:/opt/eosio/bin"

# change to script directory
cd "$(dirname "$0")"

echo "=== start issuing EOS tokens in blockchain ==="

cleos push action eosio.token create '[ "eosio", "1000000000.0000 EOS"]' -p eosio.token@active

echo "=== start issuing NFT tokens in blockchain ==="

cleos push action eosio.nft create '["eosio.nft","NFT"]' -p eosio.nft@active

# download jq for json reader, we use jq here for reading the json file ( accounts.json )
mkdir -p ~/bin && curl -sSL -o ~/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64 && chmod +x ~/bin/jq && export PATH=$PATH:~/bin

# loop through the array in the json file, import keys and create accounts
# these pre-created accounts will be used for saving / erasing notes
# we hardcoded each account name, public and private key in the json.
# NEVER store the private key in any source code in your real life developmemnt
# This is just for demo purpose

jq -c '.[]' accounts.json | while read i; do
  name=$(jq -r '.name' <<< "$i")
  pub=$(jq -r '.publicKey' <<< "$i")

  # to simplify, we use the same key for owner and active key of each account
  cleos push action eosio.nft issue '['"${name}"', "1 NFT",["{\"userId\":\"db1daa60-b810-44f9-851a-c7427581e09f\",\"dob\":\"1987-10-27\",\"firstName\":\"Albert\",\"lastName\":\"Chen\",\"transactionId\":\"4f60574d-8ee4-4c30-882d-1f3ce9b1c18d\",\"address\":\"1070 Woodland Dr\",\"city\":\"Beverly Hills\",\"state\":\"CA\",\"country\":\"US\",\"postCode\":\"90210\"}"],"Test","memo"]' -p eosio.nft@active
  cleos push action eosio.token issue '['"${name}"', "100.0000 EOS", "memo" ]' -p eosio@active
done
