import { Link } from 'react-router-dom';

export const ARouterLink = ({ children, ...props }) => (
  <Link {...props}>
    <span className="flex items-center cursor-pointer p-2 text-primary/50 font-bold hover:text-primary">
      {children}
    </span>
  </Link>
);
