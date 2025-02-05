 const Header: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="bg-white shadow-sm sticky top-0 z-20">
    <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">{children}</div>
  </div>
);

export default Header;