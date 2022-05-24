var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function () {
    var S = function (S) { return document.querySelector(S); };
    function calcTempo(mil) {
        var min = Math.floor(mil / 60000);
        var seg = Math.floor(mil % 60000 / 1000);
        return "".concat(min, "m e ").concat(seg, "s");
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function adicionar(veiculo, salvo) {
            var row = document.createElement("tr");
            row.innerHTML = "\n            <td> ".concat(veiculo.nome, " </td>\n            <td> ").concat(veiculo.placa, " </td>\n            <td> ").concat(veiculo.entrada, " </td>\n            <td> \n                <button class=\"delete\" data-placa=\"").concat(veiculo.placa, "\">X</button>\n            </td>\n            ");
            row.querySelector(".delete").addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            S("#patio").appendChild(row);
            if (salvo)
                salvar(__spreadArray(__spreadArray([], ler(), true), [veiculo], false));
        }
        function remover(placa) {
            var _a = ler().find(function (veiculo) { return veiculo.placa === placa; }), entrada = _a.entrada, nome = _a.nome;
            var tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm('O Veículo ${nome} permaneceu por ${tempo}, deseja encerrar?'))
                return;
            salvar(ler().filter(function (veiculo) { return veiculo.placa !== placa; }));
            render();
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function render() {
            S("#patio").innerHTML = '';
            var patio = ler();
            if (patio.length) {
                patio.forEach(function (veiculo) { return adicionar(veiculo); });
            }
        }
        return { ler: ler, adicionar: adicionar, remover: remover, salvar: salvar, render: render };
    }
    patio().render();
    S("#cadastrar").addEventListener('click', function () {
        var _a, _b;
        var nome = (_a = S("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        var placa = (_b = S("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert("Nome e placa obrigatórios!");
            return false;
        }
        patio().adicionar({ nome: nome, placa: placa, entrada: new Date().toISOString() }, true);
    });
})();
