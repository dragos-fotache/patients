export class Patient {
    constructor(public internalNumber: Number,
                public sex?: String, 
                public politeAdress?: String, 
                public lastNamePrefix?: String,
                public firstName?: String,
                public lastName?: String,
                public dateOfBirth?: String,
                public street?: String,
                public zip?: Number,
                public city?: String,
                public homePhone?: String,
                public mobilePhone?: String,
                public insuranceId?: String,
                public cardValidTo?: Date,
                public surchargeStatus?: String,
                public homePatient?: Boolean,
                public distance?: Number,
                public handlingType?: Number) {

    }
}