import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { toast } from "react-toastify"


const NovaPessoa = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()
  
    const savePerson =  async(event ) => {
        event.preventDefault()
        
        const formData = new FormData(formRef.current)
        const name = formData.get ("name")
        const cpf = formData.get ("cpf")
        const endereco = formData.get ("endereco")
        const Telefone = formData.get ("Telefone")
        

        const person = {
            name: name,
            Telefone: Telefone,
            cpf: cpf,
            endereco: endereco
        }

        try{
            const{data} = await axios.post("https://65f482ddf54db27bc021df12.mockapi.io/api/v1/person/",person)
        
            if(data.id) {
            toast.success("Pessoa salvo com sucesso")
                navigate("/pessoas")
            }

        }catch (erro){
            toast.error("Erro ao salvar pessoa")
        }

    }

    return(
        <UserContainer className="container">
        <div className="row">
            <div className="col-12 text-center mt-5">
                <h1>Nova Pessoa</h1>
            </div>

            <div className="col">
                <form ref= {formRef} onSubmit={savePerson}>
                    <div className="class mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="name" name="name"/>
                    </div>

                    
                    <div className="class mb-3">
                        <label htmlFor="telefone" className="form-label">Telefone</label>
                        <input type="telefone" className="form-control" id="telefone" name="telefone"/>
                    </div>

                    <div className="class mb-3">
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        <input type="cpf" className="form-control" id="cpf" name="cpf"/>
                    </div>

                    <div className="class mb-3">
                        <label htmlFor="endereco" className="form-label">Endereço</label>
                        <input type="endereco" className="form-control" id="endereco" name="endereco"/>
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