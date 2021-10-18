export interface Entrada {
  departamentos: Departamento[];
}
interface Departamento {
  nombre: string;
  capital_total: number;
  puestos: Puesto[];
  departamentos: Departamento[];
}

interface Puesto {
  nombre: string;
  salario: number;
  categorias: Categoria[];
  requisitos: Requisito[];
}
interface Categoria {
  nombre: string;
}

interface Requisito {
  nombre: string;
  formatos: Formato[];
  tamano: number;
  obligatorio: number;
}

interface Formato {
  nombre: string;
}
