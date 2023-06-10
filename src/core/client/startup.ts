import * as alt from 'alt-client';
import * as natives from "natives";
alt.onServer('log:Console', handleLogConsole);
alt.on('consoleCommand', handleConsoleCommand)

function handleConsoleCommand(name: string, ...args: string[]) {
    if (name === '!nitro') {
        if (alt.Player.local.vehicle) {
            let vehicle: alt.Vehicle = alt.Player.local.vehicle;
            if (vehicle.hasMeta('nitrous')) {
                alt.log('This vehicle already has nitrous');
                return;
            }
            vehicle.setMeta('nitrous', true);
            alt.log('This vehicle now has nitrous');
        } else {
            alt.log('You are not in a vehicle');
        }
        return;
    }
    if (name === '!spawn') {
        if (args.length === 0) {
            alt.log('Please specify a model!')
            return;
        }
        let model: string = args[0];
        alt.emitServer('createVehicle', model);
    }
}
function handleLogConsole(msg: string) {
    alt.log(msg);
}

alt.on('keydown', (index) => {
    if (index === 88) {
        if (alt.Player.local.vehicle) {
            let vehicle: alt.Vehicle = alt.Player.local.vehicle;
            if (vehicle.hasMeta('nitrous')) {
                vehicle.deleteMeta('nitrous');
                alt.emitServer('nitrous', vehicle);
            }
        }
    }
})
alt.onServer('nitrous', (toggle: boolean) => {
    if (toggle) {
        natives.requestNamedPtfxAsset("weap_xs_vehicle_weapons");
    } else {
        natives.removeNamedPtfxAsset("weap_xs_vehicle_weapons");
    }
    natives.setOverrideNitrousLevel(alt.Player.local.vehicle, toggle, 2.0, 3.0, 20000, false);
});
