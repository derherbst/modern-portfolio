'use strict';

module.exports = function(grunt) {
  
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-tinyimg");
  
  grunt.initConfig({
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9'] 
      },
      my_target: {
        src: 'css/style.css',
        dest: 'css/style.css'
      }
    },
    
    less: {
      style: {
        files: {
          "css/style.css": "less/style.less"
        }
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: [
            "*.html",
            "css/*.css"
          ]
        },
        options: {
          server: ".",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "autoprefixer"],
        options: {
          spawn: false
        }
      }
    },
    
    tinyimg: {
      static: {
        files: { 
          'tmp/img.png': 'img/img.png',
          'tmp/img.jpg': 'img/img.jpg',
          'tmp/img.svg': 'img/img.svg'
        }
      },
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/', 
          src: ['**/*.{png,jpg,svg}'],
          dest: 'tmp/'
        }]
      }
    }
  });
  
  grunt.registerTask("default", ["less", "browserSync", "watch", "autoprefixer"]);
  
};