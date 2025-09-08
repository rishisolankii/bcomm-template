import { Pipe, PipeTransform } from '@angular/core';
import { remoteAsset } from './remote-asset';

@Pipe({ name: 'remoteAsset' })
export class RemoteAssetPipe implements PipeTransform {
  transform(path: string): string {
    return remoteAsset(path);
  }
}
