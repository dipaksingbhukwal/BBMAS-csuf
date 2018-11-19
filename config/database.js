if(process.env.NODE_ENV === 'production'){
console.log(process.NODE_ENV);
  console.log('production');
  module.exports = {mongoURI: 'mongodb://crud:abcd1234@ds157853.mlab.com:57853/vidjot-csuf-prod'}
} else {
  console.log('dev');
  module.exports = {mongoURI: 'mongodb://localhost/bbmas-dev'}
}
