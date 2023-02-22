module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        
        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'check console for more informations' });
        
        if (command.ownerCommand) {
            if (interaction.user.id !== process.env.ownerId) {
                return interaction.reply({ content: "Restricted command!", ephemeral: true });
            }
        }
        
        const args = [];
        
        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        
        try {
            command.run(client, interaction, args)
        } catch (e) {
            interaction.reply({ content: e.message });
        }
    }
}