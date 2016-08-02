module.exports =  ->

  @initConfig
    pkg: @file.readJSON 'package.json'
    bowercopy:
      sushi_env:
        options:
          destPrefix: "public/lib"
        files:
          'bootstrap': "bootstrap/dist/js/"
          'jquery': 'jquery/dist/'
          'highlight': 'highlightjs/'
          'lato/css': 'lato/css/'
          'lato/font': 'lato/font/'
          'league-gothic':'league-gothic/webfonts/'
    open:
      dev :
        path: 'http://localhost:9000/sushi/python/beginner/en/01',
        # app: 'Google Chrome'
    watch:
      stylesheet:
        files: ['**/*.less']
        options:
          livereload: true
      markdown:
        files: ['**/*.md']
        options:
          nospawn: true
          livereload: true
    harp:
      server:
        async: false # required to let watch to work
        root: 'public'
    sushirender:
      php1:
        files:
          'output/sushi-php/': ['./public/sushi/**/php/**/01.md']
      php:
        files:
          'output/sushi-php/': ['./public/sushi/**/php/**/*.md']
      python:
        files:
          'output/sushi-python/': ['./public/sushi/**/python/**/*.md']

  @task.loadTasks './tasks'
  @loadNpmTasks 'grunt-contrib-watch'
  @loadNpmTasks 'grunt-bowercopy'
  @loadNpmTasks 'grunt-open'

  @registerTask 'setup', ['bowercopy']
  @registerTask 'build', ['sushirender']
  @registerTask 'live', ['harp', 'open:dev', 'watch']
  @registerTask 'default', ['harp']
