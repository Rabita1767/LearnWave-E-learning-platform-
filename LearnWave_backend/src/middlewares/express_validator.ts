import { body, query, param } from "express-validator";
import mongoose from "mongoose";
const validator = {
    signUp: [
        body("fname")
            .exists()
            .withMessage("First Name is required")
            .bail()
            .isString()
            .withMessage("Name must be a string")
            .bail()
            .customSanitizer((value) => value.trim())
            .custom((value) => {
                if (/^[A-Za-z ]+$/.test(value)) {
                    return true;
                } else {
                    throw new Error("Name must contain only alphabets and spaces");
                }
            })
            .bail()
            .custom((value) => {
                if (value.length >= 1 && value.length <= 50) {
                    return true;
                } else {
                    throw new Error("Name must be between 1 and 50 characters");
                }
            }),
        body("lname")
            .exists()
            .withMessage("Last Name is required")
            .bail()
            .isString()
            .withMessage("Name must be a string")
            .bail()
            .customSanitizer((value) => value.trim())
            .custom((value) => {
                if (/^[A-Za-z ]+$/.test(value)) {
                    return true;
                } else {
                    throw new Error("Name must contain only alphabets and spaces");
                }
            })
            .bail()
            .custom((value) => {
                if (value.length >= 1 && value.length <= 50) {
                    return true;
                } else {
                    throw new Error("Name must be between 1 and 50 characters");
                }
            }),
        body("userName")
            .exists()
            .withMessage("UserName is required")
            .bail()
            .isString()
            .withMessage("UserName must be a string")
            .bail()
            .customSanitizer((value) => value.trim())
            .custom((value) => {
                if (/^[A-Za-z 0-9]+$/.test(value)) {
                    return true;
                } else {
                    throw new Error("UserName must contain only alphabets, spaces, and numeric digits (0-9)");
                }
            })
            .bail()
            .custom((value) => {
                if (value.length >= 1 && value.length <= 50) {
                    return true;
                } else {
                    throw new Error("UserName must be between 1 and 50 characters");
                }
            }),
        body("phoneNumber")
            .exists()
            .withMessage("Phone number must be provided")
            .bail()
            .isString()
            .withMessage("Phone number must be a string")
            .bail()
            .matches(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)
            .withMessage("Phone number must be in a valid format"),
        body('email')
            .exists()
            .withMessage('Email must be provided')
            .bail()
            .isEmail()
            .withMessage('Invalid Email Address')
            .bail()
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
            .withMessage('Email must be in a valid format')
            .bail()
            .isLength({ max: 254 }),
        body("password")
            .exists()
            .withMessage("Password must be provided")
            .bail()
            .isString()
            .withMessage("Password must be a string")
            .bail()
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minSymbols: 1,
                minNumbers: 1,
            })
            .withMessage(
                "Password must contain at least 8 characters with 1 lower case, 1 upper case, 1 number, 1 symbol"
            ),
        body("confirmPassword")
            .exists()
            .withMessage("Password must be provided")
            .bail()
            .isString()
            .withMessage("Password must be a string")
            .bail()
            .custom((value, { req }) => {
                if (value === req.body.password) {
                    return true;
                }
                throw new Error("Passwords do not match");
            })
    ],
    login: [
        body('email')
            .exists()
            .withMessage('Email must be provided')
            .bail()
            .isEmail()
            .withMessage('Invalid Email Address')
            .bail()
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
            .withMessage('Email must be in a valid format')
            .bail()
            .isLength({ max: 254 }),
        body("password")
            .exists()
            .withMessage("Password must be provided")
            .bail()
            .isString()
            .withMessage("Password must be a string")

    ],
    addAdmin:
        [
            body("fname")
                .exists()
                .withMessage("First Name is required")
                .bail()
                .isString()
                .withMessage("Name must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[A-Za-z ]+$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Name must contain only alphabets and spaces");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("Name must be between 1 and 50 characters");
                    }
                }),
            body("lname")
                .exists()
                .withMessage("Last Name is required")
                .bail()
                .isString()
                .withMessage("Name must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[A-Za-z ]+$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Name must contain only alphabets and spaces");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("Name must be between 1 and 50 characters");
                    }
                }),
            body("userName")
                .exists()
                .withMessage("UserName is required")
                .bail()
                .isString()
                .withMessage("UserName must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[A-Za-z 0-9]+$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("UserName must contain only alphabets, spaces, and numeric digits (0-9)");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("UserName must be between 1 and 50 characters");
                    }
                }),
            body("phoneNumber")
                .exists()
                .withMessage("Phone number must be provided")
                .bail()
                .isString()
                .withMessage("Phone number must be a string")
                .bail()
                .matches(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)
                .withMessage("Phone number must be in a valid format"),
            body('email')
                .exists()
                .withMessage('Email must be provided')
                .bail()
                .isEmail()
                .withMessage('Invalid Email Address')
                .bail()
                .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
                .withMessage('Email must be in a valid format')
                .bail()
                .isLength({ max: 254 }),
            body("password")
                .exists()
                .withMessage("Password must be provided")
                .bail()
                .isString()
                .withMessage("Password must be a string")
                .bail()
                .isStrongPassword({
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minSymbols: 1,
                    minNumbers: 1,
                })
                .withMessage(
                    "Password must contain at least 8 characters with 1 lower case, 1 upper case, 1 number, 1 symbol"
                ),

        ],
    addCourse:
        [
            body("title")
                .exists()
                .withMessage("Title is required")
                .bail()
                .isString()
                .withMessage("Title must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[a-zA-Z0-9\s.,'!-?]*$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Title must contain only alphabets, spaces, and numeric digits (0-9)");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("Title must be between 1 and 50 characters");
                    }
                }),

            body("description")
                .exists()
                .withMessage("Description is required")
                .bail()
                .isString()
                .withMessage("Description must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[a-zA-Z0-9\s.,'!-?]*$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Description must contain only alphabets, spaces, and numeric digits (0-9)");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 250) {
                        return true;
                    } else {
                        throw new Error("Title must be between 1 and 250 characters");
                    }
                }),
            body("category")
                .exists()
                .withMessage("Category is required")
                .bail()
                .isString()
                .withMessage("Category must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[a-zA-Z0-9\s.,'!-?]*$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Category must contain only alphabets, spaces, and numeric digits (0-9)");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("Category must be between 1 and 50 characters");
                    }
                }),


        ],
    addSection:
        [
            body("title")
                .exists()
                .withMessage("Title is required")
                .bail()
                .isString()
                .withMessage("Title must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[a-zA-Z0-9\s.,'!-?]*$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Title must contain only alphabets, spaces, and numeric digits (0-9)");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 250) {
                        return true;
                    } else {
                        throw new Error("Title must be between 1 and 250 characters");
                    }
                }),
            body("course_id")
                .exists()
                .withMessage("Title is required")
                .bail()
                .isString()
                .withMessage("Title must be a string")
                .bail()
                .custom((value) => {
                    if (mongoose.Types.ObjectId.isValid(value)) {
                        return true;
                    } else {
                        throw new Error('course_id must be a valid Mongoose ObjectId');
                    }
                })
        ],
    acceptCourse:
        [
            body("course_id")
                .exists()
                .withMessage("Course Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null")
        ],
    rejectCourse:
        [
            body("course_id")
                .exists()
                .withMessage("Course Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null")
        ],
    viewTransactionOfUser:
        [
            body("student_id")
                .exists()
                .withMessage("Student Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null")
        ],
    editStudentData:
        [
            body("student_id")
                .exists()
                .withMessage("Student Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body("fname")
                .optional()
                .bail()
                .isString()
                .withMessage("Name must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[A-Za-z ]+$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Name must contain only alphabets and spaces");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("Name must be between 1 and 50 characters");
                    }
                }),
            body("lname")
                .optional()
                .bail()
                .isString()
                .withMessage("Name must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[A-Za-z ]+$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Name must contain only alphabets and spaces");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("Name must be between 1 and 50 characters");
                    }
                }),
            body("userName")
                .optional()
                .bail()
                .isString()
                .withMessage("UserName must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[A-Za-z 0-9]+$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("UserName must contain only alphabets, spaces, and numeric digits (0-9)");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("UserName must be between 1 and 50 characters");
                    }
                }),
            body("phoneNumber")
                .optional()
                .bail()
                .isString()
                .withMessage("Phone number must be a string")
                .bail()
                .matches(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)
                .withMessage("Phone number must be in a valid format"),
            body('email')
                .optional()
                .bail()
                .isEmail()
                .withMessage('Invalid Email Address')
                .bail()
                .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
                .withMessage('Email must be in a valid format')
                .bail()
                .isLength({ max: 254 }),

        ],
    editTeacherData:
        [
            body("instructor_id")
                .exists()
                .withMessage("Instructor Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body("fname")
                .optional()
                .bail()
                .isString()
                .withMessage("Name must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[A-Za-z ]+$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Name must contain only alphabets and spaces");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("Name must be between 1 and 50 characters");
                    }
                }),
            body("lname")
                .optional()
                .bail()
                .isString()
                .withMessage("Name must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[A-Za-z ]+$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Name must contain only alphabets and spaces");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("Name must be between 1 and 50 characters");
                    }
                }),
            body("userName")
                .optional()
                .bail()
                .isString()
                .withMessage("UserName must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[A-Za-z 0-9]+$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("UserName must contain only alphabets, spaces, and numeric digits (0-9)");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("UserName must be between 1 and 50 characters");
                    }
                }),
            body("phoneNumber")
                .optional()
                .bail()
                .isString()
                .withMessage("Phone number must be a string")
                .bail()
                .matches(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)
                .withMessage("Phone number must be in a valid format"),
            body('email')
                .optional()
                .bail()
                .isEmail()
                .withMessage('Invalid Email Address')
                .bail()
                .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
                .withMessage('Email must be in a valid format')
                .bail()
                .isLength({ max: 254 }),

        ],
    deleteStudent:
        [
            body("student_id")
                .exists()
                .withMessage("Student Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
        ],
    deleteCourseAdmin:
        [
            body("course_id")
                .exists()
                .withMessage("Student Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
        ],
    submitAssignment:
        [
            body("assignment_id")
                .exists()
                .withMessage("Assignment Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body("section_id")
                .exists()
                .withMessage("Section Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body("course_id")
                .exists()
                .withMessage("Course Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body("answer")
                .exists()
                .withMessage("Answer is missing")
                .bail()
                .isString()
                .withMessage("Description must be a string")
        ],
    getAllSubmittedAssignment:
        [
            body("assignment_id")
                .exists()
                .withMessage("Assignment Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
        ],
    getOneAssignment:
        [
            body("assignment_id")
                .exists()
                .withMessage("Assignment Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body("student_id")
                .exists()
                .withMessage("Student Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
        ],
    checkAssignment:
        [
            body("assignment_id")
                .exists()
                .withMessage("Assignment Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body("student_id")
                .exists()
                .withMessage("Student Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body("score")
                .exists()
                .withMessage("Score is missing")
                .bail()
                .isNumeric()
                .withMessage("Score must be a number")
        ],
    addToCart:
        [
            body('course')
                .isArray()
                .withMessage('Course must be an array')
                .bail()
                .custom((value) => {
                    const hasInvalidCourses = value.map((course) => {
                        return (
                            typeof course !== 'object' ||
                            !course.hasOwnProperty('course_id')
                        );
                    }).some((invalid) => invalid);

                    if (hasInvalidCourses) {
                        throw new Error('Each Course must have a course_id field');
                    }

                    return true;
                })
        ],
    editProfile:
        [
            body("fname")
                .optional()
                .bail()
                .isString()
                .withMessage("Name must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[A-Za-z ]+$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Name must contain only alphabets and spaces");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("Name must be between 1 and 50 characters");
                    }
                }),
            body("lname")
                .optional()
                .bail()
                .isString()
                .withMessage("Name must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[A-Za-z ]+$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Name must contain only alphabets and spaces");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("Name must be between 1 and 50 characters");
                    }
                }),
            body("userName")
                .optional()
                .bail()
                .isString()
                .withMessage("UserName must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[A-Za-z 0-9]+$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("UserName must contain only alphabets, spaces, and numeric digits (0-9)");
                    }
                })
                .bail()
                .custom((value) => {
                    if (value.length >= 1 && value.length <= 50) {
                        return true;
                    } else {
                        throw new Error("UserName must be between 1 and 50 characters");
                    }
                }),
            body("phoneNumber")
                .optional()
                .bail()
                .isString()
                .withMessage("Phone number must be a string")
                .bail()
                .matches(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)
                .withMessage("Phone number must be in a valid format"),
            body('email')
                .optional()
                .bail()
                .isEmail()
                .withMessage('Invalid Email Address')
                .bail()
                .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
                .withMessage('Email must be in a valid format')
                .bail()
                .isLength({ max: 254 }),
        ],
    uploadVideo:
        [
            body("section_id")
                .exists()
                .withMessage("Section Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
        ],
    addAssignment:
        [
            body("section_id")
                .exists()
                .withMessage("Section Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body("title")
                .exists()
                .withMessage("Title is required")
                .bail()
                .isString()
                .withMessage("Title must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[a-zA-Z0-9\s.,'!-?]*$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Title must contain only alphabets, spaces, and numeric digits (0-9)");
                    }
                }),
            body("question")
                .exists()
                .withMessage("Question is required")
                .bail()
                .isString()
                .withMessage("Question must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[a-zA-Z0-9\s.,'!-?]*$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Question must contain only alphabets, spaces, and numeric digits (0-9)");
                    }
                }),
        ],
    addQuiz:
        [
            body("course_id")
                .exists()
                .withMessage("Course Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body("section_id")
                .exists()
                .withMessage("Section Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body('questions')
                .isArray()
                .withMessage('questions must be an array'),
            body("title")
                .exists()
                .withMessage("Title is required")
                .bail()
                .isString()
                .withMessage("Title must be a string")
                .bail()
                .customSanitizer((value) => value.trim())
                .custom((value) => {
                    if (/^[A-Za-z 0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value)) {
                        return true;
                    } else {
                        throw new Error("Title must contain only alphabets, spaces, and numeric digits (0-9)");
                    }
                }),
        ],
    getOneQuiz:
        [
            body("quiz_id")
                .exists()
                .withMessage("Quiz Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),

        ],
    answerQuiz:
        [
            body("course_id")
                .exists()
                .withMessage("Course Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body("quiz_id")
                .exists()
                .withMessage("Quiz Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body("question_id")
                .exists()
                .withMessage("Question Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body('ansList')
                .isArray()
                .withMessage('questions must be an array'),
        ],
    submitQuizGetMarks:
        [
            body("course_id")
                .exists()
                .withMessage("Course Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
            body("quiz_id")
                .exists()
                .withMessage("Quiz Id is missing")
                .bail()
                .isMongoId()
                .withMessage("Invalid Id")
                .bail()
                .notEmpty()
                .withMessage("ID can not be null"),
        ]



}
export default validator;