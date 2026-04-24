type MockChain = {
    select: () => MockChain;
    eq: () => MockChain;
    is: () => MockChain;
    order: () => MockChain;
    single: () => Promise<{ data: null; error: null }>;
    insert: () => MockChain;
    update: () => MockChain;
    delete: () => MockChain;
    then: (resolve: (v: unknown) => unknown) => Promise<unknown>;
};

const mockChain = (): MockChain => ({
    select: () => mockChain(),
    eq: () => mockChain(),
    is: () => mockChain(),
    order: () => mockChain(),
    single: () => Promise.resolve({ data: null, error: null }),
    insert: () => mockChain(),
    update: () => mockChain(),
    delete: () => mockChain(),
    then: (resolve: (v: unknown) => unknown) => Promise.resolve({ data: [], error: null }).then(resolve),
});

export function createClient() {
    return {
        auth: {
            getUser: async () => ({ data: { user: null }, error: null }),
        },
        from: (_table: string) => mockChain(),
        storage: {
            from: (_bucket: string) => ({
                upload: async (path: string, _file: unknown, _opts?: unknown) =>
                    ({ data: { path }, error: null }),
                getPublicUrl: (path: string) =>
                    ({ data: { publicUrl: `/mock-storage/${path}` } }),
            }),
        },
    };
}
