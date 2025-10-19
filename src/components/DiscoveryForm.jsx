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
                    <p>It takes about 20 minutes, and all responses are confidential and anonymous.</p>
                </section>

                <section>
                    <h2>About You (Demographics)</h2>
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
                        name="current_workload"
                        label="How would you describe your current workload this semester?"
                        options={["Manageable", "Busy but doable", "Overwhelming most weeks"]}
                        required="Please select an option"
                    />
                    <FollowUpQuestion
                        parentName="current_workload"
                        {...followUpConfig.current_workload}
                    />
                </section>

                <section id='survey-questions'>
                    <h2>Survey Questions</h2>
                    <section>
                        <h3>Recent Overwhelm</h3>
                        <ParagraphAnswerQuestion
                            name="recent_overwhelm"
                            label="Can you walk me through a recent time - like in the past week - when you felt behind, overwhelmed, or like things were slipping through the cracks? What specifically triggered that feeling, and what did you do in response?"
                            required={true}
                            placeholder="placholder..."
                        />
                        <FollowUpQuestion
                            parentName="recent_overwhelm"
                            {...followUpConfig.recent_overwhelm1}
                        />
                        <FollowUpQuestion
                            parentName="recent_overwhelm"
                            {...followUpConfig.recent_overwhelm2}
                        />
                        <FollowUpQuestion
                            parentName="recent_overwhelm"
                            {...followUpConfig.recent_overwhelm3}
                        />
                    </section>

                    <section>
                        <h3>Struggled Starting</h3>
                        <ParagraphAnswerQuestion
                            name="struggled_starting"
                            label="Tell me about a specific assignment or deadline from the past two weeks where you struggled to get started or stay on track. Walk me through what happened from the moment you first knew about it to when you finally submitted it or missed it."
                            required={true}
                            placeholder="placholder..."
                        />
                        <FollowUpQuestion
                            parentName="struggled_starting"
                            {...followUpConfig.struggled_starting1}
                        />
                        <FollowUpQuestion
                            parentName="struggled_starting"
                            {...followUpConfig.struggled_starting2}
                        />
                        <FollowUpQuestion
                            parentName="struggled_starting"
                            {...followUpConfig.struggled_starting3}
                        />
                    </section>

                    <section>
                        <h3>Recent Struggle Starting</h3>
                        <ParagraphAnswerQuestion
                            name="recent_struggle_starting"
                            label="Think about the last time you sat down to work on something important but couldn’t get yourself to actually start. Where were you, what were you supposed to be doing, and what happened instead?"
                            required={true}
                            placeholder="placholder..."
                        />
                        <FollowUpQuestion
                            parentName="recent_struggle_starting"
                            {...followUpConfig.recent_struggle_starting1}
                        />
                        <FollowUpQuestion
                            parentName="recent_struggle_starting"
                            {...followUpConfig.recent_struggle_starting2}
                        />
                        <FollowUpQuestion
                            parentName="recent_struggle_starting"
                            {...followUpConfig.recent_struggle_starting3}
                        />
                    </section>

                    <section>
                        <h3>Tracking Assignments</h3>
                        <ParagraphAnswerQuestion
                            name="track_assignments"
                            label="How are you currently keeping track of your assignments and deadlines? Where do you write things down to save them? What’s on these apps / tools right now?"
                            required={true}
                            placeholder="placholder..."
                        />
                        <FollowUpQuestion
                            parentName="track_assignments"
                            {...followUpConfig.track_assignments1}
                        />
                        <FollowUpQuestion
                            parentName="track_assignments"
                            {...followUpConfig.track_assignments2}
                        />
                        <FollowUpQuestion
                            parentName="track_assignments"
                            {...followUpConfig.track_assignments3}
                        />
                    </section>

                    <section>
                        <h3>System Failure</h3>
                        <ParagraphAnswerQuestion
                            name="system_failed"
                            label="When was the last time your system failed you - like you missed something important or forgot a deadline? What broke down?"
                            required={true}
                            placeholder="placholder..."
                        />
                        <FollowUpQuestion
                            parentName="system_failed"
                            {...followUpConfig.system_failed1}
                        />
                        <FollowUpQuestion
                            parentName="system_failed"
                            {...followUpConfig.system_failed2}
                        />
                        <FollowUpQuestion
                            parentName="system_failed"
                            {...followUpConfig.system_failed3}
                        />
                    </section>

                    <section>
                        <h3>Past Systems</h3>
                        <ParagraphAnswerQuestion
                            name="past_systems"
                            label="Walk me through the different apps, planners, or systems you’ve tried in the past to stay organized. For each one, tell me why you started using it, how long you stuck with it, and what made you stop or switch."
                            required={true}
                            placeholder="placholder..."
                        />
                        <FollowUpQuestion
                            parentName="past_systems"
                            {...followUpConfig.past_systems1}
                        />
                        <FollowUpQuestion
                            parentName="past_systems"
                            {...followUpConfig.past_systems2}
                        />
                        <FollowUpQuestion
                            parentName="past_systems"
                            {...followUpConfig.past_systems3}
                        />
                    </section>

                    <section>
                        <h3>Recent Difficult Day</h3>
                        <ParagraphAnswerQuestion
                            name="recent_difficult_day"
                            label="Tell me about a recent day that was particularly hard for you academically - walk me through from when you woke up to when you went to bed. What made it harder than usual?"
                            required={true}
                            placeholder="placholder..."
                        />
                        <FollowUpQuestion
                            parentName="recent_difficult_day"
                            {...followUpConfig.recent_difficult_day1}
                        />
                        <FollowUpQuestion
                            parentName="recent_difficult_day"
                            {...followUpConfig.recent_difficult_day2}
                        />
                        <FollowUpQuestion
                            parentName="recent_difficult_day"
                            {...followUpConfig.recent_difficult_day3}
                        />
                    </section>

                    <section>
                        <h3>Emotions</h3>
                        <ParagraphAnswerQuestion
                            name="burnt_out"
                            label="Tell me about the last time you hit a wall emotionally with school - where you were just completely burnt out or couldn’t make yourself do anything. What day was that, what triggered it, and what did you actually do for the next few hours?"
                            required={true}
                            placeholder="placholder..."
                        />
                        <FollowUpQuestion
                            parentName="burnt_out"
                            {...followUpConfig.burnt_out1}
                        />
                        <FollowUpQuestion
                            parentName="burnt_out"
                            {...followUpConfig.burnt_out2}
                        />
                        <FollowUpQuestion
                            parentName="burnt_out"
                            {...followUpConfig.burnt_out3}
                        />
                    </section>

                    <section>
                        <h3>Actual Impact</h3>
                        <ParagraphAnswerQuestion
                            name="actual_impact"
                            label="Let’s talk about actual impact. Can you tell me about a specific grade, dropped class, or academic consequence you’ve experienced because of these challenges? What happened?"
                            required={true}
                            placeholder="placholder..."
                        />
                        <FollowUpQuestion
                            parentName="actual_impact"
                            {...followUpConfig.actual_impact1}
                        />
                        <FollowUpQuestion
                            parentName="actual_impact"
                            {...followUpConfig.actual_impact2}
                        />
                        <FollowUpQuestion
                            parentName="actual_impact"
                            {...followUpConfig.actual_impact3}
                        />
                    </section>

                    <section>
                        <h3>Dropping Out, Pausing, Changing Majors?</h3>
                        <ParagraphAnswerQuestion
                            name="dropping_out"
                            label="Have you ever seriously considered dropping out, taking a leave of absence, or changing your major because of these struggles? If so, when was the closest you came to actually doing it, and what stopped you?"
                            required={true}
                            placeholder="placeholder..."
                        />
                        <FollowUpQuestion
                            parentName="dropping_out"
                            {...followUpConfig.dropping_out1}
                        />
                        <FollowUpQuestion
                            parentName="dropping_out"
                            {...followUpConfig.dropping_out2}
                        />
                        <FollowUpQuestion
                            parentName="dropping_out"
                            {...followUpConfig.dropping_out3}
                        />
                    </section>

                </section>

                <section>
                    <h2>About You (Context)</h2>
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
                </section>

                <section>
                    <h2>Closing</h2>
                    <ParagraphAnswerQuestion
                        name="forgotten_questions"
                        label="What questions do you feel were not addressed in this interview?"
                        required={false}
                        placeholder="Were certain topics that impact your productivity not accounted for..."
                    />
                    <ParagraphAnswerQuestion
                        name="who_else"
                        label="Who else should I talk to about this topic?"
                        required={false}
                        placeholder="The emails of anyone who's relevant like a friend or classmate at college..."
                    />
                    <MultipleChoiceQuestion
                        name="share_findings"
                        label="Would you like to receive a summary of the research findings once the study is complete?"
                        required={false}
                        options={["Yes", "No"]}
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