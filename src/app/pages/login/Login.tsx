import {useCallback, useMemo, useRef, useState } from "react";
import { InputLogin } from "./components/InputLogin";
import { ButtonLogin } from "./components/ButtonLogin";
import { useUsuarioLogado } from "../../shared/hooks/UseUsuarioLogado";

export function Login() {
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const usuarioLogadoContext = useUsuarioLogado();


  const emailLength = useMemo(() => {
    console.log('Executou!!');
    return email.length * 1000;
  }, [email.length]);

  //útil quando você quer utilizar apenas uma chamada daquele bloco de código. ùtil para chamada de API
  /* useEffect(() => {
    console.log(email);
  }, [email]);

  useEffect(() => {
    console.log(password);
  }, [password]); */

  const handleEntrar = useCallback(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

  return (
    <div>
      <form action="">
        <p>Quantidade de caracteres no email: {emailLength}</p>
        
        <InputLogin
          ref={inputPasswordRef}
          label="Email"
          value={email}
          onChange={newValue => setEmail(newValue)}
          onPressEnter={() => inputPasswordRef.current?.focus()}
        />
        <InputLogin
          type="password"
          label="Senha"
          value={password}
          onChange={newValue => setPassword(newValue)}
        />
        
        {/*<button onClick={handleEntrar} type="button">Entrar</button>*/}
        <ButtonLogin onClick={handleEntrar} type="button">{usuarioLogadoContext.nomeDoUsuario}</ButtonLogin>
        <ButtonLogin onClick={usuarioLogadoContext.logout} type="button">Block</ButtonLogin>
      </form>
    </div>
  );
}