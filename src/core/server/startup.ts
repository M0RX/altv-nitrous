import * as alt from 'alt-server';

alt.log(`alt:V Server - Boilerplate Started`);
alt.on('playerConnect', handlePlayerConnect);

function handlePlayerConnect(player: alt.Player) {
    alt.log(`[${player.id}] ${player.name} has connected to the server.`);

    player.model = 'mp_m_freemode_01';
    player.spawn(36.19486618041992, 859.3850708007812, 197.71343994140625, 0);
    alt.emitClient(player, 'log:Console', 'alt:V Server - Boilerplate Started');
}

alt.onClient('nitrous', (player, vehicle: alt.Vehicle) => {
    alt.Player.all.forEach(all => {
       if (all.vehicle == vehicle) {
           alt.emitClient(all, 'nitrous', true);
       }
    });
    alt.setTimeout(() => {
        alt.emitClient(player, 'nitrous', false);
    }, 5000);
});

alt.onClient('createVehicle', (player: alt.Player, model: string) => {
    new alt.Vehicle(alt.hash(model), player.pos, alt.Vector3.zero);
    alt.emitClient(player, 'log:Console', 'Your vehicle ' + model + ' was spawned')
})
