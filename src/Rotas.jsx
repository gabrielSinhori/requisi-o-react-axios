import { Route, Routes, useActionData } from "react-router-dom"
import Login from "./pages/login/Login"
import Home from "./pages/home/Home"
import Cursos from "./pages/cursos/Cursos"
import Pessoas from "./pages/pessoas/Pessoas"
import NotFound from "./pages/404/NotFound"
import { useAuth } from "./AuthContext"
import NovoUsuario from "./pages/usuarios/NovoUsuario"
import Usuarios from "./pages/usuarios/Usuarios"
import EditarUser from "./pages/usuarios/EditarUser"
import EditarPessoas from "./pages/pessoas/EditarPessoa"
import NovaPessoa from "./pages/pessoas/NovaPessoa"

const Rotas =() => {
    const {userLogged} = useAuth()
    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>

            { !userLogged ? (
                <Route path="*" element={<Login/>}/>
            ) : ( 
                <>
                <Route path="/" element={<Home/>}/>
                <Route path="/cursos" element={<Cursos/>}/>
                <Route path="/pessoas" element={< Pessoas/>}/>
                <Route path="/usuarios" element={<Usuarios/>}/>
                <Route path="/usuarios/novo" element={<NovoUsuario/>}/>
                <Route path="/usuario/:id" element={<EditarUser/>}/>
                <Route path="/pessoas/novo" element={<NovaPessoa/>}/>
                <Route path="/pessoas/:id" element={<EditarPessoas/>}/>        
                
                
                <Route path="/*" element={<NotFound/>}/>
                
                </>
            ) }

            
        </Routes>
    )
}

export default Rotas
