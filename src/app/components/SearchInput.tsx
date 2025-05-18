"use client";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="search"
      placeholder="Search"
      className="p-2 px-3 text-base rounded border border-gray-300 w-full box-border mb-4"
      value={value}
      onChange={onChange}
    />
  );
}
