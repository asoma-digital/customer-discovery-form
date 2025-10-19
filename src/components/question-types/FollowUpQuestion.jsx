import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { MultipleChoiceQuestion } from '.';
import { ParagraphAnswerQuestion } from '.';
import { ShortAnswerQuestion } from '.';

export const FollowUpQuestion = ({ 
    parentName, 
    triggerValues, 
    question 
}) => {
    const { control } = useFormContext();
    const parentAnswer = useWatch({ control, name: parentName });
    
    // Show follow-up if parent answer matches any trigger value
    const shouldShow = parentAnswer && triggerValues.includes(parentAnswer);

    if (!shouldShow) return null;

    // Render the appropriate question type
    switch (question.type) {
        case 'multiple-choice':
            return (
                <MultipleChoiceQuestion
                    name={question.name}
                    label={question.label}
                    options={question.options}
                    required={question.required}
                />
            );
        case 'paragraph':
            return (
                <ParagraphAnswerQuestion
                    name={question.name}
                    label={question.label}
                    required={question.required}
                    placeholder={question.placeholder}
                />
            );
        case 'short-answer':
            return (
                <ShortAnswerQuestion
                    name={question.name}
                    label={question.label}
                    required={question.required}
                    placeholder={question.placeholder}
                />
            );
        default:
            return null;
    }
};