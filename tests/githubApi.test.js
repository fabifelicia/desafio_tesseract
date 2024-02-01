const { listMembers, getUserDetails  } = require('../scripts/githubApi.js')

const mockFetch = jest.fn();

global.fetch = mockFetch;

describe('listMembers', () => {
  it('deve retornar a lista de membros da organização', async () => {
    // Definir o valor de retorno para listMembers
    mockFetch.mockReturnValueOnce(Promise.resolve({
      json: () => Promise.resolve([
        { name: 'Member 1' },
        { name: 'Member 2' },
        { name: 'Member 3' }
      ]),
    }));

    const { count, members } = await listMembers();

    expect(Array.isArray(members)).toBe(true);
    expect(typeof count).toBe('number');
    expect(members).toHaveLength(3);
  });

  it('deve lidar corretamente com erros ao buscar membros da organização', async () => {
    
    jest.spyOn(global, 'fetch').mockRejectedValue('Erro ao buscar membros da organização');

    const { count, members } = await listMembers();
    
    expect(count).toBe(0); 
    expect(Array.isArray(members)).toBe(true); 
    expect(members).toHaveLength(0); 

    global.fetch.mockRestore();
  });
});

describe('getUserDetails', () => {
  it('deve retornar os detalhes do usuário', async () => {    
    mockFetch.mockReturnValueOnce(Promise.resolve({
      json: () => Promise.resolve({ name: 'Mock User' }),
    }));

    const userDetails = await getUserDetails('nome_de_usuario');
    expect(userDetails).toEqual({ name: 'Mock User' });
  });

  it('deve lançar um erro se a busca falhar', async () => {
    // Simular uma falha na busca
    mockFetch.mockReturnValueOnce(Promise.reject('Erro de rede'));
    
    await expect(getUserDetails('nome_de_usuario')).rejects.toMatch('Erro de rede');
  });
});