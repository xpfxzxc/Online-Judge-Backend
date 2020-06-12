import { Global, Module } from '@nestjs/common';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Global()
@Module({
  exports: [AuthService],
  imports: [AuthGuard],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
