# Sistema de Gestão Acadêmica

Um protótipo de sistema de gestão acadêmica com persistência de dados em JSON e interface com tema azul escuro.

## Características

- **Interface Moderna**: Tema azul escuro com design responsivo
- **Persistência Local**: Dados armazenados em JSON no localStorage
- **Arquitetura Modular**: Cada funcionalidade é um módulo separado
- **Herança de Classes**: Implementação de herança com classe base Pessoa
- **Validação de Dados**: Validação de CPF e outros campos obrigatórios

## Funcionalidades

### 1. Cadastro de Alunos
- Registro de dados pessoais (nome, matrícula, CPF, data de nascimento, contato)
- Atribuição de alunos a turmas existentes
- Validação de CPF
- Verificação de matrícula única

### 2. Cadastro de Professores
- Registro de dados pessoais (nome, matrícula, CPF, área de atuação, contato)
- Atribuição de professores às disciplinas
- Validação de CPF
- Verificação de matrícula única

### 3. Cadastro de Turmas
- Criação de turmas com disciplina, professor e turno
- Definição de ano e semestre
- Associação de alunos às turmas

### 4. Lançamento de Notas
- Inserção de notas de avaliações por professores
- Cálculo automático de médias
- Diferentes tipos de avaliação (prova, trabalho, atividade)

### 5. Consulta de Notas
- Visualização de notas por alunos e professores
- Filtros por aluno
- Histórico de notas por disciplina

### 6. Controle de Frequência
- Registro de presença/ausência diária
- Cálculo automático de percentual de frequência
- Controle por disciplina

### 7. Relatórios de Desempenho
- Relatórios por disciplina, professor ou turma
- Estatísticas de aprovação/reprovação
- Médias da turma e notas extremas

## Arquitetura

### Classes Principais

1. **Pessoa** (Classe Base)
   - Atributos comuns: nome, matrícula, CPF, contato
   - Método de validação de CPF

2. **Aluno** (Herda de Pessoa)
   - Atributos específicos: data de nascimento, turma
   - Métodos: calcular médias, frequência, verificar aprovação

3. **Professor** (Herda de Pessoa)
   - Atributos específicos: área de atuação, disciplinas
   - Métodos: lançar notas, registrar frequência, gerar relatórios

4. **Turma**
   - Agrupa alunos, disciplina, professor
   - Define turno, ano e semestre

5. **Disciplina**
   - Define matéria ou curso
   - Código e carga horária

6. **Frequencia**
   - Registra presença/ausência
   - Cálculo de percentual

### Sistema de Persistência

- **StorageManager**: Gerencia dados no localStorage
- **SistemaAcademico**: Classe principal que coordena todas as operações
- **App**: Interface e lógica de apresentação

## Como Usar

1. Abra o arquivo `index.html` em um navegador web
2. O sistema inicializará automaticamente com dados de exemplo
3. Navegue entre os módulos usando os botões no topo
4. Preencha os formulários para cadastrar dados
5. Use os filtros para consultar informações específicas

## Estrutura de Arquivos

```
projeto/
├── index.html          # Interface principal
├── styles.css          # Estilos com tema azul escuro
├── js/
│   ├── classes.js      # Classes do sistema
│   ├── storage.js      # Sistema de persistência
│   └── app.js          # Lógica da aplicação
└── README.md           # Documentação
```

## Tecnologias Utilizadas

- **HTML5**: Estrutura da interface
- **CSS3**: Estilos e tema azul escuro
- **JavaScript ES6+**: Lógica da aplicação
- **LocalStorage**: Persistência de dados

## Funcionalidades Futuras

- Edição de registros existentes
- Exportação de relatórios em PDF
- Sistema de autenticação
- Backup e restore de dados
- Notificações e alertas
- Gráficos e visualizações

## Desenvolvido com

- Design responsivo
- Validação de formulários
- Persistência local
- Arquitetura orientada a objetos
- Interface moderna e intuitiva

## Login de Administrador

Antes de acessar o sistema, será solicitado um login:
- **Usuário:** admin
- **Senha:** 1234

Opcionalmente, marque "Lembrar login" para ficar autenticado mesmo fechando e reabrindo o navegador.
Após login, o botão "Sair" permite encerrar a sessão e voltar ao login.
