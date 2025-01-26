const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  proxy: `localhost/${process.env.VITE_PROJECT_NAME}`,
  port: 8888,
  files: ['src/**/*.css', 'src/**/*.js', 'src/**/*.glsl', './*.php', 'template-parts/**/*.php'],
};