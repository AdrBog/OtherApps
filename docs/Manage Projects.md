# Manage projects

The path where Other Apps projects are stored lies in the PROJECTS_DIR constant.

```py
PROJECTS_DIR = "projects"
```

After installing Other Apps, by default this constant is equal to 
**"projects"**, it is a relative path, so we can conclude that the projects are stored in .\proyects

## Project structure

Suppose you create a new project called **Sample**.

What Other Apps will do is create a new structure inside of **proyects**

```txt
-PROJECTS_DIR
  └ Sample
    ├ 1.xml
    └ app.xsd 
```

- **1.xml** is an XML file where the configuration of the main application is stored, as well as the screens and the childrens.

- **app.xsd** is the XML validation file. (If you want to edit the validator for all the projects, edit the xsd found in **config/app.xsd**)

- In case you create a component, it will also appear here.

- When you test the app in the application editor, the **test.xml** file is generated.

Here is an example of a more extensive structure:
```txt
-PROJECTS_DIR
  └ Sample
    ├ 1.xml
    ├ test.xml
    ├ component1.xml
    ├ component2.xml
    └ app.xsd 
```

## Inside the XML

This is an example of an Other Apps XML app file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<App xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="app.xsd"
    DisplayName="My App" DefaultScreen="Screen0" Width="800" Height="480" OAVer="0.4.0">
    <Screen Name="Screen0" Style="background-color: rgb(255, 255, 255);" OnVisible="">
        <Children Type="Label" Name="Label1" Text="This is a label" X="64" Y="64" OnSelect="null" Style="" />
    </Screen>
    <Screen Name="Screen1" Style="background-color: rgb(255, 255, 255);" OnVisible="" />
</App>
```

- **\<App>** is the root of the file, its attributes are used to specify the application configuration:
  - **OAVer:** This attribute is used to specify the version of Other Apps that was used to create this app.
- Inside **\<App>** there can be **\<Screen>**, there must be at least 1. And inside **\<Screen>** there can be **\<Children>**, there may not be any **\<Children>** inside **\<Screen>**, which represents an empty screen.