export default interface InvestmentResponse {
	id:number,
	description: string;
	year: number;
	monthname: string;
	miningconcession: object,
	investmenttype: object;
	periodtype: object;
	measureunit: object;
	holder: object;
	investmentconcept: object,
	registrationDate:string,
	state:boolean
};
