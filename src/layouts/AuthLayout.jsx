export const AuthLayout = ({ children }) => (
  <div className="bg-secondary h-screen">
    <div className="h-full grid grid-rows-[1fr_120px]">
      <section className="h-full flex justify-center items-center">
        {children}
      </section>
    </div>
  </div>
);
