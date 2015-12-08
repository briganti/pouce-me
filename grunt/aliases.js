module.exports = function(grunt) {
  return {
    'default': [
      'express:dev',
      'watch'
    ],
    'build': [
      'sass:dev'
    ]
  };
};