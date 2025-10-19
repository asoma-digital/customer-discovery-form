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
// SURVEY QUESTIONS
    // Follow-up questions for recent_overwhelm
    recent_overwhelm1: {
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "recent_overwhelm1",
            label: "How did you know you were behind? What was the signal?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    recent_overwhelm2:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "recent_overwhelm2",
            label: "Who did you reach out to, if anyone?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    recent_overwhelm3:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "recent_overwhelm3",
            label: "What did you wish existed in that moment?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    // Follow-up questions for struggled_starting
    struggled_starting1: {
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "struggled_starting1",
            label: "How much time did you originally think that would take versus how long it actually took?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    struggled_starting2:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "struggled_starting2",
            label: "What did you try to do to get yourself started?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    struggled_starting3:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "struggled_starting3",
            label: "Had this happened before with other assignments? When was the last time?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    // Follow-up questions for recent_struggle_starting
    recent_struggle_starting1: {
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "recent_struggle_starting1",
            label: "How long did you sit there before either starting or giving up?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    recent_struggle_starting2:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "recent_struggle_starting2",
            label: "What finally got you to start, or what made you stop trying?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    recent_struggle_starting3:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "recent_struggle_starting3",
            label: "Do you remember what you did instead?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    // Follow-up questions for track_assignments
    track_assignments1: {
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "track_assignments1",
            label: "When did you last update this?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    track_assignments2:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "track_assignments2",
            label: "Is there anything you know you need to do that’s not in here?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    track_assignments3:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "track_assignments3",
            label: "What other systems or apps have you tried before this one?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    // Follow-up questions for system_failed
    system_failed1: {
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "system_failed1",
            label: "What did you do after you realised you’d missed it?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    system_failed2:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "system_failed2",
            label: "Did anything happen after that that made you change your system?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    system_failed3:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "system_failed3",
            label: "How often would you say this kind of thing happens?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    // Follow-up questions for past_systems
    past_systems1: {
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "past_systems1",
            label: "What was the longest you stuck with any of these?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    past_systems2:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "past_systems2",
            label: "What made you initially excited about these specific tools?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    past_systems3:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "past_systems3",
            label: "What was the moment you realized it wasn’t working?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    // Follow-up questions for recent_difficult_day
    recent_difficult_day1: {
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "recent_difficult_day1",
            label: "How many days like this do you have in a typical week?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    recent_difficult_day2:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "recent_difficult_day2",
            label: "What time of day is usually hardest for you?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    recent_difficult_day3:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "recent_difficult_day3",
            label: "Was there anything different about this day from other bad days?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    // Follow-up questions for burnt_out
    burnt_out1: {
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "burnt_out1",
            label: "How long did it take before you felt like you could get back to work?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    burnt_out2:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "burnt_out2",
            label: "Did you reach out to anyone - friends, family, counselors?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    burnt_out3:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "burnt_out3",
            label: "What would have helped you in that moment if it had existed?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    // Follow-up questions for actual_impact
    actual_impact1: {
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "actual_impact1",
            label: "How did that make you feel about yourself as a student?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    actual_impact2:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "actual_impact2",
            label: "What did you tell yourself about why it happened?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    actual_impact3:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "actual_impact3",
            label: "Has this happened more than once? How many times this semester?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    // Follow-up questions for dropping_out
    dropping_out1: {
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "dropping_out1",
            label: "Who did you talk to about this?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    dropping_out2:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "dropping_out2",
            label: "What would have to change for you to feel confident you could succeed?",
            required: false,
            placeholder: "placeholder..."
        }
    },
    dropping_out3:{
        validateTrigger: (value) => value && value.trim().length > 0,
        question: {
            type: "short-answer",
            name: "dropping_out3",
            label: "Looking back, what kept you going?",
            required: false,
            placeholder: "placeholder..."
        }
    }
};