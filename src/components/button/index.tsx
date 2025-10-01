export default function Button(props: { children: string, type?: string }) {
  return (
    <button role="button" className="bg-teal-600 text-teal-50 flex justify-center items-center px-4 py-2 rounded font-semibold hover:bg-teal-500 transition cursor-pointer select-none">
      {props.children}
    </button>
  );
}
