//=============================================================================
// RenameItemsCategory.js
//=============================================================================
/*:
* @target MZ
* @plugindesc Rename the "Items" category in the user menu.
* @author Your Name
*
* @help RenameItemsCategory.js
*
* This plugin allows you to change the name of the "Items" category in the
* user menu. You can customize the name by changing the value of
* 'newItemCategoryName'.
*/

(() => {
  const newItemCategoryName = 'Clues'; // Change this to your desired name

  Window_MenuCommand.prototype.commandItem = function () {
    this._list.push({
      name: newItemCategoryName,
      symbol: 'item',
      enabled: this.isItemEnabled(),
      ext: null,
    });
  };
})();
