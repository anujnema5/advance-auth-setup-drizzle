import { bigint, integer, json, jsonb, pgEnum, pgTable, serial, smallint, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

// serial is data type used to generate unique integer

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fullName : text('full_name'),
    phone : varchar('phone', {length: 256}),
    address : varchar('address', {length: 256}),
    city : varchar('city', {length: 256})
})