#!/bin/bash

couchbase-cli user-manage \
  --cluster localhost:8091 \
  --username $ADMIN_USERNAME \
  --password $ADMIN_PASSWORD \
  --set \
  --rbac-username $COUCHBASE_SYNC_GATEWAY_USERNAME \
  --rbac-password $COUCHBASE_SYNC_GATEWAY_PASSWORD \
  --roles ro_admin,bucket_full_access[*] \
  --auth-domain local
