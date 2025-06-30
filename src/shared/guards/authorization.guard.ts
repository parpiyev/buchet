import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthClientService } from '../providers/auth-client.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
	@Inject() private readonly authClientService: AuthClientService;

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		let tokenId = request.headers.authorization;

		if (!tokenId) {
			throw new UnauthorizedException();
		}
		if (tokenId.startsWith('Bearer ')) {
			tokenId = tokenId.substring('Bearer '.length);
		}
		const user: any = await this.authClientService.getUser(tokenId);
		if (!user || !user.id) {
			throw new UnauthorizedException();
		}
		if (!Array.isArray(user.roles_names) || !user.roles_names.length) {
			throw new UnauthorizedException();
		}
		request.user = { ...user, access_token: tokenId };
		return true;
	}
}
