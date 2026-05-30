export type DeliveryStatus = 'pending' | 'in_transit' | 'delivered' | 'failed';

export interface DeliveryEvent {
  date: string
  location: string
  description: string
}

export interface Delivery {
  id: string
  code: string
  recipient: string
  origin: string
  destination: string
  status: DeliveryStatus
  createdAt: string
  updatedAt: string
  history: DeliveryEvent[]
}