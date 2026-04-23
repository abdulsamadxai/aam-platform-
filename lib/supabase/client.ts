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

export function createClient() {
    return {
        auth: {
            getUser: async () => ({ data: { user: null }, error: null }),
        },
        from: (_table: string) => mockChain(),
        storage: {
            from: (_bucket: string) => ({
                upload: async (path: string, _file: any, _opts?: any) =>
                    ({ data: { path }, error: null }),
                getPublicUrl: (path: string) =>
                    ({ data: { publicUrl: `/mock-storage/${path}` } }),
            }),
        },
    };
}
