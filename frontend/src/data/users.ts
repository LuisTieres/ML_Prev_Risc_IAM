import type { User } from "./types";

const firstNames = [
  "Joao", "Maria", "Pedro", "Ana", "Lucas", "Beatriz", "Marcos", "Carla", "Rafael", "Priscila",
  "Bruno", "Fernanda", "Paulo", "Juliana", "Gustavo", "Camila", "Felipe", "Larissa", "Leonardo", "Aline",
  "Tiago", "Bruna", "Ricardo", "Patricia", "Andre", "Amanda", "Vitor", "Sofia", "Diego", "Natalia"
];

const lastNames = [
  "Silva", "Santos", "Oliveira", "Costa", "Almeida", "Fernandes", "Pereira", "Nascimento", "Souza", "Lima",
  "Ribeiro", "Martins", "Gomes", "Barbosa", "Rocha", "Moreira", "Araújo", "Melo", "Freitas", "Cardoso"
];

const roles = ["Admin", "Gerente", "Analista", "Usuário"];
const statuses: User["status"][] = ["Ativo", "Pendente"];
const lastAccessOptions = [
  "agora mesmo", "2 minutos atrás", "10 minutos atrás", "30 minutos atrás", "1 hora atrás",
  "2 horas atrás", "7 horas atrás", "Ontem", "2 dias atrás", "1 semana atrás", "Nunca"
];
const domains = ["example.com", "empresa.com.br", "corporate.com.br"];

function getName(index: number) {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
  return `${firstName} ${lastName}`;
}

function getEmail(name: string, index: number) {
  const [firstName, lastName] = name.toLowerCase().split(" ");
  const domain = domains[index % domains.length];
  return `${firstName}.${lastName}${index + 1}@${domain}`;
}

function getRole(index: number) {
  return roles[index % roles.length];
}

function getStatus(index: number) {
  return statuses[index % statuses.length];
}

function getLastAccess(index: number) {
  return lastAccessOptions[index % lastAccessOptions.length];
}

export const usersData: User[] = Array.from({ length: 1000 }, (_, index) => {
  const id = index + 1;
  const name = getName(index);

  return {
    id,
    name,
    email: getEmail(name, index),
    role: getRole(index),
    status: getStatus(index),
    lastAccess: getLastAccess(index)
  };
});
