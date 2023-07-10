
# 1 - Installation

TIP: Before using OtherApps, you should have some knowledge on Python and Flask

## 1.1 - Installing packages
OtherApps works with Python and Flask.

First you need to make sure Python, Pip and Virtualenv are installed, you'll also need to install git if you want to clone the repo instead of downloading a zip.

With apt:
```bash
  sudo apt install python-pip git
```
With pacman:
```bash
  sudo pacman -S python-pip git
```
Virtualenv should come preinstalled with Python

We'll install Flask with pip later

## 1.2 - Installing OtherApps
You can obtain OtherApps's source code from the GitHub repo:
```bash
  git clone https://github.com/OtherExit/OtherApps.git
  cd OtherApps
```
Once you are inside the directory, you can create the virtual environment:
```bash
  python -m venv venv
```
A folder named venv should be created. Now you need to activate the virtual environment:
```bash
  source venv/bin/activate
```
You can check that it worked, looking at your shell prompt. If it starts with (venv), you are in the virtual environment.

Install Flask in your virtual environment:
```bash
  pip install flask
```
You have everything installed, now you can start OtherApps with the following command:
```bash
  python -m flask run
```
Open your web browser and enter "127.0.0.1:5000" to access OtherApps
                    
