# Demonstração do Sistema de Gestão Acadêmica

## Como Usar o Sistema

### 1. Acessando o Sistema
1. Abra o arquivo `index.html` em seu navegador
2. O sistema inicializará automaticamente com dados de exemplo
3. Você verá o dashboard com estatísticas gerais

### 2. Navegação
- Use os botões no topo para navegar entre os módulos
- Cada módulo tem funcionalidades específicas
- O tema azul escuro proporciona uma experiência visual agradável

### 3. Módulos Disponíveis

#### Dashboard
- Visualiza estatísticas gerais do sistema
- Mostra total de alunos, professores, turmas e disciplinas
- Atualiza automaticamente conforme dados são adicionados

#### Cadastro de Alunos
- **Formulário**: Preencha nome, matrícula, CPF, data de nascimento, contato
- **Validação**: CPF é validado automaticamente
- **Turma**: Selecione uma turma existente
- **Lista**: Visualize todos os alunos cadastrados

#### Cadastro de Professores
- **Formulário**: Preencha dados pessoais e área de atuação
- **Disciplinas**: Selecione múltiplas disciplinas
- **Validação**: CPF e matrícula únicos
- **Lista**: Visualize todos os professores

#### Cadastro de Turmas
- **Formulário**: Defina nome, disciplina, professor, turno, ano e semestre
- **Associação**: Conecta disciplina, professor e alunos
- **Lista**: Visualize todas as turmas com estatísticas

#### Lançamento de Notas
- **Lançamento**: Selecione aluno, disciplina e tipo de avaliação
- **Nota**: Insira valor de 0 a 10
- **Consulta**: Filtre notas por aluno
- **Cálculo**: Médias são calculadas automaticamente

#### Controle de Frequência
- **Registro**: Selecione aluno, disciplina e data
- **Status**: Marque presente ou ausente
- **Cálculo**: Percentual de frequência automático
- **Lista**: Visualize todos os registros

#### Relatórios
- **Filtros**: Por disciplina, professor ou turma
- **Estatísticas**: Médias, aprovações, frequência
- **Backup**: Download e upload de dados
- **Limpeza**: Remover todos os dados

### 4. Funcionalidades Avançadas

#### Backup e Restore
- **Download**: Gera arquivo JSON com todos os dados
- **Upload**: Restaura dados de arquivo JSON
- **Limpeza**: Remove todos os dados (cuidado!)

#### Validações
- **CPF**: Validação automática de CPF
- **Matrícula**: Verificação de unicidade
- **Campos**: Validação de campos obrigatórios

#### Cálculos Automáticos
- **Médias**: Por disciplina e geral
- **Frequência**: Percentual por disciplina
- **Aprovação**: Baseada em média ≥ 7 e frequência ≥ 75%

### 5. Dados de Exemplo

O sistema vem com dados de exemplo:
- **3 Disciplinas**: Matemática, Português, História
- **3 Professores**: Um para cada disciplina
- **3 Turmas**: Uma para cada disciplina
- **3 Alunos**: Distribuídos nas turmas

### 6. Persistência de Dados

- **LocalStorage**: Dados salvos no navegador
- **JSON**: Formato de armazenamento
- **Automático**: Salvamento em tempo real
- **Backup**: Exportação e importação

### 7. Dicas de Uso

1. **Ordem de Cadastro**: Disciplinas → Professores → Turmas → Alunos
2. **Validação**: Sempre verifique se os dados estão corretos
3. **Backup**: Faça backup regular dos dados
4. **Navegação**: Use os botões para alternar entre módulos
5. **Filtros**: Use filtros para encontrar informações específicas

### 8. Solução de Problemas

#### Dados não aparecem
- Verifique se os dados foram salvos
- Recarregue a página
- Verifique o console do navegador

#### Erro de validação
- Verifique se todos os campos obrigatórios estão preenchidos
- Confirme se o CPF está correto
- Verifique se a matrícula não está duplicada

#### Problemas de backup
- Verifique se o arquivo JSON está correto
- Confirme se o formato do arquivo é válido
- Tente fazer um novo backup

### 9. Recursos Técnicos

- **Responsivo**: Funciona em desktop e mobile
- **Tema**: Interface azul escuro moderna
- **Performance**: Otimizado para grandes volumes de dados
- **Compatibilidade**: Funciona em todos os navegadores modernos

### 10. Próximas Funcionalidades

- Edição de registros existentes
- Gráficos e visualizações
- Exportação de relatórios em PDF
- Sistema de autenticação
- Notificações e alertas
- Integração com APIs externas
