const perguntas = [
	{
		enunciado: "O que a expressão Nhandereko está relacionada a expressar?",
		alternativas: ["O modo de vida Guarani", "Um tipo de moradia urbana", "Uma lei ambiental", "O nome de um rio"],
		correta: 0
	},
	{
		enunciado: "Por que o território é importante para os Guarani Mbya?",
		alternativas: ["Apenas por sua extensão", "Porque sustenta a vida comunitária e cultural", "Somente para construir estradas", "Porque substitui a língua"],
		correta: 1
	},
	{
		enunciado: "Em quais artigos da Constituição de 1988 são reconhecidos direitos dos povos indígenas?",
		alternativas: ["Artigos 1 e 2", "Artigos 50 e 51", "Artigos 231 e 232", "Artigos 300 e 301"],
		correta: 2
	},
	{
		enunciado: "O que é importante para a transmissão de saberes entre gerações?",
		alternativas: ["A transmissão oral e a vida comunitária", "O abandono das tradições", "O uso exclusivo de livros", "A mudança constante de território"],
		correta: 0
	},
	{
		enunciado: "A que o milho avaxi está associado no conteúdo apresentado?",
		alternativas: ["À alimentação e a práticas culturais", "A uma celebração nacional", "A um tipo de instrumento", "À construção de moradias"],
		correta: 0
	}
];

const botaoIniciar = document.querySelector("#iniciar-quiz");
const botaoRefazer = document.querySelector("#refazer-quiz");
const painelQuiz = document.querySelector("#painel-quiz");
const textoProgresso = document.querySelector("#progresso-quiz");
const textoPergunta = document.querySelector("#texto-pergunta");
const listaAlternativas = document.querySelector("#alternativas");
const textoRetorno = document.querySelector("#retorno-resposta");
const botaoProxima = document.querySelector("#proxima-pergunta");
const painelResultado = document.querySelector("#resultado-quiz");
const textoResultado = document.querySelector("#texto-resultado");

let perguntaAtual = 0;
let totalAcertos = 0;

document.querySelectorAll(".botao-mais").forEach((botao) => {
	botao.addEventListener("click", () => {
		const conteudo = document.getElementById(botao.getAttribute("aria-controls"));
		const estaExpandido = botao.getAttribute("aria-expanded") === "true";
		botao.setAttribute("aria-expanded", String(!estaExpandido));
		botao.querySelector("span").textContent = estaExpandido ? "+" : "−";
		botao.firstChild.textContent = estaExpandido ? "Ver mais " : "Ver menos ";
		conteudo.hidden = estaExpandido;
	});
});

function iniciarQuiz() {
	perguntaAtual = 0;
	totalAcertos = 0;
	botaoIniciar.hidden = true;
	painelQuiz.hidden = false;
	painelResultado.hidden = true;
	botaoProxima.hidden = true;
	textoRetorno.textContent = "";
	exibirPergunta();
	painelQuiz.scrollIntoView({ behavior: "smooth", block: "center" });
}

function exibirPergunta() {
	const pergunta = perguntas[perguntaAtual];
	textoProgresso.textContent = `PERGUNTA ${perguntaAtual + 1} DE ${perguntas.length}`;
	textoPergunta.textContent = pergunta.enunciado;
	textoRetorno.textContent = "";
	botaoProxima.hidden = true;
	listaAlternativas.replaceChildren();

	pergunta.alternativas.forEach((alternativa, indice) => {
		const botao = document.createElement("button");
		botao.className = "botao-alternativa";
		botao.type = "button";
		botao.textContent = alternativa;
		botao.addEventListener("click", () => escolherAlternativa(indice));
		listaAlternativas.append(botao);
	});
}

function escolherAlternativa(indiceSelecionado) {
	const pergunta = perguntas[perguntaAtual];
	const botoesAlternativas = listaAlternativas.querySelectorAll("button");
	botoesAlternativas.forEach((botao) => {
		botao.disabled = true;
	});

	if (indiceSelecionado === pergunta.correta) {
		totalAcertos += 1;
		botoesAlternativas[indiceSelecionado].classList.add("correta");
		textoRetorno.textContent = "Resposta certa!";
	} else {
		botoesAlternativas[indiceSelecionado].classList.add("incorreta");
		botoesAlternativas[pergunta.correta].classList.add("correta");
		textoRetorno.textContent = "Não foi dessa vez. A resposta certa está destacada.";
	}

	botaoProxima.hidden = false;
	botaoProxima.textContent = perguntaAtual === perguntas.length - 1 ? "Ver resultado →" : "Próxima pergunta →";
}

function exibirProximaPergunta() {
	perguntaAtual += 1;
	if (perguntaAtual < perguntas.length) {
		exibirPergunta();
		return;
	}

	textoProgresso.textContent = "QUIZ CONCLUÍDO";
	textoPergunta.hidden = true;
	listaAlternativas.hidden = true;
	textoRetorno.hidden = true;
	botaoProxima.hidden = true;
	textoResultado.textContent = `Você acertou ${totalAcertos} de ${perguntas.length} perguntas.`;
	painelResultado.hidden = false;
}

botaoIniciar.addEventListener("click", iniciarQuiz);
botaoRefazer.addEventListener("click", () => {
	textoPergunta.hidden = false;
	listaAlternativas.hidden = false;
	textoRetorno.hidden = false;
	iniciarQuiz();
});
botaoProxima.addEventListener("click", exibirProximaPergunta);
