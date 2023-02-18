import jwt from 'jsonwebtoken'

const auth = async(req,res,next)=>{
    try {
        if(req.headers.authorization){ // in headers so many key are inserted but we chooese only authorization
            let token = req.headers.authorization;
            // token = token.split(' ')[1]
            let decodeToken = jwt.verify(token,'secretkey')
            if(decodeToken){
                next();
            }else{
                res.status(401).json({
                    message:'Invalid token'
                })
            }
        }else{
            res.status(401).json({
                message:'Invalid token 2'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export default auth;