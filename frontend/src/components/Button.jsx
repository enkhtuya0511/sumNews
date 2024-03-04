export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="h-[50px] w-[100px] py-[5px] px-[10px] border-2 text-[#000000]">
      {children}
    </button>
  );
}
