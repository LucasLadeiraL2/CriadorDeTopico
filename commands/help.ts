function help() {
    return `**Criador de Tópico Help**
- **$create $<rpgName> $[topics]**: Create a new RPG with the specified name and optional topics. If topics are not provided, you will be prompted to confirm the creation of topics in the current channel.
Example: 
\`\`\`$create $RPGName $ 
Topic1 
Topic2\`\`\`
- **$list**: List all RPGs available in the database.`;
}

export { help };