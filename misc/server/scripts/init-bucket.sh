#!/bin/bash

couchbase-cli bucket-create \
  --cluster localhost:8091 \
  --bucket $COUCHBASE_BUCKET \
  --bucket-type couchbase \
  --username $ADMIN_USERNAME \
  --password $ADMIN_PASSWORD \
  --bucket-ramsize 512