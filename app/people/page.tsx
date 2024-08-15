"use client";

/**
 * Hey Edunova team, you might be curious about some unused components here, I initially used the shadcn/ui
 * table to make this page to test stuff out and later went with tanstack. The unused components are here in
 * case you want to uncomment the shadcn table to see how well it works. I hadn't used tanstack before so I had to get
 * used to it first. But I personally think the shadcn table works better here. It's much faster and compliments the
 * minimalist design philosophy for a dashoard app.
 */

import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterPopover } from "@/components/helpers/FilterPopover";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useRouter, useSearchParams } from "next/navigation";

import { ChevronUpIcon, ChevronDownIcon } from "@/components/ui/icons";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import MemberCard from "@/components/helpers/MemberCard";
import EditPopup from "@/components/helpers/EditPopup";
import DeletePopup from "@/components/helpers/DeletePopup";
import AddMember from "@/components/helpers/AddMember";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";

type Member = {
  id: number;
  name: string;
  username: string;
  status: string;
  role: string;
  email: string;
  teams: string[];
  avatar: string;
};

type SortKey = "name" | "status" | "role" | "email";
type SortOrder = "asc" | "desc";

function SearchParamsWrapper({ children }: any) {
  const searchParams = useSearchParams();
  return children(searchParams);
}

function SearchParamsComponent({ children }: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsWrapper>{children}</SearchParamsWrapper>
    </Suspense>
  );
}
export default function People() {
  return (
    <SearchParamsComponent>
      {(searchParams: any) => <PeopleContent searchParams={searchParams} />}
    </SearchParamsComponent>
  );
}

function PeopleContent({ searchParams }: any) {
  const [members, setMembers] = useState<Member[]>([]);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>(() => {
    const sortKey = searchParams.get("sortKey");
    const sortOrder = searchParams.get("sortOrder");
    return sortKey && sortOrder
      ? [{ id: sortKey, desc: sortOrder === "desc" }]
      : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    order: SortOrder;
  } | null>(null);
  const [filters, setFilters] = useState({ roles: [], teams: [] } as any);
  const { toast } = useToast();
  const fetchMembers = useCallback(async () => {
    try {
      const response = await fetch("/api/members");
      if (!response.ok) throw new Error("Failed to fetch members");
      const data = await response.json();
      setMembers(data);
      setLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch members. Please try again.",
      });
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (searchTerm) newSearchParams.set("query", searchTerm);
    filters.roles.forEach((role: any) => newSearchParams.append("role", role));
    filters.teams.forEach((team: any) => newSearchParams.append("team", team));
    if (sortConfig) {
      newSearchParams.set("sortKey", sortConfig.key);
      newSearchParams.set("sortOrder", sortConfig.order);
    }
    router.push(`/people?${newSearchParams.toString()}`, { scroll: false });
  }, [searchTerm, filters, sortConfig, router]);
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (sorting.length > 0) {
      newSearchParams.set("sortKey", sorting[0].id);
      newSearchParams.set("sortOrder", sorting[0].desc ? "desc" : "asc");
    } else {
      newSearchParams.delete("sortKey");
      newSearchParams.delete("sortOrder");
    }
    router.push(`/people?${newSearchParams.toString()}`, { scroll: false });
  }, [sorting, router, searchParams]);

  const sortedMembers = useMemo(() => {
    let sortableMembers = [...members];
    if (sortConfig !== null) {
      sortableMembers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.order === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.order === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableMembers;
  }, [members, sortConfig]);

  const filteredMembers = useMemo(() => {
    return sortedMembers.filter(
      (member) =>
        (searchTerm === "" ||
          Object.values(member).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )) &&
        (filters.roles.length === 0 || filters.roles.includes(member.role)) &&
        (filters.teams.length === 0 ||
          member.teams.some((team) => filters.teams.includes(team)))
    );
  }, [sortedMembers, searchTerm, filters]);

  const requestSort = (key: SortKey) => {
    let order: SortOrder = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ key, order });
  };

  const handleAddMember = async (newMember: Member) => {
    try {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });
      if (!response.ok) throw new Error("Failed to add member");
      await fetchMembers();
      toast({
        title: "✅ Success",
        description: "Member added successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add member. Please try again.",
      });
    }
  };

  const handleEditMember = async (updatedMember: Member) => {
    try {
      const response = await fetch("/api/members", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMember),
      });
      if (!response.ok) throw new Error("Failed to update member");
      await fetchMembers();
      toast({
        title: "✅ Success",
        description: "Member updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update member. Please try again.",
      });
    }
  };

  const handleDeleteMember = async (id: number) => {
    try {
      const response = await fetch("/api/members", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete member");
      await fetchMembers();
      toast({
        title: "✅ Success",
        description: "Member deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete member. Please try again.",
      });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const columnHelper = createColumnHelper<Member>();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => (
        <div className="text-left">
          <MemberCard user={info.row.original} />
        </div>
      ),
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left w-full justify-start font-semibold"
        >
          Name
          {{
            asc: <ChevronUpIcon className="ml-2 h-4 w-4" />,
            desc: <ChevronDownIcon className="ml-2 h-4 w-4" />,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      ),
    }),
    columnHelper.accessor("status", {
      cell: (info) => (
        <div className="flex justify-center">
          <Badge variant="secondary">{info.getValue()}</Badge>
        </div>
      ),
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full font-semibold"
        >
          Status
          {{
            asc: <ChevronUpIcon className="ml-2 h-4 w-4" />,
            desc: <ChevronDownIcon className="ml-2 h-4 w-4" />,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      ),
    }),
    columnHelper.accessor("role", {
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full font-semibold"
        >
          Role
          {{
            asc: <ChevronUpIcon className="ml-2 h-4 w-4" />,
            desc: <ChevronDownIcon className="ml-2 h-4 w-4" />,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      ),
    }),
    columnHelper.accessor("email", {
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full font-semibold"
        >
          Email address
          {{
            asc: <ChevronUpIcon className="ml-2 h-4 w-4" />,
            desc: <ChevronDownIcon className="ml-2 h-4 w-4" />,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      ),
    }),
    columnHelper.accessor("teams", {
      cell: (info) => (
        <div className="flex flex-wrap justify-center gap-1">
          {info.getValue().map((team: string, i: number) => (
            <Badge key={i} variant="outline">
              {team}
            </Badge>
          ))}
        </div>
      ),
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full font-semibold"
        >
          Teams
          {{
            asc: <ChevronUpIcon className="ml-2 h-4 w-4" />,
            desc: <ChevronDownIcon className="ml-2 h-4 w-4" />,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      ),
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <div className="flex gap-2 justify-end">
          <DeletePopup user={info.row.original} onDelete={handleDeleteMember} />
          <EditPopup user={info.row.original} onEdit={handleEditMember} />
        </div>
      ),
      header: () => <div className="text-right font-semibold"></div>,
    }),
  ];
  const table = useReactTable({
    data: filteredMembers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-4 md:p-6 bg-background">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex flex-col">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-semibold">Team members</h1>
                <Badge variant="secondary" className="mt-2">
                  {filteredMembers.length == 1
                    ? `1 user`
                    : `${filteredMembers.length} users`}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                Click on a member&apos;s name to expand.
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
            <Input
              type="search"
              placeholder="Search"
              className="w-full md:w-64"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="flex gap-2 w-full md:w-auto">
              <FilterPopover onFilterChange={handleFilterChange} />
              <AddMember onAddMember={handleAddMember} />
            </div>
          </div>
        </header>
        <div className="overflow-x-auto">
          <table className="mt-6 w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="text-left p-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Commented out shadcn Table
          <Table className="mt-6 w-full">
            <TableHeader>
              <TableRow>
                {["Name", "Status", "Role", "Email address", "Teams", ""].map(
                  (header, index) => (
                    <TableHead
                      key={index}
                      className={header ? "cursor-pointer select-none" : ""}
                      onClick={() =>
                        header &&
                        requestSort(
                          header.toLowerCase().split(" ")[0] as SortKey
                        )
                      }
                    >
                      <div className="flex items-center">
                        {header}
                        {sortConfig?.key ===
                          header.toLowerCase().split(" ")[0] &&
                          (sortConfig.order === "asc" ? (
                            <ChevronUpIcon className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <MemberCard user={member} />
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{member.status}</Badge>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {member.email}
                  </TableCell>
                  <TableCell className="table-cell">
                    <div className="flex flex-wrap gap-1">
                      {member.teams.map((team, i) => (
                        <Badge key={i} variant="outline">
                          {team}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      <DeletePopup
                        user={member}
                        onDelete={handleDeleteMember}
                      />
                      <EditPopup user={member} onEdit={handleEditMember} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          */}
        </div>
      </main>
    </div>
  );
}
