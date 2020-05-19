const { App } = require("@octokit/app");
const { request } = require("@octokit/request");
const { Octokit } = require("@octokit/rest");
    async function flow() {

        const app = new App({ id: APP_ID, privateKey: PRIVATE_KEY });
        const jwt = app.getSignedJsonWebToken();
        const { data } = await request("GET /repos/:owner/:repo/installation", {
            owner: "pasha-codefresh",
            repo: "github-app",
            headers: {
                authorization: `Bearer ${jwt}`,
                accept: "application/vnd.github.machine-man-preview+json",
            },
        });

        const installationId = data.id;

        console.log(installationId);

        const installationAccessToken = await app.getInstallationAccessToken({
            installationId,
        });

        console.log(installationAccessToken);

        const host = 'api.github.com';


        // Load the Github library, creating a redisClient object that uses promises
        this._githubClient = new Octokit({
            // debug: true,
            userAgent : 'Codefresh',
            auth : installationAccessToken,
            request:{
                timeout: 10000,
            },
            promise: Promise,
            timeout: 10000,
            host: host,
            pathPrefix: '/',
            debug: true
        });

        const result = await this._githubClient.repos.get({
            owner: 'pasha-codefresh',
            repo: 'github-app'
        });

        console.log(JSON.stringify(result));



    }

flow();
