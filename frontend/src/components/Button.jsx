export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="py-[5px] px-[25px] text-[#ffffff] bg-[#0f151e] rounded-[5px] text-[15px] font-sans">
      {children}
    </button>
  );
}
