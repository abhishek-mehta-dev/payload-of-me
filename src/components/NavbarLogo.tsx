const NavbarLogo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer group select-none">
      {/* Terminal mark */}
      <div className="flex items-center justify-center w-10 h-10 rounded-md border border-line bg-card group-hover:border-brand transition-colors duration-300">
        <span className="font-mono text-brand font-bold text-base tracking-tighter">
          {">_"}
        </span>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span className="font-display text-lg font-bold tracking-tight leading-none group-hover:text-brand transition-colors duration-300">
          Abhishek Mehta
        </span>
        <span className="hidden sm:block font-mono text-[10px] text-muted-foreground tracking-wider uppercase mt-1">
          Full-stack developer • Turning Ideas into Clean Software
        </span>
      </div>
    </div>
  );
};

export default NavbarLogo;
