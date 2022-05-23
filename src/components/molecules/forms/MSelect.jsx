import { ALabel } from 'components/atoms/ALabel';
import { AErrorInput } from 'components/atoms/AErrorInput';

export const MSelect = ({
  label,
  name,
  options,
  labelKey,
  register,
  error,
  className,
  ...props
}) => (
  <div className={`${className}`}>
    <ALabel htmlFor={name}>{label}</ALabel>
    <select
      id={name}
      className="bg-white border-2 border-secondary-100 rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
      placeholder={label}
      aria-describedby={error ? `${label}-error` : undefined}
      {...register(name)}
      {...props}>
      {options.map((option, index) => (
        <option key={index} value={labelKey ? JSON.stringify(option) : option}>
          {labelKey ? option[labelKey] : option}
        </option>
      ))}
    </select>
    <AErrorInput label={label} error={error} />
  </div>
);
