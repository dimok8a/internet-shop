import {useEffect, useState} from "react";

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function validatePhone(phone) {
    if (!phone.length)
        return true;
    const re = /^\d[\d\(\)\ -]{4,14}\d$/;
    return(re.test(phone));
}

export const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(false);
    const [isEmailError, setEmailError] = useState(false);
    const [isPhoneError, setPhoneError] = useState(false);
    const [isValid, setValid] = useState(false);
    useEffect(()=> {
        for (const validation in validations) {
            switch (validation) {
                case "isEmpty":
                    value.length ? setEmpty(false) : setEmpty(true);
                    break;
                case "isEmail":
                    validateEmail(value) ? setEmailError(false) : setEmailError(true);
                    break;
                case "isPhone":
                    validatePhone(value) ? setPhoneError(false) : setPhoneError(true);
                    break;
            }
        }
    }, [value])

    useEffect(()=>{
        if (isEmpty || isEmailError || isPhoneError)
            setValid(false);
        else
            setValid(true)
    }, [isEmpty, isEmailError, isPhoneError])


    return {
        isEmpty, isEmailError, isPhoneError, isValid
    }

}

