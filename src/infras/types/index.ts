import { Container } from 'inversify';

export interface Context {
  requestId: number;
  container: Container;
}
