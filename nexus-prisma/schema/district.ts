import { objectType } from '@nexus/schema';

export const District = objectType({
	name: 'District',
	definition(t) {
		t.model.districtID();
		t.model.district();
	},
});

export const DistrictTypes = [
	District,
];
