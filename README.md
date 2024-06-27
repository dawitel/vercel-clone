## Vercel( from walmart) 

This is a fullstack microservice architecture based vercel wanabe made to learn AWS and microservices as a whole.
Features include the following:

| Feature | Description |
| ------- | ----------- |
| Cliet app | A simple UI with out authetication to create deployments |
| Upload service | Uploadig files to S3 |
| Deployment service | Building and Deploying files to a sudomain |
| Request-handler service | Handling requests ansd serving assets(HTML, CSS. and JS) |
| AWS linke services | R2 from cloudflare, SQS for queue |
| CI/CD | Github actions |


## How it works

Thw uderlyig priciple is very simple to uderstand. The first layer is the upload service. This service is responsible for the followig tasks:

The order of the actions is as follows:

1. Get the github repo URL from the cliet
2. Clone the repo locally into the server
3. Generate a unique id for the deployment
4. Pushig the ID to SQS for better scalality
5. Upload the files to S3 or R2


The second layer is the deployment service. This service is responsible for building and deploying files to a sudomain. 
The tasks of this service are as follows:

1. getting the unique id from SQS
2. downloading the files from S3 or R2
3. Running build commands on the files
4. pushing the final assets(HTML, CSS, and JS) to S3
5. Tagging the project as completed

The third layer is the request-handler service. This service is responsible for handling requests and serving assets(HTML, CSS. and JS). 
This service is resposile for the followig tasks:

1. getting the request from the client
2. Parsing, validating, and extracting ID from the request
3. serving the assets(HTML, CSS, and JS) to the client from REDIS caching layer or from S3 / R2

## Tech stack used
| Technology | Usage |
| ---------- | ----- |
| Node.js with express |  for the backend services |
| React.js with vite |  for the Client side |
| Typescript | development |
| AWS sdk and cloudflare R2 | for blob storage |
| Github actions | for CI/CD pipeline of security, linting and building |
| AWS SQS | hosted queue |
| Redis client | local queue and cache |
| Docker | for future versions |
| ... | ... |

## Getting Started

### Prerequisites

- Node.js
- Yarn / pnpm/ npm
- Redis client

### Installation

```bash
git clone https://github.com/dawitel/vercel-clone.git

```bash
cd /in-to-each-service

yarn install
```

### Running the app

```bash
yarn dev
```

### Test

```bash
yarn test
```

### Lint

```bash
yarn lint
```

### Format

```bash
yarn format
```

### Deployment

```bash
yarn deploy
```

## Bug fixes are accepted via PRs 

[MIT licensed](LICENSE).


