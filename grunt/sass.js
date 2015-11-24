module.exports = function(grunt) {
  return {
  	'dev': {
  	  'files': {
  	  	'<%= dir.public.css %>/main.css': '<%= dir.sass.base %>/main.scss'
  	  },
      'options': {
      	'outputStyle' : 'nested',
        'includePaths': require('node-bourbon').with('<%= dir.modules.skeletoncss %>')
      }
  	}
  };
}