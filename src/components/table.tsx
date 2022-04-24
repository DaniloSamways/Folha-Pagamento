
import { Contas } from './contas';
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
            {props.children}
        </tr>
    )
}