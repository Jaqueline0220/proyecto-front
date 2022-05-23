import { ALabel } from 'components/atoms/ALabel';
import { AErrorInput } from 'components/atoms/AErrorInput';

export const MInput = ({
  label,
  name,
  register,
  error,
  className,
  mostrarlabel,
  ...props
}) => (
  <div className={`${className}`}>
    <ALabel htmlFor={name}>{mostrarlabel ? label : ' '}</ALabel>
    <input
      type="text"
      id={name}
      className={`${className}`}
      placeholder={label}
      aria-describedby={error ? `${label}-error` : undefined}
      {...register(name)}
      {...props}
    />
    <AErrorInput label={label} error={error} />
  </div>
);
