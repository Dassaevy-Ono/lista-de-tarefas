const input = document.getElementById("tarefaInput");
const lista = document.getElementById("listaTarefas");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const item = document.createElement("li");
        item.innerText = tarefa.texto;

        if (tarefa.concluida) {
            item.style.textDecoration = "line-through";
            item.style.opacity = "0.6";
        }

        item.addEventListener("click", function () {
            tarefas[index].concluida = !tarefas[index].concluida;
            salvarTarefas();
            renderizarTarefas();
        });

        item.addEventListener("dblclick", function () {
            tarefas.splice(index, 1);
            salvarTarefas();
            renderizarTarefas();
        });

        lista.appendChild(item);
    });
}

function adicionarTarefa() {
    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    tarefas.push({
        texto: texto,
        concluida: false
    });

    salvarTarefas();
    renderizarTarefas();
    input.value = "";
}

renderizarTarefas();