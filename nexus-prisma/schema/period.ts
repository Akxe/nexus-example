import { objectType } from '@nexus/schema';

export const Period = objectType({
	name: 'Period',
	definition(t) {
		t.model.periodID();
		t.model.text();
		t.model.from();
		t.model.till();
	},
});

export const PeriodTypes = [
	Period,
];
