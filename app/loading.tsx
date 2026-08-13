export default function Loading() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto min-h-screen w-full max-w-4xl animate-pulse px-4 py-24 sm:px-6"
    >
      <div className="h-10 w-48 rounded-lg bg-muted/60" />
      <div className="mt-8 h-4 max-w-2xl rounded bg-muted/40" />
      <div className="mt-3 h-4 max-w-xl rounded bg-muted/40" />
    </div>
  );
}
