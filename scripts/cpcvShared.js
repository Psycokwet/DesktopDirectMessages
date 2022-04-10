var fs = require("fs");
var path = require("path");

// directory path
const sourceDir = path.join("main", "helpers", "shared");
const targetDir = path.join("renderer", "lib", "shared");

// delete directory recursively
try {
  fs.rmdirSync(targetDir, { recursive: true });

  console.log(`${targetDir} is deleted!`);
} catch (err) {
  console.error(`Error while deleting ${targetDir}.`);
}

copyFolderSync(sourceDir, targetDir);
console.log("shared class successfully installed");

function copyFileSync(source, target) {
  var targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderSync(source, target) {
  var files = [];

  // Check if folder needs to be created or integrated
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      copyFileSync(curSource, target);
    });
  }
}
