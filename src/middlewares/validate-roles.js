
export const hasRoles = (...roles) => {
    return (re, res, next) => {
        try {
            if (!req.usuario) {
                return res.status(500).json({
                    succes: false,
                    mesage: "It is necessary to verify your token before continuing."
                })
            }
            if(!roles.includes(req.usuario.role)){
                return res.status(401).json({
                    succes: false,
                    message: `This service requires one of these roles: ${roles}`
                })
            }
        } catch (err) {

        }
    }
}