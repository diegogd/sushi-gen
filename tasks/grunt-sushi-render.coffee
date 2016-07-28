sushiCompiler = require '../lib/sushi-compiler.coffee'

module.exports = (grunt) ->
  @registerMultiTask 'sushirender', 'Sushi render to pdf', ->
    options = @options()

    @files.forEach (f) =>
      # Ensure that wait for the generator to finish
      done = @async()

      sushiCompiler
        files: f.src
        outputFolder: f.dest
      , done
