export function Banner({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return <div className="bg-white py-8 border-b">{children}</div>;
}
