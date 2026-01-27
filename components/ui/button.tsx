interface ButtonProps {
    children: React.ReactNode
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="bg-blue-500 hover:bg-green-600 text-white px-4 py-2 rounded">
      {children}
    </button>
  );
}