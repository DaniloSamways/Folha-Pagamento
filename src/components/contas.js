import axios from "axios";
import { useEffect, useState } from "react";

export function Contas() {
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
        if (salario <= tinss1) {
            return salario * ainss1 / 100;
        } else {
            if (salario <= tinss2) {
                return tinss1 * ainss1 / 100 + (salario - tinss1) * ainss2 / 100;
            } else {
                if (salario <= tinss3) {
                    return tinss1 * ainss1 / 100 + (tinss2 - tinss1) * ainss2 / 100 + (salario - tinss2) * ainss3 / 100;
                } else {
                    if (salario <= tinss4) {
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
        if (bc <= tirrf1) {
            return 0;
        } else {
            if (bc <= tirrf2) {
                return bc * (airrf2 / 100) - dirrf2;
            } else {
                if (bc <= tirrf3) {
                    return bc * (airrf3 / 100) - dirrf3;
                } else {
                    if (bc <= tirrf4) {
                        return bc * (airrf4 / 100) - dirrf4;
                    } else {
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