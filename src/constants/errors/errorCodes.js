const authUserErrors = {
    NAME_TOO_SHORT: 'NAME_TOO_SHORT',
    NAME_TOO_LONG: 'NAME_TOO_LONG',
    INVALID_NAME: 'INVALID_NAME',
    SURNAME_TOO_SHORT: 'SURNAME_TOO_SHORT',
    SURNAME_TOO_LONG: 'SURNAME_TOO_LONG',
    INVALID_SURNAME: 'INVALID_SURNAME',
    EMAIL_NOT_VALID: 'EMAIL_NOT_VALID',
    EMAIL_ALREADY_IN_USE: 'EMAIL_ALREADY_IN_USE',
    PASSWORD_INVALID_LENGTH: 'PASSWORD_INVALID_LENGTH',
    PASSWORD_NOT_VALID: 'PASSWORD_NOT_VALID',
    CONFIRM_PASSWORD_NOT_VALID: 'CONFIRM_PASSWORD_NOT_VALID',
    CONFIRM_PASSWORD_INVALID_LENGTH: 'CONFIRM_PASSWORD_INVALID_LENGTH',
    PASSWORDS_DO_NOT_MATCH: 'PASSWORDS_DO_NOT_MATCH',
    INVALID_PHONE_NUMBER: 'INVALID_PHONE_NUMBER',
    EMAIL_NOT_REGISTRATED: 'EMAIL_NOT_REGISTRATED',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    ERROR_WHILE_CREATING_USER: 'ERROR_WHILE_CREATING_USER',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    YOU_DO_NOT_HAVE_PERMISSIONS_TO_ACCESS_THIS_SECTION: 'YOU_DO_NOT_HAVE_PERMISSIONS_TO_ACCESS_THIS_SECTION',
    ERROR_IN_USER_VERIFICATION: 'ERROR_IN_USER_VERIFICATION',
    PLEASE_LOGIN: 'PLEASE_LOGIN',
    INVALID_USER_ID: 'INVALID_USER_ID',
    INVALID_USER_ROLE: 'INVALID_USER_ROLE',
    TOKEN_HAS_EXPIRED: 'TOKEN_HAS_EXPIRED',
    UNKNKNOWN_ERROR_WHILE_VERIFYING_TOKEN: 'UNKNKNOWN_ERROR_WHILE_VERIFYING_TOKEN',
    ADMIN_ACCESS_ONLY: 'ADMIN_ACCESS_ONLY',
    UNKNOWN_ERROR_WHILE_VERIFYING_TOKEN: 'UNKNOWN_ERROR_WHILE_VERIFYING_TOKEN',
    INVALID_TOKEN_WE_HAVE_SENT_YOU_AN_EMAIL_WITH_NEW_CREDENTIALS: 'INVALID_TOKEN_WE_HAVE_SENT_YOU_AN_EMAIL_WITH_NEW_CREDENTIALS',
    INVALID_CREDENTIALS_PLEASE_TRY_AGAIN_LATER_OR_CONTACT_US: 'INVALID_CREDENTIALS_PLEASE_TRY_AGAIN_LATER_OR_CONTACT_US',
    YOUR_TOKEN_HAS_EXPIRED_WE_HAVE_SENT_YOU_AN_EMAIL_WITH_NEW_CREDENTIALS: 'YOUR_TOKEN_HAS_EXPIRED_WE_HAVE_SENT_YOU_AN_EMAIL_WITH_NEW_CREDENTIALS',
    UNKNKNOWN_ERROR_WHILE_VERIFYING_TOKEN_WE_HAVE_SENT_YOU_AN_EMAIL_WITH_NEW_CREDENTIALS: 'UNKNKNOWN_ERROR_WHILE_VERIFYING_TOKEN_WE_HAVE_SENT_YOU_AN_EMAIL_WITH_NEW_CREDENTIALS'
}

const commonErrors = {
    SERVER_ERROR_OCCURRED: 'SERVER_ERROR_OCCURRED'
}

const emailErrors = {
    FAILED_TO_SEND_EMAIL: 'FAILED_TO_SEND_EMAIL',
    SERVER_ERROR_WHILE_SENDING_EMAIL: 'SERVER_ERROR_WHILE_SENDING_EMAIL'
}

const tasksErrors = {
    INVALID_TITLE: 'INVALID_TITLE',
    TITLE_TOO_SHORT: 'TITLE_TOO_SHORT',
    TITLE_TOO_LONG: 'TITLE_TOO_LONG',
    INVALID_DESCRIPTION: 'INVALID_DESCRIPTION',
    DESCRIPTION_TOO_SHORT: 'DESCRIPTION_TOO_SHORT',
    DESCRIPTION_TOO_LONG: 'DESCRIPTION_TOO_LONG',
    AN_ERROR_OCURRED_WHILE_CREATING_TASK: 'AN_ERROR_OCURRED_WHILE_CREATING_TASK'
}

const imageErrors = {
    INVALID_IMAGE: 'INVALID_IMAGE',
    INVALID_IMAGE_FORMAT: 'INVALID_IMAGE_FORMAT',
    IMAGE_TOO_BIG: 'IMAGE_TOO_BIG',
    MAXIMUM_SIZE_ALLOWED_5_MB: 'MAXIMUM_SIZE_ALLOWED_5_MB',
    ERROR_LOADING_THE_IMAGE: 'ERROR_LOADING_THE_IMAGE',
    AN_ERROR_OCURRED_WHILE_CREATING_TASK: 'AN_ERROR_OCURRED_WHILE_CREATING_TASK'
}

const adminErrors = {
    ERROR_WHILE_GETTING_USERS: 'ERROR_WHILE_GETTING_USERS',
    INVALID_USER_ROLE_TO_CHANGE: 'INVALID_USER_ROLE_TO_CHANGE',
    ERROR_WHILE_GETTING_PENDING_TASKS: 'ERROR_WHILE_GETTING_PENDING_TASKS'
}

const errorCodes = {
    authUserErrors,
    commonErrors,
    emailErrors,
    tasksErrors,
    imageErrors,
    adminErrors
}

export default errorCodes