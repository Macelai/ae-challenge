function Error(props: { error: string }) {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 center">
      <div className="min-w-0 p-4 bg-red-400 rounded-lg shadow-xs">
        <h4 className="mb-4 font-semibold text-white center">Error</h4>
        <p className="text-white">{props.error}</p>
      </div>
    </div>
  );
}
export default Error;
