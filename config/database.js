if (process.env.NODE_ENV === 'production') {
  console.log('Connecting to Production database');
  module.exports = {mongoURI:process.env.MONGO_URI}
}else{
  console.log('Connecting to Development database');
  module.exports = {mongoURI: 'mongodb://localhost/bbmas-dev'}
}
