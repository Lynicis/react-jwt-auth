const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports =  (req,res,next)=>{
	let token = req.headers["x-access-token"] || req.headers["authorization"];
	if (token !=undefined && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
	if(!token){
		return res.json({
			success: false,
			message: 'auth token is not valid'
		})
	}else{
		jwt.verify(token, process.env.SECRET_KEY, (err,decoded)=>{
			if(err){
				return res.json({
					success: false,
					message: 'token is not valid'
				})
			} else {
				req.decoded = decoded;
				next();
			}
		})
	}
};
