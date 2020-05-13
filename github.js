const { App } = require("@octokit/app");
const { request } = require("@octokit/request");
const { Octokit } = require("@octokit/rest");


    async function flow() {
        const APP_ID = 64781; // replace with your app ID
        const PRIVATE_KEY = "-----BEGIN RSA PRIVATE KEY-----\n" +
            "MIIEpAIBAAKCAQEAs/fUzRffqftDfwDhb5KYVa99du/wX4HqUlBlqO3xTwYBY1Sd\n" +
            "nJ6zI3l6lwKURAm7HmhtFzrdJ1EnCWH3IwX7vqIdUVAFT2PIA4TFJOB4/jnBBuHy\n" +
            "J2pGEv+kDJgyFvyQs3UWqw/U36sV0/RkqOR0w2epda81Mi8H6mawoLoq7XM+HMCC\n" +
            "BHNsWhNY2wDIgwVmScZy+ddWunruGioqIGy39VqrdymZNLkJFAFY+h2qkXRSqgJf\n" +
            "QFwB52SztZ6K1K3NDnQe8MeDZx0J4vo8AC6HV3/Fc62+6SXfz5Rz8xaR2KdIZDw5\n" +
            "0rJw2Ct2GSgKOZKPEeRu4nptPYffrhOxKBlvUwIDAQABAoIBAC6tau4+8O3/k4QP\n" +
            "UGlF1mjy+VGt7eR3p7Tt0VA9VscuQZHn0nFa4A+lZFxieN4kv/mlEBZkWBPogn12\n" +
            "gUj+Nks9dOkwHhB3SttOxmtIJVma1SvZ0prSf5ZR49S4bNV1cHp7NgPsOURB9Ylh\n" +
            "6/G6P2anLlatuNhpRl5PgCRP5O5s9Bul4o7VtO9htqe4P+l/jBdxP98IR2Xxqs7x\n" +
            "Yx2mRR4wt5idojo2aTw67Ec4rPIEVpRwkoKQJnylQLycRFrnZyncp1Njb+ds4zlV\n" +
            "/9Y/SH2VGQxd4dC3ylevShGSlkNl7XiFAZ4ZJ6NjsgmwaoYeMWNix5D3sfWMeWWE\n" +
            "ojaGqGECgYEA3V7ZSvjaSV4QiIApTwF9ripnxOvc9szCndG34apxqr70Edmcn1z5\n" +
            "AKvmRzDNNj0tP+fJ52tCQ6JEbzBlOONQxC3A/trI2YjRUuKwKxIxmFVKU6MKdofG\n" +
            "cTIus9SB7SD/jAsAYf7zY8XWGGg1QJDEtSvsVjFG7rvpNrml2Cbw56kCgYEA0B70\n" +
            "Kf3zBZHaqWqr/DSjjrDlLm1Hen38A8QXSTp4b0ADDYBvYl2ZXZRpYH2qZM5uCoYc\n" +
            "iAz3Jfcdt3cFjq38Z6Zq/1A82CbQz4Qzo2fASd8IjfTMoupmZ3vogqEORnfqeKEg\n" +
            "OEnmbGWg6yZLMLIpN1cxMR/ROZH/yV2FfzIfTJsCgYEA0bQfPfFdv7C3Esft2eT8\n" +
            "rPeI07fn23f/SMe5XLI8+VXpGdu+jgzh6SvuejQVwjLT4bzuvCYUYMOf9oCu8uQL\n" +
            "x7vcHtEdAU2lldIetr6GctshDPffWoemiebS7RH7fqoKyxxE4ZBF+pcYCIj3IVHC\n" +
            "timEueX2XwNtmqTlIU1KWvkCgYEAqomSvY4QQ3Ie4VA9ma5wj444XfDB74eoqFVY\n" +
            "V3MIGPE1Dy09GDdmYp4oMx8GLxBQb2MxofIt2vhBa4KmFSJQf4aIiqlvEhfMZx8H\n" +
            "SVDM6jtOQTRlMuIsA4QvJEtg7TF5+lrdkgJMRGqKj+WTG1YCHAzgjEZsJWaTWKe/\n" +
            "qlih+R0CgYBQN31RBfBcei2QNqBma0a73Hnt3qmEcs306zgGcb6fGY8lehFRM8LL\n" +
            "LfzxF9B+x6MWt1vgtHBhT7xVoH1d9Soc9opXwT4VNbhpUSo1Y7Qff6+JNE42+Uks\n" +
            "ddV12APMETWgk6ERUKw2juPjrtzGmnX4vGfuVA+H1ETstzKQN3VmuQ==\n" +
            "-----END RSA PRIVATE KEY-----"; // replace with contents of your private key. Replace line breaks with \n

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
