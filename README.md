<div align="center">
  <h1>Hago</h1>
  <p>A minimal Hugo theme..</p>
  <img alt="GitHub All Releases" src="https://img.shields.io/github/downloads/gyuha/hago/total">
  <img alt="GitHub" src="https://img.shields.io/github/license/gyuha/hago">
  <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/gyuha/hago">
  <img alt="GitHub stars" src="https://img.shields.io/github/stars/gyuha/hago?style=social">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/gyuha/hago?style=social">
  <img alt="GitHub forks" src="https://img.shields.io/github/watchers/gyuha/hago?style=social">
</div>


## Screenshot
![](https://raw.githubusercontent.com/gyuha/hago/master/images/screenshot.png)


## Feature
- Responsive web
- Tags Page
- Categories Page
- Google Analytics
- Comments
- jQuery 2.2.4
- Bootstrap 4.4.1
- Awsome Font 5.8.2

## Installation & Update
### Install
```bash
mkdir themes
cd themes
git submodule add https://github.com/gyuha/hago.git hago
```

### Update
```bash
git submodule update --remote --merge
```


## Usage
1. Make sure you follow the template structure of the examplesite (including the config.toml)

`config.toml` example

```toml
baseURL = "https://YOUR_NAME.github.io/"
languageCode = "en-US"
title = "YOUR_TITLE"
theme = "hago"

DefaultContentLanguage = "en"
metaDataFormat = "yaml"
disqusShortname = "YOUR_DISQUS_SHORT_NAME"
googleAnalytics = "UA-XXXXXXXXX-X"
paginate = 4


[Params]
  description = "DESCRIPTION"
  subtitle = "YOUR_SUB_TITLE"
  logo = "/images/logo.png"
  favicon = "/favicon.ico"
  comments = true

[Author]
  name = "YOUR_NAME"
  website = "https://YOUR_NAME.github.io"

```


## License
[MIT](https://raw.githubusercontent.com/gyuha/hago/master/LICENSE)

