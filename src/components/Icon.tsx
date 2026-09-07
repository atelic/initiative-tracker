import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  DiceFive,
  FloppyDisk,
  Heart,
  Lightning,
  NotePencil,
  PencilSimple,
  Plus,
  Shield,
  Sparkle,
  Sword,
  Trash,
  X,
} from '@phosphor-icons/react'

const icons = {
  bolt: Lightning,
  book: BookOpenText,
  chevronLeft: ArrowLeft,
  chevronRight: ArrowRight,
  dice: DiceFive,
  edit: PencilSimple,
  heart: Heart,
  note: NotePencil,
  plus: Plus,
  save: FloppyDisk,
  shield: Shield,
  spark: Sparkle,
  sword: Sword,
  trash: Trash,
  x: X,
}

export function Icon({ name, className = 'h-4 w-4' }: { name: keyof typeof icons; className?: string }) {
  const Glyph = icons[name]

  return <Glyph aria-hidden="true" className={className} weight="regular" />
}
