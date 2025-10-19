// src/components/DiscoveryForm.jsx
import { useEffect, useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import MultipleChoiceQuestion from "./question-types/MultipleChoiceQuestion";

export default function DiscoveryForm() {
    const methods = useForm();
    const { handleSubmit, reset, control, register } = methods;

    const followUp = useWatch({ control, name: "followUp" });

    const [submitted, setSubmitted] = useState(false);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    const onSubmit = (data) => {
        const duration = Date.now() - startTime;
        console.log("Form submitted:", { ...data, durationMinutes: Math.round(duration / 60000) });
        setSubmitted(true);
        reset();
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
                </section>
                

                <MultipleChoiceQuestion
                    name="learningStyle"
                    label="What is your preferred learning style?"
                    options={["Visual", "Auditory", "Kinesthetic", "Reading/Writing"]}
                />

                <label>Would you be open to a follow-up chat?</label>
                <select {...register("followUp", { required: true })}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </select>

                {followUp === "yes" && (
                <>
                <label>Email (optional):</label>
                <input type="email" {...register("email")} />
                </>
                )}

                <button type="submit" style={{ marginTop: "1rem" }}>Submit</button>
            </form>
        </FormProvider>
    );
}