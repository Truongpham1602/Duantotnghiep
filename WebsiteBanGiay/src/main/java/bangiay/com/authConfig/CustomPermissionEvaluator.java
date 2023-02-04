package bangiay.com.authConfig;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.util.ObjectUtils;

public class CustomPermissionEvaluator implements PermissionEvaluator {
	@Override
	public boolean hasPermission(Authentication auth, Object targetDomainObject, Object permission) {
		return hasPrivilege(auth, permission.toString().toUpperCase());
	}

	@Override
	public boolean hasPermission(Authentication auth, Serializable targetId, String targetType, Object permission) {
		return hasPrivilege(auth, permission.toString().toUpperCase());
	}

	private boolean hasPrivilege(Authentication auth, String permission) {
		for (GrantedAuthority grantedAuth : auth.getAuthorities()) {
			if (grantedAuth.getAuthority().contains(permission)) {
				return true;
			}
		}
		return false;
	}
}
