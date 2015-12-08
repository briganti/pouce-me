module.exports = function(grunt) {
  return {
    'sass': {
      'files': ['<%= dir.sass.base %>/**/*.scss'],
      'tasks': ['sass:dev'],
      'options': {
        'livereload': true
      }
    }
  };
}