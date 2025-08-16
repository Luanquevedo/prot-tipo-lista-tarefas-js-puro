//Prototipo inicial de gerenciador de tarefas com mock
const tarefas = [
    {
        id: 1,
        description: 'Enviar relatório semanal para o gerente',
        notes: 'Incluir métricas de desempenho e feedbacks da equipe',
        priorityLevel: 3, // alto
        category: 'trabalho',
        completed: true
    },
    {
        id: 2,
        description: 'Fazer compras no supermercado',
        notes: 'Comprar leite, ovos, frutas e vegetais',
        priorityLevel: 2, // médio
        category: 'pessoal',
        completed: true
    },
    {
        id: 3,
        description: 'Estudar JavaScript avançado',
        notes: 'Focar em closures e promises',
        priorityLevel: 1, // baixo
        category: 'estudos',
        completed: true
    },
];

// Conversão de resposta boleana para uma string para melhor compreensão do usuario
function statusConversor(completed) {
    return completed === false ? 'Pendente' : completed === true ? 'concluido' : completed;
};
// conversão de resposta numerica para string uma melhor compreensão do usuario 
function priorityConversor(priorityLevel) {
    return priorityLevel === 1 ? 'Baixo' : priorityLevel === 2 ? 'Media' : priorityLevel === 3 ? 'Alta' : priorityLevel;
}
// identifica o index atraves do id fornecido
function getIndexById(array, id) {
    return array.findIndex(task => task.id === id)
}
// realiza remoção utilizando a palavra chave splice com base no index fornecido pelo getIndexById
function removeItems (array, id) {
    const index = getIndexById(array, id);

    if ( index !== -1) {
        let removed = tarefas.splice(index, 1);
        return `atividade ${removed[0].description} foi removida`
    } else {
        return 'atividade não localizada'
    }
}
// realiza a criação de uma nova tarefa e faz tratamento de erros para que cada item seja cadastrado corretamente
function newTask(description, notes, category, status, priority = 1) {
    if (priority < 1 || priority > 3) {
        return 'são aceitos prioridades 1, 2 ou 3'
    } else {
        if (!description || !category || status === undefined) {

            return 'Certifique que todos parametros necessarios para criação da task estejam preenchidos corretamente e o nivel de prioridade esteja ao menos sendo definido como 3'
        } else {
            const createTask = {
                id: tarefas.length + 1,
                description,
                notes,
                priorityLevel: priority,
                category,
                completed: status
            };
            tarefas.push(createTask);
            return `A tarefa ${createTask.description} foi cadastrada com sucesso`
        }
    }
}
// função para edição de tarefas, com adaptabilidade com base no que o usuario deseja alterar
function editTasks(array, id, updates) {
    const index = getIndexById(array, id);
    if (index === -1) return 'ID não localizado';
    const task = array[index];

    if ('description' in updates) {
        if (!updates.description) return 'A descrição não pode ficar vazia'
        task.description = updates.description;
    }
    if ('notes' in updates) {
        task.notes = updates.notes;
    }
    if ('category' in updates) {
        if (!updates.category) return 'A categoria deve ser informada';
        task.category = updates.category;
    }
    if ('completed' in updates) {
        if (typeof updates.completed !== 'boolean') return 'Status deve ser true ou false';
        task.completed = updates.completed
    }
    if ('priorityLevel' in updates) {
        if (updates.priorityLevel < 1 || updates.priorityLevel > 3)
            return 'São aceitos níveis de prioridade 1, 2 ou 3';
        task.priorityLevel = updates.priorityLevel;
    }
    return `Tarefa ${task.id} atualizada com sucesso`;
}
// realiza a buscas de tarefas por palabra chave no parametro q
function findTask (array, q) {
    return array.find(tarefa => 
        tarefa.description.includes(q) || tarefa.notes.includes(q));
}
//raliza contagem de atividades concluidas em sistema
function countByCompleted(array, status) {
    const totalCompleted = array.reduce((acc, array) => {
        if (array.completed === status) {
            return acc + 1;
        }
        return acc;
    }, 0);

    return `Voce tem o total de ${totalCompleted} tarefas com status ${statusConversor(status)}`;
}
// funcionalidade de ordenação e renderização por grau de prioridade
function orderByPriority(array) {
    return array
        .sort((a, b) => b.priorityLevel - a.priorityLevel) // ordena pela prioridade
        .map(p => ({
            Nome: p.description,
            Anotações: p.notes,
            Categoria: p.category,
            Andamento: statusConversor(p.completed),
            Prioridade: priorityConversor(p.priorityLevel)
        }));
}
// verificação se todas atividades estão no mesmo status
function filterByCompleted(array, status){
    return array.every(t => t.completed === status); 
     
}

//constatnes com parametros necessarios para execução das funçoes criadas

// necessario fornecer descrition, notes, category, status e o priority vai ficar definido por default como 1 porem caso queira prioridade maior é so atribuir
const create = newTask('criar nova categoria teste', 'foco', 'estudos', true, 3);
//necessario informar array, id, e qual campo deseja alterar, aceita multiplos campos
const edit = editTasks(tarefas, 2, { description: 'Nova descrição', notes: 'Atualizar notas' });
const resultCount = countByCompleted(tarefas, true)
const orderResult = orderByPriority(tarefas);
const searchTask = findTask(tarefas, 'cri')
const completedTasks = filterByCompleted(tarefas, true);
const removeItem = removeItems(tarefas, 2);

//retorno das funçoes criadas em console
console.log(searchTask)
console.log(resultCount);
console.log(edit);
console.log(create)
console.log(orderResult)
console.log(completedTasks)
console.log(removeItem);