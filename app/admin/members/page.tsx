"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  UserX,
  X,
  Check,
  Power,
} from "lucide-react";

type MemberStatus = "ACTIF" | "INACTIF";

type Member = {
  id: number;
  code: string;
  nom: string;
  prenom: string;
  numeroLivret: string;
  status: MemberStatus;
};

const initialMembers: Member[] = [
  {
    id: 1,
    code: "TSS-001",
    nom: "VIXAMAR",
    prenom: "Sadeley",
    numeroLivret: "LIV-0001",
    status: "ACTIF",
  },
  {
    id: 2,
    code: "TSS-002",
    nom: "PETIT-MAITRE",
    prenom: "Phadeley",
    numeroLivret: "LIV-0003",
    status: "ACTIF",
  },
  {
    id: 3,
    code: "TSS-003",
    nom: "MILIEN",
    prenom: "Cherubin",
    numeroLivret: "LIV-0002",
    status: "INACTIF",
  },
  {
    id: 4,
    code: "TSS-004",
    nom: "PIERRE",
    prenom: "Ricardo",
    numeroLivret: "LIV-0004",
    status: "ACTIF",
  },
];

const emptyForm = {
  code: "",
  nom: "",
  prenom: "",
  numeroLivret: "",
  status: "ACTIF" as MemberStatus,
};

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("TOUS");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const activeCount = members.filter(
    (member) => member.status === "ACTIF"
  ).length;

  const inactiveCount = members.filter(
    (member) => member.status === "INACTIF"
  ).length;

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch = [
        member.code,
        member.nom,
        member.prenom,
        member.numeroLivret,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "TOUS" ||
        member.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [members, search, statusFilter]);

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function openEditForm(member: Member) {
    setEditingId(member.id);
    setForm({
      code: member.code,
      nom: member.nom,
      prenom: member.prenom,
      numeroLivret: member.numeroLivret,
      status: member.status,
    });
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedForm = {
      code: form.code.trim(),
      nom: form.nom.trim(),
      prenom: form.prenom.trim(),
      numeroLivret: form.numeroLivret.trim(),
      status: form.status,
    };

    if (
      !normalizedForm.code ||
      !normalizedForm.nom ||
      !normalizedForm.prenom ||
      !normalizedForm.numeroLivret
    ) {
      setError("Tanpri ranpli tout chan yo.");
      return;
    }

    const duplicate = members.some(
      (member) =>
        member.id !== editingId &&
        (member.code.toLowerCase() ===
          normalizedForm.code.toLowerCase() ||
          member.numeroLivret.toLowerCase() ===
            normalizedForm.numeroLivret.toLowerCase())
    );

    if (duplicate) {
      setError("Kòd manm nan oswa nimewo livret la deja egziste.");
      return;
    }

    if (editingId !== null) {
      setMembers((current) =>
        current.map((member) =>
          member.id === editingId
            ? { ...member, ...normalizedForm }
            : member
        )
      );
    } else {
      const newMember: Member = {
        id: Math.max(0, ...members.map((member) => member.id)) + 1,
        ...normalizedForm,
      };

      setMembers((current) => [...current, newMember]);
    }

    closeForm();
  }

  function toggleStatus(member: Member) {
    const nextStatus: MemberStatus =
      member.status === "ACTIF" ? "INACTIF" : "ACTIF";

    const confirmed = window.confirm(
      `Èske ou vle mete ${member.prenom} ${member.nom} kòm ${
        nextStatus === "ACTIF" ? "aktif" : "inaktif"
      }?`
    );

    if (!confirmed) return;

    setMembers((current) =>
      current.map((item) =>
        item.id === member.id
          ? { ...item, status: nextStatus }
          : item
      )
    );
  }

  function deleteMember(member: Member) {
    const confirmed = window.confirm(
      `Èske ou sèten ou vle efase manm ${member.prenom} ${member.nom} (${member.code})?`
    );

    if (!confirmed) return;

    setMembers((current) =>
      current.filter((item) => item.id !== member.id)
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-red-700">
              Administration TSS-MK
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Gestion des membres
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Ajoutez, modifiez et gérez les membres du groupement.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800"
          >
            <Plus className="size-5" />
            Ajouter un membre
          </button>
        </section>

        {/* Statistics */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Total des membres
              </p>
              <div className="rounded-xl bg-gray-100 p-3 text-gray-800">
                <Users className="size-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-950">
              {members.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Membres actifs
              </p>
              <div className="rounded-xl bg-red-50 p-3 text-red-700">
                <UserCheck className="size-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-950">
              {activeCount}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Membres inactifs
              </p>
              <div className="rounded-xl bg-gray-100 p-3 text-gray-600">
                <UserX className="size-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-950">
              {inactiveCount}
            </p>
          </div>
        </section>

        {/* Search and filters */}
        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Chèche pa kòd, non, prenon oswa nimewo livret..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            >
              <option value="TOUS">Tout estati</option>
              <option value="ACTIF">Aktif sèlman</option>
              <option value="INACTIF">Inaktif sèlman</option>
            </select>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            {filteredMembers.length} manm jwenn sou {members.length} manm.
          </p>
        </section>

        {/* Members table */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="font-semibold text-gray-950">
              Liste des membres
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-212.5 text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Code</th>
                  <th className="px-5 py-4 font-semibold">Nom</th>
                  <th className="px-5 py-4 font-semibold">Prénom</th>
                  <th className="px-5 py-4 font-semibold">Numéro livret</th>
                  <th className="px-5 py-4 font-semibold">Statut</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="transition hover:bg-red-50/30"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-gray-950">
                      {member.code}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-700">
                      {member.nom}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-700">
                      {member.prenom}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-700">
                      {member.numeroLivret}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                          member.status === "ACTIF"
                            ? "bg-red-50 text-red-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            member.status === "ACTIF"
                              ? "bg-red-600"
                              : "bg-gray-400"
                          }`}
                        />
                        {member.status === "ACTIF" ? "Aktif" : "Inaktif"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          title="Modifier le membre"
                          aria-label={`Modifier ${member.prenom} ${member.nom}`}
                          onClick={() => openEditForm(member)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                        >
                          <Pencil className="size-4" />
                        </button>

                        <button
                          type="button"
                          title={
                            member.status === "ACTIF"
                              ? "Désactiver le membre"
                              : "Activer le membre"
                          }
                          aria-label={`Changer le statut de ${member.prenom} ${member.nom}`}
                          onClick={() => toggleStatus(member)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                        >
                          <Power className="size-4" />
                        </button>

                        <button
                          type="button"
                          title="Supprimer le membre"
                          aria-label={`Supprimer ${member.prenom} ${member.nom}`}
                          onClick={() => deleteMember(member)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredMembers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center"
                    >
                      <Users className="mx-auto size-10 text-gray-300" />

                      <p className="mt-3 font-semibold text-gray-800">
                        Aucun membre trouvé
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Eseye yon lòt rechèch oswa chanje filtè a.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 px-5 py-3">
            <p className="text-xs text-gray-500">
              TSS-MK · Gestion des membres
            </p>
          </div>
        </section>
      </main>

      {/* Add / Edit form */}
      {showForm && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-form-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h2
                  id="member-form-title"
                  className="text-lg font-bold text-gray-950"
                >
                  {editingId !== null
                    ? "Modifier le membre"
                    : "Ajouter un membre"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Ranpli enfòmasyon manm nan.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Fermer le formulaire"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="code"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Code du membre *
                  </label>

                  <input
                    id="code"
                    required
                    value={form.code}
                    onChange={(event) =>
                      setForm({ ...form, code: event.target.value })
                    }
                    placeholder="TSS-005"
                    className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="numeroLivret"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Numéro livret *
                  </label>

                  <input
                    id="numeroLivret"
                    required
                    value={form.numeroLivret}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        numeroLivret: event.target.value,
                      })
                    }
                    placeholder="LIV-0005"
                    className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="nom"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Nom *
                  </label>

                  <input
                    id="nom"
                    required
                    value={form.nom}
                    onChange={(event) =>
                      setForm({ ...form, nom: event.target.value })
                    }
                    placeholder="DUPONT"
                    className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="prenom"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Prénom *
                  </label>

                  <input
                    id="prenom"
                    required
                    value={form.prenom}
                    onChange={(event) =>
                      setForm({ ...form, prenom: event.target.value })
                    }
                    placeholder="Jean"
                    className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Statut *
                </label>

                <select
                  id="status"
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value as MemberStatus,
                    })
                  }
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  <option value="ACTIF">Aktif</option>
                  <option value="INACTIF">Inaktif</option>
                </select>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
                >
                  <Check className="size-4" />
                  {editingId !== null
                    ? "Enregistrer les modifications"
                    : "Ajouter le membre"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}