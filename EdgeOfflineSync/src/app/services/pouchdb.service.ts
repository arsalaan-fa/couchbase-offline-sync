import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import PouchDB from "pouchdb";
import { Observable } from "rxjs";

// "{HOSTNAME}:{PORT}/{DB_NAME}";
const REMOTE_COUCH_DB_ADDRESS = "http://127.0.0.1:4984/captain";
const SYNC_ADMIN_GATEWAY_URL = "http://127.0.0.1:4985/captain/";

interface sessionInfo {
    session_id: string;
    expires: string;
    cookie_name: string;
}

@Injectable({
    providedIn: 'root'
})
export class PouchDBService {
    public localDb!: PouchDB.Database;
    public remoteDB!: PouchDB.Database;
    public syncHandler: any;
    private sessionId = "a6c208f41fd61ec3f33cee6ec7560759d88e0a22";

    constructor(private http: HttpClient) { }

    getSession(): Observable<sessionInfo> {
        return this.http.post<sessionInfo>(SYNC_ADMIN_GATEWAY_URL + "_session", {
            name: "admin", ttl: 7200
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    async init() {
        this.localDb = new PouchDB('TestDB');
        this.getSession().subscribe(
            response => this.sessionId = response.session_id
        );
        console.log('this.sessionId');
        console.log(this.sessionId);

        this.remoteDB = new PouchDB(REMOTE_COUCH_DB_ADDRESS, {
            auto_compaction: true,
            skip_setup: true,
            // TODO: below comment doesn't provide proper meaning
            // this approach is used when you need authentication to log on to sync gateway
            fetch: (url, opts: any) => {
                opts.headers.set('Cookie', `SyncGatewaySession=${this.sessionId}`);
                return PouchDB.fetch(url, opts);
            }

            // You can skip this fetch function if...
            // you do not want to authenticate syncGW user session
        });

        // For testing
        // this.createDocument();
    }

    private createDocument() {
        let doc = {
            "_id": "InputTwo",
            "name": "Mittens",
            "occupation": "kitten",
            "age": 3,
            "hobbies": [
                "playing with balls of yarn",
                "chasing laser pointers",
                "lookin' hella cute"
            ]
        };

        this.localDb.put(doc);
    }

    async startSync() {
        this.replicateDataFromCouchbase();
        this.replicateDataToCouchbase();
    }

    replicateDataFromCouchbase() {
        this.syncHandler = this.localDb.replicate.from(
            this.remoteDB).on('change', async (event: any) => {
                console.log('changes', event);
            }).on('paused', async (event: any) => {
                console.log("paused", event);
            }).on('error', async (event: any) => {
                console.log('error', event);
            }).on('complete', async (info: any) => {
                console.log('completed', info);
            });
    }

    replicateDataToCouchbase() {
        return new Promise(resolve => {
            this.syncHandler = this.localDb.replicate.to(
                this.remoteDB).on('change', async (event: any) => {
                    console.log('change', event);
                }).on('paused', async (event: any) => {
                    console.log('paused', event);
                }).on('error', async (event: any) => {
                    console.log('error', event);
                }).on('complete', async (info: any) => {
                    console.log('completed', info);
                });
        });
    }

    // if you need to cancel the sync or pause
    cancelSync() {
        this.syncHandler.cancel();
    }

}
