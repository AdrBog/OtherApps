<div align="center">
  <img src="./res/logo.svg">
</div>

# Other Apps

[![GPL v3](https://img.shields.io/badge/License-GNU%20v3-blue)](https://www.gnu.org/licenses/gpl-3.0.en.html)

Lightweight Free and Open Source alternative to Microsoft's Power Apps written in Python and Flask.

Other Apps works with Javascript and HTML (Instead of that strange language that Power Apps uses), this allows you to do everything you could do in javascript, without limitations.

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
-   [ ] Documentation (Coming soon)


## Screenshots

| App Editor                                                                                   | Code Editor                                                                                  | Gallery inside app                                                                            |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| ![Screenshot 1](https://raw.githubusercontent.com/OtherExit/OtherApps/main/res/sample01.png) | ![Screenshot 2](https://raw.githubusercontent.com/OtherExit/OtherApps/main/res/sample02.png) | ![Screenshot 3](https://raw.githubusercontent.com/OtherExit/OtherApps/main/res/sample03.png) |

## Themes

| Light theme                                                                                  | Dark theme                                                                                   |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| ![Screenshot 4](https://raw.githubusercontent.com/OtherExit/OtherApps/main/res/sample04.png) | ![Screenshot 5](https://raw.githubusercontent.com/OtherExit/OtherApps/main/res/sample05.png) |

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
If you need help, you can read the (incomplete) documentation or see the [examples](https://github.com/OtherExit/OtherApps-Examples)
