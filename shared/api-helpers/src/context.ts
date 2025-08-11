import type { Context } from '@shared/context'

export type TRPCContext = {
    req: Request
} & Context
