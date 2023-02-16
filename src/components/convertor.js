import React from "react";

export function Convertor({ currencylist, selectedcurrency, onChangecurrency, amount, onChangeamount }) {

    //const {currencylist} = props;
    return (
        <div className="row">

            <div className="container text-center">
                <div className="row">

                    <div className="col">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Amount</span>
                            <input type="number" value={amount} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                onChange={onChangeamount}
                            />
                        </div>
                    </div>

                    <div className="col">
                        <select className="form-select" aria-label="Default select example" value={selectedcurrency}
                            onChange={onChangecurrency}>

                            {currencylist.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                            ))}


                        </select>
                    </div>

                </div>
            </div>


        </div>
    )
}