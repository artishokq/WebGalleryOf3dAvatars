interface ColorSwatchProps {
  colors: { id: string; color: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function ColorSwatch({ colors, activeId, onSelect }: ColorSwatchProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((c) => (
        <button
          key={c.id}
          type="button"
          title={c.label}
          onClick={() => onSelect(c.id)}
          className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
            activeId === c.id
              ? "border-indigo-500 ring-2 ring-indigo-300"
              : "border-gray-300 dark:border-gray-600"
          }`}
          style={{
            background:
              c.color ||
              "conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)",
          }}
        />
      ))}
    </div>
  );
}
