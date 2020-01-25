import localstore from './localstore';

export const selected = localstore("selected", 0)
export const connections = localstore("connections", [])