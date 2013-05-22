
/*
 * Count
 */

var count=0;
exports.getCount = function(req, res, next){
  	count++;
	console.log("visitas: " + count);
	next();
};



