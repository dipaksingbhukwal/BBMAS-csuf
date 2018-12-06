if (process.env.NODE_ENV === 'production') {
  console.log('production');
  module.exports = {mongoURI:process.env.MONGO_URI}
}else{
  console.log('development');
  module.exports = {mongoURI: 'mongodb://localhost/bbmas-dev'}
}
