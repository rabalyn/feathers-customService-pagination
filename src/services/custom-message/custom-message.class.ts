// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Paginated, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type {
  CustomMessage,
  CustomMessageData,
  CustomMessagePatch,
  CustomMessageQuery
} from './custom-message.schema'

export type { CustomMessage, CustomMessageData, CustomMessagePatch, CustomMessageQuery }

export interface CustomMessageServiceOptions {
  app: Application
}

export interface CustomMessageParams extends Params<CustomMessageQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class CustomMessageService<ServiceParams extends Params = CustomMessageParams>
  implements ServiceInterface<Paginated<CustomMessage> | CustomMessage, CustomMessageData, ServiceParams, CustomMessagePatch>
{
  constructor(public options: CustomMessageServiceOptions) {}

  async find(_params?: ServiceParams) {
    const data: CustomMessage[] = []
    return {
      limit: 0,
      skip: 0,
      total: 0,
      data
    }
  }

  async get(id: Id, _params?: ServiceParams): Promise<CustomMessage> {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }

  async create(data: CustomMessageData, params?: ServiceParams): Promise<CustomMessage>
  async create(data: CustomMessageData[], params?: ServiceParams): Promise<CustomMessage[]>
  async create(
    data: CustomMessageData | CustomMessageData[],
    params?: ServiceParams
  ): Promise<CustomMessage | CustomMessage[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }

    return {
      id: 0,
      ...data
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id: NullableId, data: CustomMessageData, _params?: ServiceParams): Promise<CustomMessage> {
    return {
      id: 0,
      ...data
    }
  }

  async patch(id: NullableId, data: CustomMessagePatch, _params?: ServiceParams): Promise<CustomMessage> {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data
    }
  }

  async remove(id: NullableId, _params?: ServiceParams): Promise<CustomMessage> {
    return {
      id: 0,
      text: 'removed'
    }
  }
}

export const getOptions = (app: Application) => {
  return {
    app,
    paginate: app.get('paginate')
  }
}
