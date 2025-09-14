import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Get the authenticated user from the request
 * Returns null if not authenticated
 */
export async function getAuthenticatedUser(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.sub) {
      return null;
    }

    return {
      id: token.sub,
      githubProfile: token.githubProfile,
    };
  } catch (error) {
    console.error("Error getting authenticated user:", error);
    return null;
  }
}

/**
 * Check if the request is authenticated
 * Returns user ID if authenticated, null otherwise
 */
export async function requireAuth(
  request: NextRequest
): Promise<string | null> {
  const user = await getAuthenticatedUser(request);
  return user?.id || null;
}
