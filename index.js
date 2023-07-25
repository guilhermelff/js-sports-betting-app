

//evento de seleção do resultado
var btnSelections = document.getElementsByClassName('btn-selection');
var selectionsContainer = document.getElementById('selections');
var fichaContainer = document.getElementById('ficha-apostas');
var totalPontuacaoContainer = document.getElementById('total-pontuacao');
var totalPontuacao = 0;

var selectJogador = document.getElementById('select-jogador');
var selectJogador2 = document.getElementById('select-jogador-2');
var previousSelection1 = null;
var previousSelection2 = null;


Array.from(btnSelections).forEach(function (btn) {
    btn.addEventListener('click', function () {
        var jogo = this.getAttribute('data-jogo');
        var selecao = this.getAttribute('data-selection');
        var pontuacao = parseInt(this.getAttribute('data-pontuacao'));

        // Verificar se o botão está marcado com "btn-success"
        var isButtonSelected = this.classList.contains('btn-success');

        // Verificar se já existe uma seleção para o jogo atual e a mesma seleção dentro da ficha de apostas
        var existingSelection = Array.from(selectionsContainer.getElementsByClassName('selection')).find(function (selection) {
            return selection.getAttribute('data-jogo') === jogo && selection.getAttribute('data-selection') === selecao;
        });

        // Remover a seleção do botão marcado com "btn-success"
        if (isButtonSelected) {
            this.classList.remove('btn-success', 'btn-outline-light');
            // Remover a seleção do jogo atual da ficha de apostas
            if (existingSelection) {
                existingSelection.remove();

                // Atualizar somatório da pontuação
                totalPontuacao -= pontuacao;
                totalPontuacaoContainer.textContent = totalPontuacao;
            }
        } else if (!existingSelection) {
            // Remover a seleção de qualquer outro botão do mesmo jogo e mesma seleção na ficha de apostas
            Array.from(selectionsContainer.getElementsByClassName('selection')).forEach(function (selection) {
                var selectionJogo = selection.getAttribute('data-jogo');
                var selectionSelecao = selection.getAttribute('data-selection');
                if (selectionJogo === jogo && (selectionSelecao === 'Casa' || selectionSelecao === 'Fora' || selectionSelecao === 'Empate')) {
                    var selectionPontuacao = parseInt(selection.getAttribute('data-pontuacao'));
                    selection.remove();

                    // Remover as classes "btn-success" e "btn-outline-light" do botão correspondente dentro do jogo
                    var correspondingButton = Array.from(btnSelections).find(function (button) {
                        return button.getAttribute('data-jogo') === jogo && button.getAttribute('data-selection') === selectionSelecao;
                    });
                    if (correspondingButton) {
                        correspondingButton.classList.remove('btn-success', 'btn-outline-light');
                    }

                    // Atualizar somatório da pontuação
                    totalPontuacao -= selectionPontuacao;
                    totalPontuacaoContainer.textContent = totalPontuacao;
                }
            });

            // Atualizar somatório da pontuação com a nova pontuação
            totalPontuacao += pontuacao;
            totalPontuacaoContainer.textContent = totalPontuacao;

            // Criar elemento da seleção
            var li = document.createElement('li');
            li.className = 'list-group-item selection';
            li.setAttribute('data-jogo', jogo);
            li.setAttribute('data-selection', selecao);
            li.setAttribute('data-pontuacao', pontuacao);
            li.innerHTML = `
        <div class="d-flex justify-content-between" id="jogo-ficha">
          <span class="">${jogo}</span>
          <div class="d-flex">
            <div class="selection-text">
              <span>${selecao} @ ${pontuacao}</span>
            </div>
            <button type="button" class="btn btn-remove fa-solid fa-xmark" id="deletar"></button>
          </div>
        </div>
      `;

            // Adicionar evento de remoção
            var btnRemove = li.querySelector('.btn-remove');
            btnRemove.addEventListener('click', function () {
                var selectionPontuacao = parseInt(li.getAttribute('data-pontuacao'));
                li.remove();

                // Remover as classes "btn-success" e "btn-outline-light" do botão correspondente dentro do jogo
                var correspondingButton = Array.from(btnSelections).find(function (button) {
                    return button.getAttribute('data-jogo') === jogo && button.getAttribute('data-selection') === selecao;
                });
                if (correspondingButton) {
                    correspondingButton.classList.remove('btn-success', 'btn-outline-light');
                }

                // Atualizar somatório da pontuação
                totalPontuacao -= selectionPontuacao;
                totalPontuacaoContainer.textContent = totalPontuacao;

                // Ocultar a ficha de apostas quando não houver seleções
                if (selectionsContainer.childElementCount === 0) {
                    fichaContainer.style.display = 'none';
                }
            });

            // Adicionar seleção à ficha de apostas
            selectionsContainer.appendChild(li);

            // Remover as classes "btn-success" e "btn-outline-light" de todos os botões do mesmo jogo
            Array.from(btnSelections).forEach(function (button) {
                if (button.getAttribute('data-jogo') === jogo) {
                    button.classList.remove('btn-success', 'btn-outline-light');
                }
            });

            // Adicionar as classes "btn-success" e "btn-outline-light" somente ao botão clicado
            this.classList.add('btn-success', 'btn-outline-light');
        }

        // Exibir a ficha de apostas
        fichaContainer.style.display = selectionsContainer.childElementCount > 0 ? 'block' : 'none';
    });
});


// Função para adicionar a seleção na ficha de apostas
function addSelectionToBet(jogo, selecao, pontuacao) {
    // Criar elemento da seleção





    var li = document.createElement('li');
    li.className = 'list-group-item selection';
    li.setAttribute('data-jogo', jogo);
    li.setAttribute('data-selection', selecao);
    li.setAttribute('data-pontuacao', pontuacao);
    li.innerHTML = `
    <div class="d-flex justify-content-between" id="jogo-ficha">
      <span class="">${jogo}</span>
      <div class="d-flex">
        <div class="selection-text">
          <span>${selecao} @ ${pontuacao}</span>
        </div>
        <button type="button" class="btn btn-remove fa-solid fa-xmark" id="deletar"></button>
      </div>
    </div>
  `;

    // Adicionar evento de remoção
    var btnRemove = li.querySelector('.btn-remove');
    btnRemove.addEventListener('click', function () {



        var selectionPontuacao = parseInt(li.getAttribute('data-pontuacao'));
        li.remove();




        // Atualizar somatório da pontuação
        totalPontuacao -= selectionPontuacao;
        totalPontuacaoContainer.textContent = totalPontuacao;

        // Ocultar a ficha de apostas quando não houver seleções
        if (selectionsContainer.childElementCount === 0) {
            fichaContainer.style.display = 'none';
        }

    });

    // Adicionar seleção à ficha de apostas
    selectionsContainer.appendChild(li);

    // Atualizar somatório da pontuação
    totalPontuacao += pontuacao;
    totalPontuacaoContainer.textContent = totalPontuacao;

    // Exibir a ficha de apostas
    fichaContainer.style.display = 'block';
}

// Função para remover a seleção da ficha de apostas
function removeSelectionFromBet(selection) {
    var selectionPontuacao = parseInt(selection.getAttribute('data-pontuacao'));
    selection.remove();

    // Atualizar somatório da pontuação
    totalPontuacao -= selectionPontuacao;
    totalPontuacaoContainer.textContent = totalPontuacao;

    // Ocultar a ficha de apostas quando não houver seleções
    if (selectionsContainer.childElementCount === 0) {
        fichaContainer.style.display = 'none';
    }
}

// Evento de seleção de jogadores 1
var selectJogador1Elements = document.querySelectorAll('[id^="select-jogador-1"]');
var previousSelection1 = {};

selectJogador1Elements.forEach(function (select) {
    select.addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        var jogo = selectedOption.getAttribute('data-jogo');
        var selecao = selectedOption.getAttribute('data-selection');
        var pontuacao = parseInt(selectedOption.getAttribute('data-pontuacao'));

        // Remover a seleção anterior da ficha de apostas, se não for "vazio"
        if (previousSelection1[jogo] && previousSelection1[jogo] !== 'vazio') {
            var existingSelection = Array.from(selectionsContainer.getElementsByClassName('selection')).find(function (selection) {
                return selection.getAttribute('data-jogo') === jogo && selection.getAttribute('data-selection') === previousSelection1[jogo];
            });
            if (existingSelection) {
                removeSelectionFromBet(existingSelection);
            }
        }

        // Adicionar a nova seleção à ficha de apostas, se não for "vazio"
        if (selecao !== 'vazio') {
            addSelectionToBet(jogo, selecao, pontuacao);
        }

        // Atualizar a seleção anterior
        previousSelection1[jogo] = selecao;
    });
});

// Eventos de seleção de jogadores 2
var selectJogador2Elements = document.querySelectorAll('[id^="select-jogador-2"]');
var previousSelection2 = {};

selectJogador2Elements.forEach(function (select) {
    select.addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        var jogo = selectedOption.getAttribute('data-jogo');
        var selecao = selectedOption.getAttribute('data-selection');
        var pontuacao = parseInt(selectedOption.getAttribute('data-pontuacao'));

        // Remover a seleção anterior da ficha de apostas, se não for "vazio"
        if (previousSelection2[jogo] && previousSelection2[jogo] !== 'vazio') {
            var existingSelection = Array.from(selectionsContainer.getElementsByClassName('selection')).find(function (selection) {
                return selection.getAttribute('data-jogo') === jogo && selection.getAttribute('data-selection') === previousSelection2[jogo];
            });
            if (existingSelection) {
                removeSelectionFromBet(existingSelection);
            }
        }

        // Adicionar a nova seleção à ficha de apostas, se não for "vazio"
        if (selecao !== 'vazio') {
            addSelectionToBet(jogo, selecao, pontuacao);
        }

        // Atualizar a seleção anterior
        previousSelection2[jogo] = selecao;
    });
});


var btnAposta = document.getElementById('botao-aposta');

btnAposta.addEventListener('click', function () {
    // Remover todas as seleções da ficha de apostas
    Array.from(selectionsContainer.getElementsByClassName('selection')).forEach(function (selection) {
        var selectionPontuacao = parseInt(selection.getAttribute('data-pontuacao'));
        selection.remove();

        // Atualizar somatório da pontuação
        totalPontuacao -= selectionPontuacao;
    });

    // Zerar a pontuação total
    totalPontuacao = 0;

    // Atualizar o valor da pontuação total na interface
    totalPontuacaoContainer.textContent = totalPontuacao;

    // Ocultar a ficha de apostas
    fichaContainer.style.display = 'none';

    // Remover as classes "btn-success" e "btn-outline-light" de todos os botões de seleção
    Array.from(btnSelections).forEach(function (button) {
        button.classList.remove('btn-success', 'btn-outline-light');
    });

    // Resetar a seleção anterior
    var previousSelection1 = null;
    var previousSelection2 = null;


    // Selecionar a opção com data-jogo igual a "vazio" nos dois selects
    // Selecionar a opção com data-jogo igual a "vazio" em todas as ocorrências dos selects
    var selectsJogador1 = document.querySelectorAll('[id^="select-jogador-1"]');
    var selectsJogador2 = document.querySelectorAll('[id^="select-jogador-2"]');

    selectsJogador1.forEach(function (select) {
        select.querySelector('option[data-selection="vazio"]').selected = true;
    });

    selectsJogador2.forEach(function (select) {
        select.querySelector('option[data-selection="vazio"]').selected = true;
    });



});

