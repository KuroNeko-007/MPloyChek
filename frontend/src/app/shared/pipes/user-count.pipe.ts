import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'adminCount', standalone: true })
export class AdminCountPipe implements PipeTransform {
  transform(users: any[]): number {
    if (!users) return 0;
    return users.filter(u => u.role === 'Admin').length;
  }
}

@Pipe({ name: 'generalCount', standalone: true })
export class GeneralCountPipe implements PipeTransform {
  transform(users: any[]): number {
    if (!users) return 0;
    return users.filter(u => u.role === 'General User').length;
  }
}