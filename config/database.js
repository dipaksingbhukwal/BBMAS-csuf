if(process.env.NODE_ENV === 'production'){
console.log(process.NODE_ENV);
  console.log('production');
  module.exports = {mongoURI: require('./database_prod').mongoURI}
} else {
  console.log('dev');
  module.exports = {mongoURI: 'mongodb://localhost/bbmas-dev'}
}
