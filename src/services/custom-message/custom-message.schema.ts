// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const customMessageSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'CustomMessage', additionalProperties: false }
)
export type CustomMessage = Static<typeof customMessageSchema>
export const customMessageValidator = getValidator(customMessageSchema, dataValidator)
export const customMessageResolver = resolve<CustomMessage, HookContext>({})

export const customMessageExternalResolver = resolve<CustomMessage, HookContext>({})

// Schema for creating new entries
export const customMessageDataSchema = Type.Pick(customMessageSchema, ['text'], {
  $id: 'CustomMessageData'
})
export type CustomMessageData = Static<typeof customMessageDataSchema>
export const customMessageDataValidator = getValidator(customMessageDataSchema, dataValidator)
export const customMessageDataResolver = resolve<CustomMessage, HookContext>({})

// Schema for updating existing entries
export const customMessagePatchSchema = Type.Partial(customMessageDataSchema, {
  $id: 'CustomMessagePatch'
})
export type CustomMessagePatch = Static<typeof customMessagePatchSchema>
export const customMessagePatchValidator = getValidator(customMessagePatchSchema, dataValidator)
export const customMessagePatchResolver = resolve<CustomMessage, HookContext>({})

// Schema for allowed query properties
export const customMessageQueryProperties = Type.Pick(customMessageSchema, ['id', 'text'])
export const customMessageQuerySchema = Type.Intersect(
  [
    querySyntax(customMessageQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CustomMessageQuery = Static<typeof customMessageQuerySchema>
export const customMessageQueryValidator = getValidator(customMessageQuerySchema, queryValidator)
export const customMessageQueryResolver = resolve<CustomMessageQuery, HookContext>({})
