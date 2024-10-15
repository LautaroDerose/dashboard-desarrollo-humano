export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-8 h-8 border-4 border-t-primary border-r-primary border-b-primary-foreground border-l-primary-foreground rounded-full animate-spin"></div>
    </div>
  );
}