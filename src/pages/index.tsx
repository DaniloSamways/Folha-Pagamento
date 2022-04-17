import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import Example from '../components/form';
import { Row, RowHeader, Table, TableSection } from '../components/table';

export default function Home() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [visible, setVisible] = useState('hidden')

  const getData = async () => {
    const url = 'http://localhost:3000/api/funcionarios/getAll';
    axios.get(url).then((res) => {
      const data = res.data
      setFuncionarios(data)
    });
  }
  const cadastraFuncionario = () => {
    setVisible('hidden');
    getData();
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    
      <TableSection>
        <div className="p-3 text-center">
          <Button title="Novo Funcionario" onClick={() => setVisible('')} />
        </div>
        <Table>

          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <RowHeader titulo="matrícula" align="center" />
              <RowHeader titulo="nome" align="left" />
              <RowHeader titulo="vt" align="left" />
              <RowHeader titulo="dep14" />
              <RowHeader titulo="depir" />
              <RowHeader titulo="salario" align="left" />
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {funcionarios.map(funcionario => (
              <Row key={funcionario.matricula}
                matricula={funcionario.matricula}
                nome={funcionario.nome}
                vt={funcionario.VT}
                dep14={funcionario.DEP14}
                depir={funcionario.depir}
                salario={funcionario.salario}
              />
            ))}
          </tbody>
        </Table>
      </TableSection>
      
      <div className={`fixed z-10 inset-0 overflow-y-auto ${visible}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z">

                                    </path>
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Novo Funcionário</h3>
                                <div className="mt-2">
                                    <Example />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={() => cadastraFuncionario()} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">Cadastrar</button>
                        <button onClick={() => setVisible('hidden')} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
