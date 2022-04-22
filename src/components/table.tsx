import axios from "axios";
import { useEffect, useState } from "react";


export interface TableProps {
    children?: JSX.Element | JSX.Element[];
}

export function TableSection(props) {
    return (
        <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
            <div className="flex flex-col justify-center h-full">
                <div className="w-full max-w-8xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                    <header className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Funcionários</h2>
                    </header>
                    {props.children}
                </div>
            </div>
        </section>

    );
}

export function Table(props: TableProps) {
    return (
        <>

            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        {props.children}
                    </table>
                </div>
            </div>
        </>
    )
}

export function RowHeader(props) {
    return (
        <th className="p-2 whitespace-nowrap">
            <div className={`font-semibold text-${props.align}`}>{props.titulo}</div>
        </th>
    )
}


function Contas() {
    const [data, setData] = useState([]);
    const getData = async () => {
        axios.get('http://localhost:3000/api/tabela/getAll').then((res) => {
            let data = res.data
            setData(data)
        });
    };
   
    useEffect(() => {
        getData();
    }, [])

    let tsf = data.TSF;
    let vsf = data.VSF;
    let tinss1 = data.TINSS1;
    let tinss2 = data.TINSS2;
    let tinss3 = data.TINSS3;
    let tinss4 = data.TINSS4;
    let ainss1 = data.AINSS1;
    let ainss2 = data.AINSS2;
    let ainss3 = data.AINSS3;
    let ainss4 = data.AINSS4;
    let tirrf1 = data.TIRRF1;
    let tirrf2 = data.TIRRF2;
    let tirrf3 = data.TIRRF3;
    let tirrf4 = data.TIRRF4;
    let airrf2 = data.AIRRF2;
    let airrf3 = data.AIRRF3;
    let airrf4 = data.AIRRF4;
    let airrf5 = data.AIRRF5;
    let dirrf2 = data.DIRRF2;
    let dirrf3 = data.DIRRF3;
    let dirrf4 = data.DIRRF4;
    let dirrf5 = data.DIRRF5;
    let dedpdep = data.DEDPDEP;

    this.valeTransporte = (vt, salario) => {
        if (vt == "S") {
            return salario * 6 / 100
        } else {
            return 0
        }
    }

    this.salarioFamilia = (salario, dep14) => {
        if (salario <= tsf) {
            return dep14 * vsf;
        } else {
            return 0
        }
    }

    this.inss = (salario) => {
        if(salario <= tinss1){
            return salario * ainss1 / 100;
        } else {
            if(salario <= tinss2){
                return tinss1 * ainss1 / 100 + (salario - tinss1) * ainss2 / 100;
            } else{
                if(salario <= tinss3){
                    return tinss1 * ainss1 / 100 + (tinss2 - tinss1) * ainss2 / 100 + (salario - tinss2) * ainss3 / 100;
                } else{
                    if(salario <= tinss4){
                        return tinss1 * ainss1 / 100 + (tinss2 - tinss1) * ainss2 / 100 + (tinss3 - tinss2) * ainss3 / 100 + (salario - tinss3) * ainss4 / 100;
                    } else {
                        return tinss1 * ainss1 / 100 + (tinss2 - tinss1) * ainss2 / 100 + (tinss3 - tinss2) * ainss3 / 100 + (tinss4 - tinss3) * ainss4 / 100;
                    }
                }
            }
        }
    }

    this.irrf = (salario, depir) => {
        let contas = new Contas();
        let bc = salario - contas.inss(salario) - (depir * dedpdep);
        if(bc <= tirrf1){
            return 0;
        } else{
            if(bc <= tirrf2){
                return bc * (airrf2 / 100) - dirrf2;
            } else{
                if(bc <= tirrf3){
                    return bc * (airrf3 / 100) - dirrf3;
                } else{
                    if(bc <= tirrf4){
                        return bc * (airrf4 / 100) - dirrf4;
                    } else{
                        return bc * (airrf5 / 100) - dirrf5;
                    }
                }
            }
        }
        
    }

    this.salarioLiquido = (salario, vt, dep14, depir) => {
        let contas = new Contas();
        return salario - contas.inss(salario) + contas.salarioFamilia(salario, dep14) - contas.valeTransporte(vt, salario) - contas.irrf(salario, depir)
    }
}

export function Row(props) {
    let contas = new Contas();
    return (
        <tr>
            <td className="p-2 whitespace-nowrap">
                <div className="text-center font-medium">{props.matricula}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="font-medium text-gray-800">{props.nome}</div>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">{props.vt}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-center">{props.dep14}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-center">{props.depir}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium text-yellow-600">R$ {(props.salario).toFixed(2)}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium">R$ {(contas.inss(props.salario)).toFixed(2)}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium">R$ {(contas.salarioFamilia(props.salario, props.dep14)).toFixed(2)}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium">R$ {(contas.valeTransporte(props.vt, props.salario)).toFixed(2)}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium">R$ {(contas.irrf(props.salario, props.depir)).toFixed(2)}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium text-green-500">R$ {(contas.salarioLiquido(props.salario, props.vt, props.dep14, props.depir)).toFixed(2)}</div>
            </td>
        </tr>
    )
}