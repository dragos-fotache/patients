export class Insurance {

    constructor(
        public healthInsuranceId: Number,
        public version: Number,
        public healthInsuranceType: String,
        public healthInsuranceName: String,
        public priceGroupId: Number,
        public iknumber: Number,
        public vknumber: String,
        public shortNumber: String,
        public validFrom: String,
        public validTo: String,
        public deductible: String,
        public street: String,
        public zipid: String,
        public city: String,
        public pobox: String,
        public phone: String,
        public fax: String,
        public email: String,
        public www: String,
        public remark: String,
        public insurancePayerId: String,
        public selfCreated: String,
        public deleted: Number
    ) {}

}