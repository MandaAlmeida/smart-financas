import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { PaginationContainer } from "./styles";

interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  onPageChange: (direction: string) => Promise<void> | void;
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) {
  const pages = perPage;

  return (
    <PaginationContainer>
      <span>Total de {totalCount} item(s)</span>

      <div>
        {pages == 0 ? (
          <span>
            Pagina {pageIndex} de {1}
          </span>
        ) : (
          <span>
            Pagina {pageIndex} de {pages}
          </span>
        )}

        <section>
          <button
            onClick={() => onPageChange("first")}
            disabled={pageIndex === 1}
          >
            <ChevronsLeft />
            <span className="sr-only">Primeira página</span>
          </button>
          <button
            onClick={() => onPageChange("previous")}
            disabled={pageIndex === 1}
          >
            <ChevronLeft />
            <span className="sr-only">Próxima página</span>
          </button>
          <button
            onClick={() => onPageChange("next")}
            disabled={pages <= pageIndex}
          >
            <ChevronRight />
            <span className="sr-only">Página anterior</span>
          </button>
          <button
            onClick={() => onPageChange("last")}
            disabled={pages <= pageIndex}
          >
            <ChevronsRight />
            <span className="sr-only">Última página</span>
          </button>
        </section>
      </div>
    </PaginationContainer>
  );
}
