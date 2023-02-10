const { JsonWebTokenError } = require("jsonwebtoken");
const { route } = require("../routes/user.routes");

const login = async (req, res) => {
    try {
        const params = {
            email : req.body.email,
            password : md5(req.body.password),
        };

        const findUser = await user.findOne({ where : params});
        if(findUser == null){
            return res.status(404).json({
                message : "email or password doesn't match",
                err : error,
            });
        }
        console.log(findUser)

        let tokenPayload = {
            id_user: findUser.id_customer,
            email: findUser.email,
            role : findUser.role,
        };
        tokenPayload = JSON.stringify(tokenPayload);
        let token = await JsonWebTokenError.sign(tokenPayload, SECRET_KEY);

        return res.status(200).json({
            message : "Success login",
            data : {
                token: token,
                id_user : findUser.id_user,
                email : findUser.email,
                role : findUser.role,
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal error",
            err : err,
        });
    }
};

const addUser = async(req, res) => {
    try {
        const data = {
            user_name : req.body.user_name,
        }

        const {upload} = require("../utils/upload")
        const router = new express.Router()
        const auth = require("../auth/auth")

        router.post("/login", userController.login)
        router.post("/add", upload.single("photo"), userController.addUser)
        router.put("/update/:id_user", auth.authVerify, upload.single("photo"), userController.updateUser)
        router.delete("/delete/:id_user", auth.authVerify, userController.deleteUser)
        router.get("/", auth.authVerify, userController.deleteUser)
        router.get("/:id_user", auth.authVerify, userController.findOneUser)
    
    } catch {
        
    }
} 

module.exports = router;