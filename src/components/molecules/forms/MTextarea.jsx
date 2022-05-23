import { ALabel } from 'components/atoms/ALabel';
import { AErrorInput } from 'components/atoms/AErrorInput';

export const MTextarea = ({
  label,
  name,
  register,
  error,
  className,
  ...props
}) => (
  <div className={`${className}`}>
    <ALabel htmlFor={name}>{label}</ALabel>
    <textarea
      id={name}
      className="border-2 border-secondary-100 rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
      placeholder={label}
      aria-describedby={error ? `${label}-error` : undefined}
      {...register(name)}
      {...props}></textarea>
    <AErrorInput label={label} error={error} />
  </div>
);
