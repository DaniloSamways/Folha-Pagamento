export default function Example() {
    return (
      <>
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
                          type="text"
                          name="nome"
                          id="nome"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>


  
                      <div className="col-span-6 sm:col-span-2">
                        <label htmlFor="vt" className="block text-sm font-medium text-gray-700">
                          Vale Tranporte
                        </label>
                        <select
                          id="vt"
                          name="vt"
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
                          type="number"
                          name="dep14"
                          id="dep14"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-2 ">
                        <label htmlFor="depir" className="block text-sm font-medium text-gray-700">
                          Dependentes
                        </label>
                        <input
                          type="number"
                          name="depir"
                          id="depir"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                        <label htmlFor="salario" className="block text-sm font-medium text-gray-700">
                          Salário
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                R$
                            </span>
                            <input
                            type="number"
                            name="salario"
                            id="salario"
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
  
        </>
    )
  }