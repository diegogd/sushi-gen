module.exports = (grunt) ->
  harp = require 'harp'
  path = require 'path'

  grunt.registerMultiTask 'harp', 'A grunt task for either running a Harp server, or compile your site using harp.', ->

    defaults =
      async: true
      server: false
      port: 9000
      root: './'

    options = this.options defaults, this.data
    root = path.resolve options.root

    if options.async
      done = this.async()

    harp.server root, { port: options.port }, ->
      console.log 'Harp server running on port %d', options.port
