window.onload = function () {
    var poke_url = "http://pokeapi.co/api/v2/pokemon/";
    var pokemonDivs = [
        document.getElementById('poke1'),
        document.getElementById('poke2')
    ];
    var pokemonIDs = function () {
        pokemonDivs.map(function (elem) {
            return elem.dataset.id;
        });
    }
    var pokemonData, nextPokemonData;
    var sortedPokemon;

    var getPokemon = function(){

        return new Promise(function(resolve, reject) {
            var promises = pokemonDivs.map(function (el) {
                var index = Math.round((Math.random() * 721) + 1);
                return request(poke_url + index + "/");
            });

            Promise.all(promises)
            .then(function (data) {
                nextPokemonData = data;
                resolve();
            })
            .catch(function () {
                reject();
            });
        });

    };


    var displayPokemon = function () {
        pokemonData.map(function (pokemon, index) {
            pokemonDivs[index].getElementsByTagName('h2')[0].innerText = capitalise(pokemon.name);
            pokemonDivs[index].getElementsByTagName('img')[0].setAttribute('src', pokemon.sprites.front_default);
            pokemonDivs[index].dataset.id = pokemon.id
        });
        pokemonData = null;
        load();
    }

    var load = function () {
        if (!nextPokemonData) {
            getPokemon()
            .then(function() {
                if (!pokemonData) {
                    pokemonData = nextPokemonData;
                    nextPokemonData = null;
                    displayPokemon();
                }
            });
        }
    }


    Array.prototype.forEach.call(document.getElementsByTagName('img'), function (element) {
        element.onclick = function () {
            askWinner(this.parentElement.dataset.id);
        }
    })

    var askWinner = function(clickedPokemonId) {

        index = Math.round((Math.random() * 2) + 1);
        Math.random() < 0.3 ? alert("Well done!!!! get yersel a banana") : alert("learn yo yama fool");
        // if(sortedPokemon[0].id == clickedPokemonId) { alert("Winner winner, turkey dinner") } else { alert("tough shit") }
        displayPokemon();
    }

    load();


}
