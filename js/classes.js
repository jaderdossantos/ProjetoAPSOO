// Classe base Pessoa
class Pessoa {
    constructor(nome, matricula, cpf, contato) {
        this.nome = nome;
        this.matricula = matricula;
        this.cpf = cpf;
        this.contato = contato;
        this.id = this.generateId();
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Método para validar CPF
    validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');
        if (cpf.length !== 11) return false;
        
        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1{10}$/.test(cpf)) return false;
        
        // Validação do primeiro dígito
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;
        
        // Validação do segundo dígito
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;
        
        return true;
    }
}

// Classe Aluno
class Aluno extends Pessoa {
    constructor(nome, matricula, cpf, dataNascimento, contato, turmaId = null) {
        super(nome, matricula, cpf, contato);
        this.dataNascimento = dataNascimento;
        this.turmaId = turmaId;
        this.notas = [];
        this.frequencias = [];
    }

    // Adicionar nota
    adicionarNota(disciplinaId, tipoAvaliacao, nota, data) {
        const notaObj = {
            id: this.generateId(),
            disciplinaId,
            tipoAvaliacao,
            nota: parseFloat(nota),
            data: data || new Date().toISOString().split('T')[0]
        };
        this.notas.push(notaObj);
        return notaObj;
    }

    // Calcular média por disciplina
    calcularMediaDisciplina(disciplinaId) {
        const notasDisciplina = this.notas.filter(nota => nota.disciplinaId === disciplinaId);
        if (notasDisciplina.length === 0) return 0;
        
        const soma = notasDisciplina.reduce((acc, nota) => acc + nota.nota, 0);
        return (soma / notasDisciplina.length).toFixed(2);
    }

    // Calcular média geral
    calcularMediaGeral() {
        if (this.notas.length === 0) return 0;
        const soma = this.notas.reduce((acc, nota) => acc + nota.nota, 0);
        return (soma / this.notas.length).toFixed(2);
    }

    // Adicionar frequência
    adicionarFrequencia(disciplinaId, data, presente) {
        const frequenciaObj = {
            id: this.generateId(),
            disciplinaId,
            data,
            presente
        };
        this.frequencias.push(frequenciaObj);
        return frequenciaObj;
    }

    // Calcular percentual de frequência por disciplina
    calcularFrequenciaDisciplina(disciplinaId) {
        const frequenciasDisciplina = this.frequencias.filter(freq => freq.disciplinaId === disciplinaId);
        if (frequenciasDisciplina.length === 0) return 0;
        
        const presentes = frequenciasDisciplina.filter(freq => freq.presente).length;
        return ((presentes / frequenciasDisciplina.length) * 100).toFixed(2);
    }

    // Calcular percentual de frequência geral
    calcularFrequenciaGeral() {
        if (this.frequencias.length === 0) return 0;
        const presentes = this.frequencias.filter(freq => freq.presente).length;
        return ((presentes / this.frequencias.length) * 100).toFixed(2);
    }

    // Verificar se está aprovado (média >= 7 e frequência >= 75%)
    verificarAprovacao(disciplinaId) {
        const media = parseFloat(this.calcularMediaDisciplina(disciplinaId));
        const frequencia = parseFloat(this.calcularFrequenciaDisciplina(disciplinaId));
        return media >= 7 && frequencia >= 75;
    }
}

// Classe Professor
class Professor extends Pessoa {
    constructor(nome, matricula, cpf, areaAtuacao, contato, disciplinas = []) {
        super(nome, matricula, cpf, contato);
        this.areaAtuacao = areaAtuacao;
        this.disciplinas = disciplinas;
    }

    // Adicionar disciplina
    adicionarDisciplina(disciplinaId) {
        if (!this.disciplinas.includes(disciplinaId)) {
            this.disciplinas.push(disciplinaId);
        }
    }

    // Remover disciplina
    removerDisciplina(disciplinaId) {
        this.disciplinas = this.disciplinas.filter(id => id !== disciplinaId);
    }

    // Lançar nota para aluno
    lancarNota(aluno, disciplinaId, tipoAvaliacao, nota, data) {
        return aluno.adicionarNota(disciplinaId, tipoAvaliacao, nota, data);
    }

    // Registrar frequência para aluno
    registrarFrequencia(aluno, disciplinaId, data, presente) {
        return aluno.adicionarFrequencia(disciplinaId, data, presente);
    }

    // Gerar relatório de turma
    gerarRelatorioTurma(turma, disciplinaId) {
        const alunos = turma.alunos;
        const notas = [];
        const frequencias = [];
        
        alunos.forEach(aluno => {
            const media = parseFloat(aluno.calcularMediaDisciplina(disciplinaId));
            const frequencia = parseFloat(aluno.calcularFrequenciaDisciplina(disciplinaId));
            const aprovado = aluno.verificarAprovacao(disciplinaId);
            
            notas.push(media);
            frequencias.push(frequencia);
        });

        const mediaTurma = notas.length > 0 ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2) : 0;
        const notaMaisAlta = notas.length > 0 ? Math.max(...notas).toFixed(2) : 0;
        const notaMaisBaixa = notas.length > 0 ? Math.min(...notas).toFixed(2) : 0;
        const aprovados = alunos.filter(aluno => aluno.verificarAprovacao(disciplinaId)).length;
        const reprovados = alunos.length - aprovados;

        return {
            turma: turma.nome,
            disciplina: disciplinaId,
            totalAlunos: alunos.length,
            mediaTurma,
            notaMaisAlta,
            notaMaisBaixa,
            aprovados,
            reprovados,
            percentualAprovacao: alunos.length > 0 ? ((aprovados / alunos.length) * 100).toFixed(2) : 0
        };
    }
}

// Classe Turma
class Turma {
    constructor(nome, disciplinaId, professorId, turno, ano, semestre) {
        this.nome = nome;
        this.disciplinaId = disciplinaId;
        this.professorId = professorId;
        this.turno = turno;
        this.ano = ano;
        this.semestre = semestre;
        this.alunos = [];
        this.id = this.generateId();
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Adicionar aluno à turma
    adicionarAluno(aluno) {
        if (!this.alunos.find(a => a.id === aluno.id)) {
            this.alunos.push(aluno);
            aluno.turmaId = this.id;
        }
    }

    // Remover aluno da turma
    removerAluno(alunoId) {
        this.alunos = this.alunos.filter(aluno => aluno.id !== alunoId);
    }

    // Obter estatísticas da turma
    obterEstatisticas(disciplinaId) {
        const alunosComNotas = this.alunos.filter(aluno => 
            aluno.notas.some(nota => nota.disciplinaId === disciplinaId)
        );

        if (alunosComNotas.length === 0) {
            return {
                totalAlunos: this.alunos.length,
                alunosComNotas: 0,
                mediaTurma: 0,
                aprovados: 0,
                reprovados: 0
            };
        }

        const medias = alunosComNotas.map(aluno => 
            parseFloat(aluno.calcularMediaDisciplina(disciplinaId))
        );

        const mediaTurma = medias.reduce((a, b) => a + b, 0) / medias.length;
        const aprovados = alunosComNotas.filter(aluno => 
            aluno.verificarAprovacao(disciplinaId)
        ).length;

        return {
            totalAlunos: this.alunos.length,
            alunosComNotas: alunosComNotas.length,
            mediaTurma: mediaTurma.toFixed(2),
            aprovados,
            reprovados: alunosComNotas.length - aprovados
        };
    }
}

// Classe Disciplina
class Disciplina {
    constructor(nome, codigo, cargaHoraria, descricao = '') {
        this.nome = nome;
        this.codigo = codigo;
        this.cargaHoraria = cargaHoraria;
        this.descricao = descricao;
        this.id = this.generateId();
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// Classe Frequencia
class Frequencia {
    constructor(alunoId, disciplinaId, data, presente) {
        this.alunoId = alunoId;
        this.disciplinaId = disciplinaId;
        this.data = data;
        this.presente = presente;
        this.id = this.generateId();
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Calcular percentual de frequência para um aluno em uma disciplina
    static calcularPercentualFrequencia(frequencias, alunoId, disciplinaId) {
        const frequenciasAluno = frequencias.filter(freq => 
            freq.alunoId === alunoId && freq.disciplinaId === disciplinaId
        );
        
        if (frequenciasAluno.length === 0) return 0;
        
        const presentes = frequenciasAluno.filter(freq => freq.presente).length;
        return ((presentes / frequenciasAluno.length) * 100).toFixed(2);
    }

    // Calcular percentual de frequência geral para um aluno
    static calcularPercentualFrequenciaGeral(frequencias, alunoId) {
        const frequenciasAluno = frequencias.filter(freq => freq.alunoId === alunoId);
        
        if (frequenciasAluno.length === 0) return 0;
        
        const presentes = frequenciasAluno.filter(freq => freq.presente).length;
        return ((presentes / frequenciasAluno.length) * 100).toFixed(2);
    }
}

// Classe para gerenciar o sistema
class SistemaAcademico {
    constructor() {
        this.alunos = [];
        this.professores = [];
        this.turmas = [];
        this.disciplinas = [];
        this.frequencias = [];
    }

    // Métodos para Alunos
    adicionarAluno(aluno) {
        this.alunos.push(aluno);
        return aluno;
    }

    obterAluno(id) {
        return this.alunos.find(aluno => aluno.id === id);
    }

    obterAlunos() {
        return this.alunos;
    }

    // Métodos para Professores
    adicionarProfessor(professor) {
        this.professores.push(professor);
        return professor;
    }

    obterProfessor(id) {
        return this.professores.find(professor => professor.id === id);
    }

    obterProfessores() {
        return this.professores;
    }

    // Métodos para Turmas
    adicionarTurma(turma) {
        this.turmas.push(turma);
        return turma;
    }

    obterTurma(id) {
        return this.turmas.find(turma => turma.id === id);
    }

    obterTurmas() {
        return this.turmas;
    }

    // Métodos para Disciplinas
    adicionarDisciplina(disciplina) {
        this.disciplinas.push(disciplina);
        return disciplina;
    }

    obterDisciplina(id) {
        return this.disciplinas.find(disciplina => disciplina.id === id);
    }

    obterDisciplinas() {
        return this.disciplinas;
    }

    // Métodos para Frequências
    adicionarFrequencia(frequencia) {
        this.frequencias.push(frequencia);
        return frequencia;
    }

    obterFrequencias() {
        return this.frequencias;
    }

    // Gerar relatório geral
    gerarRelatorioGeral() {
        const totalAlunos = this.alunos.length;
        const totalProfessores = this.professores.length;
        const totalTurmas = this.turmas.length;
        const totalDisciplinas = this.disciplinas.length;

        return {
            totalAlunos,
            totalProfessores,
            totalTurmas,
            totalDisciplinas,
            estatisticas: {
                alunosPorTurma: this.turmas.map(turma => ({
                    turma: turma.nome,
                    totalAlunos: turma.alunos.length
                })),
                disciplinasPorProfessor: this.professores.map(professor => ({
                    professor: professor.nome,
                    totalDisciplinas: professor.disciplinas.length
                }))
            }
        };
    }
}
