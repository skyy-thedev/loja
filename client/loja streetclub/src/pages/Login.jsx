import { useState } from "react";
import Destaque from "../components/Destaque";
import FaixaContinuaLinear from "../components/FaixaContinuaLinear";
import '../styles/Login.css';

export default function Login() {

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isLogin) {
        console.log('Cadastrar:', formData);
      } else {
        console.log('Login:', { email: formData.email, password: formData.password });
      }
    };

    return (
      <>
        <div className="page-container">
            <FaixaContinuaLinear />
            <Destaque />
            <div className="login-container">
                <h2>{isLogin ? 'Criar Conta' : 'Entrar'}</h2>

                <form onSubmit={handleSubmit}>
                  {isLogin && (
                    <input
                      type="text"
                      name="name"
                      placeholder="Nome"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  )}
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit">{isLogin ? 'Cadastrar' : 'Entrar'}</button>
                </form>
                <p onClick={() => setIsLogin(!isLogin)} className="toggle-form">
                  {isLogin ? 'Não tem uma conta? Cadastre-se aqui!' : 'Já tem uma conta? Clique aqui para Entrar!'}
                </p>
            </div>
        </div>
      </>
  );
}