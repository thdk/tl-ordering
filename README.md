# TL Ordering

A sample project to list orders.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```sh
npm install npm@latest -g
```

### Installing

1. Clone this repo
```sh
git clone https://github.com/thdk/tl-ordering.git
```

2. Step into the new repo directory

```sh
cd tl-ordering
```

3. Install dependencies

```sh
npm install
```

4. Build and run local development server
```sh
npm run start
```

## How to use

### Without a working API => Let's mock it!

To fake api calls made from the application, simply add `?debug` to the querystring.
Mocked api calls will be logged in the developer console of the browser.

### With a working API
By default the app will try use data served by an api.
The api base url can be set...

* ... during the build process:

```sh
process.env.apiUrl = 'https://api.example.com';
```

* ... or in `rollup.config.js`
```sh
 replace({
     'process.env.apiUrl': `'${process.env.apiUrl || "http://api.localhost"}'`
 }),
```

Note that the app is loaded with order data in it's initial state.
So only the placeOrder api call will called.

## Built With

* [react](https://reactjs.org/) - The web framework used
* [redux](https://rometools.github.io/rome/) - State management
* [typescript](https://www.typescriptlang.org/) - Javascript that scales
* [rollup](https://rollupjs.org) - Module bundler
* [npm](https://www.npmjs.com/) - Package manager

## Browser support notice

This has been developed without browser support in mind as it's not built for production but for educational reasons only.

## Authors

* **Thomas Dekiere** - *Initial work* - [thdk](https://github.com/thdk)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


