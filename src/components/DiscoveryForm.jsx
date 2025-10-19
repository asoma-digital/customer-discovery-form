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
import { FollowUpQuestion } from './question-types/FollowUpQuestion';
import { followUpConfig } from './question-types/followUpConfig';

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

    const diagnosisAnswer = useWatch({ control, name: "diagnosis" });
    const overwhelmedAnswer = useWatch({ control, name: "recent_overwhelm" });
    

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
                    <FollowUpQuestion
                        parentName="diagnosis"
                        {...followUpConfig.diagnosis}
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
                    <FollowUpQuestion
                        parentName="current_workload"
                        {...followUpConfig.current_workload}
                    />
                    <ParagraphAnswerQuestion
                        name="current_organization"
                        label="How do you currently organize your classes, assignments, and deadlines?"
                        required={true}
                        placeholder="Describe your organization methods..."
                    />
                    <FollowUpQuestion
                        parentName="current_organization"
                        {...followUpConfig.current_organization}
                    />
                </section>

                 <section>
                    <h2>Section 2: Real Experiences (Behavior-Based Discovery)</h2>
                    <ParagraphAnswerQuestion
                        name="recent_overwhelm"
                        label="Can you walk me through a recent week when you felt behind or overwhelmed with schoolwork?"
                        required={true}
                        placeholder="Describe your challenges..."
                    />
                    <FollowUpQuestion
                        parentName="recent_overwhelm"
                        {...followUpConfig.recent_overwhelm}
                    />
                    <ParagraphAnswerQuestion
                        name="assignment_struggle"
                        label="Think of one assignment or deadline you struggled to start or finish. What happened from the moment you knew about it to when it was due?"
                        required={true}
                        placeholder="Describe the focus challenges..."
                    />
                    <FollowUpQuestion
                        parentName="assignment_struggle"
                        {...followUpConfig.assignment_struggle}
                    />
                    <ShortAnswerQuestion
                        name="falling_behind"
                        label="How do you know when you’re falling behind? What’s the first sign?"
                        required={true}
                        placeholder="Describe the signs you've noticed..."
                    />
                    <MultipleChoiceQuestion
                        name="getting_started"
                        label="What usually makes it hardest to get started on something important?"
                        options={["Not knowing where to start", "The task feels boring or overwhelming", "I lose track of time", "I get distracted easily", "I wait for the pressure to kick in", "Something else (please describe)"]}
                        required="Please select an option"
                    />
                    <ShortAnswerQuestion
                        name="finally_starting"
                        label="When you finally start, what usually helps you begin?"
                        required={false}
                        placeholder="Describe other challenges..."
                    />
                    <FollowUpQuestion
                        parentName="finally_starting"
                        {...followUpConfig.finally_starting}
                    />
                    <ParagraphAnswerQuestion
                        name="task_tracking"
                        label="How do you keep track of what you have to do (apps, planners, notes, memory, etc.)?"
                        required={false}
                        placeholder="Describe your past strategies..."
                    />
                    <FollowUpQuestion
                        parentName="task_tracking"
                        {...followUpConfig.task_tracking}
                    />
                    <ParagraphAnswerQuestion
                        name="system_failed"
                        label="Tell me about the last time your system failed — like missing something important or realizing too late. What happened?"
                        required={false}
                        placeholder="Describe a successful strategy..."
                    />
                    <FollowUpQuestion
                        parentName="system_failed"
                        {...followUpConfig.system_failed}
                    />
                    <ParagraphAnswerQuestion
                        name="coping_strategies"
                        label="When you get stressed or hit a wall, what do you usually do to cope or reset?"
                        required={false}
                        placeholder="Describe a failed strategy..."
                    />
                    <FollowUpQuestion
                        parentName="coping_strategies"
                        {...followUpConfig.coping_strategies}
                    />
                    <MultipleChoiceQuestion
                        name="burnout_frequency"
                        label="How often do you feel burnt out or exhausted by schoolwork?"
                        options={["Rarely", "A few times per semester", "Every few weeks", "Almost every week"]}
                        required="Please select an option"
                    />
                    <ParagraphAnswerQuestion
                        name="struggle_impact"
                        label="Has struggling to stay organized or manage time ever affected your grades, confidence, or mental health?"
                        required={false}
                        placeholder="Describe your support system..."
                    />
                    <FollowUpQuestion
                        parentName="struggle_impact"
                        {...followUpConfig.struggle_impact}
                    />
                    <ParagraphAnswerQuestion
                        name="tried_tools"
                        label="What apps, systems, or routines have you tried to help you stay on top of things?"
                        required={true}
                        placeholder="Describe your ideal tool..."
                    />
                    <FollowUpQuestion
                        parentName="tried_tools"
                        {...followUpConfig.tried_tools}
                    />
                    <ParagraphAnswerQuestion
                        name="chaotic_day"
                        label="Imagine your most chaotic day of the semester — what makes that day so hard to manage?"
                        required={false}
                        placeholder="Describe your improvement suggestions..."
                    />
                </section>

                <section>
                    <h2>Section 3: Looking Forward (Optional Reflection)</h2>
                    <ParagraphAnswerQuestion
                        name="school_expectation"
                        label="If you could change one thing about how school expects you to manage time or deadlines, what would it be?"
                        required={false}
                        placeholder="Describe your ideal solutions..."
                    />
                    <ParagraphAnswerQuestion
                        name="actually_works"
                        label="What’s one thing that actually works for you — even a little — when it comes to staying organized or focused?"
                        required={false}
                        placeholder="Describe the tools that work..."
                    />
                    <MultipleChoiceQuestion
                        name="future_interest"
                        label="Would you be open to a short 20-minute chat about your answers?"
                        options={["Yes, I'd love to", "Maybe later", "No, thank you"]}
                        required="Please select an option"
                    />
                </section>

                <section>
                    <h2>Closing Message</h2>
                    <p>Thank you so much for taking the time to share your experiences.</p>
                    <p>Your insights help us understand what’s really going on behind the scenes for students managing busy schedules, focus challenges, and academic pressure.</p>
                    <p>Your responses are confidential and for research purposes only. This isn’t a test, a diagnosis, or a sales pitch — just a way to better understand what students truly need.</p>
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