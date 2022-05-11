import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../components/button";

export default function Valores() {
    // TINSS
    const [tinss1, setTinss1] = useState('0');
    const [tinss2, setTinss2] = useState('0');
    const [tinss3, setTinss3] = useState('0');
    const [tinss4, setTinss4] = useState('0');

    //AINSS
    const [ainss1, setAinss1] = useState('0');
    const [ainss2, setAinss2] = useState('0');
    const [ainss3, setAinss3] = useState('0');
    const [ainss4, setAinss4] = useState('0');

    // SALARIO FAMILIA
    const [tsf, setTsf] = useState('0');
    const [vsf, setVsf] = useState('0');

    //TIRRF
    const [tirrf1, setTirrf1] = useState('0');
    const [tirrf2, setTirrf2] = useState('0');
    const [tirrf3, setTirrf3] = useState('0');
    const [tirrf4, setTirrf4] = useState('0');

    //AIRRF
    const [airrf2, setAirrf2] = useState('0');
    const [airrf3, setAirrf3] = useState('0');
    const [airrf4, setAirrf4] = useState('0');
    const [airrf5, setAirrf5] = useState('0');

    //DIRRF
    const [dirrf2, setDirrf2] = useState('0');
    const [dirrf3, setDirrf3] = useState('0');
    const [dirrf4, setDirrf4] = useState('0');
    const [dirrf5, setDirrf5] = useState('0');

    const [dedpdep, setDedpdep] = useState('0');

    const getData = async () => {
        axios.get('http://localhost:3000/api/tabela/getAll').then(res => {
            let data = res.data;

            //TINSS
            setTinss1(data.TINSS1)
            setTinss2(data.TINSS2)
            setTinss3(data.TINSS3)
            setTinss4(data.TINSS4)

            //AINSS
            setAinss1(data.AINSS1)
            setAinss2(data.AINSS2)
            setAinss3(data.AINSS3)
            setAinss4(data.AINSS4)

            //SALARIO FAMILIA
            setTsf(data.TSF)
            setVsf(data.VSF)

            //TIRRF
            setTirrf1(data.TIRRF1)
            setTirrf2(data.TIRRF2)
            setTirrf3(data.TIRRF3)
            setTirrf4(data.TIRRF4)

            //AIRRF
            setAirrf2(data.AIRRF2)
            setAirrf3(data.AIRRF3)
            setAirrf4(data.AIRRF4)
            setAirrf5(data.AIRRF5)

            //DIRRF
            setDirrf2(data.DIRRF2)
            setDirrf3(data.DIRRF3)
            setDirrf4(data.DIRRF4)
            setDirrf5(data.DIRRF5)

            setDedpdep(data.DEDPDEP)
        })
    }

    const handleEdit = () => {
        axios.post('http://localhost:3000/api/tabela/editValues', {
            tinss1: tinss1,
            tinss2: tinss2,
            tinss3: tinss3,
            tinss4: tinss4,
            ainss1: ainss1,
            ainss2: ainss2,
            ainss3: ainss3,
            ainss4: ainss4,
            tsf: tsf,
            vsf: vsf,
            tirrf1: tirrf1,
            tirrf2: tirrf2,
            tirrf3: tirrf3,
            tirrf4: tirrf4,
            airrf2: airrf2,
            airrf3: airrf3,
            airrf4: airrf4,
            airrf5: airrf5,
            dirrf2: dirrf2,
            dirrf3: dirrf3,
            dirrf4: dirrf4,
            dirrf5: dirrf5,
            dedpdep: dedpdep,
        }).then(() => {
            alert('Editado com Sucesso!')
        })
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="bg-gray-200 w-3/6 m-auto mt-5 rounded-sm">
                <h1 className="font-bold text-center p-4">TABELA DO INSS</h1>
                <div className="bg-gray-100 grid grid-cols-2 p-4">
                    <div>
                        <h2 className="font-semibold text-center">SALÁRIO DE CONTRIBUIÇÃO (R$)</h2>
                        <div className="grid grid-cols-4 text-center m-2">
                            <h3>Até</h3>
                            <h3></h3>
                            <input onChange={(evt) => setTinss1(evt.target.value)} value={tinss1} className="text-center" />
                            <h3>TINSS1</h3>

                            <input readOnly value={tinss1} className="text-center" />
                            <h3>a</h3>
                            <input onChange={(evt) => setTinss2(evt.target.value)} value={tinss2} className="text-center" />
                            <h3>TINSS2</h3>

                            <input readOnly value={tinss2} className="text-center" />
                            <h3>a</h3>
                            <input onChange={(evt) => setTinss3(evt.target.value)} value={tinss3} className="text-center" />
                            <h3>TINSS3</h3>

                            <input readOnly value={tinss3} className="text-center" />
                            <h3>a</h3>
                            <input onChange={(evt) => setTinss4(evt.target.value)} value={tinss4} className="text-center" />
                            <h3>TINSS4</h3>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-center">ALÍQUOTA (%)</h2>
                        <div className="grid grid-cols-2 text-center m-2 mx-20">
                            <input onChange={(evt) => setAinss1(evt.target.value)} value={ainss1} className="text-center" />
                            <h3>AINSS1</h3>

                            <input onChange={(evt) => setAinss2(evt.target.value)} value={ainss2} className="text-center" />
                            <h3>AINSS2</h3>

                            <input onChange={(evt) => setAinss3(evt.target.value)} value={ainss3} className="text-center" />
                            <h3>AINSS3</h3>

                            <input onChange={(evt) => setAinss4(evt.target.value)} value={ainss4} className="text-center" />
                            <h3>AINSS4</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-200 w-3/6 m-auto mt-5 rounded-sm">
                <h1 className="font-bold text-center p-4">TABELA DO SALÁRIO FAMÍLIA</h1>
                <div className="bg-gray-100 grid grid-cols-2 p-4">
                    <div>
                        <h2 className="font-semibold text-center">SALÁRIO (R$)</h2>
                        <div className="grid grid-cols-3 text-center m-2">
                            <h3>Até</h3>
                            <input onChange={(evt) => setTsf(evt.target.value)} value={tsf} className="text-center" />
                            <h3>TSF</h3>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-center">VALOR POR DEPENDENTE (R$)</h2>
                        <div className="grid grid-cols-2 text-center m-2 mx-20">
                            <input onChange={(evt) => setVsf(evt.target.value)} value={vsf} className="text-center" />
                            <h3>VSF</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-200 w-4/6 m-auto mt-5 rounded-sm">
                <h1 className="font-bold text-center p-4">TABELA DO IRRF</h1>
                <div className="bg-gray-100 grid grid-cols-3 p-4">
                    <div>
                        <h2 className="font-semibold text-center">BASE DE CÁLCULO (R$)</h2>
                        <div className="grid grid-cols-4 text-center m-2">
                            <h3></h3>
                            <h3>Até</h3>
                            <input onChange={(evt) => setTsf(evt.target.value)} value={tirrf1} className="text-center" />
                            <h3>TIRRF1</h3>

                            <input readOnly value={tirrf1} className="text-center" />
                            <h3>A</h3>
                            <input onChange={(evt) => setTirrf2(evt.target.value)} value={tirrf2} className="text-center" />
                            <h3>TIRRF2</h3>

                            <input readOnly value={tirrf2} className="text-center" />
                            <h3>A</h3>
                            <input onChange={(evt) => setTirrf3(evt.target.value)} value={tirrf3} className="text-center" />
                            <h3>TIRRF3</h3>

                            <input readOnly value={tirrf3} className="text-center" />
                            <h3>A</h3>
                            <input onChange={(evt) => setTirrf4(evt.target.value)} value={tirrf4} className="text-center" />
                            <h3>TIRRF4</h3>

                            <h3>acima de</h3>
                            <h3></h3>
                            <input readOnly value={tirrf4} className="text-center" />
                            <h3></h3>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-center">ALÍQUOTA (R$)</h2>
                        <div className="grid grid-cols-2 text-center m-2">
                            <h3>-</h3>
                            <h3></h3>

                            <input onChange={(evt) => setAirrf2(evt.target.value)} value={airrf2} className="text-center" />
                            <h3>AIRRF2</h3>

                            <input onChange={(evt) => setAirrf3(evt.target.value)} value={airrf3} className="text-center" />
                            <h3>AIRRF3</h3>

                            <input onChange={(evt) => setAirrf4(evt.target.value)} value={airrf4} className="text-center" />
                            <h3>AIRRF4</h3>

                            <input onChange={(evt) => setAirrf5(evt.target.value)} value={airrf5} className="text-center" />
                            <h3>AIRRF5</h3>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-center">DEDUÇÃO (R$)</h2>
                        <div className="grid grid-cols-2 text-center m-2">
                            <h3>-</h3>
                            <h3></h3>

                            <input onChange={(evt) => setDirrf2(evt.target.value)} value={dirrf2} className="text-center" />
                            <h3>DIRRF2</h3>

                            <input onChange={(evt) => setDirrf3(evt.target.value)} value={dirrf3} className="text-center" />
                            <h3>DIRRF3</h3>

                            <input onChange={(evt) => setDirrf4(evt.target.value)} value={dirrf4} className="text-center" />
                            <h3>DIRRF4</h3>

                            <input onChange={(evt) => setDirrf5(evt.target.value)} value={dirrf5} className="text-center" />
                            <h3>DIRRF5</h3>
                        </div>
                    </div>
                    <div className="col-span-3 mt-2">
                        <div className="grid-rows-1 text-center">
                            Dedução por dependente
                            <input onChange={(evt) => setDedpdep(evt.target.value)} value={dedpdep} className="text-center w-1/6" />
                            DEDPDEP
                        </div>
                    </div>
                </div>
                <div className="text-center pt-5 bg-white">
                    <Link passHref href='/'><Button title="Voltar" /></Link>
                    <Button onClick={() => handleEdit()} title="Salvar" />
                </div>
            </div>
        </>
    )
}