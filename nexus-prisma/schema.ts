import { declarativeWrappingPlugin, makeSchema, queryType } from '@nexus/schema';
import type { SchemaConfig } from '@nexus/schema/dist/core';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { join } from 'path';

import { environment } from '../environments/environment';
import { Context } from './context';

const schemaOptions: Omit<SchemaConfig, 'types'> = environment.production ? {} : {
	outputs: {
		schema: join(__dirname, '/../schema.graphql'),
		typegen: join(__dirname, '/nexus.generated.ts'),
	},
	typegenAutoConfig: {
		contextType: 'Context.Context',
		sources: [
			{
				source: '.prisma/client/index.d.ts',
				alias: 'prisma',
			},
			{
				source: join(__dirname, './context.ts'),
				alias: 'Context',
			},
		],
	},
};

import { ClientOfferTypes } from './schema/carriers-of-offer';
import { CarrierTypes } from './schema/carrier';
import { CartTypes } from './schema/cart';
import { DistrictTypes } from './schema/district';
import { PeriodTypes } from './schema/period';
import { RegionTypes } from './schema/region';

export const schema = makeSchema({
	types: [
		queryType({
			definition(t) {
				t.string('running', {
					resolve() { return 'OK'; },
				});
			},
		}),
		ClientOfferTypes,
		CarrierTypes,
		CartTypes,
		DistrictTypes,
		PeriodTypes,
		RegionTypes,
	],
	plugins: [
		nexusPrisma({
			prismaClient: (ctx: Context) => ctx.prisma,
			experimentalCRUD: true,
			shouldGenerateArtifacts: !environment.production,
		}),
		declarativeWrappingPlugin(),
	],
	...schemaOptions,
});
