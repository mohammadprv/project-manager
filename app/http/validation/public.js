const { param } = require("express-validator")

function mongoIDValidator() {

    return [
        param("id").isMongoId().withMessage("شناسه پروژه صحیح نمیباشد")
    ]

}

module.exports = {
    mongoIDValidator
}