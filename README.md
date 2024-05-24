# Couchbase Practical guide

This repository contains one angular application named `EdgeOfflineSync` which shows how to use PouchDB to sync data across devices.

## Sync Gateway Admin Calls

Once Couchbase cluster is created, you need to setup a Sync Gateway database and a Sync Gateway user to connect and sync data to edge devices.

After running `docker-compose up`, four things will be done for you in Couchbase:

1. Couchbase will be up and running.
2. A Couchbase single-node cluster will be created.
3. A bucket will be created.
4. An administrator user will also be created.

Now use the below `cURL` commands to create sync-gateway database and a user.

## Sync Gateway Database Creation

```bash
curl --location --request PUT 'http://localhost:4985/captain/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic QWRtaW5pc3RyYXRvcjpBZG1pbmlzdHJhdG9y' \
--data '{
    "name": "captain",
    "import_docs": true,
    "enable_shared_bucket_access": true,
    "bucket": "captain",
    "num_index_replicas": 0
}'
```

## Sync Gateway user creation

```bash
curl --location --request PUT 'http://localhost:4985/captain/_user/admin' \
--header 'Content-Type: application/json' \
--data '{
    "username": "admin",
    "password": "password",
    "admin_channels": ["*"]
}'
```

# Working Images

This image shows documents from couchbase server.

![couchbase-documents](images/couchbase-documents.png)

This image shows documents synced to Angular Web App.

![web-app-documents](images/ionic-sync-complete.png)
