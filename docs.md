## Configuration

> **Note:** All mongodb IDs need to be saved as a string, memberId, guildId and messageId in discord are globally unique across guilds so they can be used as a database \_id

(`activity`) the text displayed under the bot's name on the user list

### Permissions

Required permissions (`requiredPermissions`) in `src/utils/vars.ts` specifies the required permissions needed for the bot to interact with the guild. See [flags](https://discord-api-types.dev/api/discord-api-types-payloads/common#PermissionFlagsBits).

## Commands

Under commands directories, you must put the commands **right into the directory** not into **subdirectories**.
(`userPermissions`) Specifies the required permissions for a user to run the command See [flags](https://discord-api-types.dev/api/discord-api-types-payloads/common#PermissionFlagsBits).
(`data`) Slash command builder. Compatible with single commands or subcommands.
(`run`) Function called when the command is run.

## Components

Under component directories, you must put the components **right into the buttons, modals, or selectMenus directory** not into **subdirectories** or other folders.

## Buttons

(`run`) Function called when the button is pressed.

## Modals

(`run`) Function called when the modal is submitted.

## Select Menus

(`run`) Function called when an item is selected.

## Backend - Schemas

When importing a schema use capitalization.
‘‘‘import Guild from '../schemas/Guild.ts'‘‘‘
`import Guild from '../schemas/Guild.ts'`

Setting `_id` as a string allows for indexing by guildId, memberId, or any other discord ID you use. This allows the use of (`findById()`) increasing query efficiency compared to (`find()`)
