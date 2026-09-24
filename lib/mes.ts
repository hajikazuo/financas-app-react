export function obterMesAtual() {
  const hoje = new Date();
  return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;
}

export function mesValido(mes: string | undefined) {
  return Boolean(mes && /^\d{4}-(0[1-9]|1[0-2])$/.test(mes));
}

export function deslocarMes(mes: string, quantidade: number) {
  const [ano, mesNumero] = mes.split("-").map(Number);
  const data = new Date(ano, mesNumero - 1 + quantidade, 1);

  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`;
}

export function formatarMes(mes: string) {
  const [ano, mesNumero] = mes.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date(ano, mesNumero - 1, 1));
}

export function obterIntervaloMes(mes: string) {
  const [ano, mesNumero] = mes.split("-").map(Number);
  const inicio = `${mes}-01`;
  const proximoMes = new Date(ano, mesNumero, 1);
  const fim = `${proximoMes.getFullYear()}-${String(proximoMes.getMonth() + 1).padStart(2, "0")}-01`;

  return { inicio, fim };
}
