// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  customMessageDataValidator,
  customMessagePatchValidator,
  customMessageQueryValidator,
  customMessageResolver,
  customMessageExternalResolver,
  customMessageDataResolver,
  customMessagePatchResolver,
  customMessageQueryResolver
} from './custom-message.schema'

import type { Application } from '../../declarations'
import { CustomMessageService, getOptions } from './custom-message.class'
import { customMessagePath, customMessageMethods } from './custom-message.shared'

export * from './custom-message.class'
export * from './custom-message.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const customMessage = (app: Application) => {
  // Register our service on the Feathers application
  app.use(customMessagePath, new CustomMessageService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: customMessageMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(customMessagePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(customMessageExternalResolver),
        schemaHooks.resolveResult(customMessageResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(customMessageQueryValidator),
        schemaHooks.resolveQuery(customMessageQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(customMessageDataValidator),
        schemaHooks.resolveData(customMessageDataResolver)
      ],
      patch: [
        schemaHooks.validateData(customMessagePatchValidator),
        schemaHooks.resolveData(customMessagePatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [customMessagePath]: CustomMessageService
  }
}
