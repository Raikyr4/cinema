import PropTypes from 'prop-types';

const FormInput = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  required = false, 
  options = [],
  error,
  className = '',
  ...props 
}) => {
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            className={`form-select ${error ? 'is-invalid' : ''}`}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            className={`form-control ${error ? 'is-invalid' : ''}`}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            {...props}
          />
        );
      default:
        return (
          <input
            type={type}
            className={`form-control ${error ? 'is-invalid' : ''}`}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            {...props}
          />
        );
    }
  };

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}
      {renderInput()}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  })),
  error: PropTypes.string,
  className: PropTypes.string
};

export default FormInput;