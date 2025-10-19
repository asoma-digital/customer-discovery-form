// Define follow-up questions and their triggers
export const followUpConfig = {
    // Example for current_workload question
    current_workload: {
        triggerValues: ["Overwhelming most weeks"],
        question: {
            type: "paragraph",
            name: "workload_challenges",
            label: "What specific aspects make your workload feel overwhelming?",
            required: true,
            placeholder: "Please describe the challenges you face..."
        }
    },
    
    // Example for current_organization question
    current_organization: {
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "multiple-choice",
            name: "organization_satisfaction",
            label: "How satisfied are you with your current organization method?",
            options: [
                "Very satisfied",
                "Somewhat satisfied",
                "Neutral",
                "Somewhat dissatisfied",
                "Very dissatisfied"
            ],
            required: true
        }
    },

    // Example for diagnosis question
    diagnosis: {
        triggerValues: ["Yes, diagnosed"],
        question: {
            type: "multiple-choice",
            name: "medication_status",
            label: "Are you currently taking medication for ADHD?",
            options: [
                "Yes, regularly",
                "Yes, but irregularly",
                "No, but I have in the past",
                "No, never have",
                "Prefer not to say"
            ],
            required: true
        }
    },
// SECTION TWO
    // For recent_overwhelm question
    recent_overwhelm: {
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "paragraph",
            name: "overwhelm_triggers",
            label: "What triggered that feeling, and how did you respond?",
            required: false,
            placeholder: "Share your triggers and responses..."
        }
    },
    assignment_struggle:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "assignment_struggle_time",
            label: "How much time did you expect it to take versus how long it actually did?",
            required: true,
            placeholder: "Please describe your challenges..."
        }
    },
    finally_starting:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "starting_strategies",
            label: " Does this strategy always work, or only sometimes?",
            required: false,
            placeholder: "Describe how often this strategy works for you..."
        }
    },
    task_tracking:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "multiple-choice",
            name: "task_tracking_effectiveness",
            label: "How well does that system actually work for you?",
            options: [
                "Works great",
                "Works sometimes",
                "Rarely works",
                "Doesn't work at all"
            ],
            required: true
        }
    },
    system_failed:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "paragraph",
            name: "system_failure_response",
            label: "What did you do after that?",
            required: false,
            placeholder: "Share your response to the system failure..."
        }
    },
    coping_strategies:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "paragraph",
            name: "coping_strategies_effect",
            label: "Does that help you get back on track, or does it just help you pause?",
            required: false,
            placeholder: "Describe your strategies' effect..."
        }
    },
    struggle_impact:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "paragraph",
            name: "struggle_impact_hardest",
            label: "What was the hardest part about that experience?",
            required: false,
            placeholder: "Please describe the hardest part..."
        }
    },
    tried_tools:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "paragraph",
            name: "abadndoned_tools",
            label: "Why did you stop using them (if you did)?",
            required: false,
            placeholder: "Share the tools you no longer use..."
        }
    }
};