import { extendType, objectType } from '@nexus/schema';

//	Extend but not modify!
export const CarrierOfOffer = extendType({
	type: 'Carrier',
	definition(t) {
		t.model.District();
		t.model.Region();
		t.model.size();
	},
});

/*export const CarrierOfOffer2 = objectType({
	type: 'CarrierOfOffer',
	definition(t) {
		t.model;
	},
});*/

export const CarriersOfOfferTypes = [
	CarrierOfOffer,
	//CarrierOfOffer2,
];
