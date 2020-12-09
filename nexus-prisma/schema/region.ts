import { objectType } from '@nexus/schema';

export const Region = objectType({
	name: 'Region',
	definition(t) {
		t.model.regionID();
		t.model.region();
	},
});

export const RegionTypes = [
	Region,
];
