export const protectRoutes = (req, res, next) => {
    //clerk is handling authentication
    if(!req.auth().isauthenticated()) {
        return res.status(401).json({message: "Unauthorized access"});
    }
    next();
}

