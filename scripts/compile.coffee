glob = require("glob")
sushiCompiler = require '../lib/sushi-compiler.coffee'

glob "public/sushi/**/*.md", (e, files) =>
  sushiCompiler
    files: files
    outputFolder: "output-sushi/"
  , () ->
    process.exit()
