const input = document.getElementById("tarefaInput");
const lista = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function atualizarContador() {
    contador.innerText = `${tarefas.length} tarefas cadastradas`;
}

function renderizarTarefas() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const item = document.createElement("li");

        const texto = document.createElement("span");
        texto.innerText = tarefa.texto;

        if (tarefa.concluida) {
            texto.style.textDecoration = "line-through";
            texto.style.opacity = "0.6";
        }

        const botoes = document.createElement("div");

        const btnConcluir = document.createElement("button");
        btnConcluir.innerText = "✓";
        btnConcluir.onclick = () => {
            tarefas[index].concluida = !tarefas[index].concluida;
            salvarTarefas();
            renderizarTarefas();
        };

        const btnExcluir = document.createElement("button");
        btnExcluir.innerText = "X";
        btnExcluir.onclick = () => {
            tarefas.splice(index, 1);
            salvarTarefas();
            renderizarTarefas();
        };

        botoes.appendChild(btnConcluir);
        botoes.appendChild(btnExcluir);

        item.appendChild(texto);
        item.appendChild(botoes);

        lista.appendChild(item);
    });

    atualizarContador();
}

function adicionarTarefa() {
    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    tarefas.push({
        texto,
        concluida: false
    });

    salvarTarefas();
    renderizarTarefas();
    input.value = "";
}

function limparTudo() {
    tarefas = [];
    salvarTarefas();
    renderizarTarefas();
}

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

renderizarTarefas();