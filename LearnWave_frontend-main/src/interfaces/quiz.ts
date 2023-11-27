export interface Submission {
    success: boolean;
    message: string;
    data: Data;
    error?: null;
}
export interface Data {
    _id: string;
    student_id: string;
    course_id: string;
    quiz_id: string;
    ansList?: (AnsListEntity)[] | null;
    __v: number;
}
export interface AnsListEntity {
    set_question_id: string;
    answer?: (AnswerEntity)[] | null;
    _id: string;
}
export interface AnswerEntity {
    set_answer_id: string;
    value: string;
    _id: string;
}

export interface Submission {
    success: boolean;
    message: string;
    data: Data;
    error?: null;
}
export interface QuizData {
    _id: string;
    set_course_id: string;
    set_section_id: string;
    title: string;
    questions?: (QuestionsEntity)[] | null;
    __v: number;
}
export interface QuestionsEntity {
    question: string;
    options?: (OptionsEntity)[] | null;
    answer: string;
    _id: string;
}
export interface OptionsEntity {
    value: string;
    _id: string;
}

export interface QuizAnswer {
    success: boolean;
    message: string;
    data: Data;
    error?: null;
}
export interface QData {
    student_id: string;
    course_id: string;
    quiz_id: string;
    ansList?: (AnsListEntity)[] | null;
    _id: string;
    __v: number;
}
export interface AnsListEntity {
    set_question_id: string;
    answer?: (AnswerEntity)[] | null;
    _id: string;
}
export interface AnswerEntity {
    set_answer_id: string;
    value: string;
    _id: string;
}

export interface AllQuiz {
    success: boolean;
    message: string;
    data?: (DataEntity)[] | null;
    error?: null;
}
export interface DataEntity {
    _id: string;
    set_course_id: string;
    set_section_id: string;
    title: string;
    isDeleted: boolean;
    questions?: (QuestionsEntity)[] | null;
    __v: number;
}
export interface QuestionsEntity {
    question: string;
    options?: (OptionsEntity)[] | null;
    answer: string;
    _id: string;
}
export interface OptionsEntity {
    value: string;
    _id: string;
}

export interface SubmissionQuiz {
    success: boolean;
    message: string;
    data: QData;
    error?: null;
}
export interface QData {
    _id: string;
    student_id: string;
    course_id: string;
    quiz_id: string;
    ansList?: (AnsListEntity)[] | null;
    __v: number;
    checked: boolean;
    totalMarks: number;
}
export interface AnsListEntity {
    set_question_id: string;
    answer?: (AnswerEntity)[] | null;
    _id: string;
}
export interface AnswerEntity {
    set_answer_id: string;
    value: string;
    _id: string;
}


