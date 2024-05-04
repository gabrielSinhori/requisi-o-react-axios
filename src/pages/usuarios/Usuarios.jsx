import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { BiSolidEdit }  from "react-icons/bi"
import { MdDeleteForever } from "react-icons/md";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([])

  const listarUsuarios = async () => {
        try{
            const {data} = await axios.get("https://65f482ddf54db27bc021df12.mockapi.io/api/v1/users")
            setUsuarios(data)
            console.log(data);
        }catch(error){
            toast.error("Erro ao buscar usuario")
        }
  }

    const deleteUser = async(id) => {
        try{
            const {data} = await axios.delete(`https://65f482ddf54db27bc021df12.mockapi.io/api/v1/users/${id}`)

            if(data.id){
                toast.success("usuario removido com sucesso")
                const novalista = usuarios.filter(item => item.id !== id)
                setUsuarios(novalista)
            }else{
                toast.error("Erro ao excluir usuario")
            }
        } catch(error){
            toast.error("Erro ao excluir usuario")
        }
    }

  useEffect( () => {
    listarUsuarios()
  },[])
   
    return(
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <h1>Usuarios</h1>

                    <div>
                        <Link to= "/usuarios/novo">
                            <button className="btn btn-primary">Novo</button>
                        </Link>
                    </div>

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Avatar </th>
                                <th scope="col">Nome </th>
                                <th scope="col">E-mail </th>
                                <th scope="col">Ações </th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            {
                                usuarios.map(item => (
                                    <tr key={item.id}>
                                        <th>
                                            <img src= {item.avatar} alt="" width={30}/>
                                        </th>
                                        <td>{item.name}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <Link to={`/usuario/${item.id}`}>
                                                <button className="btn btn-outline-primary btn-sm "><BiSolidEdit /></button>
                                            </Link>
                                            <button className="btn btn-outiline-danger btn-sm-ms-2 " onClick={() => deleteUser (item.id) }><MdDeleteForever /></button>
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

export default Usuarios