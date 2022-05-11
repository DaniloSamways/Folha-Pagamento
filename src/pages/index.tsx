import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import { Contas } from '../components/contas';
import { Row, RowHeader, Table, TableSection } from '../components/table';

export default function Home() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [visible, setVisible] = useState('hidden');
  const [extratoVisible, setExtratoVisible] = useState('hidden');
  const [showConfirm, setShowConfirm] = useState('hidden');
  const [idFuncionario, setIdFuncionario] = useState(1);

  const [isEditable, setIsEditable] = useState(false);


  const [nome, setNome] = useState('');
  const [vt, setVt] = useState('N');
  const [dep14, setDep14] = useState('0');
  const [depir, setDepir] = useState('0');
  const [salario, setSalario] = useState('0');

  const data = ({
    nome: nome,
    vt: vt,
    dep14: dep14,
    depir: depir,
    salario: salario
  })

  const getData = async () => {
    const url = 'http://localhost:3000/api/funcionarios/getAll';
    axios.get(url).then((res) => {
      const data = res.data
      setFuncionarios(data);
    });
  }
  const cadastraFuncionario = () => {
    const url = 'http://localhost:3000/api/funcionarios/postFunc';
    axios.post(url, data).then((res) => {
      getData();
    })
    setVisible('hidden');
  }

  const data2 = ({
    matricula: idFuncionario,
    nome: nome,
    vt: vt,
    dep14: dep14,
    depir: depir,
    salario: salario
  })

  const editaFuncionario = () => {
    const url = 'http://localhost:3000/api/funcionarios/editFunc';
    axios.post(url, data2).then((res) => {
      getData();
    })
    console.log(idFuncionario);
    setVisible('hidden');
  }

  const handleSets = (nome, vt, dep14, depir, salario, id) => {
    setNome(nome);
    setVt(vt);
    setDep14(dep14);
    setDepir(depir);
    setSalario(salario);
    setIdFuncionario(id);
  }
  const handleEdit = (nome, vt, dep14, depir, salario, id) => {
    setVisible('');
    setIsEditable(true);
    handleSets(nome, vt, dep14, depir, salario, id);
  }

  const excluiFuncionario = (id) => {
    const url = 'http://localhost:3000/api/funcionarios/deleteFunc';
    axios.post(url, { matricula: id }).then((res) => {
      getData();
    })
    setShowConfirm('hidden')
  }
  const handleDelete = (nome, matricula) => {
    setShowConfirm('')
    setNome(nome)
    setIdFuncionario(matricula)
  }

  const handleExtrato = (nome, vt, dep14, depir, salario, id) => {
    setExtratoVisible('');
    handleSets(nome, vt, dep14, depir, salario, id);
  }


  useEffect(() => {
    getData();
  }, []);

  const handleChange = (evt) => {
    const url = 'http://localhost:3000/api/funcionarios/get';
    axios.get(url + "?nome=" + evt.target.value).then((res) => {
      const data = res.data
      setFuncionarios(data)
    });
  }

  const handleSave = () => {
    setIsEditable(false)
    setVisible('');
    setNome('');
    setVt('N');
    setDep14('0');
    setDepir('0');
    setSalario('0');
  }

  let contas = new Contas();

  return (
    <>

      <TableSection>
        <div className="p-3 text-center ">
          <Button title="Novo Funcionario" onClick={() => handleSave()} />
          <Link passHref href="/valores" ><Button title="Valores"/></Link>
          <div className="mt-2 flex justify-center">
            <div className="xl:w-96">
              <div className="flex items-stretch w-full mb-4">
                <input onChange={handleChange} type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Procurar" aria-label="Search" aria-describedby="button-addon2" />
              </div>
            </div>
          </div>
        </div>
        <div className='overflow-auto h-96'>
          <Table>

            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <RowHeader titulo="matrícula" align="center" />
                <RowHeader titulo="nome" align="left" />
                <RowHeader titulo="vt" align="left" />
                <RowHeader titulo="dep14" />
                <RowHeader titulo="depir" />
                <RowHeader titulo="salario base" align="left" />
                <RowHeader titulo="inss" align="left" />
                <RowHeader titulo="salário familia" align="left" />
                <RowHeader titulo="vale transporte" align="left" />
                <RowHeader titulo="irrf" align="left" />
                <RowHeader titulo="salário líquido" align="left" />
                <RowHeader titulo="ações" align="center" />
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
                >
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center font-medium">
                      <button onClick={() => handleEdit(funcionario.nome, funcionario.VT, funcionario.DEP14, funcionario.depir, funcionario.salario, funcionario.matricula)}>
                        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                      </button>
                      <button onClick={() => handleExtrato(funcionario.nome, funcionario.VT, funcionario.DEP14, funcionario.depir, funcionario.salario, funcionario.matricula)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(funcionario.nome, funcionario.matricula)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </Row>
              ))}
            </tbody>
          </Table>
        </div>
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
                    <div>
                      <div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                          <form action="#" method="POST">
                            <div className="shadow overflow-hidden sm:rounded-md">
                              <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                  <div className="col-span-6 sm:col-span-6">
                                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                                      Nome Completo
                                    </label>
                                    <input
                                      onChange={(e) => setNome(e.target.value)}
                                      type="text"
                                      name="nome"
                                      id="nome"
                                      value={nome}
                                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>



                                  <div className="col-span-6 sm:col-span-2">
                                    <label htmlFor="vt" className="block text-sm font-medium text-gray-700">
                                      Vale Tranporte
                                    </label>
                                    <select
                                      onChange={(e) => setVt(e.target.value)}
                                      id="vt"
                                      name="vt"
                                      value={vt}
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                      <option value="N">Não</option>
                                      <option value="S">Sim</option>
                                    </select>
                                  </div>

                                  <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                    <label htmlFor="dep14" className="block text-sm font-medium text-gray-700">
                                      Dependentes (-14 anos)
                                    </label>
                                    <input
                                      onChange={(e) => setDep14(e.target.value)}
                                      type="number"
                                      value={dep14}
                                      name="dep14"
                                      min="0"
                                      id="dep14"
                                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>

                                  <div className="col-span-2 ">
                                    <label htmlFor="depir" className="block text-sm font-medium text-gray-700">
                                      Dependentes(IR)
                                    </label>
                                    <input
                                      onChange={(e) => setDepir(e.target.value)}
                                      type="number"
                                      name="depir"
                                      min="0"
                                      value={depir}
                                      id="depir"
                                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>

                                  <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                    <label htmlFor="salario" className="block text-sm font-medium text-gray-700">
                                      Salário Base
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        R$
                                      </span>
                                      <input
                                        onChange={(e) => setSalario(e.target.value)}
                                        type="number"
                                        name="salario"
                                        id="salario"
                                        value={salario}
                                        className="pb-1 pl-1 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button onClick={() => isEditable ? editaFuncionario() : cadastraFuncionario()} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">{isEditable ? "Editar" : "Cadastrar"}</button>
              <button onClick={() => setVisible('hidden')} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      <div className={`${showConfirm} fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true`}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Excluir {nome}?</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Você tem certeza de que deseja excluir o funcionário <b>{nome}</b>? Todo funcionário deletado não poderá ser restaurado posteriormente.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button onClick={() => excluiFuncionario(idFuncionario)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Excluir</button>
              <button onClick={() => setShowConfirm('hidden')} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed z-10 inset-0 overflow-y-auto ${extratoVisible}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Recibo de Pagamento de Salário</h3>
                  <div className="mt-2">
                    <div>
                      <div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                          <form action="#" method="POST">
                            <div className="shadow overflow-hidden sm:rounded-md">
                              <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-5 gap-5">
                                  <div className="sm:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Matrícula
                                    </label>
                                    <p className="text-sm">{idFuncionario}</p>
                                  </div>
                                  <div className="col-span-6 sm:col-span-2 ml-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Nome
                                    </label>
                                    <p className="text-sm">{nome}</p>
                                  </div>
                                  <div className="col-span-6 sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Salário Base
                                    </label>
                                    <p className="text-sm">R$ {salario}</p>
                                  </div>
                                  <table>
                                    <thead className="text-sm font-semibold uppercase text-gray-400">
                                      <tr>
                                        <th className="px-6 bg-gray-200">Descricao</th>
                                        <th className="px-6 bg-red-200">Descontos</th>
                                      </tr>
                                    </thead>
                                    <tbody className='text-xs'>
                                      <tr>
                                        <td className="p-2 whitespace-nowrap px-6 bg-gray-100">INSS</td>
                                        <td className="p-2 whitespace-nowrap px-6 bg-red-100"><a className='font-semibold text-gray-600'>R$</a> {(contas.inss(salario)).toFixed(2)}</td>
                                      </tr>
                                      <tr>
                                        <td className="p-2 whitespace-nowrap px-6 bg-gray-100">VALE TRANSPORTE</td>
                                        <td className="p-2 whitespace-nowrap px-6 bg-red-100"><a className='font-semibold text-gray-600'>R$</a> {(contas.valeTransporte(vt, salario)).toFixed(2)}</td>
                                      </tr>
                                      <tr>
                                        <td className="p-2 whitespace-nowrap px-6 bg-gray-100">IRRF</td>
                                        <td className="p-2 whitespace-nowrap px-6 bg-red-100"><a className='font-semibold text-gray-600'>R$</a> {(contas.irrf(salario, depir)).toFixed(2)}</td>
                                      </tr>
                                      <div className="col-span-6 sm:col-span-2 mt-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                          Salário Líquido
                                        </label>
                                        <p className="text-sm">R$ {(contas.salarioLiquido(salario, vt, dep14, depir)).toFixed(2)}</p>
                                      </div>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button onClick={() => setExtratoVisible('hidden')} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
