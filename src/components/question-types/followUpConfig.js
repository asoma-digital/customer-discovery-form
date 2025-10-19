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
        triggerValues: [""], // Will trigger for any non-empty response
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
    }
};