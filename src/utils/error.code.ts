export const ErrorCodes={
    INCORRECT_PASSWORD:{
        CODE:"INCORRECT_PASSWORD",
        MESSAGE:"Incorrect Password"

    },
    UNAUTHORIZED:{
        CODE:"UNAUTHORIZED",
        MESSAGE:"You are not authorised to perform this action"
    },
    EMPLOYEE_WITH_ID_NOT_FOUND:{
        CODE:"EMPLOYEE_WITH_ID_NOT_FOUND",
        MESSAGE:"Employee with given ID not found"
    }
}

export type CustomError = typeof ErrorCodes[keyof typeof ErrorCodes];