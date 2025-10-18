# Instalação e Configuração do Sistema de Gestão Acadêmica

## Requisitos do Sistema

### Navegador
- **Chrome**: Versão 80 ou superior
- **Firefox**: Versão 75 ou superior
- **Safari**: Versão 13 ou superior
- **Edge**: Versão 80 ou superior

### Sistema Operacional
- **Windows**: 10 ou superior
- **macOS**: 10.15 ou superior
- **Linux**: Ubuntu 18.04 ou superior

### Espaço em Disco
- **Mínimo**: 10 MB
- **Recomendado**: 50 MB

## Instalação

### Método 1: Download Direto
1. Baixe todos os arquivos do projeto
2. Extraia em uma pasta local
3. Abra o arquivo `index.html` no navegador

### Método 2: Clone do Repositório
```bash
git clone [URL_DO_REPOSITORIO]
cd sistema-gestao-academica
```

### Método 3: Servidor Local
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

## Configuração

### Configurações Básicas
1. Abra o arquivo `js/config.js`
2. Modifique as configurações conforme necessário
3. Salve o arquivo

### Configurações Disponíveis

#### Validação
```javascript
validacao: {
    cpf: {
        habilitado: true,
        mensagem: 'CPF inválido!'
    },
    matricula: {
        habilitado: true,
        mensagem: 'Matrícula já cadastrada!'
    }
}
```

#### Notas
```javascript
notas: {
    valorMinimo: 0,
    valorMaximo: 10,
    aprovacao: {
        mediaMinima: 7.0,
        frequenciaMinima: 75.0
    }
}
```

#### Interface
```javascript
interface: {
    tema: 'azul-escuro',
    animacoes: true,
    notificacoes: true
}
```

## Primeiro Uso

### 1. Inicialização
- Abra o sistema no navegador
- Os dados de exemplo serão carregados automaticamente
- Navegue pelo dashboard para ver as estatísticas

### 2. Dados de Exemplo
O sistema inclui:
- **3 Disciplinas**: Matemática, Português, História
- **3 Professores**: Um para cada disciplina
- **3 Turmas**: Uma para cada disciplina
- **3 Alunos**: Distribuídos nas turmas

### 3. Personalização
- Remova os dados de exemplo se necessário
- Configure as disciplinas conforme sua necessidade
- Ajuste as configurações no arquivo `config.js`

## Estrutura de Arquivos

```
sistema-gestao-academica/
├── index.html              # Interface principal
├── styles.css              # Estilos CSS
├── js/
│   ├── config.js           # Configurações
│   ├── classes.js          # Classes do sistema
│   ├── storage.js          # Persistência de dados
│   ├── backup.js           # Sistema de backup
│   └── app.js              # Lógica da aplicação
├── README.md               # Documentação principal
├── DEMO.md                 # Guia de demonstração
└── INSTALACAO.md           # Este arquivo
```

## Backup e Restore

### Backup Automático
- Os dados são salvos automaticamente no localStorage
- Backup manual disponível no módulo de relatórios
- Exportação em formato JSON

### Restore
1. Acesse o módulo de relatórios
2. Clique em "Upload Backup"
3. Selecione o arquivo JSON
4. Confirme a restauração

### Limpeza de Dados
1. Acesse o módulo de relatórios
2. Clique em "Limpar Todos os Dados"
3. Confirme a ação
4. **Atenção**: Esta ação não pode ser desfeita!

## Solução de Problemas

### Problema: Dados não aparecem
**Solução:**
1. Verifique se o JavaScript está habilitado
2. Limpe o cache do navegador
3. Verifique o console para erros

### Problema: Erro de validação
**Solução:**
1. Verifique se todos os campos estão preenchidos
2. Confirme se o CPF está correto
3. Verifique se a matrícula não está duplicada

### Problema: Backup não funciona
**Solução:**
1. Verifique se o arquivo JSON está correto
2. Confirme se o formato é válido
3. Tente fazer um novo backup

### Problema: Performance lenta
**Solução:**
1. Limpe dados antigos
2. Verifique a configuração de performance
3. Use filtros para reduzir dados exibidos

## Configurações Avançadas

### Performance
```javascript
performance: {
    cache: true,
    lazyLoading: true,
    debounce: 300,
    maxRegistros: 1000
}
```

### Desenvolvimento
```javascript
desenvolvimento: {
    debug: false,
    logs: true,
    validacaoExtra: true
}
```

### Relatórios
```javascript
relatorios: {
    formatos: ['json', 'csv'],
    incluirEstatisticas: true,
    filtrosAvancados: true
}
```

## Segurança

### Dados Locais
- Todos os dados ficam no navegador
- Não há transmissão para servidores externos
- Backup local em formato JSON

### Validação
- Validação de CPF
- Verificação de matrículas únicas
- Validação de campos obrigatórios

### Backup
- Exportação segura em JSON
- Importação com validação
- Limpeza de dados órfãos

## Atualizações

### Atualização Manual
1. Faça backup dos dados atuais
2. Substitua os arquivos do sistema
3. Restaure os dados do backup
4. Verifique se tudo está funcionando

### Atualização Automática
- O sistema verifica atualizações automaticamente
- Notificações de novas versões
- Backup automático antes da atualização

## Suporte

### Documentação
- `README.md`: Documentação principal
- `DEMO.md`: Guia de demonstração
- `INSTALACAO.md`: Este arquivo

### Logs
- Console do navegador para erros
- Logs de operações no sistema
- Histórico de backup e restore

### Configuração
- Arquivo `config.js` para personalizações
- Validação de configurações
- Reset para configurações padrão

## Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais e comerciais.

## Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Implemente as mudanças
4. Teste thoroughly
5. Submeta um pull request

## Contato

Para suporte técnico ou dúvidas:
- Email: [seu-email@exemplo.com]
- GitHub: [seu-usuario/sistema-gestao-academica]
- Documentação: [link-para-docs]
