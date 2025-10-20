// Sistema de persistência em JSON
class StorageManager {
    constructor() {
        this.storageKey = 'sistema_academico';
        this.data = this.carregarDados();
    }

    // Carregar dados do localStorage
    carregarDados() {
        try {
            const dados = localStorage.getItem(this.storageKey);
            if (dados) {
                return JSON.parse(dados);
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
        
        // Retorna estrutura vazia se não houver dados
        return {
            alunos: [],
            professores: [],
            turmas: [],
            disciplinas: [],
            frequencias: [],
            ultimaAtualizacao: new Date().toISOString()
        };
    }

    // Salvar dados no localStorage
    salvarDados() {
        try {
            this.data.ultimaAtualizacao = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
            return true;
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            return false;
        }
    }

    // Métodos para Alunos
    adicionarAluno(aluno) {
        this.data.alunos.push(aluno);
        return this.salvarDados();
    }

    obterAlunos() {
        return this.data.alunos;
    }

    obterAluno(id) {
        return this.data.alunos.find(aluno => aluno.id === id);
    }

    atualizarAluno(id, dadosAtualizados) {
        const index = this.data.alunos.findIndex(aluno => aluno.id === id);
        if (index !== -1) {
            this.data.alunos[index] = { ...this.data.alunos[index], ...dadosAtualizados };
            return this.salvarDados();
        }
        return false;
    }

    removerAluno(id) {
        const index = this.data.alunos.findIndex(aluno => aluno.id === id);
        if (index !== -1) {
            this.data.alunos.splice(index, 1);
            return this.salvarDados();
        }
        return false;
    }

    // Métodos para Professores
    adicionarProfessor(professor) {
        this.data.professores.push(professor);
        return this.salvarDados();
    }

    obterProfessores() {
        return this.data.professores;
    }

    obterProfessor(id) {
        return this.data.professores.find(professor => professor.id === id);
    }

    atualizarProfessor(id, dadosAtualizados) {
        const index = this.data.professores.findIndex(professor => professor.id === id);
        if (index !== -1) {
            this.data.professores[index] = { ...this.data.professores[index], ...dadosAtualizados };
            return this.salvarDados();
        }
        return false;
    }

    removerProfessor(id) {
        const index = this.data.professores.findIndex(professor => professor.id === id);
        if (index !== -1) {
            this.data.professores.splice(index, 1);
            return this.salvarDados();
        }
        return false;
    }

    // Métodos para Turmas
    adicionarTurma(turma) {
        this.data.turmas.push(turma);
        return this.salvarDados();
    }

    obterTurmas() {
        return this.data.turmas;
    }

    obterTurma(id) {
        return this.data.turmas.find(turma => turma.id === id);
    }

    atualizarTurma(id, dadosAtualizados) {
        const index = this.data.turmas.findIndex(turma => turma.id === id);
        if (index !== -1) {
            this.data.turmas[index] = { ...this.data.turmas[index], ...dadosAtualizados };
            return this.salvarDados();
        }
        return false;
    }

    removerTurma(id) {
        const index = this.data.turmas.findIndex(turma => turma.id === id);
        if (index !== -1) {
            this.data.turmas.splice(index, 1);
            return this.salvarDados();
        }
        return false;
    }

    // Métodos para Disciplinas
    adicionarDisciplina(disciplina) {
        this.data.disciplinas.push(disciplina);
        return this.salvarDados();
    }

    obterDisciplinas() {
        return this.data.disciplinas;
    }

    obterDisciplina(id) {
        return this.data.disciplinas.find(disciplina => disciplina.id === id);
    }

    atualizarDisciplina(id, dadosAtualizados) {
        const index = this.data.disciplinas.findIndex(disciplina => disciplina.id === id);
        if (index !== -1) {
            this.data.disciplinas[index] = { ...this.data.disciplinas[index], ...dadosAtualizados };
            return this.salvarDados();
        }
        return false;
    }

    removerDisciplina(id) {
        const index = this.data.disciplinas.findIndex(disciplina => disciplina.id === id);
        if (index !== -1) {
            this.data.disciplinas.splice(index, 1);
            return this.salvarDados();
        }
        return false;
    }

    // Métodos para Frequências
    adicionarFrequencia(frequencia) {
        this.data.frequencias.push(frequencia);
        return this.salvarDados();
    }

    obterFrequencias() {
        return this.data.frequencias;
    }

    obterFrequencia(id) {
        return this.data.frequencias.find(frequencia => frequencia.id === id);
    }

    atualizarFrequencia(id, dadosAtualizados) {
        const index = this.data.frequencias.findIndex(frequencia => frequencia.id === id);
        if (index !== -1) {
            this.data.frequencias[index] = { ...this.data.frequencias[index], ...dadosAtualizados };
            return this.salvarDados();
        }
        return false;
    }

    removerFrequencia(id) {
        const index = this.data.frequencias.findIndex(frequencia => frequencia.id === id);
        if (index !== -1) {
            this.data.frequencias.splice(index, 1);
            return this.salvarDados();
        }
        return false;
    }

    // Métodos para Notas (armazenadas nos alunos)
    adicionarNota(alunoId, nota) {
        const aluno = this.obterAluno(alunoId);
        if (aluno) {
            if (!aluno.notas) {
                aluno.notas = [];
            }
            aluno.notas.push(nota);
            return this.salvarDados();
        }
        return false;
    }

    obterNotasAluno(alunoId) {
        const aluno = this.obterAluno(alunoId);
        return aluno ? aluno.notas || [] : [];
    }

    atualizarNota(alunoId, notaId, dadosAtualizados) {
        const aluno = this.obterAluno(alunoId);
        if (aluno && aluno.notas) {
            const index = aluno.notas.findIndex(nota => nota.id === notaId);
            if (index !== -1) {
                aluno.notas[index] = { ...aluno.notas[index], ...dadosAtualizados };
                return this.salvarDados();
            }
        }
        return false;
    }

    removerNota(alunoId, notaId) {
        const aluno = this.obterAluno(alunoId);
        if (aluno && aluno.notas) {
            const index = aluno.notas.findIndex(nota => nota.id === notaId);
            if (index !== -1) {
                aluno.notas.splice(index, 1);
                return this.salvarDados();
            }
        }
        return false;
    }

    // Métodos para Frequências dos Alunos (armazenadas nos alunos)
    adicionarFrequenciaAluno(alunoId, frequencia) {
        const aluno = this.obterAluno(alunoId);
        if (aluno) {
            if (!aluno.frequencias) {
                aluno.frequencias = [];
            }
            aluno.frequencias.push(frequencia);
            return this.salvarDados();
        }
        return false;
    }

    obterFrequenciasAluno(alunoId) {
        const aluno = this.obterAluno(alunoId);
        return aluno ? aluno.frequencias || [] : [];
    }

    // Métodos de backup e restore
    exportarDados() {
        return JSON.stringify(this.data, null, 2);
    }

    importarDados(dadosJson) {
        try {
            const dados = JSON.parse(dadosJson);
            this.data = dados;
            return this.salvarDados();
        } catch (error) {
            console.error('Erro ao importar dados:', error);
            return false;
        }
    }

    // Limpar todos os dados
    limparDados() {
        this.data = {
            alunos: [],
            professores: [],
            turmas: [],
            disciplinas: [],
            frequencias: [],
            ultimaAtualizacao: new Date().toISOString()
        };
        return this.salvarDados();
    }

    // Obter estatísticas gerais
    obterEstatisticas() {
        return {
            totalAlunos: this.data.alunos.length,
            totalProfessores: this.data.professores.length,
            totalTurmas: this.data.turmas.length,
            totalDisciplinas: this.data.disciplinas.length,
            totalFrequencias: this.data.frequencias.length,
            ultimaAtualizacao: this.data.ultimaAtualizacao
        };
    }

    // Verificar se há dados
    temDados() {
        return this.data.alunos.length > 0 || 
               this.data.professores.length > 0 || 
               this.data.turmas.length > 0 || 
               this.data.disciplinas.length > 0;
    }

    // Inicializar dados de exemplo
    // inicializarDadosExemplo() {
    //     if (this.temDados()) {
    //         return false; // Já tem dados
    //     }

    //     // Criar disciplinas de exemplo
    //     const disciplinas = [
    //         new Disciplina('Matemática', 'MAT001', 60, 'Matemática Básica'),
    //         new Disciplina('Português', 'POR001', 60, 'Língua Portuguesa'),
    //         new Disciplina('História', 'HIS001', 40, 'História do Brasil'),
    //         new Disciplina('Geografia', 'GEO001', 40, 'Geografia Geral'),
    //         new Disciplina('Ciências', 'CIE001', 40, 'Ciências Naturais')
    //     ];

    //     disciplinas.forEach(disciplina => {
    //         this.adicionarDisciplina(disciplina);
    //     });

    //     // Criar professores de exemplo
    //     const professores = [
    //         new Professor('João Silva', 'PROF001', '123.456.789-00', 'Matemática', '(11) 99999-1111', [disciplinas[0].id]),
    //         new Professor('Maria Santos', 'PROF002', '987.654.321-00', 'Português', '(11) 99999-2222', [disciplinas[1].id]),
    //         new Professor('Pedro Costa', 'PROF003', '456.789.123-00', 'História', '(11) 99999-3333', [disciplinas[2].id])
    //     ];

    //     professores.forEach(professor => {
    //         this.adicionarProfessor(professor);
    //     });

    //     // Criar turmas de exemplo
    //     const turmas = [
    //         new Turma('Turma A - Matemática', disciplinas[0].id, professores[0].id, 'manha', 2024, 1),
    //         new Turma('Turma B - Português', disciplinas[1].id, professores[1].id, 'tarde', 2024, 1),
    //         new Turma('Turma C - História', disciplinas[2].id, professores[2].id, 'noite', 2024, 1)
    //     ];

    //     turmas.forEach(turma => {
    //         this.adicionarTurma(turma);
    //     });

    //     // Criar alunos de exemplo
    //     const alunos = [
    //         new Aluno('Ana Oliveira', 'ALU001', '111.222.333-44', '2000-01-15', '(11) 99999-4444', turmas[0].id),
    //         new Aluno('Carlos Pereira', 'ALU002', '555.666.777-88', '1999-05-20', '(11) 99999-5555', turmas[0].id),
    //         new Aluno('Lucia Fernandes', 'ALU003', '999.888.777-66', '2001-03-10', '(11) 99999-6666', turmas[1].id)
    //     ];

    //     alunos.forEach(aluno => {
    //         this.adicionarAluno(aluno);
    //         // Adicionar aluno à turma
    //         const turma = this.obterTurma(aluno.turmaId);
    //         if (turma) {
    //             turma.alunos.push(aluno);
    //         }
    //     });

    //     return this.salvarDados();
    // }
}
