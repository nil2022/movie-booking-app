export const validateUserData = (req, res, next) => {
    const { fullName, email, password, userId } = req.body
    if (!fullName || !email || !password || !userId) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        })
    }
    next()
}