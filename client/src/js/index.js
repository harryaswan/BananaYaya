window.onload = function () {
    var poke_url = "/api/givemeone";
    var pokemonDivs = [
        document.getElementById('poke1'),
        document.getElementById('poke2')
    ];
    var pokemonIDs = function () {
        pokemonDivs.map(function (elem) {
            return elem.dataset.id;
        });
    }
    var pokemonData;
    var sortedPokemon;

    var getPokemon = function(){
        var promises = pokemonDivs.map(function (el) {
            return request("get", poke_url);
        });

        Promise.all(promises)
        .then(function (data) {
            pokemonData = data;
            data.map(function (pokemon, index) {
                pokemonDivs[index].getElementsByTagName('h2')[0].innerText = capitalise(pokemon.name);
                pokemonDivs[index].getElementsByTagName('img')[0].setAttribute('src', "/src/img/pokemon/" + pokemon.id + ".png");
                pokemonDivs[index].dataset.id = pokemon.id
            });
            sortedPokemon = data.sort(function(poke1, poke2){
                return poke1.weight > poke2.weight ? -1 : poke1.weight < poke2.weight ? 1 : 0;
            })
        });
    };

    getPokemon();

    Array.prototype.forEach.call(document.getElementsByTagName('img'), function (element) {
        element.onclick = function () {
            askWinner(this.parentElement.dataset.id);
        }
    })

    var askWinner = function(clickedPokemonId) {
        index = Math.round((Math.random() * 2) + 1);
        var win = function () {
            alert("Well done!!!! get yersel a banana");
            document.getElementById('win_counter').innerText = parseInt(document.getElementById('win_counter').innerText) + 1;
        }
        var loss = function () {
            alert("learn yo yama fool");
            document.getElementById('win_counter').innerText = 0;
        }
        Math.random() < 0.3 ? win() : loss();
        // if(sortedPokemon[0].id == clickedPokemonId) { alert("Winner winner, turkey dinner") } else { alert("tough shit") }
        getPokemon();
    }

}
