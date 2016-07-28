fs = require("fs")

NodePDF = require("nodepdf")
async = require("async")
c = require("colors")
ProgressBar = require "progress"

express = require("express")
harp = require("harp")
app = express()

port = 9080
webPrefix = "http://localhost:#{port}/"
outputFolder = "output-sushi/"
factor = 0.34
pWidth = 2480 * factor
pHeight = 3508 * factor
webpages = []

app.use(express.static(__dirname + "/../public"))
app.use(harp.mount(__dirname + "/../public"))

app.listen(port);

nodePDFproperties =
  viewportSize:
      width: pWidth
      height: pHeight
  paperSize:
      format: 'A4'
      width: pWidth
      height: pHeight
      orientation: 'portrait'
  zoomFactor: 1

module.exports = (options, fishcallback) ->
  console.log "Sushi Cards Renderer".red.underline.bold
  console.log ""

  files = options.files
  outputFolder = options.outputFolder || outputFolder

  console.log "Generating" + " #{files.length} ".green.bold + "sushi cards into " + "#{outputFolder}".blue + "...\n"

  bar = new ProgressBar('compiling [:bar] '+':percent'.red, { total: files.length, width: 20 });
  bar.tick 0

  async.eachLimit files, 3, (file, callback) ->
    url = webPrefix + file.replace("public/", "").replace(".md", "")
    pattern = /.*sushi\/(\w*)\/(\w*)\/(\w*)\/(\w*).md/.exec file
    outputfile = outputFolder + "#{pattern[4]}-#{pattern[1]}-#{pattern[2]}-#{pattern[3]}.pdf"

    pdf = new NodePDF url,
    outputfile, nodePDFproperties


    pdf.on "done", =>
      process.stdout.write "\r                          "
      console.log "\r ->".bold + " #{outputfile} ".italic.gray + "generated".green
      bar.tick()
      callback()
  , (err) ->
    console.log "\rClosing web server...\n"
    fishcallback()
