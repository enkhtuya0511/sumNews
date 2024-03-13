export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="py-[5px] px-[10px] border-2 text-[#000000]">
      {children}
    </button>
  );
}
