import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { BiSolidEdit }  from "react-icons/bi"
import { MdDeleteForever } from "react-icons/md";

const Pessoas = () => {
  const [pessoa, setPesoas] = useState([])

  const listarPessoas = async () => {
        try{
            const {data} = await axios.get("https://65f482ddf54db27bc021df12.mockapi.io/api/v1/person")
            setPesoas(data)
            console.log(data);
        }catch(error){
            toast.error("Erro ao buscar pessoa")
        }
  }

    const deletePerson = async(id) => {
        try{
            const {data} = await axios.delete(`https://65f482ddf54db27bc021df12.mockapi.io/api/v1/person/${id}`)

            if(data.id){
                toast.success("pessoa removido com sucesso")
                const novalista = pessoa.filter(item => item.id !== id)
                setPesoas(novalista)
            }else{
                toast.error("Erro ao excluir pessoa")
            }
        } catch(error){
            toast.error("Erro ao excluir pessoa")
        }
    }

  useEffect( () => {
    listarPessoas()
  },[])
   
    return(
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <h1>Pessoas</h1>

                    <div>
                        <Link to= "/pessoas/novo">
                            <button className="btn btn-primary">Novo</button>
                        </Link>
                    </div>

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome </th>
                                <th scope="col">CPF </th>
                                <th scope="col">Endereço </th>
                                <th>Telefone</th>
                                <th scope="col">Ações </th>

                            </tr>
                        </thead>

                        <tbody>
                        
                           { pessoa.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.cpf}</td>
                                    <td>{item.endereco}</td>
                                    <td>{item.telefone}</td>
                                    <td>
                                        <Link to={`/pessoas/${item.id}`}>
                                            <button className="btn btn-outline-primary btn-sm "><BiSolidEdit /></button>
                                        </Link>
                                        <button className="btn btn-outiline-danger btn-sm-ms-2 " onClick={() => deletePerson (item.id) }><MdDeleteForever /></button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Pessoas