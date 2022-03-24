import midtransClient from 'midtrans-client'
const payment = (req, res, next) => {
    const { money } = req.body
    if (Number(money) !== 20000) {
        next({
            code: `999`,
            message: `Your money must be 20000`
        })
    }
    let core = new midtransClient.CoreApi({
        isProduction: false,
        serverKey: process.env.MIDTRANS,
    });

    // prepare CORE API parameter ( refer to: https://docs.midtrans.com/en/core-api/bank-transfer?id=sample-request-and-request-body ) charge bank_transfer parameter example
    let parameter = {
        "payment_type": "bank_transfer",
        "transaction_details": {
            "gross_amount": money,
            "order_id": `terting-${Math.random()}`,
        },
        "bank_transfer": {
            "bank": "bni"
        }
    };
    core.charge(parameter)
        .then(() => {
            req.status = 'active'
            next()
        })
        .catch((e) => {
            console.log(e)
            next({
                code: `998`,
                message: `Faild transaction`
            })
        });;
}

export {
    payment
}