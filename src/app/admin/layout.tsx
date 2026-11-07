import { Frame } from "@/components/frame/frame";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <Frame area="admin">{children}</Frame>;
}
