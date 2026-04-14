import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  doublePrecision,
  integer,
  jsonb,
  unique,
  date,
} from 'drizzle-orm/pg-core'

// ─── Users ───────────────────────────────────────────────────────────────────
export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name'),
  email: text('email').unique().notNull(),
  avatarUrl: text('avatar_url'),
  onboardingCompleted: boolean('onboarding_completed').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ─── Workspaces ───────────────────────────────────────────────────────────────
export const workspaces = pgTable('workspaces', {
  id: uuid('id').primaryKey().defaultRandom(),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  plan: text('plan').notNull().default('free'), // 'free' | 'pro' | 'team'
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// ─── Workspace Members ────────────────────────────────────────────────────────
export const workspaceMembers = pgTable(
  'workspace_members',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    workspaceId: uuid('workspace_id')
      .notNull()
      .references(() => workspaces.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    role: text('role').notNull().default('member'), // 'owner' | 'admin' | 'member' | 'viewer'
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (t) => [unique().on(t.workspaceId, t.userId)]
)

// ─── Lists ────────────────────────────────────────────────────────────────────
export const lists = pgTable('lists', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id')
    .notNull()
    .references(() => workspaces.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  icon: text('icon'),
  color: text('color').default('#6366f1'),
  visibility: text('visibility').notNull().default('private'), // 'private' | 'public'
  defaultView: text('default_view').notNull().default('list'), // 'list' | 'table' | 'board'
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  isArchived: boolean('is_archived').default(false),
  orderIndex: doublePrecision('order_index').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// ─── List Fields ──────────────────────────────────────────────────────────────
export const listFields = pgTable('list_fields', {
  id: uuid('id').primaryKey().defaultRandom(),
  listId: uuid('list_id')
    .notNull()
    .references(() => lists.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'text' | 'number' | 'boolean' | 'date' | 'select' | 'multi_select' | 'url' | 'rating'
  config: jsonb('config').default({}),
  orderIndex: doublePrecision('order_index').default(0),
  isRequired: boolean('is_required').default(false),
})

// ─── Items ────────────────────────────────────────────────────────────────────
export const items = pgTable('items', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id')
    .notNull()
    .references(() => workspaces.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  notes: text('notes'),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  isDeleted: boolean('is_deleted').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// ─── List Items (Bridge) ──────────────────────────────────────────────────────
export const listItems = pgTable(
  'list_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    listId: uuid('list_id')
      .notNull()
      .references(() => lists.id, { onDelete: 'cascade' }),
    itemId: uuid('item_id')
      .notNull()
      .references(() => items.id, { onDelete: 'cascade' }),
    orderIndex: doublePrecision('order_index').default(0),
    status: text('status').default('active'), // 'active' | 'done' | 'archived'
    priority: text('priority').default('none'), // 'none' | 'low' | 'medium' | 'high'
    dueDate: date('due_date'),
    customValues: jsonb('custom_values').default({}),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (t) => [unique().on(t.listId, t.itemId)]
)

// ─── Tags ─────────────────────────────────────────────────────────────────────
export const tags = pgTable(
  'tags',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    workspaceId: uuid('workspace_id')
      .notNull()
      .references(() => workspaces.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    color: text('color').default('#6366f1'),
  },
  (t) => [unique().on(t.workspaceId, t.name)]
)

// ─── Item Tags ────────────────────────────────────────────────────────────────
export const itemTags = pgTable(
  'item_tags',
  {
    itemId: uuid('item_id')
      .notNull()
      .references(() => items.id, { onDelete: 'cascade' }),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (t) => [unique().on(t.itemId, t.tagId)]
)

// ─── Public Shares ────────────────────────────────────────────────────────────
export const publicShares = pgTable('public_shares', {
  id: uuid('id').primaryKey().defaultRandom(),
  listId: uuid('list_id')
    .notNull()
    .references(() => lists.id, { onDelete: 'cascade' }),
  shareSlug: text('share_slug').unique().notNull(),
  isActive: boolean('is_active').default(true),
  viewCount: integer('view_count').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ─── Subscriptions ────────────────────────────────────────────────────────────
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id')
    .notNull()
    .references(() => workspaces.id, { onDelete: 'cascade' }),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  plan: text('plan').notNull().default('free'),
  status: text('status').notNull().default('active'),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// ─── AI Usage ─────────────────────────────────────────────────────────────────
export const aiUsage = pgTable(
  'ai_usage',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    workspaceId: uuid('workspace_id')
      .notNull()
      .references(() => workspaces.id, { onDelete: 'cascade' }),
    monthKey: text('month_key').notNull(), // '2026-04'
    creditsUsed: integer('credits_used').default(0),
  },
  (t) => [unique().on(t.workspaceId, t.monthKey)]
)

// ─── Templates ────────────────────────────────────────────────────────────────
export const templates = pgTable('templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category'), // 'productivity' | 'student' | 'creator' | 'team'
  icon: text('icon'),
  schema: jsonb('schema').notNull(),
  sampleItems: jsonb('sample_items'),
  isOfficial: boolean('is_official').default(true),
  useCount: integer('use_count').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ─── Types ────────────────────────────────────────────────────────────────────
export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
export type Workspace = typeof workspaces.$inferSelect
export type InsertWorkspace = typeof workspaces.$inferInsert
export type List = typeof lists.$inferSelect
export type InsertList = typeof lists.$inferInsert
export type Item = typeof items.$inferSelect
export type InsertItem = typeof items.$inferInsert
export type ListItem = typeof listItems.$inferSelect
export type InsertListItem = typeof listItems.$inferInsert
export type Tag = typeof tags.$inferSelect
export type Template = typeof templates.$inferSelect
