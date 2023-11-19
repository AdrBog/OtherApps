/***

  Pops
  Copyright (C) 2023 Adrian Bogdan

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.

***/

class Pops {
    /**
     * Pops allows you to create simple and highly customizable pop-up messages.
     * @param {*} theme 
     */
    constructor(theme = "pops-themes-default") {
        this.DEFAULT_POPS_THEME = theme;
        this.body = document.body;
    }

    /**
     * Display a complex pop-up window in which the user can insert many types of data.
     * @param {*} elements 
     * @param {*} theme Optional. A class name to apply a custom theme to your pop-up.
     * @returns
     */
    custom(elements = [], theme = this.DEFAULT_POPS_THEME){
        const div = document.createElement("div");

        for (const i of elements) {
            let input;
            input = document.createElement(i["Element"]);

            if (i["InnerText"])
                input.innerText = i["InnerText"];
            else if (i["InnerHTML"])
                input.innerHTML = i["InnerHTML"];

            if (!i["Attributes"])   i["Attributes"] = {};
            if (!i["Element"])      i["Element"] = "p";
            
            

            for (const [attribute, value] of Object.entries(i["Attributes"])) 
                input.setAttribute(attribute, value);

            div.append(input);
        }

        div.classList.add("pops-body", theme);
        this.body.appendChild(div);

        return new Promise(
            (resolve) => {
                for (const button of div.querySelectorAll("[return]")) {
                    button.addEventListener("click", (e) => {
                        const r = {};
                        
                        for (const input of div.querySelectorAll("input, select, textarea"))
                            r[input.getAttribute("Property")] = input.value;

                        div.remove();
                        resolve({
                            "Return": e.target.getAttribute("Return"),
                            "Properties": r
                        });
                    })
                }
            }
        )
    }

    /**
     * Display a prompt in the website.
     * @param {*} message Optional. The text to display in the alert box.
     * @param {*} type Optional. Type of input. For example: text, number, password, email ...
     * @param {*} _default Optional. Default value to display in the input.
     * @param {*} acceptText Optional. The text that appears on the Accept button.
     * @param {*} cancelText Optional. The text that appears on the Cancel button.
     * @param {*} theme Optional. A class name to apply a custom theme to your pop-up.
     * @returns The value entered by the user.
     */
    async prompt(message = "", type = "text", _default = "", acceptText = "OK", cancelText = "Cancel", theme = this.DEFAULT_POPS_THEME) {
        const data = await this.custom(
            [
                {
                    "Element": "p",
                    "InnerText": message
                },
                {
                    "Element": "input",
                    "Attributes": {
                        "Type": type,
                        "Property": "Prompt",
                        "Value": _default
                    }
                },
                {
                    "Element": "button",
                    "InnerText": acceptText,
                    "Attributes": {
                        "Class": "primary",
                        "Return": 0
                    }
                },
                {
                    "Element": "button",
                    "InnerText": cancelText,
                    "Attributes": {
                        "Return": 1
                    }
                },
            ],
            theme
        )
        return (data["Return"] == 0) ? data["Properties"]["Prompt"] : null;
    }



    /**
     * Display a multi-button option on the website
     * @param {*} message Optional. The text to display in the alert box.
     * @param {*} options Optional. A string array for the buttons
     * @param {*} theme Optional. A class name to apply a custom theme to your pop-up.
     * @returns The index of the button you pressed (starting at 0)
     */
    async choice(message = "", options = [], theme = this.DEFAULT_POPS_THEME) {
        let elements = [];

        elements.push({
            "Element": "p",
            "InnerText": message
        });

        for (const [i, button] of options.entries()) {
            const _class = (i == 0) ? "primary" : "secondary";
            elements.push({
                "Element": "button",
                "InnerText": button,
                "Attributes": {
                    "Return": i,
                    "Class": _class
                }
            });
        }

        const data = await this.custom(
            elements,
            theme
        )
        return parseInt(data["Return"]);
    }

    /**
     * Display a confirmation dialog box on the website.
     * @param {*} message Optional. The text to display in the alert box.
     * @param {*} acceptText Optional. The text that appears on the Accept button.
     * @param {*} cancelText Optional. The text that appears on the Cancel button.
     * @param {*} theme Optional. A class name to apply a custom theme to your pop-up.
     * @returns True if the user press the Accept button or false if the user press the Cancel button.
     */
    async confirm(message = "", acceptText = "OK", cancelText = "Cancel", theme = this.DEFAULT_POPS_THEME) {
        return (await this.choice(message, [acceptText, cancelText], theme) == 0) ? true : false;
    }

    /**
     * Display a message on the website.
     * @param {*} message Optional. The text to display in the alert box.
     * @param {*} acceptText Optional. The text that appears on the Accept button.
     * @param {*} theme Optional. A class name to apply a custom theme to your pop-up.
     * @returns
     */
    async alert(message = "", acceptText = "OK",  theme = this.DEFAULT_POPS_THEME) {
        return await this.choice(message, [acceptText], theme);
    }

    /**
     * Display the Other Apps about window. OTHER APPS EXCLUSIVE
     */
    async about(version){
        await this.custom([
            {
                "Element": "p",
                "InnerText": "About version " + version
            },
            {
                "Element": "button",
                "InnerText": "X",
                "Attributes": {
                    "Return": 0,
                    "Style": "position: absolute; top: 0; right: 0; min-width: 20px;"
                }
            },
            {
                "Element": "iframe",
                "Attributes": {
                    "Src": "/static/about/about.html",
                    "Style": "width: 600px; margin-top: 12px; height: 500px;",
                    "Frameborder": "0"
                }
            }
        ])
    }


    /**
     * Display the config window for the app. OTHER APPS EXCLUSIVE
     * @param {*} config 
     * @param {*} screens 
     * @returns 
     */
    async compConfig(config, screens){
        const select = document.createElement("select");

        for (const screen of screens) {
            const option = document.createElement("option");
            if (config["defaultscreen"] == screen)
                option.setAttribute("selected", true);
            option.setAttribute("value", screen);
            option.innerText = screen;
            select.appendChild(option);
        }
        
        return await this.custom([
            {
                "Element": "span",
                "InnerText": "Settings\n",
                "Attributes":{
                    "Style": "font-size:20px;"
                }
            },
            {"Element": "br"},
            {
                "Element" : "Label",
                "InnerText": "Display Name:"
            },
            {
                "Element" : "Input",
                "Attributes": {
                    "Property": "displayname",
                    "Value": config["displayname"]
                }
            },
            {"Element": "hr"},
            {
                "Element" : "Label",
                "InnerText": "Screen Size (W/H):"
            },
            {
                "Element": "div",
                "InnerHTML": "" +
                    "<input type='number' property='width' value='" + config["width"] + "'/>" + 
                    "<span style='margin: 0px 16px 0px 16px;'> x </span>" + 
                    "<input type='number' property='height' value='" + config["height"] + "'/>"
            },
            {"Element": "hr"},
            {
                "Element" : "Label",
                "InnerText": "Default screen:"
            },
            {
                "Element" : "Select",
                "InnerHTML": select.innerHTML,
                "Attributes": {
                    "Property": "defaultscreen"
                }
            },
            {
                "Element": "button",
                "InnerText": "Save changes",
                "Attributes":{
                    "Return": 0,
                    "Class": "primary"
                }
            },
            {
                "Element": "button",
                "InnerText": "Discard changes",
                "Attributes":{
                    "Return": 1
                }
            }
        ])
    }
}