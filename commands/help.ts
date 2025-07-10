function help() {
    return `**Criador de Tópico Help**
- **$create $<rpgName> $[topics]**: Create a new RPG with the specified name and optional topics. If topics are not provided, you will be prompted to confirm the creation of topics in the current channel.
Example: 
\`\`\`$create $RPGName $ 
Topic1 
Topic2\`\`\`
- **$list $[rpgName]**: List all RPGs available in the database. If there is an RPG name provided, it will list the topics for that RPG.
- **$delete $<rpgName>**: Delete the specified RPG and its associated topics.
- **$update $<rpgName> $[topics]**: Update the topics of an existing RPG.`;
}

export { help };