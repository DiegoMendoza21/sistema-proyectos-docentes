export const Card = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);
export const CardContent = ({ children }) => <div>{children}</div>;