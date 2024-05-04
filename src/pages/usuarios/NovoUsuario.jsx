import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { toast } from "react-toastify"


const NovaPessoa = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()
    const [urlAvatar, setUrlAvatar] = useState("")

    const savePerson =  async(event ) => {
        event.preventDefault()
        
        const formData = new FormData(formRef.current)
        const name = formData.get ("name")
        const email = formData.get ("email")
        const password = formData.get ("password")
        const avatar = formData.get ("avatar")

        const person = {
            name: name,
            email: email,
            password: password,
            avatar: avatar
        }

        try{
            const{data} = await axios.post("https://65f482ddf54db27bc021df12.mockapi.io/api/v1/users",user)
        
            if(data.id) {
            toast.success("Usuario salvo com sucesso")
                navigate("/pessoas")
            }

        }catch (erro){
            toast.error("Erro ao salvar usuario")
        }

    }

    return(
        <UserContainer className="container">
        <div className="row">
            <div className="col-12 text-center mt-5">
                <h1>Novo Usuario</h1>
            </div>

            <div className="col">
                <form ref= {formRef} onSubmit={savePerson}>
                    <div className="class mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="name" name="name"/>
                    </div>

                    <div className="class mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="email" className="form-control" id="email" name="email"/>
                    </div>

                    <div className="class mb-3">
                        <label htmlFor="c" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="password" name="password"/>
                    </div>

                    <div className="row">
                        <div className="mb-3 col col-md-8">
                            <label htmlFor="avatar" className="form-label">Avatar</label>
                            <input 
                            type="text"
                            className="form-control"
                            id="avatar" 
                            name="avatar"
                            onInput={e => setUrlAvatar(e.target.value)}/>
                        </div>

                        <div className="col ">
                            {urlAvatar &&(
                                <img src={urlAvatar} alt="imagem avatar"  className="avatar shadown"/>
                            )}
                        </div>
                    </div> 

                    <div className="class col-12 col-md-4 d-grid">
                        <button className="btn btn-primary">Salvar</button>
                    </div>


                </form>
            </div>
        </div>
    </UserContainer>
    )
}

export default NovaPessoa

const UserContainer = styled.div`
     .btn-primary {
        background-color: #a020f0;
        border: none;

        &:hover {
            background-color: #aa37f2;

        }
     }
     
     .avatar{
        height: 150px;
        width: 150px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #a020f0;
        padding: 5px;
        box-shadow: 2px 2px 2px 1px;
     }`