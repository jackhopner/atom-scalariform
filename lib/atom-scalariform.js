var exec = require('child_process').exec;
var javaPath = '/usr/bin/java';

var packagePath = function() {
  return atom.packages.getLoadedPackage('atom-scalariform').path;
}

var projectPath = function(fileToFormatPath) {
  var ref = atom.project.getDirectories();
  for (var i = 0, len = ref.length; i < len; i++) {
    var directory = ref[i];
    if (fileToFormatPath.indexOf(directory.path) === 0) {
            return directory.path + '/';
      }
  }

  return '';
}

module.exports = {

  activate: function() {
    'use strict';
    return atom.commands.add(
      'atom-workspace', 'atom-scalariform:format',
      this.format
    );
  },

  config: function() {
    'use strict';
    return {
      propertiesFile: {
        type: 'string'
      }
    }
  },

  format: function() {
    'use strict';
    var config = atom.config.get('atom-scalariform');
    config = typeof(config) !== 'undefined' ? config :  {
      propertiesFile: packagePath() + '/properties/default.properties'
    };
    var execution;
    var fileToFormatPath;
    var scalariformPropertiesFile;
    var scalariformPropertiesFilePath;
    var activeTextEditor = atom.workspace.getActiveTextEditor();
    var scalariformJarPath = packagePath() + '/deps/scalariform.jar';
    if (activeTextEditor === '' ||
      !(activeTextEditor.getPath().endsWith(".scala") || activeTextEditor.getPath().endsWith(".sc"))) {
      atom.notifications.addError(
        "You do not have a valid scala file open!");
    } else {
      fileToFormatPath = activeTextEditor.getPath();
      scalariformPropertiesFile = config.propertiesFile;
      scalariformPropertiesFilePath = scalariformPropertiesFile && scalariformPropertiesFile.startsWith("/") ? '' : projectPath(fileToFormatPath);

      execution = exec(
        javaPath + ' -jar ' + scalariformJarPath + ' -p="' +
        scalariformPropertiesFilePath + scalariformPropertiesFile + '" "' + fileToFormatPath + '"',
        function(error, stdout, stderr) {
          if (error) {
            atom.notifications.addError("Unable to format file: " + error);
          } else {
            atom.notifications.addSuccess("Formatted scala file!");
          }
        }
      );
    }
  }
};
