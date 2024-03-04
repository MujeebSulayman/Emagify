import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe'],
});

const ignoredRoutes = [
	'/((?!api|trpc))(_next.*|.+.[w]+$)',
	'/transformations/add/remove',
];
export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

const middleware = authMiddleware({
	ignoredRoutes: ignoredRoutes,
});