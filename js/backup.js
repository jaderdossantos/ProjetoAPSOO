// Sistema de Backup e Restore
class BackupManager {
    constructor(storage) {
        this.storage = storage;
    }

    // Gerar backup dos dados
    gerarBackup() {
        const dados = this.storage.carregarDados();
        const backup = {
            versao: '1.0',
            data: new Date().toISOString(),
            dados: dados
        };
        
        return JSON.stringify(backup, null, 2);
    }

    // Restaurar dados do backup
    restaurarBackup(backupJson) {
        try {
            const backup = JSON.parse(backupJson);
            
            if (!backup.versao || !backup.dados) {
                throw new Error('Formato de backup inválido');
            }

            // Validar estrutura dos dados
            const dados = backup.dados;
            if (!dados.alunos || !dados.professores || !dados.turmas || !dados.disciplinas) {
                throw new Error('Estrutura de dados inválida');
            }

            // Restaurar dados
            this.storage.data = dados;
            return this.storage.salvarDados();
        } catch (error) {
            console.error('Erro ao restaurar backup:', error);
            return false;
        }
    }

    // Download do backup
    downloadBackup() {
        const backup = this.gerarBackup();
        const blob = new Blob([backup], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_sistema_academico_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Upload e restauração de backup
    uploadBackup(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const sucesso = this.restaurarBackup(e.target.result);
                    if (sucesso) {
                        resolve('Backup restaurado com sucesso!');
                    } else {
                        reject('Erro ao restaurar backup');
                    }
                } catch (error) {
                    reject('Erro ao processar arquivo: ' + error.message);
                }
            };
            
            reader.onerror = () => {
                reject('Erro ao ler arquivo');
            };
            
            reader.readAsText(file);
        });
    }

    // Verificar integridade dos dados
    verificarIntegridade() {
        const dados = this.storage.carregarDados();
        const problemas = [];

        // Verificar referências quebradas
        dados.turmas.forEach(turma => {
            if (!dados.disciplinas.find(d => d.id === turma.disciplinaId)) {
                problemas.push(`Turma "${turma.nome}" referencia disciplina inexistente`);
            }
            if (!dados.professores.find(p => p.id === turma.professorId)) {
                problemas.push(`Turma "${turma.nome}" referencia professor inexistente`);
            }
        });

        dados.alunos.forEach(aluno => {
            if (aluno.turmaId && !dados.turmas.find(t => t.id === aluno.turmaId)) {
                problemas.push(`Aluno "${aluno.nome}" referencia turma inexistente`);
            }
        });

        return {
            valido: problemas.length === 0,
            problemas: problemas
        };
    }

    // Limpar dados órfãos
    limparDadosOrfaos() {
        const dados = this.storage.carregarDados();
        let removidos = 0;

        // Remover alunos sem turma válida
        dados.alunos = dados.alunos.filter(aluno => {
            if (aluno.turmaId && !dados.turmas.find(t => t.id === aluno.turmaId)) {
                removidos++;
                return false;
            }
            return true;
        });

        // Remover turmas sem disciplina ou professor válidos
        dados.turmas = dados.turmas.filter(turma => {
            const disciplinaValida = dados.disciplinas.find(d => d.id === turma.disciplinaId);
            const professorValido = dados.professores.find(p => p.id === turma.professorId);
            
            if (!disciplinaValida || !professorValido) {
                removidos++;
                return false;
            }
            return true;
        });

        this.storage.data = dados;
        this.storage.salvarDados();
        
        return removidos;
    }

    // Estatísticas do sistema
    obterEstatisticas() {
        const dados = this.storage.carregarDados();
        const integridade = this.verificarIntegridade();
        
        return {
            totalAlunos: dados.alunos.length,
            totalProfessores: dados.professores.length,
            totalTurmas: dados.turmas.length,
            totalDisciplinas: dados.disciplinas.length,
            totalFrequencias: dados.frequencias.length,
            integridade: integridade,
            ultimaAtualizacao: dados.ultimaAtualizacao,
            tamanhoDados: JSON.stringify(dados).length
        };
    }
}
