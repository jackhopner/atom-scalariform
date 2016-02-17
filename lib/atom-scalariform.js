var exec = require('child_process').exec;
var javaPath = '/usr/bin/java';

var packagePath = function() {
  return atom.packages.getLoadedPackage('atom-scalariform').path;
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
        type: 'string',
        default: packagePath() + '/properties/default.properties'
      }
    }
  },

  format: function() {
    'use strict';
    var execution;
    var fileToFormatPath;
    var activeTextEditor = atom.workspace.getActiveTextEditor();
    var scalariformJarPath = packagePath() + '/deps/scalariform.jar';

    if (activeTextEditor === '' ||
      !activeTextEditor.getPath().endsWith(".scala")) {
      atom.notifications.addError(
        "You do not have a valid scala file open!");
    } else {
      fileToFormatPath = activeTextEditor.getPath();
      execution = exec(
        javaPath + ' -jar ' + scalariformJarPath + ' -p="' + atom.config.get(
          'scalariform.propertiesFile'
        ) + '" "' + fileToFormatPath + '"',
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
