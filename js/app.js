// Aplicação principal do Sistema Acadêmico
class App {
    constructor() {
        this.storage = new StorageManager();
        this.backup = new BackupManager(this.storage);
        this.sistema = new SistemaAcademico();
        this.moduloAtual = 'dashboard';
        this.init();
    }

    init() {
        this.carregarDados();
        this.configurarEventos();
        this.atualizarDashboard();
        this.carregarSelects();
        this.mostrarModulo('dashboard');
    }

    // Carregar dados do storage para o sistema
    carregarDados() {
        const dados = this.storage.carregarDados();
        
        // Carregar alunos
        this.sistema.alunos = dados.alunos || [];
        
        // Carregar professores
        this.sistema.professores = dados.professores || [];
        
        // Carregar turmas
        this.sistema.turmas = dados.turmas || [];
        
        // Carregar disciplinas
        this.sistema.disciplinas = dados.disciplinas || [];
        
        // Carregar frequências
        this.sistema.frequencias = dados.frequencias || [];

        // Debug: verificar se os dados foram carregados
        console.log('Dados carregados:', {
            alunos: this.sistema.alunos.length,
            professores: this.sistema.professores.length,
            turmas: this.sistema.turmas.length,
            disciplinas: this.sistema.disciplinas.length
        });

        // Se não há dados, inicializar com dados de exemplo
        if (!this.storage.temDados()) {
            console.log('Inicializando dados de exemplo...');
            this.storage.inicializarDadosExemplo();
            this.carregarDados(); // Recarregar após inicialização
        }
    }

    // Configurar eventos da interface
    configurarEventos() {
        // Navegação entre módulos
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modulo = e.target.dataset.module;
                this.mostrarModulo(modulo);
            });
        });

        // Formulário de cadastro de alunos
        document.getElementById('form-aluno').addEventListener('submit', (e) => {
            e.preventDefault();
            this.cadastrarAluno();
        });

        // Formulário de cadastro de professores
        document.getElementById('form-professor').addEventListener('submit', (e) => {
            e.preventDefault();
            this.cadastrarProfessor();
        });

        // Formulário de cadastro de turmas
        document.getElementById('form-turma').addEventListener('submit', (e) => {
            e.preventDefault();
            this.cadastrarTurma();
        });

        // Formulário de lançamento de notas
        document.getElementById('form-nota').addEventListener('submit', (e) => {
            e.preventDefault();
            this.lancarNota();
        });

        // Formulário de frequência
        document.getElementById('form-frequencia').addEventListener('submit', (e) => {
            e.preventDefault();
            this.registrarFrequencia();
        });

        // Filtros de consulta de notas
        document.getElementById('filtro-aluno').addEventListener('change', () => {
            this.filtrarNotas();
        });

        document.getElementById('filtro-disciplina-nota').addEventListener('change', () => {
            this.filtrarNotas();
        });

        document.getElementById('filtro-turma-nota').addEventListener('change', () => {
            this.filtrarNotas();
        });

        // Formulário de cadastro de disciplinas
        document.getElementById('form-disciplina').addEventListener('submit', (e) => {
            e.preventDefault();
            this.cadastrarDisciplina();
        });

        // Gerar relatório
        document.getElementById('gerar-relatorio').addEventListener('click', () => {
            this.gerarRelatorio();
        });

        // Funcionalidades de backup
        document.getElementById('download-backup').addEventListener('click', () => {
            this.downloadBackup();
        });

        document.getElementById('upload-backup-btn').addEventListener('click', () => {
            document.getElementById('upload-backup').click();
        });

        document.getElementById('upload-backup').addEventListener('change', (e) => {
            this.uploadBackup(e.target.files[0]);
        });

        document.getElementById('limpar-dados').addEventListener('click', () => {
            this.limparDados();
        });
    }

    // Mostrar módulo específico
    mostrarModulo(modulo) {
        // Esconder todos os módulos
        document.querySelectorAll('.module').forEach(m => {
            m.classList.remove('active');
        });

        // Remover classe active de todos os botões
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Mostrar módulo selecionado
        document.getElementById(modulo).classList.add('active');
        document.querySelector(`[data-module="${modulo}"]`).classList.add('active');

        this.moduloAtual = modulo;

        // Atualizar conteúdo específico do módulo
        switch (modulo) {
            case 'dashboard':
                this.atualizarDashboard();
                break;
            case 'alunos':
                this.atualizarListaAlunos();
                break;
            case 'professores':
                this.atualizarListaProfessores();
                break;
            case 'turmas':
                this.atualizarListaTurmas();
                // Garantir que os selects estão atualizados
                this.carregarSelectDisciplinas();
                this.carregarSelectProfessores();
                break;
            case 'notas':
                this.atualizarListaNotas();
                break;
            case 'frequencia':
                this.atualizarListaFrequencia();
                break;
            case 'relatorios':
                this.carregarFiltrosRelatorio();
                // Limpar resultado anterior
                document.getElementById('relatorio-resultado').innerHTML = '';
                break;
            case 'disciplinas':
                this.atualizarListaDisciplinas();
                break;
        }
    }

    // Atualizar dashboard
    atualizarDashboard() {
        const stats = this.storage.obterEstatisticas();
        document.getElementById('total-alunos').textContent = stats.totalAlunos;
        document.getElementById('total-professores').textContent = stats.totalProfessores;
        document.getElementById('total-turmas').textContent = stats.totalTurmas;
        document.getElementById('total-disciplinas').textContent = stats.totalDisciplinas;
        
        // Debug: verificar se os dados estão sendo carregados
        console.log('Dashboard atualizado:', stats);
    }

    // Carregar selects com dados
    carregarSelects() {
        this.carregarSelectTurmas();
        this.carregarSelectDisciplinas();
        this.carregarSelectProfessores();
        this.carregarSelectAlunos();
        
        // Debug: verificar se os selects foram carregados
        console.log('Selects carregados:', {
            disciplinas: this.storage.obterDisciplinas().length,
            professores: this.storage.obterProfessores().length,
            turmas: this.storage.obterTurmas().length,
            alunos: this.storage.obterAlunos().length
        });
    }


    carregarSelectDisciplinas() {
        const selects = ['disciplina-turma', 'disciplina-nota', 'disciplina-frequencia', 'filtro-disciplina', 'filtro-disciplina-nota', 'disciplinas-professor'];
        const disciplinas = this.storage.obterDisciplinas();
        
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                if (selectId === 'disciplinas-professor') {
                    select.innerHTML = '<option value="">Selecione disciplinas</option>';
                } else {
                    select.innerHTML = '<option value="">Selecione uma disciplina</option>';
                }
                disciplinas.forEach(disciplina => {
                    const option = document.createElement('option');
                    option.value = disciplina.id;
                    option.textContent = disciplina.nome;
                    select.appendChild(option);
                });
            }
        });
    }

    carregarSelectProfessores() {
        const selects = ['professor-turma', 'filtro-professor'];
        const professores = this.storage.obterProfessores();
        
        console.log('Carregando professores nos selects:', professores.length);
        
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                select.innerHTML = '<option value="">Selecione um professor</option>';
                professores.forEach(professor => {
                    const option = document.createElement('option');
                    option.value = professor.id;
                    option.textContent = professor.nome;
                    select.appendChild(option);
                });
                console.log(`Select ${selectId} populado com ${professores.length} professores`);
            } else {
                console.log(`Select ${selectId} não encontrado`);
            }
        });
    }

    carregarSelectAlunos() {
        const selects = ['aluno-nota', 'aluno-frequencia', 'filtro-aluno'];
        const alunos = this.storage.obterAlunos();
        
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                select.innerHTML = '<option value="">Selecione um aluno</option>';
                alunos.forEach(aluno => {
                    const option = document.createElement('option');
                    option.value = aluno.id;
                    option.textContent = aluno.nome;
                    select.appendChild(option);
                });
            }
        });
    }

    carregarSelectTurmas() {
        const selects = ['turma-aluno', 'filtro-turma', 'filtro-turma-nota'];
        const turmas = this.storage.obterTurmas();
        
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                select.innerHTML = '<option value="">Selecione uma turma</option>';
                turmas.forEach(turma => {
                    const option = document.createElement('option');
                    option.value = turma.id;
                    option.textContent = turma.nome;
                    select.appendChild(option);
                });
            }
        });
    }

    // Cadastrar aluno
    cadastrarAluno() {
        const nome = document.getElementById('nome-aluno').value;
        const matricula = document.getElementById('matricula-aluno').value;
        const cpf = document.getElementById('cpf-aluno').value;
        const nascimento = document.getElementById('nascimento-aluno').value;
        const contato = document.getElementById('contato-aluno').value;
        const turmaId = document.getElementById('turma-aluno').value;

        // Validar CPF
        const pessoa = new Pessoa(nome, matricula, cpf, contato);
        if (!pessoa.validarCPF(cpf)) {
            alert('CPF inválido!');
            return;
        }

        // Verificar se matrícula já existe
        const alunoExistente = this.storage.obterAlunos().find(a => a.matricula === matricula);
        if (alunoExistente) {
            alert('Matrícula já cadastrada!');
            return;
        }

        const aluno = new Aluno(nome, matricula, cpf, nascimento, contato, turmaId);
        
        if (this.storage.adicionarAluno(aluno)) {
            alert('Aluno cadastrado com sucesso!');
            document.getElementById('form-aluno').reset();
            this.atualizarListaAlunos();
            this.atualizarDashboard();
            this.carregarSelectAlunos();
        } else {
            alert('Erro ao cadastrar aluno!');
        }
    }

    // Cadastrar professor
    cadastrarProfessor() {
        const nome = document.getElementById('nome-professor').value;
        const matricula = document.getElementById('matricula-professor').value;
        const cpf = document.getElementById('cpf-professor').value;
        const area = document.getElementById('area-professor').value;
        const contato = document.getElementById('contato-professor').value;
        const disciplinas = Array.from(document.getElementById('disciplinas-professor').selectedOptions)
            .map(option => option.value)
            .filter(value => value);

        // Validar CPF
        const pessoa = new Pessoa(nome, matricula, cpf, contato);
        if (!pessoa.validarCPF(cpf)) {
            alert('CPF inválido!');
            return;
        }

        // Verificar se matrícula já existe
        const professorExistente = this.storage.obterProfessores().find(p => p.matricula === matricula);
        if (professorExistente) {
            alert('Matrícula já cadastrada!');
            return;
        }

        const professor = new Professor(nome, matricula, cpf, area, contato, disciplinas);
        
        if (this.storage.adicionarProfessor(professor)) {
            alert('Professor cadastrado com sucesso!');
            document.getElementById('form-professor').reset();
            this.atualizarListaProfessores();
            this.atualizarDashboard();
            this.carregarSelectProfessores(); // Atualizar selects de professores
        } else {
            alert('Erro ao cadastrar professor!');
        }
    }

    // Cadastrar turma
    cadastrarTurma() {
        const nome = document.getElementById('nome-turma').value;
        const disciplinaId = document.getElementById('disciplina-turma').value;
        const professorId = document.getElementById('professor-turma').value;
        const turno = document.getElementById('turno-turma').value;
        const ano = parseInt(document.getElementById('ano-turma').value);
        const semestre = parseInt(document.getElementById('semestre-turma').value);

        console.log('Dados da turma:', { nome, disciplinaId, professorId, turno, ano, semestre });

        // Verificar se todos os campos obrigatórios estão preenchidos
        if (!nome || !disciplinaId || !professorId || !turno || !ano || !semestre) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        // Verificar se o professor existe
        const professor = this.storage.obterProfessor(professorId);
        if (!professor) {
            alert('Professor selecionado não encontrado!');
            return;
        }

        // Verificar se a disciplina existe
        const disciplina = this.storage.obterDisciplina(disciplinaId);
        if (!disciplina) {
            alert('Disciplina selecionada não encontrada!');
            return;
        }

        const turma = new Turma(nome, disciplinaId, professorId, turno, ano, semestre);
        
        if (this.storage.adicionarTurma(turma)) {
            alert('Turma cadastrada com sucesso!');
            document.getElementById('form-turma').reset();
            this.atualizarListaTurmas();
            this.atualizarDashboard();
            this.carregarSelectTurmas();
        } else {
            alert('Erro ao cadastrar turma!');
        }
    }

    // Lançar nota
    lancarNota() {
        const alunoId = document.getElementById('aluno-nota').value;
        const disciplinaId = document.getElementById('disciplina-nota').value;
        const tipoAvaliacao = document.getElementById('tipo-avaliacao').value;
        const nota = parseFloat(document.getElementById('nota-valor').value);

        const notaObj = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            disciplinaId,
            tipoAvaliacao,
            nota,
            data: new Date().toISOString().split('T')[0]
        };

        if (this.storage.adicionarNota(alunoId, notaObj)) {
            alert('Nota lançada com sucesso!');
            document.getElementById('form-nota').reset();
            this.atualizarListaNotas();
        } else {
            alert('Erro ao lançar nota!');
        }
    }

    // Registrar frequência
    registrarFrequencia() {
        const alunoId = document.getElementById('aluno-frequencia').value;
        const disciplinaId = document.getElementById('disciplina-frequencia').value;
        const data = document.getElementById('data-frequencia').value;
        const presente = document.getElementById('presenca-frequencia').value === 'presente';

        const frequenciaObj = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            alunoId,
            disciplinaId,
            data,
            presente
        };

        if (this.storage.adicionarFrequencia(frequenciaObj)) {
            alert('Frequência registrada com sucesso!');
            document.getElementById('form-frequencia').reset();
            this.atualizarListaFrequencia();
        } else {
            alert('Erro ao registrar frequência!');
        }
    }

    // Atualizar lista de alunos
    atualizarListaAlunos() {
        const container = document.getElementById('lista-alunos');
        const alunos = this.storage.obterAlunos();
        
        container.innerHTML = '';
        
        alunos.forEach(aluno => {
            const turma = this.storage.obterTurma(aluno.turmaId);
            const turmaNome = turma ? turma.nome : 'Sem turma';
            
            const alunoDiv = document.createElement('div');
            alunoDiv.className = 'list-item';
            alunoDiv.innerHTML = `
                <h4>${aluno.nome}</h4>
                <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
                <p><strong>CPF:</strong> ${aluno.cpf}</p>
                <p><strong>Data de Nascimento:</strong> ${aluno.dataNascimento}</p>
                <p><strong>Contato:</strong> ${aluno.contato}</p>
                <p><strong>Turma:</strong> ${turmaNome}</p>
                <div class="actions">
                    <button class="btn btn-secondary" onclick="app.editarAluno('${aluno.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="app.removerAluno('${aluno.id}')">Remover</button>
                </div>
            `;
            container.appendChild(alunoDiv);
        });
    }

    // Atualizar lista de professores
    atualizarListaProfessores() {
        const container = document.getElementById('lista-professores');
        const professores = this.storage.obterProfessores();
        
        container.innerHTML = '';
        
        professores.forEach(professor => {
            const disciplinas = professor.disciplinas.map(id => {
                const disciplina = this.storage.obterDisciplina(id);
                return disciplina ? disciplina.nome : 'Disciplina não encontrada';
            }).join(', ');

            const professorDiv = document.createElement('div');
            professorDiv.className = 'list-item';
            professorDiv.innerHTML = `
                <h4>${professor.nome}</h4>
                <p><strong>Matrícula:</strong> ${professor.matricula}</p>
                <p><strong>CPF:</strong> ${professor.cpf}</p>
                <p><strong>Área de Atuação:</strong> ${professor.areaAtuacao}</p>
                <p><strong>Contato:</strong> ${professor.contato}</p>
                <p><strong>Disciplinas:</strong> ${disciplinas || 'Nenhuma disciplina'}</p>
                <div class="actions">
                    <button class="btn btn-secondary" onclick="app.editarProfessor('${professor.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="app.removerProfessor('${professor.id}')">Remover</button>
                </div>
            `;
            container.appendChild(professorDiv);
        });
    }

    // Atualizar lista de turmas
    atualizarListaTurmas() {
        const container = document.getElementById('lista-turmas');
        const turmas = this.storage.obterTurmas();
        
        container.innerHTML = '';
        
        turmas.forEach(turma => {
            const disciplina = this.storage.obterDisciplina(turma.disciplinaId);
            const professor = this.storage.obterProfessor(turma.professorId);
            
            const turmaDiv = document.createElement('div');
            turmaDiv.className = 'list-item';
            turmaDiv.innerHTML = `
                <h4>${turma.nome}</h4>
                <p><strong>Disciplina:</strong> ${disciplina ? disciplina.nome : 'Disciplina não encontrada'}</p>
                <p><strong>Professor:</strong> ${professor ? professor.nome : 'Professor não encontrado'}</p>
                <p><strong>Turno:</strong> ${turma.turno}</p>
                <p><strong>Ano:</strong> ${turma.ano}</p>
                <p><strong>Semestre:</strong> ${turma.semestre}</p>
                <p><strong>Total de Alunos:</strong> ${turma.alunos ? turma.alunos.length : 0}</p>
                <div class="actions">
                    <button class="btn btn-secondary" onclick="app.editarTurma('${turma.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="app.removerTurma('${turma.id}')">Remover</button>
                </div>
            `;
            container.appendChild(turmaDiv);
        });
    }

    // Atualizar lista de notas
    atualizarListaNotas() {
        const container = document.getElementById('lista-notas');
        const alunos = this.storage.obterAlunos();
        const disciplinas = this.storage.obterDisciplinas();
        
        container.innerHTML = '';
        
        alunos.forEach(aluno => {
            if (aluno.notas && aluno.notas.length > 0) {
                aluno.notas.forEach(nota => {
                    const disciplina = disciplinas.find(d => d.id === nota.disciplinaId);
                    const disciplinaNome = disciplina ? disciplina.nome : 'Disciplina não encontrada';
                    
                    const notaDiv = document.createElement('div');
                    notaDiv.className = 'list-item';
                    notaDiv.innerHTML = `
                        <h4>${aluno.nome}</h4>
                        <p><strong>Disciplina:</strong> ${disciplinaNome}</p>
                        <p><strong>Tipo:</strong> ${nota.tipoAvaliacao}</p>
                        <p><strong>Nota:</strong> ${nota.nota}</p>
                        <p><strong>Data:</strong> ${nota.data}</p>
                    `;
                    container.appendChild(notaDiv);
                });
            }
        });
    }

    // Atualizar lista de frequência
    atualizarListaFrequencia() {
        const container = document.getElementById('lista-frequencia');
        const frequencias = this.storage.obterFrequencias();
        const alunos = this.storage.obterAlunos();
        const disciplinas = this.storage.obterDisciplinas();
        
        container.innerHTML = '';
        
        frequencias.forEach(frequencia => {
            const aluno = alunos.find(a => a.id === frequencia.alunoId);
            const disciplina = disciplinas.find(d => d.id === frequencia.disciplinaId);
            
            const frequenciaDiv = document.createElement('div');
            frequenciaDiv.className = 'list-item';
            frequenciaDiv.innerHTML = `
                <h4>${aluno ? aluno.nome : 'Aluno não encontrado'}</h4>
                <p><strong>Disciplina:</strong> ${disciplina ? disciplina.nome : 'Disciplina não encontrada'}</p>
                <p><strong>Data:</strong> ${frequencia.data}</p>
                <p><strong>Status:</strong> ${frequencia.presente ? 'Presente' : 'Ausente'}</p>
            `;
            container.appendChild(frequenciaDiv);
        });
    }

    // Filtrar notas por aluno, disciplina e turma
    filtrarNotas() {
        const alunoId = document.getElementById('filtro-aluno').value;
        const disciplinaId = document.getElementById('filtro-disciplina-nota').value;
        const turmaId = document.getElementById('filtro-turma-nota').value;
        const container = document.getElementById('lista-notas');
        const alunos = this.storage.obterAlunos();
        const disciplinas = this.storage.obterDisciplinas();
        const turmas = this.storage.obterTurmas();
        
        container.innerHTML = '';
        
        let alunosFiltrados = alunos;
        
        // Filtrar por aluno
        if (alunoId) {
            alunosFiltrados = alunosFiltrados.filter(a => a.id === alunoId);
        }
        
        // Filtrar por turma
        if (turmaId) {
            alunosFiltrados = alunosFiltrados.filter(a => a.turmaId === turmaId);
        }
        
        alunosFiltrados.forEach(aluno => {
            if (aluno.notas && aluno.notas.length > 0) {
                let notasFiltradas = aluno.notas;
                
                // Filtrar por disciplina
                if (disciplinaId) {
                    notasFiltradas = notasFiltradas.filter(nota => nota.disciplinaId === disciplinaId);
                }
                
                notasFiltradas.forEach(nota => {
                    const disciplina = disciplinas.find(d => d.id === nota.disciplinaId);
                    const disciplinaNome = disciplina ? disciplina.nome : 'Disciplina não encontrada';
                    const turma = turmas.find(t => t.id === aluno.turmaId);
                    const turmaNome = turma ? turma.nome : 'Sem turma';
                    
                    // Calcular média da disciplina
                    const mediaDisciplina = aluno.calcularMediaDisciplina(nota.disciplinaId);
                    const frequenciaDisciplina = aluno.calcularFrequenciaDisciplina(nota.disciplinaId);
                    const aprovado = aluno.verificarAprovacao(nota.disciplinaId);
                    
                    const notaDiv = document.createElement('div');
                    notaDiv.className = 'list-item';
                    notaDiv.innerHTML = `
                        <h4>${aluno.nome}</h4>
                        <p><strong>Disciplina:</strong> ${disciplinaNome}</p>
                        <p><strong>Turma:</strong> ${turmaNome}</p>
                        <p><strong>Tipo:</strong> ${nota.tipoAvaliacao}</p>
                        <p><strong>Nota:</strong> ${nota.nota}</p>
                        <p><strong>Data:</strong> ${nota.data}</p>
                        <p><strong>Média da Disciplina:</strong> ${mediaDisciplina}</p>
                        <p><strong>Frequência:</strong> ${frequenciaDisciplina}%</p>
                        <p><strong>Status:</strong> ${aprovado ? 'Aprovado' : 'Reprovado'}</p>
                    `;
                    container.appendChild(notaDiv);
                });
            }
        });
    }

    // Carregar filtros do relatório
    carregarFiltrosRelatorio() {
        // Carregar todos os selects
        this.carregarSelectDisciplinas();
        this.carregarSelectProfessores();
        this.carregarSelectTurmas();
        
        // Debug: verificar se os elementos existem
        console.log('Carregando filtros do relatório...');
        console.log('Disciplinas disponíveis:', this.storage.obterDisciplinas().length);
        console.log('Professores disponíveis:', this.storage.obterProfessores().length);
        console.log('Turmas disponíveis:', this.storage.obterTurmas().length);
        
        // Garantir que os selects estão populados
        setTimeout(() => {
            this.carregarSelectDisciplinas();
            this.carregarSelectProfessores();
            this.carregarSelectTurmas();
        }, 200);
    }

    // Gerar relatório
    gerarRelatorio() {
        const disciplinaId = document.getElementById('filtro-disciplina').value;
        const professorId = document.getElementById('filtro-professor').value;
        const turmaId = document.getElementById('filtro-turma').value;
        
        const container = document.getElementById('relatorio-resultado');
        container.innerHTML = '';
        
        // Debug: verificar se os elementos existem
        console.log('Filtros selecionados:', { disciplinaId, professorId, turmaId });
        
        // Verificar se há dados para gerar relatório
        if (!disciplinaId && !professorId && !turmaId) {
            container.innerHTML = '<div class="list-item"><p>Selecione pelo menos um filtro para gerar o relatório.</p></div>';
            return;
        }
        
        // Filtrar dados baseado nos filtros
        let turmas = this.storage.obterTurmas();
        let disciplinas = this.storage.obterDisciplinas();
        let professores = this.storage.obterProfessores();
        
        if (turmaId) {
            turmas = turmas.filter(t => t.id === turmaId);
        }
        
        if (disciplinaId) {
            turmas = turmas.filter(t => t.disciplinaId === disciplinaId);
        }
        
        if (professorId) {
            turmas = turmas.filter(t => t.professorId === professorId);
        }
        
        if (turmas.length === 0) {
            container.innerHTML = '<div class="list-item"><p>Nenhuma turma encontrada com os filtros selecionados.</p></div>';
            return;
        }
        
        // Gerar relatório para cada turma
        turmas.forEach(turma => {
            const disciplina = disciplinas.find(d => d.id === turma.disciplinaId);
            const professor = professores.find(p => p.id === turma.professorId);
            
            // Calcular estatísticas da turma
            const alunos = turma.alunos || [];
            const alunosComNotas = alunos.filter(a => a.notas && a.notas.some(n => n.disciplinaId === turma.disciplinaId));
            
            let mediaTurma = 0;
            let notaMaisAlta = 0;
            let notaMaisBaixa = 10;
            let aprovados = 0;
            let reprovados = 0;
            
            if (alunosComNotas.length > 0) {
                const medias = alunosComNotas.map(aluno => parseFloat(aluno.calcularMediaDisciplina(turma.disciplinaId)));
                const notas = alunosComNotas.flatMap(aluno => 
                    aluno.notas.filter(nota => nota.disciplinaId === turma.disciplinaId).map(nota => nota.nota)
                );
                
                mediaTurma = medias.reduce((a, b) => a + b, 0) / medias.length;
                notaMaisAlta = Math.max(...notas);
                notaMaisBaixa = Math.min(...notas);
                
                aprovados = alunosComNotas.filter(aluno => aluno.verificarAprovacao(turma.disciplinaId)).length;
                reprovados = alunosComNotas.length - aprovados;
            }
            
            const relatorioDiv = document.createElement('div');
            relatorioDiv.className = 'relatorio-item';
            relatorioDiv.innerHTML = `
                <h4>${turma.nome}</h4>
                <p><strong>Disciplina:</strong> ${disciplina ? disciplina.nome : 'N/A'}</p>
                <p><strong>Professor:</strong> ${professor ? professor.nome : 'N/A'}</p>
                <p><strong>Turno:</strong> ${turma.turno}</p>
                <p><strong>Ano/Semestre:</strong> ${turma.ano}/${turma.semestre}</p>
                <div class="stats">
                    <div class="stat-item">
                        <div class="label">Total de Alunos</div>
                        <div class="value">${alunos.length}</div>
                    </div>
                    <div class="stat-item">
                        <div class="label">Alunos com Notas</div>
                        <div class="value">${alunosComNotas.length}</div>
                    </div>
                    <div class="stat-item">
                        <div class="label">Média da Turma</div>
                        <div class="value">${mediaTurma.toFixed(2)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="label">Nota Mais Alta</div>
                        <div class="value">${notaMaisAlta.toFixed(2)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="label">Nota Mais Baixa</div>
                        <div class="value">${notaMaisBaixa.toFixed(2)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="label">Aprovados</div>
                        <div class="value">${aprovados}</div>
                    </div>
                    <div class="stat-item">
                        <div class="label">Reprovados</div>
                        <div class="value">${reprovados}</div>
                    </div>
                    <div class="stat-item">
                        <div class="label">% Aprovação</div>
                        <div class="value">${alunosComNotas.length > 0 ? ((aprovados / alunosComNotas.length) * 100).toFixed(2) : 0}%</div>
                    </div>
                </div>
            `;
            container.appendChild(relatorioDiv);
        });
    }

    // Métodos de edição e remoção (simplificados)
    editarAluno(id) {
        alert('Funcionalidade de edição será implementada em versão futura');
    }

    removerAluno(id) {
        if (confirm('Tem certeza que deseja remover este aluno?')) {
            if (this.storage.removerAluno(id)) {
                alert('Aluno removido com sucesso!');
                this.atualizarListaAlunos();
                this.atualizarDashboard();
            } else {
                alert('Erro ao remover aluno!');
            }
        }
    }

    editarProfessor(id) {
        alert('Funcionalidade de edição será implementada em versão futura');
    }

    removerProfessor(id) {
        if (confirm('Tem certeza que deseja remover este professor?')) {
            if (this.storage.removerProfessor(id)) {
                alert('Professor removido com sucesso!');
                this.atualizarListaProfessores();
                this.atualizarDashboard();
            } else {
                alert('Erro ao remover professor!');
            }
        }
    }

    editarTurma(id) {
        alert('Funcionalidade de edição será implementada em versão futura');
    }

    removerTurma(id) {
        if (confirm('Tem certeza que deseja remover esta turma?')) {
            if (this.storage.removerTurma(id)) {
                alert('Turma removida com sucesso!');
                this.atualizarListaTurmas();
                this.atualizarDashboard();
            } else {
                alert('Erro ao remover turma!');
            }
        }
    }

    // Métodos de backup
    downloadBackup() {
        try {
            this.backup.downloadBackup();
            this.mostrarStatusBackup('Backup gerado e baixado com sucesso!', 'success');
        } catch (error) {
            this.mostrarStatusBackup('Erro ao gerar backup: ' + error.message, 'error');
        }
    }

    async uploadBackup(file) {
        if (!file) return;

        try {
            const resultado = await this.backup.uploadBackup(file);
            this.mostrarStatusBackup(resultado, 'success');
            
            // Recarregar dados e atualizar interface
            this.carregarDados();
            this.atualizarDashboard();
            this.carregarSelects();
            
            // Atualizar módulo atual se necessário
            if (this.moduloAtual === 'alunos') this.atualizarListaAlunos();
            if (this.moduloAtual === 'professores') this.atualizarListaProfessores();
            if (this.moduloAtual === 'turmas') this.atualizarListaTurmas();
            if (this.moduloAtual === 'notas') this.atualizarListaNotas();
            if (this.moduloAtual === 'frequencia') this.atualizarListaFrequencia();
            
        } catch (error) {
            this.mostrarStatusBackup('Erro ao restaurar backup: ' + error, 'error');
        }
    }

    limparDados() {
        if (confirm('Tem certeza que deseja limpar TODOS os dados? Esta ação não pode ser desfeita!')) {
            if (this.storage.limparDados()) {
                this.mostrarStatusBackup('Todos os dados foram removidos!', 'warning');
                this.carregarDados();
                this.atualizarDashboard();
                this.carregarSelects();
            } else {
                this.mostrarStatusBackup('Erro ao limpar dados!', 'error');
            }
        }
    }

    mostrarStatusBackup(mensagem, tipo) {
        const statusDiv = document.getElementById('backup-status');
        statusDiv.textContent = mensagem;
        statusDiv.className = `backup-status ${tipo}`;
        
        // Limpar status após 5 segundos
        setTimeout(() => {
            statusDiv.textContent = '';
            statusDiv.className = 'backup-status';
        }, 5000);
    }

    // Cadastrar disciplina
    cadastrarDisciplina() {
        const nome = document.getElementById('nome-disciplina').value;
        const codigo = document.getElementById('codigo-disciplina').value;
        const carga = parseInt(document.getElementById('carga-disciplina').value);

        // Verificar se código já existe
        const disciplinaExistente = this.storage.obterDisciplinas().find(d => d.codigo === codigo);
        if (disciplinaExistente) {
            alert('Código da disciplina já cadastrado!');
            return;
        }

        const disciplina = new Disciplina(nome, codigo, carga);
        
        if (this.storage.adicionarDisciplina(disciplina)) {
            alert('Disciplina cadastrada com sucesso!');
            document.getElementById('form-disciplina').reset();
            this.atualizarListaDisciplinas();
            this.atualizarDashboard();
            this.carregarSelectDisciplinas();
            
            // Atualizar também os selects de professores
            this.carregarSelectDisciplinas();
        } else {
            alert('Erro ao cadastrar disciplina!');
        }
    }

    // Atualizar lista de disciplinas
    atualizarListaDisciplinas() {
        const container = document.getElementById('lista-disciplinas');
        const disciplinas = this.storage.obterDisciplinas();
        
        container.innerHTML = '';
        
        disciplinas.forEach(disciplina => {
            const disciplinaDiv = document.createElement('div');
            disciplinaDiv.className = 'list-item';
            disciplinaDiv.innerHTML = `
                <h4>${disciplina.nome}</h4>
                <p><strong>Código:</strong> ${disciplina.codigo}</p>
                <p><strong>Carga Horária:</strong> ${disciplina.cargaHoraria} horas</p>
                <div class="actions">
                    <button class="btn btn-secondary" onclick="app.editarDisciplina('${disciplina.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="app.removerDisciplina('${disciplina.id}')">Remover</button>
                </div>
            `;
            container.appendChild(disciplinaDiv);
        });
    }

    // Métodos de edição e remoção para disciplinas
    editarDisciplina(id) {
        alert('Funcionalidade de edição será implementada em versão futura');
    }

    removerDisciplina(id) {
        if (confirm('Tem certeza que deseja remover esta disciplina?')) {
            if (this.storage.removerDisciplina(id)) {
                alert('Disciplina removida com sucesso!');
                this.atualizarListaDisciplinas();
                this.atualizarDashboard();
                this.carregarSelectDisciplinas();
            } else {
                alert('Erro ao remover disciplina!');
            }
        }
    }
}

// LOGIN DE ADMIN (Refatorado para garantir fluxo correto)
const LOGIN_USER = "admin";
const LOGIN_PASS = "1234";
const LOGIN_LS_KEY = "sessao_admin_logada";

function estaAutenticado() {
    return (
        localStorage.getItem(LOGIN_LS_KEY) === "1" ||
        sessionStorage.getItem(LOGIN_LS_KEY) === "1"
    );
}

function autenticarAdmin(user, pass, lembrar) {
    if (user === LOGIN_USER && pass === LOGIN_PASS) {
        if (lembrar) {
            localStorage.setItem(LOGIN_LS_KEY, "1");
            sessionStorage.removeItem(LOGIN_LS_KEY);
        } else {
            sessionStorage.setItem(LOGIN_LS_KEY, "1");
            localStorage.removeItem(LOGIN_LS_KEY);
        }
        return true;
    }
    return false;
}

function logoutAdmin() {
    localStorage.removeItem(LOGIN_LS_KEY);
    sessionStorage.removeItem(LOGIN_LS_KEY);
    aplicarEstadoAutenticacao(false);
    destruirApp();
}

function aplicarEstadoAutenticacao(autenticado) {
    if (autenticado || estaAutenticado()) {
        document.body.classList.add("login-autenticado");
        document.body.classList.remove("login-nao-autenticado");
    } else {
        document.body.classList.remove("login-autenticado");
        document.body.classList.add("login-nao-autenticado");
    }
}

function inicializarApp() {
    if (!window.app) {
        window.app = new App();
    }
}

function destruirApp() {
    if (window.app) {
        if (window.app.sistema) {
            window.app.sistema = null;
        }
        window.app = null;
    }
}

window.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const inputUser = document.getElementById("login-usuario");
    const inputPass = document.getElementById("login-senha");
    const inputLembrar = document.getElementById("lembrar-login");
    const erroArea = document.getElementById("login-erro");

    // Função para mostrar a tela de login
    function mostrarLogin() {
        aplicarEstadoAutenticacao(false);
        destruirApp();
        if (erroArea) { erroArea.textContent = ""; erroArea.style.display = "none"; }
        if (inputPass) inputPass.value = "";
        if (inputUser) inputUser.value = "";
    }

    // Função para prosseguir ao sistema
    function entrarSistema() {
        aplicarEstadoAutenticacao(true);
        setTimeout(() => {
            inicializarApp();
            // Foco no dashboard, corrige navegação
            window.location.hash = "";
        }, 90);
    }

    // Inicialização padrão conforme sessão
    if (estaAutenticado()) {
        entrarSistema();
    } else {
        mostrarLogin();
    }

    // Handler submit login
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const user = inputUser.value.trim();
            const pass = inputPass.value;
            const lembrar = inputLembrar.checked;
            if (autenticarAdmin(user, pass, lembrar)) {
                erroArea.textContent = "";
                erroArea.style.display = "none";
                entrarSistema();
            } else {
                erroArea.textContent = "Usuário ou senha inválidos!";
                erroArea.style.display = "block";
                if (inputPass) inputPass.value = "";
            }
        });
    }

    // Botão de logout no menu sempre que app for inicializado
    function adicionarBotaoLogout() {
        if (document.getElementById("btn-logout-adm")) return;
        const logoutBtn = document.createElement("button");
        logoutBtn.textContent = "Sair";
        logoutBtn.className = "btn btn-secondary";
        logoutBtn.style.marginLeft = "16px";
        logoutBtn.type = "button";
        logoutBtn.id = "btn-logout-adm";
        logoutBtn.onclick = () => {
            logoutAdmin();
            mostrarLogin();
        };
        // Adiciona botão de logout ao final do menu
        setTimeout(() => {
            const headerNav = document.querySelector(".nav");
            if (headerNav && !document.getElementById("btn-logout-adm")) {
                headerNav.appendChild(logoutBtn);
            }
        }, 300);
    }
    // Tenta adicionar o botão a cada inicialização do App
    setInterval(() => {
        if (window.app && estaAutenticado()) adicionarBotaoLogout();
    }, 1200);
});
