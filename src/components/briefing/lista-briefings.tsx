"use client";

import { useState } from "react";
import { ClipboardList } from "lucide-react";
import { LinhaBriefing } from "@/components/blocos";
import { SegmentedControl } from "@/components/ui/segmented";
import { EmptyState } from "@/components/ui/states";
import type { Briefing } from "@/exemplo/dados";

type Filtro = "abertos" | "novo" | "aprovado" | "todos";

export function ListaBriefings({ briefings, base }: { briefings: Briefing[]; base: string }) {
  const [filtro, setFiltro] = useState<Filtro>("abertos");
  const lista = briefings.filter((b) =>
    filtro === "todos" ? true : filtro === "abertos" ? b.situacao !== "aprovado" : b.situacao === filtro,
  );
  return (
    <div className="flex flex-col gap-5">
      <SegmentedControl<Filtro>
        label="Filtrar briefings"
        value={filtro}
        onChange={setFiltro}
        className="self-start"
        options={[
          { value: "abertos", label: "Em aberto" },
          { value: "novo", label: "Novos" },
          { value: "aprovado", label: "Aprovados" },
          { value: "todos", label: "Todos" },
        ]}
      />
      {lista.length ? (
        <div className="flex flex-col">
          {lista.map((b) => (
            <LinhaBriefing key={b.id} b={b} href={`${base}/${b.id}`} />
          ))}
        </div>
      ) : (
        <EmptyState icon={ClipboardList} title="Nada por aqui" description="Quando uma marca mandar um briefing, ele aparece nesta lista." />
      )}
    </div>
  );
}
