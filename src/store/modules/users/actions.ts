
import { User } from '../typeStore';

// descrição de todas as ações possivel para USERS

type TypeActions = 'adicionar' | 'atualizar'

export interface ActionUser { 
    type: TypeActions; 
    payload: User;
}

const adicionarNovoUsuario = (novoUsuario: User): ActionUser => {
  return {
    type: 'adicionar',
    payload: novoUsuario,
  };
};

const atualizarUsuario = (usuarioAtualizado: User): ActionUser => {
  return {
    type: 'atualizar',
    payload: usuarioAtualizado,
  };
};

export { adicionarNovoUsuario, atualizarUsuario };



// type => intenção do usuario "atualizar"
// payload => dado necessário para executar a intensão do usuário