export const ALabel = ({ children, className, ...props }) => (
  <label className={`${className} block mb-2 font-medium`} {...props}>
    {children}
  </label>
);
