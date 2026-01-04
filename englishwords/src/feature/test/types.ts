import React from "react"

export interface Content {
    content_id: number,
    content_type: "TEXT" | "IMAGE",
    content: string,
    content_order: number
}

export interface Question {
    question_id: number,
    question_text: string,
    question_order: number
}

export interface PartProps {
    content: Content,
    questions?: Question[],
    onComplete: (order: number, answer: string) => void,
}


export interface PartQuestionProps {
    question: Question,
    content: Content,
    onComplete: (order: number, answer: string) => void,
}