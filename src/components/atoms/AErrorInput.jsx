export const AErrorInput = ({ label, error }) => (
  <small id={`${label}-error`} className="pl-2 text-red text-md italic">
    {error}
  </small>
);
