module.exports = function(grunt) {
  require('load-grunt-config')(grunt, {
  	data: {
  	  dir: {
        modules: {
          base: 'node_modules',
          skeletoncss: '<%= dir.modules.base %>/skeleton-sass'
        },
        public: {
          base: 'public',
          css: '<%= dir.public.base %>/css'
        },
        sass: {
          base: 'sass'
        }
  	  }
  	}
  });
};