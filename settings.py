import configparser

CONFIG_DIR = "config"
CONFIG_FILE = "config.ini"
SETTINGS = {
    "libre_lists_host": {
        "default": "http://127.0.0.1:5001",
        "type": "text",
        "comment": '''Address of the server where Libre Lists is running''',
        "display": "Libre Lists Host",
    },
    "theme": {
        "default": "light",
        "type": "text",
        "comment": '''Color theme for Other Apps''',
        "display": "Theme",
        "options": [
            ("light", "Light"),
            ("dark", "Dark"),
            ("gruvbox", "Gruvbox"),
        ]
    }
}

config = configparser.ConfigParser()

def setDefaultSettings():
    config["Config"] = {}
    for key, value in SETTINGS.items():
        config.set("Config", key, value["default"])
    with open(f"{CONFIG_DIR}/{CONFIG_FILE}", "w") as file:
        config.write(file)