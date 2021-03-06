import { arg, extendType, inputObjectType, intArg, objectType, stringArg } from '@nexus/schema';

export const Cart = objectType({
	name: 'Cart',
	definition(t) {
		t.model.cartID();
		t.model.email();
		t.model.PeriodStart({ type: 'Period' as any });
		t.model.PeriodEnd({ type: 'Period' as any });
		t.model.CartItem({
			type: 'Carrier' as any,
			pagination: false,
			filtering: false,
			ordering: {
				carrierID: true,
			},
		});
	},
});

const YearMonth = inputObjectType({
	name: 'YearMonth',
	definition(t) {
		t.int('year', { required: true });
		t.int('month', { required: true });
	},
});

export const CartTypes = [
	Cart,
	extendType({
		type: 'Query',
		definition(t) {
			t.crud.cart();
			t.crud.carts();
		},
	}),
	extendType({
		type: 'Mutation',
		definition(t) {
			t.field('saveCart', {
				type: 'Cart',
				args: {
					givenName: stringArg({ required: true }),
					familyName: stringArg({ required: true }),
					email: stringArg({ required: true }),
					start: arg({
						type: YearMonth,
						required: true,
						description: 'The provided date must be at least a week in future. (If it is after 24. of month give us one additional month)',
					}),
					end: arg({
						type: YearMonth,
						required: true,
						description: 'The end date can me same as start date but no sooner. (If same date is provided, it is expected to be from 1. to 31. of month)',
					}),
					carriersID: intArg({
						list: true,
						required: true,
					}),
					adsMotive: stringArg({
						list: true,
						required: true,
					}),
					organization: stringArg(),
					goal: stringArg({ description: 'Specify what you try to accomplish with this ad campaign.' }),
					info: stringArg({ description: 'If any additional information is to be provided...' }),
				},
				async resolve(_root, args, context, _info) {
					if (new Date(args.start.year, args.start.month) < new Date()) { // Mocked
						throw new TypeError('CartError.startTooEarly');
					}

					if (new Date(args.start.year, args.start.month) >= new Date(args.end.year, args.end.month)) {
						throw new TypeError('CartError.endNotAfterStart');
					}

					if (!args.adsMotive.length) {
						throw new TypeError('CartError.noMotives');
					}

					if (!args.carriersID.length) {
						throw new TypeError('CartError.noCarriers');
					}
				},
			});
		},
	}),
];
