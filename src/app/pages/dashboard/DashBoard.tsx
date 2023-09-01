import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TestButton } from "../../shared/components/testeButton/TestButton";
import { UsuarioLogadoContext } from "../../shared/contexts/UsuarioLogado";
import { Itarefa, TarefasService } from "../../shared/services/api/tarefas/TarefasService";
import { ApiExcepetion } from "../../shared/services/api/ErrorException";

export function DashBoard() {

  const [lista, setLista] = useState<Itarefa[]>([]);

  useEffect(() => {
    TarefasService.getAll()
      .then((result) => {
        if (result instanceof ApiExcepetion) {
          alert(result.message);
        } else {
          setLista(result);
        }
      })
  }, []);

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.key === 'Enter') {
      if (e.currentTarget.value.trim().length === 0) return;

      const value = e.currentTarget.value;

      e.currentTarget.value = '';

      if (lista.some((listItem) => listItem.title === value)) return;

      TarefasService.create({
        title: value,
        isCompleted: false
      })
        .then((result) => {
          if (result instanceof ApiExcepetion) {
            alert(result.message);
          } else {
            setLista((oldList) => {
              return [...oldList, result];
            });
          }
        })


    }
  }, [lista]);

  const handleToggleComplete = useCallback((id: number) => {

    const tarefasToUpdate = lista.find((tarefa) => tarefa.id === id);

    if (!tarefasToUpdate) return;

    TarefasService.updateById(id, {
      ...tarefasToUpdate,
      isCompleted: !tarefasToUpdate.isCompleted
    })
      .then((result) => {
        if (result instanceof ApiExcepetion) {
          alert(result.message);
        } else {
          setLista((oldList) => {
            return oldList.map(oldlistItem => {

              if (oldlistItem.id === id) return result;
              return oldlistItem;
            })
          })
        }
      })
  }, [lista])

  const handleDelete = useCallback((id: number) => {
    TarefasService.deleteById(id)
      .then((result) => {
        if (result instanceof ApiExcepetion) {
          alert(result.message);
        } else {
          setLista(oldList => {
            return oldList.filter(oldListItem => oldListItem.id !== id);
          });
        }
      });
  }, []);


  const counterRef = useRef({ count: 0 });

  const usuarioLogadoContext = useContext(UsuarioLogadoContext);

  return (
    <div>
      <h1>DashBoard</h1>
      <p>{usuarioLogadoContext.nomeDoUsuario}</p>
      <p>Contador: {counterRef.current.count}</p>
      <button onClick={() => counterRef.current.count++}>Somar</button>
      <button onClick={() => console.log(counterRef.current.count)}>Somar</button>
      <Link to={"/login"}>Login</Link>
      <TestButton />
      <TestButton />
      <p>Lista</p>
      <input type="text" onKeyDown={handleInputKeyDown} />
      <ul>
        {lista.map((lisItem) => {
          return <li key={lisItem.id}>
            <input
              type="checkbox"
              checked={lisItem.isCompleted}
              onChange={() => {
                handleToggleComplete(lisItem.id);
              }}
            />
            {lisItem.title}
            <button onClick={() => handleDelete(lisItem.id)}>Apagar</button>
            </li>;

          
        })}
      </ul>
    </div>
  )
}
