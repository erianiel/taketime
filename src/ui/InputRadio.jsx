function InputRadio({ id, label, value, checked, onChange }) {
  return (
    <label
      className="flex items-center gap-1 peer-checked:text-sky-700 text-sm font-semibold"
      htmlFor={id}
    >
      <input
        className="peer hidden"
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <div className="w-4 h-4 bg-white peer-checked:bg-blue-400 shadow border-2 border-gray-300 rounded-full"></div>
      {label}
    </label>
  );
}

export default InputRadio;
