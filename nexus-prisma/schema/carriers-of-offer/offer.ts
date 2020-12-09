import { arg, extendType, inputObjectType, intArg, objectType } from '@nexus/schema';

//import { CarrierOfOffer } from './carrier';
import { resolveClientOffer } from './resolver';

export const PeriodsOfOffer = objectType({
	name: 'PeriodsOfOffer',
	definition(t) {
		t.model.obdobi({
			alias: 'period',
		});
	},
});

export const ClientOffer = objectType({
	name: 'Offer',
	definition(t) {
		t.model.offerID();
		t.model.title();
		t.model.carriersOfOffer();
		t.model.periodsOfOffer();
	},
});

export const OfferTypes = [
	PeriodsOfOffer,
	ClientOffer,
	extendType({
		type: 'Query',
		definition(t) {
			t.field('clientOffer', {
				type: 'Offer' as any,
				args: {
					offerID: intArg({ required: true }),
					login: arg({
						type: inputObjectType({
							name: 'Login',
							definition(t) {
								t.string('name', { required: true });
								t.string('password', { required: true });
							},
						}),
					}),
				},
				async resolve(_root, args, context, _info) {
					return resolveClientOffer(context, args);
				},
			});
		},
	}),
];
