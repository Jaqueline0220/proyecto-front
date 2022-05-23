export const Abutton = ({ children, className, ...props }) => (
  <button
    className={`text-primary bg-secondary hover:bg-secondary-200 focus:ring-3 focus:ring-secondary font-bold rounded-lg justify-center ${className}`}
    {...props}>
    {children}
  </button>
);
