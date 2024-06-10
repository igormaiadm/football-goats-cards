const btnAvancar = document.getElementById("btn-avancar");
const btnVoltar = document.getElementById("btn-voltar");
let cartaoAtual = 0;
const cartoes = document.querySelectorAll(".cartao");

btnAvancar.addEventListener("click", function () {
	const ehUltimoCartao = cartaoAtual === cartoes.length - 1;
	if (ehUltimoCartao) return;

	esconderCartaoSelecionado();

	cartaoAtual++;
	mostrarCartao();
});

btnVoltar.addEventListener("click", function () {
	const ehPrimeiroCartao = cartaoAtual === 0;
	if (ehPrimeiroCartao) return;

	esconderCartaoSelecionado();

	cartaoAtual--;
	mostrarCartao();
});

function mostrarCartao() {
	cartoes[cartaoAtual].classList.add("selecionado");
}

function esconderCartaoSelecionado() {
	const cartaoSelecionado = document.querySelector(".selecionado");
	cartaoSelecionado.classList.remove("selecionado");
}

function submitVote() {
	const form = document.getElementById('enqueteForm');
	const formData = new FormData(form);
	const jogador = formData.get('jogador');

	if (!jogador) {
		alert('Por favor, selecione um jogador.');
		return;
	}

	// Simulando armazenamento e processamento dos votos
	let resultados = localStorage.getItem('resultadosEnquete');
	if (!resultados) {
		resultados = {};
	} else {
		resultados = JSON.parse(resultados);
	}

	if (resultados[jogador]) {
		resultados[jogador]++;
	} else {
		resultados[jogador] = 1;
	}

	localStorage.setItem('resultadosEnquete', JSON.stringify(resultados));
	mostrarResultados(resultados);
}

function mostrarResultados(resultados) {
	const resultadosDiv = document.getElementById('resultados');
	resultadosDiv.innerHTML = '<h2>Resultado:</h2>';
	for (let jogador in resultados) {
		resultadosDiv.innerHTML += `<p>${jogador}: ${resultados[jogador]} votos</p>`;
	}
}

// Carregar os resultados ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
	const resultados = JSON.parse(localStorage.getItem('resultadosEnquete')) || {};
	mostrarResultados(resultados);
});
