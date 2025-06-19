export const Button = ({ children, ...props }) => (
  <button className="border px-4 py-2 rounded" {...props}>{children}</button>
);
