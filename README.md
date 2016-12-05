# atom-scalariform package

Allows formatting of [Scala](https://github.com/scala/scala) files using [scalariform](https://github.com/scala-ide/scalariform). It also supports [Ammonite](https://github.com/lihaoyi/Ammonite) scripts.

You can configure the `atom-scalariform` properties file to be used in your Atom config:
```
"atom-scalariform":
  propertiesFile: "/path/to/scalariform.properties"
```

If `propertiesFile` starts with `/` it is considered an absolute path, otherwise the `propertiesFile` path is considered relative to the about-to-format file's project folder.

## Relative properties file path
Assuming:
* the file to format is located at `/home/user/myProjects/myProject/src/main/scala/com/user/Test.scala`
* the Atom project folder is `myProject`
* and `propertiesFile` is defined as `scalariform.properties`

the `scalariform` properties file will be loaded from `/home/user/myProjects/myProject/scalariform.properties`.

If a project folder cannot be found, the plugin will try to load the `propertiesFile` as an absolute path.

## Usage
To format a .scala/.sc file, first save it then you can run the formatter by pressing:

```
ctrl-shift-s
```

Currently using scalariform 0.1.5 SNAPSHOT
