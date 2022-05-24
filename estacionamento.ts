
interface Veiculo {
    nome : string;
    placa: string;
    entrada: Date | string
}





(function () {

    const S = ( S : string) : HTMLInputElement | null => document.querySelector(S) ;


    function calcTempo(mil : number) {
        const min = Math.floor(mil / 60000)
        const seg = Math.floor( mil % 60000  /1000)

        return `${min}m e ${seg}s`

    }

    function patio(){
        function ler() : Veiculo[]{
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }


        function adicionar(veiculo : Veiculo , salvo? : boolean){
            const row = document.createElement("tr");
            row.innerHTML  = `
            <td> ${veiculo.nome} </td>
            <td> ${veiculo.placa} </td>
            <td> ${veiculo.entrada} </td>
            <td> 
                <button class="delete" data-placa="${veiculo.placa}">X</button>
            </td>
            `
            row.querySelector(".delete").addEventListener('click' , function(){
                remover(this.dataset.placa as string)
            })

            S("#patio").appendChild(row);
            
            if(salvo) salvar([...ler(), veiculo])

            
        }


        function remover(placa : string){
            const { entrada , nome}  = ler().find( 
                (veiculo)  => veiculo.placa === placa 
                );

            
            
               const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime())  
        
                if(!confirm('O Veículo ${nome} permaneceu por ${tempo}, deseja encerrar?')
                )
                    return;
                
                salvar(ler().filter(veiculo => veiculo.placa !== placa))
                render()
                
        
        }


        function salvar(veiculos : Veiculo[]){
            localStorage.setItem("patio" , JSON.stringify(veiculos))
        }


        function render(){S("#patio")!.innerHTML = '';
        const patio = ler();
        if ( patio.length){
            patio.forEach(veiculo => adicionar(veiculo))
        }}


        return{ler , adicionar, remover, salvar , render}


    }


    patio().render();


    S("#cadastrar").addEventListener('click' , () => {
        const nome : string = S("#nome")?.value;
        const placa : string = S("#placa")?.value;

        if ( !nome || !placa) {
            alert("Nome e placa obrigatórios!")
            return false
        }
        
        patio().adicionar({nome, placa , entrada : new Date().toISOString()}, true)
    
    
    
    
    } )












})()