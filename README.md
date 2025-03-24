<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="assets/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">FireBot Shortcutter</h3>

  <p align="center">
    FireBot preset effects available (locally) via configurable quick action tiles in a web-app
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a quick tool I built for myself to execute FireBot effect preset lists from my phone using a grid of configurable buttons.

![HOME](docs/res/home.png)
![EXAMPLE DECK](docs/res/landscape_deck.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

You will need a node compatible js runtime. I do not package an executable for the release. Bun or Node (>22) should both work.

### Running

#### Using the release dist

1. Download [bun](https://bun.sh/) or [Node](https://nodejs.org/en/download) if you don't have either.
2. Download the latest dist from releases.
3. Configure the HOSTNAME and PORT in the ".env" file in the server folder.

| VAR                                             | DEF                                                             |
| ----------------------------------------------- | --------------------------------------------------------------- |
| FIREBOT_API_URL="http://localhost:7472/api/v1/" | Firebot api base url                                            |
| HOSTNAME="192.168.1.100"                        | IP address to bind to (you will access the app on this address) |
| PORT="3000"                                     | Port it will run on                                             |
| USE_SSL="true"                                  | Create self-signed certs (https is needed for screen wake lock) |
| APP_STORE_PATH="appdb.json"                     | Where to store your data                                        |

> Do not change NODE_ENV. The most important one to change is HOSTNAME to be the IP address of your pc on the local network to access it from your tablet/phone or whatever.

4. Start the app with `bun ./server/index.mjs` or `node --env-file=".env" ./server/index.mjs`

#### Using the repo

1. Clone this repo
2. Install [https://bun.sh/]
3. Install deps `bun i`
4. Create your .env according to the .env.example (put it in the root of the repo dir)
5. `bun run build` then `bun run start`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are welcome. Open a pull request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the GPLv3 License

<p align="right">(<a href="#readme-top">back to top</a>)</p>
