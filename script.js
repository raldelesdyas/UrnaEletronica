let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let info = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let fotos = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let vbranco = false;

function comecarEtapa(){
    let etapa = etapas[etapaAtual]

    let numeroHtml = '';
    numero = '';
    vbranco = false;


    for(let i=0; i<etapa.numeros; i++){
        if(i === 0){
            numeroHtml+= '<div class="numero pisca"></div>'
        }else{
            numeroHtml+= '<div class="numero"></div>'
        }
        
    }
    
    seuVotoPara.style.display = 'none';
    aviso.style.display ='none';
    cargo = etapa.titulo;
    info.innerHTML = '';
    fotos.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}
function atualizaInterface(){
    let  etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }


    });
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display ='block';
        info.innerHTML = `nome: ${candidato.nome}<br/>Partido:${candidato.partido}`;
        
        let fotosHtml ='';
        for(let i in candidato.fotos){
            fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
        }
        fotos.innerHTML = fotosHtml;
        
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        info.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML=n;
        numero = `${numero}${n}`;
    }

    elNumero.classList.remove('pisca');
    if(elNumero.nextElementSibling !== null){
        elNumero.nextElementSibling.classList.add('pisca');
    }else{
        atualizaInterface();
    }
    
}
function branco(){
    numero = '';
    vbranco = true;


    seuVotoPara.style.display = 'block';
    aviso.style.display ='block';
    numeros.innerHTML='';
    info.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    fotos.innerHTML = '';
}
function corrige(){
    comecarEtapa();
}
function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(vbranco === true){
        votoConfirmado = true;

    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual]!== undefined){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML=('<div class="aviso--gigante pisca">FIM!</div>');
        }
    }
}

comecarEtapa();