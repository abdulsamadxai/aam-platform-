import { redirect } from "next/navigation";

const mockChain = (): any => ({
    select: () => mockChain(),
    eq: () => mockChain(),
    is: () => mockChain(),
    order: () => mockChain(),
    single: () => Promise.resolve({ data: null, error: null }),
    insert: () => mockChain(),
    update: () => mockChain(),
    delete: () => mockChain(),
    then: (resolve: (v: any) => any) => Promise.resolve({ data: [], error: null }).then(resolve),
});

export async function createClient() {
    return {
        auth: {
            getUser: async () => ({
                data: {
                    user: {
                        id: "mock-admin",
                        app_metadata: { role: "admin" },
                    },
                },
                error: null,
            }),
        },
        from: (_table: string) => mockChain(),
    };
}
