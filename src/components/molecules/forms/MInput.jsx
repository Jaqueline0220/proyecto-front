import { ALabel } from 'components/atoms/ALabel';
import { AErrorInput } from 'components/atoms/AErrorInput';

export const MInput = ({
  label,
  name,
  register,
  error,
  className,
  className2,
  mostrarlabel,
  ...props
}) => (
  <div>
    <ALabel htmlFor={name}>{mostrarlabel ? label : ' '}</ALabel>
    <input
      type="text"
      id={name}
      className={`${mostrarlabel ? className : className2}`}
      placeholder={label}
      aria-describedby={error ? `${label}-error` : undefined}
      {...register(name)}
      {...props}
    />
    <AErrorInput label={label} error={error} />
  </div>
);
