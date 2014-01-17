module.exports = function (grunt) {

  var readOptionalJSON = function (filepath) {
      var data = {};
      try {
        data = grunt.file.readJSON(filepath);
      } catch (e) {
      }
      return data;
    },
    srcHintOptions = readOptionalJSON('.jshintrc');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      build: {
        src: [ "src/sinonjs-hydrajs-testing-helper.js" ],
        options: srcHintOptions
      }
    },
    karma: {
      unit: {
        configFile: 'config/karma.conf.js'
      },
      amd_unit: {
        configFile: 'config/amd-karma.conf.js'
      }
    },
    compress: {
      build: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'versions/',
        src: ['sinonjs-hydrajs-testing-helper.min.js'],
        dest: 'versions/'
      }
    },
    copy: {
      build: {
        files: [
          {expand: true, cwd: 'src/', src: ['sinonjs-hydrajs-testing-helper.js'], dest: 'versions/'}
        ]
      }
    },
    uglify: {
      options: {
        sourceMap: 'versions/sinonjs-hydrajs-testing-helper.min.map',
        sourceMappingURL: "sinonjs-hydrajs-testing-helper.min.map",
        banner: '/*! sinonjs-hydrajs-testing-helper.js v<%= pkg.version %> | Date:<%= grunt.template.today("yyyy-mm-dd") %> |' +
          ' License: https://raw.github.com/HydraJS/sinonjs-hydrajs-testing-helper/master/LICENSE|' +
          ' (c) 2009, 2014\n' +
          '//@ sourceMappingURL=sinonjs-hydrajs-testing-helper.min.map\n' +
          '*/\n',
        preserveComments: "some",
        report: "min",
        beautify: {
          ascii_only: true
        },
        compress: {
          hoist_funs: false,
          join_vars: false,
          loops: false,
          unused: false
        },
        mangle: {
          // saves some bytes when gzipped
          except: [ "undefined" ]
        }
      },
      build: {
        files: {
          'versions/sinonjs-hydrajs-testing-helper.min.js': ['src/sinonjs-hydrajs-testing-helper.js']
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'karma', 'uglify', 'compress', 'copy']);

};