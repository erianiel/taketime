function InputRadio({ id, label, value, checked, onChange }) {
  return (
    <label
      className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-neutral-600 peer-checked:text-sky-700"
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
      <div className="h-4 w-4 rounded-full border-2 border-gray-300 bg-white shadow peer-checked:bg-blue-400"></div>
      {label}
    </label>
  );
}

export default InputRadio;
