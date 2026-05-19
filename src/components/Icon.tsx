type IconName =
  | 'bolt'
  | 'book'
  | 'chevronLeft'
  | 'chevronRight'
  | 'cross'
  | 'dice'
  | 'edit'
  | 'note'
  | 'plus'
  | 'save'
  | 'spark'
  | 'trash'
  | 'x'

interface IconProps {
  name: IconName
  className?: string
}

const paths: Record<IconName, string[]> = {
  bolt: ['M13 2 4 13h7l-1 9 9-12h-7l1-8Z'],
  book: ['M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4 4V4Z', 'M5 4v20'],
  chevronLeft: ['m15 18-6-6 6-6'],
  chevronRight: ['m9 18 6-6-6-6'],
  cross: ['M12 4v16', 'M4 12h16'],
  dice: [
    'M7 3h10l4 4v10l-4 4H7l-4-4V7l4-4Z',
    'M8 8h.01',
    'M16 8h.01',
    'M12 12h.01',
    'M8 16h.01',
    'M16 16h.01',
  ],
  edit: ['M4 20h4L19 9l-4-4L4 16v4Z', 'm13 7 4 4'],
  note: ['M6 3h9l3 3v15H6V3Z', 'M14 3v4h4', 'M9 12h6', 'M9 16h6'],
  plus: ['M12 5v14', 'M5 12h14'],
  save: ['M5 3h12l2 2v16H5V3Z', 'M8 3v7h8V3', 'M8 21v-6h8v6'],
  spark: ['M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z'],
  trash: ['M4 7h16', 'M10 11v6', 'M14 11v6', 'M6 7l1 14h10l1-14', 'M9 7V4h6v3'],
  x: ['M6 6l12 12', 'M18 6 6 18'],
}

export function Icon({ name, className = 'h-4 w-4' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name].map((path, index) => (
        <path key={index} d={path} />
      ))}
    </svg>
  )
}
