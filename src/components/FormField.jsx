import './FormField.css';

function FormField({ label, children }) {
  return (
    <label className="form-field">
      <span className="form-field-label">{label}</span>
      {children}
    </label>
  );
}

export default FormField;
