// src/components/MultipleChoiceQuestion.jsx
import { useFormContext } from "react-hook-form";

export default function MultipleChoiceQuestion({ name, label, options }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <fieldset>
        <legend style={{ fontWeight: "bold" }}>{label}</legend>

        {options.map((option) => (
          <label key={option} style={{ display: "block", marginTop: "0.25rem" }}>
            <input
              type="radio"
              value={option}
              {...register(name, { required: `Please select an option for "${label}"` })}
            />
            {" "}
            {option}
          </label>
        ))}

        {errors[name] && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{errors[name]?.message}</p>
        )}
      </fieldset>
    </div>
  );
}