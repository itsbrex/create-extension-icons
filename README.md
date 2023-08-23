# 🎨 dfx-cons

![dfx-icons](https://github.com/itsbrex/dfx-icons/assets/9772694/df68be57-063c-4b17-af3b-2b598373cead)

> 💡 **Note:** gif above shows local `yarn` usage. Use `npx` if you don't want to install this package locally.
## Overview
This package generates a set of uniform placeholder icons with size labels. It is designed to assist you in creating new Chrome/web extensions. The idea was inspired by an [old archived repository](https://github.com/jbrudvik/chrome-extension-icon-sizes) that stored pre-made image sizes. I turned the concept into a simple `npm` package that is modular and customizable.

## Requirements

- Node.js `16.2.0` to install globally (using `npx` is easier if you're using a new version of `node`.)
- `npm` or `yarn`

## Usage

- `npx dfx-icons` generates all sizes of the same color and outputs them to the assets/icons folder
- `npx dfx-icons --sizes 16 48 128 --random` generates only the specified sizes with random colors
  > You can also install globally with `npm i -g dfx-icons` and run `icons` from anywhere. Requires node 16.2.0 so `npx` method is recommended.

## Features

- Generates icons of various sizes
- Allows customization of icon sizes and colors
- Overlays the size of the icon on top of the icon to help with debugging

## Contributing

Contributions are welcome!

If you find any bugs or want to suggest new features, please feel free to contribute by submitting an [issue](https://github.com/itsbrex/dfx-icons/issues) or a [pull request](https://github.com/itsbrex/dfx-icons/pulls).

## Contributors ✨

([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/github/all-contributors/itsbrex/dfx-icons?color=ee8449&style=flat-square)](##Contributing)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org/) specification. Contributions of any kind welcome!

## License

Licensed under the MIT license. See the [LICENSE](./LICENSE) file for more information.

If you found this project interesting or helpful, please consider [sponsoring me](https://github.com/sponsors/itsbrex) or <a href="https://twitter.com/itsbrex">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
