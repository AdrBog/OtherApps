<div align="center">
  <img src="./res/logo.svg">
</div>

# Other Apps

[![GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue)](https://www.gnu.org/licenses/gpl-3.0.en.html)

Lightweight Free and Open Source alternative to Microsoft's Power Apps written in Python and Flask.

## Why use Other Apps instead of Power Apps
0. **Other Apps is free and open source**, making it perfect for developers to customize the application to their own liking.
1. **Other Apps makes 0 connections to the internet**, this makes it more private and secure.
2. **Self-Hosting**
3. **Easy setup**, Other Apps works  with pure javascript. No npm, nodejs, jsquery, etc needed.

Disclaimer! Other Apps is still under development. And it is focused for small business/local networks. I do not recommend using it for large enterprises.

## Features

-   [x] No Ads
-   [x] No Tracking
-   [x] Lightweight
-   [x] No account needed
-   [x] SQLite databases
-   [x] Unlimited database size
-   [x] Unrestricted HTML embedding
-   [x] Themes
-   [x] Addons
-   [ ] Documentation (Coming soon)


## Screenshots

| App Editor | Code Editor | Gallery inside app |
| -- | -- | -- |
| ![Screenshot 1](https://raw.githubusercontent.com/AdrBog/OtherApps/main/res/sample01.png) | ![Screenshot 2](https://raw.githubusercontent.com/AdrBog/OtherApps/main/res/sample02.png) | ![Screenshot 3](https://raw.githubusercontent.com/AdrBog/OtherApps/main/res/sample03.png) |

| Database Manager | App Player | Editing form |
| -- | -- | -- |
| ![Screenshot 4](https://raw.githubusercontent.com/OtherExit/AdrBog/main/res/sample06.png) | ![Screenshot 5](https://raw.githubusercontent.com/AdrBog/OtherApps/main/res/sample07.png) | ![Screenshot 6](https://raw.githubusercontent.com/AdrBog/OtherApps/main/res/sample08.png) |

## Themes

| Light theme                                                                                  | Dark theme                                                                                   |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| ![Screenshot 4](https://raw.githubusercontent.com/AdrBog/OtherApps/main/res/sample04.png) | ![Screenshot 5](https://raw.githubusercontent.com/AdrBog/OtherApps/main/res/sample05.png) |

## Installation
You need to have Python with virtualenv and Git installed

```bash
  git clone https://github.com/OtherExit/OtherApps.git
  cd OtherApps
  python -m venv venv
  source venv/bin/activate
  pip install flask pyyaml
  python -m flask run
```

## Help
If you need help, you can read the (incomplete) documentation or see the [examples](https://github.com/AdrBog/OtherApps-Examples)

## The future of Other Apps
Personally I am very happy with the result, I use Other Apps in a non-ironic way to help my father with his projects. I'm going to try to separate the database manager from Other Apps and create a new project, maybe Other Lists.
