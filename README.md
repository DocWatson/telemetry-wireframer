# Telemetry Wireframer

Build HTML wireframes using [Gulp](http://gulpjs.com/), [Jade](http://jade-lang.com/), [Bootstrap](http://getbootstrap.com/) and [LESS](http://lesscss.org/) (with a dash of [FontAwesome](http://fortawesome.github.io/Font-Awesome/)).

## Requirements
1. [npm](http://npmjs.com)
2. [bower](http://bower.io)

## Installation

1. Clone the repository
2. Change to the `telemetry-wireframer` directory
3. Install application dependencies (Gulp, Jade) with `npm install`
4. Install frontend dependencies (Twitter Bootstrap, Fontawesome, BLOKKFont) with `bower install`

## Usage
The directory structure is mostly set up so you can get going quickly. [Gulp](http://gulpjs.com/) is already configured to compile and concatenate the Wireframer's LESS stylesheets and JavaScript files along with the installed `bower_components`.

### Output Directory
By default, the wireframe tool assumes its within another project directory, and will save things out to a `public_html/wireframes` directory that exists adjacent to (*not* within) the `telemetry-wireframer` directory. However, you can set this path to whatever you want by modifying the `outputPath` variable at the top of `gulpfile.js`.

The idea is to make it easy to preview files using, say, a local Vagrant webserver -- or at least make it easy to drop the files in a web-facing directory on a server.

### Jade Templates
Telemetry Wireframer uses the [Jade template language](http://jade-lang.com/). You will find some starter files within the `./templates` directory. Each page you wish to create should exist directly within `./templates`, but you will also see a `layouts/` and an 'includes/' directory. While you can add to and modify these things, the idea is to provide you with a pre-built tool box. Details follow:

##### Layouts
The files within `layouts/` are base-level templates which your pages can use via the [extends](http://jade-lang.com/reference/extends/) paradigm in the Jade language. The layouts will handle the page skeleton - things like the `<head>` or `<body>` tags, stylesheet inclusion, etc. This will allow you to focus on the pages you want to wireframe and ideally make things faster.

##### Includes (components)
These files make use of Jade's [mixins](http://jade-lang.com/reference/mixins/). These include prebuilt headers, buttons, forms, and so on. Each component typically has a `.less` file associated with it in `./assets/less/components`.

### Styles & Javascript
Telemetry Wireframer comes with scaffolded LESS and JavaScript files designed to get things going quickly.

##### LESS
For a general overview of the LESS structure, look at `app.less`. This file includes the other LESS files in the `./assets/less` directory in a cascading manner. There's an emphasis on modularization so you can only include the functionality you need.

* `_bootstrap.less` - contains references to the Bootstrap LESS files installed by bower. By default, the entirety of Bootstrap is included, but you can comment out or remove the pieces you don't need here, without having to modify the bower-installed files directly.
* `_variables.less` - exists so you can override Bootstrap's variables with your own
* `_fontawesome.less` - contains references to the Font-Awesome LESS files installed by bower. Like Bootstrap above, this allows you to remove the pieces of the library you ultimately don't need
* `_wireframe.less` - contains the default wireframing styles. This file references other LESS files in the `components` and `layouts` directories. The idea is to modularize functionality, much like the libraries mentioned above. You should not need to edit the files in these directories, and instead should use the `_overrides.less` file.
* `_overrides.less` - an empty file that exists so you can override any of the styles from any of the libraries above. Hopefully, you won't need to add too many overrides!

##### JavaScript
A base `app.js` file is included. This file sets up the so-called "[Garber-Irish Implementation](http://viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution)" of the DOM-ready execution pattern.

Bootstrap and has its own JavaScript files which depend on jQuery. Both of these libraries are compiled and minified along with `app.js` by Gulp.

## FAQ

### Why did/didn't you use X?
This was originally envisioned as a tool for use at my day job, where we use the Roots WordPress stack. Since it leverages Bootstrap and LESS already, those were natural choices for me.

However, I recognize things like Zurb's Foundation and SASS are very popular libraries, and I would love to support those technologies (and others) in future iterations of this tool.

### How do you use this thing?
I work in tandem with a designer. They give me a general idea of a layout - using a program like Sketch or Photoshop, or even a piece of paper - and then I work to translate it into an HTML wireframe. This lets us interact with the feel of the site in its intended environment: the web.

It also allows us to quickly flow between breakpoints using Bootstraps built-in paradigms so we can get a sense of how the design works from a very high level. It creates an excellent starting point from a design AND development standpoint and it helps us discover bottlenecks and problems sooner.

### Pull requests?
Of course! It wouldn't be on GitHub if I didn't want to get feedback and hear your ideas. I'd love pull requests to make this tool better. Feel free to notify me of issues and request features, but I can't guarantee any schedules or official road map.
