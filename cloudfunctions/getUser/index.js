// exports.main = async (event, context) => 
//   {
//   return event.a + event.b;
// }

exports.main = async (event, context) => ({
  sum: event.a + event.b
})