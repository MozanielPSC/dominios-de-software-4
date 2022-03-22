###### Nome do Sistema: FindPackage

###### Estória de Usuário: 1

###### Nome: Cadastro no sistema

## Histórico

| **Versão** | **Data**   | **Alteração no Documento** | **Autor**          |
| ---------- | ---------- | -------------------------- | ------------------ |
| 1.0        | 16/01/2022 | 22/03/2022                 | Andrey Dias        |

**Como:** Usuário do sistema

**Eu quero:** ser capaz de realizar um cadastro no sistema.

**Para:** De acordo com o tipo de usuário monitorar a frota e designar rotas aos motoristas disponíveis(no caso do gerente da transportadora) ou receber a rota que fora designada (no caso do motorista).

<br>

**Cenário 1:** Como gerente da transportadora realizar cadastro no sistema;

**Dado:** que eu tenha o CNPJ da empresa, email válido e senha;

**Quando:** Realizar a inserção dos dados necessários;

**Então:** O sistema deverá cadastrar o usuário com as devidas permissões;

**E:** Permitir o pleno uso do sistema sob o respectivo login senha e CNPJ;

<br>

**Cenário 2:** Como motorista da transportadora realizar cadastro no sistema;

**Dado:** Que eu tenha um email válido e senha;

**Quando:** For realizada a inserção dos dados necessários;

**E:** Os dados estejam válidos;

**Então:** O sistema deverá cadastrar o usuário com as devidas permissões;

**E:** Permitir o pleno uso do sistema sob o respectivo Login e senha;

<br>
