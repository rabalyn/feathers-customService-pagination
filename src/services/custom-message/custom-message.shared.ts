// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  CustomMessage,
  CustomMessageData,
  CustomMessagePatch,
  CustomMessageQuery,
  CustomMessageService
} from './custom-message.class'

export type { CustomMessage, CustomMessageData, CustomMessagePatch, CustomMessageQuery }

export type CustomMessageClientService = Pick<
  CustomMessageService<Params<CustomMessageQuery>>,
  (typeof customMessageMethods)[number]
>

export const customMessagePath = 'custom-message'

export const customMessageMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const customMessageClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(customMessagePath, connection.service(customMessagePath), {
    methods: customMessageMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [customMessagePath]: CustomMessageClientService
  }
}
