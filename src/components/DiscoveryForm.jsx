// src/components/DiscoveryForm.jsx
import React from 'react';
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import {
  MultipleChoiceQuestion,
  ShortAnswerQuestion,
  ParagraphAnswerQuestion
} from './question-types';

// Simple error boundary to catch rendering errors
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return <div>
                <h2>Something went wrong.</h2>
                <pre>{this.state.error?.message}</pre>
            </div>;
        }
        return this.props.children;
    }
}

function DiscoveryForm() {
    const methods = useForm({
        defaultValues: {
            school_year: ''
        }
    });
    const { handleSubmit, reset, control, register, formState: { errors } } = methods;

    const followUp = useWatch({ control, name: "followUp" });
    const schoolYear = useWatch({ control, name: "school_year" });
    const diagnosisAnswer = useWatch({ control, name: "diagnosis" });

    const [submitted, setSubmitted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    const onSubmit = async (data) => {
        console.log('Form submission started');
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        try {
            const duration = Date.now() - startTime;
            const durationMinutes = Math.round(duration / 60000);

            console.log('Preparing submission data:', { data, durationMinutes });
            const submission = {
                ...data,
                duration_minutes: durationMinutes
            };

            if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
                console.warn('Supabase not configured - logging submission locally:', submission);
                // For development, just log the data and simulate success
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
                console.log('Development mode - form data:', submission);
                setSubmitted(true);
                reset();
                return;
            }

            console.log('Attempting Supabase insert with:', submission);
            
            const { error } = await supabase
                .from('form-responses')
                .insert([submission]);

            if (error) {
                console.error("Supabase insert error:", error);
                alert("There was an error saving your response: " + error.message);
                return;
            }
            
            console.log('Supabase insert successful');

            console.log("Form submitted:", { ...submission });
            setSubmitted(true);
            reset();
        } catch (err) {
            console.error("Form submission error:", err);
            alert("There was an unexpected error submitting the form.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>🎉 Thank you for your response!</h2>;
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 600, margin: "2rem auto" }}>
                <h1>Customer Discovery Form</h1>

                <section>
                    <h2>Intro Paragraph</h2>
                    <p>Hi! I’m conducting a short research study to understand how college students organize their time, manage classes, and stay focused — especially when juggling multiple responsibilities.</p>
                    <p>This isn’t about testing or diagnosing ADHD. I’m interested in your real experiences — what’s hard, what helps, and what you wish existed.</p>
                    <p>There are no right or wrong answers — just honest ones. Your input will help us understand how to better support students like you.</p>
                    <p>It takes about 10–12 minutes, and all responses are confidential and anonymous.</p>
                </section>

                <section>
                    <h2>Section 1: About You (Context & Demographics)</h2>
                    <MultipleChoiceQuestion
                        name="school_year"
                        label="What year are you in?"
                        options={["First year", "Second year", "Third year", "Fourth year", "Graduate / Postgrad", "Other"]}
                        required="Please select your year"
                    />
                    <ShortAnswerQuestion
                        name="major"
                        label="What is your major or field of study?"
                        required={true}
                        placeholder="e.g., Computer Science, Biology, etc."
                    />
                    <MultipleChoiceQuestion
                        name="diagnosis"
                        label="Do you have a formal ADHD diagnosis, or do you suspect you might have ADHD?"
                        options={["Yes, diagnosed", "No, but I think I might", "No"]}
                        required="Please select an option"
                    />
                    {diagnosisAnswer && diagnosisAnswer !== "No" && (
                        <MultipleChoiceQuestion
                            name="diagnosis_timeframe"
                            label="When were you diagnosed (or when did you first suspect it)?"
                            options={["Before college", "During college", "After college"]}
                            required="Please select an option"
                        />
                    )}
                    <MultipleChoiceQuestion
                        name="current_workload"
                        label="How would you describe your current workload this semester?"
                        options={["Manageable", "Busy but doable", "Overwhelming most weeks"]}
                        required="Please select an option"
                    />
                    <ParagraphAnswerQuestion
                        name="current_organization"
                        label="How do you currently organize your classes, assignments, and deadlines?"
                        required={true}
                        placeholder="Describe your organization methods..."
                    />
                </section>

                <button
                    type="submit"
                    style={{ marginTop: "1rem" }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </FormProvider>
    );
}

export default DiscoveryForm;