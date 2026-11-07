import { Frame } from "@/components/frame/frame";

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return <Frame area="influenciador">{children}</Frame>;
}
