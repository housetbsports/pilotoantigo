import { Plus } from "lucide-react";
import { Page } from "@/components/page";
import { Titulo } from "@/components/blocos";
import { Button } from "@/components/ui/button";
import { ListaBriefings } from "@/components/briefing/lista-briefings";
import { briefings } from "@/exemplo/dados";

export default function AdminBriefingsPage() {
  return (
    <Page>
      <Titulo
        eyebrow="Briefings"
        title="Todos os briefings"
        subtitle="O que foi mandado para cada influenciador e em que pé está."
        actions={
          <Button variant="primary" icon={Plus} href="/admin/briefings/novo">
            Novo briefing
          </Button>
        }
      />
      <ListaBriefings briefings={briefings} base="/admin/briefings" />
    </Page>
  );
}
