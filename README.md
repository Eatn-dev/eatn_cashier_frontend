# Cashier frontend

--- 

Single page application built in SvelteKit to manage establishment's parts that are a part of the cashier's responsibility

- [Cashier frontend](#cashier-frontend)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Getting up and running](#getting-up-and-running)
      - [Environment variables](#environment-variables)
      - [Build](#build)
  - [Testing](#testing)
  - [Contributing](#contributing)
    - [Built with](#built-with)
    - [Code style](#code-style)
    - [License](#license)


## Getting started

### Prerequisites

Things you need for this website to work:

- [Node.js (18.x, 19.x) and npm](https://nodejs.org/)
- [Menu API](https://github.com/eatn-dev/eatn_menu_api)
- [Tables API](https://github.com/eatn-dev/eatn_tables_api)

### Getting up and running

This application is written in Node.js and is known to work in 18.x and 19.x versions. Other versions and distributions might probably run but are not guaranteed to work.

Firstly, clone the repo:

```sh
git clone git@github.com:eatn-dev/eatn_menu_api.git
```

After that, `cd` into the directory and install the dependencies:

```sh
npm install
```

#### Environment variables

This application consumes data served by Menu API and Tables API that sit behind a **GATEWAY/PROXY**. Therefore, you need to create a `.env` file in project root directory that contains gateway url.

```bash
# .env
GATEWAY_URL="http://eatn_proxy"
```

#### Build

If you are running this inside a Docker container, next step would be to build the image.

```sh
docker compose build --no-cache
```

For development, run the following command:

```sh
npm run start
```

If you want to build/compile/bundle the website, you can do that by doing:

```bash
npm run build
```

## Testing

This website is integration tested therefore integration with extrenally hosted APIs is guaranteed.

To run the tests and ensure the website behaves as intended, you can do that by running:

```
npm run test
```

## Contributing

If you find a bug or want to request a feature, don't hesistate to go to [issue](https://github.com/eatn-dev/eatn_menu_api/issues) page and open a ticket!

### Built with

 - [Javascript]() - Language used to build 99.999999% of today's software
- [SveleteKit](https://kit.svelte.dev/) - modern new-age web framework build on [Svelte](https://svelte.dev/) rendering library which boasts amazing performance and readability
- Vite
- 
### Code style

We use [eslint](https://eslint.org/) to enforce a coding style, so please follow it.

### License

This project is licensed under GNU AGPL v3. See the [LICESNSE](./LICENSE) for details.