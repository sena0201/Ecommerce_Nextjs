function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-11/12 mx-auto max-w-[1536px]">
      {children}
    </div>
  );
}

export default Wrapper;
