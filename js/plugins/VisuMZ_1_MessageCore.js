//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.45;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.45] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 * 
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 * 
 * <Help> text </Help>            Makes a help window appear and have it show
 *                                'text' in its contents. The help window will
 *                                disappear if no text is displayed.
 * 
 * <Shuffle>                      Shuffles the order of all choices. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 * <Shuffle: x>                   Shuffles the order of all choices and only
 *                                x number of them will appear. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 *                                Hidden choices do not count towards x number.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Select Plugin Commands ===
 * 
 * ---
 * 
 * Select: Weapon
 * - Opens the Event Select Item Window to let the player pick a weapon to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected weapon.
 *   - It will result in 0 otherwise.
 * 
 *   Weapon Type ID:
 *   - Reduce all the weapons to a specific weapon type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Armor
 * - Opens the Event Select Item Window to let the player pick an armor to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected armor.
 *   - It will result in 0 otherwise.
 * 
 *   Armor Type ID:
 *   - Reduce all the armors to a specific armor type.
 *   - Leave at 0 to not use filters.
 * 
 *   Equip Type ID:
 *   - Reduce all the armors to a specific equip type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Skill
 * - Opens the Event Select Item Window to let the player pick a skill to
 *   choose from.
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Can be opened while the Message Window is open.
 * - Skills will not be listed if they are hidden by the actor.
 * - Skills will not be listed if the actor lacks access to their Skill Type.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected skill.
 *   - It will result in 0 otherwise.
 * 
 *   Actor ID:
 *   - Select an actor to get the skill list from.
 *   - Use 0 to select from the party leader.
 * 
 *   Skill Type ID:
 *   - Reduce all the skills to a specific skill type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 * 
 *   Each Message Start:
 *   Each Message End:
 *   - This is text that is added at the start/end of each message.
 *   - You may use text codes.
 *   - Keep in mind that if a message extends to a different page (due to word
 *     wrap, excess lines, etc), that does not mean the starting text will
 *     be added to where the next page begins or the ending text will be added
 *     where the previous page ends.
 *   - Can be used for things like adding "<center>" to the start of each 
 *     message without having to type it every time.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces.
 * 
 * As of the v1.44 update, some Asian languages such as Chinese and Japanese
 * are now supported for word wrap. Korean language is only supported if spaces
 * are used.
 * 
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.45: December 14, 2023
 * * Bug Fixes!
 * ** Punctuation was, for some reason, excluded when using Wordwrap with
 *    Japanese and Chinese languages. This should be fixed now. Fixed by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Wordwrap <br> now works properly with Japanese and Chinese languages.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > General Settings > Each Message Start
 * *** Plugin Parameters > General Settings > Each Message End
 * **** This is text that is added at the start/end of each message.
 * **** Keep in mind that if a message extends to a different page (due to word
 *      wrap, excess lines, etc), that does not mean the starting text will
 *      be added to where the next page begins or the ending text will be added
 *      where the previous page ends.
 * **** Can be used for things like adding "<center>" to the start of each 
 *      message without having to type it every time.
 * 
 * Version 1.44: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "Plugin Parameters: Word Wrap Settings" section:
 * *** As of the v1.44 update, some Asian languages such as Chinese and
 *     Japanese are now supported for word wrap. Korean language is only
 *     supported if spaces are used.
 * * Feature Update!
 * ** Word Wrap is now supported for Japanese and Chinese languages.
 * ** Feature updated by Irina and sponsored by AndyL.
 * * New Features!
 * ** New text codes added by Irina for "Show Choices" event command.
 * *** <Shuffle>
 * **** Shuffles the order of all choices. Any cancel shortcuts other than
 *      "Branch" will be undone.
 * *** <Shuffle: x>
 * **** Shuffles the order of all choices and only x number of them appear. Any
 *      cancel shortcuts other than "Branch" will be undone. Hidden choices do
 *      not count towards x number.
 * 
 * Version 1.43: April 13, 2023
 * * Compatibility Update!
 * ** Fixed incompatibilities with auto message positioning with the Map Zoom
 *    plugin. Update made by Irina.
 * 
 * Version 1.42: March 16, 2023
 * * Bug Fixes!
 * ** Fixed some text codes that would capture way too much data than intended.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text code added by Irina for Show Choice Window only:
 * *** <Help> text </Help>
 * **** Makes a help window appear and have it show 'text' in its contents.
 * **** The help window will disappear if no text is displayed.
 * ** New Plugin Commands added by Arisu:
 * *** Select: Weapon
 * *** Select: Armor
 * *** Select: Skill
 * **** Opens the Event Select Item Window to let the player pick a weapon,
 *      armor, or skill to choose from. The selected object will have its ID
 *      recorded in a variable. These can be opened while the Message Window is
 *      opened just like the event "Select Item".
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
 * 
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Choice
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Select
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * pick a weapon to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected weapon. It will result in 0 otherwise.
 * @default 1
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the weapons to a specific weapon type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * pick an armor to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected armor. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific armor type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific equip type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * pick a skill to choose from. Requires VisuMZ_1_SkillsStatesCore!
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected skill. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * Use 0 to select from the party leader.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the skills to a specific skill type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param EachMessageStart:json
 * @text Each Message Start
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the start of each message.
 * You may use text codes.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the end of each message.
 * You may use text codes.
 * @default ""
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

function _0x1f71(_0xebf38e,_0x397b1e){const _0x44edb9=_0x44ed();return _0x1f71=function(_0x1f71b3,_0x1d57ac){_0x1f71b3=_0x1f71b3-0x70;let _0x3fa06e=_0x44edb9[_0x1f71b3];return _0x3fa06e;},_0x1f71(_0xebf38e,_0x397b1e);}function _0x44ed(){const _0x46e3e9=['strokeRect','updateXyOffsets','outputHeight','States','JSON','CEclw','ARRAYSTRUCT','makeSkillList','58428ZWPzvl','\x1bWrapBreak[0]','EUjxQ','changeTextColor','\x1bTEXTALIGNMENT[2]','AutoColorBypassList','processCharacter','ChoiceWindowProperties','processEscapeCharacter','length','textSizeExRaw','JSZMa','uAcsI','menu','clearPictures','[0]','hAMLP','wiQtQ','_choiceListWindow','SkillTypeID','initMessageCore','_positionType','TextCodeActions','processAutoSize','postConvertEscapeCharacters','<LINE\x20BREAK>','messageCoreTextSpeed','setChoiceListLineHeight','stretchDimmerSprite','_data','MESSAGE_CORE_PLUGIN_NAME','preemptive','itemRect','_centerMessageWindow','Game_Screen_clearPictures','_scene','false','VisuMZ_1_SkillsStatesCore','CommonEvent','statusText','wWTlH','faceWidth','isVolumeSymbol','systemColor','updateEvents','needsNewPage','vhpBx','none','ParseAllNotetags','Sprite_Picture_update','bind','Game_Map_setupEvents','Window_Base_processEscapeCharacter','onChoice','kUobG','convertEscapeCharacters','zoomScale','Window_Message_terminateMessage','rtl','changeValue','createTextState','changeVolume','qfalR','SelectSkill','#fbaf5d','push','processAllText','applyData','calcWindowHeight','applyMoveEasing','makeItemList','_autoSizeCheck','makeFontSmaller','drawBackCenteredPicture','Game_Map_refresh','processTextAlignmentX','_dimmerSprite','list','format','Undefined','Sprite_Picture_updateBitmap','\x1bI[%1]','adjustShowChoiceExtension','maxCols','clearPictureTextRefresh','setColorLock','LineHeight','convertButtonAssistEscapeCharacters','nextEventCode','surprise','anchorPictureText','mainFontFace','choices','\x1bTEXTALIGNMENT[1]','TextJS','resizePictureText','gradientFillRect','currentCommand','AddAutoColor','drawBackPicture','battle\x20party','OffsetY','Window_Options_changeVolume','NcaNF','registerSelfEvent','_moveTargetWidth','setSkillChoice','autoPositionOffsetX','Game_Screen_erasePicture','scale','itemHeight','TextMacros','cYcxp','_cancelButton','FontSmallerCap','setupEvents','Name','isSceneMap','COLORLOCK','toUpperCase','resetPositionX','_moveTargetY','setMessageWindowXyOffsets','actorName','ewHzM','_messageOffsetX','JAPyz','trim','CENTERPICTURE','isArmor','atypeId','calcMoveEasing','down','armor','ddqnK','_target','setLastGainedItemData','_moveTargetX','MessageTextDelay','AddOption','QwXSo','_choices','_index','setWaitMode','registerActorNameAutoColorChanges','addContinuousShowChoices','convertLockColorsEscapeCharacters','system','windowX','right','PICTURE','Window_Message_isTriggered','NUM','setupItemChoice','DefaultOutlineWidth','close','isSkillHidden','contentsBack','convertShowChoiceEscapeCodes','processWrapBreak','leader','hasPictureText','isSkill','itemChoiceItypeId','instantTextSpeed','getLastGainedItemData','PictureTextErase','requestPictureTextRefresh','adjustShowChoiceCancel','getLastPluginCommandInterpreter','setupShuffleChoices','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','process_VisuMZ_MessageCore_TextCodes_Action','\x1bWrapJpBreak[0]','command101','erasePicture','IjSjy','ParseEnemyNotetags','_pictureTextRefresh','Classes','applyChoiceHelpDescriptions','_lastGainedItemData','Game_Interpreter_setupChoices','ChoiceWindowMaxCols','ArmorTypeID','_nameBoxWindow','process_VisuMZ_MessageCore_TextCodes_Replace','Window_Base_changeTextColor','\x1bBOLD[0]','lowerleft','getPictureTextData','Window_Base_update','ActorID','_autoPositionTarget','_pictureTextCache','isChoiceWindow','MHDGU','maxLines','upperleft','Default','DjmQP','JVNdq','TextSpeed','FontChangeValue','choiceCols','itemChoiceStypeId','isRunning','textSizeEx','_messageCommonEvents','victory','battleActionName','eKRBz','replace','drawing','update','_choiceIndexArray','ParseSkillNotetags','AsajO','value','maxkg','_eventId','FUNC','updateAutoPosition','getChoiceListMaxColumns','name','split','getChoiceListLineHeight','isChoiceEnabled','convertVariableEscapeCharacters','ARRAYEVAL','#f26c4f','#acacac','<CENTER>','choiceListHelpWindowRect','resetWordWrap','aVKaK','battleUserName','setWordWrap','uRfhp','processControlCharacter','LkWux','getRandomTextFromPool','createChoiceListHelpWindow','flushTextState','textWidth','#ffffff','toLowerCase','some','inBattle','KXlzp','onDatabaseLoaded','GLoqG','\x1bBOLD[1]','outputWidth','WuSUk','actor','skill','processActorNameAutoColorChanges','_interpreter','followers','setChoiceListHelpWindow','lastGainedObjectName','iwSvn','updateRelativePosition','_itemChoiceWtypeId','ParseClassNotetags','Window_Message_processEscapeCharacter','ucpJX','convertChoiceMacros','xKOoN','messageWordWrap','Window_Base_textSizeEx','setChoiceListTextAlign','_macroBypassWordWrap','process_VisuMZ_MessageCore_AutoColor','easeIn','isAutoColorAffected','setTextAlignment','XalfI','iAyzi','fontSize','getConfigValue','show','PictureTextRefresh','getSkillTypes','battle\x20enemy','grey','1360KcoIEz','PREVCOLOR','clearChoiceHelpDescriptions','_itemChoiceEtypeId','choicePositionType','messageWindowRect','<COLORLOCK>','\x5c%1','AutoColorRegExp','refresh','ParseStateNotetags','HSHsY','anchor','1578513IMpWhc','convertMessageCoreEscapeActions','HelpWindow','SlYnK','processAutoPosition','yZqZW','setBackground','EdMfg','ANY','applyDatabaseAutoColor','_MessageCoreSettings','getTextAlignment','5936qdrYMw','center','textCodeCheck','includes','_pictureId','Window_NameBox_refresh','_itemChoiceActorId','<I>','TEXTALIGNMENT','convertFontSettingsEscapeCharacters','isChoiceVisible','parse','processFsTextCode','(((','Match','isSceneBattle','blue','AHfmF','_pictureText','width','colSpacing','TightWrap','OWDOH','start','true','attachPictureText','isContinuePrepareShowTextCommands','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','code','isColorLocked','TextColor','XRxGp','TeDXn','convertHardcodedEscapeReplacements','ceil','Window_Message_clearFlags','EGUfR','newPage','Window_Message_newPage','FoAVf','getMessageWindowRows','messageRows','processPyTextCode','Abfpp','ConvertTextAutoColorRegExpFriendly','purple','rgjtO','_textAlignment','messageCoreWindowX','HgGSv','Width','isWordWrapEnabled','bitmap','drawTextEx','return\x20\x27','getStartingChoiceWidth','_messageWindow','blt','_targets','paintOpacity','updateBitmap','ARRAYSTR','FMSHo','qCCza','xyQHB','text','rYrZQ','setHelpWindow','drawSkillCost','terminateMessage','indent','923047DLRomx','jbMLU','inputtingAction','Window_Options_isVolumeSymbol','addWrapBreakAfterPunctuation','setTextDelay','IYWFo','EVAL','_relativePosition','outLineColor','HtpoA','defaultColor','test','thgUV','slice','setupChoices','resetFontSettings','join','AwUTu','setText','prepareWordWrapEscapeCharacters','_colorLock','setPictureTextBuffer','STR','startY','okAYl','Game_System_initialize','WORD_WRAP_PADDING','fontItalic','iconIndex','processNewLine','min','levelUp','setChoiceListMaxRows','maxFontSizeInLine','_currentAutoSize','qBBFf','ConvertParams','Window_Message_needsNewPage','ErbBa','upperright','_action','weapon','setRelativePosition','makeData','<LEFT>','LarTl','version','_choiceListHelpWindow','moveTo','item','CreateAutoColorRegExpListEntries','clearActorNameAutoColor','PictureIDs','processColorLock','initTextAlignement','Spdcj','ParseAddedText','convertBaseEscapeCharacters','helpWordWrap','choiceIndexArray','processFontChangeBold','createPictureText','startX','getPictureTextBuffer','boxHeight','yDceC','Window_ChoiceList_updatePlacement','setArmorChoice','easeInOut','Skills','requestPictureTextRefreshAll','onNewPageMessageCore','Enemies','clamp','Window_Message_synchronizeNameBox','violet','Scene_Boot_onDatabaseLoaded','parameters','UOonB','UvEJS','etypeId','process_VisuMZ_MessageCore_TextMacros','_moveTargetHeight','tQalY','filter','DziOh','substr','MessageCore','canMove','#7cc576','MiOIL','yes','updatePictureText','convertTextMacros','_pictureTextWindow','exit','MessageWindowXyOffsets','setWeaponChoice','changeOutlineColor','visible','messagePositionReset','getMessageWindowWidth','FontBiggerCap','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','itemBackColor1','obtainEscapeParam','updateMessageCommonEvents','WordWrap','1750oaJSvr','follower','changePaintOpacity','lowerright','isWeapon','Items','NhxQS','getPreservedFontSettings','loadPicture','processStoredAutoColorChanges','StretchDimmedBg','clearCommandList','CaTFb','SelectWeapon','_spriteset','round','crisisColor','default','_itemChoiceAtypeId','_subject','addMessageCommonEvent','updateNameBoxMove','remove','106211rlAwVK','preFlushTextState','</RIGHT>','_textMacroFound','VariableID','Window_EventItem_includes','defeat','isMessageWindowWordWrap','drawItemNumber','type','index','_textColorStack','WRAPBREAK','eraseAllPictureTexts','launchMessageCommonEvent','MKRLD','createChoiceListWindow','mainFontSize','charAt','</LEFT>','processCommonEvent','alRjk','NameBoxWindowOffsetY','command357','convertButtonAssistText','findTargetSprite','\x1bTEXTALIGNMENT[0]','outlineWidth','resetTextColor','convertMessageCoreEscapeReplacements','MessageWindow','max','choiceTextAlign','DsFRl','_resetRect','clearFlags','needsPictureTextRefresh','#707070','ejyjH','Vqphf','addExtraShowChoices','22740553XiYkWp','Game_Map_updateEvents','description','numVisibleRows','changeChoiceBackgroundColor','Armors','substring','contentsHeight','addContinuousShowTextCommands','tQiee','addGeneralOptions','#fff799','CreateAutoColorFor','match','padding','setHelpWindowWordWrap','jxycK','addMessageCoreCommands','parseChoiceText','drawPictureTextZone','setChoiceListMaxColumns','updateOverlappingY','clearRect','clampPlacementPosition','prepareForcedPositionEscapeCharacters','onProcessCharacter','ParseWeaponNotetags','#6dcff6','TqlJW','SplitJpCnCharacters','itemChoiceActorId','rwsZs','setMessageWindowWidth','pink','FWtRO','_itemChoiceItypeId','createContents','textCodeResult','updateDimensions','call','HIDE','convertTextAlignmentEscapeCharacters','FastForwardKey','YpmfU','_messagePositionReset','dCQMP','prepareShowTextFollowups','clearAllPictureTexts','MaxRows','drawItem','\x1bTEXTALIGNMENT[3]','windowWidth','TextColor%1','sort','drawPictureText','orange','preConvertEscapeCharacters','_autoPosRegExp','setPictureText','yellow','Wsbmn','faceName','ConfigManager_makeData','VisuMZ_0_CoreEngine','CnEVa','Window_Base_processControlCharacter','obtainExp','updateForcedPlacement','#ffc8e0','processTextAlignmentChange','STRUCT','ActionJS','General','outlineColor','maxCommands','Window_Options_statusText','_lastPluginCommandInterpreter','EquipTypeID','jBPLS','returnPreservedFontSettings','map','_list','choiceLineHeight','commandSymbol','bOotJ','quantity','Game_Party_initialize','isPressed','processAutoColorWords','emerge','contents','ParseArmorNotetags','updatePlacement','red','textSpeed','<WORDWRAP>','Window_ChoiceList_windowX','indexOf','message','Game_Map_initialize','</I>','realPictureId','battle\x20actor','\x1bCOLORLOCK[1]','VisuMZ_1_EventsMoveCore','ARRAYFUNC','Scene_Message_createChoiceListWindow','mVUFk','gray','ChoiceWindowTextAlign','_wordWrap','event','clear','battleTargetName','\x1bITALIC[1]','escapeStart','Window_Options_addGeneralOptions','Window_ChoiceList','MsgWindowOffsetY','_pictureTextWidth','synchronizeNameBox','Window_ChoiceList_callCancelHandler','convertNewPageTextStateMacros','getColor','fontBold','convertBackslashCharacters','prepareShowTextCommand','Rows','AdjustRect','makeCommandList','hide','addMessageCoreTextSpeedCommand','\x1bC[%1]%2\x1bPREVCOLOR[0]','updateOffsetPosition','prepareShowTextPluginCommandFollowups','initialize','_pictures','updateMove','Window_Base_initialize','ConfigManager_applyData','COMMONEVENT','exec','324HBIOjh','height','open','updateBackground','isHelpWindowWordWrap','Settings','BoFTd','ParseItemNotetags','Window_Base_processNewLine','setPositionType','textSpeedStatusText','textSizeExTextAlignment','getMessageWindowXyOffsets','</WORDWRAP>','isRTL','refreshDimmerBitmap','skills','BFIfe','rhJHJ','obtainEscapeString','_itemChoiceStypeId','_maxShuffleChoices','itemRectWithPadding','_autoColorActorNames','_itemChoiceVariableId','drawCustomBackgroundColor','ITALIC','choiceRows','VisuMZ_3_ActSeqCamera','ShuffleArray','HTPpU','SWITCH','_moveEasingType','fLyOt','prepareAutoSizeEscapeCharacters','choice','_messageOffsetY','ENABLE','lineHeight','2PbpkIc','startWait','getChoiceIndent','lastGainedObjectQuantity','itemBackColor2','postFlushTextState','JvFbA','itemChoiceAtypeId','_refreshPauseSign','RelativePXPY','textSizeExWordWrap','_forcedPosition','_textDelay','idQyo','setMessageWindowWordWrap','TextAlign','dimColor2','processDrawPicture','dfycI','getChoiceListMaxRows','setup','4344824bduIWB','Padding','constructor','registerCommand','EachMessageStart','stringify','itemChoiceActor','hWLzh','\x1bi[%1]%2','pagedown','getChoiceListTextAlign','oZqnb','Window_NameBox_updatePlacement','addedHeight','innerWidth','\x1bCOLORLOCK[0]','SHOW','members','maxShuffleChoices','addedWidth','setMessageWindowRows','randomInt','ylURI','EachMessageEnd','makeFontBigger','isTriggered','Weapons','ixxjx','xxftS','map\x20event','PictureTextChange','MessageRows','Window_Base_processAllText','makeDeepCopy','_wholeMoveDuration','normalColor','itemChoiceWtypeId','updateHelp','obtainItem','processMessageCoreEscapeActions','boxWidth','WeaponTypeID','messageWidth','Actors','prototype','GpTVd','WAIT','<%1>','isInputting','isBreakShowTextCommands','black','windowPadding','Window_Message_updatePlacement','Game_Interpreter_PluginCommand','_helpWindow','TextCodeReplace','powerDownColor','TextStr','maxChoiceWidth','processCustomWait','SWITCHES','left','updateChoiceListHelpWindowPlacement','shift','Type','map\x20actor','processDrawCenteredPicture','selectDefault','SelectArmor','_choiceHelpDescriptions','green','autoPositionOffsetY','addCommand','map\x20player','_pictureTextSprite','sbbvq','cancel','_showFast','partyMemberName','Window_Help_refresh','changeTextSpeed','setupNumInput','textColor','adjustShowChoiceDefault','ARRAYJSON','MsgWindowOffsetX','registerResetRect','_autoSizeRegexp','Vugaw','itemChoiceEtypeId','databaseObjectName','Window_ItemList_drawItemNumber','_commonEventId','DAfqn','floor','SortObjectByKeyLength','map\x20party','Window_MessageLog','erasePictureTextBuffer','AutoColor','getPictureText','updateAutoSizePosition','resetRect','white','_moveDuration','XKZxL','eNFej','<BR>','_pictureTextBuffer','isBusy','MOiyV','WRAPJPBREAK','MessageWindowProperties','_textDelayCount'];_0x44ed=function(){return _0x46e3e9;};return _0x44ed();}const _0x1704b3=_0x1f71;(function(_0x172ff6,_0x34c2df){const _0xa01e26=_0x1f71,_0x4d8cd5=_0x172ff6();while(!![]){try{const _0xbcde6d=-parseInt(_0xa01e26(0x105))/0x1*(-parseInt(_0xa01e26(0x267))/0x2)+parseInt(_0xa01e26(0xb2))/0x3+-parseInt(_0xa01e26(0xbe))/0x4*(parseInt(_0xa01e26(0xa5))/0x5)+parseInt(_0xa01e26(0x240))/0x6*(-parseInt(_0xa01e26(0x189))/0x7)+-parseInt(_0xa01e26(0x27c))/0x8+-parseInt(_0xa01e26(0x2f6))/0x9*(parseInt(_0xa01e26(0x172))/0xa)+parseInt(_0xa01e26(0x1b2))/0xb;if(_0xbcde6d===_0x34c2df)break;else _0x4d8cd5['push'](_0x4d8cd5['shift']());}catch(_0x54a142){_0x4d8cd5['push'](_0x4d8cd5['shift']());}}}(_0x44ed,0x95fcc));var label='MessageCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1704b3(0x15a)](function(_0xb0266f){const _0x964e4=_0x1704b3;return _0xb0266f['status']&&_0xb0266f[_0x964e4(0x1b4)][_0x964e4(0xc1)]('['+label+']');})[0x0];VisuMZ[label][_0x1704b3(0x245)]=VisuMZ[label][_0x1704b3(0x245)]||{},VisuMZ['ConvertParams']=function(_0x1288a6,_0xcbbe78){const _0x3b3230=_0x1704b3;for(const _0x24e443 in _0xcbbe78){if('okAYl'!==_0x3b3230(0x11e)){const _0x3124e5=_0x51ac5d[_0x3b3230(0x15d)][_0x3b3230(0x245)]['AutoColor'];let _0x5a9bc1=0x0;if(_0x1fb0d2===_0x174d65)_0x5a9bc1=_0x3124e5[_0x3b3230(0x2a7)];if(_0x366c19===_0x4ffec6)_0x5a9bc1=_0x3124e5[_0x3b3230(0x3a9)];if(_0x52f154===_0x5c6c37)_0x5a9bc1=_0x3124e5['Skills'];if(_0x44cbdb===_0x5c5341)_0x5a9bc1=_0x3124e5[_0x3b3230(0x177)];if(_0x10fab3===_0x49ab0f)_0x5a9bc1=_0x3124e5[_0x3b3230(0x296)];if(_0x5998f2===_0xf6832a)_0x5a9bc1=_0x3124e5['Armors'];if(_0x4fa5ab===_0x37a558)_0x5a9bc1=_0x3124e5[_0x3b3230(0x14e)];if(_0x1e2f1a===_0x237e4e)_0x5a9bc1=_0x3124e5[_0x3b3230(0x2f1)];return _0x5a9bc1>0x0&&(_0x372e3b='\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x5a9bc1,_0x2f79dc)),_0x784efe;}else{if(_0x24e443[_0x3b3230(0x1bf)](/(.*):(.*)/i)){if(_0x3b3230(0x2e6)!==_0x3b3230(0x2e6)){if(this[_0x3b3230(0xbc)]===_0x489ddc)this[_0x3b3230(0x30a)]();if(this['_MessageCoreSettings'][_0x3b3230(0xe7)]===_0x213ba5)this[_0x3b3230(0x30a)]();this[_0x3b3230(0xbc)][_0x3b3230(0xe7)]=_0x3cd8c6||0x1;}else{const _0x459d36=String(RegExp['$1']),_0x4aec1c=String(RegExp['$2'])[_0x3b3230(0x36d)]()[_0x3b3230(0x375)]();let _0xa70176,_0x27cdf3,_0x3b1f76;switch(_0x4aec1c){case _0x3b3230(0x38e):_0xa70176=_0xcbbe78[_0x24e443]!==''?Number(_0xcbbe78[_0x24e443]):0x0;break;case'ARRAYNUM':_0x27cdf3=_0xcbbe78[_0x24e443]!==''?JSON[_0x3b3230(0xc9)](_0xcbbe78[_0x24e443]):[],_0xa70176=_0x27cdf3[_0x3b3230(0x202)](_0x248961=>Number(_0x248961));break;case _0x3b3230(0x10c):_0xa70176=_0xcbbe78[_0x24e443]!==''?eval(_0xcbbe78[_0x24e443]):null;break;case _0x3b3230(0x3db):_0x27cdf3=_0xcbbe78[_0x24e443]!==''?JSON['parse'](_0xcbbe78[_0x24e443]):[],_0xa70176=_0x27cdf3['map'](_0x16db72=>eval(_0x16db72));break;case _0x3b3230(0x2f2):_0xa70176=_0xcbbe78[_0x24e443]!==''?JSON['parse'](_0xcbbe78[_0x24e443]):'';break;case _0x3b3230(0x2d0):_0x27cdf3=_0xcbbe78[_0x24e443]!==''?JSON[_0x3b3230(0xc9)](_0xcbbe78[_0x24e443]):[],_0xa70176=_0x27cdf3[_0x3b3230(0x202)](_0x2082b6=>JSON[_0x3b3230(0xc9)](_0x2082b6));break;case _0x3b3230(0x3d3):_0xa70176=_0xcbbe78[_0x24e443]!==''?new Function(JSON[_0x3b3230(0xc9)](_0xcbbe78[_0x24e443])):new Function('return\x200');break;case _0x3b3230(0x21b):_0x27cdf3=_0xcbbe78[_0x24e443]!==''?JSON[_0x3b3230(0xc9)](_0xcbbe78[_0x24e443]):[],_0xa70176=_0x27cdf3['map'](_0x20ca4c=>new Function(JSON[_0x3b3230(0xc9)](_0x20ca4c)));break;case _0x3b3230(0x11c):_0xa70176=_0xcbbe78[_0x24e443]!==''?String(_0xcbbe78[_0x24e443]):'';break;case _0x3b3230(0xfb):_0x27cdf3=_0xcbbe78[_0x24e443]!==''?JSON[_0x3b3230(0xc9)](_0xcbbe78[_0x24e443]):[],_0xa70176=_0x27cdf3[_0x3b3230(0x202)](_0x33b8ff=>String(_0x33b8ff));break;case _0x3b3230(0x1f8):_0x3b1f76=_0xcbbe78[_0x24e443]!==''?JSON[_0x3b3230(0xc9)](_0xcbbe78[_0x24e443]):{},_0x1288a6[_0x459d36]={},VisuMZ[_0x3b3230(0x12a)](_0x1288a6[_0x459d36],_0x3b1f76);continue;case _0x3b3230(0x2f4):_0x27cdf3=_0xcbbe78[_0x24e443]!==''?JSON[_0x3b3230(0xc9)](_0xcbbe78[_0x24e443]):[],_0xa70176=_0x27cdf3[_0x3b3230(0x202)](_0x39e729=>VisuMZ[_0x3b3230(0x12a)]({},JSON['parse'](_0x39e729)));break;default:continue;}_0x1288a6[_0x459d36]=_0xa70176;}}}}return _0x1288a6;},(_0x28a5a8=>{const _0x321392=_0x1704b3,_0x59899c=_0x28a5a8['name'];for(const _0x2036f7 of dependencies){if(!Imported[_0x2036f7]){alert(_0x321392(0x16d)[_0x321392(0x344)](_0x59899c,_0x2036f7)),SceneManager['exit']();break;}}const _0xd52f9a=_0x28a5a8[_0x321392(0x1b4)];if(_0xd52f9a[_0x321392(0x1bf)](/\[Version[ ](.*?)\]/i)){const _0x4b1bb9=Number(RegExp['$1']);_0x4b1bb9!==VisuMZ[label][_0x321392(0x134)]&&(alert(_0x321392(0x3a1)[_0x321392(0x344)](_0x59899c,_0x4b1bb9)),SceneManager['exit']());}if(_0xd52f9a[_0x321392(0x1bf)](/\[Tier[ ](\d+)\]/i)){const _0x5951f9=Number(RegExp['$1']);_0x5951f9<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x321392(0x344)](_0x59899c,_0x5951f9,tier)),SceneManager[_0x321392(0x165)]()):tier=Math[_0x321392(0x1a8)](_0x5951f9,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x28a5a8[_0x321392(0x153)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x1704b3(0x3d6)],_0x1704b3(0x2fd),_0x21bbf1=>{const _0x3233c7=_0x1704b3;VisuMZ[_0x3233c7(0x12a)](_0x21bbf1,_0x21bbf1);const _0x14e362=_0x21bbf1[_0x3233c7(0x34c)]||$gameSystem[_0x3233c7(0x3d8)]()||0x1,_0x2e8d69=_0x21bbf1[_0x3233c7(0x1e2)]||$gameSystem[_0x3233c7(0x27a)]()||0x1,_0xd015bf=_0x21bbf1['MaxCols']||$gameSystem[_0x3233c7(0x3d5)]()||0x1,_0x9de9f0=_0x21bbf1[_0x3233c7(0x276)][_0x3233c7(0x7c)]()||_0x3233c7(0x183);$gameSystem['setChoiceListLineHeight'](_0x14e362),$gameSystem['setChoiceListMaxRows'](_0x2e8d69),$gameSystem[_0x3233c7(0x1c6)](_0xd015bf),$gameSystem[_0x3233c7(0x96)](_0x9de9f0);}),PluginManager['registerCommand'](pluginData['name'],_0x1704b3(0x2ec),_0x2a6a15=>{const _0x1bf4a7=_0x1704b3;VisuMZ[_0x1bf4a7(0x12a)](_0x2a6a15,_0x2a6a15);const _0xcbf294=_0x2a6a15[_0x1bf4a7(0x231)]||$gameSystem[_0x1bf4a7(0xe6)]()||0x1,_0x5b4308=_0x2a6a15[_0x1bf4a7(0xf0)]||$gameSystem[_0x1bf4a7(0x16b)]()||0x1;$gameTemp['_centerMessageWindow']=!![];const _0x1cfc41=_0x2a6a15['WordWrap'][_0x1bf4a7(0x7c)]();$gameSystem['setMessageWindowRows'](_0xcbf294),$gameSystem[_0x1bf4a7(0x1d2)](_0x5b4308);[_0x1bf4a7(0xd6),_0x1bf4a7(0x31a)][_0x1bf4a7(0xc1)](_0x1cfc41)&&$gameSystem[_0x1bf4a7(0x275)](eval(_0x1cfc41));const _0x50a8c9=SceneManager[_0x1bf4a7(0x319)][_0x1bf4a7(0xf6)];_0x50a8c9&&(_0x50a8c9[_0x1bf4a7(0x70)](),_0x50a8c9[_0x1bf4a7(0x1d8)](),_0x50a8c9['createContents']());}),PluginManager[_0x1704b3(0x27f)](pluginData[_0x1704b3(0x3d6)],_0x1704b3(0x166),_0x17a0cc=>{const _0x4c8ac=_0x1704b3;VisuMZ['ConvertParams'](_0x17a0cc,_0x17a0cc),$gameSystem[_0x4c8ac(0x370)](_0x17a0cc['OffsetX'],_0x17a0cc[_0x4c8ac(0x35b)]);const _0x5270d1=SceneManager[_0x4c8ac(0x319)]['_messageWindow'];_0x5270d1&&(_0x5270d1[_0x4c8ac(0x70)](),_0x5270d1[_0x4c8ac(0x1d8)](),_0x5270d1[_0x4c8ac(0x1d6)]());}),PluginManager[_0x1704b3(0x27f)](pluginData['name'],_0x1704b3(0x17f),_0x2794cc=>{const _0x345132=_0x1704b3;VisuMZ[_0x345132(0x12a)](_0x2794cc,_0x2794cc),$gameMessage[_0x345132(0x167)](_0x2794cc['VariableID']||0x0,_0x2794cc[_0x345132(0x2a5)]||0x0);const _0x2e5376=$gameTemp[_0x345132(0x39f)]();if(_0x2e5376)_0x2e5376[_0x345132(0x385)](_0x345132(0x214));}),PluginManager['registerCommand'](pluginData[_0x1704b3(0x3d6)],'SelectArmor',_0x22cc35=>{const _0x26db57=_0x1704b3;VisuMZ['ConvertParams'](_0x22cc35,_0x22cc35),$gameMessage['setArmorChoice'](_0x22cc35[_0x26db57(0x18d)]||0x0,_0x22cc35[_0x26db57(0x3ae)]||0x0,_0x22cc35[_0x26db57(0x1ff)]||0x0);const _0x572f5c=$gameTemp[_0x26db57(0x39f)]();if(_0x572f5c)_0x572f5c['setWaitMode'](_0x26db57(0x214));}),PluginManager[_0x1704b3(0x27f)](pluginData['name'],'SelectSkill',_0x23cfe1=>{const _0x57551c=_0x1704b3;VisuMZ[_0x57551c(0x12a)](_0x23cfe1,_0x23cfe1),$gameMessage[_0x57551c(0x360)](_0x23cfe1['VariableID']||0x0,_0x23cfe1[_0x57551c(0x3b6)]||0x0,_0x23cfe1[_0x57551c(0x309)]||0x0);const _0x3e5b34=$gameTemp[_0x57551c(0x39f)]();if(_0x3e5b34)_0x3e5b34[_0x57551c(0x385)](_0x57551c(0x214));}),PluginManager[_0x1704b3(0x27f)](pluginData[_0x1704b3(0x3d6)],_0x1704b3(0x29a),_0x13384c=>{const _0x2cad4a=_0x1704b3;VisuMZ[_0x2cad4a(0x12a)](_0x13384c,_0x13384c);const _0x9bcb79=_0x13384c[_0x2cad4a(0x13a)]||[],_0x586e98=_0x13384c[_0x2cad4a(0x27d)]||0x0,_0x83c8d0=['upperleft','up',_0x2cad4a(0x12d),_0x2cad4a(0x2b9),_0x2cad4a(0xbf),_0x2cad4a(0x38b),_0x2cad4a(0x3b3),_0x2cad4a(0x37a),_0x2cad4a(0x175)];for(const _0x1f330c of _0x9bcb79){if(_0x2cad4a(0xec)!==_0x2cad4a(0x1df)){$gameScreen[_0x2cad4a(0x11b)](_0x1f330c,_0x586e98);for(const _0xa14520 of _0x83c8d0){if(_0x2cad4a(0x154)===_0x2cad4a(0x26d))_0xc0a5bc['y']=this[_0x2cad4a(0x16f)](_0x26c8ac),_0x180402[_0x2cad4a(0x15d)][_0x2cad4a(0x245)]['General']['RelativePXPY']&&(_0x1a1f8d['y']+=_0x5e7634[_0x2cad4a(0x11d)]);else{if(_0x13384c[_0xa14520]===undefined)continue;$gameScreen['setPictureText'](_0x1f330c,_0x13384c[_0xa14520],_0xa14520);}}}else _0xc08e23[_0x2cad4a(0x15d)]['Sprite_Picture_updateBitmap']['call'](this),this[_0x2cad4a(0x143)]();}}),PluginManager[_0x1704b3(0x27f)](pluginData[_0x1704b3(0x3d6)],_0x1704b3(0x39c),_0x1648ef=>{const _0x3d327c=_0x1704b3;VisuMZ[_0x3d327c(0x12a)](_0x1648ef,_0x1648ef);const _0x12a1ec=_0x1648ef['PictureIDs']||[];for(const _0x1894f8 of _0x12a1ec){_0x3d327c(0xfe)===_0x3d327c(0xfe)?($gameScreen['eraseAllPictureTexts'](_0x1894f8),$gameScreen['erasePictureTextBuffer'](_0x1894f8)):(this['x']=(_0x1255f5[_0x3d327c(0x2a4)]-this[_0x3d327c(0xd1)])/0x2,_0x414444[_0x3d327c(0x317)]=_0x1fd026,this[_0x3d327c(0x1c9)]());}}),PluginManager[_0x1704b3(0x27f)](pluginData[_0x1704b3(0x3d6)],_0x1704b3(0xa1),_0x1375f3=>{const _0x3c4830=_0x1704b3;$gameScreen[_0x3c4830(0x14c)]();}),VisuMZ[_0x1704b3(0x15d)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x1704b3(0x2a8)][_0x1704b3(0x80)],Scene_Boot[_0x1704b3(0x2a8)][_0x1704b3(0x80)]=function(){const _0x6e5eed=_0x1704b3;VisuMZ[_0x6e5eed(0x15d)][_0x6e5eed(0x152)][_0x6e5eed(0x1d9)](this),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this[_0x6e5eed(0x3b0)](),this[_0x6e5eed(0x157)](),this[_0x6e5eed(0x98)]();},VisuMZ['MessageCore'][_0x1704b3(0x2db)]=function(_0x139ac1){const _0xebb547=VisuMZ['MessageCore']['Settings'][_0x139ac1];_0xebb547['sort']((_0x505394,_0x3c76b0)=>{const _0x54f219=_0x1f71;if(!_0x505394||!_0x3c76b0)return-0x1;return _0x3c76b0[_0x54f219(0xcc)][_0x54f219(0x2ff)]-_0x505394[_0x54f219(0xcc)]['length'];});},Scene_Boot['prototype'][_0x1704b3(0x3a2)]=function(){const _0x17a542=_0x1704b3;VisuMZ[_0x17a542(0x15d)][_0x17a542(0x2db)](_0x17a542(0x30c));for(const _0x519161 of VisuMZ[_0x17a542(0x15d)][_0x17a542(0x245)]['TextCodeActions']){if(_0x17a542(0x117)===_0x17a542(0x117)){_0x519161['Match']=_0x519161[_0x17a542(0xcc)][_0x17a542(0x36d)](),_0x519161[_0x17a542(0xc0)]=new RegExp('\x1b'+_0x519161[_0x17a542(0xcc)],'gi'),_0x519161[_0x17a542(0x1d7)]='\x1b'+_0x519161[_0x17a542(0xcc)];if(_0x519161[_0x17a542(0x2bc)]==='')_0x519161[_0x17a542(0x1d7)]+=_0x17a542(0x305);}else this['contentsBack'][_0x17a542(0x356)](_0x216599,_0x3c1f9e,_0x72810d,_0x47ad33,_0x4f356c,_0x10de4f,!![]);}},Scene_Boot[_0x1704b3(0x2a8)][_0x1704b3(0x3b0)]=function(){const _0x1f4299=_0x1704b3;VisuMZ['MessageCore']['SortObjectByKeyLength']('TextCodeReplace');for(const _0xac62dd of VisuMZ[_0x1f4299(0x15d)][_0x1f4299(0x245)][_0x1f4299(0x2b3)]){_0xac62dd[_0x1f4299(0xc0)]=new RegExp('\x1b'+_0xac62dd[_0x1f4299(0xcc)]+_0xac62dd['Type'],'gi');if(_0xac62dd[_0x1f4299(0x2b5)]!==''&&_0xac62dd[_0x1f4299(0x2b5)]!=='Undefined')_0xac62dd[_0x1f4299(0x1d7)]=new Function(_0x1f4299(0xf4)+_0xac62dd[_0x1f4299(0x2b5)][_0x1f4299(0x3ca)](/\\/g,'\x1b')+'\x27');else{if(_0x1f4299(0xe5)!==_0x1f4299(0xe5)){this[_0x1f4299(0x2f9)](_0xd1b855['normalColor']()),this[_0x1f4299(0x168)](_0x599564[_0x1f4299(0x1fb)]());const _0x28b917=_0x37d26f[_0x1f4299(0x15d)][_0x1f4299(0x245)][_0x1f4299(0x1fa)];_0x28b917[_0x1f4299(0x390)]===_0x857918&&(_0x28b917[_0x1f4299(0x390)]=0x3),this[_0x1f4299(0x20c)][_0x1f4299(0x1a4)]=_0x28b917[_0x1f4299(0x390)],this[_0x1f4299(0x34b)](![]);}else _0xac62dd[_0x1f4299(0x1d7)]=_0xac62dd['TextJS'];}}},Scene_Boot[_0x1704b3(0x2a8)]['process_VisuMZ_MessageCore_TextMacros']=function(){const _0x59c5da=_0x1704b3;for(const _0x333c7e of VisuMZ[_0x59c5da(0x15d)][_0x59c5da(0x245)][_0x59c5da(0x365)]){_0x333c7e[_0x59c5da(0xc0)]=new RegExp('\x5c['+_0x333c7e[_0x59c5da(0xcc)]+'\x5c]','gi');if(_0x333c7e[_0x59c5da(0x2b5)]!==''&&_0x333c7e[_0x59c5da(0x2b5)]!==_0x59c5da(0x345)){let _0x4c9bee=_0x333c7e['TextStr'];_0x4c9bee=_0x4c9bee[_0x59c5da(0x3ca)](/\\/g,'\x1b'),_0x4c9bee=_0x4c9bee[_0x59c5da(0x3ca)]('\x27','\x5c\x27'),_0x4c9bee=_0x4c9bee[_0x59c5da(0x3ca)]('\x22','\x5c\x22'),_0x333c7e[_0x59c5da(0x1d7)]=new Function(_0x59c5da(0xf4)+_0x4c9bee+'\x27');}else'xJtth'==='rbxbP'?this[_0x59c5da(0x3b7)]=_0x36d4c0:_0x333c7e[_0x59c5da(0x1d7)]=_0x333c7e[_0x59c5da(0x354)];}},Scene_Boot[_0x1704b3(0x2a8)][_0x1704b3(0x98)]=function(){const _0x40e116=_0x1704b3,_0x410c8c=VisuMZ['MessageCore'][_0x40e116(0x245)]['AutoColor'];!VisuMZ[_0x40e116(0x326)]&&(VisuMZ[_0x40e116(0x15d)][_0x40e116(0x358)]($dataClasses,_0x410c8c[_0x40e116(0x3a9)]),VisuMZ[_0x40e116(0x15d)][_0x40e116(0x358)]($dataSkills,_0x410c8c[_0x40e116(0x14b)]),VisuMZ['MessageCore'][_0x40e116(0x358)]($dataItems,_0x410c8c[_0x40e116(0x177)]),VisuMZ[_0x40e116(0x15d)][_0x40e116(0x358)]($dataWeapons,_0x410c8c[_0x40e116(0x296)]),VisuMZ[_0x40e116(0x15d)][_0x40e116(0x358)]($dataArmors,_0x410c8c[_0x40e116(0x1b7)]),VisuMZ[_0x40e116(0x15d)][_0x40e116(0x358)]($dataEnemies,_0x410c8c['Enemies']),VisuMZ[_0x40e116(0x15d)]['AddAutoColor']($dataStates,_0x410c8c['States'])),VisuMZ[_0x40e116(0x15d)]['CreateAutoColorRegExpLists']();},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x2fb)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^','<B>','</B>',_0x1704b3(0xc5),_0x1704b3(0x216),_0x1704b3(0x132),_0x1704b3(0x19c),_0x1704b3(0x3de),'</CENTER>','<RIGHT>',_0x1704b3(0x18b),_0x1704b3(0xab),'</COLORLOCK>',_0x1704b3(0xcb),')))',_0x1704b3(0x211),_0x1704b3(0x24d),_0x1704b3(0x2e7),_0x1704b3(0x30f),_0x1704b3(0x38c),_0x1704b3(0x376),_0x1704b3(0x23e),_0x1704b3(0x2aa),_0x1704b3(0x28c),_0x1704b3(0x1da),_0x1704b3(0x265),'DISABLE',_0x1704b3(0x25f),_0x1704b3(0x2b8),'ALL',_0x1704b3(0xba)],VisuMZ['MessageCore'][_0x1704b3(0x358)]=function(_0x406f96,_0x1c2c4e){const _0x4b7012=_0x1704b3;if(_0x1c2c4e<=0x0)return;const _0x4165d3=_0x406f96;for(const _0x2ac9d5 of _0x4165d3){if(!_0x2ac9d5)continue;VisuMZ[_0x4b7012(0x15d)]['CreateAutoColorFor'](_0x2ac9d5,_0x1c2c4e);}},VisuMZ['MessageCore']['CreateAutoColorRegExpLists']=function(){const _0x4eb8e5=_0x1704b3;VisuMZ[_0x4eb8e5(0x15d)]['AutoColorRegExp']=[];for(let _0x2f3ead=0x1;_0x2f3ead<=0x1f;_0x2f3ead++){const _0x1d3d83=_0x4eb8e5(0x1e6)['format'](_0x2f3ead),_0x315b3a=VisuMZ[_0x4eb8e5(0x15d)][_0x4eb8e5(0x245)][_0x4eb8e5(0x2df)][_0x1d3d83];_0x315b3a[_0x4eb8e5(0x1e7)]((_0x16ece7,_0x56ee5d)=>{const _0x32ba87=_0x4eb8e5;if(!_0x16ece7||!_0x56ee5d)return-0x1;return _0x56ee5d[_0x32ba87(0x2ff)]-_0x16ece7['length'];}),this[_0x4eb8e5(0x138)](_0x315b3a,_0x2f3ead);}},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x138)]=function(_0x515040,_0xe391dd){const _0x4dac90=_0x1704b3;for(const _0x4bd3c2 of _0x515040){if(_0x4bd3c2[_0x4dac90(0x2ff)]<=0x0)continue;if(/^\d+$/[_0x4dac90(0x111)](_0x4bd3c2))continue;let _0x4e0bf6=VisuMZ['MessageCore']['ConvertTextAutoColorRegExpFriendly'](_0x4bd3c2);if(_0x4bd3c2[_0x4dac90(0x1bf)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x592ea9=new RegExp(_0x4e0bf6,'i');else var _0x592ea9=new RegExp('\x5cb'+_0x4e0bf6+'\x5cb','g');VisuMZ[_0x4dac90(0x15d)][_0x4dac90(0xad)][_0x4dac90(0x337)]([_0x592ea9,_0x4dac90(0x236)[_0x4dac90(0x344)](_0xe391dd,_0x4bd3c2)]);}},VisuMZ['MessageCore'][_0x1704b3(0xea)]=function(_0x283092){const _0x1830a8=_0x1704b3;return _0x283092=_0x283092['replace'](/(\W)/gi,(_0x2f68c9,_0x3c3a83)=>_0x1830a8(0xac)['format'](_0x3c3a83)),_0x283092;},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x8f)]=VisuMZ[_0x1704b3(0x8f)],VisuMZ[_0x1704b3(0x8f)]=function(_0x35b58d){const _0xda181f=_0x1704b3;VisuMZ[_0xda181f(0x15d)][_0xda181f(0x8f)]['call'](this,_0x35b58d);const _0x4b08ef=VisuMZ[_0xda181f(0x15d)][_0xda181f(0x245)][_0xda181f(0x2df)];VisuMZ[_0xda181f(0x15d)]['CreateAutoColorFor'](_0x35b58d,_0x4b08ef[_0xda181f(0x3a9)]);},VisuMZ[_0x1704b3(0x15d)]['ParseSkillNotetags']=VisuMZ['ParseSkillNotetags'],VisuMZ['ParseSkillNotetags']=function(_0x10d234){const _0x2b7b65=_0x1704b3;VisuMZ[_0x2b7b65(0x15d)][_0x2b7b65(0x3ce)]['call'](this,_0x10d234);const _0x382a7f=VisuMZ[_0x2b7b65(0x15d)][_0x2b7b65(0x245)][_0x2b7b65(0x2df)];VisuMZ['MessageCore'][_0x2b7b65(0x1be)](_0x10d234,_0x382a7f[_0x2b7b65(0x14b)]);},0x7,VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x247)]=VisuMZ[_0x1704b3(0x247)],VisuMZ['ParseItemNotetags']=function(_0x2a18f6){const _0x69e55c=_0x1704b3;VisuMZ[_0x69e55c(0x15d)][_0x69e55c(0x247)][_0x69e55c(0x1d9)](this,_0x2a18f6);const _0x147136=VisuMZ[_0x69e55c(0x15d)][_0x69e55c(0x245)][_0x69e55c(0x2df)];VisuMZ[_0x69e55c(0x15d)][_0x69e55c(0x1be)](_0x2a18f6,_0x147136['Items']);},VisuMZ['MessageCore']['ParseWeaponNotetags']=VisuMZ[_0x1704b3(0x1cc)],VisuMZ[_0x1704b3(0x1cc)]=function(_0x3217df){const _0x3f3733=_0x1704b3;VisuMZ[_0x3f3733(0x15d)][_0x3f3733(0x1cc)][_0x3f3733(0x1d9)](this,_0x3217df);const _0x17d5b6=VisuMZ[_0x3f3733(0x15d)]['Settings'][_0x3f3733(0x2df)];VisuMZ[_0x3f3733(0x15d)][_0x3f3733(0x1be)](_0x3217df,_0x17d5b6[_0x3f3733(0x296)]);},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x20d)]=VisuMZ[_0x1704b3(0x20d)],VisuMZ[_0x1704b3(0x20d)]=function(_0x646a5){const _0x21f93e=_0x1704b3;VisuMZ[_0x21f93e(0x15d)][_0x21f93e(0x20d)][_0x21f93e(0x1d9)](this,_0x646a5);const _0x2ab823=VisuMZ[_0x21f93e(0x15d)]['Settings'][_0x21f93e(0x2df)];VisuMZ['MessageCore'][_0x21f93e(0x1be)](_0x646a5,_0x2ab823['Armors']);},VisuMZ[_0x1704b3(0x15d)]['ParseEnemyNotetags']=VisuMZ[_0x1704b3(0x3a7)],VisuMZ[_0x1704b3(0x3a7)]=function(_0xfa428c){const _0x3f565f=_0x1704b3;VisuMZ[_0x3f565f(0x15d)][_0x3f565f(0x3a7)][_0x3f565f(0x1d9)](this,_0xfa428c);const _0x5d5ca6=VisuMZ[_0x3f565f(0x15d)][_0x3f565f(0x245)][_0x3f565f(0x2df)];VisuMZ[_0x3f565f(0x15d)][_0x3f565f(0x1be)](_0xfa428c,_0x5d5ca6['Enemies']);},VisuMZ[_0x1704b3(0x15d)]['ParseStateNotetags']=VisuMZ[_0x1704b3(0xaf)],VisuMZ['ParseStateNotetags']=function(_0x253753){const _0x5541fc=_0x1704b3;VisuMZ[_0x5541fc(0x15d)][_0x5541fc(0xaf)]['call'](this,_0x253753);const _0x11f10e=VisuMZ[_0x5541fc(0x15d)][_0x5541fc(0x245)][_0x5541fc(0x2df)];VisuMZ[_0x5541fc(0x15d)][_0x5541fc(0x1be)](_0x253753,_0x11f10e['States']);},VisuMZ['MessageCore'][_0x1704b3(0x1be)]=function(_0x9a79b4,_0x2d1a4b){const _0x33e7f3=_0x1704b3;if(_0x2d1a4b<=0x0)return;const _0x322988=VisuMZ[_0x33e7f3(0x15d)][_0x33e7f3(0x245)][_0x33e7f3(0x2df)]['TextColor'+_0x2d1a4b];let _0x14a485=_0x9a79b4[_0x33e7f3(0x3d6)][_0x33e7f3(0x375)]();if(/^\d+$/[_0x33e7f3(0x111)](_0x14a485))return;if(VisuMZ[_0x33e7f3(0x15d)][_0x33e7f3(0x2fb)][_0x33e7f3(0xc1)](_0x14a485[_0x33e7f3(0x36d)]()))return;_0x14a485=_0x14a485[_0x33e7f3(0x3ca)](/\\I\[(\d+)\]/gi,''),_0x14a485=_0x14a485[_0x33e7f3(0x3ca)](/\x1bI\[(\d+)\]/gi,'');if(_0x14a485['length']<=0x0)return;if(_0x14a485[_0x33e7f3(0x1bf)](/-----/i))return;_0x322988['push'](_0x14a485);},SceneManager[_0x1704b3(0xcd)]=function(){const _0xeb85b5=_0x1704b3;return this['_scene']&&this[_0xeb85b5(0x319)][_0xeb85b5(0x27e)]===Scene_Battle;},SceneManager[_0x1704b3(0x36b)]=function(){const _0x4aa827=_0x1704b3;return this[_0x4aa827(0x319)]&&this[_0x4aa827(0x319)][_0x4aa827(0x27e)]===Scene_Map;},VisuMZ['MessageCore']['TextManager_message']=TextManager[_0x1704b3(0x214)],TextManager[_0x1704b3(0x214)]=function(_0x1cd67b){const _0x56f234=_0x1704b3,_0x9e24bc=[_0x56f234(0x125),_0x56f234(0x20b),_0x56f234(0x315),_0x56f234(0x34f),_0x56f234(0x3c7),_0x56f234(0x18f),_0x56f234(0x225),_0x56f234(0x1f4),'obtainGold',_0x56f234(0x2a2)];let _0x2f7c6a=VisuMZ[_0x56f234(0x15d)]['TextManager_message'][_0x56f234(0x1d9)](this,_0x1cd67b);return _0x9e24bc[_0x56f234(0xc1)](_0x1cd67b)&&(_0x2f7c6a=_0x56f234(0x24d)+_0x2f7c6a),_0x2f7c6a;},ConfigManager[_0x1704b3(0x210)]=VisuMZ['MessageCore']['Settings']['TextSpeed'][_0x1704b3(0x3bd)],VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x1f0)]=ConfigManager[_0x1704b3(0x131)],ConfigManager[_0x1704b3(0x131)]=function(){const _0x42281a=_0x1704b3,_0x2091b0=VisuMZ[_0x42281a(0x15d)]['ConfigManager_makeData'][_0x42281a(0x1d9)](this);return _0x2091b0[_0x42281a(0x210)]=this[_0x42281a(0x210)],_0x2091b0;},VisuMZ[_0x1704b3(0x15d)]['ConfigManager_applyData']=ConfigManager['applyData'],ConfigManager[_0x1704b3(0x339)]=function(_0x57b310){const _0x595338=_0x1704b3;VisuMZ[_0x595338(0x15d)][_0x595338(0x23d)][_0x595338(0x1d9)](this,_0x57b310);if(_0x595338(0x210)in _0x57b310){if('YWUHP'!=='UzRnw')this[_0x595338(0x210)]=Number(_0x57b310['textSpeed'])[_0x595338(0x14f)](0x1,0xb);else{if(_0x41deb9[_0x595338(0x2bc)]==='')this[_0x595338(0x16f)](_0x4cd796);_0x19187f['ActionJS'][_0x595338(0x1d9)](this,_0x12d7cb);if(this[_0x595338(0x27e)]===_0x57aaaa){const _0xb8a351=_0x21da70[_0x595338(0x31c)]||0x0;if(_0xb8a351>0x0)this[_0x595338(0x197)](_0xb8a351);}}}else this['textSpeed']=VisuMZ[_0x595338(0x15d)][_0x595338(0x245)]['TextSpeed']['Default'];},TextManager[_0x1704b3(0x310)]=VisuMZ['MessageCore']['Settings'][_0x1704b3(0x3c0)][_0x1704b3(0x36a)],TextManager[_0x1704b3(0x39a)]=VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x245)]['TextSpeed']['Instant'],Game_Temp[_0x1704b3(0x2a8)]['setLastPluginCommandInterpreter']=function(_0x5566a7){const _0x3db9d8=_0x1704b3;this[_0x3db9d8(0x1fe)]=_0x5566a7;},Game_Temp['prototype'][_0x1704b3(0x39f)]=function(){return this['_lastPluginCommandInterpreter'];},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x2b1)]=Game_Interpreter[_0x1704b3(0x2a8)][_0x1704b3(0x1a0)],Game_Interpreter[_0x1704b3(0x2a8)][_0x1704b3(0x1a0)]=function(_0xf4527b){const _0x1bca11=_0x1704b3;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x1bca11(0x15d)][_0x1bca11(0x2b1)]['call'](this,_0xf4527b);},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x11f)]=Game_System[_0x1704b3(0x2a8)]['initialize'],Game_System[_0x1704b3(0x2a8)][_0x1704b3(0x239)]=function(){const _0x367638=_0x1704b3;VisuMZ['MessageCore'][_0x367638(0x11f)]['call'](this),this['initMessageCore']();},Game_System[_0x1704b3(0x2a8)]['initMessageCore']=function(){const _0x1de7c9=_0x1704b3,_0x40184f=VisuMZ[_0x1de7c9(0x15d)]['Settings'][_0x1de7c9(0x1fa)],_0x2b256f=VisuMZ[_0x1de7c9(0x15d)]['Settings'][_0x1de7c9(0x171)];this[_0x1de7c9(0xbc)]={'messageRows':_0x40184f[_0x1de7c9(0x29b)],'messageWidth':_0x40184f['MessageWidth'],'messageWordWrap':_0x2b256f[_0x1de7c9(0x1a7)],'helpWordWrap':_0x2b256f[_0x1de7c9(0xb4)],'choiceLineHeight':_0x40184f['ChoiceWindowLineHeight'],'choiceRows':_0x40184f['ChoiceWindowMaxRows'],'choiceCols':_0x40184f[_0x1de7c9(0x3ad)],'choiceTextAlign':_0x40184f[_0x1de7c9(0x21f)]};if(this[_0x1de7c9(0x373)]===undefined){if(_0x1de7c9(0x81)===_0x1de7c9(0x81))this[_0x1de7c9(0x373)]=_0x40184f[_0x1de7c9(0x2d1)],this['_messageOffsetY']=_0x40184f[_0x1de7c9(0x228)];else return this['_scene']&&this[_0x1de7c9(0x319)][_0x1de7c9(0x27e)]===_0x4bae00;}},Game_System['prototype']['getMessageWindowRows']=function(){const _0x7ed22b=_0x1704b3;if(this[_0x7ed22b(0xbc)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x7ed22b(0xe7)]===undefined)this[_0x7ed22b(0x30a)]();return this[_0x7ed22b(0xbc)]['messageRows'];},Game_System[_0x1704b3(0x2a8)][_0x1704b3(0x290)]=function(_0x5a223e){const _0x33a143=_0x1704b3;if(this['_MessageCoreSettings']===undefined)this[_0x33a143(0x30a)]();if(this[_0x33a143(0xbc)][_0x33a143(0xe7)]===undefined)this[_0x33a143(0x30a)]();this['_MessageCoreSettings'][_0x33a143(0xe7)]=_0x5a223e||0x1;},Game_System[_0x1704b3(0x2a8)]['getMessageWindowWidth']=function(){const _0x474983=_0x1704b3;if(this[_0x474983(0xbc)]===undefined)this[_0x474983(0x30a)]();if(this[_0x474983(0xbc)][_0x474983(0x2a6)]===undefined)this[_0x474983(0x30a)]();return this['_MessageCoreSettings'][_0x474983(0x2a6)];},Game_System[_0x1704b3(0x2a8)][_0x1704b3(0x1d2)]=function(_0x45f6fe){const _0x2881b1=_0x1704b3;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x2881b1(0xbc)][_0x2881b1(0x2a6)]===undefined)this[_0x2881b1(0x30a)]();_0x45f6fe=Math[_0x2881b1(0xe0)](_0x45f6fe);if(_0x45f6fe%0x2!==0x0)_0x45f6fe+=0x1;this['_MessageCoreSettings']['messageWidth']=_0x45f6fe||0x2;},Game_System[_0x1704b3(0x2a8)][_0x1704b3(0x190)]=function(){const _0x2a2c80=_0x1704b3;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x2a2c80(0xbc)][_0x2a2c80(0x94)]===undefined)this[_0x2a2c80(0x30a)]();return this['_MessageCoreSettings']['messageWordWrap'];},Game_System[_0x1704b3(0x2a8)][_0x1704b3(0x275)]=function(_0xdb6a3){const _0x7c6415=_0x1704b3;if(this[_0x7c6415(0xbc)]===undefined)this[_0x7c6415(0x30a)]();if(this['_MessageCoreSettings']['messageWordWrap']===undefined)this[_0x7c6415(0x30a)]();this[_0x7c6415(0xbc)][_0x7c6415(0x94)]=_0xdb6a3;},Game_System[_0x1704b3(0x2a8)][_0x1704b3(0x24c)]=function(){const _0x1161d9=_0x1704b3;if(this[_0x1161d9(0x373)]===undefined){const _0x339d16=VisuMZ['MessageCore']['Settings']['General'];this[_0x1161d9(0x373)]=_0x339d16[_0x1161d9(0x2d1)],this[_0x1161d9(0x264)]=_0x339d16[_0x1161d9(0x228)];}return{'x':this[_0x1161d9(0x373)]||0x0,'y':this[_0x1161d9(0x264)]||0x0};},Game_System['prototype'][_0x1704b3(0x370)]=function(_0x3b5140,_0x207b73){const _0x264dae=_0x1704b3;if(this[_0x264dae(0xbc)]===undefined)this['initMessageCore']();this['_messageOffsetX']=_0x3b5140,this[_0x264dae(0x264)]=_0x207b73;},Game_System['prototype'][_0x1704b3(0x244)]=function(){const _0xfd9041=_0x1704b3;if(this['_MessageCoreSettings']===undefined)this[_0xfd9041(0x30a)]();if(this[_0xfd9041(0xbc)][_0xfd9041(0x140)]===undefined)this[_0xfd9041(0x30a)]();return this[_0xfd9041(0xbc)][_0xfd9041(0x140)];},Game_System['prototype'][_0x1704b3(0x1c1)]=function(_0x9a1a97){const _0x5f0f20=_0x1704b3;if(this[_0x5f0f20(0xbc)]===undefined)this[_0x5f0f20(0x30a)]();if(this[_0x5f0f20(0xbc)]['helpWordWrap']===undefined)this[_0x5f0f20(0x30a)]();this[_0x5f0f20(0xbc)][_0x5f0f20(0x140)]=_0x9a1a97;},Game_System[_0x1704b3(0x2a8)][_0x1704b3(0x3d8)]=function(){const _0x1c43cb=_0x1704b3;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x1c43cb(0xbc)][_0x1c43cb(0x204)]===undefined)this['initMessageCore']();return this[_0x1c43cb(0xbc)]['choiceLineHeight'];},Game_System[_0x1704b3(0x2a8)][_0x1704b3(0x311)]=function(_0xf5b32a){const _0x566c85=_0x1704b3;if(this[_0x566c85(0xbc)]===undefined)this[_0x566c85(0x30a)]();if(this[_0x566c85(0xbc)][_0x566c85(0x204)]===undefined)this[_0x566c85(0x30a)]();this[_0x566c85(0xbc)][_0x566c85(0x204)]=_0xf5b32a||0x1;},Game_System[_0x1704b3(0x2a8)][_0x1704b3(0x27a)]=function(){const _0x41190c=_0x1704b3;if(this[_0x41190c(0xbc)]===undefined)this[_0x41190c(0x30a)]();if(this['_MessageCoreSettings'][_0x41190c(0x25b)]===undefined)this[_0x41190c(0x30a)]();return this['_MessageCoreSettings']['choiceRows'];},Game_System[_0x1704b3(0x2a8)][_0x1704b3(0x126)]=function(_0x376577){const _0x2811fd=_0x1704b3;if(this['_MessageCoreSettings']===undefined)this[_0x2811fd(0x30a)]();if(this['_MessageCoreSettings'][_0x2811fd(0x25b)]===undefined)this[_0x2811fd(0x30a)]();this[_0x2811fd(0xbc)][_0x2811fd(0x25b)]=_0x376577||0x1;},Game_System[_0x1704b3(0x2a8)][_0x1704b3(0x3d5)]=function(){const _0x35215c=_0x1704b3;if(this[_0x35215c(0xbc)]===undefined)this[_0x35215c(0x30a)]();if(this['_MessageCoreSettings'][_0x35215c(0x3c2)]===undefined)this[_0x35215c(0x30a)]();return this[_0x35215c(0xbc)]['choiceCols'];},Game_System['prototype']['setChoiceListMaxColumns']=function(_0x1b0d53){const _0x5cbf4c=_0x1704b3;if(this[_0x5cbf4c(0xbc)]===undefined)this[_0x5cbf4c(0x30a)]();if(this['_MessageCoreSettings']['choiceCols']===undefined)this[_0x5cbf4c(0x30a)]();this[_0x5cbf4c(0xbc)][_0x5cbf4c(0x3c2)]=_0x1b0d53||0x1;},Game_System[_0x1704b3(0x2a8)]['getChoiceListTextAlign']=function(){const _0x29f9a4=_0x1704b3;if(this['_MessageCoreSettings']===undefined)this[_0x29f9a4(0x30a)]();if(this[_0x29f9a4(0xbc)]['choiceTextAlign']===undefined)this[_0x29f9a4(0x30a)]();return this[_0x29f9a4(0xbc)][_0x29f9a4(0x1a9)];},Game_System[_0x1704b3(0x2a8)][_0x1704b3(0x96)]=function(_0x17dc17){const _0x45944b=_0x1704b3;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x45944b(0xbc)][_0x45944b(0x1a9)]===undefined)this[_0x45944b(0x30a)]();this[_0x45944b(0xbc)][_0x45944b(0x1a9)]=_0x17dc17[_0x45944b(0x7c)]();},Game_Message['prototype']['setWeaponChoice']=function(_0x269a35,_0x136b41){const _0x1c0db2=_0x1704b3;this[_0x1c0db2(0x258)]=_0x269a35,this[_0x1c0db2(0x1d5)]=_0x1c0db2(0x12f),this[_0x1c0db2(0x8e)]=_0x136b41,this[_0x1c0db2(0xa8)]=0x0;},Game_Message[_0x1704b3(0x2a8)][_0x1704b3(0x2a0)]=function(){const _0x1acbf6=_0x1704b3;return this[_0x1acbf6(0x8e)]||0x0;},Game_Message[_0x1704b3(0x2a8)][_0x1704b3(0x149)]=function(_0x4b3950,_0x42d570,_0x3b9a1d){const _0x2c164f=_0x1704b3;this[_0x2c164f(0x258)]=_0x4b3950,this['_itemChoiceItypeId']=_0x2c164f(0x37b),this[_0x2c164f(0x184)]=_0x42d570,this[_0x2c164f(0xa8)]=_0x3b9a1d;},Game_Message[_0x1704b3(0x2a8)]['itemChoiceAtypeId']=function(){return this['_itemChoiceAtypeId']||0x0;},Game_Message[_0x1704b3(0x2a8)][_0x1704b3(0x2d5)]=function(){const _0x3c69fc=_0x1704b3;return this[_0x3c69fc(0xa8)]||0x0;},Game_Message['prototype'][_0x1704b3(0x360)]=function(_0x22f950,_0x307305,_0x36b088){const _0x1c174b=_0x1704b3;this['_itemChoiceVariableId']=_0x22f950,this[_0x1c174b(0x1d5)]='skill',this[_0x1c174b(0xc4)]=_0x307305,this[_0x1c174b(0x254)]=_0x36b088;},Game_Message['prototype'][_0x1704b3(0x1d0)]=function(){const _0x24dc3d=_0x1704b3;return this[_0x24dc3d(0xc4)]||0x0;},Game_Message[_0x1704b3(0x2a8)][_0x1704b3(0x282)]=function(){const _0x571b85=_0x1704b3;return $gameActors[_0x571b85(0x85)](this[_0x571b85(0x1d0)]())||$gameParty[_0x571b85(0x396)]()||null;},Game_Message[_0x1704b3(0x2a8)][_0x1704b3(0x3c3)]=function(){const _0x49d46c=_0x1704b3;return this[_0x49d46c(0x254)]||0x0;},Game_Message[_0x1704b3(0x2a8)][_0x1704b3(0x3a0)]=function(){const _0x3152b5=_0x1704b3;this[_0x3152b5(0x3cd)]=[];const _0x6de672=this[_0x3152b5(0x383)][_0x3152b5(0x2ff)];this[_0x3152b5(0x255)]=_0x6de672;let _0x5a8bb5=![];for(let _0x115e93=0x0;_0x115e93<_0x6de672;_0x115e93++){let _0xed4bdf=this['_choices'][_0x115e93];if(_0xed4bdf[_0x3152b5(0x1bf)](/<SHUFFLE>/gi)){if(_0x3152b5(0x8c)===_0x3152b5(0x8c))_0x5a8bb5=!![],_0xed4bdf=_0xed4bdf[_0x3152b5(0x3ca)](/<SHUFFLE>/gi,'');else return _0x365fcf=_0x37589c['replace'](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x3152b5(0x223)]()),_0x6fd382=_0x11c4c7[_0x3152b5(0x3ca)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this['battleUserName']()),_0x1e5938=_0x345d11[_0x3152b5(0x3ca)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x3152b5(0x3c8)](!![])),_0x55a71e=_0x2418fd[_0x3152b5(0x3ca)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x3152b5(0x3c8)](![])),_0x57f668;}_0xed4bdf[_0x3152b5(0x1bf)](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x3152b5(0x3a6)!==_0x3152b5(0xe9)?(_0x5a8bb5=!![],this[_0x3152b5(0x255)]=Math[_0x3152b5(0x124)](Number(RegExp['$1']),this['_maxShuffleChoices']),_0xed4bdf=_0xed4bdf[_0x3152b5(0x3ca)](/<SHUFFLE:[ ](\d+)>/gi,'')):(_0x2be3bf[_0x3152b5(0x2ff)]>0x0&&(_0x2d9b11[_0x3152b5(0x337)](_0x43d51a),_0x59b918=''),_0x4a7f0d[_0x3152b5(0x337)](_0x28f997))),this[_0x3152b5(0x3cd)][_0x3152b5(0x337)](_0x115e93),this[_0x3152b5(0x383)][_0x115e93]=_0xed4bdf;}if(_0x5a8bb5){if(_0x3152b5(0x287)!==_0x3152b5(0x287))return _0x58f192['prototype']['postConvertEscapeCharacters'][_0x3152b5(0x1d9)](this,_0x2dea9c);else{this[_0x3152b5(0x3cd)]=VisuMZ['MessageCore'][_0x3152b5(0x25d)](this[_0x3152b5(0x3cd)]);if(this['choiceCancelType']()!==-0x2)this['_choiceCancelType']=-0x1;}}},VisuMZ['MessageCore'][_0x1704b3(0x25d)]=function(_0x5b3352){const _0x589e51=_0x1704b3;var _0x29d173,_0x3aef06,_0x48e6f9;for(_0x48e6f9=_0x5b3352['length']-0x1;_0x48e6f9>0x0;_0x48e6f9--){_0x29d173=Math[_0x589e51(0x2da)](Math['random']()*(_0x48e6f9+0x1)),_0x3aef06=_0x5b3352[_0x48e6f9],_0x5b3352[_0x48e6f9]=_0x5b3352[_0x29d173],_0x5b3352[_0x29d173]=_0x3aef06;}return _0x5b3352;},Game_Message['prototype'][_0x1704b3(0x141)]=function(){const _0x156ec7=_0x1704b3;if(!this[_0x156ec7(0x3cd)])this['setupShuffleChoices']();return this[_0x156ec7(0x3cd)];},Game_Message[_0x1704b3(0x2a8)][_0x1704b3(0x28e)]=function(){const _0x47f229=_0x1704b3;if(this[_0x47f229(0x255)]===undefined)this['setupShuffleChoices']();return this[_0x47f229(0x255)];},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x318)]=Game_Screen[_0x1704b3(0x2a8)][_0x1704b3(0x304)],Game_Screen[_0x1704b3(0x2a8)][_0x1704b3(0x304)]=function(){const _0x33fb06=_0x1704b3;VisuMZ[_0x33fb06(0x15d)][_0x33fb06(0x318)][_0x33fb06(0x1d9)](this),this[_0x33fb06(0x1e1)]();},Game_Screen[_0x1704b3(0x2a8)][_0x1704b3(0x1e1)]=function(){const _0x301b7b=_0x1704b3;this[_0x301b7b(0xd0)]=[],this[_0x301b7b(0x2e8)]=[],this[_0x301b7b(0x3a8)]=[];},Game_Screen['prototype'][_0x1704b3(0x3b4)]=function(_0x455063){const _0x5041ed=_0x1704b3;if(this[_0x5041ed(0xd0)]===undefined)this[_0x5041ed(0x1e1)]();const _0xb24d1f=this[_0x5041ed(0x217)](_0x455063);return this['_pictureText'][_0xb24d1f]=this[_0x5041ed(0xd0)][_0xb24d1f]||{},this[_0x5041ed(0xd0)][_0xb24d1f];},Game_Screen['prototype'][_0x1704b3(0x2e0)]=function(_0x356be6,_0x4945c7){const _0x54ec95=_0x1704b3;return _0x4945c7=_0x4945c7['toLowerCase']()[_0x54ec95(0x375)](),this[_0x54ec95(0x3b4)](_0x356be6)[_0x4945c7]||'';},Game_Screen[_0x1704b3(0x2a8)][_0x1704b3(0x1ec)]=function(_0x1e9d76,_0x4b07c6,_0x11a08d){const _0xe1e06a=_0x1704b3;_0x11a08d=_0x11a08d[_0xe1e06a(0x7c)]()['trim'](),this[_0xe1e06a(0x3b4)](_0x1e9d76)[_0x11a08d]=_0x4b07c6||'',this[_0xe1e06a(0x39d)](_0x1e9d76,!![]);},Game_Screen[_0x1704b3(0x2a8)]['eraseAllPictureTexts']=function(_0x308202){const _0x30687b=_0x1704b3;if(this[_0x30687b(0xd0)]===undefined)this[_0x30687b(0x1e1)]();const _0xd34a2b=this[_0x30687b(0x217)](_0x308202);this['_pictureText'][_0xd34a2b]=null,this[_0x30687b(0x39d)](_0x308202,!![]);},Game_Screen[_0x1704b3(0x2a8)][_0x1704b3(0x145)]=function(_0x4af67a){const _0x2d0581=_0x1704b3;if(this[_0x2d0581(0xd0)]===undefined)this[_0x2d0581(0x1e1)]();const _0x3162c2=this[_0x2d0581(0x217)](_0x4af67a);return this[_0x2d0581(0x2e8)][_0x3162c2]||0x0;},Game_Screen['prototype'][_0x1704b3(0x11b)]=function(_0x2130cf,_0x5a0684){const _0xb2b253=_0x1704b3;if(this[_0xb2b253(0xd0)]===undefined)this[_0xb2b253(0x1e1)]();const _0x4d9f0a=this['realPictureId'](_0x2130cf);this['_pictureTextBuffer'][_0x4d9f0a]=Math['max'](0x0,_0x5a0684);},Game_Screen['prototype'][_0x1704b3(0x2de)]=function(_0x3cfa90){const _0x4facc3=_0x1704b3;if(this['_pictureText']===undefined)this[_0x4facc3(0x1e1)]();const _0x56f999=this[_0x4facc3(0x217)](_0x3cfa90);this['_pictureTextBuffer'][_0x56f999]=undefined;},VisuMZ[_0x1704b3(0x15d)]['Game_Screen_erasePicture']=Game_Screen[_0x1704b3(0x2a8)][_0x1704b3(0x3a5)],Game_Screen['prototype'][_0x1704b3(0x3a5)]=function(_0x2d912f){const _0x142150=_0x1704b3;VisuMZ['MessageCore'][_0x142150(0x362)][_0x142150(0x1d9)](this,_0x2d912f),this[_0x142150(0x196)](_0x2d912f),this[_0x142150(0x2de)](_0x2d912f),this[_0x142150(0x39d)](_0x2d912f,!![]);},Game_Screen[_0x1704b3(0x2a8)][_0x1704b3(0x14c)]=function(){const _0x3ddc8e=_0x1704b3;for(const _0x1e4db1 of this[_0x3ddc8e(0x23a)]){if(_0x1e4db1){let _0x10f5aa=this[_0x3ddc8e(0x23a)][_0x3ddc8e(0x213)](_0x1e4db1);this[_0x3ddc8e(0x39d)](_0x10f5aa);}}},Game_Screen[_0x1704b3(0x2a8)][_0x1704b3(0x39d)]=function(_0x535a25,_0x166115){const _0x42bce7=_0x1704b3;this[_0x42bce7(0x3a8)]=this['_pictureTextRefresh']||[];if(this['hasPictureText'](_0x535a25)||_0x166115){if(_0x42bce7(0x1d4)==='CLmue'){let _0x3aecb4=_0x226b28['getInputButtonString'](_0x123409)||'';return _0x3aecb4=this[_0x42bce7(0x22f)](_0x3aecb4),_0x3aecb4=this[_0x42bce7(0x3da)](_0x3aecb4),_0x3aecb4['trim']();}else this['_pictureTextRefresh'][_0x42bce7(0x337)](_0x535a25);}},Game_Screen[_0x1704b3(0x2a8)][_0x1704b3(0x1ad)]=function(_0x27c8db){const _0x1a5357=_0x1704b3;return this[_0x1a5357(0x3a8)]=this[_0x1a5357(0x3a8)]||[],this['_pictureTextRefresh'][_0x1a5357(0xc1)](_0x27c8db);},Game_Screen['prototype']['clearPictureTextRefresh']=function(_0x450971){const _0x3dd39d=_0x1704b3;this[_0x3dd39d(0x3a8)]=this[_0x3dd39d(0x3a8)]||[],this[_0x3dd39d(0x3a8)]['remove'](_0x450971);},Game_Screen[_0x1704b3(0x2a8)][_0x1704b3(0x397)]=function(_0x3c7289){const _0x431abe=_0x1704b3,_0x6746b7=[_0x431abe(0x3bc),'up',_0x431abe(0x12d),_0x431abe(0x2b9),'center',_0x431abe(0x38b),_0x431abe(0x3b3),_0x431abe(0x37a),'lowerright'];return _0x6746b7[_0x431abe(0x7d)](_0x48a722=>this['getPictureText'](_0x3c7289,_0x48a722)!=='');},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x208)]=Game_Party[_0x1704b3(0x2a8)][_0x1704b3(0x239)],Game_Party[_0x1704b3(0x2a8)]['initialize']=function(){const _0x305329=_0x1704b3;VisuMZ[_0x305329(0x15d)]['Game_Party_initialize'][_0x305329(0x1d9)](this),this[_0x305329(0x30a)]();},Game_Party[_0x1704b3(0x2a8)][_0x1704b3(0x30a)]=function(){this['_lastGainedItemData']={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x1704b3(0x2a8)][_0x1704b3(0x39b)]=function(){const _0x574ed2=_0x1704b3;if(this[_0x574ed2(0x3ab)]===undefined)this[_0x574ed2(0x30a)]();return this[_0x574ed2(0x3ab)];},Game_Party[_0x1704b3(0x2a8)][_0x1704b3(0x37e)]=function(_0x2e567a,_0x578da7){const _0x44be2b=_0x1704b3;if(this[_0x44be2b(0x3ab)]===undefined)this['initMessageCore']();if(!_0x2e567a)return;if(DataManager['isItem'](_0x2e567a))this[_0x44be2b(0x3ab)][_0x44be2b(0x192)]=0x0;else{if(DataManager[_0x44be2b(0x176)](_0x2e567a))this[_0x44be2b(0x3ab)]['type']=0x1;else{if(DataManager[_0x44be2b(0x377)](_0x2e567a)){if(_0x44be2b(0x35d)==='dFKCj')return _0x6d1e00;else this[_0x44be2b(0x3ab)][_0x44be2b(0x192)]=0x2;}}}this['_lastGainedItemData']['id']=_0x2e567a['id'],this[_0x44be2b(0x3ab)][_0x44be2b(0x207)]=_0x578da7;},VisuMZ[_0x1704b3(0x15d)]['Game_Party_gainItem']=Game_Party[_0x1704b3(0x2a8)]['gainItem'],Game_Party[_0x1704b3(0x2a8)]['gainItem']=function(_0x21a8a8,_0x4db708,_0x488474){const _0x5c80ea=_0x1704b3;VisuMZ[_0x5c80ea(0x15d)]['Game_Party_gainItem']['call'](this,_0x21a8a8,_0x4db708,_0x488474),_0x4db708>0x0&&this[_0x5c80ea(0x37e)](_0x21a8a8,_0x4db708);},VisuMZ['MessageCore'][_0x1704b3(0x215)]=Game_Map[_0x1704b3(0x2a8)][_0x1704b3(0x239)],Game_Map[_0x1704b3(0x2a8)]['initialize']=function(){const _0x1c3b8c=_0x1704b3;VisuMZ['MessageCore']['Game_Map_initialize'][_0x1c3b8c(0x1d9)](this),this['_messageCommonEvents']=[];},VisuMZ['MessageCore'][_0x1704b3(0x329)]=Game_Map[_0x1704b3(0x2a8)][_0x1704b3(0x369)],Game_Map['prototype']['setupEvents']=function(){const _0x24a564=_0x1704b3;VisuMZ[_0x24a564(0x15d)][_0x24a564(0x329)][_0x24a564(0x1d9)](this),this[_0x24a564(0x3c6)]=[];},VisuMZ['MessageCore'][_0x1704b3(0x1b3)]=Game_Map['prototype'][_0x1704b3(0x322)],Game_Map[_0x1704b3(0x2a8)]['updateEvents']=function(){const _0x4f7b19=_0x1704b3;VisuMZ[_0x4f7b19(0x15d)][_0x4f7b19(0x1b3)]['call'](this),this[_0x4f7b19(0x170)]();},Game_Map[_0x1704b3(0x2a8)][_0x1704b3(0x186)]=function(_0xb69c72){const _0x5bae56=_0x1704b3;if(!$dataCommonEvents[_0xb69c72])return;this[_0x5bae56(0x3c6)]=this[_0x5bae56(0x3c6)]||[];const _0x319e9d=this[_0x5bae56(0x88)][_0x5bae56(0x3d2)],_0x231dd7=new Game_MessageCommonEvent(_0xb69c72,_0x319e9d);this[_0x5bae56(0x3c6)][_0x5bae56(0x337)](_0x231dd7);},Game_Map[_0x1704b3(0x2a8)][_0x1704b3(0x170)]=function(){const _0x49f5f0=_0x1704b3;this['_messageCommonEvents']=this[_0x49f5f0(0x3c6)]||[];for(const _0x2b432a of this[_0x49f5f0(0x3c6)]){if(_0x49f5f0(0x3bf)!==_0x49f5f0(0x301)){if(!_0x2b432a['_interpreter'])this[_0x49f5f0(0x3c6)][_0x49f5f0(0x188)](_0x2b432a);else{if(_0x49f5f0(0x10f)==='nJhdG'){if(_0x170440[_0x49f5f0(0x3d0)](_0x5ebbda))return![];}else _0x2b432a[_0x49f5f0(0x3cc)]();}}else this[_0x49f5f0(0x239)](...arguments);}},VisuMZ[_0x1704b3(0x15d)]['Game_Map_refresh']=Game_Map['prototype'][_0x1704b3(0xae)],Game_Map[_0x1704b3(0x2a8)]['refresh']=function(){const _0x1fd04c=_0x1704b3;VisuMZ[_0x1fd04c(0x15d)][_0x1fd04c(0x340)][_0x1fd04c(0x1d9)](this),$gameScreen[_0x1fd04c(0x14c)]();},Game_Interpreter[_0x1704b3(0x314)]=pluginData[_0x1704b3(0x3d6)],Game_Interpreter[_0x1704b3(0x2a8)][_0x1704b3(0x3a4)]=function(_0x3024fe){const _0x16fc0c=_0x1704b3;if($gameMessage[_0x16fc0c(0x2e9)]())return![];return this[_0x16fc0c(0x230)](_0x3024fe),this['addContinuousShowTextCommands'](_0x3024fe),this[_0x16fc0c(0x1e0)](_0x3024fe),this[_0x16fc0c(0x385)]('message'),!![];},Game_Interpreter[_0x1704b3(0x2a8)][_0x1704b3(0x230)]=function(_0xc319e4){const _0x434c06=_0x1704b3;$gameMessage['setFaceImage'](_0xc319e4[0x0],_0xc319e4[0x1]),$gameMessage[_0x434c06(0xb8)](_0xc319e4[0x2]),$gameMessage[_0x434c06(0x249)](_0xc319e4[0x3]),$gameMessage['setSpeakerName'](_0xc319e4[0x4]);},Game_Interpreter[_0x1704b3(0x2a8)][_0x1704b3(0x1ba)]=function(_0x4dec88){const _0x16d82d=_0x1704b3;while(this['isContinuePrepareShowTextCommands']()){if(_0x16d82d(0x112)===_0x16d82d(0x112)){this[_0x16d82d(0x384)]++;if(this[_0x16d82d(0x357)]()[_0x16d82d(0xda)]===0x191){if(_0x16d82d(0x252)!==_0x16d82d(0x252))_0x21fee2[_0x16d82d(0x1d7)]=_0x4fdeba[_0x16d82d(0x354)];else{let _0x599701=this[_0x16d82d(0x357)]()[_0x16d82d(0x153)][0x0];_0x599701=VisuMZ[_0x16d82d(0x15d)]['ParseAddedText'](_0x599701),$gameMessage['add'](_0x599701);}}if(this['isBreakShowTextCommands']()){if(_0x16d82d(0x366)==='IhZeD')_0x2c8695[_0x16d82d(0x15d)]['Sprite_Picture_update'][_0x16d82d(0x1d9)](this),this['updatePictureText']();else break;}}else{for(const _0x5032d6 of _0x1eb4b6[_0x16d82d(0x15d)][_0x16d82d(0x245)][_0x16d82d(0x2b3)]){_0x885293[_0x16d82d(0x1bf)](_0x5032d6[_0x16d82d(0xc0)])&&(_0x2ad966=_0x14ed4d['replace'](_0x5032d6[_0x16d82d(0xc0)],_0x5032d6[_0x16d82d(0x1d7)]['bind'](this)),_0x17bce7=this[_0x16d82d(0x3da)](_0x373917));}return _0x53b772;}}},Game_Interpreter[_0x1704b3(0x2a8)][_0x1704b3(0xd8)]=function(){const _0x1ceb89=_0x1704b3;return this[_0x1ceb89(0x34e)]()===0x65&&$gameSystem[_0x1ceb89(0xe6)]()>0x4?!![]:this['nextEventCode']()===0x191;},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x13e)]=function(_0x55561b){const _0x275a99=_0x1704b3,_0x3ac372=VisuMZ[_0x275a99(0x15d)]['Settings']['General'];return _0x55561b=(_0x3ac372[_0x275a99(0x280)]||'')+_0x55561b+(_0x3ac372[_0x275a99(0x293)]||''),_0x55561b=_0x55561b[_0x275a99(0x3ca)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x55561b=_0x55561b[_0x275a99(0x3ca)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x14b47f,_0x398295)=>this[_0x275a99(0x77)](_0x398295)),_0x55561b;},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x77)]=function(_0x28732f){const _0x9d59d9=_0x1704b3,_0x575a4d=_0x28732f[_0x9d59d9(0x3d7)]('|')[_0x9d59d9(0x202)](_0x5e185f=>_0x5e185f[_0x9d59d9(0x375)]())[_0x9d59d9(0x188)]('')[_0x9d59d9(0x188)](null);return _0x575a4d[Math[_0x9d59d9(0x291)](_0x575a4d['length'])];},Game_Interpreter[_0x1704b3(0x2a8)][_0x1704b3(0x2ad)]=function(){const _0x49aafa=_0x1704b3;if(this[_0x49aafa(0x357)]()&&this[_0x49aafa(0x357)]()[_0x49aafa(0x153)][0x0][_0x49aafa(0x1bf)](/<(?:NEXT PAGE|NEXTPAGE)>/gi)){if(_0x49aafa(0x292)!==_0x49aafa(0x292))_0x5b2723[_0x49aafa(0x1bf)](_0x156928['textCodeCheck'])&&(this['_textMacroFound']=!![],_0x4f840c=_0x4d7385[_0x49aafa(0x3ca)](_0x257099['textCodeCheck'],_0x3d46fa[_0x49aafa(0x1d7)][_0x49aafa(0x328)](this)));else return!![];}return $gameMessage['_texts']['length']>=$gameSystem[_0x49aafa(0xe6)]()&&this[_0x49aafa(0x34e)]()!==0x191;},Game_Interpreter[_0x1704b3(0x2a8)][_0x1704b3(0x1e0)]=function(_0x8037a2){const _0x315462=_0x1704b3;switch(this['nextEventCode']()){case 0x66:this['_index']++,this[_0x315462(0x114)](this[_0x315462(0x357)]()[_0x315462(0x153)]);break;case 0x67:this[_0x315462(0x384)]++,this[_0x315462(0x2cd)](this[_0x315462(0x357)]()[_0x315462(0x153)]);break;case 0x68:this[_0x315462(0x384)]++,this[_0x315462(0x38f)](this[_0x315462(0x357)]()[_0x315462(0x153)]);break;case 0x165:const _0x584a26=this['_list'][this[_0x315462(0x384)]+0x1],_0x4f406a=_0x584a26[_0x315462(0x153)];_0x4f406a[0x0]===Game_Interpreter[_0x315462(0x314)]&&this[_0x315462(0x238)](_0x4f406a);break;}},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x3ac)]=Game_Interpreter[_0x1704b3(0x2a8)]['setupChoices'],Game_Interpreter[_0x1704b3(0x2a8)]['setupChoices']=function(_0x1fc12f){const _0x5c90fc=_0x1704b3;_0x1fc12f=this[_0x5c90fc(0x387)](),VisuMZ['MessageCore'][_0x5c90fc(0x3ac)][_0x5c90fc(0x1d9)](this,_0x1fc12f),$gameMessage['setupShuffleChoices']();},Game_Interpreter[_0x1704b3(0x2a8)][_0x1704b3(0x387)]=function(){const _0x26a315=_0x1704b3,_0x4dbc2b=this[_0x26a315(0x384)],_0x2784e7=[];let _0x30a4f6=0x0;this[_0x26a315(0x384)]++;while(this['_index']<this[_0x26a315(0x203)][_0x26a315(0x2ff)]){if(this[_0x26a315(0x357)]()[_0x26a315(0x104)]===this['_indent']){if(this[_0x26a315(0x357)]()['code']===0x194&&this[_0x26a315(0x34e)]()!==0x66)break;else{if(this['currentCommand']()[_0x26a315(0xda)]===0x66)this[_0x26a315(0x348)](_0x30a4f6,this[_0x26a315(0x357)](),_0x4dbc2b),this[_0x26a315(0x384)]-=0x2;else this[_0x26a315(0x357)]()[_0x26a315(0xda)]===0x192&&(this[_0x26a315(0x357)]()[_0x26a315(0x153)][0x0]=_0x30a4f6,_0x30a4f6++);}}this[_0x26a315(0x384)]++;}return this[_0x26a315(0x384)]=_0x4dbc2b,this[_0x26a315(0x357)]()[_0x26a315(0x153)];},Game_Interpreter['prototype']['adjustShowChoiceExtension']=function(_0xf299cc,_0x16d93d,_0xd43f3f){const _0x5db634=_0x1704b3;this[_0x5db634(0x2cf)](_0xf299cc,_0x16d93d,_0xd43f3f),this['adjustShowChoiceCancel'](_0xf299cc,_0x16d93d,_0xd43f3f),this[_0x5db634(0x1b1)](_0x16d93d,_0xd43f3f);},Game_Interpreter[_0x1704b3(0x2a8)]['adjustShowChoiceDefault']=function(_0x2f8f4f,_0x5adac1,_0x1f85e1){const _0x378523=_0x1704b3;if(_0x5adac1[_0x378523(0x153)][0x2]<0x0)return;const _0x141020=_0x5adac1[_0x378523(0x153)][0x2]+_0x2f8f4f;this[_0x378523(0x203)][_0x1f85e1][_0x378523(0x153)][0x2]=_0x141020;},Game_Interpreter[_0x1704b3(0x2a8)][_0x1704b3(0x39e)]=function(_0x5588b9,_0x5a48c1,_0x294be3){const _0x354b96=_0x1704b3;if(_0x5a48c1[_0x354b96(0x153)][0x1]>=0x0){var _0x20bf4b=_0x5a48c1[_0x354b96(0x153)][0x1]+_0x5588b9;this[_0x354b96(0x203)][_0x294be3][_0x354b96(0x153)][0x1]=_0x20bf4b;}else _0x5a48c1[_0x354b96(0x153)][0x1]===-0x2&&(this['_list'][_0x294be3]['parameters'][0x1]=_0x5a48c1['parameters'][0x1]);},Game_Interpreter[_0x1704b3(0x2a8)][_0x1704b3(0x1b1)]=function(_0x1c4cf0,_0x394121){const _0x4d6598=_0x1704b3;for(const _0x364da3 of _0x1c4cf0[_0x4d6598(0x153)][0x0]){this[_0x4d6598(0x203)][_0x394121][_0x4d6598(0x153)][0x0][_0x4d6598(0x337)](_0x364da3);}this['_list']['splice'](this[_0x4d6598(0x384)]-0x1,0x2);},Game_Interpreter['prototype'][_0x1704b3(0x238)]=function(_0x5532ff){const _0x95160f=_0x1704b3,_0x194830=_0x5532ff[0x1];if(_0x194830===_0x95160f(0x17f))this[_0x95160f(0x384)]++,this['setWeaponChoice'](_0x5532ff);else{if(_0x194830===_0x95160f(0x2c0))_0x95160f(0x372)===_0x95160f(0x25e)?(_0x486a41['x']=this['obtainEscapeParam'](_0x14d43b),_0x28c316['MessageCore'][_0x95160f(0x245)][_0x95160f(0x1fa)][_0x95160f(0x270)]&&(_0x3f26ca['x']+=_0x3d77a3['startX'])):(this[_0x95160f(0x384)]++,this[_0x95160f(0x149)](_0x5532ff));else{if(_0x194830===_0x95160f(0x335)&&Imported['VisuMZ_1_SkillsStatesCore']){if(_0x95160f(0x1b0)!==_0x95160f(0x1b0)){const _0x1a0418=this[_0x95160f(0x9f)](_0x95160f(0x210));return _0x1a0418>0xa?_0x1ea8a6[_0x95160f(0x39a)]:_0x1a0418;}else this[_0x95160f(0x384)]++,this[_0x95160f(0x360)](_0x5532ff);}}}},Game_Interpreter[_0x1704b3(0x2a8)][_0x1704b3(0x167)]=function(_0x5dc2a0){const _0x38d234=_0x1704b3,_0x4cfbdd=JSON['parse'](JSON[_0x38d234(0x281)](_0x5dc2a0[0x3]));VisuMZ[_0x38d234(0x12a)](_0x4cfbdd,_0x4cfbdd),$gameMessage[_0x38d234(0x167)](_0x4cfbdd[_0x38d234(0x18d)]||0x0,_0x4cfbdd[_0x38d234(0x2a5)]||0x0);},Game_Interpreter[_0x1704b3(0x2a8)]['setArmorChoice']=function(_0x38985d){const _0x37d374=_0x1704b3,_0x20a0d6=JSON[_0x37d374(0xc9)](JSON[_0x37d374(0x281)](_0x38985d[0x3]));VisuMZ[_0x37d374(0x12a)](_0x20a0d6,_0x20a0d6),$gameMessage[_0x37d374(0x149)](_0x20a0d6[_0x37d374(0x18d)]||0x0,_0x20a0d6[_0x37d374(0x3ae)]||0x0,_0x20a0d6[_0x37d374(0x1ff)]||0x0);},Game_Interpreter['prototype']['setSkillChoice']=function(_0x4d0b2b){const _0x1126f4=_0x1704b3,_0x1d552f=JSON[_0x1126f4(0xc9)](JSON['stringify'](_0x4d0b2b[0x3]));VisuMZ[_0x1126f4(0x12a)](_0x1d552f,_0x1d552f),$gameMessage[_0x1126f4(0x360)](_0x1d552f[_0x1126f4(0x18d)]||0x0,_0x1d552f[_0x1126f4(0x3b6)]||0x0,_0x1d552f[_0x1126f4(0x309)]||0x0);};function Game_MessageCommonEvent(){this['initialize'](...arguments);}Game_MessageCommonEvent[_0x1704b3(0x2a8)][_0x1704b3(0x239)]=function(_0x4bea9e,_0x3ddcb0){const _0x3976ff=_0x1704b3;this[_0x3976ff(0x2d8)]=_0x4bea9e,this[_0x3976ff(0x3d2)]=_0x3ddcb0||0x0,this[_0x3976ff(0xae)]();},Game_MessageCommonEvent[_0x1704b3(0x2a8)][_0x1704b3(0x221)]=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent[_0x1704b3(0x2a8)][_0x1704b3(0x343)]=function(){const _0x1aef4b=_0x1704b3;return this['event']()[_0x1aef4b(0x343)];},Game_MessageCommonEvent[_0x1704b3(0x2a8)][_0x1704b3(0xae)]=function(){const _0x46076b=_0x1704b3;this[_0x46076b(0x88)]=new Game_Interpreter(),this[_0x46076b(0x88)][_0x46076b(0x27b)](this[_0x46076b(0x343)](),this[_0x46076b(0x3d2)]);},Game_MessageCommonEvent[_0x1704b3(0x2a8)][_0x1704b3(0x3cc)]=function(){const _0x35858a=_0x1704b3;if(this['_interpreter']){if(this[_0x35858a(0x88)][_0x35858a(0x3c4)]())this['_interpreter'][_0x35858a(0x3cc)]();else{if(_0x35858a(0x2c7)===_0x35858a(0x2c7))this['clear']();else{this[_0x35858a(0x257)]===_0x404cba&&this['registerActorNameAutoColorChanges']();for(_0x45611d of this['_autoColorActorNames']){_0x4dfc40=_0x1ca0ed[_0x35858a(0x3ca)](_0xf81b6b[0x0],_0x20265f[0x1]);}return _0x87f04a;}}}},Game_MessageCommonEvent['prototype'][_0x1704b3(0x222)]=function(){this['_interpreter']=null;},Scene_Message[_0x1704b3(0x2a8)][_0x1704b3(0xaa)]=function(){const _0x50a44f=_0x1704b3,_0x2c88d9=Math[_0x50a44f(0x124)](Graphics[_0x50a44f(0xd1)],$gameSystem[_0x50a44f(0x16b)]()),_0x2f4ded=$gameSystem[_0x50a44f(0xe6)](),_0x35078e=this['calcWindowHeight'](_0x2f4ded,![]),_0xc693fb=(Graphics[_0x50a44f(0x2a4)]-_0x2c88d9)/0x2,_0x1e49fe=0x0;return new Rectangle(_0xc693fb,_0x1e49fe,_0x2c88d9,_0x35078e);},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x21c)]=Scene_Message[_0x1704b3(0x2a8)][_0x1704b3(0x199)],Scene_Message[_0x1704b3(0x2a8)][_0x1704b3(0x199)]=function(){const _0x449c0e=_0x1704b3;VisuMZ[_0x449c0e(0x15d)][_0x449c0e(0x21c)]['call'](this),this[_0x449c0e(0x78)]();},Scene_Message[_0x1704b3(0x2a8)][_0x1704b3(0x78)]=function(){const _0x319bf2=_0x1704b3,_0x3353e3=this[_0x319bf2(0x3df)](),_0x54d45d=new Window_Help(_0x3353e3);_0x54d45d[_0x319bf2(0x234)](),this[_0x319bf2(0x308)][_0x319bf2(0x101)](_0x54d45d),this[_0x319bf2(0xf6)][_0x319bf2(0x8a)](_0x54d45d),this['addWindow'](_0x54d45d),this[_0x319bf2(0x135)]=_0x54d45d;},Scene_Message['prototype']['choiceListHelpWindowRect']=function(){const _0x4c3d6f=_0x1704b3,_0x3e2ad6=0x0,_0x38d0b0=0x0,_0x52aa22=Graphics['boxWidth'],_0x1a3461=this[_0x4c3d6f(0x33a)](0x2,![]);return new Rectangle(_0x3e2ad6,_0x38d0b0,_0x52aa22,_0x1a3461);},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x8a)]=function(_0x3f4163){this['_choiceListHelpWindow']=_0x3f4163;},Window_Message['prototype'][_0x1704b3(0x2ba)]=function(){const _0xa6e2c3=_0x1704b3;if(!this['_choiceListHelpWindow'])return;const _0x936f4d=this[_0xa6e2c3(0x135)];_0x936f4d&&(_0x936f4d['y']=this['y']>0x0?0x0:Graphics[_0xa6e2c3(0x146)]-_0x936f4d['height']);},VisuMZ[_0x1704b3(0x15d)]['Scene_Options_maxCommands']=Scene_Options['prototype'][_0x1704b3(0x1fc)],Scene_Options['prototype'][_0x1704b3(0x1fc)]=function(){const _0x7544dd=_0x1704b3;let _0x52bc31=VisuMZ[_0x7544dd(0x15d)]['Scene_Options_maxCommands'][_0x7544dd(0x1d9)](this);const _0x53d807=VisuMZ[_0x7544dd(0x15d)]['Settings'];if(_0x53d807[_0x7544dd(0x3c0)][_0x7544dd(0x381)]&&_0x53d807[_0x7544dd(0x3c0)][_0x7544dd(0x232)])_0x52bc31++;return _0x52bc31;},VisuMZ['MessageCore'][_0x1704b3(0x346)]=Sprite_Picture['prototype'][_0x1704b3(0xfa)],Sprite_Picture['prototype'][_0x1704b3(0xfa)]=function(){const _0x78e6c9=_0x1704b3;VisuMZ['MessageCore'][_0x78e6c9(0x346)][_0x78e6c9(0x1d9)](this),this[_0x78e6c9(0x143)]();},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x327)]=Sprite_Picture[_0x1704b3(0x2a8)][_0x1704b3(0x3cc)],Sprite_Picture[_0x1704b3(0x2a8)][_0x1704b3(0x3cc)]=function(){const _0x26fe1d=_0x1704b3;VisuMZ[_0x26fe1d(0x15d)][_0x26fe1d(0x327)][_0x26fe1d(0x1d9)](this),this[_0x26fe1d(0x162)]();},Sprite_Picture[_0x1704b3(0x2a8)][_0x1704b3(0x162)]=function(){const _0x5e51bd=_0x1704b3;if(!this[_0x5e51bd(0x169)])return;this[_0x5e51bd(0x355)](),this[_0x5e51bd(0x350)](),this[_0x5e51bd(0x1e8)](),this['attachPictureText']();},Sprite_Picture[_0x1704b3(0x2a8)][_0x1704b3(0x143)]=function(){const _0x193a36=_0x1704b3;if(this[_0x193a36(0x164)])return;if(this[_0x193a36(0x2c6)])return;const _0x366e3a=new Rectangle(0x0,0x0,0x0,0x0);this['_pictureTextWindow']=new Window_Base(_0x366e3a),this['_pictureTextWindow'][_0x193a36(0x1c0)]=0x0,this[_0x193a36(0x2c6)]=new Sprite(),this['addChildAt'](this[_0x193a36(0x2c6)],0x0),this['_pictureTextWidth']=0x0,this['_pictureTextHeight']=0x0,this['_pictureTextCache']={};},Sprite_Picture[_0x1704b3(0x2a8)][_0x1704b3(0x355)]=function(){const _0xc88a06=_0x1704b3;if(!this[_0xc88a06(0x164)])return;if(this[_0xc88a06(0x229)]===this[_0xc88a06(0xd1)]&&this['_pictureTextHeight']===this[_0xc88a06(0x241)])return;this[_0xc88a06(0x229)]=this[_0xc88a06(0xd1)],this['_pictureTextHeight']=this[_0xc88a06(0x241)],this[_0xc88a06(0x3b8)]={},this['_pictureTextWindow']['move'](0x0,0x0,this[_0xc88a06(0xd1)],this[_0xc88a06(0x241)]);},Sprite_Picture['prototype'][_0x1704b3(0x350)]=function(){const _0x40f042=_0x1704b3;if(!this[_0x40f042(0x2c6)])return;this[_0x40f042(0x2c6)][_0x40f042(0xb1)]['x']=this[_0x40f042(0xb1)]['x'],this[_0x40f042(0x2c6)][_0x40f042(0xb1)]['y']=this['anchor']['y'];},Sprite_Picture[_0x1704b3(0x2a8)][_0x1704b3(0x1e8)]=function(){const _0x2f2173=_0x1704b3;if(!this[_0x2f2173(0x164)])return;if(!this['anyPictureTextChanges']())return;const _0x67a4cc=[_0x2f2173(0x3bc),'up','upperright',_0x2f2173(0x2b9),'center','right',_0x2f2173(0x3b3),_0x2f2173(0x37a),_0x2f2173(0x175)];this[_0x2f2173(0x164)]['createContents']();for(const _0x580084 of _0x67a4cc){_0x2f2173(0x382)!=='QwXSo'?(this[_0x2f2173(0x2b2)]['clear'](),this['_helpWindow'][_0x2f2173(0x234)]()):this[_0x2f2173(0x1c5)](_0x580084);}},Sprite_Picture['prototype']['anyPictureTextChanges']=function(){const _0x28715e=_0x1704b3;if($gameScreen['needsPictureTextRefresh'](this[_0x28715e(0xc2)]))return!![];const _0x36cf5b=[_0x28715e(0x3bc),'up',_0x28715e(0x12d),_0x28715e(0x2b9),_0x28715e(0xbf),_0x28715e(0x38b),_0x28715e(0x3b3),'down',_0x28715e(0x175)];for(const _0x5a33cb of _0x36cf5b){if(_0x28715e(0xe2)!==_0x28715e(0xe2))_0x26f670=this[_0x28715e(0x387)](),_0x20f23d['MessageCore'][_0x28715e(0x3ac)]['call'](this,_0x490e54),_0x263a87[_0x28715e(0x3a0)]();else{const _0x2d2972=$gameScreen[_0x28715e(0x2e0)](this[_0x28715e(0xc2)],_0x5a33cb);if(this[_0x28715e(0x3b8)][_0x5a33cb]===_0x2d2972)continue;return!![];}}return![];},Sprite_Picture['prototype'][_0x1704b3(0x1c5)]=function(_0x3793ba){const _0x4fd3a5=_0x1704b3;$gameScreen[_0x4fd3a5(0x34a)](this[_0x4fd3a5(0xc2)]);const _0x3765e4=$gameScreen[_0x4fd3a5(0x2e0)](this['_pictureId'],_0x3793ba);this[_0x4fd3a5(0x3b8)][_0x3793ba]=_0x3765e4;const _0x5ce3cf=this[_0x4fd3a5(0x164)][_0x4fd3a5(0x3c5)](_0x3765e4);let _0x4089ae=$gameScreen[_0x4fd3a5(0x145)](this[_0x4fd3a5(0xc2)]),_0x8e99ab=_0x4089ae,_0x20a35e=_0x4089ae;if(['up','center','down'][_0x4fd3a5(0xc1)](_0x3793ba))_0x8e99ab=Math['floor']((this[_0x4fd3a5(0xd1)]-_0x5ce3cf[_0x4fd3a5(0xd1)])/0x2);else[_0x4fd3a5(0x12d),_0x4fd3a5(0x38b),'lowerright'][_0x4fd3a5(0xc1)](_0x3793ba)&&(_0x8e99ab=Math['floor'](this[_0x4fd3a5(0xd1)]-_0x5ce3cf[_0x4fd3a5(0xd1)]-_0x4089ae));if([_0x4fd3a5(0x2b9),_0x4fd3a5(0xbf),_0x4fd3a5(0x38b)]['includes'](_0x3793ba)){if('Lgcwh'===_0x4fd3a5(0xfd)){if(!this[_0x4fd3a5(0x164)])return;if(!this[_0x4fd3a5(0x2c6)])return;this[_0x4fd3a5(0x2c6)][_0x4fd3a5(0xf2)]=this[_0x4fd3a5(0x164)]['contents'];}else _0x20a35e=Math['floor']((this[_0x4fd3a5(0x241)]-_0x5ce3cf[_0x4fd3a5(0x241)])/0x2);}else[_0x4fd3a5(0x3b3),_0x4fd3a5(0x37a),_0x4fd3a5(0x175)]['includes'](_0x3793ba)&&(_0x20a35e=Math[_0x4fd3a5(0x2da)](this[_0x4fd3a5(0x241)]-_0x5ce3cf[_0x4fd3a5(0x241)]-_0x4089ae));this[_0x4fd3a5(0x164)][_0x4fd3a5(0xf3)](_0x3765e4,_0x8e99ab,_0x20a35e);},Sprite_Picture[_0x1704b3(0x2a8)][_0x1704b3(0xd7)]=function(){const _0x259555=_0x1704b3;if(!this[_0x259555(0x164)])return;if(!this[_0x259555(0x2c6)])return;this[_0x259555(0x2c6)][_0x259555(0xf2)]=this['_pictureTextWindow'][_0x259555(0x20c)];},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x23c)]=Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x239)],Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x239)]=function(_0x5a90fa){const _0x56ff42=_0x1704b3;this[_0x56ff42(0x30a)](_0x5a90fa),VisuMZ['MessageCore']['Window_Base_initialize'][_0x56ff42(0x1d9)](this,_0x5a90fa);},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x30a)]=function(_0x1478d3){const _0x29ef42=_0x1704b3;this[_0x29ef42(0x13c)](),this[_0x29ef42(0x70)](),this['registerResetRect'](_0x1478d3);},Window_Base['prototype'][_0x1704b3(0x13c)]=function(){const _0x1969e5=_0x1704b3;this['setTextAlignment'](_0x1969e5(0x183));},Window_Base['prototype'][_0x1704b3(0x9b)]=function(_0x1d9152){const _0x535ec5=_0x1704b3;this[_0x535ec5(0xed)]=_0x1d9152;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0xbd)]=function(){const _0x251801=_0x1704b3;return this[_0x251801(0xed)];},VisuMZ['MessageCore'][_0x1704b3(0x95)]=Window_Base['prototype']['textSizeEx'],Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x3c5)]=function(_0x3edf96){const _0x3ff562=_0x1704b3;return this[_0x3ff562(0x70)](),VisuMZ[_0x3ff562(0x15d)][_0x3ff562(0x95)][_0x3ff562(0x1d9)](this,_0x3edf96);},Window_Base[_0x1704b3(0x2a8)]['textSizeExRaw']=function(_0x10c55a){const _0x2c5b4b=_0x1704b3;return VisuMZ[_0x2c5b4b(0x15d)][_0x2c5b4b(0x95)][_0x2c5b4b(0x1d9)](this,_0x10c55a);},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x29c)]=Window_Base['prototype']['processAllText'],Window_Base['prototype']['processAllText']=function(_0x250cbe){const _0x546311=_0x1704b3;VisuMZ[_0x546311(0x15d)][_0x546311(0x29c)][_0x546311(0x1d9)](this,_0x250cbe);if(_0x250cbe[_0x546311(0x3cb)])this[_0x546311(0x9b)](_0x546311(0x183));},Window_Base['prototype'][_0x1704b3(0x70)]=function(){const _0x2f95a7=_0x1704b3;this[_0x2f95a7(0x73)](![]);},Window_Base[_0x1704b3(0x2a8)]['isWordWrapEnabled']=function(){const _0x5e8556=_0x1704b3;return this[_0x5e8556(0x220)];},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x73)]=function(_0x4464d3){const _0x5156e6=_0x1704b3;return this[_0x5156e6(0x220)]=_0x4464d3,'';},Window_Base['prototype'][_0x1704b3(0x2d2)]=function(_0x52b1a6){const _0x2b919a=_0x1704b3;this['_resetRect']=JsonEx[_0x2b919a(0x29d)](_0x52b1a6);},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x115)]=function(){const _0x2ef87a=_0x1704b3;this[_0x2ef87a(0x20c)]['fontFace']=$gameSystem[_0x2ef87a(0x351)](),this[_0x2ef87a(0x20c)][_0x2ef87a(0x9e)]=$gameSystem[_0x2ef87a(0x19a)](),this['contents'][_0x2ef87a(0x22e)]=![],this[_0x2ef87a(0x20c)][_0x2ef87a(0x121)]=![],this[_0x2ef87a(0x1a5)]();},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x1a5)]=function(){const _0x23282a=_0x1704b3;this[_0x23282a(0x2f9)](ColorManager[_0x23282a(0x29f)]()),this['changeOutlineColor'](ColorManager['outlineColor']());const _0x298092=VisuMZ[_0x23282a(0x15d)][_0x23282a(0x245)][_0x23282a(0x1fa)];_0x298092['DefaultOutlineWidth']===undefined&&('JAPyz'!==_0x23282a(0x374)?_0x2e822b[_0x23282a(0x186)](_0x54d3e0):_0x298092[_0x23282a(0x390)]=0x3),this[_0x23282a(0x20c)][_0x23282a(0x1a4)]=_0x298092[_0x23282a(0x390)],this[_0x23282a(0x34b)](![]);},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x34b)]=function(_0x7538c6){this['_colorLock']=_0x7538c6;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0xdb)]=function(){const _0x38f4cc=_0x1704b3;return this[_0x38f4cc(0x11a)];},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x9a)]=function(){return![];},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x179)]=function(){const _0x4fa4dd=_0x1704b3,_0x1bf9aa=['fontFace',_0x4fa4dd(0x9e),_0x4fa4dd(0x22e),'fontItalic',_0x4fa4dd(0x2ce),_0x4fa4dd(0x10e),_0x4fa4dd(0x1a4),_0x4fa4dd(0xf9)];let _0x2ef7ad={};for(const _0x3d6456 of _0x1bf9aa){_0x2ef7ad[_0x3d6456]=this['contents'][_0x3d6456];}return _0x2ef7ad;},Window_Base['prototype'][_0x1704b3(0x201)]=function(_0x2dbfaf){const _0x403ae4=_0x1704b3;for(const _0x10f657 in _0x2dbfaf){this[_0x403ae4(0x20c)][_0x10f657]=_0x2dbfaf[_0x10f657];}},VisuMZ['MessageCore'][_0x1704b3(0x3b5)]=Window_Base['prototype'][_0x1704b3(0x3cc)],Window_Base['prototype']['update']=function(){const _0x40bd60=_0x1704b3;VisuMZ[_0x40bd60(0x15d)][_0x40bd60(0x3b5)][_0x40bd60(0x1d9)](this),this[_0x40bd60(0x23b)]();},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x15e)]=function(){return![];},Window_Base['prototype']['updateMove']=function(){const _0x2524df=_0x1704b3;if(this[_0x2524df(0x2e4)]>0x0){if(_0x2524df(0x198)===_0x2524df(0x7f)){if(!_0x2b37b1[_0x2524df(0x377)](_0x5047ff))return![];const _0xedd8d7=_0x4a2663[_0x2524df(0x26e)]();if(_0xedd8d7>0x0){if(_0x4abe9f[_0x2524df(0x378)]!==_0xedd8d7)return![];}const _0x5e4bb5=_0x19b44a[_0x2524df(0x2d5)]();if(_0x5e4bb5>0x0){if(_0xfdf11e[_0x2524df(0x156)]!==_0x5e4bb5)return![];}return!![];}else this[_0x2524df(0x15e)]()&&(this['x']=this['applyMoveEasing'](this['x'],this[_0x2524df(0x37f)]),this['y']=this['applyMoveEasing'](this['y'],this['_moveTargetY']),this[_0x2524df(0xd1)]=this[_0x2524df(0x33b)](this['width'],this[_0x2524df(0x35f)]),this['height']=this['applyMoveEasing'](this['height'],this[_0x2524df(0x158)]),this[_0x2524df(0x1c9)]()),this[_0x2524df(0x2e4)]--;}},Window_Base['prototype'][_0x1704b3(0x1c9)]=function(_0x4aebba,_0x711969){const _0x3103b5=_0x1704b3;!_0x4aebba&&(_0x3103b5(0x84)==='Iikmr'?(_0x211ae3['setFaceImage'](_0x49b427[0x0],_0x3e2731[0x1]),_0x296590[_0x3103b5(0xb8)](_0x2a7f77[0x2]),_0xf1c836[_0x3103b5(0x249)](_0x360803[0x3]),_0x27f241['setSpeakerName'](_0x6bb075[0x4])):(this[_0x3103b5(0xd1)]=Math[_0x3103b5(0x124)](this['width'],Graphics[_0x3103b5(0xd1)]),this['height']=Math[_0x3103b5(0x124)](this[_0x3103b5(0x241)],Graphics[_0x3103b5(0x241)])));if(!_0x711969){const _0x29a389=-(Math['floor'](Graphics[_0x3103b5(0xd1)]-Graphics['boxWidth'])/0x2),_0x417941=_0x29a389+Graphics[_0x3103b5(0xd1)]-this[_0x3103b5(0xd1)],_0x624a1=-(Math[_0x3103b5(0x2da)](Graphics['height']-Graphics['boxHeight'])/0x2),_0x35d72f=_0x624a1+Graphics[_0x3103b5(0x241)]-this[_0x3103b5(0x241)];this['x']=this['x'][_0x3103b5(0x14f)](_0x29a389,_0x417941),this['y']=this['y'][_0x3103b5(0x14f)](_0x624a1,_0x35d72f);}},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x33b)]=function(_0x2aec45,_0x376a38){const _0x34130e=_0x1704b3,_0xed794c=this[_0x34130e(0x2e4)],_0x5c678d=this[_0x34130e(0x29e)],_0x2734a4=this['calcMoveEasing']((_0x5c678d-_0xed794c)/_0x5c678d),_0x2accc0=this[_0x34130e(0x379)]((_0x5c678d-_0xed794c+0x1)/_0x5c678d),_0x59263c=(_0x2aec45-_0x376a38*_0x2734a4)/(0x1-_0x2734a4);return _0x59263c+(_0x376a38-_0x59263c)*_0x2accc0;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x379)]=function(_0x2bcfa9){const _0x1aa917=_0x1704b3,_0x2d0a1f=0x2;switch(this[_0x1aa917(0x260)]){case 0x0:return _0x2bcfa9;case 0x1:return this[_0x1aa917(0x99)](_0x2bcfa9,_0x2d0a1f);case 0x2:return this['easeOut'](_0x2bcfa9,_0x2d0a1f);case 0x3:return this[_0x1aa917(0x14a)](_0x2bcfa9,_0x2d0a1f);default:return Imported[_0x1aa917(0x1f1)]?VisuMZ[_0x1aa917(0x33b)](_0x2bcfa9,this[_0x1aa917(0x260)]):_0x2bcfa9;}},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x136)]=function(_0x1775d2,_0x1cd1ce,_0x5b17a5,_0x5711d7,_0x6ef4b8,_0x119bd3){const _0x408ce3=_0x1704b3;this[_0x408ce3(0x37f)]=_0x1775d2,this[_0x408ce3(0x36f)]=_0x1cd1ce,this[_0x408ce3(0x35f)]=_0x5b17a5||this[_0x408ce3(0xd1)],this[_0x408ce3(0x158)]=_0x5711d7||this['height'],this[_0x408ce3(0x2e4)]=_0x6ef4b8||0x1;if(this['_moveDuration']<=0x0)this['_moveDuration']=0x1;this[_0x408ce3(0x29e)]=this[_0x408ce3(0x2e4)],this[_0x408ce3(0x260)]=_0x119bd3||0x0;if(_0x6ef4b8<=0x0)this[_0x408ce3(0x23b)]();},Window_Base['prototype']['moveBy']=function(_0x222f05,_0x218a60,_0x4c2503,_0x539e47,_0x58712c,_0x52c2f8){const _0x85d63f=_0x1704b3;this[_0x85d63f(0x37f)]=this['x']+_0x222f05,this[_0x85d63f(0x36f)]=this['y']+_0x218a60,this[_0x85d63f(0x35f)]=this[_0x85d63f(0xd1)]+(_0x4c2503||0x0),this[_0x85d63f(0x158)]=this[_0x85d63f(0x241)]+(_0x539e47||0x0),this[_0x85d63f(0x2e4)]=_0x58712c||0x1;if(this[_0x85d63f(0x2e4)]<=0x0)this['_moveDuration']=0x1;this[_0x85d63f(0x29e)]=this[_0x85d63f(0x2e4)],this[_0x85d63f(0x260)]=_0x52c2f8||0x0;if(_0x58712c<=0x0)this[_0x85d63f(0x23b)]();},Window_Base[_0x1704b3(0x2a8)]['resetRect']=function(_0x4210b4,_0x263c62){const _0x411aae=_0x1704b3;this[_0x411aae(0x136)](this[_0x411aae(0x1ab)]['x'],this[_0x411aae(0x1ab)]['y'],this[_0x411aae(0x1ab)][_0x411aae(0xd1)],this['_resetRect'][_0x411aae(0x241)],_0x4210b4,_0x263c62);},VisuMZ['MessageCore'][_0x1704b3(0x3b1)]=Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x2f9)],Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x2f9)]=function(_0x11e575){const _0x416796=_0x1704b3;if(this[_0x416796(0xdb)]())return;_0x11e575=_0x11e575['replace'](/\,/g,''),this[_0x416796(0x194)]=this[_0x416796(0x194)]||[],this[_0x416796(0x194)]['unshift'](this[_0x416796(0x20c)][_0x416796(0x2ce)]),VisuMZ[_0x416796(0x15d)][_0x416796(0x3b1)]['call'](this,_0x11e575);},Window_Base['prototype']['processPreviousColor']=function(_0x201358){const _0x5b580c=_0x1704b3;this[_0x5b580c(0x16f)](_0x201358);if(this['isColorLocked']())return;_0x201358[_0x5b580c(0x3cb)]&&(this[_0x5b580c(0x194)]=this[_0x5b580c(0x194)]||[],this[_0x5b580c(0x20c)][_0x5b580c(0x2ce)]=this['_textColorStack'][_0x5b580c(0x2bb)]()||ColorManager[_0x5b580c(0x29f)]());},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x32d)]=function(_0x4f9210){const _0x5a463a=_0x1704b3;return _0x4f9210=this[_0x5a463a(0x163)](_0x4f9210),_0x4f9210=this['convertBackslashCharacters'](_0x4f9210),_0x4f9210=this[_0x5a463a(0x3da)](_0x4f9210),_0x4f9210=this[_0x5a463a(0x34d)](_0x4f9210),_0x4f9210=this['preConvertEscapeCharacters'](_0x4f9210),_0x4f9210=this[_0x5a463a(0x394)](_0x4f9210),_0x4f9210=this[_0x5a463a(0xc7)](_0x4f9210),_0x4f9210=this[_0x5a463a(0x1db)](_0x4f9210),_0x4f9210=this[_0x5a463a(0x388)](_0x4f9210),_0x4f9210=this[_0x5a463a(0x13f)](_0x4f9210),_0x4f9210=this[_0x5a463a(0xdf)](_0x4f9210),_0x4f9210=this[_0x5a463a(0xb3)](_0x4f9210),_0x4f9210=this[_0x5a463a(0x1a6)](_0x4f9210),_0x4f9210=this[_0x5a463a(0x30e)](_0x4f9210),_0x4f9210=this['convertVariableEscapeCharacters'](_0x4f9210),_0x4f9210=this[_0x5a463a(0x20a)](_0x4f9210),_0x4f9210=this[_0x5a463a(0x119)](_0x4f9210),_0x4f9210;},Window_Base['prototype'][_0x1704b3(0x163)]=function(_0x11001a){const _0x337623=_0x1704b3;this[_0x337623(0x18c)]=![];for(const _0x4ff568 of VisuMZ['MessageCore'][_0x337623(0x245)][_0x337623(0x365)]){if('tQiee'!==_0x337623(0x1bb))_0x57f515[_0x337623(0x15d)][_0x337623(0x208)][_0x337623(0x1d9)](this),this['initMessageCore']();else{if(_0x11001a[_0x337623(0x1bf)](_0x4ff568[_0x337623(0xc0)])){if(_0x337623(0x3cf)!==_0x337623(0x1c2))this[_0x337623(0x18c)]=!![],_0x11001a=_0x11001a[_0x337623(0x3ca)](_0x4ff568[_0x337623(0xc0)],_0x4ff568[_0x337623(0x1d7)]['bind'](this));else{if(_0x15d262['atypeId']!==_0x59b9dc)return![];}}}}return _0x11001a;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x22f)]=function(_0x5d75cb){const _0x422c82=_0x1704b3;return _0x5d75cb=_0x5d75cb[_0x422c82(0x3ca)](/\\/g,'\x1b'),_0x5d75cb=_0x5d75cb['replace'](/\x1b\x1b/g,'\x5c'),_0x5d75cb;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x3da)]=function(_0x347088){const _0x30c547=_0x1704b3;for(;;){if(_0x347088['match'](/\\V\[(\d+)\]/gi))_0x347088=_0x347088[_0x30c547(0x3ca)](/\\V\[(\d+)\]/gi,(_0x598635,_0x23f231)=>this[_0x30c547(0x22f)](String($gameVariables[_0x30c547(0x3d0)](parseInt(_0x23f231)))));else{if(_0x347088[_0x30c547(0x1bf)](/\x1bV\[(\d+)\]/gi))_0x30c547(0x159)!==_0x30c547(0x159)?(this[_0x30c547(0x20c)][_0x30c547(0x9e)]-=_0x237ff[_0x30c547(0x15d)][_0x30c547(0x245)]['General'][_0x30c547(0x3c1)],this[_0x30c547(0x20c)][_0x30c547(0x9e)]=_0x96bbd3[_0x30c547(0x1a8)](this[_0x30c547(0x20c)][_0x30c547(0x9e)],_0x328ecc[_0x30c547(0x15d)]['Settings'][_0x30c547(0x1fa)]['FontSmallerCap'])):_0x347088=_0x347088[_0x30c547(0x3ca)](/\x1bV\[(\d+)\]/gi,(_0x2371d6,_0x50409e)=>this[_0x30c547(0x22f)](String($gameVariables[_0x30c547(0x3d0)](parseInt(_0x50409e)))));else{if(_0x30c547(0x178)===_0x30c547(0x10b))this['_helpWindow']['clear'](),this['_helpWindow'][_0x30c547(0x234)]();else break;}}}return _0x347088;},Window_Base[_0x1704b3(0x2a8)]['convertButtonAssistEscapeCharacters']=function(_0x1c5809){const _0x1a14ff=_0x1704b3;return Imported[_0x1a14ff(0x1f1)]&&(_0x1c5809=_0x1c5809['replace'](/<Up (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('up')),_0x1c5809=_0x1c5809[_0x1a14ff(0x3ca)](/<Left (?:KEY|BUTTON)>/gi,this[_0x1a14ff(0x1a1)](_0x1a14ff(0x2b9))),_0x1c5809=_0x1c5809[_0x1a14ff(0x3ca)](/<Right (?:KEY|BUTTON)>/gi,this[_0x1a14ff(0x1a1)](_0x1a14ff(0x38b))),_0x1c5809=_0x1c5809[_0x1a14ff(0x3ca)](/<Down (?:KEY|BUTTON)>/gi,this[_0x1a14ff(0x1a1)](_0x1a14ff(0x37a))),_0x1c5809=_0x1c5809[_0x1a14ff(0x3ca)](/<Ok (?:KEY|BUTTON)>/gi,this[_0x1a14ff(0x1a1)]('ok')),_0x1c5809=_0x1c5809[_0x1a14ff(0x3ca)](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x1a14ff(0x1a1)](_0x1a14ff(0x2c8))),_0x1c5809=_0x1c5809[_0x1a14ff(0x3ca)](/<Menu (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x1a14ff(0x303))),_0x1c5809=_0x1c5809['replace'](/<Shift (?:KEY|BUTTON)>/gi,this[_0x1a14ff(0x1a1)](_0x1a14ff(0x2bb))),_0x1c5809=_0x1c5809[_0x1a14ff(0x3ca)](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x1a14ff(0x1a1)]('pageup')),_0x1c5809=_0x1c5809[_0x1a14ff(0x3ca)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x1a14ff(0x285)))),_0x1c5809;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x1a1)]=function(_0x1cdfd5){const _0x4a140b=_0x1704b3;let _0x545cab=TextManager['getInputButtonString'](_0x1cdfd5)||'';return _0x545cab=this[_0x4a140b(0x22f)](_0x545cab),_0x545cab=this[_0x4a140b(0x3da)](_0x545cab),_0x545cab[_0x4a140b(0x375)]();},Window_Base['prototype'][_0x1704b3(0x1ea)]=function(_0x5521cb){return this['registerActorNameAutoColorChanges'](),_0x5521cb;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x30e)]=function(_0x11236a){return _0x11236a;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x394)]=function(_0x5f2a4d){const _0x2b90a0=_0x1704b3;return this[_0x2b90a0(0x3b9)]()&&(_0x5f2a4d=_0x5f2a4d[_0x2b90a0(0x3ca)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x5f2a4d=_0x5f2a4d['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x5f2a4d=_0x5f2a4d[_0x2b90a0(0x3ca)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x5f2a4d=_0x5f2a4d[_0x2b90a0(0x3ca)](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x5f2a4d=_0x5f2a4d[_0x2b90a0(0x3ca)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x5f2a4d=_0x5f2a4d[_0x2b90a0(0x3ca)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,'')),_0x5f2a4d;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x3b9)]=function(){const _0xdbb58=_0x1704b3,_0x89dd3b=[_0xdbb58(0x227),_0xdbb58(0x2dd)];return _0x89dd3b[_0xdbb58(0xc1)](this[_0xdbb58(0x27e)][_0xdbb58(0x3d6)]);},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0xc7)]=function(_0x1e7786){const _0x5619e4=_0x1704b3;return _0x1e7786=_0x1e7786[_0x5619e4(0x3ca)](/<B>/gi,_0x5619e4(0x82)),_0x1e7786=_0x1e7786[_0x5619e4(0x3ca)](/<\/B>/gi,_0x5619e4(0x3b2)),_0x1e7786=_0x1e7786[_0x5619e4(0x3ca)](/<I>/gi,_0x5619e4(0x224)),_0x1e7786=_0x1e7786['replace'](/<\/I>/gi,'\x1bITALIC[0]'),_0x1e7786;},Window_Base[_0x1704b3(0x2a8)]['convertTextAlignmentEscapeCharacters']=function(_0x258b53){const _0x49309b=_0x1704b3;return _0x258b53=_0x258b53['replace'](/<LEFT>/gi,_0x49309b(0x353)),_0x258b53=_0x258b53[_0x49309b(0x3ca)](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x258b53=_0x258b53[_0x49309b(0x3ca)](/<CENTER>/gi,_0x49309b(0x2fa)),_0x258b53=_0x258b53[_0x49309b(0x3ca)](/<\/CENTER>/gi,_0x49309b(0x1a3)),_0x258b53=_0x258b53[_0x49309b(0x3ca)](/<RIGHT>/gi,_0x49309b(0x1e4)),_0x258b53=_0x258b53[_0x49309b(0x3ca)](/<\/RIGHT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x258b53;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x388)]=function(_0x558355){const _0x410d76=_0x1704b3;return _0x558355=_0x558355[_0x410d76(0x3ca)](/<COLORLOCK>/gi,_0x410d76(0x219)),_0x558355=_0x558355[_0x410d76(0x3ca)](/<\/COLORLOCK>/gi,_0x410d76(0x28b)),_0x558355=_0x558355['replace'](/\(\(\(/gi,_0x410d76(0x219)),_0x558355=_0x558355['replace'](/\)\)\)/gi,_0x410d76(0x28b)),_0x558355;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x13f)]=function(_0x42260a){const _0x16302b=_0x1704b3;return _0x42260a=_0x42260a['replace'](/\x1bN\[(\d+)\]/gi,(_0x4a1f8c,_0x20c43e)=>this['actorName'](parseInt(_0x20c43e))),_0x42260a=_0x42260a[_0x16302b(0x3ca)](/\x1bP\[(\d+)\]/gi,(_0x22f1c6,_0x480760)=>this[_0x16302b(0x2ca)](parseInt(_0x480760))),_0x42260a=_0x42260a['replace'](/\x1bG/gi,TextManager['currencyUnit']),_0x42260a;},Window_Base['prototype'][_0x1704b3(0xdf)]=function(_0x140b9c){const _0x9ddea=_0x1704b3;return _0x140b9c=_0x140b9c[_0x9ddea(0x3ca)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x9ddea(0x223)]()),_0x140b9c=_0x140b9c[_0x9ddea(0x3ca)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x9ddea(0x72)]()),_0x140b9c=_0x140b9c[_0x9ddea(0x3ca)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x9ddea(0x3c8)](!![])),_0x140b9c=_0x140b9c['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x9ddea(0x3c8)](![])),_0x140b9c;},Window_Base[_0x1704b3(0x2a8)]['battleTargetName']=function(){const _0x2c79b1=_0x1704b3;if(!SceneManager[_0x2c79b1(0xcd)]())return'';if(BattleManager[_0x2c79b1(0x37d)])return BattleManager['_target'][_0x2c79b1(0x3d6)]();if(BattleManager[_0x2c79b1(0xf8)][0x0])return BattleManager[_0x2c79b1(0xf8)][0x0][_0x2c79b1(0x3d6)]();return'';},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x72)]=function(){const _0x21f95c=_0x1704b3;if(!SceneManager[_0x21f95c(0xcd)]())return'';let _0x3c62a6=null;return _0x3c62a6=BattleManager[_0x21f95c(0x185)],!_0x3c62a6&&BattleManager['isInputting']()&&(_0x3c62a6=BattleManager[_0x21f95c(0x85)]()),_0x3c62a6?_0x3c62a6[_0x21f95c(0x3d6)]():'';},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x3c8)]=function(_0x9d1e9c){const _0x32c586=_0x1704b3;if(!SceneManager[_0x32c586(0xcd)]())return'';let _0x156eab=BattleManager[_0x32c586(0x12e)]||null;if(!_0x156eab&&BattleManager[_0x32c586(0x2ac)]()){if(_0x32c586(0x2d4)===_0x32c586(0x3ba)){const _0x34ec57=['upperleft','up',_0x32c586(0x12d),_0x32c586(0x2b9),_0x32c586(0xbf),'right',_0x32c586(0x3b3),'down','lowerright'];return _0x34ec57[_0x32c586(0x7d)](_0x272630=>this[_0x32c586(0x2e0)](_0x3544f6,_0x272630)!=='');}else _0x156eab=BattleManager[_0x32c586(0x107)]();}if(_0x156eab&&_0x156eab['item']()){let _0x37ecf7='';if(_0x9d1e9c)_0x37ecf7+=_0x32c586(0x347)[_0x32c586(0x344)](_0x156eab[_0x32c586(0x137)]()[_0x32c586(0x122)]);return _0x37ecf7+=_0x156eab[_0x32c586(0x137)]()['name'],_0x37ecf7;}return'';},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0xb3)]=function(_0x9edb34){const _0x5b7580=_0x1704b3;for(const _0x20ea91 of VisuMZ[_0x5b7580(0x15d)][_0x5b7580(0x245)][_0x5b7580(0x30c)]){_0x9edb34[_0x5b7580(0x1bf)](_0x20ea91[_0x5b7580(0xc0)])&&('wiQtQ'===_0x5b7580(0x307)?(_0x9edb34=_0x9edb34[_0x5b7580(0x3ca)](_0x20ea91[_0x5b7580(0xc0)],_0x20ea91[_0x5b7580(0x1d7)]),_0x9edb34=this['convertVariableEscapeCharacters'](_0x9edb34)):_0x2a9095['x']-=_0x31814b[_0x5b7580(0x144)]);}return _0x9edb34;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x1a6)]=function(_0x5c1a19){const _0xc8e1e3=_0x1704b3;for(const _0x16e3f7 of VisuMZ['MessageCore'][_0xc8e1e3(0x245)]['TextCodeReplace']){_0x5c1a19[_0xc8e1e3(0x1bf)](_0x16e3f7[_0xc8e1e3(0xc0)])&&(_0x5c1a19=_0x5c1a19['replace'](_0x16e3f7['textCodeCheck'],_0x16e3f7[_0xc8e1e3(0x1d7)][_0xc8e1e3(0x328)](this)),_0x5c1a19=this['convertVariableEscapeCharacters'](_0x5c1a19));}return _0x5c1a19;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x371)]=function(_0x12b197){const _0x4ca49e=_0x1704b3,_0x1065f6=_0x12b197>=0x1?$gameActors[_0x4ca49e(0x85)](_0x12b197):null,_0x48deff=_0x1065f6?_0x1065f6[_0x4ca49e(0x3d6)]():'',_0x8aca7=Number(VisuMZ[_0x4ca49e(0x15d)]['Settings'][_0x4ca49e(0x2df)][_0x4ca49e(0x2a7)]);return this[_0x4ca49e(0x9a)]()&&_0x8aca7!==0x0?_0x4ca49e(0x236)[_0x4ca49e(0x344)](_0x8aca7,_0x48deff):_0x4ca49e(0x21d)!=='mVUFk'?this[_0x4ca49e(0x319)]&&this[_0x4ca49e(0x319)]['constructor']===_0x557378:_0x48deff;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x2ca)]=function(_0x2bdd61){const _0xd4ef52=_0x1704b3,_0x3e9c70=_0x2bdd61>=0x1?$gameParty[_0xd4ef52(0x28d)]()[_0x2bdd61-0x1]:null,_0x46d122=_0x3e9c70?_0x3e9c70[_0xd4ef52(0x3d6)]():'',_0x484a8a=Number(VisuMZ[_0xd4ef52(0x15d)][_0xd4ef52(0x245)][_0xd4ef52(0x2df)][_0xd4ef52(0x2a7)]);if(this[_0xd4ef52(0x9a)]()&&_0x484a8a!==0x0){if('XalfI'===_0xd4ef52(0x9c))return _0xd4ef52(0x236)['format'](_0x484a8a,_0x46d122);else{if(this[_0xd4ef52(0x3ab)]===_0x57acf9)this[_0xd4ef52(0x30a)]();if(!_0x2f29bc)return;if(_0xb2196e['isItem'](_0x7ff325))this[_0xd4ef52(0x3ab)][_0xd4ef52(0x192)]=0x0;else{if(_0x31527b[_0xd4ef52(0x176)](_0x364728))this['_lastGainedItemData']['type']=0x1;else _0x232987['isArmor'](_0x5cde61)&&(this['_lastGainedItemData'][_0xd4ef52(0x192)]=0x2);}this[_0xd4ef52(0x3ab)]['id']=_0x10bdab['id'],this[_0xd4ef52(0x3ab)]['quantity']=_0x32d8ed;}}else return _0x46d122;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x20a)]=function(_0x396f50){const _0x58698a=_0x1704b3;return this[_0x58698a(0x9a)]()&&(_0x396f50=this['processStoredAutoColorChanges'](_0x396f50),_0x396f50=this[_0x58698a(0x87)](_0x396f50)),_0x396f50;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x17b)]=function(_0x35acc4){const _0x34ed33=_0x1704b3;for(autoColor of VisuMZ[_0x34ed33(0x15d)]['AutoColorRegExp']){_0x35acc4=_0x35acc4['replace'](autoColor[0x0],autoColor[0x1]);}return _0x35acc4;},Window_Base['prototype']['clearActorNameAutoColor']=function(){this['_autoColorActorNames']=[];},Window_Base[_0x1704b3(0x2a8)]['registerActorNameAutoColorChanges']=function(){const _0x1d6072=_0x1704b3;this[_0x1d6072(0x139)]();const _0x1f9f48=VisuMZ['MessageCore']['Settings']['AutoColor'],_0x292243=_0x1f9f48[_0x1d6072(0x2a7)];if(_0x292243<=0x0)return;for(const _0x89d6e4 of $gameActors[_0x1d6072(0x313)]){if(_0x1d6072(0x160)===_0x1d6072(0x160)){if(!_0x89d6e4)continue;const _0xc1b465=_0x89d6e4['name']();if(_0xc1b465[_0x1d6072(0x375)]()[_0x1d6072(0x2ff)]<=0x0)continue;if(/^\d+$/[_0x1d6072(0x111)](_0xc1b465))continue;if(_0xc1b465[_0x1d6072(0x1bf)](/-----/i))continue;let _0x3d9f04=VisuMZ[_0x1d6072(0x15d)][_0x1d6072(0xea)](_0xc1b465);const _0x2d439e=new RegExp('\x5cb'+_0x3d9f04+'\x5cb','g'),_0x652858=_0x1d6072(0x236)[_0x1d6072(0x344)](_0x292243,_0xc1b465);this['_autoColorActorNames']['push']([_0x2d439e,_0x652858]);}else{const _0x33189a=_0x341036[_0x1d6072(0x352)]()[_0x1d6072(0x202)](_0x4e9ae0=>this[_0x1d6072(0x92)](_0x4e9ae0))[_0x1d6072(0x15a)](_0x5d2df8=>this[_0x1d6072(0xc8)](_0x5d2df8)),_0x1f4048=_0x40538d[_0x1d6072(0x28e)](),_0x5d13eb=_0x2c90fc[_0x1d6072(0xe0)](_0x220391[_0x1d6072(0x124)](_0x1f4048,_0x33189a[_0x1d6072(0x2ff)])/this[_0x1d6072(0x349)]());return _0x380509[_0x1d6072(0x1a8)](0x1,_0x3d44e2[_0x1d6072(0x124)](_0x5d13eb,this[_0x1d6072(0x3bb)]()));}}},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x87)]=function(_0x5d7ab0){const _0x34fe65=_0x1704b3;this['_autoColorActorNames']===undefined&&this[_0x34fe65(0x386)]();for(autoColor of this['_autoColorActorNames']){_0x5d7ab0=_0x5d7ab0[_0x34fe65(0x3ca)](autoColor[0x0],autoColor[0x1]);}return _0x5d7ab0;},Window_Base['prototype'][_0x1704b3(0x2d6)]=function(_0x6a5d12,_0x102343,_0x286216){const _0x1a5f7c=_0x1704b3;if(!_0x6a5d12)return'';const _0x44b4ff=_0x6a5d12[_0x102343];let _0x4e5034='';if(_0x44b4ff&&_0x286216&&_0x44b4ff[_0x1a5f7c(0x122)]){const _0x1d1816=_0x1a5f7c(0x284);_0x4e5034=_0x1d1816[_0x1a5f7c(0x344)](_0x44b4ff[_0x1a5f7c(0x122)],_0x44b4ff[_0x1a5f7c(0x3d6)]);}else _0x44b4ff?_0x4e5034=_0x44b4ff[_0x1a5f7c(0x3d6)]:_0x4e5034='';if(this[_0x1a5f7c(0x9a)]()){if(_0x1a5f7c(0x1f2)===_0x1a5f7c(0x106)){this[_0x1a5f7c(0xd1)]=_0x2d1583['getMessageWindowWidth']()+this[_0x1a5f7c(0x28f)]();;this['width']=_0x499d06[_0x1a5f7c(0x124)](_0x2fbb81['width'],this['width']);const _0xc106e3=_0x475b2b[_0x1a5f7c(0xe6)]();this[_0x1a5f7c(0x241)]=_0x36f3c5['_scene']['calcWindowHeight'](_0xc106e3,![])+this[_0x1a5f7c(0x289)](),this[_0x1a5f7c(0x241)]=_0x2f8564[_0x1a5f7c(0x124)](_0x3d7220[_0x1a5f7c(0x241)],this[_0x1a5f7c(0x241)]);if(_0x5b0129['_centerMessageWindow'])this[_0x1a5f7c(0x36e)]();}else _0x4e5034=this[_0x1a5f7c(0xbb)](_0x4e5034,_0x6a5d12);}return _0x4e5034;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x8b)]=function(_0x3b3af0){const _0x2900dd=_0x1704b3,_0x2fbe20=$gameParty['getLastGainedItemData']();if(_0x2fbe20['id']<0x0)return'';let _0x48e2af=null;if(_0x2fbe20[_0x2900dd(0x192)]===0x0)_0x48e2af=$dataItems[_0x2fbe20['id']];if(_0x2fbe20[_0x2900dd(0x192)]===0x1)_0x48e2af=$dataWeapons[_0x2fbe20['id']];if(_0x2fbe20[_0x2900dd(0x192)]===0x2)_0x48e2af=$dataArmors[_0x2fbe20['id']];if(!_0x48e2af)return'';return _0x3b3af0?_0x2900dd(0x284)[_0x2900dd(0x344)](_0x48e2af['iconIndex'],_0x48e2af['name']):_0x48e2af[_0x2900dd(0x3d6)];},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x26a)]=function(){const _0x5c951a=_0x1704b3,_0x1c776d=$gameParty[_0x5c951a(0x39b)]();if(_0x1c776d['id']<=0x0)return'';return _0x1c776d[_0x5c951a(0x207)];},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0xbb)]=function(_0x4c84c9,_0x57e643){const _0x1204c1=_0x1704b3,_0x2e08ba=VisuMZ[_0x1204c1(0x15d)][_0x1204c1(0x245)][_0x1204c1(0x2df)];let _0x1e369d=0x0;if(_0x57e643===$dataActors)_0x1e369d=_0x2e08ba[_0x1204c1(0x2a7)];if(_0x57e643===$dataClasses)_0x1e369d=_0x2e08ba[_0x1204c1(0x3a9)];if(_0x57e643===$dataSkills)_0x1e369d=_0x2e08ba['Skills'];if(_0x57e643===$dataItems)_0x1e369d=_0x2e08ba[_0x1204c1(0x177)];if(_0x57e643===$dataWeapons)_0x1e369d=_0x2e08ba['Weapons'];if(_0x57e643===$dataArmors)_0x1e369d=_0x2e08ba[_0x1204c1(0x1b7)];if(_0x57e643===$dataEnemies)_0x1e369d=_0x2e08ba[_0x1204c1(0x14e)];if(_0x57e643===$dataStates)_0x1e369d=_0x2e08ba[_0x1204c1(0x2f1)];if(_0x1e369d>0x0){if('CEclw'!==_0x1204c1(0x2f3)){const _0x4bdbc6=_0x398a1f(_0x3ffa2f['$1']);_0x4bdbc6!==_0x513241[_0x636888][_0x1204c1(0x134)]&&(_0x760618(_0x1204c1(0x3a1)['format'](_0x582d23,_0x4bdbc6)),_0x593fe5[_0x1204c1(0x165)]());}else _0x4c84c9='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x1204c1(0x344)](_0x1e369d,_0x4c84c9);}return _0x4c84c9;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x119)]=function(_0x5309c8){const _0x2f0ffa=_0x1704b3;_0x5309c8=_0x5309c8['replace'](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x33fcce,_0x2f1650)=>this['setWordWrap'](!![])),_0x5309c8=_0x5309c8[_0x2f0ffa(0x3ca)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x43119f,_0x560a49)=>this[_0x2f0ffa(0x73)](![])),_0x5309c8=_0x5309c8[_0x2f0ffa(0x3ca)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x114063,_0x530c90)=>this[_0x2f0ffa(0x73)](![]));if(_0x5309c8[_0x2f0ffa(0x1bf)](Window_Message[_0x2f0ffa(0x2d3)]))_0x2f0ffa(0x15b)!==_0x2f0ffa(0x15b)?this[_0x2f0ffa(0x268)](_0x2ab616):this['setWordWrap'](![]);else _0x5309c8[_0x2f0ffa(0x1bf)](Window_Message['_autoPosRegExp'])&&this[_0x2f0ffa(0x73)](![]);if(!this[_0x2f0ffa(0xf1)]())return _0x5309c8;if(_0x5309c8[_0x2f0ffa(0x2ff)]<=0x0)return _0x5309c8;return _0x5309c8[_0x2f0ffa(0x1bf)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)&&(_0x2f0ffa(0x76)!=='iXSxy'?_0x5309c8=VisuMZ[_0x2f0ffa(0x15d)][_0x2f0ffa(0x1cf)](_0x5309c8)[_0x2f0ffa(0x116)](_0x2f0ffa(0x3a3)):this[_0x2f0ffa(0x386)]()),VisuMZ[_0x2f0ffa(0x15d)][_0x2f0ffa(0x245)][_0x2f0ffa(0x171)]['LineBreakSpace']?(_0x5309c8=_0x5309c8[_0x2f0ffa(0x3ca)](/[\n\r]+/g,'\x20'),_0x5309c8=_0x5309c8['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x5309c8=_0x5309c8[_0x2f0ffa(0x3ca)](/[\n\r]+/g,''),_0x5309c8=_0x5309c8[_0x2f0ffa(0x3ca)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x5309c8=this[_0x2f0ffa(0x109)](_0x5309c8),_0x5309c8=_0x5309c8[_0x2f0ffa(0x3d7)]('\x20')['join'](_0x2f0ffa(0x2f7)),_0x5309c8=_0x5309c8[_0x2f0ffa(0x3ca)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x5309c8=_0x5309c8[_0x2f0ffa(0x3ca)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x5309c8;},VisuMZ['MessageCore'][_0x1704b3(0x1cf)]=function(_0x19cc43){const _0x814a71=_0x1704b3;let _0x541508=[],_0x43339b='';while(_0x19cc43['length']>0x0){const _0x229eaf=_0x19cc43[_0x814a71(0x19b)](0x0);_0x19cc43=_0x19cc43['slice'](0x1),_0x229eaf[_0x814a71(0x1bf)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)?_0x814a71(0xfc)===_0x814a71(0xfc)?(_0x43339b[_0x814a71(0x2ff)]>0x0&&(_0x541508[_0x814a71(0x337)](_0x43339b),_0x43339b=''),_0x541508[_0x814a71(0x337)](_0x229eaf)):this[_0x814a71(0x11a)]=_0x4d2856:_0x43339b+=_0x229eaf;}return _0x43339b[_0x814a71(0x2ff)]>0x0&&(_0x541508[_0x814a71(0x337)](_0x43339b),_0x43339b=''),_0x541508;},Window_Base['prototype'][_0x1704b3(0x109)]=function(_0x3d0f0f){return _0x3d0f0f;},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x248)]=Window_Base['prototype'][_0x1704b3(0x123)],Window_Base['prototype'][_0x1704b3(0x123)]=function(_0x1d6a6f){const _0x196d3c=_0x1704b3;VisuMZ[_0x196d3c(0x15d)]['Window_Base_processNewLine'][_0x196d3c(0x1d9)](this,_0x1d6a6f),this[_0x196d3c(0x341)](_0x1d6a6f);},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x1f3)]=Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x75)],Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x75)]=function(_0x1fc768,_0x4ee100){const _0x2d271c=_0x1704b3;VisuMZ[_0x2d271c(0x15d)][_0x2d271c(0x1f3)]['call'](this,_0x1fc768,_0x4ee100);if(_0x4ee100===_0x2d271c(0x2f7))_0x2d271c(0xef)!==_0x2d271c(0xef)?this[_0x2d271c(0x73)](![]):this[_0x2d271c(0x395)](_0x1fc768);else _0x4ee100===_0x2d271c(0x3a3)&&this['processWrapBreak'](_0x1fc768,!![]);},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x253)]=function(_0x5b7399){const _0x2bda79=_0x1704b3;var _0x551fb3=/^\<(.*?)\>/[_0x2bda79(0x23f)](_0x5b7399[_0x2bda79(0xff)][_0x2bda79(0x113)](_0x5b7399[_0x2bda79(0x193)]));return _0x551fb3?(_0x5b7399['index']+=_0x551fb3[0x0][_0x2bda79(0x2ff)],String(_0x551fb3[0x0][_0x2bda79(0x113)](0x1,_0x551fb3[0x0][_0x2bda79(0x2ff)]-0x1))):'';},VisuMZ[_0x1704b3(0x15d)]['Window_Base_processEscapeCharacter']=Window_Base[_0x1704b3(0x2a8)]['processEscapeCharacter'],Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x2fe)]=function(_0x2e18d9,_0x2cedf8){const _0x20be9a=_0x1704b3;switch(_0x2e18d9){case'C':if(_0x2cedf8['drawing'])_0x20be9a(0xdd)===_0x20be9a(0x100)?(_0x372f82(_0x20be9a(0xd9)[_0x20be9a(0x344)](_0x1d74b6,_0x171318,_0x34be39)),_0x3a2ffd[_0x20be9a(0x165)]()):VisuMZ[_0x20be9a(0x15d)][_0x20be9a(0x32a)][_0x20be9a(0x1d9)](this,_0x2e18d9,_0x2cedf8);else{if(_0x20be9a(0x200)!==_0x20be9a(0x200))return _0x3cc2d9[_0x20be9a(0x15d)][_0x20be9a(0x212)][_0x20be9a(0x1d9)](this);else this[_0x20be9a(0x16f)](_0x2cedf8);}break;case'I':case'{':case'}':VisuMZ[_0x20be9a(0x15d)]['Window_Base_processEscapeCharacter'][_0x20be9a(0x1d9)](this,_0x2e18d9,_0x2cedf8);break;case'FS':this[_0x20be9a(0xca)](_0x2cedf8);break;case'PX':this['processPxTextCode'](_0x2cedf8);break;case'PY':this[_0x20be9a(0xe8)](_0x2cedf8);break;case'BOLD':this[_0x20be9a(0x142)](this['obtainEscapeParam'](_0x2cedf8));break;case _0x20be9a(0x376):this[_0x20be9a(0x2be)](_0x2cedf8);break;case _0x20be9a(0x36c):this['processColorLock'](_0x2cedf8);break;case _0x20be9a(0x23e):this[_0x20be9a(0x19d)](_0x2cedf8);break;case _0x20be9a(0x25a):this['processFontChangeItalic'](this['obtainEscapeParam'](_0x2cedf8));break;case'PICTURE':this[_0x20be9a(0x278)](_0x2cedf8);break;case _0x20be9a(0xa6):this['processPreviousColor'](_0x2cedf8);break;case _0x20be9a(0xc6):this['processTextAlignmentChange'](_0x2cedf8);break;case _0x20be9a(0x2aa):this[_0x20be9a(0x2b7)](_0x2cedf8);break;case _0x20be9a(0x195):this['processWrapBreak'](_0x2cedf8);break;case _0x20be9a(0x2eb):this[_0x20be9a(0x395)](_0x2cedf8,!![]);break;default:this[_0x20be9a(0x2a3)](_0x2e18d9,_0x2cedf8);}},Window_Base[_0x1704b3(0x2a8)]['processMessageCoreEscapeActions']=function(_0x4a504f,_0xcc3713){const _0x4f589d=_0x1704b3;for(const _0x3a5d8f of VisuMZ['MessageCore']['Settings'][_0x4f589d(0x30c)]){if(_0x4f589d(0x206)===_0x4f589d(0x206)){if(_0x3a5d8f[_0x4f589d(0xcc)]===_0x4a504f){if(_0x3a5d8f[_0x4f589d(0x2bc)]==='')this[_0x4f589d(0x16f)](_0xcc3713);_0x3a5d8f[_0x4f589d(0x1f9)][_0x4f589d(0x1d9)](this,_0xcc3713);if(this[_0x4f589d(0x27e)]===Window_Message){if(_0x4f589d(0x91)!==_0x4f589d(0x91))return this[_0x4f589d(0x220)]=_0x3bebe5,'';else{const _0x10947e=_0x3a5d8f[_0x4f589d(0x31c)]||0x0;if(_0x10947e>0x0)this['launchMessageCommonEvent'](_0x10947e);}}}}else return this[_0x4f589d(0xc4)]||0x0;}},Window_Base[_0x1704b3(0x2a8)]['makeFontBigger']=function(){const _0x52ed7d=_0x1704b3;this[_0x52ed7d(0x20c)][_0x52ed7d(0x9e)]+=VisuMZ[_0x52ed7d(0x15d)][_0x52ed7d(0x245)]['General'][_0x52ed7d(0x3c1)],this['contents'][_0x52ed7d(0x9e)]=Math[_0x52ed7d(0x124)](this[_0x52ed7d(0x20c)]['fontSize'],VisuMZ[_0x52ed7d(0x15d)]['Settings'][_0x52ed7d(0x1fa)]['FontBiggerCap']);},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x33e)]=function(){const _0x3ee091=_0x1704b3;this[_0x3ee091(0x20c)][_0x3ee091(0x9e)]-=VisuMZ[_0x3ee091(0x15d)][_0x3ee091(0x245)][_0x3ee091(0x1fa)][_0x3ee091(0x3c1)],this[_0x3ee091(0x20c)][_0x3ee091(0x9e)]=Math['max'](this[_0x3ee091(0x20c)][_0x3ee091(0x9e)],VisuMZ[_0x3ee091(0x15d)][_0x3ee091(0x245)][_0x3ee091(0x1fa)][_0x3ee091(0x368)]);},Window_Base['prototype'][_0x1704b3(0xca)]=function(_0x29c861){const _0x54a061=_0x1704b3,_0x564a2d=this[_0x54a061(0x16f)](_0x29c861);this['contents'][_0x54a061(0x9e)]=_0x564a2d['clamp'](VisuMZ['MessageCore']['Settings'][_0x54a061(0x1fa)][_0x54a061(0x368)],VisuMZ['MessageCore'][_0x54a061(0x245)]['General'][_0x54a061(0x16c)]);},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x127)]=function(_0x489b29){const _0x509c77=_0x1704b3;let _0x1a2319=this[_0x509c77(0x20c)][_0x509c77(0x9e)];const _0x1c15a5=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x2d37a2=_0x1c15a5[_0x509c77(0x23f)](_0x489b29);if(!_0x2d37a2)break;const _0x1c969d=String(_0x2d37a2[0x1])[_0x509c77(0x36d)]();if(_0x1c969d==='{')_0x509c77(0x93)!=='cOdfv'?this[_0x509c77(0x294)]():this[_0x509c77(0x9b)](_0x509c77(0x183));else{if(_0x1c969d==='}')this[_0x509c77(0x33e)]();else _0x1c969d==='FS'&&(this[_0x509c77(0x20c)][_0x509c77(0x9e)]=parseInt(_0x2d37a2[0x3])[_0x509c77(0x14f)](VisuMZ[_0x509c77(0x15d)][_0x509c77(0x245)][_0x509c77(0x1fa)][_0x509c77(0x368)],VisuMZ['MessageCore']['Settings'][_0x509c77(0x1fa)]['FontBiggerCap']));}this['contents'][_0x509c77(0x9e)]>_0x1a2319&&(_0x1a2319=this[_0x509c77(0x20c)][_0x509c77(0x9e)]);}return _0x1a2319;},Window_Base[_0x1704b3(0x2a8)]['processPxTextCode']=function(_0x1b9039){const _0x450aa4=_0x1704b3;_0x1b9039['x']=this[_0x450aa4(0x16f)](_0x1b9039),VisuMZ['MessageCore'][_0x450aa4(0x245)][_0x450aa4(0x1fa)]['RelativePXPY']&&(_0x450aa4(0x147)==='NcjDy'?_0x52ed92=_0x2ca82d[_0x450aa4(0x85)]():_0x1b9039['x']+=_0x1b9039[_0x450aa4(0x144)]);},Window_Base['prototype'][_0x1704b3(0xe8)]=function(_0x4519b2){const _0x184607=_0x1704b3;_0x4519b2['y']=this[_0x184607(0x16f)](_0x4519b2),VisuMZ[_0x184607(0x15d)][_0x184607(0x245)][_0x184607(0x1fa)][_0x184607(0x270)]&&(_0x4519b2['y']+=_0x4519b2[_0x184607(0x11d)]);},Window_Base[_0x1704b3(0x2a8)]['processFontChangeBold']=function(_0xbde5fc){const _0x31544e=_0x1704b3;this[_0x31544e(0x20c)][_0x31544e(0x22e)]=!!_0xbde5fc;},Window_Base[_0x1704b3(0x2a8)]['processFontChangeItalic']=function(_0x55c0a6){const _0x229472=_0x1704b3;this['contents'][_0x229472(0x121)]=!!_0x55c0a6;},Window_Base['prototype'][_0x1704b3(0x1f7)]=function(_0x2bbfbb){const _0x5cea78=_0x1704b3,_0x21e537=this['obtainEscapeParam'](_0x2bbfbb);if(!_0x2bbfbb[_0x5cea78(0x3cb)])return;switch(_0x21e537){case 0x0:this['setTextAlignment'](_0x5cea78(0x183));return;case 0x1:this['setTextAlignment']('left');break;case 0x2:this[_0x5cea78(0x9b)](_0x5cea78(0xbf));break;case 0x3:this[_0x5cea78(0x9b)](_0x5cea78(0x38b));break;}this['processTextAlignmentX'](_0x2bbfbb);},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x341)]=function(_0x3e6c2c){const _0xc7680b=_0x1704b3;if(!_0x3e6c2c[_0xc7680b(0x3cb)])return;if(_0x3e6c2c[_0xc7680b(0x330)])return;if(this['getTextAlignment']()===_0xc7680b(0x183))return;let _0x2ccf90=_0x3e6c2c[_0xc7680b(0xff)][_0xc7680b(0x213)]('\x1bTEXTALIGNMENT',_0x3e6c2c['index']+0x1),_0x2a2e6c=_0x3e6c2c[_0xc7680b(0xff)]['indexOf']('\x0a',_0x3e6c2c[_0xc7680b(0x193)]+0x1);if(_0x2ccf90<0x0)_0x2ccf90=_0x3e6c2c[_0xc7680b(0xff)]['length']+0x1;if(_0x2a2e6c>0x0)_0x2ccf90=Math[_0xc7680b(0x124)](_0x2ccf90,_0x2a2e6c);const _0x5c7acf=_0x3e6c2c[_0xc7680b(0xff)][_0xc7680b(0x1b8)](_0x3e6c2c[_0xc7680b(0x193)],_0x2ccf90),_0x5ca40a=this[_0xc7680b(0x24b)](_0x5c7acf)['width'],_0xde517b=_0x3e6c2c[_0xc7680b(0xd1)]||this[_0xc7680b(0x28a)]-0x8,_0x5e7eeb=this[_0xc7680b(0x27e)]===Window_Message&&$gameMessage[_0xc7680b(0x1ef)]()!=='';switch(this[_0xc7680b(0xbd)]()){case _0xc7680b(0x2b9):_0x3e6c2c['x']=_0x3e6c2c[_0xc7680b(0x144)];break;case _0xc7680b(0xbf):_0x3e6c2c['x']=_0x3e6c2c[_0xc7680b(0x144)],_0x3e6c2c['x']+=Math[_0xc7680b(0x2da)]((_0xde517b-_0x5ca40a)/0x2);_0x5e7eeb&&('Spdcj'===_0xc7680b(0x13d)?_0x3e6c2c['x']-=_0x3e6c2c['startX']/0x2:_0x414ae8[_0xc7680b(0x15d)]['Settings'][_0xc7680b(0x3c0)][_0xc7680b(0x381)]&&this['addMessageCoreTextSpeedCommand']());break;case _0xc7680b(0x38b):_0x3e6c2c['x']=_0xde517b-_0x5ca40a+_0x3e6c2c[_0xc7680b(0x144)];if(_0x5e7eeb){if(_0xc7680b(0x283)!=='hWLzh'){let _0x1af6a5=_0x2ce475[_0xc7680b(0x241)]*_0x1f9411[_0xc7680b(0x363)]['y'];_0x41827b-=this[_0xc7680b(0x241)]*_0x2379e4[_0xc7680b(0x363)]['y']+_0x1af6a5+0x8;let _0x38cc46=_0x132111['y']-_0x454ecd[_0xc7680b(0x146)]*_0x21ba54['anchor']['y'];_0x5b019c+=_0x38cc46*(_0xb15d7b[_0xc7680b(0x363)]['y']-0x1);}else _0x3e6c2c['x']-=_0x3e6c2c[_0xc7680b(0x144)];}break;}},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x24b)]=function(_0x4e7f98){const _0x24db30=_0x1704b3;_0x4e7f98=_0x4e7f98[_0x24db30(0x3ca)](/\x1b!/g,''),_0x4e7f98=_0x4e7f98[_0x24db30(0x3ca)](/\x1b\|/g,''),_0x4e7f98=_0x4e7f98[_0x24db30(0x3ca)](/\x1b\./g,'');const _0x2dac3e=this[_0x24db30(0x332)](_0x4e7f98,0x0,0x0,0x0),_0x51a375=this['getPreservedFontSettings']();return _0x2dac3e[_0x24db30(0x3cb)]=![],this[_0x24db30(0x338)](_0x2dac3e),this[_0x24db30(0x201)](_0x51a375),{'width':_0x2dac3e[_0x24db30(0x83)],'height':_0x2dac3e[_0x24db30(0x2f0)]};},Window_Base[_0x1704b3(0x120)]=VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x245)][_0x1704b3(0x171)]['EndPadding']||0x0,Window_Base[_0x1704b3(0x2a8)]['processWrapBreak']=function(_0xbe3ac2,_0x267fc8){const _0x5bce2e=_0x1704b3,_0x5f4802=(_0xbe3ac2[_0x5bce2e(0x330)]?-0x1:0x1)*this[_0x5bce2e(0x7a)]('\x20');if(!_0x267fc8)_0xbe3ac2['x']+=_0x5f4802;if(this['obtainEscapeParam'](_0xbe3ac2)>0x0&&!_0x267fc8)_0xbe3ac2['x']+=_0x5f4802;if(_0xbe3ac2[_0x5bce2e(0x330)])return;let _0x5b9698;if(_0x267fc8){if(_0x5bce2e(0x306)==='qsuou'){if(!this[_0x5bce2e(0x367)])return;const _0x3ebe5a=0x8,_0x3cd6c8=this[_0x5bce2e(0x367)],_0x4bede2=this['x']+this['width'],_0x3e264b=_0xaf8fca[_0x5bce2e(0x2da)]((_0x357650[_0x5bce2e(0xd1)]-_0x312590['boxWidth'])/0x2);_0x4bede2>=_0x31da5a[_0x5bce2e(0x2a4)]+_0x3e264b-_0x3cd6c8['width']+_0x3ebe5a?_0x3cd6c8['x']=-_0x3cd6c8[_0x5bce2e(0xd1)]-_0x3ebe5a:_0x3cd6c8['x']=this[_0x5bce2e(0xd1)]+_0x3ebe5a,_0x3cd6c8['y']=this[_0x5bce2e(0x241)]/0x2-_0x3cd6c8[_0x5bce2e(0x241)]/0x2;}else _0x5b9698=_0xbe3ac2[_0x5bce2e(0xff)]['indexOf'](_0x5bce2e(0x3a3),_0xbe3ac2[_0x5bce2e(0x193)]+0x1);}else{if(_0x5bce2e(0x9d)!==_0x5bce2e(0x279))_0x5b9698=_0xbe3ac2['text'][_0x5bce2e(0x213)](_0x5bce2e(0x2f7),_0xbe3ac2[_0x5bce2e(0x193)]+0x1);else return!![];}let _0x291b34=_0xbe3ac2[_0x5bce2e(0xff)][_0x5bce2e(0x213)]('\x0a',_0xbe3ac2['index']+0x1);if(_0x5b9698<0x0)_0x5b9698=_0xbe3ac2[_0x5bce2e(0xff)][_0x5bce2e(0x2ff)]+0x1;if(_0x291b34>0x0)_0x5b9698=Math[_0x5bce2e(0x124)](_0x5b9698,_0x291b34);const _0x5ab613=_0xbe3ac2[_0x5bce2e(0xff)][_0x5bce2e(0x1b8)](_0xbe3ac2['index'],_0x5b9698),_0x170718=this[_0x5bce2e(0x271)](_0x5ab613)[_0x5bce2e(0xd1)];let _0x2de76c=_0xbe3ac2[_0x5bce2e(0xd1)]||this[_0x5bce2e(0x28a)];_0x2de76c-=Window_Base[_0x5bce2e(0x120)];if(this[_0x5bce2e(0x27e)]===Window_Message){const _0x2c4c63=$gameMessage[_0x5bce2e(0x1ef)]()===''?0x0:ImageManager['faceWidth']+0x14;_0x2de76c-=_0x2c4c63,VisuMZ[_0x5bce2e(0x15d)][_0x5bce2e(0x245)][_0x5bce2e(0x171)][_0x5bce2e(0xd3)]&&(_0x2de76c-=_0x2c4c63);}let _0x1e746=![];if(_0xbe3ac2['x']+_0x170718>_0xbe3ac2['startX']+_0x2de76c)_0x1e746=!![];if(_0x170718===0x0)_0x1e746=!![];_0x1e746&&(_0xbe3ac2[_0x5bce2e(0xff)]=_0xbe3ac2[_0x5bce2e(0xff)][_0x5bce2e(0x113)](0x0,_0xbe3ac2[_0x5bce2e(0x193)])+'\x0a'+_0xbe3ac2['text'][_0x5bce2e(0x15c)](_0xbe3ac2[_0x5bce2e(0x193)]));},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x271)]=function(_0x8bb269){const _0x2023eb=_0x1704b3,_0x25cedc=this['createTextState'](_0x8bb269,0x0,0x0,0x0),_0x783ec5=this['getPreservedFontSettings']();return _0x25cedc['drawing']=![],this[_0x2023eb(0x73)](![]),this['processAllText'](_0x25cedc),this['setWordWrap'](!![]),this[_0x2023eb(0x201)](_0x783ec5),{'width':_0x25cedc[_0x2023eb(0x83)],'height':_0x25cedc[_0x2023eb(0x2f0)]};},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x19d)]=function(_0x378527){return this['obtainEscapeParam'](_0x378527);},Window_Base['prototype'][_0x1704b3(0x278)]=function(_0x30c510){const _0x3257fb=_0x1704b3,_0x1d836c=this['obtainEscapeString'](_0x30c510)['split'](',');if(!_0x30c510[_0x3257fb(0x3cb)])return;const _0x31c81b=_0x1d836c[0x0][_0x3257fb(0x375)](),_0x39adff=_0x1d836c[0x1]||0x0,_0x57f009=_0x1d836c[0x2]||0x0,_0x38ac41=ImageManager[_0x3257fb(0x17a)](_0x31c81b),_0x17232c=this['contents'][_0x3257fb(0xf9)];_0x38ac41['addLoadListener'](this[_0x3257fb(0x359)][_0x3257fb(0x328)](this,_0x38ac41,_0x30c510['x'],_0x30c510['y'],_0x39adff,_0x57f009,_0x17232c));},Window_Base['prototype'][_0x1704b3(0x359)]=function(_0x565862,_0x4532f3,_0x295025,_0x266edd,_0x31b9ed,_0x198fed){const _0x58dad4=_0x1704b3;_0x266edd=_0x266edd||_0x565862[_0x58dad4(0xd1)],_0x31b9ed=_0x31b9ed||_0x565862['height'],this[_0x58dad4(0x393)][_0x58dad4(0xf9)]=_0x198fed,this[_0x58dad4(0x393)][_0x58dad4(0xf7)](_0x565862,0x0,0x0,_0x565862[_0x58dad4(0xd1)],_0x565862[_0x58dad4(0x241)],_0x4532f3,_0x295025,_0x266edd,_0x31b9ed),this[_0x58dad4(0x393)][_0x58dad4(0xf9)]=0xff;},Window_Base[_0x1704b3(0x2a8)]['processDrawCenteredPicture']=function(_0x385f20){const _0x5721df=_0x1704b3,_0x3cfaf5=this[_0x5721df(0x253)](_0x385f20)['split'](',');if(!_0x385f20['drawing'])return;const _0x73e46e=_0x3cfaf5[0x0][_0x5721df(0x375)](),_0x30ef43=ImageManager['loadPicture'](_0x73e46e),_0x583f7b=JsonEx['makeDeepCopy'](_0x385f20),_0x2c33aa=this[_0x5721df(0x20c)][_0x5721df(0xf9)];_0x30ef43['addLoadListener'](this[_0x5721df(0x33f)][_0x5721df(0x328)](this,_0x30ef43,_0x583f7b,_0x2c33aa));},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x33f)]=function(_0x26c797,_0x31371e,_0x4de735){const _0x475a14=_0x1704b3,_0x2ff7f5=_0x31371e[_0x475a14(0xd1)]||this[_0x475a14(0x28a)],_0x1f1ab7=this[_0x475a14(0x384)]!==undefined?this[_0x475a14(0x364)]():this['innerHeight'],_0x3f150c=_0x2ff7f5/_0x26c797['width'],_0x54aaa8=_0x1f1ab7/_0x26c797[_0x475a14(0x241)],_0xdda1fc=Math[_0x475a14(0x124)](_0x3f150c,_0x54aaa8,0x1),_0x5129b5=this[_0x475a14(0x384)]!==undefined?(this[_0x475a14(0x256)](0x0)[_0x475a14(0x241)]-this['lineHeight']())/0x2:0x0,_0xd9bf58=_0x26c797[_0x475a14(0xd1)]*_0xdda1fc,_0xbb855b=_0x26c797[_0x475a14(0x241)]*_0xdda1fc,_0x4cc237=Math[_0x475a14(0x2da)]((_0x2ff7f5-_0xd9bf58)/0x2)+_0x31371e['startX'],_0x25d2db=Math[_0x475a14(0x2da)]((_0x1f1ab7-_0xbb855b)/0x2)+_0x31371e[_0x475a14(0x11d)]-_0x5129b5*0x2;this['contentsBack'][_0x475a14(0xf9)]=_0x4de735,this[_0x475a14(0x393)][_0x475a14(0xf7)](_0x26c797,0x0,0x0,_0x26c797[_0x475a14(0xd1)],_0x26c797[_0x475a14(0x241)],_0x4cc237,_0x25d2db,_0xd9bf58,_0xbb855b),this['contentsBack'][_0x475a14(0xf9)]=0xff;},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x13b)]=function(_0x502fe4){const _0x20a127=_0x1704b3,_0x2897d2=this[_0x20a127(0x16f)](_0x502fe4);if(_0x502fe4[_0x20a127(0x3cb)])this[_0x20a127(0x34b)](_0x2897d2>0x0);},Window_Base[_0x1704b3(0x2a8)][_0x1704b3(0x2b7)]=function(_0x3fc8a0){const _0x1b80ec=_0x1704b3,_0xfdf0c9=this[_0x1b80ec(0x16f)](_0x3fc8a0);this[_0x1b80ec(0x27e)]===Window_Message&&_0x3fc8a0[_0x1b80ec(0x3cb)]&&this[_0x1b80ec(0x268)](_0xfdf0c9);},Window_Help['prototype'][_0x1704b3(0x70)]=function(){const _0x5e8ba8=_0x1704b3;this[_0x5e8ba8(0x73)]($gameSystem[_0x5e8ba8(0x244)]());},Window_Help[_0x1704b3(0x2a8)][_0x1704b3(0x9a)]=function(){return!![];},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x2cb)]=Window_Help['prototype'][_0x1704b3(0xae)],Window_Help[_0x1704b3(0x2a8)][_0x1704b3(0xae)]=function(){const _0x10682b=_0x1704b3;this[_0x10682b(0x139)](),VisuMZ['MessageCore'][_0x10682b(0x2cb)][_0x10682b(0x1d9)](this),this['resetWordWrap']();},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x226)]=Window_Options[_0x1704b3(0x2a8)][_0x1704b3(0x1bc)],Window_Options[_0x1704b3(0x2a8)]['addGeneralOptions']=function(){const _0x55b446=_0x1704b3;VisuMZ[_0x55b446(0x15d)]['Window_Options_addGeneralOptions'][_0x55b446(0x1d9)](this),this[_0x55b446(0x1c3)]();},Window_Options[_0x1704b3(0x2a8)][_0x1704b3(0x1c3)]=function(){const _0x5169a4=_0x1704b3;VisuMZ[_0x5169a4(0x15d)][_0x5169a4(0x245)][_0x5169a4(0x3c0)]['AddOption']&&this[_0x5169a4(0x235)]();},Window_Options['prototype'][_0x1704b3(0x235)]=function(){const _0x13bb10=_0x1704b3,_0x568016=TextManager['messageCoreTextSpeed'],_0x37b67c=_0x13bb10(0x210);this[_0x13bb10(0x2c4)](_0x568016,_0x37b67c);},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x1fd)]=Window_Options[_0x1704b3(0x2a8)][_0x1704b3(0x31d)],Window_Options['prototype'][_0x1704b3(0x31d)]=function(_0x3c7949){const _0x10e4fd=_0x1704b3,_0x2ded50=this[_0x10e4fd(0x205)](_0x3c7949);if(_0x2ded50===_0x10e4fd(0x210))return this['textSpeedStatusText']();return VisuMZ['MessageCore'][_0x10e4fd(0x1fd)]['call'](this,_0x3c7949);},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x108)]=Window_Options[_0x1704b3(0x2a8)]['isVolumeSymbol'],Window_Options[_0x1704b3(0x2a8)][_0x1704b3(0x320)]=function(_0x586ead){const _0x400e7e=_0x1704b3;if(_0x586ead==='textSpeed')return!![];return VisuMZ[_0x400e7e(0x15d)][_0x400e7e(0x108)][_0x400e7e(0x1d9)](this,_0x586ead);},Window_Options[_0x1704b3(0x2a8)][_0x1704b3(0x24a)]=function(){const _0x4b6ee8=_0x1704b3,_0x24b4ba=this[_0x4b6ee8(0x9f)](_0x4b6ee8(0x210));return _0x24b4ba>0xa?TextManager['instantTextSpeed']:_0x24b4ba;},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x35c)]=Window_Options['prototype']['changeVolume'],Window_Options['prototype'][_0x1704b3(0x333)]=function(_0x50854e,_0x336989,_0x4ccc95){const _0x58f013=_0x1704b3;if(_0x50854e===_0x58f013(0x210))return this[_0x58f013(0x2cc)](_0x50854e,_0x336989,_0x4ccc95);VisuMZ[_0x58f013(0x15d)][_0x58f013(0x35c)]['call'](this,_0x50854e,_0x336989,_0x4ccc95);},Window_Options['prototype'][_0x1704b3(0x2cc)]=function(_0x1b6a4d,_0x264110,_0x5a1ca7){const _0x2e068b=_0x1704b3,_0x1078ee=this['getConfigValue'](_0x1b6a4d),_0x487b5b=0x1,_0x1c0d8a=_0x1078ee+(_0x264110?_0x487b5b:-_0x487b5b);_0x1c0d8a>0xb&&_0x5a1ca7?_0x2e068b(0x1d1)===_0x2e068b(0x1d1)?this[_0x2e068b(0x331)](_0x1b6a4d,0x1):(_0x32cf2f[_0x2e068b(0x15d)][_0x2e068b(0x358)](_0x35a8b2,_0xb5d049[_0x2e068b(0x3a9)]),_0x12ac5e[_0x2e068b(0x15d)][_0x2e068b(0x358)](_0x16f9e4,_0x33e106[_0x2e068b(0x14b)]),_0x4686da[_0x2e068b(0x15d)]['AddAutoColor'](_0x51b1b6,_0x3cb721[_0x2e068b(0x177)]),_0x56148b[_0x2e068b(0x15d)][_0x2e068b(0x358)](_0x3f418e,_0x517364[_0x2e068b(0x296)]),_0xf575f3[_0x2e068b(0x15d)][_0x2e068b(0x358)](_0x19bd86,_0x3e59f0[_0x2e068b(0x1b7)]),_0x18824d['MessageCore'][_0x2e068b(0x358)](_0x1fd545,_0x44132d[_0x2e068b(0x14e)]),_0x1b6364[_0x2e068b(0x15d)][_0x2e068b(0x358)](_0x3b4f8c,_0x28eb0e['States'])):this['changeValue'](_0x1b6a4d,_0x1c0d8a[_0x2e068b(0x14f)](0x1,0xb));},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x1b9)]=function(){const _0x53c060=_0x1704b3;let _0x4ec595=Window_Base[_0x53c060(0x2a8)]['contentsHeight']['call'](this);return _0x4ec595-=this['addedHeight'](),_0x4ec595;},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x24f)]=function(){const _0x5f82ca=_0x1704b3;Window_Base[_0x5f82ca(0x2a8)]['refreshDimmerBitmap']['call'](this),VisuMZ[_0x5f82ca(0x15d)][_0x5f82ca(0x245)]['General'][_0x5f82ca(0x17c)]&&this[_0x5f82ca(0x312)]();},Window_Message[_0x1704b3(0x2a8)]['stretchDimmerSprite']=function(){const _0x3c1067=_0x1704b3;this[_0x3c1067(0x342)]['x']=Math[_0x3c1067(0x181)](this[_0x3c1067(0xd1)]/0x2),this['_dimmerSprite'][_0x3c1067(0xb1)]['x']=0.5,this[_0x3c1067(0x342)][_0x3c1067(0x363)]['x']=Graphics['width'];},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0xe1)]=Window_Message[_0x1704b3(0x2a8)]['clearFlags'],Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x1ac)]=function(){const _0x357d53=_0x1704b3;VisuMZ[_0x357d53(0x15d)][_0x357d53(0xe1)]['call'](this),this['clearActorNameAutoColor'](),this['resetWordWrap'](),this[_0x357d53(0x34b)](![]),this[_0x357d53(0x9b)](_0x357d53(0x183)),this[_0x357d53(0x10a)](VisuMZ[_0x357d53(0x15d)][_0x357d53(0x245)][_0x357d53(0x1fa)][_0x357d53(0x380)]);},Window_Message[_0x1704b3(0x2a8)]['resetWordWrap']=function(){const _0x52e485=_0x1704b3;this['setWordWrap']($gameSystem[_0x52e485(0x190)]());},Window_Message['prototype'][_0x1704b3(0x9a)]=function(){return!![];},Window_Message[_0x1704b3(0x2a8)]['setTextDelay']=function(_0x57a08a){const _0x4bc795=_0x1704b3,_0x17ab54=0xb-ConfigManager[_0x4bc795(0x210)];_0x57a08a=Math['round'](_0x57a08a*_0x17ab54),this[_0x4bc795(0x2ed)]=_0x57a08a,this['_textDelay']=_0x57a08a;},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x38d)]=Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x295)],Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x295)]=function(){const _0x39a81e=_0x1704b3;return VisuMZ[_0x39a81e(0x15d)]['Window_Message_isTriggered']['call'](this)||Input[_0x39a81e(0x209)](VisuMZ[_0x39a81e(0x15d)]['Settings']['General'][_0x39a81e(0x1dc)]);},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x2b0)]=Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x20e)],Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x20e)]=function(){const _0x476cf4=_0x1704b3;let _0x23fd4b=this['y'];this['x']=Math[_0x476cf4(0x181)]((Graphics[_0x476cf4(0x2a4)]-this[_0x476cf4(0xd1)])/0x2),VisuMZ[_0x476cf4(0x15d)][_0x476cf4(0x2b0)][_0x476cf4(0x1d9)](this);if(this['_autoPositionTarget'])this['y']=_0x23fd4b;this[_0x476cf4(0x2ef)](),this[_0x476cf4(0x1f5)](),this['clampPlacementPosition'](),this['updateChoiceListHelpWindowPlacement']();},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0xe4)]=Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0xe3)],Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0xe3)]=function(_0x527c9d){const _0x51463b=_0x1704b3;this[_0x51463b(0x22c)](_0x527c9d),this[_0x51463b(0x14d)](_0x527c9d),VisuMZ[_0x51463b(0x15d)][_0x51463b(0xe4)][_0x51463b(0x1d9)](this,_0x527c9d),this[_0x51463b(0x1d6)]();},Window_Message['prototype'][_0x1704b3(0x22c)]=function(_0x47225f){const _0x241c24=_0x1704b3;if(!_0x47225f)return;this[_0x241c24(0x97)]=![],_0x47225f[_0x241c24(0xff)]=this[_0x241c24(0x163)](_0x47225f[_0x241c24(0xff)]),this[_0x241c24(0x18c)]&&(_0x47225f[_0x241c24(0xff)]=this[_0x241c24(0x119)](_0x47225f[_0x241c24(0xff)]),this[_0x241c24(0x97)]=!![]);},Window_Message['prototype'][_0x1704b3(0x119)]=function(_0x5203f8){const _0xae10e7=_0x1704b3;if(this['_macroBypassWordWrap'])return _0x5203f8;return Window_Base[_0xae10e7(0x2a8)][_0xae10e7(0x119)][_0xae10e7(0x1d9)](this,_0x5203f8);},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x14d)]=function(_0x41ad54){const _0x46f284=_0x1704b3;this['prepareForcedPositionEscapeCharacters'](_0x41ad54),this[_0x46f284(0x262)](_0x41ad54),this[_0x46f284(0x1d8)]();},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x32f)]=Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x103)],Window_Message['prototype']['terminateMessage']=function(){const _0x2c9f44=_0x1704b3;VisuMZ[_0x2c9f44(0x15d)]['Window_Message_terminateMessage']['call'](this),this['clearFlags']();if(this[_0x2c9f44(0x1de)])this[_0x2c9f44(0x16a)]();},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x1d8)]=function(){const _0x18e7e5=_0x1704b3;this[_0x18e7e5(0xd1)]=$gameSystem['getMessageWindowWidth']()+this[_0x18e7e5(0x28f)]();;this[_0x18e7e5(0xd1)]=Math[_0x18e7e5(0x124)](Graphics[_0x18e7e5(0xd1)],this['width']);const _0x1f6ba2=$gameSystem[_0x18e7e5(0xe6)]();this[_0x18e7e5(0x241)]=SceneManager[_0x18e7e5(0x319)][_0x18e7e5(0x33a)](_0x1f6ba2,![])+this[_0x18e7e5(0x289)](),this['height']=Math[_0x18e7e5(0x124)](Graphics[_0x18e7e5(0x241)],this[_0x18e7e5(0x241)]);if($gameTemp['_centerMessageWindow'])this[_0x18e7e5(0x36e)]();},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x28f)]=function(){return 0x0;},Window_Message[_0x1704b3(0x2a8)]['addedHeight']=function(){return 0x0;},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x36e)]=function(){const _0x27a978=_0x1704b3;this['x']=(Graphics[_0x27a978(0x2a4)]-this['width'])/0x2,$gameTemp[_0x27a978(0x317)]=undefined,this['clampPlacementPosition']();},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x23b)]=function(){const _0x54c6dd=_0x1704b3,_0x33f9d2={'x':this['x'],'y':this['y']};Window_Base[_0x54c6dd(0x2a8)][_0x54c6dd(0x23b)][_0x54c6dd(0x1d9)](this),this['updateNameBoxMove'](_0x33f9d2);},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x15e)]=function(){return!![];},Window_Message['prototype'][_0x1704b3(0x187)]=function(_0x75795e){const _0x54d531=_0x1704b3;this['_nameBoxWindow']&&(this['_nameBoxWindow']['x']+=this['x']-_0x75795e['x'],this[_0x54d531(0x3af)]['y']+=this['y']-_0x75795e['y']);},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x2e2)]=function(_0x521a3d,_0x5bd9d1){const _0x2a6874=_0x1704b3;this[_0x2a6874(0x136)](this['_resetRect']['x'],this[_0x2a6874(0x30b)]*(Graphics['boxHeight']-this[_0x2a6874(0x241)])/0x2,this['_resetRect'][_0x2a6874(0xd1)],this[_0x2a6874(0x1ab)][_0x2a6874(0x241)],_0x521a3d,_0x5bd9d1);},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x19d)]=function(_0x4d6f90){const _0x1005bb=_0x1704b3,_0x462e67=Window_Base[_0x1005bb(0x2a8)]['processCommonEvent'][_0x1005bb(0x1d9)](this,_0x4d6f90);_0x4d6f90[_0x1005bb(0x3cb)]&&this[_0x1005bb(0x197)](_0x462e67);},Window_Message['prototype'][_0x1704b3(0x197)]=function(_0x31534a){const _0x5e880e=_0x1704b3;if($gameParty[_0x5e880e(0x7e)]()){}else $gameMap[_0x5e880e(0x186)](_0x31534a);},Window_Message[_0x1704b3(0x2a8)]['processCharacter']=function(_0x5339e6){const _0x43773c=_0x1704b3;this['_textDelayCount']--,this[_0x43773c(0x2ed)]<=0x0&&(this[_0x43773c(0x1cb)](_0x5339e6),Window_Base['prototype'][_0x43773c(0x2fc)][_0x43773c(0x1d9)](this,_0x5339e6));},Window_Message[_0x1704b3(0x2a8)]['onProcessCharacter']=function(_0x9b631c){const _0x2bf6df=_0x1704b3;this['_textDelayCount']=this['_textDelay'];if(this[_0x2bf6df(0x273)]<=0x0)this[_0x2bf6df(0x2c9)]=!![];},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x90)]=Window_Message['prototype'][_0x1704b3(0x2fe)],Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x2fe)]=function(_0x56bfd6,_0xfef678){const _0x23c117=_0x1704b3;!_0xfef678['drawing']?_0x23c117(0x324)===_0x23c117(0xcf)?this[_0x23c117(0x3ab)]['type']=0x2:Window_Base[_0x23c117(0x2a8)][_0x23c117(0x2fe)][_0x23c117(0x1d9)](this,_0x56bfd6,_0xfef678):VisuMZ[_0x23c117(0x15d)][_0x23c117(0x90)][_0x23c117(0x1d9)](this,_0x56bfd6,_0xfef678);},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x12b)]=Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x323)],Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x323)]=function(_0x12fcdc){const _0x1b389e=_0x1704b3;if(this['_currentAutoSize']){if(_0x1b389e(0x261)!==_0x1b389e(0xb7))return![];else{if(_0x1c1c5d<=0x0)return;const _0x3515cc=_0x306e2b['MessageCore']['Settings'][_0x1b389e(0x2df)][_0x1b389e(0xdc)+_0x5aa97f];let _0x1e5d2e=_0x33929a[_0x1b389e(0x3d6)][_0x1b389e(0x375)]();if(/^\d+$/[_0x1b389e(0x111)](_0x1e5d2e))return;if(_0x22a0cd[_0x1b389e(0x15d)]['AutoColorBypassList'][_0x1b389e(0xc1)](_0x1e5d2e['toUpperCase']()))return;_0x1e5d2e=_0x1e5d2e[_0x1b389e(0x3ca)](/\\I\[(\d+)\]/gi,''),_0x1e5d2e=_0x1e5d2e[_0x1b389e(0x3ca)](/\x1bI\[(\d+)\]/gi,'');if(_0x1e5d2e[_0x1b389e(0x2ff)]<=0x0)return;if(_0x1e5d2e[_0x1b389e(0x1bf)](/-----/i))return;_0x3515cc[_0x1b389e(0x337)](_0x1e5d2e);}}return VisuMZ[_0x1b389e(0x15d)]['Window_Message_needsNewPage']['call'](this,_0x12fcdc);},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x1ca)]=function(_0x270fdf){const _0x4eff2f=_0x1704b3;let _0x43a9bd=_0x270fdf[_0x4eff2f(0xff)];this[_0x4eff2f(0x272)]={};if(this['isWordWrapEnabled']())return _0x43a9bd;_0x43a9bd=_0x43a9bd[_0x4eff2f(0x3ca)](/<POSITION:[ ]*(.*?)>/gi,(_0x29b5d7,_0x32f406)=>{const _0x537365=_0x4eff2f;if(_0x537365(0x19e)!==_0x537365(0x74)){const _0x330ecd=_0x32f406[_0x537365(0x3d7)](',')[_0x537365(0x202)](_0x1b4b42=>Number(_0x1b4b42)||0x0);if(_0x330ecd[0x0]!==undefined)this[_0x537365(0x272)]['x']=Number(_0x330ecd[0x0]);if(_0x330ecd[0x1]!==undefined)this[_0x537365(0x272)]['y']=Number(_0x330ecd[0x1]);if(_0x330ecd[0x2]!==undefined)this[_0x537365(0x272)][_0x537365(0xd1)]=Number(_0x330ecd[0x2]);if(_0x330ecd[0x3]!==undefined)this[_0x537365(0x272)][_0x537365(0x241)]=Number(_0x330ecd[0x3]);return'';}else this[_0x537365(0x135)]=_0x151a9b;}),_0x43a9bd=_0x43a9bd[_0x4eff2f(0x3ca)](/<COORDINATES:[ ]*(.*?)>/gi,(_0x4be9fc,_0x3b9fa9)=>{const _0x5bbf82=_0x4eff2f;if(_0x5bbf82(0x297)===_0x5bbf82(0x297)){const _0x1e1920=_0x3b9fa9[_0x5bbf82(0x3d7)](',')[_0x5bbf82(0x202)](_0x22b7da=>Number(_0x22b7da)||0x0);if(_0x1e1920[0x0]!==undefined)this[_0x5bbf82(0x272)]['x']=Number(_0x1e1920[0x0]);if(_0x1e1920[0x1]!==undefined)this['_forcedPosition']['y']=Number(_0x1e1920[0x1]);return'';}else _0x1bd27c=_0x2a6746[_0x5bbf82(0x3ca)](_0x179465[0x0],_0x308a0b[0x1]);}),_0x43a9bd=_0x43a9bd[_0x4eff2f(0x3ca)](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x2cd572,_0x3bb694)=>{const _0x2d9b00=_0x4eff2f,_0x3c207a=_0x3bb694[_0x2d9b00(0x3d7)](',')[_0x2d9b00(0x202)](_0x4e2469=>Number(_0x4e2469)||0x0);if(_0x3c207a[0x0]!==undefined)this[_0x2d9b00(0x272)][_0x2d9b00(0xd1)]=Number(_0x3c207a[0x2]);if(_0x3c207a[0x1]!==undefined)this[_0x2d9b00(0x272)][_0x2d9b00(0x241)]=Number(_0x3c207a[0x3]);return'';}),_0x43a9bd=_0x43a9bd[_0x4eff2f(0x3ca)](/<OFFSET:[ ]*(.*?)>/gi,(_0x5b9503,_0x39f182)=>{const _0x93af5e=_0x4eff2f,_0x121a6f=_0x39f182[_0x93af5e(0x3d7)](',')[_0x93af5e(0x202)](_0x559f97=>Number(_0x559f97)||0x0);let _0x5df1b4=_0x121a6f[0x0]||0x0,_0x522242=_0x121a6f[0x1]||0x0;return $gameSystem[_0x93af5e(0x370)](_0x5df1b4,_0x522242),'';}),_0x270fdf[_0x4eff2f(0xff)]=_0x43a9bd;},Window_Message[_0x1704b3(0x2a8)]['updateXyOffsets']=function(){const _0x15ae37=_0x1704b3,_0x4554f1=$gameSystem[_0x15ae37(0x24c)]();this['x']+=_0x4554f1['x'],this['y']+=_0x4554f1['y'];},Window_Message['prototype'][_0x1704b3(0x1f5)]=function(){const _0x4992dd=_0x1704b3;this[_0x4992dd(0x272)]=this['_forcedPosition']||{};const _0xd09fab=['x','y',_0x4992dd(0xd1),'height'];for(const _0x1eb2d5 of _0xd09fab){_0x4992dd(0x1ee)===_0x4992dd(0x1ee)?this['_forcedPosition'][_0x1eb2d5]!==undefined&&(this[_0x1eb2d5]=Number(this[_0x4992dd(0x272)][_0x1eb2d5])):(this[_0x4992dd(0x348)](_0x2acb83,this[_0x4992dd(0x357)](),_0x10c82d),this[_0x4992dd(0x384)]-=0x2);}},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x262)]=function(_0x58347b){const _0x55c7d6=_0x1704b3;this[_0x55c7d6(0x128)]=![];let _0x4048db=_0x58347b['text'];_0x4048db=_0x4048db[_0x55c7d6(0x3ca)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x925c58=_0x55c7d6;return this['processAutoSize'](_0x4048db,!![],!![]),this[_0x925c58(0xb6)](_0x925c58(0x325)),'';}),_0x4048db=_0x4048db[_0x55c7d6(0x3ca)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x5a7001=_0x55c7d6;return this['processAutoSize'](_0x4048db,!![],![]),this['processAutoPosition'](_0x5a7001(0x325)),'';}),_0x4048db=_0x4048db[_0x55c7d6(0x3ca)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x28018f=_0x55c7d6;return'Iluxa'===_0x28018f(0x37c)?![]:(this[_0x28018f(0x30d)](_0x4048db,![],!![]),this[_0x28018f(0xb6)](_0x28018f(0x325)),'');});if(SceneManager[_0x55c7d6(0xcd)]())_0x4048db=_0x4048db[_0x55c7d6(0x3ca)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x5b0f97,_0x4c5b27)=>{const _0x3b550b=_0x55c7d6;return this[_0x3b550b(0x30d)](_0x4048db,!![],!![]),this[_0x3b550b(0xb6)](_0x3b550b(0x218),Number(_0x4c5b27)||0x1),'';}),_0x4048db=_0x4048db[_0x55c7d6(0x3ca)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x231baf,_0x66007b)=>{const _0x575821=_0x55c7d6;return this[_0x575821(0x30d)](_0x4048db,!![],!![]),this[_0x575821(0xb6)](_0x575821(0x35a),Number(_0x66007b)||0x0),'';}),_0x4048db=_0x4048db[_0x55c7d6(0x3ca)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x20e06b,_0x41b939)=>{const _0x10bd26=_0x55c7d6;return this[_0x10bd26(0x30d)](_0x4048db,!![],!![]),this['processAutoPosition'](_0x10bd26(0xa3),Number(_0x41b939)||0x0),'';});else SceneManager[_0x55c7d6(0x36b)]()&&(_0x4048db=_0x4048db[_0x55c7d6(0x3ca)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x4f4df1,_0x12f978)=>{const _0x4751cd=_0x55c7d6;return this[_0x4751cd(0x30d)](_0x4048db,!![],!![]),this[_0x4751cd(0xb6)]('map\x20player',0x0),'';}),_0x4048db=_0x4048db[_0x55c7d6(0x3ca)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x148591,_0x32b555)=>{const _0x43531c=_0x55c7d6;return this[_0x43531c(0x30d)](_0x4048db,!![],!![]),this[_0x43531c(0xb6)](_0x43531c(0x2bd),Number(_0x32b555)||0x1),'';}),_0x4048db=_0x4048db[_0x55c7d6(0x3ca)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x280f11,_0x44632c)=>{const _0x50da8a=_0x55c7d6;return this['processAutoSize'](_0x4048db,!![],!![]),this['processAutoPosition'](_0x50da8a(0x2dc),Number(_0x44632c)||0x0),'';}),_0x4048db=_0x4048db[_0x55c7d6(0x3ca)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x4f78be,_0x385d3d)=>{const _0x2626b6=_0x55c7d6;return this[_0x2626b6(0x30d)](_0x4048db,!![],!![]),this['processAutoPosition'](_0x2626b6(0x299),Number(_0x385d3d)||0x0),'';}));_0x58347b[_0x55c7d6(0xff)]=_0x4048db;},Window_Message[_0x1704b3(0x2d3)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x1704b3(0x1eb)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x30d)]=function(_0x5b6316,_0x39074c,_0x1abb25){const _0xc46bb9=_0x1704b3;_0x5b6316=_0x5b6316[_0xc46bb9(0x3ca)](Window_Message[_0xc46bb9(0x2d3)],''),_0x5b6316=_0x5b6316[_0xc46bb9(0x3ca)](Window_Message[_0xc46bb9(0x1eb)],''),this[_0xc46bb9(0x33d)]=!![],this[_0xc46bb9(0x128)]=!![],this[_0xc46bb9(0x73)](![]);const _0x56a3ab=this[_0xc46bb9(0x300)](_0x5b6316);if(_0x39074c){let _0x160ad3=_0x56a3ab[_0xc46bb9(0xd1)]+$gameSystem[_0xc46bb9(0x2af)]()*0x2+0x6;const _0x48bd57=$gameMessage[_0xc46bb9(0x1ef)]()!=='',_0x4bc41b=ImageManager[_0xc46bb9(0x31f)],_0xf3190=0x14;_0x160ad3+=_0x48bd57?_0x4bc41b+_0xf3190:0x4;if(_0x160ad3%0x2!==0x0)_0x160ad3+=0x1;$gameSystem[_0xc46bb9(0x1d2)](_0x160ad3);}if(_0x1abb25){if(_0xc46bb9(0xb9)!==_0xc46bb9(0xb9))this[_0xc46bb9(0x203)][_0x31862d][_0xc46bb9(0x153)][0x0][_0xc46bb9(0x337)](_0x1b2fc0);else{let _0x4266e2=Math[_0xc46bb9(0xe0)](_0x56a3ab['height']/this[_0xc46bb9(0x266)]());$gameSystem[_0xc46bb9(0x290)](_0x4266e2);}}this['updateAutoSizePosition'](),this[_0xc46bb9(0x26f)](),this['_autoSizeCheck']=![],this[_0xc46bb9(0x1de)]=!![];},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x2e1)]=function(){const _0x2e0028=_0x1704b3;this[_0x2e0028(0x1d8)](),this[_0x2e0028(0x20e)](),this[_0x2e0028(0x36e)](),this['updateTransform'](),this[_0x2e0028(0x20c)][_0x2e0028(0x222)](),this['createContents']();},Window_Message['prototype']['processAutoPosition']=function(_0x5acf7e,_0x13d817){const _0x27d71a=_0x1704b3;switch(_0x5acf7e[_0x27d71a(0x7c)]()[_0x27d71a(0x375)]()){case _0x27d71a(0x218):this[_0x27d71a(0x3b7)]=$gameActors[_0x27d71a(0x85)](_0x13d817);break;case _0x27d71a(0x35a):this[_0x27d71a(0x3b7)]=$gameParty['members']()[_0x13d817-0x1];break;case _0x27d71a(0xa3):this[_0x27d71a(0x3b7)]=$gameTroop[_0x27d71a(0x28d)]()[_0x13d817-0x1];break;case _0x27d71a(0x2c5):this['_autoPositionTarget']=$gamePlayer;break;case _0x27d71a(0x2bd):const _0x349a07=$gameActors['actor'](_0x13d817)[_0x27d71a(0x193)]();if(_0x349a07===0x0){if(_0x27d71a(0x1aa)!==_0x27d71a(0x1aa)){_0x5b8be9[_0x27d71a(0x15d)]['Window_Base_processAllText'][_0x27d71a(0x1d9)](this,_0x577d49);if(_0x5c8ff9['drawing'])this[_0x27d71a(0x9b)](_0x27d71a(0x183));}else this[_0x27d71a(0x3b7)]=$gamePlayer;}else this[_0x27d71a(0x3b7)]=$gamePlayer['followers']()[_0x27d71a(0x173)](_0x349a07-0x1);break;case'map\x20party':if(_0x13d817===0x1){if('UHhuZ'===_0x27d71a(0x129)){const _0xece0a7=_0x59f0ba[_0x27d71a(0x3d7)](',')[_0x27d71a(0x202)](_0x207115=>_0x132138(_0x207115)||0x0);let _0x3d86c3=_0xece0a7[0x0]||0x0,_0x26d112=_0xece0a7[0x1]||0x0;return _0x3fd17c['setMessageWindowXyOffsets'](_0x3d86c3,_0x26d112),'';}else this[_0x27d71a(0x3b7)]=$gamePlayer;}else this[_0x27d71a(0x3b7)]=$gamePlayer[_0x27d71a(0x89)]()[_0x27d71a(0x173)](_0x13d817-0x2);break;case _0x27d71a(0x299):this['_autoPositionTarget']=$gameMap['event'](_0x13d817);break;}this[_0x27d71a(0x3b7)]&&this[_0x27d71a(0x3d4)]();},VisuMZ[_0x1704b3(0x15d)]['Window_Message_synchronizeNameBox']=Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x22a)],Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x22a)]=function(){const _0x17c024=_0x1704b3;this[_0x17c024(0x3d4)](),VisuMZ['MessageCore'][_0x17c024(0x150)][_0x17c024(0x1d9)](this);},Window_Message[_0x1704b3(0x2a8)]['updateAutoPosition']=function(){const _0x53a1d7=_0x1704b3;if(!this[_0x53a1d7(0x3b7)])return;const _0x9c446c=SceneManager[_0x53a1d7(0x319)];if(!_0x9c446c)return;const _0x3bce23=_0x9c446c[_0x53a1d7(0x180)];if(!_0x3bce23)return;const _0x2a41d6=_0x3bce23[_0x53a1d7(0x1a2)](this[_0x53a1d7(0x3b7)]);if(!_0x2a41d6)return;let _0x179684=_0x2a41d6['x'];if(SceneManager[_0x53a1d7(0x36b)]())_0x179684*=$gameScreen[_0x53a1d7(0x32e)]();else{if(SceneManager['isSceneBattle']()&&Imported[_0x53a1d7(0x25c)]){let _0x3e19db=_0x2a41d6['x']-Graphics[_0x53a1d7(0x2a4)]*_0x3bce23['anchor']['x'];_0x179684+=_0x3e19db*(_0x3bce23['scale']['x']-0x1);}}_0x179684-=this[_0x53a1d7(0xd1)]/0x2,_0x179684-=(Graphics[_0x53a1d7(0xd1)]-Graphics[_0x53a1d7(0x2a4)])/0x2,_0x179684+=this[_0x53a1d7(0x361)]();let _0x5eacc2=_0x2a41d6['y'];if(SceneManager[_0x53a1d7(0x36b)]())'DNoTW'!==_0x53a1d7(0x71)?(_0x5eacc2-=_0x2a41d6[_0x53a1d7(0x241)]+0x8,_0x5eacc2*=$gameScreen['zoomScale'](),_0x5eacc2-=this[_0x53a1d7(0x241)]*$gameScreen[_0x53a1d7(0x32e)]()):(_0x3a42d8['push'](_0x42c596),_0x2dfaae='');else{if(SceneManager[_0x53a1d7(0xcd)]()&&Imported[_0x53a1d7(0x25c)]){if('ccNVw'===_0x53a1d7(0x1ce)){_0x46b4af[_0x53a1d7(0x15d)][_0x53a1d7(0xad)]=[];for(let _0x22c572=0x1;_0x22c572<=0x1f;_0x22c572++){const _0x2902df=_0x53a1d7(0x1e6)[_0x53a1d7(0x344)](_0x22c572),_0x6d07d6=_0x4c72fb[_0x53a1d7(0x15d)][_0x53a1d7(0x245)][_0x53a1d7(0x2df)][_0x2902df];_0x6d07d6[_0x53a1d7(0x1e7)]((_0x12ef22,_0x276cbc)=>{const _0x190f57=_0x53a1d7;if(!_0x12ef22||!_0x276cbc)return-0x1;return _0x276cbc['length']-_0x12ef22[_0x190f57(0x2ff)];}),this[_0x53a1d7(0x138)](_0x6d07d6,_0x22c572);}}else{let _0x5b908a=_0x2a41d6[_0x53a1d7(0x241)]*_0x3bce23[_0x53a1d7(0x363)]['y'];_0x5eacc2-=this['height']*_0x3bce23[_0x53a1d7(0x363)]['y']+_0x5b908a+0x8;let _0x42b27a=_0x2a41d6['y']-Graphics[_0x53a1d7(0x146)]*_0x3bce23['anchor']['y'];_0x5eacc2+=_0x42b27a*(_0x3bce23[_0x53a1d7(0x363)]['y']-0x1);}}else _0x5eacc2-=_0x2a41d6[_0x53a1d7(0x241)]+0x8,_0x5eacc2-=this[_0x53a1d7(0x241)];}_0x5eacc2-=(Graphics['height']-Graphics[_0x53a1d7(0x146)])/0x2,_0x5eacc2+=this[_0x53a1d7(0x2c3)]();const _0x14c76a=$gameSystem[_0x53a1d7(0x24c)]();_0x179684+=_0x14c76a['x'],_0x5eacc2+=_0x14c76a['y'],this['x']=Math[_0x53a1d7(0x181)](_0x179684),this['y']=Math[_0x53a1d7(0x181)](_0x5eacc2),this[_0x53a1d7(0x1c9)](!![],![]),this[_0x53a1d7(0x272)]=this[_0x53a1d7(0x272)]||{},this[_0x53a1d7(0x272)]['x']=this['x'],this[_0x53a1d7(0x272)]['y']=this['y'],this[_0x53a1d7(0x272)][_0x53a1d7(0xd1)]=this[_0x53a1d7(0xd1)],this[_0x53a1d7(0x272)]['height']=this[_0x53a1d7(0x241)],this['_nameBoxWindow'][_0x53a1d7(0x20e)]();},Window_Message['prototype'][_0x1704b3(0x361)]=function(){return 0x0;},Window_Message['prototype'][_0x1704b3(0x2c3)]=function(){return 0x0;},Window_Message[_0x1704b3(0x2a8)]['messagePositionReset']=function(){const _0x541ae4=_0x1704b3;this[_0x541ae4(0x1de)]=![],this[_0x541ae4(0x3b7)]=undefined,$gameSystem[_0x541ae4(0x30a)](),this['updateAutoSizePosition'](),this['openness']=0x0;},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x1ea)]=function(_0x4e47ed){const _0x95272a=_0x1704b3;return Window_Base['prototype'][_0x95272a(0x1ea)]['call'](this,_0x4e47ed);},Window_Message[_0x1704b3(0x2a8)]['postConvertEscapeCharacters']=function(_0x6bffb5){const _0x527561=_0x1704b3;return Window_Base[_0x527561(0x2a8)][_0x527561(0x30e)][_0x527561(0x1d9)](this,_0x6bffb5);},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x79)]=function(_0x5293f2){const _0xce69f4=_0x1704b3;this[_0xce69f4(0x18a)](_0x5293f2),Window_Base[_0xce69f4(0x2a8)][_0xce69f4(0x79)][_0xce69f4(0x1d9)](this,_0x5293f2),this[_0xce69f4(0x26c)](_0x5293f2);},Window_Message[_0x1704b3(0x2a8)]['preFlushTextState']=function(_0x2d12ba){},Window_Message[_0x1704b3(0x2a8)][_0x1704b3(0x26c)]=function(_0x59b845){},Window_NameBox['prototype'][_0x1704b3(0x9a)]=function(){return![];},Window_NameBox['prototype'][_0x1704b3(0x1a5)]=function(){const _0x3b2297=_0x1704b3;Window_Base[_0x3b2297(0x2a8)][_0x3b2297(0x1a5)][_0x3b2297(0x1d9)](this),this['changeTextColor'](this[_0x3b2297(0x110)]());},Window_NameBox[_0x1704b3(0x2a8)][_0x1704b3(0x110)]=function(){const _0x590940=_0x1704b3,_0xf63cdd=VisuMZ['MessageCore'][_0x590940(0x245)]['General']['NameBoxWindowDefaultColor'];return ColorManager[_0x590940(0x2ce)](_0xf63cdd);},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x288)]=Window_NameBox[_0x1704b3(0x2a8)][_0x1704b3(0x20e)],Window_NameBox['prototype'][_0x1704b3(0x20e)]=function(){const _0x291526=_0x1704b3;VisuMZ[_0x291526(0x15d)][_0x291526(0x288)]['call'](this),this[_0x291526(0x8d)](),this['updateOffsetPosition'](),this[_0x291526(0x1c9)](),this[_0x291526(0x1c7)]();},Window_NameBox['prototype'][_0x1704b3(0x1ea)]=function(_0x324e8b){const _0x2ed54c=_0x1704b3;return _0x324e8b=_0x324e8b['replace'](/<LEFT>/gi,this[_0x2ed54c(0x130)][_0x2ed54c(0x328)](this,0x0)),_0x324e8b=_0x324e8b[_0x2ed54c(0x3ca)](/<CENTER>/gi,this[_0x2ed54c(0x130)][_0x2ed54c(0x328)](this,0x5)),_0x324e8b=_0x324e8b[_0x2ed54c(0x3ca)](/<RIGHT>/gi,this[_0x2ed54c(0x130)][_0x2ed54c(0x328)](this,0xa)),_0x324e8b=_0x324e8b[_0x2ed54c(0x3ca)](/<POSITION:[ ](\d+)>/gi,(_0x1f4633,_0x53a63d)=>this['setRelativePosition'](parseInt(_0x53a63d))),_0x324e8b=_0x324e8b[_0x2ed54c(0x3ca)](/<\/LEFT>/gi,''),_0x324e8b=_0x324e8b[_0x2ed54c(0x3ca)](/<\/CENTER>/gi,''),_0x324e8b=_0x324e8b['replace'](/<\/RIGHT>/gi,''),Window_Base[_0x2ed54c(0x2a8)][_0x2ed54c(0x1ea)]['call'](this,_0x324e8b);},Window_NameBox[_0x1704b3(0x2a8)][_0x1704b3(0x130)]=function(_0x47e418){const _0x80a652=_0x1704b3;return this[_0x80a652(0x10d)]=_0x47e418,'';},Window_NameBox['prototype'][_0x1704b3(0x8d)]=function(){const _0x120d56=_0x1704b3;if($gameMessage['isRTL']())return;this['_relativePosition']=this[_0x120d56(0x10d)]||0x0;const _0x3d9f1a=this['_messageWindow'],_0x3c71fe=Math[_0x120d56(0x2da)](_0x3d9f1a[_0x120d56(0xd1)]*this[_0x120d56(0x10d)]/0xa);this['x']=_0x3d9f1a['x']+_0x3c71fe-Math[_0x120d56(0x2da)](this[_0x120d56(0xd1)]/0x2),this['x']=this['x'][_0x120d56(0x14f)](_0x3d9f1a['x'],_0x3d9f1a['x']+_0x3d9f1a[_0x120d56(0xd1)]-this[_0x120d56(0xd1)]);},Window_NameBox[_0x1704b3(0x2a8)][_0x1704b3(0x237)]=function(){const _0x31aa2f=_0x1704b3;if($gameMessage[_0x31aa2f(0x24e)]())return;this[_0x31aa2f(0x10d)]=this[_0x31aa2f(0x10d)]||0x0;const _0x125c33=VisuMZ['MessageCore'][_0x31aa2f(0x245)]['General']['NameBoxWindowOffsetX'],_0x59fa03=VisuMZ[_0x31aa2f(0x15d)]['Settings'][_0x31aa2f(0x1fa)][_0x31aa2f(0x19f)],_0x16569b=(0x5-this[_0x31aa2f(0x10d)])/0x5;this['x']+=Math[_0x31aa2f(0x2da)](_0x125c33*_0x16569b),this['y']+=_0x59fa03;},Window_NameBox['prototype'][_0x1704b3(0x1c7)]=function(){const _0x13aac2=_0x1704b3,_0x249c34=this[_0x13aac2(0xf6)],_0xbb9d5c=_0x249c34['y'],_0x2d6269=VisuMZ['MessageCore'][_0x13aac2(0x245)][_0x13aac2(0x1fa)][_0x13aac2(0x19f)];_0xbb9d5c>this['y']&&_0xbb9d5c<this['y']+this['height']-_0x2d6269&&(this['y']=_0x249c34['y']+_0x249c34[_0x13aac2(0x241)]);},VisuMZ[_0x1704b3(0x15d)]['Window_NameBox_refresh']=Window_NameBox[_0x1704b3(0x2a8)][_0x1704b3(0xae)],Window_NameBox[_0x1704b3(0x2a8)]['refresh']=function(){const _0x2cef17=_0x1704b3;this['_relativePosition']=0x0,VisuMZ['MessageCore'][_0x2cef17(0xc3)][_0x2cef17(0x1d9)](this);},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0xf1)]=function(){return![];},Window_ChoiceList['prototype']['isAutoColorAffected']=function(){return!![];},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0x364)]=function(){const _0x5767bb=_0x1704b3;return $gameSystem[_0x5767bb(0x3d8)]()+0x8;},Window_ChoiceList[_0x1704b3(0x2a8)]['maxCols']=function(){return $gameSystem['getChoiceListMaxColumns']();},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0xd5)]=function(){const _0x36965f=_0x1704b3;this['refresh'](),this[_0x36965f(0x2bf)](),this[_0x36965f(0x242)](),this['activate']();},Window_ChoiceList[_0x1704b3(0x2a8)]['callOkHandler']=function(){const _0x46a26e=_0x1704b3;$gameMessage[_0x46a26e(0x32b)](this['currentExt']()),this[_0x46a26e(0xf6)][_0x46a26e(0x103)](),this[_0x46a26e(0x391)](),this[_0x46a26e(0x2b2)]&&(this[_0x46a26e(0x2b2)][_0x46a26e(0x222)](),this[_0x46a26e(0x2b2)][_0x46a26e(0x234)]());},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x22b)]=Window_ChoiceList[_0x1704b3(0x2a8)]['callCancelHandler'],Window_ChoiceList[_0x1704b3(0x2a8)]['callCancelHandler']=function(){const _0x3cd41b=_0x1704b3;VisuMZ[_0x3cd41b(0x15d)][_0x3cd41b(0x22b)][_0x3cd41b(0x1d9)](this),this[_0x3cd41b(0x2b2)]&&('yjfTX'!==_0x3cd41b(0x3be)?(this[_0x3cd41b(0x2b2)][_0x3cd41b(0x222)](),this[_0x3cd41b(0x2b2)][_0x3cd41b(0x234)]()):this[_0x596960]=_0x194c63(this[_0x3cd41b(0x272)][_0x4efa51]));},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0xae)]=function(){const _0x4c23e7=_0x1704b3;this[_0x4c23e7(0x17d)](),this['makeCommandList'](),this[_0x4c23e7(0xf6)]&&(this[_0x4c23e7(0x20e)](),this['placeCancelButton']()),this['createContents'](),this[_0x4c23e7(0x243)](),this[_0x4c23e7(0x24f)](),Window_Selectable[_0x4c23e7(0x2a8)][_0x4c23e7(0xae)][_0x4c23e7(0x1d9)](this);},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0x233)]=function(){const _0x5309d4=_0x1704b3,_0x29a52c=$gameMessage['choices'](),_0x550fb0=$gameMessage[_0x5309d4(0x141)](),_0x2dede1=$gameMessage[_0x5309d4(0x28e)](),_0x4a9513=_0x29a52c[_0x5309d4(0x2ff)];let _0x20e5a2=0x0;for(let _0x4d0cbc=0x0;_0x4d0cbc<_0x4a9513;_0x4d0cbc++){if(_0x5309d4(0x246)===_0x5309d4(0xd4)){if(!_0x149576[_0x5309d4(0x3d0)](_0x33d3c0))return![];}else{if(this['_list'][_0x5309d4(0x2ff)]>=_0x2dede1)break;const _0x2ee7d6=_0x550fb0[_0x4d0cbc];let _0x5a1b72=_0x29a52c[_0x2ee7d6];if(_0x5a1b72===undefined)continue;_0x5a1b72=this[_0x5309d4(0x92)](_0x5a1b72);if(this[_0x5309d4(0xc8)](_0x5a1b72)){const _0x2305bc=this[_0x5309d4(0x1c4)](_0x5a1b72),_0x17119d=this[_0x5309d4(0x3d9)](_0x5a1b72);this['addCommand'](_0x2305bc,_0x5309d4(0x263),_0x17119d,_0x2ee7d6);}_0x20e5a2++;}}this[_0x5309d4(0xa7)](),this[_0x5309d4(0x3aa)]();},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0x92)]=function(_0x789633){const _0xe58fbe=_0x1704b3;return Window_Base[_0xe58fbe(0x2a8)]['convertTextMacros'][_0xe58fbe(0x1d9)](this,_0x789633);},Window_ChoiceList[_0x1704b3(0x2a8)]['isChoiceVisible']=function(_0x18e546){const _0x4982c4=_0x1704b3;if(Imported[_0x4982c4(0x21a)])$gameMessage['registerSelfEvent']();if(_0x18e546[_0x4982c4(0x1bf)](/<HIDE>/i))return![];if(_0x18e546[_0x4982c4(0x1bf)](/<SHOW>/i))return!![];if(_0x18e546[_0x4982c4(0x1bf)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5dce2c=RegExp['$1'][_0x4982c4(0x3d7)](',')[_0x4982c4(0x202)](_0xafb0d0=>Number(_0xafb0d0)||0x0);for(const _0x126d5c of _0x5dce2c){if(!$gameSwitches[_0x4982c4(0x3d0)](_0x126d5c))return![];}return!![];}if(_0x18e546['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x4982c4(0x1af)===_0x4982c4(0x1af)){const _0x115b01=RegExp['$1'][_0x4982c4(0x3d7)](',')['map'](_0x17e2b1=>Number(_0x17e2b1)||0x0);for(const _0x57e871 of _0x115b01){if(!$gameSwitches[_0x4982c4(0x3d0)](_0x57e871))return![];}return!![];}else this[_0x4982c4(0x20c)][_0x4982c4(0x22e)]=!!_0x38e867;}if(_0x18e546[_0x4982c4(0x1bf)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x40215f=RegExp['$1']['split'](',')[_0x4982c4(0x202)](_0xf7982f=>Number(_0xf7982f)||0x0);for(const _0x215234 of _0x40215f){if($gameSwitches[_0x4982c4(0x3d0)](_0x215234))return!![];}return![];}if(_0x18e546[_0x4982c4(0x1bf)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x4982c4(0x12c)===_0x4982c4(0x2a9))return this[_0x4982c4(0xee)]();else{const _0x578973=RegExp['$1'][_0x4982c4(0x3d7)](',')['map'](_0x6d7197=>Number(_0x6d7197)||0x0);for(const _0x1972d3 of _0x578973){if(!$gameSwitches[_0x4982c4(0x3d0)](_0x1972d3))return!![];}return![];}}if(_0x18e546[_0x4982c4(0x1bf)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x18e096=RegExp['$1'][_0x4982c4(0x3d7)](',')[_0x4982c4(0x202)](_0x1b64e5=>Number(_0x1b64e5)||0x0);for(const _0x47c37c of _0x18e096){if(!$gameSwitches[_0x4982c4(0x3d0)](_0x47c37c))return!![];}return![];}if(_0x18e546[_0x4982c4(0x1bf)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x4ddd38=RegExp['$1'][_0x4982c4(0x3d7)](',')[_0x4982c4(0x202)](_0x13bcf3=>Number(_0x13bcf3)||0x0);for(const _0x19a9cf of _0x4ddd38){if($gameSwitches[_0x4982c4(0x3d0)](_0x19a9cf))return![];}return!![];}return!![];},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0x1c4)]=function(_0x33d43a){const _0x25fad0=_0x1704b3;let _0x40624a=_0x33d43a;return _0x40624a=_0x40624a[_0x25fad0(0x3ca)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x40624a=_0x40624a[_0x25fad0(0x3ca)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x40624a;},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0x3d9)]=function(_0x23eb71){const _0x998e80=_0x1704b3;if(Imported[_0x998e80(0x21a)])$gameMessage[_0x998e80(0x35e)]();if(_0x23eb71[_0x998e80(0x1bf)](/<DISABLE>/i))return![];if(_0x23eb71['match'](/<ENABLE>/i))return!![];if(_0x23eb71[_0x998e80(0x1bf)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2f0148=RegExp['$1'][_0x998e80(0x3d7)](',')[_0x998e80(0x202)](_0x59838f=>Number(_0x59838f)||0x0);for(const _0x8ab753 of _0x2f0148){if(!$gameSwitches[_0x998e80(0x3d0)](_0x8ab753))return![];}return!![];}if(_0x23eb71['match'](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x998e80(0xb5)===_0x998e80(0xb5)){const _0x28b7c4=RegExp['$1'][_0x998e80(0x3d7)](',')[_0x998e80(0x202)](_0x5a5bdf=>Number(_0x5a5bdf)||0x0);for(const _0x181bb6 of _0x28b7c4){if(!$gameSwitches['value'](_0x181bb6))return![];}return!![];}else this['_messageCommonEvents'][_0x998e80(0x188)](_0x24498a);}if(_0x23eb71[_0x998e80(0x1bf)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x4e03a2=RegExp['$1'][_0x998e80(0x3d7)](',')[_0x998e80(0x202)](_0x22ef45=>Number(_0x22ef45)||0x0);for(const _0x54c86f of _0x4e03a2){if($gameSwitches[_0x998e80(0x3d0)](_0x54c86f))return!![];}return![];}if(_0x23eb71[_0x998e80(0x1bf)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x21ce31=RegExp['$1'][_0x998e80(0x3d7)](',')[_0x998e80(0x202)](_0x485bd0=>Number(_0x485bd0)||0x0);for(const _0x116642 of _0x21ce31){if(!$gameSwitches[_0x998e80(0x3d0)](_0x116642))return!![];}return![];}if(_0x23eb71['match'](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3f508d=RegExp['$1'][_0x998e80(0x3d7)](',')[_0x998e80(0x202)](_0x4c3790=>Number(_0x4c3790)||0x0);for(const _0xf52f9d of _0x3f508d){if(_0x998e80(0x2f8)!=='nJqTA'){if(!$gameSwitches[_0x998e80(0x3d0)](_0xf52f9d))return!![];}else this[_0x998e80(0x395)](_0x3ba56b,!![]);}return![];}if(_0x23eb71[_0x998e80(0x1bf)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x178620=RegExp['$1'][_0x998e80(0x3d7)](',')['map'](_0x3b5b1d=>Number(_0x3b5b1d)||0x0);for(const _0x597fdd of _0x178620){if(_0x998e80(0x31e)===_0x998e80(0x1dd))_0x4918e0[_0x998e80(0x15d)]['Game_Map_initialize'][_0x998e80(0x1d9)](this),this['_messageCommonEvents']=[];else{if($gameSwitches[_0x998e80(0x3d0)](_0x597fdd))return![];}}return!![];}return!![];},Window_ChoiceList[_0x1704b3(0x2a8)]['clearChoiceHelpDescriptions']=function(){const _0x5de163=_0x1704b3;this[_0x5de163(0x2c1)]={},this['_helpWindow']&&(this['_helpWindow'][_0x5de163(0x222)](),this['_helpWindow'][_0x5de163(0x234)]());},Window_ChoiceList[_0x1704b3(0x2a8)]['applyChoiceHelpDescriptions']=function(){const _0x2dfa45=_0x1704b3,_0x370233=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0x3d7eaf of this[_0x2dfa45(0x203)]){if('idQyo'!==_0x2dfa45(0x274)){this[_0x2dfa45(0x2ed)]=this['_textDelay'];if(this['_textDelay']<=0x0)this[_0x2dfa45(0x2c9)]=!![];}else{if(!_0x3d7eaf)continue;const _0x1f8d23=this[_0x2dfa45(0x203)][_0x2dfa45(0x213)](_0x3d7eaf);if(_0x3d7eaf[_0x2dfa45(0x3d6)][_0x2dfa45(0x1bf)](_0x370233)){const _0x334d31=String(RegExp['$1']);this[_0x2dfa45(0x2c1)][_0x1f8d23]=_0x334d31[_0x2dfa45(0x375)](),_0x3d7eaf['name']=_0x3d7eaf[_0x2dfa45(0x3d6)][_0x2dfa45(0x3ca)](_0x370233,'')[_0x2dfa45(0x375)]();}else{if('eKRBz'!==_0x2dfa45(0x3c9))return(_0x876fe5[_0x2dfa45(0x2a4)]-this[_0x2dfa45(0x1e5)]())/0x2;else this[_0x2dfa45(0x2c1)][_0x1f8d23]='';}}}},VisuMZ['MessageCore'][_0x1704b3(0x148)]=Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0x20e)],Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0x20e)]=function(){const _0x12eea0=_0x1704b3;VisuMZ[_0x12eea0(0x15d)][_0x12eea0(0x148)][_0x12eea0(0x1d9)](this),this['clampPlacementPosition']();},Window_ChoiceList['prototype']['placeCancelButton']=function(){const _0x18f06e=_0x1704b3;if(!this['_cancelButton'])return;const _0x95632=0x8,_0x470b5d=this['_cancelButton'],_0x14ce19=this['x']+this[_0x18f06e(0xd1)],_0x1c59f1=Math[_0x18f06e(0x2da)]((Graphics[_0x18f06e(0xd1)]-Graphics[_0x18f06e(0x2a4)])/0x2);_0x14ce19>=Graphics['boxWidth']+_0x1c59f1-_0x470b5d[_0x18f06e(0xd1)]+_0x95632?_0x470b5d['x']=-_0x470b5d[_0x18f06e(0xd1)]-_0x95632:_0x470b5d['x']=this[_0x18f06e(0xd1)]+_0x95632,_0x470b5d['y']=this[_0x18f06e(0x241)]/0x2-_0x470b5d[_0x18f06e(0x241)]/0x2;},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x212)]=Window_ChoiceList['prototype']['windowX'],Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0x38a)]=function(){const _0x4b6335=_0x1704b3;return this[_0x4b6335(0xf6)]?this['messageCoreWindowX']():VisuMZ[_0x4b6335(0x15d)][_0x4b6335(0x212)][_0x4b6335(0x1d9)](this);},Window_ChoiceList['prototype']['messageCoreWindowX']=function(){const _0x1f453=_0x1704b3,_0x6db8f2=$gameMessage[_0x1f453(0xa9)]();if(_0x6db8f2===0x1)return(Graphics['boxWidth']-this[_0x1f453(0x1e5)]())/0x2;else return _0x6db8f2===0x2?this[_0x1f453(0xf6)]['x']+this[_0x1f453(0xf6)][_0x1f453(0xd1)]-this[_0x1f453(0x1e5)]():this[_0x1f453(0xf6)]['x'];},Window_ChoiceList[_0x1704b3(0x2a8)]['windowWidth']=function(){const _0x5c7c15=_0x1704b3,_0x9df59f=(this[_0x5c7c15(0x2b6)]()+this[_0x5c7c15(0xd2)]())*this[_0x5c7c15(0x349)]()+this[_0x5c7c15(0x1c0)]*0x2;return Math['min'](_0x9df59f,Graphics[_0x5c7c15(0xd1)]);},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0x1b5)]=function(){const _0x5a5a28=_0x1704b3,_0x290b83=$gameMessage['choices']()[_0x5a5a28(0x202)](_0x7e181b=>this['convertChoiceMacros'](_0x7e181b))[_0x5a5a28(0x15a)](_0x37a552=>this[_0x5a5a28(0xc8)](_0x37a552)),_0x7cabca=$gameMessage[_0x5a5a28(0x28e)](),_0x473394=Math[_0x5a5a28(0xe0)](Math[_0x5a5a28(0x124)](_0x7cabca,_0x290b83[_0x5a5a28(0x2ff)])/this[_0x5a5a28(0x349)]());return Math['max'](0x1,Math['min'](_0x473394,this[_0x5a5a28(0x3bb)]()));},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0x3bb)]=function(){const _0x191d4d=_0x1704b3,_0x1a1ac0=this[_0x191d4d(0xf6)],_0x37f9c0=_0x1a1ac0?_0x1a1ac0['y']:0x0,_0x487b6d=_0x1a1ac0?_0x1a1ac0['height']:0x0,_0x110b58=Graphics['boxHeight']/0x2;if(_0x37f9c0<_0x110b58&&_0x37f9c0+_0x487b6d>_0x110b58)return _0x191d4d(0x302)!=='uAcsI'?this[_0x191d4d(0x220)]:0x4;else{if('qfalR'===_0x191d4d(0x334))return $gameSystem[_0x191d4d(0x27a)]();else{let _0x1329bb=_0x52a949[_0x191d4d(0x2a8)][_0x191d4d(0x1b9)][_0x191d4d(0x1d9)](this);return _0x1329bb-=this['addedHeight'](),_0x1329bb;}}},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0x2b6)]=function(){const _0x268213=_0x1704b3;let _0x385c29=this[_0x268213(0xf5)]();for(const _0xfbce7c of this['_list']){const _0x170fa2=_0xfbce7c[_0x268213(0x3d6)],_0x166502=this[_0x268213(0x269)](_0x170fa2),_0x56da7e=this[_0x268213(0x3c5)](_0x170fa2)['width']+_0x166502,_0x53100b=Math[_0x268213(0xe0)](_0x56da7e)+this['itemPadding']()*0x2;_0x385c29=Math['max'](_0x385c29,_0x53100b);}return _0x385c29;},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0xf5)]=function(){const _0x4e64cf=_0x1704b3;let _0x5519b3=0x60;const _0x26a69d=$gameMessage[_0x4e64cf(0x352)]();for(const _0xbf27d3 of _0x26a69d){if(_0xbf27d3[_0x4e64cf(0x1bf)](/<CHOICE WIDTH:[ ](\d+)>/gi)){if(_0x4e64cf(0x298)===_0x4e64cf(0x298))_0x5519b3=Math[_0x4e64cf(0x1a8)](_0x5519b3,Number(RegExp['$1']));else{const _0x117122=_0x14e653>=0x1?_0x22fe24[_0x4e64cf(0x28d)]()[_0x2d8b68-0x1]:null,_0x3e7f4d=_0x117122?_0x117122[_0x4e64cf(0x3d6)]():'',_0x1ec9b6=_0xd4685b(_0x59bb68[_0x4e64cf(0x15d)][_0x4e64cf(0x245)][_0x4e64cf(0x2df)][_0x4e64cf(0x2a7)]);return this['isAutoColorAffected']()&&_0x1ec9b6!==0x0?_0x4e64cf(0x236)[_0x4e64cf(0x344)](_0x1ec9b6,_0x3e7f4d):_0x3e7f4d;}}}return _0x5519b3;},Window_ChoiceList['prototype'][_0x1704b3(0x1e3)]=function(_0x27d362){const _0x24461a=_0x1704b3,_0x2709f3=this[_0x24461a(0x256)](_0x27d362),_0x1689f7=$gameSystem[_0x24461a(0x286)]()!==_0x24461a(0x183)?_0x24461a(0x2ab)['format']($gameSystem['getChoiceListTextAlign']()):'',_0x1e05d1=_0x1689f7+this['commandName'](_0x27d362);this[_0x24461a(0x174)](this['isCommandEnabled'](_0x27d362));const _0x56d92d=this[_0x24461a(0x3c5)](_0x1e05d1)[_0x24461a(0x241)],_0x5f5c26=_0x2709f3['x']+this[_0x24461a(0x269)](_0x1e05d1),_0x40ce02=Math[_0x24461a(0x1a8)](_0x2709f3['y'],_0x2709f3['y']+Math[_0x24461a(0x181)]((_0x2709f3[_0x24461a(0x241)]-_0x56d92d)/0x2));this[_0x24461a(0xf3)](_0x1e05d1,_0x5f5c26,_0x40ce02,_0x2709f3[_0x24461a(0xd1)]),this[_0x24461a(0x1b6)](_0x27d362);},Window_ChoiceList['prototype'][_0x1704b3(0x269)]=function(_0xa7d620){const _0x4f86d2=_0x1704b3;let _0x3eed90=0x0;return _0xa7d620[_0x4f86d2(0x1bf)](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0x3eed90=Number(RegExp['$1'])),_0x3eed90;},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0x1b6)]=function(_0x1d139f){const _0x9f603=_0x1704b3;if(!Imported[_0x9f603(0x1f1)])return;const _0xfa0952=this['commandName'](_0x1d139f);let _0x508a0c=![],_0x736672=![],_0x1b10a6=ColorManager[_0x9f603(0x16e)](),_0x47cc49=ColorManager[_0x9f603(0x26b)]();if(_0xfa0952[_0x9f603(0x1bf)](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi)){if('HSHsY'===_0x9f603(0xb0))_0x1b10a6=ColorManager['getColor'](RegExp['$1'])[_0x9f603(0x375)](),_0x47cc49=ColorManager[_0x9f603(0x22d)](RegExp['$2'])[_0x9f603(0x375)](),_0x508a0c=!![];else return _0x261e89;}else{if(_0xfa0952[_0x9f603(0x1bf)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){let _0x2f680f=String(RegExp['$1'])[_0x9f603(0x7c)]()[_0x9f603(0x375)]();switch(_0x2f680f){case _0x9f603(0x20f):_0x1b10a6=_0x47cc49=_0x9f603(0x3dc),_0x736672=!![];break;case _0x9f603(0x1e9):_0x1b10a6=_0x47cc49=_0x9f603(0x336),_0x736672=!![];break;case _0x9f603(0x1ed):_0x1b10a6=_0x47cc49=_0x9f603(0x1bd),_0x736672=!![];break;case _0x9f603(0x2c2):_0x1b10a6=_0x47cc49=_0x9f603(0x15f),_0x736672=!![];break;case _0x9f603(0xce):_0x1b10a6=_0x47cc49=_0x9f603(0x1cd),_0x736672=!![];break;case _0x9f603(0xeb):case _0x9f603(0x151):_0x1b10a6=_0x47cc49='#a186be',_0x736672=!![];break;case'brown':_0x1b10a6=_0x47cc49='#c69c6d',_0x736672=!![];break;case _0x9f603(0x1d3):_0x1b10a6=_0x47cc49=_0x9f603(0x1f6),_0x736672=!![];break;case _0x9f603(0x2e3):_0x1b10a6=_0x47cc49=_0x9f603(0x7b),_0x736672=!![];break;case _0x9f603(0x21e):case _0x9f603(0xa4):_0x1b10a6=_0x47cc49=_0x9f603(0x3dd),_0x736672=!![];break;case _0x9f603(0x2ae):_0x1b10a6=_0x47cc49=_0x9f603(0x1ae),_0x736672=!![];break;case _0x9f603(0x161):_0x1b10a6=_0x47cc49=ColorManager['powerUpColor'](),_0x736672=!![];break;case'no':_0x1b10a6=_0x47cc49=ColorManager[_0x9f603(0x2b4)](),_0x736672=!![];break;case _0x9f603(0x389):_0x1b10a6=_0x47cc49=ColorManager[_0x9f603(0x321)](),_0x736672=!![];break;case'crisis':_0x1b10a6=_0x47cc49=ColorManager[_0x9f603(0x182)](),_0x736672=!![];break;default:_0x1b10a6=_0x47cc49=ColorManager[_0x9f603(0x22d)](_0x2f680f),_0x736672=!![];break;}_0x508a0c=!![];}}if(!_0x508a0c)return;const _0x2fbb10=this[_0x9f603(0x316)](_0x1d139f);this[_0x9f603(0x393)][_0x9f603(0x1c8)](_0x2fbb10['x'],_0x2fbb10['y'],_0x2fbb10[_0x9f603(0xd1)],_0x2fbb10['height']),this[_0x9f603(0x259)](_0x2fbb10,_0x1b10a6,_0x47cc49,_0x736672);},Window_ChoiceList['prototype'][_0x1704b3(0x259)]=function(_0x5e1169,_0x42c429,_0x59eec3,_0x53ce6a){const _0x391d9c=_0x1704b3,_0xb8ca65=ColorManager['itemBackColor1'](),_0x3515ba=ColorManager[_0x391d9c(0x277)](),_0x4aa94f=_0x42c429??ColorManager[_0x391d9c(0x16e)](),_0x59a8ba=_0x59eec3??_0x42c429,_0x2129fc=_0x5e1169['x'],_0x356794=_0x5e1169['y'],_0x514ed4=_0x5e1169[_0x391d9c(0xd1)],_0x419ddd=_0x5e1169[_0x391d9c(0x241)];this[_0x391d9c(0x393)]['gradientFillRect'](_0x2129fc,_0x356794,_0x514ed4,_0x419ddd,_0x4aa94f,_0x59a8ba,!![]),_0x53ce6a&&this[_0x391d9c(0x393)][_0x391d9c(0x356)](_0x2129fc,_0x356794,_0x514ed4,_0x419ddd,_0xb8ca65,_0x59a8ba,!![]),this[_0x391d9c(0x393)][_0x391d9c(0x2ee)](_0x2129fc,_0x356794,_0x514ed4,_0x419ddd,_0xb8ca65);},Window_ChoiceList[_0x1704b3(0x2a8)][_0x1704b3(0x2a1)]=function(){const _0x44e3c9=_0x1704b3;this[_0x44e3c9(0x2b2)][_0x44e3c9(0x222)]();if(!this['_choiceHelpDescriptions'])return;const _0x22eef1=this[_0x44e3c9(0x193)]();if(this[_0x44e3c9(0x2c1)][_0x22eef1])this[_0x44e3c9(0x2b2)][_0x44e3c9(0x118)](this[_0x44e3c9(0x2c1)][_0x22eef1]),this[_0x44e3c9(0x2b2)][_0x44e3c9(0xa0)]();else{if(_0x44e3c9(0x251)!==_0x44e3c9(0x2d9))this[_0x44e3c9(0x2b2)][_0x44e3c9(0x222)](),this['_helpWindow']['hide']();else{const _0x1dc2c9=_0xd23a4f['$1']['split'](',')[_0x44e3c9(0x202)](_0xf67ad1=>_0x4983ab(_0xf67ad1)||0x0);for(const _0x415cab of _0x1dc2c9){if(!_0x353fc8[_0x44e3c9(0x3d0)](_0x415cab))return![];}return!![];}}},Window_EventItem[_0x1704b3(0x2a8)][_0x1704b3(0x33c)]=function(){const _0x1bfc9f=_0x1704b3,_0x7dce0=$gameMessage[_0x1bfc9f(0x399)]();_0x7dce0===_0x1bfc9f(0x86)&&Imported[_0x1bfc9f(0x31b)]?_0x1bfc9f(0x17e)===_0x1bfc9f(0x32c)?this[_0x1bfc9f(0xed)]=_0x5de691:this[_0x1bfc9f(0x2f5)]():Window_ItemList['prototype'][_0x1bfc9f(0x33c)][_0x1bfc9f(0x1d9)](this);},Window_EventItem[_0x1704b3(0x2a8)]['makeSkillList']=function(){const _0x3e86e5=_0x1704b3,_0xd59aab=$gameMessage[_0x3e86e5(0x282)]();this['_data']=_0xd59aab?_0xd59aab[_0x3e86e5(0x250)]()[_0x3e86e5(0x15a)](_0x561d17=>this['includes'](_0x561d17)):[],this['includes'](null)&&this[_0x3e86e5(0x313)][_0x3e86e5(0x337)](null);},VisuMZ[_0x1704b3(0x15d)]['Window_EventItem_includes']=Window_EventItem[_0x1704b3(0x2a8)][_0x1704b3(0xc1)],Window_EventItem[_0x1704b3(0x2a8)]['includes']=function(_0x5aa03c){const _0x2b9750=_0x1704b3,_0x1ba4d7=$gameMessage[_0x2b9750(0x399)]();if(_0x1ba4d7===_0x2b9750(0x12f)){if(!DataManager[_0x2b9750(0x176)](_0x5aa03c))return![];const _0x216a31=$gameMessage['itemChoiceWtypeId']();if(_0x216a31>0x0){if(_0x5aa03c['wtypeId']!==_0x216a31)return![];}return!![];}else{if(_0x1ba4d7==='armor'){if('XKZxL'===_0x2b9750(0x2e5)){if(!DataManager['isArmor'](_0x5aa03c))return![];const _0x4a4c51=$gameMessage[_0x2b9750(0x26e)]();if(_0x4a4c51>0x0){if(_0x5aa03c[_0x2b9750(0x378)]!==_0x4a4c51)return![];}const _0x3c4af6=$gameMessage[_0x2b9750(0x2d5)]();if(_0x3c4af6>0x0){if(_0x5aa03c[_0x2b9750(0x156)]!==_0x3c4af6)return![];}return!![];}else{const _0x5be7df=_0x2b9750(0x284);_0x5a90c7=_0x5be7df[_0x2b9750(0x344)](_0x5b3767[_0x2b9750(0x122)],_0x443f46['name']);}}else{if(_0x1ba4d7==='skill'){if(_0x2b9750(0x3d1)==='maxkg'){if(!DataManager[_0x2b9750(0x398)](_0x5aa03c))return![];const _0xa5db7c=$gameMessage[_0x2b9750(0x282)]();if(_0xa5db7c[_0x2b9750(0x392)](_0x5aa03c))return![];if(!_0xa5db7c['isSkillTypeMatchForUse'](_0x5aa03c))return![];const _0x90d25=$gameMessage[_0x2b9750(0x3c3)]();if(_0x90d25>0x0){const _0x5eb2c6=DataManager[_0x2b9750(0xa2)](_0x5aa03c);if(!_0x5eb2c6[_0x2b9750(0xc1)](_0x90d25))return![];}return!![];}else _0x5755ba=_0x22237b[_0x2b9750(0x107)]();}else{if(_0x2b9750(0xde)===_0x2b9750(0x155))this['_forcedPosition'][_0x33eb0a]!==_0x40a262&&(this[_0x36f3f7]=_0x3f03a8(this['_forcedPosition'][_0x456f3c]));else return VisuMZ[_0x2b9750(0x15d)][_0x2b9750(0x18e)][_0x2b9750(0x1d9)](this,_0x5aa03c);}}}},VisuMZ[_0x1704b3(0x15d)][_0x1704b3(0x2d7)]=Window_ItemList['prototype']['drawItemNumber'],Window_ItemList[_0x1704b3(0x2a8)][_0x1704b3(0x191)]=function(_0x1dcec7,_0x349919,_0xd4d279,_0x53f6ab){const _0x462d5a=_0x1704b3,_0xe10e9b=$gameMessage[_0x462d5a(0x399)]();if(_0xe10e9b===_0x462d5a(0x86)){if(_0x462d5a(0x2ea)!==_0x462d5a(0x133)){const _0x75d966=$gameMessage[_0x462d5a(0x282)]();this[_0x462d5a(0x102)](_0x75d966,_0x1dcec7,_0x349919,_0xd4d279,_0x53f6ab);}else{const _0x3f02c9=this[_0x462d5a(0x16f)](_0x2a9c4e);this[_0x462d5a(0x27e)]===_0x455b17&&_0x390dd8[_0x462d5a(0x3cb)]&&this[_0x462d5a(0x268)](_0x3f02c9);}}else VisuMZ[_0x462d5a(0x15d)][_0x462d5a(0x2d7)][_0x462d5a(0x1d9)](this,_0x1dcec7,_0x349919,_0xd4d279,_0x53f6ab);};