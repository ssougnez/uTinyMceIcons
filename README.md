# Introduction

uTinyMce installs a tinymce plugin allowing editors to insert font awesome 4.2 icons in Umbraco rich text editor.

# Installation

You can install this plugin via NuGet using the command

```
Install-Package AreaProg.uTinyMceIcons
```

Once the package is installed, you need to update your RTE data type to add the uTinyMceIcons toolbar icon.

![image](https://i.imgur.com/3D1Jawz.png)

Now you have access to a new icon in the RTE:

![image](https://i.imgur.com/WHwIaJ1.png)

Cliking this icon makes the following Umbraco side panel to appear:

![image](https://i.imgur.com/wk81e3R.png)

In this screen, you can select the icon you want to insert along with some options. 
The result is directly shown in the RTE.

![image](https://i.imgur.com/OSinCw7.png)

If you want to change the icon, you don't need to delete it and insert it again, you can just click on it and click the toolbar icon to re-open the Umbraco side panel.

Of course, if you want this icon to appear, you need to reference font awesome 4.2 in the master page (or the template) of your site. Indeed, FA is automatically inserted by Umbraco in the back-office but not in the final site.

# Features

* Add a button in the tinymce toolbar to add a font awesome icon.
* Search for the icon to insert in a list.
* Add the icon with a fixed width.
* Support for the aria-hidden attribute.
* Change the size of the icon.
* Add a spinning animation to the icon.
* An inserted icon can be edited afterwards.
* Clean uninstall (although I hope you won't need it :-))

# Planner features

* Umbraco 7.13 ships with font awesome 4.7, so this plugin will be updated to take the new icons into account as soon as Umbraco 7.13 is released.

# Compatibility

Even though this plugin has been developed with Umbraco 7.12, it is usable from the version 7.5.0 (with some quirks). 
This plugin has been tested with Umbraco 7.2.0 and it was not supported.
Version 7.3.0 and 7.4.0 haven't been tested but they are not officially supported (it does not mean that it won't work).

# Troubleshoot

## I don't see the icon in the toolbar

The icon doesn't magically appear, your RTE datatype must be edited to allow the uTinyMceIcon button to appear. See Umbraco documentation to learn how to do so.

## I can't select an icon in the RTE using Umbraco < 7.12

If you can't select an icon in the RTE by clicking on it, you should be able to do so by double-clicking on it. If the caret disappears, then it means that the icon is selected and you can click the toolbar item to edit the icon.

## It does not work correctly

uTinyMceIcons depends on the "noneditable" plugin to work as expected. If you didn't configure this plugin, it should be configured automatically during the installation, however, if you already configured it, you might need to perform a manual action to make uTinyMceIcons behave as expect.

* Open the file config/tinyMceConfig.config
* Locate a custom config called "noneditable_noneditable_class"
* This config contains a space separated list of class names made non editable by the plugin. Ensure that the class "fa" is included.

The whole configuration added in this file is the following:

* tinymceConfig/commands

```
<command>
  <umbracoAlias>uTinyMceIcons</umbracoAlias>
  <icon>images/editor/flag.gif</icon>
  <name>Icon</name>
  <tinyMceCommand value="" userInterface="false" frontendCommand="uTinyMceIcons">uTinyMceIcons</tinyMceCommand>
  <priority>100</priority>
</command>
```

* tinymceConfig/plugins

```
<plugin loadOnFrontend="true">noneditable</plugin>
<plugin loadOnFrontend="true">uTinyMceIcons</plugin>
```

* tinymceConfig/customConfig

```
<config key="noneditable_noneditable_class">fa</config>
```

## I have another issue

If you have another issue preventing uTinyMceIcons to work correctly, please post [a new issue](https://github.com/ssougnez/uTinyMceIcons/issues).