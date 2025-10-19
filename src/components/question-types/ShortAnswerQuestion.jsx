// src/components/question-types/ShortAnswerQuestion.jsx
import { useFormContext } from "react-hook-form";

export default function ShortAnswerQuestion({ name, label, required = false, placeholder = "" }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.25rem" }}>
        {label}
      </label>
      <input
        type="text"
        {...register(name, {
          required: required ? `${label} is required.` : false,
        })}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      {errors[name] && (
        <p style={{ color: "red", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          {errors[name].message}
        </p>
      )}
    </div>
  );
}