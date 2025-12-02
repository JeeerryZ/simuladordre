import { FieldError } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
type FormSelectProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: readonly string[];
  error?: FieldError;
  placeholder?: string;
  label?: string;
};

export function FormSelect({
  value,
  onChange,
  options,
  error,
  placeholder,
  label,
  onBlur,
}: FormSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} defaultValue=''>
      <SelectTrigger
        id={label}
        onBlur={onBlur}
        className={`w-full text-black rounded-xl px-4 py-2 bg-white/30 border border-green-300/40 text-base shadow-md focus:ring-2 focus:ring-green-400 focus:border-green-700 transition ${
          error ? "border-red-400" : ""
        }`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className='rounded-xl bg-white/20 backdrop-blur-3xl border border-green-200 p-2 shadow-xl'>
        {options.map((opt) => (
          <SelectItem
            value={opt}
            key={opt}
            className='rounded-lg text-slate-800 select-none data-[state=checked]:font-medium hover:bg-green-100 transition'
          >
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
