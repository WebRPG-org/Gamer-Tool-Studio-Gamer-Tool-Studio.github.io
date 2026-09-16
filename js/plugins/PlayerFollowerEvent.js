//=============================================================================
// Follower Control Plugin
// Version: 1.0.5
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Allows dynamic follower behavior by handling the follower's movement based on player coordinates.
 * @url https://github.com/openai/gpt-3-experiments
 *
 * @param Player Position X Variable ID
 * @text Player Position X Variable ID
 * @desc The ID of the variable that stores the player's X position.
 * @type variable
 * @default 26
 *
 * @param Player Position Y Variable ID
 * @text Player Position Y Variable ID
 * @desc The ID of the variable that stores the player's Y position.
 * @type variable
 * @default 27
 *
 * @command SetFollowerEvent
 * @text Set Follower Event
 * @desc Dynamically set the event ID of the follower.
 * 
 * @arg followerEventId
 * @type event
 * @text Follower Event ID
 * @desc The ID of the follower event.
 *
 * @help Follower Control Plugin
 * Version 1.01
 * Author: Gamer Tool Studio
 *
 * This plugin allows you to dynamically control the movement of a follower
 * event based on the player's coordinates.
 */

(() => {
    const pluginName = "PlayerFollowerEvent";

    // Retrieve plugin parameters
    const parameters = PluginManager.parameters(pluginName);
    const playerPositionXVariableId = parseInt(parameters['Player Position X Variable ID']);
    const playerPositionYVariableId = parseInt(parameters['Player Position Y Variable ID']);

    // Function to get the event by ID
    const getEventById = (eventId) => $gameMap.event(eventId);

    // Function to update follower event movement route
    const updateFollowerMovementRoute = (followerEventId, followingEvent) => {
        console.log("Updating follower movement route");
        const followerEvent = getEventById(followerEventId);
        console.log("Follower event: ", followerEvent);
        if (followerEvent && followingEvent) {
            const playerX = $gameVariables.value(playerPositionXVariableId);
            const playerY = $gameVariables.value(playerPositionYVariableId);
            const direction = followingEvent.findDirectionTo(playerX, playerY);
            console.log(`Direction: ${direction}`);
            followerEvent.forceMoveRoute([
                { code: 45, parameters: [direction] },
                { code: 0 }
            ]);
        }
    };

    // Continuous update of follower movement route
    const updateInterval = 5; // Update interval in frames (adjust as needed)
    let updateCounter = 0; // Define updateCounter variable
    const updateFollowerInterval = () => {
        updateCounter++;
        if (updateCounter >= updateInterval) {
            const followerEventId = $gameTemp.followerControlFollowerEventId;
            if (followerEventId) {
                const followingEvent = $gamePlayer;
                console.log("Follower event: ", getEventById(followerEventId));
                updateFollowerMovementRoute(followerEventId, followingEvent);
                updateCounter = 0;
            } else {
                console.error("Follower event ID not defined.");
            }
        }
    };

    // Hook into game loop to continuously update follower movement route
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_update.call(this);
        updateFollowerInterval();
    };

    // Plugin Command: Set Follower Event
    PluginManager.registerCommand(pluginName, "SetFollowerEvent", args => {
        const followerEventId = parseInt(args.followerEventId);
        console.log(`Setting follower event: followerEventId = ${followerEventId}`);
        $gameTemp.followerControlFollowerEventId = followerEventId;
    });
})();
